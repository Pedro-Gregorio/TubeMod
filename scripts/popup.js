let elementsArray = document.querySelectorAll("input");

document.addEventListener("DOMContentLoaded", () => {
  JSON.parse(localStorage.getItem("elements")) !== null &&
    JSON.parse(localStorage.getItem("elements")).forEach((element) => {
      element.category === "General" &&
        (document.getElementById(element.id).checked = element.hidden);
    });
  elementsArray.forEach((element) => {
    element.addEventListener("change", () => {
      // tabs.query and sendMessage sends information to content
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: {
            target: element.id,
            hide: element.checked,
            elements: JSON.parse(localStorage.getItem("elements")),
          },
        });
      });
    });
  });
});

chrome.runtime.onMessage.addListener(function (message) {
  if (message.type === "popup") {
    localStorage.setItem("elements", JSON.stringify(message.data));
  }
});

document.getElementById("reset-settings").addEventListener("click", () => {
  localStorage.clear();
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
