# WaveSpeed skill for DeepSeek Harness

[中文](README.zh.md)

A [DeepSeek Harness](https://github.com/deepseek-ai/harness) (dsh) skill that lets the agent generate and edit AI media — image, video, audio, 3D — through the [WaveSpeed](https://wavespeed.ai) platform, using the open-source [`@wavespeed/cli`](https://github.com/WaveSpeedAI/wavespeed-cli).

Every model on the platform is one `wavespeed run <model-id>` call. The skill teaches the agent the find → inspect → run pattern, so it can browse the live catalog, read any model's input schema, and execute it — including uploading local files with the `@path` marker.

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

## What the agent can do with it

```bash
# text → image
wavespeed run bytedance/seedream-v5.0-pro -p "a cyberpunk skyline at golden hour" --json

# edit a local image (uploaded automatically via @path)
wavespeed run bytedance/seedream-v5.0-pro/edit -p "replace the background with a sunlit kitchen" \
  -i images='["@./input.jpg"]' --json

# image → video
wavespeed run bytedance/seedance-2.5/image-to-video -p "subtle parallax" -i image=@./hero.jpg --json

# check the cost before running anything
wavespeed price bytedance/seedream-v5.0-pro -i resolution=2k
```

The skill also covers project aliases (`wavespeed.json`), schema introspection, price/balance checks, and prediction history.

## License

[MIT](LICENSE) — same as the CLI.

---

**[WaveSpeed AI](https://wavespeed.ai/)** — AI image & video generation platform.
Try it in the browser: **[Image generator](https://wavespeed.ai/image-generator)** · **[Video generator](https://wavespeed.ai/video-generator)**
