chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url && tab.url.includes("youtube.com")) {
      chrome.action.setPopup({ popup: "../public/popup.html" });
    } else {
      chrome.action.setPopup({ popup: "../public/error.html" });
    }
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    if (tab.url.includes("youtube.com")) {
      chrome.action.setPopup({ popup: "../public/popup.html" });
    } else {
      chrome.action.setPopup({ popup: "" });
    }
  }
});
