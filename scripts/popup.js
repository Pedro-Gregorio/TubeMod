let elementsArray = document.querySelectorAll("input");

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["elements"], (result) => {
    const elements = result.elements ? JSON.parse(result.elements) : null;

    if (elements !== null) {
      elements.forEach((element) => {
        if (element.category === "General") {
          document.getElementById(element.id).checked = element.hidden;
        }
      });
    }

    elementsArray.forEach((element) => {
      element.addEventListener("change", () => {
        // element.style.checked = !element.style.checked;
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
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

chrome.runtime.onMessage.addListener(function (message) {
  console.log("Got message from content.");
  if (message.type === "popup") {
    chrome.storage.local.set({ elements: JSON.stringify(message.data) });
  }
});

document.getElementById("reset-settings").addEventListener("click", () => {
  chrome.storage.local.clear(() => {
    console.info("Settings cleared.");
  });
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "clearLocalStorage",
    });
  });
  window.close();
});

document.getElementById("open-settings").addEventListener("click", () => {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL("settings.html"));
  }
});
