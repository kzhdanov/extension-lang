import { getSignNowIframe, getContent } from './config';
import textNodes from './textNodes';

const getDecimalFactor = (sizeFactor) => {
  return Number((sizeFactor - Math.floor(sizeFactor)).toFixed(1));
};

const toLengthenValuesInteger = (factor) => (value) => {
  let result = value;
  let coef = Number(factor);

  while(coef !== 1) {
    result = result + value;
    coef--;
  }

  return result;
};

const toLengthenValuesDecimal = (factor) => (value) => {
  let decimalPart = getDecimalFactor(factor);
  let decimalResult = '';
  let prevPosition = 0;
  const value01Length = value.length * .1;

  while(decimalPart > 0) {
    decimalResult = decimalResult + value.slice(prevPosition, prevPosition + value01Length);
    decimalPart -= .1;
    prevPosition = prevPosition + value01Length;
  }

  return decimalResult;
}

const toLengthenValues = (factor) => (value) => {
  const integerFactorText = toLengthenValuesInteger(Math.floor(factor))(value);
  const decimalPart = getDecimalFactor(factor);

  if (decimalPart !== 0) {
    return `${integerFactorText}${toLengthenValuesDecimal(factor)(value)}`
  }

  return integerFactorText;
}

async function Start() {
  const snfFrame = getSignNowIframe();

  if (snfFrame) {
    const nodes = textNodes.getAll(getContent(snfFrame));
    const { sizeFactor } = await chrome.storage.sync.get(['sizeFactor']);

    textNodes.updateAll(toLengthenValues(sizeFactor))(nodes);
  } else {
    alert('SignNow Iframe didn\'t find');
  }
}

Start();