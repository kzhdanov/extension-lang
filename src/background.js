(() => {
  async function getActiveTab() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    return tab;
  }

  chrome.runtime.onMessage.addListener((data) => {
    if (data.type === 'run') {
      getActiveTab().then((props) => {
        chrome.storage.sync.set({ sizeFactor: data?.factor });

        chrome.scripting.executeScript({
          target: { tabId: props.id, allFrames: true },
          files: ["dist/app.bundle.js"],
        });
      });
    }

    if (data.type === 'error') {
      chrome.notifications.create('', {
        type: 'basic',
        title: 'Notify!',
        message: data.message || 'Oh! Something went wrong.',
        iconUrl: './signNow.png',
      });
    }
  });
})();
