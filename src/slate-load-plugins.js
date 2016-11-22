const uniq = require('lodash').uniqBy;
const micromatch = require('micromatch');
const join = require('path').join;
const resolve = require('path').resolve;
const config = require('./tasks/includes/config');

function requireDependenciesArray(rootPath, directories) {
  for (const directory of directories) {
    try {
      require(resolve(rootPath, `node_modules/${directory}`));
    } catch (err) {
      console.error(`No additional tasks to load from ${directory}.`);
    }
  }
}

function requireThemeTasks(rootPath) {
  try {
    require('require-dir')(join(rootPath, 'tasks'));
  } catch (err) {
    console.error('No additional tasks to load from theme.');
  }
}

function getSlatePluginNames(packageJson) {
  const pattern = ['slate-*', 'slate.*', '@*/slate{-,.}*', '!@shopify/slate-tools'];
  const scope = ['dependencies', 'devDependencies', 'peerDependencies'];
  const dependencyNames = scope.reduce((result, prop) => {
    return result.concat(Object.keys(packageJson[prop] || {}));
  }, []);

  return uniq(micromatch(dependencyNames, pattern), (name) => {
    return name;
  });
}

module.exports = function() {
  const themePackageJson = require(join(config.themeRoot, 'package.json'));
  const slatePlugins = getSlatePluginNames(themePackageJson);

  requireThemeTasks(config.themeRoot);
  requireDependenciesArray(config.themeRoot, slatePlugins);
};
