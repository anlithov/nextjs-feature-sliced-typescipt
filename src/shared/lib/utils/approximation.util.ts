import bn from 'bignumber.js';

const bigNumberFormatter = (num: string, afterComaMax = 2): string => {
  const lookup = [
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'B' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'Q' },
  ];
  const rx = /\.0+$|(\.\d*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find((el) => {
      return bn(num).isGreaterThanOrEqualTo(bn(el.value));
    });
  return item
    ? formRoundedPositiveNum(bn(num).div(bn(item.value)).toString(), afterComaMax).replace(rx, '$1') + item.symbol
    : num;
};

const formRoundedPositiveNum = (num: string, afterComaMax = 2): string => {
  const numStage = num;
  if (!numStage) {
    return '0';
  }
  const delimiter = bn(10).times(afterComaMax);
  // 1 / delimeter * 10
  const res = bn(bn(1).div(delimiter)).times(10);
  if (bn(numStage).isLessThan(res)) {
    return res.toString();
  }
  return bn(num).toFixed(afterComaMax);
};

export const formRoundedNum = (num: string, afterComaMax = 2): string => {
  if (bn(num).isLessThanOrEqualTo(0)) {
    return '0';
  }
  return formRoundedLowerZero(num, afterComaMax);
};

export const formRoundedPositiveValue = ({
  num,
  afterComaMax = 2,
  symbol,
  symbolPos,
}: {
  num: string;
  afterComaMax?: number;
  symbol?: string;
  symbolPos?: 'before' | 'after';
}) => {
  let numStage;
  if (bn(num).isGreaterThan(1e9)) {
    numStage = `${bigNumberFormatter(num)}`;
  } else if (bn(num).isGreaterThan(0.01)) {
    numStage = `${formRoundedPositiveNum(num, afterComaMax)}`;
  } else if (bn(num).isLessThan(0.01) && num !== '0') {
    numStage = '<0.01';
  } else {
    numStage = `${num}`;
  }

  if (symbol) {
    return symbolPos === 'before' ? `${symbol}${numStage}` : `${numStage}${symbol}`;
  }
  return numStage;
};

export const formRoundedValue = ({
  num,
  afterComaMax = 2,
  symbol,
  symbolPos = 'before',
}: {
  num: string | number;
  afterComaMax?: number;
  symbol?: string;
  symbolPos?: 'before' | 'after';
}): string => {
  const final = String(num);
  const numStage = formRoundedNum(final, afterComaMax);

  if (symbol) {
    return symbolPos === 'before' ? `${symbol}${numStage}` : `${numStage}${symbol}`;
  }

  return numStage.toString();
};

export const formRoundedLowerZero = (num: string, afterComa = 4): string => {
  if (bn(num).isGreaterThanOrEqualTo(1)) {
    return bn(num).toFixed(afterComa);
  }
  const withoutStarterDot = num.slice(2);
  let accumOfZeros = '0.';
  let consistentPart = '';
  let startingZerosEnded = false;
  for (const literal of withoutStarterDot.split('')) {
    if (!startingZerosEnded && literal === '0') {
      accumOfZeros += literal;
    } else {
      if (!startingZerosEnded) {
        startingZerosEnded = true;
      }
      consistentPart += literal;
    }
  }

  consistentPart = consistentPart.slice(0, consistentPart.length > afterComa ? afterComa : undefined);

  return `${accumOfZeros}${consistentPart}`;
};
