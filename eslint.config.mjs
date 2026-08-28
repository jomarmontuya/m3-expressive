// Ported from fastpromos `tooling/eslint-config` (base + react + nextjs),
// inlined because this repo is a single workspace, not a monorepo.
// Adaptations for this repo are marked with "m3:" comments.
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import nextPlugin from '@next/eslint-plugin-next';

const MAX_FILE_LINES = 250;

// Length here tracks generated or authored content volume, not logic a
// reviewer must follow, so a size ceiling would fire on regenerations and
// data tables rather than on anything worth refactoring.
const generatedOrNonSourceFiles = [
  // m3: none yet — fastpromos listed generated Payload/primitives output here.
];

// Literal content with no control flow: each declares one exported value and
// contains zero functions, so its length is the size of the catalogue it
// carries. Splitting these yields arbitrary halves, not smaller units of
// meaning. Add a file here only when it has no logic to extract.
const contentDataModules = [
  // m3: component metadata catalogue (41 components), grows with the library.
  '**/src/lib/m3/meta.ts',
  '**/src/lib/m3/themes.ts',
  '**/src/components/showcase/playground-specs.tsx',
];

// A spec's length tracks how many cases the behavior needs, and ESLint reads a
// `describe` block as one long function, so a ceiling here would force
// meaningless numbered shards instead of better tests.
const testFiles = [
  '**/tests/**/*.{ts,tsx}',
  '**/tests-integration/**/*.{ts,tsx}',
  '**/*.test.{ts,tsx}',
];

// m3: Files that already exceeded the `max-lines` ceiling when the fastpromos
// config was adopted here. This list only shrinks. Refactor a file, then
// delete its entry. A new violation must be fixed rather than added here —
// that is the whole point of the baseline. The trailing number is the line
// count at the time of writing.
const maxLinesBaseline = [
  '**/mini-services/mcp-server/index.ts', // 835
  '**/src/components/m3/Carousel.tsx', // 322
  '**/src/components/m3/DatePicker.tsx', // 718
  '**/src/components/m3/SearchView.tsx', // 274
  '**/src/components/m3/TimePicker.tsx', // 310
  '**/src/components/showcase/ComponentView.tsx', // 428
  '**/src/components/showcase/DocsView.tsx', // 658
  '**/src/components/showcase/FoundationsView.tsx', // 484
  '**/src/components/showcase/MCPPlayground.tsx', // 841
  '**/src/components/showcase/ThemeBuilderTab.tsx', // 436
  '**/src/components/showcase/demos/actions-demos.tsx', // 417
  '**/src/components/showcase/demos/containment-demos.tsx', // 401
  '**/src/components/showcase/demos/feedback-demos.tsx', // 256
  '**/src/components/showcase/demos/inputs-demos.tsx', // 298
  '**/src/components/showcase/demos/navigation-demos.tsx', // 322
  '**/src/components/ui/chart.tsx', // 315
  '**/src/components/ui/menubar.tsx', // 257
  '**/src/components/ui/sidebar.tsx', // 661
];

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  {
    ignores: [
      // fastpromos base ignores
      '**/node_modules/**',
      '**/.next/**',
      '**/.turbo/**',
      '**/dist/**',
      '**/coverage/**',
      '**/.payload/**',
      '**/*.tsbuildinfo',
      // m3: carried over from this repo's previous config
      '.qa4b/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'examples/**',
      'skills',
      'packages/**/dist/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    languageOptions: {
      parserOptions: { projectService: true },
    },
    rules: {
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/only-throw-error': 'error',
      '@typescript-eslint/require-array-sort-compare': ['error', { ignoreStringArrays: true }],
      '@typescript-eslint/return-await': ['error', 'in-try-catch'],
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
    },
  },
  {
    ...tseslint.configs.disableTypeChecked,
    files: [
      '**/*.config.{ts,tsx,mts,cts}',
      '**/scripts/**/*.{ts,tsx,mts,cts}',
    ],
  },
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: { ...globals.node },
    },
    rules: {
      'array-callback-return': ['error', { allowImplicit: false, checkForEach: true }],
      'default-case-last': 'error',
      'default-param-last': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-promise-executor-return': 'error',
      'no-return-assign': ['error', 'always'],
      'no-unmodified-loop-condition': 'error',
      'no-useless-assignment': 'error',
      'prefer-promise-reject-errors': 'error',
      // m3: fastpromos also bans direct `process.env` reads (it routes them
      // through a Zod-validated src/env.ts). This repo has no env module, so
      // that rule and its exemption list were not ported.
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    // Comments are skipped so documenting a module never costs it headroom.
    files: ['**/*.{ts,tsx,mts,cts}'],
    rules: {
      'max-lines': ['error', { max: MAX_FILE_LINES, skipBlankLines: true, skipComments: true }],
    },
  },
  {
    files: [...testFiles, ...generatedOrNonSourceFiles, ...contentDataModules],
    rules: { 'max-lines': 'off' },
  },
  // The spread keeps this config valid once the baseline reaches zero entries.
  ...(maxLinesBaseline.length > 0
    ? [{ files: maxLinesBaseline, rules: { 'max-lines': 'off' } }]
    : []),
  prettier,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      globals: { ...globals.browser },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      'react/no-object-type-as-default-prop': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: { '@next/next': nextPlugin },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
];

export default eslintConfig;
