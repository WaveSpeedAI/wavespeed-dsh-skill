# WaveSpeed skill for DeepSeek Harness

[中文](README.zh.md)

A [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (dsh) skill that lets the agent generate and edit AI media — image, video, audio, 3D — through the [WaveSpeed](https://wavespeed.ai) platform, using the open-source [`@wavespeed/cli`](https://github.com/WaveSpeedAI/wavespeed-cli).

For images and videos the skill uses the CLI's shortcuts (`wavespeed generate|edit|extend`, defaults Seedream 5 Pro and Seedance 2.5), and the WaveSpeed MCP tools when they are connected. Every other model on the platform is one `wavespeed run <model-id>` call: the skill teaches the agent to browse the live catalog, read any model's input schema, and execute it — including uploading local files with the `@path` marker.

## Requirements

- Node.js ≥ 18
- The WaveSpeed CLI: `npm install -g @wavespeed/cli`
- A WaveSpeed account — `wavespeed login` opens the key page at [wavespeed.ai](https://wavespeed.ai) and handles the rest

## Install

As a dsh plugin (recommended — the bundle registers the skill automatically):

```bash
dsh plugin --profile web add github:WaveSpeedAI/wavespeed-dsh-skill
```

Or copy the skill directory by hand — project-level (checked into the repo,
shared with your team):

```bash
mkdir -p .dsh/skills
git clone --depth 1 https://github.com/WaveSpeedAI/wavespeed-dsh-skill /tmp/wss \
  && cp -r /tmp/wss/skills/wavespeed .dsh/skills/ && rm -rf /tmp/wss
```

User-level (available in every project):

```bash
mkdir -p ~/.dsh/skills
git clone --depth 1 https://github.com/WaveSpeedAI/wavespeed-dsh-skill /tmp/wss \
  && cp -r /tmp/wss/skills/wavespeed ~/.dsh/skills/ && rm -rf /tmp/wss
```

Other agents (Claude Code, Cursor, Codex): the CLI installs the same skill directly —

```bash
wavespeed skill install
```

Packaged plugins with the same skill and MCP server: [Claude Code](https://github.com/WaveSpeedAI/claude-plugins), [Codex](https://github.com/WaveSpeedAI/codex-plugins), [Gemini CLI](https://github.com/WaveSpeedAI/wavespeed-gemini-extension), [Kimi Code CLI](https://github.com/WaveSpeedAI/wavespeed-kimi-plugin), [OpenCode](https://github.com/WaveSpeedAI/wavespeed-opencode).

## What the agent can do with it

```bash
# text → image (default model: Seedream 5 Pro)
wavespeed generate image "a cyberpunk skyline at golden hour" --json

# edit a local image (uploaded automatically via @path)
wavespeed edit image "replace the background with a sunlit kitchen" --image @./input.jpg --json

# image → video (default model: Seedance 2.5); price it first, nothing is submitted
wavespeed generate video "subtle parallax" --first-frame @./hero.jpg --estimate --json

# any other model on the platform
wavespeed run <model-id> -p "..." --json
```

The skill also covers project aliases (`wavespeed.json`), schema introspection, price/balance checks, and prediction history.

## License

[MIT](LICENSE) — same as the CLI.

---

**[WaveSpeed AI](https://wavespeed.ai/)** — AI image & video generation platform.
Try it in the browser: **[Image generator](https://wavespeed.ai/image-generator)** · **[Video generator](https://wavespeed.ai/video-generator)**
