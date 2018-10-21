const babelOpt = {
  targets: {
    node: '8.12',
  },
  useBuiltIns: 'usage',
  modules: false,
};

const presets = [
  [
    '@babel/env',
    babelOpt,
  ],
  '@babel/preset-react',
];

/*
  config for jest
  see: https://jestjs.io/docs/ja/getting-started.html#babel-%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%99%E3%82%8B
*/
const env = {
  test: {
    presets: [
      [
        '@babel/env',
        Object.assign({}, babelOpt, { modules: 'commonjs' }),
      ],
    ],
  },
};

module.exports = { presets, env };
