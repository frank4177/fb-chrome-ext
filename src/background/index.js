console.log('background is running')

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['contentScript.js']
  }, () => {
    chrome.tabs.sendMessage(tab.id, {action: "collectUrls"});
    chrome.tabs.sendMessage(tab.id, {action: "navigate"});

  });
});

