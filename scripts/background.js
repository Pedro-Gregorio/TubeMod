chrome.runtime.onMessage.addListener(function (message) {
  if (message.type === "info") {
    chrome.runtime.sendMessage({ type: "popup", data: message.data });
  }

  // if (message.type === "clearLocalStorage") {
  //   chrome.runtime.sendMessage({ type: "resetPopupStorage" }, (response) => {
  //     if (chrome.runtime.lastError) {
  //       console.warn("Popup not open. Skipping message to popup.");
  //     }
  //   });

  //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //     if (tabs.length > 0) {
  //       chrome.tabs.sendMessage(tabs[0].id, { type: "resetContentStorage" });
  //     } else {
  //       console.warn(
  //         "No active tabs found. Could not send message to content script."
  //       );
  //     }
  //   });
  // }
});
