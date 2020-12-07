module.exports = {
  presets: [
    ['@vue/app', {
      polyfills: [
        'es6.promise',
        'es6.symbol',
        'es6.object.assign',
        'es6.map',
      ]}
    ]
  ],
  plugins: ["@babel/plugin-syntax-dynamic-import"]
}
