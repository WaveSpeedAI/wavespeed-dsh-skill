// wavespeed-dsh-skill — bundle entry.
// Registers the packaged skills/ tree as a custom skill provider, reusing
// the official filesystem provider so the skill loads exactly like a
// user-level skill (frontmatter parsing, watcher, ranks).
//
// Note: @deepseek-ai/dsh-skill-filesystem is NOT declared in dependencies —
// official packages are injected by the profile's pnpm closure at install
// time (declaring them fails on public npm).
import { fileURLToPath } from 'node:url'
import { FileSystemSkillProvider } from '@deepseek-ai/dsh-skill-filesystem'

export const name = 'wavespeed-dsh-skill'
export const inject = ['skills']

export function apply(ctx) {
  const skillDir = fileURLToPath(new URL('./skills/wavespeed', import.meta.url))
  ctx.skills.registerProvider((control) =>
    new FileSystemSkillProvider(ctx, control, {
      providerName: 'wavespeed-dsh-skill',
      customSkillDirs: [skillDir],
    }),
  )
}
