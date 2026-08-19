# WaveSpeed skill for DeepSeek Harness

A [DeepSeek Harness](https://github.com/deepseek-ai/harness) (dsh) skill that lets the agent generate and edit AI media — image, video, audio, 3D — through the [WaveSpeed](https://wavespeed.ai) platform, using the open-source [`@wavespeed/cli`](https://github.com/WaveSpeedAI/wavespeed-cli).

Every model on the platform is one `wavespeed run <model-id>` call. The skill teaches the agent the find → inspect → run pattern, so it can browse the live catalog, read any model's input schema, and execute it — including uploading local files with the `@path` marker.

## Requirements

- Node.js ≥ 18
- The WaveSpeed CLI: `npm install -g @wavespeed/cli`
- A WaveSpeed account — `wavespeed login` opens the key page at [wavespeed.ai](https://wavespeed.ai) and handles the rest

## Install

Project-level (recommended — checked into the repo, shared with your team):

```bash
mkdir -p .dsh/skills
git clone --depth 1 https://github.com/WaveSpeedAI/wavespeed-dsh-skill /tmp/wss \
  && cp -r /tmp/wss/wavespeed .dsh/skills/ && rm -rf /tmp/wss
```

User-level (available in every project):

```bash
mkdir -p ~/.dsh/skills
git clone --depth 1 https://github.com/WaveSpeedAI/wavespeed-dsh-skill /tmp/wss \
  && cp -r /tmp/wss/wavespeed ~/.dsh/skills/ && rm -rf /tmp/wss
```

Other agents (Claude Code, Cursor, Codex): the CLI installs the same skill directly —

```bash
wavespeed skill install
```

## What the agent can do with it

```bash
# text → image
wavespeed run google/nano-banana-2/text-to-image -p "a cyberpunk skyline at golden hour" --json

# edit a local image (uploaded automatically via @path)
wavespeed run google/nano-banana-2/edit -p "replace the background with a sunlit kitchen" \
  -i images='["@./input.jpg"]' --json

# image → video
wavespeed run bytedance/seedance-2.0/image-to-video -p "subtle parallax" -i image=@./hero.jpg --json

# check the cost before running anything
wavespeed price google/nano-banana-2/text-to-image -i resolution=2k
```

The skill also covers project aliases (`wavespeed.json`), schema introspection, price/balance checks, and prediction history.

## License

[MIT](LICENSE) — same as the CLI.
