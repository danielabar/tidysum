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

function multiply(in1, in2) {
  const in1Dec = new Decimal(in1);
  const in2Dec = new Decimal(in2);
  return in1Dec.mul(in2Dec).toString();
}

function isNeg(in1) {
  const inDec = new Decimal(in1);
  return inDec.isNegative(inDec);
}

function abs(in1) {
  const inDec = new Decimal(in1);
  return inDec.abs(inDec).toString();
}

function percentDiff(prev, cur) {
  const prevDec = new Decimal(prev);
  const curDec = new Decimal(cur);
  const diff = curDec.minus(prevDec);
  return diff
    .dividedBy(prevDec)
    .mul(100)
    .toDecimalPlaces(2, Decimal.ROUND_HALF_UP)
    .toString();
}

module.exports = {
  divideAndRound,
  sum,
  subtract,
  multiply,
  isNeg,
  abs,
  percentDiff,
};
