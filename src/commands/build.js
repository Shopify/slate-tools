import spawn from 'cross-spawn';
import debug from 'debug';
import config from '../config';

const logger = debug('slate-tools:build');

export default function(program) {
  program
    .command('build')
    .description('Compiles raw Slate code from <theme>/src/ into the theme format required by a Shopify store (<theme>/dist/).')
    .action(() => {
      logger(`--gulpfile ${config.gulpFile}`);
      logger(`--cwd ${config.themeRoot}`);

      spawn(config.gulp, ['build', '--gulpfile', config.gulpFile, '--cwd', config.themeRoot], {
        detached: false,
        stdio: 'inherit',
      });
    });
}
