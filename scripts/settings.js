let elementsArray = document.querySelectorAll("input");

console.log("I am in settings.js");

document.addEventListener("DOMContentLoaded", () => {
  JSON.parse(localStorage.getItem("elements")) !== null &&
    JSON.parse(localStorage.getItem("elements")).forEach((element) => {
      document.getElementById(element.id).checked = element.hidden;
    });
  elementsArray.forEach((element) => {
    element.addEventListener("change", () => {
      // tabs.query and sendMessage sends information to content
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].openerTabId, {
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
  console.log("Local storage cleared from settings.");
  chrome.runtime.sendMessage({ type: "clearLocalStorage" }); // Added 'type: clearLocalStorage'
  window.close();
});

chrome.runtime.onMessage.addListener(function (message) {
  if (message.type === "popup") {
    console.log("Received message from popup: ", message.data);
    localStorage.setItem("elements", JSON.stringify(message.data));
  }
});
