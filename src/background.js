(() => {
  async function getActiveTab() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    return tab;
  }

  chrome.runtime.onMessage.addListener((data) => {
    if (data.type === 'run') {
      getActiveTab().then(({ id }) => {
        chrome.storage.sync.set({ myVariable: 'valueOfVariable' });

        chrome.scripting.executeScript({
          target: { tabId: id },
          files: ["src/pageContent/index.js"]
        });

        // notification.js listen this message
        // chrome.notifications.create('', {
        //   type: 'basic',
        //   title: 'Notify!',
        //   message: 'Notify!',
        //   iconUrl: './lang.png',
        // });
      });
    }
  });
})();
