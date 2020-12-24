const decimalUtil = require('./decimal-util');
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
        totalMonthly = decimalUtil.sum(totalMonthly, monthSummary.total);
        Object.entries(monthSummary.byCategory).forEach(([category, monthCatTotal]) => {
          if (!monthCategoryTotal[category]) {
            monthCategoryTotal[category] = decimalUtil.sum(0, monthCatTotal);
          } else {
            monthCategoryTotal[category] = decimalUtil.sum(
              monthCategoryTotal[category],
              monthCatTotal
            );
          }
        });
        monthCounter += 1;
      }
    }); // for each month
    if (monthCounter !== 0) {
      expenseSummary[year].average.monthly = decimalUtil.divideAndRound(totalMonthly, monthCounter);
      Object.entries(monthCategoryTotal).forEach(([cat, total]) => {
        monthCategoryAvg[cat] = decimalUtil.divideAndRound(total, monthCounter);
      });
      expenseSummary[year].average.byCategory = monthCategoryAvg;
    }
  }); // for each year
  return expenseSummary;
}

function calcYearlyDiff(expenseSummary) {
  Object.entries(expenseSummary).forEach(([year, yearSummary]) => {
    const intYear = parseInt(year, 10);
    const prevYear = intYear - 1;
    if (!expenseSummary[prevYear]) {
      yearSummary.percentageDiffPreviousYear = 'N/A';
    } else {
      yearSummary.percentageDiffPreviousYear = {};
      Object.entries(yearSummary.average.byCategory).forEach(([curCategory, curAvg]) => {
        const prevAvg = expenseSummary[prevYear].average.byCategory[curCategory];
        if (!prevAvg) {
          yearSummary.percentageDiffPreviousYear[curCategory] = 'new category';
        } else {
          yearSummary.percentageDiffPreviousYear[curCategory] = decimalUtil.percentDiff(
            prevAvg,
            curAvg
          );
        }
      }); // for each category average within year
    }
  }); // for each year
  return expenseSummary;
}

module.exports = {
  calcAvg,
  calcYearlyDiff,
};
