# WaveSpeed skill for DeepSeek Harness

[English](README.md)

一个 [DeepSeek Harness](https://github.com/deepseek-ai/harness)（dsh）技能包：让 agent 通过 [WaveSpeed](https://wavespeed.ai) 平台生成与编辑 AI 媒体——图像、视频、音频、3D，底层使用开源的 [`@wavespeed/cli`](https://github.com/WaveSpeedAI/wavespeed-cli)。

平台上的每个模型都是一条 `wavespeed run <model-id>` 命令。技能教会 agent「查找 → 检查 → 运行」三步模式：搜索实时模型目录、读取任意模型的输入 schema、执行生成——包括用 `@path` 标记自动上传本地文件。

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
# 文生图
wavespeed run bytedance/seedream-v5.0-pro -p "a cyberpunk skyline at golden hour" --json

# 编辑本地图片（@path 自动上传）
wavespeed run bytedance/seedream-v5.0-pro/edit -p "replace the background with a sunlit kitchen" \
  -i images='["@./input.jpg"]' --json

# 图生视频
wavespeed run wavespeed-ai/minimax-h3/image-to-video -p "subtle parallax" -i image=@./hero.jpg --json

# 运行前先查价格
wavespeed price bytedance/seedream-v5.0-pro -i resolution=2k
```

技能还覆盖项目别名（`wavespeed.json`）、schema 自省、价格/余额查询与生成历史。

## 许可

[MIT](LICENSE)——与 CLI 相同。
