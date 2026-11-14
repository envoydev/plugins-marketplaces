# plugins-marketplaces

The catalogs that list envoydev's plugins, one per agent tool. Each plugin lives in its own repo; this repo only says
where to find them, so no plugin repo owns the catalog for the others.

| Tool | Catalog | Status |
|---|---|---|
| Claude Code | [`.claude-plugin/marketplace.json`](.claude-plugin/marketplace.json) | live - marketplace `envoydev` |
| Codex | - | planned |
| Cursor | - | planned |

## Claude Code

```bash
claude plugin marketplace add envoydev/plugins-marketplaces
claude plugin install alfred-code@envoydev --scope local
claude plugin install alfred-mods@envoydev
claude plugin install alfred-tools@envoydev
```

| Plugin | Repo | What it is |
|---|---|---|
| `alfred-code` | [envoydev/alfred-code](https://github.com/envoydev/alfred-code) | the coding-agent stack: guided install, update and configure of skills, agents, rules and hooks |
| `alfred-mods` | [envoydev/alfred-mods](https://github.com/envoydev/alfred-mods) | context, usage, cost, tool failures, agents, cache and plan progress in one band and an `/inspect` pane |
| `alfred-tools` | [envoydev/alfred-tools](https://github.com/envoydev/alfred-tools) | the MCP servers its owner tested and likes, set up for Claude Code and Cursor from one list; it was `preferred-tools` until 0.4.0 - install `alfred-tools@envoydev` and run `/alfred-tools:update` |

The marketplace name stays `envoydev`, so every plugin id (`alfred-code@envoydev`, ...) is the one it always was.

### Moving from the old marketplace

Until 2026-11 the `envoydev` marketplace was served from `envoydev/alfred-code`. That copy is gone, so an account
that added it points the marketplace here. Adding it again under the same name re-points it in place: every plugin
installed from it stays installed, and the ids and the `enabledPlugins` lines in your settings files stay the same.
Where a settings file lists `envoydev` under `extraKnownMarketplaces` (an account that added it with
`claude plugin marketplace add` has it in `~/.claude/settings.json`), change that entry's `repo` to
`envoydev/plugins-marketplaces` first - the CLI refuses an add whose source differs from it:

```bash
claude plugin marketplace add envoydev/plugins-marketplaces
claude plugin list        # a plugin the catalog no longer lists shows 'not found in marketplace envoydev'
```

Do not `claude plugin marketplace remove envoydev` first: removing a marketplace uninstalls every plugin installed from
it.

An admin who allows marketplaces through `strictKnownMarketplaces` allows
`{ "source": "github", "repo": "envoydev/plugins-marketplaces" }` in place of the old `envoydev/alfred-code` entry.

## How an entry is maintained

- Each plugin's own `.claude-plugin/plugin.json` is its manifest and carries its version; an entry here names only
  the repo, the branch it is served from (`main`, each repo's release branch), its description and category.
- A release is a merge to that plugin's `main`; nothing here changes for it. Pin an entry to a tag (`ref`) or a commit
  (`sha`) when a plugin should stop floating on `main`.
- `claude plugin validate --strict .` passes before every commit.

## Codex and Cursor

Their catalogs go beside the Claude Code one, each in the location its tool reads, once their plugin formats are
settled for these plugins.
