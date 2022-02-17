(() => {
  const snfIframePath = '#snfiller iframe';
  const contentId = 'content';

  const getSignNowIframe = (iframePath = snfIframePath) => {
    return window.document.querySelector(iframePath)
  }

  const getContent = (snfFrame) => {
    return snfFrame.contentWindow.document.getElementById(contentId)
  }

  const getAllTextNodes = (source) => {
    let node = null;
    const textNodes = [];
    const walker = document.createTreeWalker(
      source,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    while(node = walker.nextNode()) {
      textNodes.push(node);
    }

    return textNodes;
  }

  const updateTextNodes = (coefficient) => (textNodes) => {
    textNodes.forEach((node) => {
      // let result = '';
      // let iterator = coefficient;

      // while(iterator !== 0) {

      // }
      node.nodeValue = node.nodeValue + '!!!';
    });
  }

  const snfFrame = getSignNowIframe();

  if (snfFrame) {
    const textNodes = getAllTextNodes(getContent(snfFrame))
    updateTextNodes(2)(textNodes);
    chrome.storage.sync.get(["myVariable"], ({ myVariable }) => {
      console.log(myVariable);
    });
    console.log(textNodes);
  } else {
    alert('SignNow Iframe didn\'t find');
  }
})();