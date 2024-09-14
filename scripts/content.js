const setElementVisibilityOnce = (id, hidden) => {
  let hasRun = false;
  return () => {
    if (!hasRun) {
      setElementVisibility(id, hidden);
      hasRun = true;
    }
  };
};

const waitForElements = (selectorToHide, callback) => {
  const checkExist = setInterval(() => {
    const elements = document.evaluate(
      selectorToHide,
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    );

    if (elements.snapshotLength > 0) {
      clearInterval(checkExist);
      callback(elements);
    }
  }, 200);
};

const getElements = () => {
  return (
    JSON.parse(localStorage.getItem("elements")) || [
      {
        id: "shorts",
        selector: "//a[@title='Shorts']/..",
        hidden: undefined,
      },
      {
        id: "tabs",
        selector: "//ytd-feed-filter-chip-bar-renderer/..",
        hidden: undefined,
      },
      {
        id: "ads",
        selector:
          "//ytd-ad-slot-renderer/ancestor::ytd-rich-item-renderer | //*[@id='player-ads']",
        hidden: undefined,
      },
    ]
  );
};

function setElementVisibility(target, hide) {
  let selectorToHide;
  let elements = getElements();

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
  localStorage.setItem("elements", JSON.stringify(elements));
}

chrome.runtime.onMessage.addListener((request) => {
  setElementVisibility(request.action.target, request.action.hide);
  chrome.runtime.sendMessage({ type: "info", data: getElements() });
});

document.addEventListener("DOMContentLoaded", function () {
  const elements = JSON.parse(localStorage.getItem("elements"));

  if (elements) {
    elements.forEach((element) => {
      waitForElements(
        element.selector,
        setElementVisibilityOnce(element.id, element.hidden)
      );
    });
  }
});
