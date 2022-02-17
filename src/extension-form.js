(() => {
  const psevdolocalizeButton = document.getElementById('run-button');

  psevdolocalizeButton.addEventListener('click', () => {
    const factor = Number(document.getElementById('factor').value) || 1;

    if (!factor || window.isNaN(factor)) {
      chrome.runtime.sendMessage('', { type: 'error', message: 'Incorrect factor value' });
      return;
    }

    if (factor === 1) {
      chrome.runtime.sendMessage('', { type: 'error', message: 'Factor should be more then 1' });
      return;
    }

    chrome.runtime.sendMessage('', { type: 'run', factor });
  });
})();
