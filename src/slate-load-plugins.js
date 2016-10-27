const uniq = require('lodash').uniqBy;
const micromatch = require('micromatch');
const join = require('path').join;
const resolve = require('path').resolve;
const config = require('./tasks/includes/config');

module.exports = function() {
  const pattern = ['slate-*', 'slate.*', '@*/slate{-,.}*', '!@shopify/slate-tools'];
  const scope = ['dependencies', 'devDependencies', 'peerDependencies'];
  const themePackageJson = require(join(config.themeRoot, 'package.json'));
  const dependencyNames = scope.reduce((result, prop) => {
    return result.concat(Object.keys(themePackageJson[prop] || {}));
  }, []);

  const slatePlugins = uniq(micromatch(dependencyNames, pattern), (name) => {
    return name;
  });

  for (const plugin of slatePlugins) {
    try {
      require('require-dir')(resolve(config.themeRoot, `node_modules/${plugin}`));
    } catch (err) {
      console.error(`Could not add ${plugin} to slate tasks`);
    }
  }
};
