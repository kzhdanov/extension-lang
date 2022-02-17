(() => {
  const notify = document.getElementById('run-button');

  notify.addEventListener('click', () => {
    chrome.runtime.sendMessage('', { type: 'run' });
  });
})();
