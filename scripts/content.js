const getDefaultElements = () => [
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
    selector:
      "(//div[@id='buttons' and contains(@class, 'ytd-masthead')]//a/../..)[1]",
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
    selector:
      "//ytd-feed-filter-chip-bar-renderer[@component-style='FEED_FILTER_CHIP_BAR_STYLE_TYPE_DEFAULT']/..",
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
    selector: "//ytd-rich-shelf-renderer/../.. | //ytd-rich-shelf-renderer",
    hidden: undefined,
    category: "Subscriptions",
  },
  {
    id: "subscriptions-scheduled-videos",
    selector: "//ytd-rich-item-renderer[.//ytd-toggle-button-renderer]",
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
    id: "expand-video-description",
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

const getElements = () => {
  return new Promise((resolve) => {
    chrome.storage.local.get("elements", (result) => {
      const elements = result.elements
        ? JSON.parse(result.elements)
        : getDefaultElements();
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
  const observer = new MutationObserver((mutations, obs) => {
    const elements = document.evaluate(
      selectorToHide,
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    );
    if (elements.snapshotLength > 0) {
      obs.disconnect();
      callback(elements);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
};

const setElementClick = async (target, click) => {
  const elements = await getElements();
  const element = elements.find((el) => el.id === target);

  if (element) {
    element.hidden = click;
    const elementToClick = document.evaluate(
      element.selector,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;

    if (elementToClick) {
      elementToClick.click();
    }

    saveElements(elements);
  }
};

const setElementVisibility = async (target, hide) => {
  const elements = await getElements();
  const element = elements.find((el) => el.id === target);

  if (element) {
    element.hidden = hide;
    if (target !== "expand-video-description") {
      applyVisibility(element.selector, hide);
      waitForElements(element.selector, () => applyVisibility(element.selector, hide));
    } else {
      setElementClick(target, hide);
    }
    saveElements(elements);
  } else {
    console.error("No selector found for the target element: " + target);
  }
};

const applyVisibility = (selector, hide) => {
  const elementsToHide = document.evaluate(
    selector,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );

  for (let i = 0; i < elementsToHide.snapshotLength; i++) {
    elementsToHide.snapshotItem(i).style.display = hide ? "none" : "";
  }

  if (selector === "stream-chat" && document.getElementById("panels-full-bleed-container")) {
    document.getElementById("panels-full-bleed-container").style.display = hide ? "none" : "";
  }
};

const saveElements = (elements) => {
  chrome.storage.local.set({ elements: JSON.stringify(elements) }, () => {
    if (chrome.runtime.lastError) {
      console.error("Error setting data: ", chrome.runtime.lastError);
    }
  });
};

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "clearLocalStorage") {
    chrome.storage.local.clear(() => {
      console.info("Settings cleared.");
    });
    location.reload();
  } else {
    handleAction(request.action);
  }
});

const handleAction = async (action) => {
  if (action.target !== "expand-video-description") {
    await setElementVisibility(action.target, action.hide);
  } else {
    await setElementClick(action.target, action.hide);
  }
  const elements = await getElements();
  chrome.runtime.sendMessage({ type: "info", data: elements });
};

const applyElementVisibility = async () => {
  const elements = await getElements();
  if (elements) {
    elements.forEach((element) => {
      if (element.hidden !== undefined) {
        if (element.id !== "expand-video-description") {
          setElementVisibility(element.id, element.hidden);
        } else {
          setElementClick(element.id, element.hidden);
        }
      }
    });
  }
};

const initialize = () => {
  document.addEventListener("DOMContentLoaded", applyElementVisibility);
  window.addEventListener("load", applyElementVisibility);
  window.addEventListener("yt-navigate-finish", applyElementVisibility);
  window.addEventListener("resize", applyElementVisibility);
};

initialize();