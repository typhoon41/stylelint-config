# @typhoon41/stylelint-config

> Strict, shareable config for scss projects using stylelint.

To see the rules that this config uses, please read the [config itself](./index.js).

## Installation

Stylelint and every plugin the config uses are dependencies of this package, so one install is enough:

```
npm install --save-dev @typhoon41/stylelint-config
```

## Usage

Just set your `stylelint` config to:

```json
{
  "extends": "@typhoon41/stylelint-config"
}
```


### Extending the config

Simply add a `"rules"` key to your config, then add your overrides and additions there.

For example, to indent with two spaces instead of tabs, allow the `fr` unit and turn off the `selector-max-id` rule:

```json
{
  "extends": "@typhoon41/stylelint-config",
  "rules": {
    "@stylistic/indentation": 2,
    "selector-max-id": null,
    "unit-allowed-list": ["px", "%", "em", "rem", "vw", "deg", "ms", "s", "fr"]
  }
}
```

## License

Apache-2 © Nikola Dragićević
