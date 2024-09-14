const elements = [
  {
    id: "shorts",
    selector: "//a[@title='Shorts']/..",
    hidden: false,
  },
  {
    id: "tabs",
    selector: "//ytd-feed-filter-chip-bar-renderer/..",
    hidden: false,
  },
  {
    id: "ads",
    selector:
      "//ytd-ad-slot-renderer/ancestor::ytd-rich-item-renderer | //*[@id='player-ads']",
    hidden: false,
  },
];

function hideElement(target, hide) {
  let selectorToHide;

  elements.forEach((element) => {
    if (element.id === target) {
      selectorToHide = element.selector;
      element.hidden = hide;
    }
  });

  let elementsToHide = document.evaluate(
    selectorToHide,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );

  for (let i = 0, length = elementsToHide.snapshotLength; i < length; i++) {
    elementsToHide.snapshotItem(i).style.display = hide ? "none" : "block";
  }
}

chrome.runtime.onMessage.addListener((request) => {
  hideElement(request.action.target, request.action.hide);
  chrome.runtime.sendMessage({ type: "info", data: elements });
});

// TODO: find a way to apply all the stored changes on page loading
// TODO: If there is localStorage -> We use it and send information back to popup.js
// TODO: Otherwise -> Nothing happens
