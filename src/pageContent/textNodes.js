const getAll = (source) => {
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

const updateAll = (updateFn) => (textNodes) => {
  textNodes.forEach((node) => {
    node.nodeValue = updateFn(node.nodeValue);
  });
}

export default {
  getAll,
  updateAll,
};
