import { buildAgentHandbook } from "@/lib/m3/agent";

/** GET /llms.txt - plain-text handbook for LLMs and coding agents. */
export async function GET() {
  return new Response(buildAgentHandbook(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
