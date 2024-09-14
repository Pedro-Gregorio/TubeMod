let elementsArray = document.querySelectorAll("input");
let elements = [];

document.addEventListener("DOMContentLoaded", () => {
  console.log(elements);
  console.log(elementsArray);

  // TODO: Check elements initial state, wether if they're checked or not based on the storage

  elementsArray.forEach((element) => {
    element.addEventListener("change", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: { target: element.id, hide: element.checked },
        });
      });
    });
  });
});

chrome.runtime.onMessage.addListener(function (message) {
  if (message.type === "popup") {
    message.data.forEach((element) => {
      elements.push(element);
    });
  }
});
