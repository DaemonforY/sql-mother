# 仓库贡献指南

## 项目结构与模块组织

本项目是基于 Vite + Vue 3 的 SQL 闯关练习应用，源码位于 `src/`。

- `src/pages/`：页面级视图，例如学习页、关卡页和 SQL 广场。
- `src/components/`：可复用 UI 组件，例如 SQL 编辑器、结果表格和 Markdown 查看器。
- `src/core/`：浏览器端 SQL 执行、结果校验等核心逻辑。
- `src/levels/main/`：基础必修关卡。每个关卡包含 `index.ts`、`README.md`、`createTable.sql`。
- `src/levels/custom/`：实战进阶和面试题关卡，沿用同样的三文件结构。
- `src/assets/` 与 `public/`：图片和静态资源。`public/sql-wasm.wasm` 是 `sql.js` 运行所需文件。
- `doc/`：README 中使用的截图和说明图片。

## 构建、测试与本地开发命令

项目存在 `package-lock.json`，优先使用 npm。

```bash
npm install
npm run dev
npm run build
npm run preview
```

- `npm run dev`：启动 Vite 本地开发服务器。
- `npm run build`：执行生产构建，是当前主要验证命令。
- `npm run preview`：本地预览生产构建结果。

当前没有配置 `npm test` 脚本。

## 代码风格与命名规范

Vue 文件按现有写法使用 Vue 3 单文件组件和 TypeScript。项目配置了 ESLint、`plugin:vue/vue3-recommended` 和 Prettier，格式问题会作为 lint 错误处理。

遵循现有约定：

- 组件文件使用 PascalCase，例如 `SqlEditor.vue`。
- 主线关卡目录使用 `level31` 这类编号；自定义关卡使用描述性中文目录名。
- 关卡 `key` 必须稳定且唯一，例如 `level35` 或 `interview_next_day_retention`。
- 答案 SQL 必须兼容 SQLite，因为项目使用 `sql.js` 在浏览器中执行。

## 测试指南

当前没有自动化测试框架。改动后至少运行：

```bash
npm run build
```

新增或修改关卡时，确认每个关卡都包含 `README.md`、`createTable.sql` 和 `index.ts`，并确保答案 SQL 的字段顺序与题目要求一致，结果稳定可判定。

## 提交与 PR 规范

近期提交多使用简短的 conventional-style 信息，例如 `feat: add more SQL practice levels`、`chore: include remaining project updates`、`refactor: ...`。建议格式：

```text
feat: add retention interview level
fix: correct level answer SQL
chore: update documentation
```

PR 应包含清晰摘要、影响范围、验证步骤；涉及界面变化时附截图；如有关联 issue，请在描述中链接。

## Agent 专用注意事项

不要提交生成的 `dist/` 构建产物。除非确有必要，避免替换二进制资源；如果修改了较大的图片或 wasm 等资源，需要在 PR 描述中明确说明。
