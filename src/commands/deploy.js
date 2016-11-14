import spawn from 'cross-spawn';
import debug from 'debug';
import config from '../config';

const logger = debug('slate-tools:deploy');

export default function(program) {
  program
    .command('deploy')
    .alias('d')
    .description('Builds your theme and uploads the theme to the store(s) set by the environments(s) in your config.yml.')
    .option('-e, --env [environment]', 'deploy to a comma-separated list of environments', 'development')
    .option('-m, --manual', `disable auto-deployment of the theme files,
    you need to manually upload the newly created zip file`)
    .action((options = {}) => {
      logger(`--gulpfile ${config.gulpFile}`);
      logger(`--cwd ${config.themeRoot}`);

      const args = options.manual ? ['deploy:manual'] : ['deploy', '--env', options.environment];

      spawn(config.gulp, args.concat(['--gulpfile', config.gulpFile, '--cwd', config.themeRoot]), {
        detached: false,
        stdio: 'inherit',
      });
    });
}
