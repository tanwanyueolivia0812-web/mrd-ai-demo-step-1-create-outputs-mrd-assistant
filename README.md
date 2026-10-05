# MRD Studio — 产品 MRD AI 助手

当前实现：Step 1「定义研究任务」→ Step 2「AI 自动研究」→ Step 3「洞察与依据确认」→ Step 4「生成 MRD」→ Step 5 编辑与导出。

## 技术栈与运行模式

React 19、React DOM 19、Vite 6、JavaScript/JSX、原生 CSS、Lucide React 图标；markdown-it 渲染 Markdown，docx 生成真实 Word 文件。使用 History API 前端路由，无后端、数据库或真实 AI 服务。

**当前是单用户 Demo**：localStorage 仅在当前浏览器、当前站点保存任务草稿、审核记录和编辑版本；sessionStorage 保存当前标签页的研究结果、交接数据和生成草稿。不能跨设备或多用户共享。关闭标签页可能丢失研究上下文；清理站点数据会删除本地记录，换部署域名也不会迁移数据。重要文档请及时导出。

## 安装、本地开发和检查

使用 Node.js 22.x（见 .nvmrc）及 npm。项目以 package-lock.json 为唯一依赖锁文件。

```sh
npm ci
npm run dev
npm run typecheck
npm run lint
npm test
npm run build
```

也可用 `npm run check` 一次执行类型检查、Lint、测试及生产构建。JavaScript 类型检查使用 TypeScript 的 checkJs；项目没有迁移到 TypeScript。

开发地址通常为 http://127.0.0.1:5173。生产构建输出到 `dist/`。本地验证构建产物可运行 `npm run preview`；独立静态生产服务运行 `npm start`，监听 3000 端口并支持 SPA 回退。Vercel 直接托管 dist，无需运行 start 或维持 Node 服务器。

## 环境变量与 AI 密钥

当前版本 **不需要配置任何环境变量**。根目录 .env.example 仅包含说明和未来服务端集成的注释占位，不含真实密钥，也不启用未实现功能。

研究、MRD 生成和 AI Assist 均为本地模拟，当前没有 AI 模型网络调用、客户端 API Key 或服务端 AI API。不要在前端填写或硬编码密钥；VITE_ 变量会进入浏览器产物，不能用于保存秘密。未来接入真实模型时，应添加服务端 /api 接口，从服务端环境变量读取密钥，由浏览器调用该接口；同时检查 SPA 回退不覆盖 API 路由。

.gitignore 排除环境文件、密钥文件、本地上传目录、依赖、缓存和构建输出，仅允许 .env.example 提交。它无法自动识别源码里硬编码的密钥，也无法清除已有 Git 历史；本次检查未发现真实密钥。

## Vercel 部署

本次只完成部署准备，没有创建 GitHub 仓库或发布线上项目。

1. 将本目录作为 Vercel Root Directory（目录内应直接包含 package.json 与 vercel.json）。
2. Framework Preset：Vite；Node.js：22.x。
3. Install Command：`npm ci`；Build Command：`npm run build`；Output Directory：`dist`。
4. Environment Variables：无需配置。
5. vercel.json 已配置 SPA 回退，支持 /research、/evidence-review、/mrd、/mrd-editor 直接打开及刷新。新浏览器没有研究数据时，页面会按既有流程提示先完成前置步骤。

