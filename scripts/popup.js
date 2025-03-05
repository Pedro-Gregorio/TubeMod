let inputs = document.querySelectorAll("input");
let collapsibleElements = document.getElementsByClassName("collapsible");

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["tubemod_elements"], (result) => {
    const elements = result.tubemod_elements
      ? JSON.parse(result.tubemod_elements)
      : null;

    if (elements !== null) {
      elements.forEach((element) => {
        if (document.getElementById(element.id)) {
          document.getElementById(element.id).checked = element.checked;
        }
      });
    }

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

  const dropdown = document.getElementById("channel-dropdown");

  // Load and apply the user's saved preferred channel tab preference.
  chrome.storage.local.get("tubemod_preferredChannelTab", (data) => {
    if (data.tubemod_preferredChannelTab) {
      dropdown.value = data.tubemod_preferredChannelTab;
    }
  });

  // Save new selection when the user updates the dropdown.
  dropdown.addEventListener("change", (event) => {
    chrome.storage.local.set({tubemod_preferredChannelTab: event.target.value});
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

document.getElementById("save-settings").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "saveSettings",
    });
  });
});

document
  .getElementById("import-settings")
  .addEventListener("change", async (e) => {
    let file = e.target.files.item(0);

    const text = await file.text();
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "importSettings",
        content: text,
      });
    });
  });

// [...document.querySelectorAll('#sidebar input')].every(checkbox => checkbox.checked) -> if all the checkboxes are checked, we may want to collapse the sidebar or simply remove the left margin
