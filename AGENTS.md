# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## What this is

`@typhoon41/stylelint-config`: a strict, shareable Stylelint 16 config for SCSS projects, published publicly on
npmjs.org. The whole package is `index.js`: one CommonJS `module.exports` object with `postcss-scss` as the custom
syntax and a `postcss-html` override for `**/*.vue`. The plugins it uses are runtime `dependencies` pinned to exact
versions, so consumers get them transitively and only extend the config (see `README.md`).

Marush (`Site/Gmf.Marush.Care.App/.stylelintrc.json`) consumes it.

## Commands

```sh
npm ci                  # install; the lockfile resolves from registry.npmjs.org
npm pack --dry-run      # the tarball must hold only index.js, package.json, README.md, LICENSE
node validate-configuration.mjs
```

The last command is the load check CI runs: it fails on an unknown rule, a missing plugin or an invalid rule option.
There are no unit tests; to see a rule's effect, link the package into a consumer (`npm link`) and lint there.

## Editing rules

- Every rule is listed explicitly, `null` included. Only `stylelint-config-property-sort-order-smacss` is extended
  (property order), so a rule missing from the list is off.
- A key repeated in the `rules` object silently overrides the earlier one: keep each rule once.
- After a dependency upgrade, go through its changelog for new, renamed and deprecated rules
  (an enabled rule the plugin removed breaks the load check).
- A rule that makes linting stricter fails consumers' builds: it is a breaking change (`feat!:`), released as a major
  version. A major upgrade of `stylelint` or a plugin is one too.

## Releasing

Released through the toolkit `release/` tooling (github.com/typhoon41/toolkit), configured by `release.json` and
`azure-pipelines.yml`. Commit and PR conventions and the version-bump flow are owned by the `conventional-commits` and
`toolkit-release` skills of the `conventions@toolkit` plugin; follow them instead of a copy here. In short: bump
`version` in `package.json` through a PR; the pipeline publishes to npm and creates the tag and GitHub release after
approval.
