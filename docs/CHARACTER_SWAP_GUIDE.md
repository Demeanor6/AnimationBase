# 主角轻松切换与架构设计指南 (Character Swap Guide)

本项目在 `JohnHeibel/ClaudeAnimationBase` 的基础上重构了角色子系统，采用了经典的面向对象与函数式组合设计模式，使得**场景代码（scenes）与具体主角解耦**——根据任意参考图绘制新主角后，只需切换一行配置或命令行参数即可让整部动画换角出演。

---

## 一、核心设计模式

1. **Registry + Factory Pattern (`src/character/registry.js`)**
   - `CharacterRegistry.register(id, blueprint)` 将每个角色作为一个自包含蓝图（Blueprint）注册到全局注册表，并对必备字段（`id`、`palette`、`metrics`、`views`、`parts`）进行校验。
   - 支持动态合并全局基础情绪库 `BASE_EMO` 与角色专属覆盖/扩展情绪（如可达鸭的 `headache`、`psychic`）。

2. **Blueprint Descriptor + Strategy Pattern (`src/characters/*.js`)**
   - 每个角色文件只描述自身比例参数、调色板、5 个关键朝向视图（`front` / `q` / `side` / `qback` / `back`）以及可插拔的解剖绘制策略 `parts`：
     - `aura`（背景光晕/超能力场，用 `glow()` 绘制在角色背后）
     - `backAppendages`（后层尾巴/远景特征）
     - `farArms`（后层手臂）
     - `legs`（脚部，保证 `y = 0` 贴地）
     - `backCrown`（头顶后方毛发/角，根部藏于头颅轮廓之后防穿帮）
     - `body`（统一轮廓水彩底色、明暗与单一连续墨线描边）
     - `frontAppendages`（背面视角下的前层尾巴）
     - `face`（脸颊腮红、眼睛、嘴/鸭嘴、面部配饰）
     - `hat`（复用的参数化共享帽子库，自动适配头顶高度与宽度）
     - `nearArms`（前层手臂与提神抱头动作）

3. **Template Method Pattern (`src/character/engine.js`)**
   - `CharacterEngine.draw(spec, x, y, u, o)` 统一接管与角色无关的通用渲染管线：
     - 自动隔离 `boilSeed`（保证静止背景不抖动、手部动画不干扰头部线条）
     - 统一计算阴影、残影 `smearTrail`、挤压拉伸 `squash & stretch`、朝向翻转 `flip`、情绪过渡 `emotions()`、表情符号 `emote` 锚点定位。

4. **Shared Parameterized Libraries (`src/character/shared_*.js`)**
   - 31 套标准情绪动作库 + 12 套节拍舞蹈库（`shared_emotions.js`）
   - 18 套绘本风表情符号（`shared_emotes.js`）
   - 15 顶帽子 + 3 种面部配饰（`shared_hats.js`），根据每个角色蓝图提供的 `hatY` / `hatW` / `bandY` / `earX` 自动缩放定位，不再写死矩形身体坐标。

5. **Facade Pattern (`src/character/facade.js`)**
   - 场景与图鉴只需调用统一门面函数 `actor(x, y, u, opts)` 或 `dancer(...)`，即可驱动当前激活的主角；需要同框多角色时也可显式调用 `actor.as('clawd', ...)` / `psyduck(...)` / `clawd(...)`。

6. **Inspector Pattern (`measure()` + `scripts/verify_clipping.mjs`)**
   - 角色蓝图中的几何生成器同时服务于渲染与 `spec.measure(x, y, u, o)`，可程序化导出所有部件的多边形与锚点，供零穿模自动化校验脚本逐帧检查交集与贴合度。

---

## 二、如何切换主角（三种方式）

### 方式 1：修改项目配置（全局切换）
编辑 [`src/config.js`](../src/config.js)：
```js
const PROJECT = {
  duration: 18,
  bpm: 120,
  offset: 0,
  character: 'clawd', // 从 'psyduck' 切换为 'clawd' 或你新注册的蓝图 ID
};
```

### 方式 2：命令行渲染时临时指定主角
```bash
node render.mjs --char=clawd --sheet=3.5,11.2,14.8 --cols=3 --w=640 --out=out/check/swap_clawd.jpg
node render.mjs --char=clawd --loop=emotions --sheet=1 --cols=1 --w=1920 --out=docs/clawd_emotions.jpg
```

### 方式 3：浏览器预览实时切换
打开 `studio.html?char=clawd` 或 `studio.html?char=psyduck&loop=views`。

---

## 三、如何根据新参考图添加新主角（4 步流程）

1. **复制模板**：将 [`src/characters/_template.js`](../src/characters/_template.js) 复制为 `src/characters/<new_id>.js`。
2. **提取参考图特征与比例**：以角色脚底中心 `(0, 0)` 为原点、单位 `u` 度量头身比、核心调色板（避免纯黑 `#000` 和纯白 `#FFF`，使用 `PAL.ink` 与暖米色）、关键轮廓控制点（用 `closedThrough()` 平滑闭合）以及 5 个朝向的 `views` 锚点。
3. **注册蓝图与自检函数**：在 `CharacterRegistry.register('<new_id>', { ... })` 中实现 `parts` 与共享同源几何的 `measure()`，并可根据需要补充该角色特有的 `emotionOverrides`。
4. **挂载并运行零穿模校验**：在 [`studio.html`](../studio.html) 中引入 `<script src="src/characters/<new_id>.js"></script>`，将 `PROJECT.character` 改为 `'<new_id>'`，运行：
   ```bash
   node render.mjs --loop=views --sheet=1 --cols=1 --w=1920 --out=docs/<new_id>_views.jpg
   node render.mjs --loop=emotions --sheet=1 --cols=1 --w=1920 --out=docs/<new_id>_emotions.jpg
   ```
   即可一键生成该新主角的图鉴表并直接套用所有既有场景！
