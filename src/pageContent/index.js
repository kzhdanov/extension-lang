import { getSignNowIframe, getContent } from './config';
import textNodes from './textNodes';

const toLengthenValuesSimple = (factor) => (value) => {
  let result = value;
  let coef = Number(factor);

  while(coef !== 1) {
    result = result + value;
    coef--;
  }

  return result;
};

async function Start() {
  const snfFrame = getSignNowIframe();

  if (snfFrame) {
    const nodes = textNodes.getAll(getContent(snfFrame));
    const { sizeFactor } = await chrome.storage.sync.get(['sizeFactor']);

    textNodes.updateAll(toLengthenValuesSimple(sizeFactor))(nodes);
  } else {
    alert('SignNow Iframe didn\'t find');
  }
}

Start();