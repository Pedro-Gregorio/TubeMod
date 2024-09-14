chrome.runtime.onMessage.addListener(function (message) {
  if (message.type === "info") {
    chrome.runtime.sendMessage({ type: "popup", data: message.data });
  }
});
