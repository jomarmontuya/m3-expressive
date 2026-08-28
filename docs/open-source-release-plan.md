# Open-source release plan — m3-expressive-react, shadcn-style

**Date:** 2026-08-29 · **Status:** proposal, not yet approved
**Research:** 3 parallel research agents (shadcn mechanics, ecosystem/gap scan, agent-native landscape) + local repo inventory + ui-ux-pro-max design-skill pass. Sources at the end. Companion doc: [`docs/personas.md`](./personas.md) (Marco/Aira/Priya).

---

## 1. Recommendation (TL;DR)

**Release dual-track:**

1. **A shadcn-style registry (the new, primary channel)** — consumers run `npx shadcn add` and get our component *source code* copied into their repo. Hosted as static JSON from our domain + the GitHub repo itself. Zero npm-publish ceremony for us, zero lock-in for them.
2. **Keep the npm package (the versioned channel)** — for teams (Aira persona) who want real semver and `node_modules` isolation rather than owned source.

**Position it as the first agent-first M3 Expressive design system.** Two facts make that claim honest and unclaimed:
- Google officially does not implement M3 Expressive on the web; their web-components library is in maintenance mode.
- No major component library in 2026 markets itself primarily to coding agents — the category is open.

**License: MIT**, same as shadcn. "Open Source. Open Code."

---

## 2. How shadcn's model works (the 2-minute version)

**The mechanism.** `npx shadcn@latest add button` fetches a **registry-item JSON** (default upstream: `ui.shadcn.com/r/button.json`), installs its npm deps, and writes the raw `.tsx` source into your project at `components/ui/`. You now own that code — edit it, fork it, never update it again if you don't want to.

**The format.** A registry is JSON (schemas: `ui.shadcn.com/schema/registry.json` + `/registry-item.json`). Each item: `name`, `type` (e.g. `registry:ui`), `files[]` (with `@/components`-style target placeholders), `dependencies` (npm), `registryDependencies` (other items), `cssVars`, `css` hooks, `docs`, `categories`. Third parties publish by running `shadcn build` (static JSON to `public/r/`) or just committing a `registry.json` — no server required.

**How consumers reach third-party registries (2026):**
- URL: `npx shadcn add https://m3expressive.dev/r/button.json`
- GitHub: `npx shadcn add medianeth/m3-expressive/button` (pinnable `#v1.2.0`; private repos via `GH_TOKEN` since Aug 2026)
- Namespace: `npx shadcn add @m3/button` via the `registries` field in the consumer's `components.json`

**The model's weak spot — our opportunity.** No lock file, no per-component semver; updates are re-`add --overwrite` + `--diff` + manual merge. Teams that need versioned updates have no good answer. → Our npm track answers exactly that.

**Why it beat npm distribution (verified, in order):** full source ownership ("no version lock-in or hidden abstractions"); Tailwind-native restyleable output; neutral default look; and — explicitly — **AI agents**: "coding agents and engineers can both read and edit the same files." CLI v4 is "built for you and your coding agents." Agents work best with real source in the repo, not black-box `node_modules`. For the Marco persona this is architectural, not marketing.

---

## 3. The competitive gap (why now)

**Confirmed negative result: no established M3 / M3-Expressive shadcn-style registry exists** (Aug 2026). registry.directory indexes 82+ public registries — zero Material.

| Player | What it is | Threat level |
|---|---|---|
| Google `@material/web` | Lit web components; maintenance mode since Jun 2024; no Expressive; React-SSR-awkward | None |
| MUI | MD2-era Material, ~4M downloads/wk; M3 RFC open since 2022; responding with Pigment CSS, not a registry | Incumbent, no M3 |
| `@material-tailwind/react` | Material-*inspired* Tailwind kit, 65k/wk, not strict M3 | Low |
| `@bug-on/m3-expressive` | Genuine M3 Expressive npm package — 121 downloads/wk, conventional npm, no registry | Direct niche, tiny |
| `react-material-3-pure` | Solo zero-dep M3 port, 26 stars, M3-only (not Expressive), "shadcn-style CLI coming soon" per its Reddit launch | The clock is ticking |

**Urgency:** at least one solo dev has publicly announced moving toward exactly this idea. The window is open but not permanent.

**The convergence gift:** Base UI (Radix/Floating UI creators, MUI-funded) hit **v1.0 stable in Feb 2026** and became **shadcn's default primitive in July 2026**. This repo is *already built on Base UI* — meaning our components sit on the same foundation a shadcn-v4-era project already has installed. Dependency friction for registry adoption is near zero. ⚠️ Note: we pin `1.0.0-rc.0` while stable v1 exists — the rc.0→v1 migration is a Phase 0 item (AGENTS.md already tracks the 10 custom-by-design components waiting on v1 primitives like Badge, DatePicker/TimePicker).

---

## 4. What this repo already has (the head start)

