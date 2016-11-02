const spawn = require('cross-spawn');
const debug = require('debug')('slate-tools:start');
const config = require('./includes/config');

module.exports = function(program) {
  program
    .command('start')
    .alias('s')
    .description('Deploy theme, launch Browsersync in a new browser tab at http://localhost:3000 and watch for file changes.')
    .option('-e, --environment [environment]', 'deploy to a comma-separated list of environments', 'development')
    .option('-n, --nosync', 'watch for changes without using Browsersync')
    .action((options = {}) => {
      debug(`--gulpfile ${config.gulpFile}`);
      debug(`--cwd ${config.themeRoot}`);

      const args = ['--gulpfile', config.gulpFile, '--cwd', config.themeRoot, '--environment', options.environment];

      if (options.nosync) {
        args.push('--nosync');
      }

      spawn(config.gulp, args, {
        detached: false,
        stdio: 'inherit',
      });
    });
};
