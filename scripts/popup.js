let elementsArray = document.querySelectorAll("input");

document.addEventListener("DOMContentLoaded", () => {
  JSON.parse(localStorage.getItem("elements")) !== null &&
    JSON.parse(localStorage.getItem("elements")).forEach((element) => {
      document.getElementById(element.id).checked = element.hidden;
    });
  elementsArray.forEach((element) => {
    element.addEventListener("change", () => {
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

document.getElementById("reset").addEventListener("click", () => {
  localStorage.clear();
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "clearLocalStorage",
    });
  });
  window.close();
});

chrome.runtime.onMessage.addListener(function (message) {
  if (message.type === "popup") {
    localStorage.setItem("elements", JSON.stringify(message.data));
  }
});