| Existing asset | Role in the release |
|---|---|
| `src/lib/m3/registry.ts` — TABLE: 41 ids → source files | Input for generating `registry.json` items |
| `src/lib/m3/meta.ts` — props/variants/guidelines/exampleCode/importLine per component | `docs` + `categories` fields per item; agent metadata |
| `src/app/api/registry/route.ts` — machine-readable JSON API | Basis for `/r/{name}.json` registry-item endpoints |
| `mini-services/mcp-server` — 14 tools, 6 resources, 3 prompts | The agent-first differentiator (kept and extended) |
| `src/app/llms.txt/route.ts` — generated (never stale) agent handbook | Counters llms.txt's known staleness weakness |
| `audit/` — per-family M3 spec audits (spec vs implementation vs deviations) | Trust asset for the Priya persona; publish publicly |
| Theme Builder + `@material/material-color-utilities` | The Aira workflow (seed → scheme); survives both channels |
| Showcase site (41 live components + playgrounds) | The docs site; dogfoods the library |

A shadcn-style registry is a **build step**, not a rewrite: `scripts/build-registry.ts` reads the TABLE and emits static JSON per component + an index.

---

## 5. Release architecture

### 5.1 Registry track (new)

```
npx shadcn@latest add https://m3expressive.dev/r/button.json      # URL
npx shadcn@latest add medianeth/m3-expressive/button              # GitHub
npx shadcn@latest add @m3/button                                   # namespace
```

- **Build:** script generates one `registry:ui` item per component from the TABLE — `files: [{ path: "src/components/m3/Button.tsx", target: "@/components/m3/Button.tsx" }]`, npm `dependencies` (base-ui, framer-motion, clsx, tailwind-merge), `registryDependencies` for shared items (`MaterialSymbol`, `Ripple`).
- **Shared items beyond components:** `tokens` (the `--md-*` layer), `theme` (data-theme + .dark scheme wiring), `tailwind-map` (the `@theme inline` mapping from the README), `theme-builder`.
- **Hosting:** static JSON via the existing Next app (`/r/{name}.json`) + the GitHub repo root, so GitHub-syntax installs work from day one.
- **Free MCP discovery:** `npx shadcn registry:mcp` (Apr 2025) makes any registry MCP-compatible with zero config — we get standard-surface agent access *in addition to* our richer custom server.

### 5.2 npm track (kept)

The existing `m3-expressive-react` package continues: real semver, `node_modules` isolation, compiled barrels. This is the answer to shadcn's versioning weakness and the Aira/enterprise path. One rule: **the registry source and the npm package build from the same TABLE commit** — drift between channels is the main self-inflicted risk.

### 5.3 Versioning answer (our wedge vs shadcn)

- Registry: tag every release; GitHub-ref pinning (`#v1.2.0`) gives teams reproducible installs.
- npm: semver as usual.
- `--diff`-friendly policy: changelog per component, so `add --overwrite` merges are reviewable.

---

## 6. The agent-first differentiators (the "fan-out" productized)

Jomar's instinct maps cleanly onto the 2026 MCP state of the art (server-side sub-agents don't exist yet — **sampling**, **elicitation**, and the draft **Tasks** spec do; true fan-out lives client-side in Claude Code/Cursor subagents):

1. **Workflow tools that invite client fan-out.** Add MCP tools like `plan_screen(description)` → returns a component plan (ids + props + exampleCode snippets + guidelines) the host agent can fan out sub-agents per component; `audit_page` → returns per-component spec checks drawn from `audit/`. The server orchestrates *data*, the client orchestrates *agents* — this is the pattern that works today.
2. **Elicitation for design decisions** — MCP asks "seed color? dark mode default?" mid-tool, feeding the Theme Builder.
3. **Never-stale llms.txt** — generated from the registry at build time (already true here; make it a marketing line).
4. **exampleCode = contract** — every snippet runnable as-is; agents' first attempt is correct. This is Marco's success metric.
5. **Sampling later** — as the spec stabilizes, server-side planning/refinement.

---

## 7. Docs site & UX plan (ui-ux-pro-max pass + dogfooding rule)

- **The site IS the demo:** render the docs site with our own components (already true — keep it that way; reject the generic dev-tool mono/Swiss look).
- **Pattern:** search-first documentation landing — hero with prominent search → popular categories → FAQ → escalation path. Conversion focus: reduce friction to first component.
- **Hero CTA = the install command itself**, copy-button-first (the conversion IS the copy-paste), secondary "Connect the MCP server" code block for agents.
- **Landing structure (feature-rich showcase):** hero value prop ("M3 Expressive for React — the spec Google never shipped for the web") → live component grid → use cases (brand theming, agent workflow) → social proof (stars/downloads once real — never fake) → CTA.
- **Avoid the database's two named anti-patterns:** poor documentation, no live preview. Both are already strengths — protect them.
- **Promote "For AI agents"** from a nav item to a homepage section with the one-command MCP setup.
- Checklist gates from the skill: contrast 4.5:1 both modes, reduced-motion respected, 375px/768px/1024px/1440px, focus states, live preview on every component page.

