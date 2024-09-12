const SHORTS = "//a[@title='Shorts']/..";
const TABS = "//ytd-feed-filter-chip-bar-renderer/..";
const ADS =
  "//ytd-ad-slot-renderer/ancestor::ytd-rich-item-renderer | //*[@id='player-ads']";

document.addEventListener("DOMContentLoaded", () => {
  const shortsCheckbox = document.getElementById("hide-shorts");
  const tabsCheckbox = document.getElementById("hide-tabs");
  const adsCheckbox = document.getElementById("hide-ads");

  // Load saved state for Shorts and Tabs, to update the checkboxes
  chrome.storage.sync.get(["shortsHidden"], function (result) {
    if (result.shortsHidden !== undefined) {
      shortsCheckbox.checked = result.shortsHidden;
    }
  });

  chrome.storage.sync.get(["tabsHidden"], function (result) {
    if (result.tabsHidden !== undefined) {
      tabsCheckbox.checked = result.tabsHidden;
    }
  });

  chrome.storage.sync.get(["adsHidden"], function (result) {
    if (result.adsHidden !== undefined) {
      adsCheckbox.checked = result.adsHidden;
    }
  });

  // Event listener for Shorts checkbox
  shortsCheckbox.addEventListener("change", () => {
    const areShortsChecked = shortsCheckbox.checked;
    chrome.storage.sync.set({ shortsHidden: areShortsChecked });

    // Send message to content script to hide/show Shorts based on checkbox change
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: areShortsChecked
          ? { target: SHORTS, hide: true }
          : { target: SHORTS, hide: false },
      });
    });
  });

  // Event listener for Tabs checkbox
  tabsCheckbox.addEventListener("change", () => {
    const areTabsChecked = tabsCheckbox.checked;
    chrome.storage.sync.set({ tabsHidden: areTabsChecked });

    // Send message to content script to hide/show Tabs based on checkbox change
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: areTabsChecked
          ? { target: TABS, hide: true }
          : { target: TABS, hide: false },
      });
    });
  });

  // Event listener for Ads checkbox
  adsCheckbox.addEventListener("change", () => {
    const areAdsChecked = adsCheckbox.checked;
    chrome.storage.sync.set({ adsHidden: areAdsChecked });

    // Send message to content script to hide/show Tabs based on checkbox change
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: areAdsChecked
          ? { target: ADS, hide: true }
          : { target: ADS, hide: false },
      });
    });
  });
});
