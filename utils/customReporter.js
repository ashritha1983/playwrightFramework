const { Reporter } = require('@playwright/test/reporter');

class CustomReporter {
  onTestEnd(test, result) {
    console.log(`Test: ${test.title}`);
    console.log("Stats:", JSON.stringify({
      startTime: result.startTime,
      duration: result.duration,
      expected: result.status === 'passed' ? 1 : 0,
      skipped: result.status === 'skipped' ? 1 : 0,
      unexpected: result.status === 'failed' ? 1 : 0,
      flaky: result.status === 'flaky' ? 1 : 0,
    }, null, 2));
  }
}

module.exports = CustomReporter;
