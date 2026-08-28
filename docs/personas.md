# Target-user personas — m3-expressive-react

**Date:** 2026-08-29 · **Method:** repo-artifact analysis (README, showcase app, MCP server, audit docs) + market research (see Sources). No primary user interviews yet — see Research gaps.

**Product in one line:** a React implementation of Material 3 Expressive that Google never shipped for the web — 41 spec-audited components, official token system, spring physics, and structured metadata so AI coding agents use it without guessing.

## Why these personas (the evidence)

Three facts drive everything below:

1. **The gap is real.** Google states M3 Expressive "is not implemented on Web" and their Material Web Components library is in maintenance mode. MUI remains M2/M3-aligned. Anyone who wants the Expressive look on the web today has no official option.
2. **The agent workflow is the majority workflow.** JetBrains (May–Jul 2026): 90% of professional developers use AI coding agents weekly. Stack Overflow 2025: 84% use or plan to use AI tools; frontend teams report the largest gains.
3. **Trust is the bottleneck.** Only ~29% of developers trust AI output. Agents guess props, invent components, and pick generic-looking defaults. This library's differentiator — `M3ComponentMeta` (props, variants, anatomy, guidelines, exampleCode), the `/llms.txt` handbook, the MCP server with 14 tools, and the "For AI agents" docs section — exists to close exactly that gap.

---

## Persona 1 — Marco, the AI-first builder **(PRIMARY)**

> *"I don't read component docs anymore. My agent does. It just better not guess the props wrong."*

**Photo description:** late 20s, hoodie, one monitor with a chat window open to an agent, the other showing a running localhost app. Coffee shop desk.

**Demographics**
- 24–34, solo founder or 1–3 person startup, technical but not a design person
- Builds 3–5 web products a year (SaaS dashboards, internal tools, landing + app hybrids)
- Works through Claude Code / Cursor / Copilot-mode agents ~90% of the time
- Stack: Next.js + Tailwind because that is what the agent scaffolds by default

**Goals**
- *Functional:* ship a polished, dark-mode-capable UI this weekend without making design decisions
- *Emotional:* confidence the result won't look amateur; pride when the motion feels premium ("it bounces like a native app")
- *Social:* a demo worth posting; investors/first users take the product seriously

**Frustrations**
- Agents hallucinate props for MUI/shadcn — he spends more time debugging the agent's guesses than coding
- shadcn's default look reads as gray and generic; every AI-built app looks the same
- MUI feels dated (M2-era look) and heavy; he can't articulate why, but his demos feel "2019"
- He doesn't know what "M3 Expressive" means — he just wants "make it look good" to work

**Behaviors**
- Judges a component library by one metric: did the agent get it right on the first try?
- Discovers libraries through agent choices and npm-search prompts, not blog posts
- Never reads the docs site directly; his agent does (via llms.txt / MCP)
- Pastes errors back into the chat and expects the loop to converge

**Day in the life**
Friday 9pm. Marco prompts: "Build me a settings page for my SaaS — sections, toggles, a date picker, dark mode." His agent has the m3 MCP server connected, queries the component registry, and pulls exact props and example code from `M3ComponentMeta` instead of guessing. Twenty minutes later he has a Material-polished page with springs on every interaction. He never opened a single doc page — and that is the point.

**Design implications**
- MCP server must be one-command installable (`npx`) and documented as a copy-paste config block
- `/llms.txt` must always match the shipped version; stale agent docs = broken trust = uninstall
- `exampleCode` must run as-is, every component, no exceptions — it is the agent's source of truth
- Prop names are a public contract: never rename; breaking changes must be loud and versioned
- "Looks good by default" beats "configurable" for this persona — sane defaults, curated themes

---

## Persona 2 — Aira, the agency product engineer

> *"Every client wants 'the Material look' but in THEIR brand colors. I don't have a week to re-token shadcn for each one."*

**Photo description:** early 30s, agency desk, two clients' Figma files side by side with a Next.js dev server. Post-it: "demo Thursday."

