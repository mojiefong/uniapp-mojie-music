module.exports = {
  extends: '@antfu',
  rules: {
    'no-console': 'off',
    'vue/component-tags-order': [
      'error',
      {
        order: ['template', 'script', 'style'],
      },
    ],
  },
}
