// Load check run by CI: lints a valid snippet and fails on an unknown or deprecated rule or an invalid rule option.
// A missing plugin makes stylelint.lint throw, which fails the check as well.
import stylelint from 'stylelint';
import configuration from './index.js';

const validScss = 'a {\n\tcolor: #FFF;\n}\n';
const { results: [result] } = await stylelint.lint({ code: validScss, codeFilename: 'check.scss', config: configuration });

const unknownRules = result.warnings.filter((warning) => warning.text.startsWith('Unknown rule'));
const problems = [
  ...unknownRules.map((warning) => warning.text),
  ...result.invalidOptionWarnings.map((warning) => warning.text),
  ...result.deprecations.map((deprecation) => deprecation.text)
];

if (problems.length > 0) {
  console.error(problems.join('\n'));
  process.exit(1);
}

console.log('The configuration loads without unknown or deprecated rules or invalid options.');
