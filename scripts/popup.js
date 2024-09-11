document.addEventListener("DOMContentLoaded", () => {
  const shortsCheckbox = document.getElementById("hide-shorts");
  const tabsCheckbox = document.getElementById("hide-tabs");

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

  // Event listener for Shorts checkbox
  shortsCheckbox.addEventListener("change", () => {
    const areShortsChecked = shortsCheckbox.checked;
    chrome.storage.sync.set({ shortsHidden: areShortsChecked });

    // Send message to content script to hide/show Shorts based on checkbox change
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: areShortsChecked ? "hideShorts" : "showShorts" },
        function (response) {
          console.log(response.result);
        }
      );
    });
  });

  // Event listener for Tabs checkbox
  tabsCheckbox.addEventListener("change", () => {
    const areTabsChecked = tabsCheckbox.checked;
    chrome.storage.sync.set({ tabsHidden: areTabsChecked });

    // Send message to content script to hide/show Tabs based on checkbox change
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: areTabsChecked ? "hideTabs" : "showTabs" },
        function (response) {
          console.log(response.result);
        }
      );
    });
  });
});
