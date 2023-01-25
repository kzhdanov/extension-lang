(() => {
  const psevdolocalizeButton = document.getElementById('run-button');
  const textInput  = document.getElementById('factor')

  const onEnter = () => {
    const factor = Number(textInput.value) || 1;

    if (!factor || window.isNaN(factor)) {
      chrome.runtime.sendMessage('', { type: 'error', message: 'Incorrect factor value' });
      return;
    }

    if (factor === 1) {
      chrome.runtime.sendMessage('', { type: 'error', message: 'Factor should be more then 1' });
      return;
    }

    chrome.runtime.sendMessage('', { type: 'run', factor });
    setTimeout(() => window.close(), 500);
  };

  textInput.addEventListener('keydown', (keyboardEvent) => {
    if (keyboardEvent.code === 'Enter') {
      onEnter()
    }
  })

  psevdolocalizeButton.addEventListener('click', onEnter);
})();
