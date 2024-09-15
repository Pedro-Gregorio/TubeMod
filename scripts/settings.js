let elementsArray = document.querySelectorAll("input");

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["elements"], (result) => {
    const elements = result.elements ? JSON.parse(result.elements) : null;

    if (elements !== null) {
      elements.forEach((element) => {
        document.getElementById(element.id).checked = element.hidden;
      });
    }

    elementsArray.forEach((element) => {
      element.addEventListener("change", () => {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.sendMessage(tabs[0].openerTabId, {
              action: {
                target: element.id,
                hide: element.checked,
              },
            });
          }
        );
      });
    });
  });
});

// document.getElementById("reset").addEventListener("click", () => {
//   chrome.storage?.local.clear();
//   chrome.runtime.sendMessage({ type: "clearLocalStorage" });
//   window.close();
// });

chrome.runtime.onMessage.addListener(function (message) {
  if (message.type === "popup") {
    chrome.storage.local.set({ elements: JSON.stringify(message.data) });
  }
});
