# WaveSpeed skill for DeepSeek Harness

[English](README.md)

一个 [DeepSeek Harness](https://github.com/deepseek-ai/harness)（dsh）技能包：让 agent 通过 [WaveSpeed](https://wavespeed.ai) 平台生成与编辑 AI 媒体——图像、视频、音频、3D，底层使用开源的 [`@wavespeed/cli`](https://github.com/WaveSpeedAI/wavespeed-cli)。

图片和视频走 CLI 的快捷命令（`wavespeed generate|edit|extend`，默认模型 Seedream 5 Pro 和 Seedance 2.5），连接了 WaveSpeed MCP 时也可直接用它的工具。平台上的其他模型都是一条 `wavespeed run <model-id>` 命令：技能教会 agent 搜索实时模型目录、读取任意模型的输入 schema、执行生成——包括用 `@path` 标记自动上传本地文件。

## 依赖

- Node.js ≥ 18
- WaveSpeed CLI：`npm install -g @wavespeed/cli`
- WaveSpeed 账号——`wavespeed login` 会打开 [wavespeed.ai](https://wavespeed.ai) 的密钥页面并处理剩下的事

## 安装

作为 dsh 插件（推荐——bundle 会自动注册技能）：

```bash
dsh plugin --profile web add github:WaveSpeedAI/wavespeed-dsh-skill
```

或手动复制技能目录——项目级（进 git，团队共享）：

```bash
mkdir -p .dsh/skills
git clone --depth 1 https://github.com/WaveSpeedAI/wavespeed-dsh-skill /tmp/wss \
  && cp -r /tmp/wss/skills/wavespeed .dsh/skills/ && rm -rf /tmp/wss
```

用户级（所有项目可用）：

```bash
mkdir -p ~/.dsh/skills
git clone --depth 1 https://github.com/WaveSpeedAI/wavespeed-dsh-skill /tmp/wss \
  && cp -r /tmp/wss/skills/wavespeed ~/.dsh/skills/ && rm -rf /tmp/wss
```

其他 agent（Claude Code、Cursor、Codex）：CLI 直接安装同一份技能——

```bash
wavespeed skill install
```

## agent 能用它做什么

```bash
# 文生图（默认模型 Seedream 5 Pro）
wavespeed generate image "a cyberpunk skyline at golden hour" --json

# 编辑本地图片（@path 自动上传）
wavespeed edit image "replace the background with a sunlit kitchen" --image @./input.jpg --json

# 图生视频（默认模型 Seedance 2.5），先估价，不会提交
wavespeed generate video "subtle parallax" --first-frame @./hero.jpg --estimate --json

# 平台上的任何其他模型
wavespeed run <model-id> -p "..." --json
```

技能还覆盖项目别名（`wavespeed.json`）、schema 自省、价格/余额查询与生成历史。

## 许可

[MIT](LICENSE)——与 CLI 相同。
