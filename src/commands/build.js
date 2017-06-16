import spawn from 'cross-spawn';
import debug from 'debug';
import config from '../config';

const logger = debug('slate-tools:build');

export function build() {
  logger(`--gulpfile ${config.gulpFile}`);
  logger(`--cwd ${config.themeRoot}`);

  return spawn(config.gulp, ['build', '--gulpfile', config.gulpFile, '--cwd', config.themeRoot], {
    detached: false,
    stdio: 'inherit',
  });
}

export default function(program) {
  program
    .command('build')
    .alias('b')
    .description('Compiles source files (<theme>/src/) into the format required for distribution to a Shopify store (<theme>/dist/).')
    .action(build);
}
