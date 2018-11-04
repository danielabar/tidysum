const Decimal = require('decimal.js');
const logger = require('./logger');

function calcAvg(expenseSummary) {
  Object.entries(expenseSummary).forEach(([year, yearSummary]) => {
    logger.info(`Reviewing year ${year}...`);
    let totalMonthly = 0;
    let monthCounter = 0;
    Object.entries(yearSummary).forEach(([month, monthSummary]) => {
      if (month !== 'total') {
        logger.info(`\tReviewing month ${month}...`);
        // totalMonthly += monthSummary.total;
        totalMonthly = sum(totalMonthly, monthSummary.total);
        monthCounter += 1;
      }
    });
    if (monthCounter !== 0) {
      expenseSummary[year].average = {
        monthly: divideAndRound(totalMonthly, monthCounter),
      };
    }
  });
  return expenseSummary;
}

function divideAndRound(numeratorIn, denominatorIn) {
  const numerator = new Decimal(numeratorIn);
  const denominator = new Decimal(denominatorIn);
  return numerator.dividedBy(denominator).toFixed(2);
}

function sum(in1, in2) {
  const in1Dec = new Decimal(in1);
  const in2Dec = new Decimal(in2);
  return in1Dec.plus(in2Dec);
}

module.exports = {
  calcAvg,
};
