const SHORTS = "//a[@title='Shorts']/..";
const TABS = "//ytd-feed-filter-chip-bar-renderer/..";
const ADS =
  "//ytd-ad-slot-renderer/ancestor::ytd-rich-item-renderer | //*[@id='player-ads']";

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
  if (document.body === null) return; // Check if the DOM is still valid

  chrome.storage.sync.get(
    ["shortsHidden", "tabsHidden", "adsHidden"],
    function (result) {
      if (result.shortsHidden !== undefined) {
        hideElement(SHORTS, result.shortsHidden);
      }

      if (result.tabsHidden !== undefined) {
        hideElement(TABS, result.tabsHidden);
      }

      if (result.adsHidden !== undefined) {
        hideElement(ADS, result.adsHidden);
      }
    }
  );
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

chrome.runtime.onMessage.addListener((request) => {
  hideElement(request.action.target, request.action.hide);
});
