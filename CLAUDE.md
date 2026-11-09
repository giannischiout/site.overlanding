@~/Studio/ai-skills/templates/studio-web.md

## This project
- **What:** Aurora Campers, a front-end-only Next.js site for renting campers and overlanding vehicles in Iceland. No database or CMS.
- **Brief:** no BRIEF.md yet. Follow the existing look in `src/app/styles.css` and ask before new visual directions.
- **Concept:** dark basalt + aurora green; concept skill: not written yet.
- **Tokens:** `src/app/styles.css` (`--basalt`, `--aurora`, `--primary`, ...). No raw hex in components.
- **Content:** JSON in `src/data/`, types in `src/types/content.ts`, images in `public/assets/`.

## Where code goes here
- `src/app/`: routes only, thin; they compose sections.
- `src/sections/<page>/`: page-specific sections. Split each into sibling files (e.g. `sections/vehicle-detail/gallery.tsx`); `index.tsx` only composes.
- `src/components/`: shared UI. `src/components/ui/`: shadcn/Radix primitives.
- `src/lib/<topic>.ts`: shared pure helpers (`pricing.ts`, `season.ts`, `iceland-map.ts`). New helpers go here, named by topic. `lib/utils.ts` is only for `cn()`-level generics.
- `src/utills/` is legacy and unused: don't add to it.
- `src/hooks/use-*.ts`: shared hooks. `src/store/`: zustand stores (booking, filters).

## Differences from the studio defaults
- Next.js 15.3 and React 19.1; there is no `node_modules/next/dist/docs/`, so use the Next 15 docs.
- React Compiler is **not** enabled. Still don't add `useMemo`/`useCallback` by default; only for a measured problem.
- Dates use `dayjs` (already installed); don't add another date library.
- Zod isn't installed yet. Add it when validating forms or data, per the studio rules.
- Package manager: pnpm. Don't start a second dev or build server while one runs on port 3000.
