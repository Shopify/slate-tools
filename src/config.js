import {join, normalize} from 'path';
import fs from 'fs';
import findRoot from 'find-root';

const workingDirectory = process.cwd();
const currentDirectory = __dirname;

const themeRoot = findRoot(workingDirectory);
const defaultPath = join(themeRoot, normalize('node_modules/.bin/gulp'));

const config = {
  gulpFile: join(currentDirectory, 'gulpfile.js'),
  gulp: resolveBinaryPath(defaultPath),
  themeRoot,
};

function resolveBinaryPath(file) {
  if (fs.existsSync(file)) {
    return join(themeRoot, normalize('node_modules/.bin/gulp'));
  } else {
    return join(themeRoot, normalize('node_modules/@shopify/slate-tools/node_modules/.bin/gulp'));
  }
}

export default config;
