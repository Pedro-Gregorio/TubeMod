let inputs = document.querySelectorAll("input");
let collapsibleElements = document.getElementsByClassName("collapsible");

let removeElements = false;

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["elements"], (result) => {
    const elements = result.elements ? JSON.parse(result.elements) : null;

    if (elements !== null) {
      elements.forEach((element) => {
        if (document.getElementById(element.id)) {
          document.getElementById(element.id).checked = element.checked;
        }
      });

      const hideDeleteToggle = elements.find(el => el.id === "hide-delete-toggle");
      console.log(hideDeleteToggle);
      if (hideDeleteToggle && hideDeleteToggle.checked) {
        removeElements = true;
        console.log("RemoveElements is true");
      } else {
        removeElements = false;
        console.log("RemoveElements is false");
      }
    }

    for (let i = 0; i < collapsibleElements.length; i++) {
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

document.addEventListener("DOMContentLoaded", () => {
  const hideDeleteToggle = document.getElementById("hide-delete-toggle");

  hideDeleteToggle.addEventListener("change", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (hideDeleteToggle.checked) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "set-delete-elements",
        });
      } else {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "set-hide-elements",
        });
      }
    });
  });
});