---

## 8. Launch checklist

**Repo hygiene (before public):** MIT `LICENSE`; audit what ships (currently internal: `worklog.md`, `audit/` (keep — trust asset), `tool-results/` VR baselines (keep or split), `db/`, `.env` excluded, `dev.log`, `examples/`, `.zscripts/`); rename-friendly repo name decision; demo GIF/30s video; logo.
**Registry:** `scripts/build-registry.ts` + `/r/{name}.json` route + GitHub-root `registry.json`; test with a fresh Next+Tailwind4 sandbox app end-to-end.
**Agent surface:** `npx`-one-liner MCP config block; llms.txt regenerated in CI; `plan_screen` / `audit_page` MCP tools.
**Distribution:** submit to registry.directory; PR to awesome-shadcn-ui; Context7 submission; MCP server listings.
**Launch:** Show HN ("Show HN: M3 Expressive for React — the design system Google didn't ship for the web"), r/reactjs, r/materialdesign, X. Lead with the gap + live site + agent demo GIF.

---

## 9. Risks & open decisions

| Risk / decision | Notes |
|---|---|
| **Base UI rc.0 → v1 stable migration** | Phase 0 prerequisite-ish; aligns us with shadcn's default base; AGENTS.md already tracks the 10 custom-by-design components awaiting v1 primitives. Effort: medium. |
| **Dual-channel drift** | Registry source vs npm dist diverging. Mitigate: both built from the same TABLE in one CI job. |
| **Maintenance cost of two channels** | Real. The npm track is already built; the registry track is mostly a codegen script. Acceptable. |
| **Solo competitor shipping first** | `react-material-3-pure` announced a shadcn-style CLI "soon" (26 stars, M3-only). Our moat: 41 spec-audited components, audits published, MCP server, theme engine. Move in weeks, not quarters. |
| **Tailwind 4 requirement** | Full styling needs Tailwind 4 `@source` + `@theme inline` setup; the standalone `styles.css` path covers non-Tailwind users but with reduced fidelity. Document both paths clearly. |
| **"Agent-first" claim timing** | Category is unclaimed today; a bigger player could claim it. First-mover framing is honest as long as we ship the substance (MCP + llms.txt + metadata) — we already have. |
| **Domain/hosting** | `m3expressive.dev` (or similar) needed for URL-style installs; GitHub syntax works without it. |

## 10. Phased plan

- **Phase 0 — hygiene & alignment (decide, small):** MIT license, repo-contents audit, Base UI v1 migration spike (go/no-go before registry work).
- **Phase 1 — registry track:** build script, hosting route, GitHub-root registry, sandbox end-to-end test, first 5 components then all 41.
- **Phase 2 — agent surface:** MCP one-liner + `plan_screen`/`audit_page` tools, llms.txt CI sync, homepage "For AI agents" section.
- **Phase 3 — launch:** registry.directory, awesome lists, Show HN / Reddit, demo video.

---

## Sources

**shadcn model:** [docs](https://ui.shadcn.com/docs) · [registry-item.json](https://ui.shadcn.com/docs/registry/registry-item-json) · [registry.json](https://ui.shadcn.com/docs/registry/registry-json) · [GitHub registries](https://ui.shadcn.com/docs/registry/github) · [CLI](https://ui.shadcn.com/docs/cli) · [components.json](https://ui.shadcn.com/docs/components-json) · [CLI v4 changelog](https://ui.shadcn.com/docs/changelog/2026-03-cli-v4) · [eject](https://ui.shadcn.com/docs/changelog/2026-05-shadcn-eject) · [repo (MIT)](https://github.com/shadcn-ui/ui) · [Vercel: what is shadcn](https://vercel.com/i/what-is-shadcn)
**Agent-native:** [shadcn MCP](https://ui.shadcn.com/docs/mcp) · [shadcn skills](https://ui.shadcn.com/docs/skills) · [llmstxt.org](https://llmstxt.org/) · [MCP spec (sampling/draft Tasks)](https://modelcontextprotocol.io/specification/draft) · [elicitation](https://gofastmcp.com/servers/elicitation) · [Context7](https://context7.com/) · [Figma MCP](https://www.figma.com/blog/design-systems-ai-mcp/)
**Ecosystem & gap:** [registry.directory](https://registry.directory/) · [M3 web status](https://m3.material.io/develop/web) · [MUI 2026](https://mui.com/blog/2026-and-beyond/) · [Base UI v1](https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default) · [react-material-3-pure](https://github.com/0xXrer/react-material-3-pure) · [material-shadcn](https://github.com/sazzad-sat/material-shadcn) · [Park UI](https://park-ui.com/) · [Magic UI](https://magicui.design/) · [shadcn overtakes MUI](https://www.reddit.com/r/react/comments/1o20sep/shadcnui_just_overtook_material_ui/)
