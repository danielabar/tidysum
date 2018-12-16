const Decimal = require('decimal.js');

function divideAndRound(numeratorIn, denominatorIn) {
  const numerator = new Decimal(numeratorIn);
  const denominator = new Decimal(denominatorIn);
  return numerator
    .dividedBy(denominator)
    .toFixed(2)
    .toString();
}

function sum(in1, in2) {
  const in1Dec = new Decimal(in1);
  const in2Dec = new Decimal(in2);
  return in1Dec.plus(in2Dec).toString();
}

function subtract(in1, in2) {
  const in1Dec = new Decimal(in1);
  const in2Dec = new Decimal(in2);
  return in1Dec.minus(in2Dec).toString();
}

module.exports = {
  divideAndRound,
  sum,
  subtract,
};
