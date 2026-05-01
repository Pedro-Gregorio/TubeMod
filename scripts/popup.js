document.addEventListener("DOMContentLoaded", () => {
  loadSettings();
  setupCollapsibleSections();
  setupInputChangeListeners();
  setupSearch();
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

/**
 * Loads saved settings from Chrome's local storage and applies them to the UI.
 * Retrieves stored elements and updates their checked state accordingly.
 */
function loadSettings() {
  chrome.storage.local.get(["tubemod_elements"], (result) => {
    const elements = result.tubemod_elements ? JSON.parse(result.tubemod_elements) : null;

    if (elements) {
      elements.forEach((element) => {
        const el = document.getElementById(element.id);
        if (el) {
          el.checked = element.checked;
        }
      });
    }
  });
}

/**
 * Initializes collapsible sections by adding event listeners.
 * Toggles the visibility of the associated content when clicked.
 */
function setupCollapsibleSections() {
  const collapsibleElements = document.getElementsByClassName("collapsible");
  for (let i = 0; i < collapsibleElements.length; i++) {
    collapsibleElements[i].addEventListener("click", function () {
      this.classList.toggle("active");
      const content = this.nextElementSibling;
      content.style.display = content.style.display === "block" ? "none" : "block";
    });
  }
}

/**
 * Adds event listeners to input elements to detect changes.
 * Sends a message to the active tab to apply the changes in real time.
 */
function setupInputChangeListeners() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((element) => {
    element.addEventListener("change", () => {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: {
              target: element.id,
              hide: element.checked,
            },
          });
        }
      });
    });
  });
}

/**
 * Sets up the search settings functionality.
 */
function setupSearch() {
  const searchInput = document.getElementById("search-input");
  const clearButton = document.getElementById("clear-search");
  const collapsibleElements = Array.from(document.getElementsByClassName("collapsible"));

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase().trim();

    collapsibleElements.forEach((collapsible) => {
      const container = collapsible.nextElementSibling;
      const labels = Array.from(container.querySelectorAll("label"));

      // When search is empty, ensure all sections are collapsed.
      if (searchTerm === "") {
        collapsible.classList.remove("greyed");
        container.style.display = "none";
        return;
      }

      // Determine if any label in this container matches the search term.
      const anyMatch = labels.some((label) => {
        const text = label.textContent.toLowerCase().trim();
        return text && text.includes(searchTerm);
      });

      if (anyMatch) {
        // Matching section: remove greyed style and open container.
        collapsible.classList.remove("greyed");
        container.style.display = "block";

        // Toggle each checkbox container within the section based on match.
        Array.from(container.querySelectorAll(".checkbox-container")).forEach((checkboxContainer) => {
          const label = checkboxContainer.querySelector("label");
          const text = label.textContent.toLowerCase().trim();
          checkboxContainer.style.display = text.includes(searchTerm) ? "flex" : "none";
        });
      } else {
        // No matching label: grey out the collapsible button and collapse the container.
        collapsible.classList.add("greyed");
        container.style.display = "none";
      }
    });

    clearButton.style.display = searchTerm ? "inline" : "none";
  });

  clearButton.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.dispatchEvent(new Event("input"));
  });
}
