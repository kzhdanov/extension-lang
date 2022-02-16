(() => {
  const notify = document.getElementById('run-button');

  notify.addEventListener('click', () => {
    chrome.runtime.sendMessage('', {
      type: 'notification',
      message: 'Some text about translation (take from input)'
    });
  });
})();