**Demographics**
- 25–35, product engineer in a 3–10 person software agency (Medianeth's own shape)
- Runs 3+ concurrent client projects; Next.js + Tailwind 4 is the house stack
- Comfortable senior-level React; TypeScript strict; cares about boring, proven tech

**Goals**
- *Functional:* spin up a branded client app in days, not weeks; reuse one kit across all client work
- *Emotional:* no surprises at the Thursday demo; predictable upgrades between projects
- *Social:* client reaction — "this looks like a real product" — with zero design budget spent

**Frustrations**
- Re-styling shadcn per client is manual token surgery, and every dev in the agency does it differently
- MUI theming feels like fighting the framework; bundle weight worries her on client-shared hosting
- Motion quality is always ad hoc — each project reinvents transitions, or skips them
- Library updates that silently shift visuals break client-accepted screens

**Behaviors**
- Standardizes the team on one kit, then defends that choice for years
- Reads Quick Start first, evaluates TypeScript strictness, tree-shaking, and peer-dep surface
- Uses the Theme Builder: client brand seed color → full light+dark scheme in minutes
- Values the repo's visual-regression baselines — proof upgrades won't surprise her

**Day in the life**
New logistics client, brand green `#1B5E20`. Aira drops the seed into the Theme Builder, gets a complete 34-role light+dark scheme generated with Google's own color utilities, applies it pre-paint (no flash), and three days later demos a dashboard with correct Material motion. The next client gets the same kit, a different seed. Her agency now ships "branded Material" as a repeatable service.

**Design implications**
- Theme Builder (in-app + server-side API) is a first-class product surface, not a demo tab
- Publish versioned releases with migration notes; keep VR (`vr:check`) as a release gate
- Keep the standalone `styles.css` path alive for clients without Tailwind
- Document the "agency standardization" story — this is also the nearest-term revenue/adoption path, starting with Medianeth's own projects

---

## Persona 3 — Priya, the design-engineer seeking web parity

> *"Google shipped Expressive for Compose and left the web behind. I need pixel-and-physics parity without building 40 components myself."*

**Photo description:** late 30s, design-systems lead, Android app on a phone beside a web build, spec tabs open on m3.material.io. Annotating a shape-morph mismatch.

**Demographics**
- 30–45, design-engineer / design-systems lead at a product company whose Android app is Material 3
- Deep design-systems knowledge; audits everything against the official spec
- Works at the intersection of design and engineering; writes the conventions others follow

**Goals**
- *Functional:* make the web app match the Android app's Expressive motion, color, and shape language
- *Emotional:* defensible choices — "it follows the spec," not personal taste
- *Social:* end the design-vs-engineering argument about "close enough"

**Frustrations**
- Google's web components are in maintenance mode; no official Expressive path for web
- MUI is not Expressive; building 40 spec-correct components in-house is a multi-quarter project
- Most "Material-ish" libraries approximate tonal palettes and state layers instead of using official utilities
- A11y + spec fidelity is hard to verify without per-component audit documentation

**Behaviors**
- Reads the spec audit before the API — wants to know where a library deviates and why
- Tests keyboard interaction, focus rings, state-layer opacities, and dark-mode tonal palettes
- Files precise GitHub issues citing m3.material.io sections
- Adopts tokens-only first (the `tokens` subpath export), then components

**Day in the life**
Priya's company just shipped the Android redesign in Expressive; leadership asks why the web dashboard looks flat. She evaluates m3-expressive-react by reading the per-family audit docs in `audit/`, verifies the spring tokens against the M3 motion spec, checks that state layers use official opacities, and confirms the color engine is `@material/material-color-utilities` (Google's own). The honest deviation notes are what win her trust — the library knows where it differs from spec and says so.

**Design implications**
- Publish the `audit/` docs alongside the package site — they are a competitive asset, not internal notes
- Keep spec citations in component docs (the meta `guidelines` field already carries them)
- Preserve Base UI underneath for a11y primitives, and document the rc.0 → 1.0 migration path
- Keep tokens/themes/registry as standalone subpath exports for partial adopters

---

## Prioritization

**Primary: Marco (AI-first builder).** Reasons:
1. He is where the market already is (90% weekly agent use among professional devs) and where growth compounds — agents recommend libraries by name, and a library agents "know" gets installed without a human ever visiting the site.
2. The product's entire differentiating infrastructure (MCP server, llms.txt, M3ComponentMeta, exampleCode) was built for his workflow. Designing for anyone else first would waste that built advantage.
3. Serving Marco serves the others: Aira's agency also works through agents; Priya's team writes code with agents too.

**Secondary: Aira** — nearest-term real adoption (agency standardization, starting with Medianeth's own project pipeline). **Tertiary: Priya** — credibility and enterprise pull; she validates spec fidelity and writes the trust-building issues others read.

**A note on the non-human user:** the coding agent is not a persona — it is Marco's hands. Every artifact aimed at agents (MCP tools, llms.txt, structured metadata) serves Marco through the agent. Design decisions should ask "does this make the agent's first attempt correct?" — that is Marco's success metric wearing a costume.

## Research gaps

- **No primary research yet.** These personas are grounded in repo artifacts and market data, not interviews. 5–8 interviews per persona (esp. Marco) would firm them up.
- **Zero install analytics.** The package's real audience is unknowable until launch: npm downloads, MCP server connection counts, and llms.txt hit rates will say which persona actually shows up.
- **Unvalidated assumption:** that Marco-class users will connect an MCP server for a UI library at all — the copy-paste config must be near-zero effort, or the agent falls back to guessing.
- **Unknown segments:** Vue/Svelte demand, enterprise teams with compliance needs, and PH/regional adoption patterns.

## Sources

- [Material Design 3](https://m3.material.io/) and [M3 for Web (maintenance-mode notice, "M3 Expressive is not implemented on Web")](https://m3.material.io/develop/web)
- [Expressive Material Design — Google UX research](https://design.google/library/expressive-material-design-google-research)
- [Material UI](https://mui.com/material-ui/) (M2/M3 alignment status)
- [JetBrains: AI Coding Agent Adoption 2026 (90% weekly professional use)](https://blog.jetbrains.com/research/2026/08/ai-coding-agent-adoption-2026/)
- [Stack Overflow Developer Survey 2025 — AI (84% use/plan; 51% daily)](https://survey.stackoverflow.co/2025/ai)
- [Uvik: AI Coding Assistant Statistics 2026 (29% trust)](https://uvik.net/blog/ai-coding-assistant-statistics/)
- [Design Systems Collective: AI-integrated design systems](https://www.designsystemscollective.com/how-ai-integrated-design-systems-and-generative-component-libraries-work-a060897b8abb)
- [arXiv: Agentic Much? Adoption of Coding Agents on GitHub](https://arxiv.org/html/2601.18341v1)
