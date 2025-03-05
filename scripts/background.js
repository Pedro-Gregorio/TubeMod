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

function redirectToPreferredTab(tab) {
  chrome.storage.local.get("tubemod_preferredChannelTab", (data) => {
    const preferredTab = data.tubemod_preferredChannelTab;
    if (!preferredTab) return;

    const currentURL = tab.url;
    const match = currentURL.match(/https:\/\/www\.youtube\.com\/@([\w-]+)/);

    if (match) {
      const channel = match[1];

      if (!currentURL.includes(preferredTab)) {
        const newURL = `https://www.youtube.com/@${channel}/${preferredTab}`;
        chrome.tabs.update(tab.id, {url: newURL});
      }
    }
  });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    redirectToPreferredTab(tab);
  }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    redirectToPreferredTab(tab);
  });
});

chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
  if (tabs.length > 0) {
    redirectToPreferredTab(tabs[0]);
  }
});
