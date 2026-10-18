const YOUTUBE_TABS = ["*://www.youtube.com/*", "*://m.youtube.com/*"];

const fileInput = document.getElementById("settings-file");
const status = document.getElementById("import-status");

function showStatus(message, isError) {
  status.textContent = message;
  status.classList.toggle("error", isError);
}

// The export format is { tubemod_elements: "<JSON string of [{id, checked, ...}]>", tubemod_version }.
function parseSettings(text) {
  let settings;
  try {
    settings = JSON.parse(text);
  } catch {
    throw new Error("This file is not valid JSON.");
  }

  let elements;
  try {
    elements = JSON.parse(settings.tubemod_elements);
  } catch {
    elements = null;
  }

  const validElements =
    Array.isArray(elements) &&
    elements.every(
      (el) => el && typeof el.id === "string" && typeof el.checked === "boolean",
    );
  if (!validElements || typeof settings.tubemod_version !== "string") {
    throw new Error("This is not a TubeMod settings file.");
  }

  return {
    tubemod_elements: settings.tubemod_elements,
    tubemod_version: settings.tubemod_version,
  };
}

fileInput.addEventListener("change", async () => {
  const file = fileInput.files.item(0);
  if (!file) return;

  try {
    const settings = parseSettings(await file.text());
    await chrome.storage.local.set(settings);

    const tabs = await chrome.tabs.query({ url: YOUTUBE_TABS });
    await Promise.all(tabs.map((tab) => chrome.tabs.reload(tab.id)));
    showStatus(
      `Settings imported. ${tabs.length} YouTube tab(s) reloaded.`,
      false,
    );
  } catch (error) {
    showStatus(error.message, true);
  } finally {
    fileInput.value = "";
  }
});
