(() => {
  async function getActiveTab() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    return tab;
  }

  chrome.runtime.onMessage.addListener((data) => {
    if (data.type === 'notification') {
      getActiveTab().then((tab) => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["src/content.js"]
        });

        // notification.js listen this message
        chrome.notifications.create(
          '',
          {
              type: 'basic',
              title: 'Notify!',
              message: data.message || 'Notify!',
              iconUrl: './lang.png',
          }
        );
      });
    }
  });
})();
