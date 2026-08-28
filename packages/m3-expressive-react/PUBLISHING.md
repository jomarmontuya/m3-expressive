# Publishing checklist — m3-expressive-react

1. `cd packages/m3-expressive-react && bun run typecheck && bun run build`
   - dist/ must contain: index.js/.cjs/.d.ts, subpath entries, styles.css, compiled.css
2. Sanity: `bun -e "const m=await import('./dist/index.js'); console.log(Object.keys(m).length)"` → 104
3. `npm pack --dry-run` → 61 files, ~630 kB; confirm dist/ + README + LICENSE, no stray files
4. Version bump (semver): feat → minor, fix → patch; sync version in:
   - packages/m3-expressive-react/package.json
   - src/app/api/agent/route.ts (`package.version`)
   - src/app/llms.txt/route.ts (npm line)
   - homepage hero (v1.0.0 line in src/app/page.tsx area)
5. From a CLEAN checkout (dist/ is gitignored in CI — build fresh): `cd packages/m3-expressive-react && npm publish --access public` (2FA OTP when prompted)
6. Post-publish: `npm i m3-expressive-react` in a scratch Vite/Next project; import Button + styles.css AND compiled.css (no-Tailwind path); render + toggle dark
7. Tag: `git tag v<version> && git push --tags`

Known consumers notes: peer deps react 18/19 + framer-motion 11/12; Tailwind 4 users get smaller CSS via `@source` (see README); everyone else uses `dist/compiled.css`.
