import spawn from 'cross-spawn';
import debug from 'debug';
import config from '../config';

const logger = debug('slate-tools:watch');

export default function(program) {
  program
    .command('watch')
    .alias('w')
    .description('Runs a set of file watchers that monitor for code changes, and immediately deploy updates to your store as they happen. ' +
      'By default, this command also runs a live-reload proxy that refreshes your store URL in-browser whenever new changes are deployed.')
    .option('-e, --environment <env>[,<env>...]', 'Shopify store(s) to deploy code to (specified in config.yml - default: development)', 'development')
    .option('-n, --nosync', 'disable live-reload functionality')
    .action((options = {}) => {
      logger(`--gulpfile ${config.gulpFile}`);
      logger(`--cwd ${config.themeRoot}`);

      const args = ['watch', '--gulpfile', config.gulpFile, '--cwd', config.themeRoot, '--environment', options.environment];

      if (options.nosync) {
        args.push('--nosync');
      }

      spawn(config.gulp, args, {
        detached: false,
        stdio: 'inherit',
      });
    });
}
