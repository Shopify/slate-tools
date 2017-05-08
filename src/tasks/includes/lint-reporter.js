const gutil = require('gulp-util');

/** Class representing a custom reporter for @shopify/theme-lint */
export default class Reporter {
  constructor() {
    this.successes = [];
    this.failures = [];
  }

  /**
   * Pushes a valid message onto successes.
   *
   * @param {String} message
   * @param {String} file
   */
  success(message, file = null, index = null) {
    this.successes.push([message, file, index]);
  }

  /**
   * Pushes an invalid message onto failures.
   *
   * @param {String} message
   * @param {String} file
   */
  failure(message, file = null, index = null) {
    this.failures.push([message, file, index]);
  }

  /**
   * Finalizes string output for translation tests
   * depending on successes and failures.
   */
  finalize() {
    const testsRun = this.failures.length + this.successes.length;

    if (this.failures.length === 0) {
      gutil.log('Translation tests complete:',
        gutil.colors.green(`Success (${testsRun} checks run)`),
      );
    } else {
      gutil.log('Translation tests complete:',
        gutil.colors.red(`Failed (${testsRun} checks run)`),
      );

      this.failures.forEach(([message, file]) => {
        gutil.log(gutil.colors.red(`${file}:`));
        gutil.log(message);
      });
    }
  }
}
