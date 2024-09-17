const getElements = () => {
  return new Promise((resolve) => {
    chrome.storage.local.get("elements", (result) => {
      const elements = result.elements
        ? JSON.parse(result.elements)
        : [
            {
              id: "logo",
              selector: "//ytd-topbar-logo-renderer",
              hidden: undefined,
              category: "General",
            },
            {
              id: "microphone-search",
              selector: "//*[@id='voice-search-button']",
              hidden: undefined,
              category: "General",
            },
            {
              id: "create",
              selector: "(//ytd-topbar-menu-button-renderer)[1]",
              hidden: undefined,
              category: "General",
            },
            {
              id: "notifications",
              selector: "//ytd-notification-topbar-button-renderer",
              hidden: undefined,
              category: "General",
            },
            {
              id: "home",
              selector:
                "((//ytd-guide-section-renderer)[1]//ytd-guide-entry-renderer)[1] | (//ytd-mini-guide-entry-renderer)[1]",
              hidden: undefined,
              category: "Sidebar",
            },
            {
              id: "shorts",
              selector:
                "((//ytd-guide-section-renderer)[1]//ytd-guide-entry-renderer)[2] | (//ytd-mini-guide-entry-renderer)[2]",
              hidden: undefined,
              category: "Sidebar",
            },
            {
              id: "subscriptions",
              selector:
                "((//ytd-guide-section-renderer)[1]//ytd-guide-entry-renderer)[3] | (//ytd-mini-guide-entry-renderer)[3]",
              hidden: undefined,
              category: "Sidebar",
            },
            {
              id: "my-channel",
              selector:
                "((//ytd-guide-section-renderer)[1]//ytd-guide-entry-renderer)[5]",
              hidden: undefined,
              category: "Sidebar",
            },
            {
              id: "history",
              selector:
                "((//ytd-guide-section-renderer)[1]//ytd-guide-entry-renderer)[6]",
              hidden: undefined,
              category: "Sidebar",
            },
            {
              id: "playlists",
              selector:
                "((//ytd-guide-section-renderer)[1]//ytd-guide-entry-renderer)[7]",
              hidden: undefined,
              category: "Sidebar",
            },
            {
              id: "my-videos",
              selector:
                "((//ytd-guide-section-renderer)[1]//ytd-guide-entry-renderer)[8]",
              hidden: undefined,
              category: "Sidebar",
            },
            {
              id: "watch-later",
              selector:
                "((//ytd-guide-section-renderer)[1]//ytd-guide-entry-renderer)[9]",
              hidden: undefined,
              category: "Sidebar",
            },
            {
              id: "liked-videos",
              selector:
                "((//ytd-guide-section-renderer)[1]//ytd-guide-entry-renderer)[10]",
              hidden: undefined,
              category: "Sidebar",
            },
            {
              id: "my-clips",
              selector:
                "((//ytd-guide-section-renderer)[1]//ytd-guide-entry-renderer)[12]",
              hidden: undefined,
              category: "Sidebar",
            },
            {
              id: "subscriptions-panel",
              selector: "(//ytd-guide-section-renderer)[2]",
              hidden: undefined,
              category: "Sidebar",
            },
            {
              id: "explore-panel",
              selector: "(//ytd-guide-section-renderer)[3]",
              hidden: undefined,
              category: "Sidebar",
            },
            {
              id: "youtube-panel",
              selector: "(//ytd-guide-section-renderer)[4]",
              hidden: undefined,
              category: "Sidebar",
            },
            {
              id: "tabs",
              selector: "//ytd-feed-filter-chip-bar-renderer/..",
              hidden: undefined,
              category: "HomePage",
            },
            {
              id: "ads",
              selector:
                "//ytd-ad-slot-renderer/ancestor::ytd-rich-item-renderer | //*[@id='player-ads'] | //ytd-banner-promo-renderer/..",
              hidden: undefined,
              category: "HomePage",
            },
            {
              id: "posts",
              selector: "//ytd-rich-section-renderer",
              hidden: undefined,
              category: "HomePage",
            },
            {
              id: "subscriptions-shorts",
              selector: "//ytd-rich-shelf-renderer/../..",
              hidden: undefined,
              category: "Subscriptions",
            },
            {
              id: "subscriptions-scheduled-videos",
              selector:
                "//ytd-rich-item-renderer[.//ytd-toggle-button-renderer]",
              hidden: undefined,
              category: "Subscriptions",
            },
            {
              id: "video-title",
              selector: "//div[@id='above-the-fold']/div[@id='title']",
              hidden: undefined,
              category: "Video",
            },
            {
              id: "video-likes-dislikes",
              selector: "//segmented-like-dislike-button-view-model",
              hidden: undefined,
              category: "Video",
            },
            {
              id: "video-description",
              selector: "//div[@id='description-inner']/parent::div",
              hidden: undefined,
              category: "Video",
            },
            {
              id: "video-comments",
              selector: "//ytd-comments[@id='comments']",
              hidden: undefined,
              category: "Video",
            },
            {
              id: "video-categories-games",
              selector: "//ytd-rich-metadata-row-renderer/../..",
              hidden: undefined,
              category: "Video",
            },
            {
              id: "video-ads",
              selector: "//div[@id='player-ads']",
              hidden: undefined,
              category: "Video",
            },
            {
              id: "video-tabs",
              selector: "//yt-related-chip-cloud-renderer",
              hidden: undefined,
              category: "Video",
            },
            {
              id: "video-suggested-videos",
              selector:
                "//div[@id='contents']/parent::ytd-item-section-renderer[contains(@class, 'watch-next')]",
              hidden: undefined,
              category: "Video",
            },
            {
              id: "video-suggested-shorts",
              selector: undefined,
              hidden: undefined,
              category: "Video",
            },
            {
              id: "stream-chat",
              selector: "//div[@id='chat-container']",
              hidden: undefined,
              category: "Stream",
            },
          ];

      resolve(elements);
    });
  });
};

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
  }, 500);
};

