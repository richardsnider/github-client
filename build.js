const filesystem = require('fs');
const webpack = require('webpack');
const util = require('util');

if (!filesystem.existsSync(`./dist`)) filesystem.mkdirSync(`./dist`)

filesystem.copyFileSync(`./src/index.html`, `./dist/index.html`);
filesystem.copyFileSync(`./src/styles.css`, `./dist/styles.css`);

/** @type {import('webpack').Configuration[]} */
const webpackConfig = {
  devtool: `source-map`,
  mode: `production`
}

const bundle = util.promisify(webpack);
const bundleTask = bundle(webpackConfig);

(async () => {
  /** @type {import('webpack').MultiStats} */
  const bundleResult = await bundleTask
  if (bundleResult.hasErrors) console.error(bundleResult.toJson())
  else console.log(bundleResult.toJson())
})();
