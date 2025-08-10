module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./apps/*/tsconfig.json', './packages/*/tsconfig.json'],
    tsconfigRootDir: __dirname,
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier'
  ],
  settings: {
    'import/resolver': {
      typescript: {
        project: ['./apps/*/tsconfig.json', './packages/*/tsconfig.json']
      },
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        moduleDirectory: ['node_modules', '.']
      }
    }
  },
  rules: {
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        groups: [['builtin', 'external', 'internal'], ['parent', 'sibling', 'index']],
        alphabetize: { order: 'asc', caseInsensitive: true }
      }
    ]
  },
  ignorePatterns: ['**/dist/**', '**/node_modules/**', '**/*.d.ts']
};


