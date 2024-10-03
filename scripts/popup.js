let inputs = document.querySelectorAll("input");
let collapsibleElements = document.getElementsByClassName("collapsible");

const dependantCheckboxes = [
  "homepage-video-info",
  "homepage-views",
  "time-posted",
];

const homepageViews = document.getElementById("homepage-views");
const timePosted = document.getElementById("time-posted");
const homepageVideoInfo = document.getElementById("homepage-video-info");

const handleDependantCheckboxes = (element, tabs) => {
  /*
    1. if homepage-video-info is checked, both the views and time need to be checked
    2. if both views and time are checked, the info element needs to be checked as well
    3. if either views or time are unchecked, the info elements needs to be unchecked as well
  leaving the comments here for future notice / "presets" (name TBD :D)
  */

  if (element.id === "homepage-video-info") {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: {
        target: "homepage-views",
        hide: element.checked,
      },
    });
    chrome.tabs.sendMessage(tabs[0].id, {
      action: {
        target: "time-posted",
        hide: element.checked,
      },
    });

    homepageViews.checked = element.checked;
    timePosted.checked = element.checked;
  }

  homepageVideoInfo.checked = homepageViews.checked && timePosted.checked;
};

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["elements"], (result) => {
    const elements = result.elements ? JSON.parse(result.elements) : null;

    if (elements !== null) {
      elements.forEach((element) => {
        if (document.getElementById(element.id)) {
          document.getElementById(element.id).checked = element.checked;
        }
      });
    }

    homepageVideoInfo.checked = homepageViews.checked && timePosted.checked;

    for (i = 0; i < collapsibleElements.length; i++) {
      collapsibleElements[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    }

    inputs.forEach((element) => {
      element.addEventListener("change", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (dependantCheckboxes.includes(element.id)) {
            handleDependantCheckboxes(element, tabs);
          }
          chrome.tabs.sendMessage(tabs[0].id, {
            action: {
              target: element.id,
              hide: element.checked,
            },
          });
        });
      });
    });
  });
});

chrome.runtime.onMessage.addListener(function (message) {
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
