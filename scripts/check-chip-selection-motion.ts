import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileP = promisify(execFile);
const session = `chip-motion-${process.pid}`;

interface AgentBrowserResult {
  success: boolean;
  data: { result?: unknown };
  error: string | null;
}

interface TransitionSample {
  direction: "select" | "deselect";
  start: number;
  end: number;
  min: number;
  max: number;
  maxReverseStep: number;
}

async function browser(...args: string[]): Promise<string> {
  const { stdout } = await execFileP("agent-browser", ["--session", session, ...args], {
    timeout: 45_000,
  });
  return stdout;
}

async function evaluate(expression: string): Promise<unknown> {
  const output = await browser("eval", expression, "--json");
  const parsed = JSON.parse(output) as AgentBrowserResult;
  if (!parsed.success) throw new Error(parsed.error ?? "Browser evaluation failed");
  return parsed.data.result;
}

async function waitForChip(): Promise<void> {
  const deadline = Date.now() + 20_000;
  while (Date.now() < deadline) {
    const ready = await evaluate(`
      document.querySelector('h1')?.textContent?.trim() === 'Chip' &&
      Array.from(document.querySelectorAll('button[data-m3-chip][aria-pressed]'))
        .some((button) => button.textContent?.includes('Filters'))
    `);
    if (ready) return;
    await new Promise((resolve) => {
      setTimeout(resolve, 200);
    });
  }
  throw new Error("The Chip playground did not render within 20 seconds");
}

async function sampleTransition(): Promise<TransitionSample> {
  const result = await evaluate(`
    (async () => {
      const button = Array.from(document.querySelectorAll('button[data-m3-chip][aria-pressed]'))
        .find((item) => item.textContent?.includes('Filters'));
      if (!(button instanceof HTMLButtonElement)) throw new Error('Filter chip not found');

      const direction = button.getAttribute('aria-pressed') === 'true' ? 'deselect' : 'select';
      const widths = [button.getBoundingClientRect().width];
      button.click();
      for (let frame = 0; frame < 60; frame += 1) {
        await new Promise((resolve) => {
          requestAnimationFrame(resolve);
        });
        widths.push(button.getBoundingClientRect().width);
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      widths.push(button.getBoundingClientRect().width);
      const deltas = widths.slice(1).map((width, index) => width - widths[index]);
      const maxReverseStep = direction === 'select'
        ? Math.max(0, ...deltas.map((delta) => -delta))
        : Math.max(0, ...deltas);

      return JSON.stringify({
        direction,
        start: widths[0],
        end: widths.at(-1),
        min: Math.min(...widths),
        max: Math.max(...widths),
        maxReverseStep,
      });
    })()
  `);
  return JSON.parse(String(result)) as TransitionSample;
}

function assertSmooth(sample: TransitionSample): void {
  const endpointTolerance = 1;
  const directionTolerance = 0.05;
  if (sample.direction === "select" && sample.min < sample.start - endpointTolerance) {
    throw new Error(
      `Selection shrank before growing: ${sample.start.toFixed(2)}px -> ${sample.min.toFixed(2)}px -> ${sample.end.toFixed(2)}px`,
    );
  }
  if (sample.direction === "deselect" && sample.max > sample.start + endpointTolerance) {
    throw new Error(
      `Deselection grew before shrinking: ${sample.start.toFixed(2)}px -> ${sample.max.toFixed(2)}px -> ${sample.end.toFixed(2)}px`,
    );
  }
  if (sample.maxReverseStep > directionTolerance) {
    throw new Error(
      `${sample.direction} reversed by ${sample.maxReverseStep.toFixed(3)}px during its width transition`,
    );
  }
}

try {
  await browser("set", "viewport", "1440", "1000");
  await browser("open", "http://localhost:3000/#/component/chip");
  await waitForChip();

  const first = await sampleTransition();
  const second = await sampleTransition();
  assertSmooth(first);
  assertSmooth(second);

  console.log(JSON.stringify({ first, second }, null, 2));
  console.log("Chip selection motion is monotonic");
} finally {
  await browser("close").catch(() => undefined);
}
