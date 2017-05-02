const gulp = require('gulp');
const plumber = require('gulp-plumber');
const size = require('gulp-size');
const _ = require('lodash');
const registeredLinters = require('@shopify/theme-lint').linters;

const config = require('./includes/config.js');
const utils = require('./includes/utilities.js');
const messages = require('./includes/messages.js');
const Reporter = require('./includes/lint-reporter.js').default;

/**
 * Copies locales to the `/dist/locales` directory
 *
 * @param {String} directory
 * @returns {Stream}
 * @private
 */
function processLocales(directory) {
  messages.logProcessFiles('build:locales');

  return gulp.src(directory, {base: config.src.root})
    .pipe(plumber(utils.errorHandler))
    .pipe(size({
      showFiles: true,
      pretty: true,
    }))
    .pipe(gulp.dest(config.dist.root));
}

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
 * Copies locales to the `/dist/locales` directory
 *
 * @function build:locales
 * @memberof slate-cli.tasks.build
 * @static
 */
gulp.task('build:locales', () => {
  return processLocales(config.src.locales);
});

/**
 * Runs translation tests using @shopify/theme-lint
 *
 * @function lint:locales
 * @memberof slate-cli.tasks.lint
 * @static
 */
gulp.task('lint:locales', () => {
  return lintLocales(config.dist.root, _.values(registeredLinters));
});