配置依据：[Vercel Vite 文档](https://vercel.com/docs/frameworks/frontend/vite)。本地检查不能替代真实 Vercel 部署后的冒烟验证。

## 上传与持久化边界

文件选择仅读取文件名、大小、类型与分类；不上传、不解析、不保存文件本体。粘贴的文字保存在浏览器数据中。页面的“已上传”是现有 Demo 状态，不代表已存入云端。当前没有本地 JSON、文件系统写入或需要迁移的服务端上传目录。

若后续需要保存原始文件，可在服务端预留 /api/uploads 授权接口，采用 Vercel Blob 或其他对象存储，将对象 ID/URL 记录在数据库中；当前没有连接该服务。BLOB_READ_WRITE_TOKEN 只在服务端配置。临时解析使用运行时临时目录，并在完成后清理；不能将临时文件作为持久数据或跨请求状态。参考：[Vercel Functions 运行时](https://vercel.com/docs/functions/runtimes)。

## 真实功能与模拟功能

| 类型 | 当前能力 |
| --- | --- |
| 真实本地功能 | 任务编辑、资料元数据/文本记录、人工审核、证据关联、章节编辑、浏览器保存、预览、定稿与版本恢复、Word .docx 导出 |
| 模拟/规则实现 | Agent 研究过程与来源、洞察、MRD 模板生成、AI 润色、优先级与质量检查；不搜索互联网、不调用模型，不代表事实核验 |
| 尚未实现 | 真实 AI、文件解析与云端保存、账号与多人协作、跨设备同步、PDF/Markdown 导出 |

## 流程

- `/`：填写产品想法、研究问题、用户、市场、研究重点与已知背景；资料可选。项目名称、产品想法、研究问题非空即可继续。
- `/research`：先展示 Research Plan，点击「开始 AI Research」后按时间模拟 Agent 的搜索、阅读、整理与分析活动；约 7 秒后展示结果。
- 默认全部研究方向：4 个用户痛点、5 个竞品、3 个市场趋势、3 个产品机会，25 个模拟公开来源；补充资料按实际数量另计。
- 按 Research Focus 执行任务。产品机会需要前三类研究作为依赖；未选择任何重点时自动探索全部方向。
- 结果包含部分来源预览、研究覆盖统计、Confidence 和保存的信息缺口。全部洞察 `status = pending`，Step 2 不能修改审核状态，Step 3 执行人工决策。
- `/evidence-review`：通用 Human Review Workspace，动态分类、过滤与搜索，逐条确认、修改、拒绝，查看支持/反向/背景证据。
- `/mrd`：读取审核后的 Confirmed Research Insights，展示生成设置、模拟生成过程、完整 MRD Draft 与只读依据追溯。
- `/mrd-editor`：通用编辑器，支持自动保存、AI Mock、依据查看、质量检查、定稿和真实 Word 导出。
- 重新研究重新播放过程；编辑 Brief 后旧结果失效。完成结果在同一浏览器标签页刷新后恢复。

## 数据与范围

这是明确标注的 Mock Research：不搜索互联网、不调用 AI、不读取真实产品网页、不解析上传文件。结论、产品定位、可信度均为「大学生 AI 学习助手」预设示例，不能作为已核验研究。公开来源的 `example.com` URL 为占位，发布日期未知为 `null`。

`agent-model.js` 的 `createMockResult(project)` 是未来 Search/Agent Provider 替换入口。结果统一存储：

- `brief`、`briefKey`：研究任务快照与内容指纹。
- `sources`：唯一 ID、标题、来源类型、URL、发布者、日期、摘要、相关性、类别。
- `insights`：四类洞察、摘要、confidence、impact、sourceIds、pending 状态。
- `opportunities`：用户问题、竞品空白、市场信号、产品机会与关联来源。
- `gaps`：信息缺口、建议与状态。

公开来源按 ID 去重；每个洞察的 `sourceIds` 都引用已有记录。补充资料保留元数据，不声称已验证其内容。

研究结果使用 sessionStorage 的 `mrd-agent-result-v1`；任务编辑使用 `mrd-research-active-v2`；主动保存的任务草稿使用 localStorage 的 `mrd-research-brief-v2`。更改研究任务后不会复用旧结果。

## 组件

- `src/main.jsx`：入口、步骤导航、Step 1 底部操作与路由。
- `src/ResearchTask.jsx`：任务定义各模块与 Research Brief。
- `src/OptionalMaterials.jsx`：资料上传、分类、粘贴文字、预览与删除。
- `src/research-model.js`：默认 Brief、校验与草稿恢复。
- `src/AgentWorkspace.jsx`：Research Plan、Activity Feed、任务状态、Coverage、结果预览。
- `src/agent-model.js`：Mock Provider、来源关联、研究范围、持久化与活动序列。
- `src/agent-workspace.css`：研究工作台响应式样式。
- `src/ReviewWorkspace.jsx`：通用三栏审核工作台、编辑/拒绝弹窗、证据面板。
- `src/review-model.js`：审核归一化、统计、保存与 Confirmed Insights 交接。
- `src/mock-review-data.js`：独立的示例证据数据适配器。
- `src/review-workspace.css`：审核工作台响应式样式。

旧的 `AnalysisPage.jsx` 等资料分析模块保留为历史参考，不在当前入口引用或打包。当前已实现 Step 3 证据审核与 Step 4 模板式 MRD 生成；已实现编辑器与 Word 导出；PDF、分享、协作尚未实现。


## Step 3 通用审核模型

`ReviewWorkspace.jsx` 不包含案例内容或固定分类数量。它从 `researchResults.insights` 和可选的 `gaps` 动态构建审核列表，`categories: [{ id, label }]` 可提供显示名称；未知 category 原样显示。来源读取 `sources`，证据读取 `evidence`（兼容 `evidences`）。`opportunities` 与 `gaps` 可省略。

`review-model.js` 负责归一化、分类统计、审核持久化与 MRD 输入门禁。所有输入洞察默认 pending；缺少类型时保守标记 hypothesis。Information Gap 同样需要处理。

- Confirm → confirmed；Edit 保存新 title / summary / type / impact / note → edited；Reject 保存原因与说明 → rejected。
- originalVersion 始终保留；editedVersion 单独存储。PM Note 可独立保存。
- 每次决策自动保存到 localStorage，另提供“保存审核进度”。存储失败显示错误，不声称已保存。
- 批量确认仅作用于 pending + fact + high；不会确认推断、假设或缺口。
- 来源数按 ID 去重；独立性依据 Source.independenceGroup。未标注时不宣称交叉验证；同一来源多条证据仍为 single-source。
- 内部文字资料可查看原文；上传文件仅保存元数据，会明确提示无法查看全文。
- 全部审核完成且至少采用一条后才允许进入 /mrd。直接访问路由仍会校验。
- Confirmed Research Insights 仅包含 confirmed / edited 的最终版本、原始版本、PM Notes 与关联依据；pending / rejected 被排除。确认的信息缺口作为 limitations。

存储键：`mrd-human-review-v1:<resultId>` 保存审核记录，研究内容指纹防止复用过期决策；`mrd-confirmed-input-v1` 保存 Step 4 交接数据。重开审核或修改备注会使旧 MRD 输入失效。

`mock-review-data.js` 是独立的演示证据 Provider，仅在新建默认 Mock Research 时执行，不会给任意替换数据注入案例内容。新建研究包含模拟支持、反向与背景摘要；旧研究如没有证据字段，会显示“尚未提供直接证据”，可重新研究体验新增样例。模拟片段不是原文引用。

验证覆盖：17 条动态洞察（含信息缺口）、反向证据、编辑保留原文、拒绝与备注、筛选、批量规则、刷新恢复、MRD 输入隔离、pending 路由拦截、移动端，以及替换为 CRM 法规/技术分类的通用数据。


## Step 4 通用 MRD Generator

`MrdGenerator.jsx` 只根据项目、审核交接数据及模板渲染，不包含产品案例内容。生成器是确定性 Demo：不调用 AI API，也不会编造新的市场数据或人物画像。

- 进入先显示 Generation Setup：确认输入及排除数量、文档名称、语言、详细程度、模板与目录预览。
- Standard MRD 默认 12 章；其他模板禁用并标记 Coming Soon。模板数组驱动章节顺序与数量，生成引擎支持传入自定义模板。
- 使用约 5 秒的 Activity/Progress 模拟组织过程，生成后保存 MRDDocument 与完整追溯快照。
- 每节可复制、只读查看支持依据、重新生成；单章重生成只改变表达与组织顺序，不影响其他章节或已确认研究。
- 整篇重新生成需要界面确认。进入编辑模式打开通用编辑器，人工修改独立保存。

### 输入约束与内容类型

生成前重新读取 Step 3 的当前审核状态，不直接信任过期交接快照。引擎自身再次过滤 `confirmed` / `edited`，只使用最终标题和摘要；Rejected/Pending 内容及仅与它们相关的来源不会传入文档内容。

- `research_backed`：来自已确认洞察；并不表示底层 Mock 来源已经真实核验。
- `ai_recommendation`：需求提案、优先级、差异化验证方向、Suggested Success Criteria。
- `needs_validation`：证据不足、假设、低可信判断、信息缺口，以及来自 Research Brief 的未验证用户范围/产品想法。

文档语言控制标题及组织文案（中文、英文、中英双语）。为避免无模型翻译改变已确认含义，洞察、证据和用户原文保持其原始语言，设置页明确提示。详细版增加依据计数、PM Notes 与边界说明；精简版省略部分需求解释。

### 优先级与质量

需求只停留在市场/用户层面，不生成 UI、按钮、API、数据库或开发验收细节。优先级为透明规则建议：

- P0：High impact + High confidence + 至少两个已标注独立支持来源 + 无记录的反向证据。
- P1：有支持，但未满足 P0 条件，或存在相反证据，需要先确认边界。
- P2：假设、低可信或缺少直接支持证据，先做探索验证。

每个需求保存 priorityFactors 和说明。Completeness 根据缺少的已确认输入/待验证内容提示 Needs More Evidence；Quality Check 检查关联 ID、输入状态及建议标签，不宣称替代事实核查。

### 通用扩展与持久化

- `mrd-templates.js`：模板、章节定义、语言配置和通用 category→role 映射。未知分类不丢失，仍进入 Research Appendix；可用 category metadata 的 `mrdRole` 显式映射章节。
- `mrd-generator.js`：输入过滤、需求及优先级、按模板生成章节、重生成、内容导出文本、完整性与结构校验。
- `MrdGenerator.jsx`：设置、Activity、MRD Preview、动态 TOC、Supporting Insights Drawer 。
- `mrd-generator.css`：生成与预览工作台响应式样式。

`mrd-generated-document-v1` 在 sessionStorage 保存草稿，包含 sections、requirements、sourceInsightIds、completeness、qualityChecks 与仅包含确认研究的 sourceSnapshot。研究/审核签名变化后旧草稿失效，直接访问 `/mrd` 或 `/mrd-editor` 同样检查门禁。

验证覆盖：MRD 输入二次过滤、PM 最终版本、来源闭包、CRM 通用生成、自定义两章模板、反向证据影响优先级、9 种语言/详细程度组合、单章隔离、剪贴板复制、重生成确认、刷新恢复、移动端与过期审核拦截。

## Step 5 编辑与导出

- `MrdEditor.jsx` 动态三栏编辑器：章节增删、上下移动、Markdown 加粗/斜体/标题/引用/列表/表格；安全只读 Preview 禁止原始 HTML。
- `editor-model.js` 保留原始内容，按文档 ID + inputSignature 隔离 localStorage。停止输入约 1 秒后自动保存；退出页面同步保存，失败明确提示。
- AI Assist 是确定性 Mock：重组、精简、列表化、评审结构与验证建议。自定义输入只识别部分意图；重新生成仅取当前章节确认洞察。建议必须手动应用，不调用 LLM。
- Evidence 只读显示洞察、支持/反向证据与来源，不修改研究数据。
- Quality Check 是启发式规则：引用资格、空章节、模板缺失、重复全文、缺口、新增量化内容、编辑偏离。语义矛盾和真实性仍需人工审查；Readiness 不是可信度概率。
- Final Review 展示章节与问题数量；定稿记录 Final、You 与时间。后续编辑回到 Draft 并递增版本。
- Version History 包含初始、人工快照、定稿、恢复前快照，最多 30 条。可查看并恢复为新 Draft。
- `word-export.js` 懒加载 docx，真实导出封面、当前顺序/内容、研究摘要；提供附录、证据引用和标签开关，支持表格与基础格式。
- PDF / Markdown 导出、评论、拖拽、PRD 不在本版实现范围。

验证脚本：`tests/editor-model.test.mjs`（CRM 通用性、原始内容、版本、质量规则、Markdown 安全）；原开发工作区的 `work/verify-editor.cjs`（编辑/恢复、AI、证据、质量、排序、预览、定稿、下载、版本恢复和移动端）。
