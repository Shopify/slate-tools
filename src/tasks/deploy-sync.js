const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const fs = require('fs');
const yaml = require('js-yaml');
const debug = require('debug')('slate-tools:deploy');

const config = require('./includes/config.js');
const utils = require('./includes/utilities.js');
const messages = require('./includes/messages.js');

/**
 * Starts a [browserSync]{@link https://www.browsersync.io/} session proxying your
 * store URL when a `--sync` flag is passed to the default `gulp` function.
 *
 * @function deploy:sync-init
 * @memberof slate-cli.tasks.deploy
 * @static
 */
gulp.task('deploy:sync-init', () => {
  if (browserSync.active) {
    browserSync.exit();
  } else {
    fs.writeFileSync(config.deployLog, ''); // eslint-disable-line no-sync
  }

  const file = fs.readFileSync(config.tkConfig, 'utf8'); // eslint-disable-line no-sync
  const tkConfig = yaml.safeLoad(file);
  const queryStringComponents = [];
  const environment = config.environment.split(/\s*,\s*|\s+/)[0];

  const envObj = tkConfig[environment];
  const valid_id = utils.validateThemeId(envObj.theme_id);
  let proxyTarget = `https://${envObj.store}`;

  if (!valid_id) {
    messages.invalidThemeId(envObj.theme_id, environment);
    process.exit();
  }

  if (valid_id && typeof(valid_id) === "number") {
    proxyTarget += `?preview_theme_id=${valid_id}`;
  }

  debug(proxyTarget);

  /**
   * Shopify sites with redirection enabled for custom domains force redirection
   * to that domain. `?_fd=0` prevents that forwarding.
   */
  queryStringComponents.push('_fd=0');

  browserSync.init({
    proxy: {
      target: proxyTarget,
      middleware: (req, res, next) => {
        const prefix = req.url.indexOf('?') > -1 ? '&' : '?';
        req.url += prefix + queryStringComponents.join('&');
        next();
      },
    },
  });
});

/**
 * Starts a watcher to reload the [browserSync]{@link https://www.browsersync.io/}
 * session whenever a deploy completes.
 *
 * @function deploy:sync-reload
 * @memberof slate-cli.tasks.watch
 * @static
 */
gulp.task('deploy:sync-reload', ['deploy:sync-init'], () => {
  gulp.watch(config.tkConfig, ['deploy:sync-init']);
  gulp.watch(config.deployLog, () => {
    messages.logTransferDone();
    browserSync.reload();
  });
});
