# Iceland Experiences

A front-end-only Next.js site for renting vehicles in Iceland. There is no database or CMS.

## Run it

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000.

## Change the content

- **Text and data:** edit the JSON files in `src/data/`. Items refer to each other by `id`, and the site throws an error naming any `id` it can't find.
- **Images:** add files to `public/assets/` and reference them as `/assets/your-image.jpg`.
- **Data shapes:** the types are in `src/types/content.ts`.
