import spawn from 'cross-spawn';
import debug from 'debug';
import config from '../config';

const logger = debug('slate-tools:build');

export default function(program) {
  program
    .command('build')
    .alias('b')
    .description(`Compile theme files and assets,found in the 'dist' folder,
    into a Shopify theme. No files will be uploaded to your shop.`)
    .action(() => {
      logger(`--gulpfile ${config.gulpFile}`);
      logger(`--cwd ${config.themeRoot}`);

      spawn(config.gulp, ['build', '--gulpfile', config.gulpFile, '--cwd', config.themeRoot], {
        detached: false,
        stdio: 'inherit',
      });
    });
}
