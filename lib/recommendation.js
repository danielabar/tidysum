const decimalUtil = require('./decimal-util');
const logger = require('./logger');

function determine(expSum, monthlyIn, fixedExp) {
  Object.entries(expSum).forEach(([year, yearSummary]) => {
    logger.info(`Making recommendation for year ${year}...`);
    let interim = decimalUtil.subtract(monthlyIn, yearSummary.average.monthly);
    let final = decimalUtil.subtract(interim, fixedExp);
    const save6MonthsExpenses = decimalUtil.multiply(
      decimalUtil.sum(fixedExp, yearSummary.average.monthly),
      6
    );
    const save12MonthsExpenses = decimalUtil.multiply(
      decimalUtil.sum(fixedExp, yearSummary.average.monthly),
      12
    );
    yearSummary.recommendation = { save6MonthsExpenses, save12MonthsExpenses };
    if (decimalUtil.isNeg(final)) {
      let absFinal = decimalUtil.abs(final);
      logger.warn(
        `In year ${year} average variable expenses and fixed expenses exceeds monthly income by: ${absFinal}`
      );
      yearSummary.recommendation.reduceSpendingBy = absFinal;
    } else {
      yearSummary.recommendation.save = final;
    }
  }); //for each year
}

module.exports = { determine };
