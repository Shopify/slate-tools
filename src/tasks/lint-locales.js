const gulp = require('gulp');
const _ = require('lodash');
const chokidar = require('chokidar');
const registeredLinters = require('@shopify/theme-lint').linters;

const config = require('./includes/config.js');
const messages = require('./includes/messages.js');
const Reporter = require('./includes/lint-reporter.js').default;

/**
 * Recursively loops over all translations and keeps track of successes
 * and failures. The reporter then outputs the results once completed.
 *
 * @param {String} directory
 * @param {Array} linters
 * @returns {Function|String} Recursive function call or finalized output
 * @private
 */
function lintLocales(directory, linters, reporter = new Reporter()) {
  const Linter = linters[0];

  if (Linter) {
    const linter = new Linter(directory);

    return linter.run(reporter).then(() => {
      return lintLocales(directory, linters.slice(1), reporter);
    });
  } else {
    return reporter.finalize();
  }
}

/**
 * Runs translation tests using @shopify/theme-lint
 *
 * @function lint:locales
 * @memberof slate-cli.tasks.lint
 * @static
 */
gulp.task('lint:locales', () => {
  return lintLocales(config.src.root, _.values(registeredLinters));
});

/**
 * Watches locales in the `/src` directory
 *
 * @function watch:locales
 * @memberof slate-cli.tasks.watch
 * @static
 */
gulp.task('watch:locales', () => {
  chokidar.watch(config.src.locales, {ignoreInitial: true})
    .on('all', (event, path) => {
      messages.logFileEvent(event, path);
      lintLocales(config.src.root, _.values(registeredLinters));
    });
});