async function setElementVisibility(target, hide) {
  let elements = await getElements();
  let selectorToHide;

  elements.forEach((element) => {
    if (element.id === target) {
      selectorToHide = element.selector;
      element.hidden = hide;
    }
  });

  if (selectorToHide) {
    let elementsToHide = document.evaluate(
      selectorToHide,
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    );

    for (let i = 0, length = elementsToHide.snapshotLength; i < length; i++) {
      elementsToHide.snapshotItem(i).style.display = hide ? "none" : "";
    }

    if (
      target === "stream-chat" &&
      document.getElementById("panels-full-bleed-container")
    ) {
      document.getElementById("panels-full-bleed-container").style.display =
        "none";
    }

    chrome.storage.local.set(
      { elements: JSON.stringify(elements) },
      function () {
        if (chrome.runtime.lastError) {
          console.error("Error setting data: ", chrome.runtime.lastError);
        }
      }
    );

    chrome.storage.local.get(["elements"]);
  } else {
    console.error("No selector found for the target element: " + target);
  }
}

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "clearLocalStorage") {
    chrome.storage.local.clear(() => {
      console.info("Settings cleared.");
    });
    location.reload();
  } else {
    async function sendMessage() {
      await setElementVisibility(request.action.target, request.action.hide);
      let elements = await getElements();
      chrome.runtime.sendMessage({ type: "info", data: elements });
    }
    sendMessage();
  }
});

document.addEventListener("DOMContentLoaded", async function () {
  const elements = await getElements();
  if (elements) {
    elements.forEach((element) => {
      waitForElements(
        element.selector,
        setElementVisibilityOnce(element.id, element.hidden)
      );
    });
  }
});

window.addEventListener("resize", async function () {
  const elements = await getElements();
  if (elements) {
    elements.forEach((element) => {
      waitForElements(
        element.selector,
        setElementVisibilityOnce(element.id, element.hidden)
      );
    });
  }
});
