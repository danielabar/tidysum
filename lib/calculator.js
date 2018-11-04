const Decimal = require('decimal.js');
const logger = require('./logger');

function calcAvg(expenseSummary) {
  Object.entries(expenseSummary).forEach(([year, yearSummary]) => {
    logger.info(`Reviewing year ${year}...`);
    let totalMonthly = 0;
    let monthCounter = 0;
    let monthCategoryTotal = {};
    let monthCategoryAvg = {};
    expenseSummary[year].average = {};
    Object.entries(yearSummary).forEach(([month, monthSummary]) => {
      if (month !== 'total' && month !== 'average') {
        logger.info(`\tReviewing month ${month}...`);
        totalMonthly = sum(totalMonthly, monthSummary.total);
        Object.entries(monthSummary.byCategory).forEach(([category, monthCatTotal]) => {
          if (!monthCategoryTotal[category]) {
            monthCategoryTotal[category] = sum(0, monthCatTotal);
          } else {
            monthCategoryTotal[category] = sum(monthCategoryTotal[category], monthCatTotal);
          }
        });
        monthCounter += 1;
      }
    }); // for each month
    if (monthCounter !== 0) {
      expenseSummary[year].average.monthly = divideAndRound(totalMonthly, monthCounter);
      Object.entries(monthCategoryTotal).forEach(([cat, total]) => {
        monthCategoryAvg[cat] = divideAndRound(total, monthCounter);
      });
      expenseSummary[year].average.byCategory = monthCategoryAvg;
    }
  }); // for each year
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
