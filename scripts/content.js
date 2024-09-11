const SHORTS = "//a[@title='Shorts']/..";
const TABS = "//ytd-feed-filter-chip-bar-renderer/..";

// Function to hide or show the element
function hideElement(selector, hide) {
  let elements = document.evaluate(
    selector,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );

  for (let i = 0, length = elements.snapshotLength; i < length; i++) {
    elements.snapshotItem(i).style.display = hide ? "none" : "block";
  }
}

// Function to handle changes in storage and apply to DOM
function applyHiddenState() {
  chrome.storage.sync.get(["shortsHidden", "tabsHidden"], function (result) {
    if (result.shortsHidden !== undefined) {
      hideElement(SHORTS, result.shortsHidden);
    }

    if (result.tabsHidden !== undefined) {
      hideElement(TABS, result.tabsHidden);
    }
  });
}

// Use MutationObserver to track dynamic changes in YouTube's DOM
const observer = new MutationObserver((mutations) => {
  mutations.forEach(() => {
    applyHiddenState(); // Apply the hidden state whenever DOM changes
  });
});

// Start observing the body for changes
observer.observe(document.body, { childList: true, subtree: true });

// Initially apply the hidden state when the content script runs
applyHiddenState();

// Listen for messages from the popup and apply changes accordingly
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "hideShorts") {
    hideElement(SHORTS, true);
    sendResponse({ result: "Shorts hidden." });
  } else if (request.action === "showShorts") {
    hideElement(SHORTS, false);
    sendResponse({ result: "Shorts shown." });
  } else if (request.action === "hideTabs") {
    hideElement(TABS, true);
    sendResponse({ result: "Tabs hidden." });
  } else if (request.action === "showTabs") {
    hideElement(TABS, false);
    sendResponse({ result: "Tabs shown." });
  }
});
