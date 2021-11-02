const filesystem = require('fs');
const webpack = require('webpack');
const util = require('util');

if(!filesystem.existsSync(`./dist`)) filesystem.mkdirSync(`./dist`)

const githubUsername = process.env.GITHUB_USERNAME;
const githubUsernameIsSet = githubUsername && typeof (githubUsername) === `string`  && githubUsername.trim() !== ``;
if(!githubUsernameIsSet) throw new Error(`GITHUB_USERNAME environment variable is not set.`);

const linkedinUsername = process.env.LINKEDIN_USERNAME;
const linkedinUsernameIsSet = linkedinUsername && typeof (linkedinUsername) === `string`  && linkedinUsername.trim() !== ``;
if(!linkedinUsernameIsSet) throw new Error(`LINKEDIN_USERNAME environment variable is not set.`);

const indexHTMLContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <script>
      window.env = {};
      window.env.GITHUB_USERNAME = "${githubUsername}";
      window.env.LINKEDIN_USERNAME = "${linkedinUsername}";
    </script>
    <script src="./main.js"></script>
  </head>
  <body></body>
</html>
`;

filesystem.writeFileSync(`./dist/index.html`, indexHTMLContent, `utf8`);
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
  if(bundleResult.hasErrors) console.error(bundleResult.toJson())
  else console.log(bundleResult.toJson())
})();
