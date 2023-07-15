/**
 * @Author: Mojie
 * @Date: 2023-07-07 21:03:09
 */

module.exports = {
  extends: '@antfu',
  rules: {
    'no-console': 'off',
    'antfu/if-newline': 'off',
    '@typescript-eslint/brace-style': 'off',
    'vue/component-tags-order': [
      'error',
      {
        order: ['template', 'script', 'style'],
      },
    ],
  },
}
