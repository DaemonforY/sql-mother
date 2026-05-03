# Repository Guidelines

## Project Structure & Module Organization

This is a Vite + Vue 3 SQL practice app. Source code lives in `src/`.

- `src/pages/`: route-level views such as the learn page, levels page, and playground.
- `src/components/`: reusable UI components, including SQL editor, result table, and Markdown viewer.
- `src/core/`: browser-side SQL execution and result checking logic.
- `src/levels/main/`: required learning levels. Each level has `index.ts`, `README.md`, and `createTable.sql`.
- `src/levels/custom/`: practical and interview-style levels using the same three-file pattern.
- `src/assets/` and `public/`: images and static assets. `public/sql-wasm.wasm` is required by `sql.js`.
- `doc/`: README screenshots and documentation images.

## Build, Test, and Development Commands

Use npm, since `package-lock.json` is present.

```bash
npm install
npm run dev
npm run build
npm run preview
```

- `npm run dev`: starts the local Vite development server.
- `npm run build`: creates a production build and is the primary verification command.
- `npm run preview`: serves the production build locally.

There is currently no `npm test` script.

## Coding Style & Naming Conventions

Use Vue 3 single-file components with TypeScript where existing files do. The project uses ESLint with `plugin:vue/vue3-recommended` and Prettier; formatting violations are treated as lint errors.

Follow existing conventions:

- Components use PascalCase filenames, for example `SqlEditor.vue`.
- Level directories use `level31` for main levels or descriptive Chinese names for custom levels.
- Level keys should be stable and unique, for example `level35` or `interview_next_day_retention`.
- Keep level answers SQLite-compatible because execution uses `sql.js`.

## Testing Guidelines

No automated test framework is configured. For changes, run:

```bash
npm run build
```

For level changes, manually check that each new level includes `README.md`, `createTable.sql`, and `index.ts`, and that the answer SQL returns deterministic columns in the order requested by the prompt.

## Commit & Pull Request Guidelines

Recent history uses short conventional-style messages such as `feat: add more SQL practice levels`, `chore: include remaining project updates`, and `refactor: ...`. Prefer:

```text
feat: add retention interview level
fix: correct level answer SQL
chore: update documentation
```

Pull requests should include a clear summary, affected levels or UI areas, verification steps, and screenshots for visible UI changes. Link related issues when available.

## Agent-Specific Instructions

Do not commit generated `dist/` output. Avoid replacing binary assets unless necessary, and mention large asset changes explicitly in the PR description.
