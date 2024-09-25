// Configuration
const DEFAULT_ELEMENTS = [
  {
    id: "logo",
    selector: "//ytd-topbar-logo-renderer",
    checked: false,
    category: "General",
  },
  {
    id: "microphone-search",
    selector: "//*[@id='voice-search-button']",
    checked: false,
    category: "General",
  },
  {
    id: "create",
    selector:
      "(//div[@id='buttons' and contains(@class, 'ytd-masthead')]//a/../..)[1]",
    checked: false,
    category: "General",
  },
  {
    id: "notifications",
    selector: "//ytd-notification-topbar-button-renderer",
    checked: false,
    category: "General",
  },
  {
    id: "scheduled-videos",
    selector: "//ytd-rich-item-renderer[.//ytd-toggle-button-renderer]",
    checked: false,
    category: "General",
  },
  {
    id: "home",
    selector:
      "//ytd-guide-entry-renderer[a[@href='/']] | //ytd-mini-guide-entry-renderer[a[@href='/']]",
    checked: false,
    category: "Sidebar",
  },
  {
    id: "shorts",
    selector:
      "//ytd-guide-entry-renderer[a[@title='Shorts']] | //ytd-mini-guide-entry-renderer[a[@title='Shorts']]",
    checked: false,
    category: "Sidebar",
  },
  {
    id: "subscriptions",
    selector:
      "//ytd-guide-entry-renderer[a[@href='/feed/subscriptions']] | //ytd-mini-guide-entry-renderer[a[@href='/feed/subscriptions']]",
    checked: false,
    category: "Sidebar",
  },
  {
    id: "youtube-music",
    selector:
      "(//ytd-guide-entry-renderer[a[@href='https://music.youtube.com/']])[1] | //ytd-mini-guide-entry-renderer[a[@href='https://music.youtube.com/']]",
    checked: false,
    category: "Sidebar",
  },
  {
    id: "you",
    selector:
      "(//div[@id='header']/ytd-guide-entry-renderer)[1] | //ytd-mini-guide-entry-renderer[a[@href='/feed/you']]",
    checked: false,
    category: "Sidebar",
  },
  {
    id: "my-channel",
    selector: "(//div[@id='section-items']/ytd-guide-entry-renderer)[1]",
    checked: false,
    category: "Sidebar",
  },
  {
    id: "history",
    selector: "(//div[@id='section-items']/ytd-guide-entry-renderer)[2]",
    checked: false,
    category: "Sidebar",
  },
  {
    id: "playlists",
    selector: "(//div[@id='section-items']/ytd-guide-entry-renderer)[3]",
    checked: false,
    category: "Sidebar",
  },
  {
    id: "my-videos",
    selector: "(//div[@id='section-items']/ytd-guide-entry-renderer)[4]",
    checked: false,
    category: "Sidebar",
  },
  {
    id: "watch-later",
    selector: "(//div[@id='section-items']/ytd-guide-entry-renderer)[5]",
    checked: false,
    category: "Sidebar",
  },
  {
    id: "liked-videos",
    selector: "(//div[@id='section-items']/ytd-guide-entry-renderer)[6]",
    checked: false,
    category: "Sidebar",
  },
  {
    id: "my-clips",
    selector: "(//div[@id='section-items']/ytd-guide-entry-renderer)[7]",
    checked: false,
    category: "Sidebar",
  },
  {
    id: "transfers",
    selector:
      "//div[@id='section-items']/ytd-guide-downloads-entry-renderer  | //ytd-mini-guide-entry-renderer[a[@href='/feed/downloads']]",
    checked: false,
    category: "Sidebar",
  },
  {
    id: "subscriptions-panel",
    selector: "(//ytd-guide-section-renderer)[2]",
    checked: false,
    category: "Sidebar",
  },
  {
    id: "explore-panel",
    selector: "(//ytd-guide-section-renderer)[3]",
    checked: false,
    category: "Sidebar",
  },
  {
    id: "youtube-panel",
    selector: "(//ytd-guide-section-renderer)[4]",
    checked: false,
    category: "Sidebar",
  },
  {
    id: "tabs",
    selector:
      "//ytd-feed-filter-chip-bar-renderer[@component-style='FEED_FILTER_CHIP_BAR_STYLE_TYPE_DEFAULT']/..",
    checked: false,
    category: "HomePage",
  },
  {
    id: "ads",
    selector:
      "//ytd-ad-slot-renderer/ancestor::ytd-rich-item-renderer | //*[@id='player-ads'] | //ytd-banner-promo-renderer/..",
    checked: false,
    category: "HomePage",
  },
  {
    id: "posts",
    selector: "//ytd-rich-shelf-renderer/../.. | //ytd-rich-shelf-renderer",
    checked: false,
    category: "HomePage",
    urlCondition: (url) =>
      url === "https://www.youtube.com/" ||
      url.startsWith("https://www.youtube.com/?"),
  },
  {
    id: "subscriptions-shorts",
    selector: "//ytd-rich-shelf-renderer/../.. | //ytd-rich-shelf-renderer",
    checked: false,
    category: "Subscriptions",
    urlCondition: (url) => url.includes("/feed/subscriptions"),
  },
  {
    id: "video-title",
    selector: "//div[@id='above-the-fold']/div[@id='title']",
    checked: false,
    category: "Video",
  },
  {
    id: "video-likes-dislikes",
    selector: "//segmented-like-dislike-button-view-model",
    checked: false,
    category: "Video",
  },
  {
    id: "video-description",
    selector: "//div[@id='description-inner']/parent::div",
    checked: false,
    category: "Video",
  },
  {
    id: "expand-video-description",
    selector: "//div[@id='description-inner']/parent::div",
    checked: false,
    category: "Video",
  },
  {
    id: "video-comments",
    selector: "//ytd-comments[@id='comments']",
    checked: false,
    category: "Video",
  },
  {
    id: "video-categories-games",
    selector: "//ytd-rich-metadata-row-renderer/../..",
    checked: false,
    category: "Video",
  },
  {
    id: "video-ads",
    selector: "//div[@id='player-ads']",
    checked: false,
    category: "Video",
  },
  {
    id: "video-tabs",
    selector: "//yt-related-chip-cloud-renderer",
    checked: false,
    category: "Video",
  },
  {
    id: "video-suggested-videos",
    selector:
      "//div[@id='contents']/parent::ytd-item-section-renderer[contains(@class, 'watch-next')]",
    checked: false,
    category: "Video",
  },
  {
    id: "video-suggested-shorts",
    selector: "//ytd-reel-shelf-renderer",
    checked: false,
    category: "Video",
  },
  {
    id: "stream-chat",
    selector: "//div[@id='chat-container']",
    checked: false,
    category: "Stream",
  },
];

const eventBus = {
  listeners: {},
  subscribe(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  },
  publish(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => callback(data));
    }
  },
};

function waitForElements(selector, callback) {
  const observer = new MutationObserver((mutations, obs) => {
    const element = document.evaluate(
      selector,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
    if (element) {
      obs.disconnect();
      callback([element]);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  const existingElement = document.evaluate(
    selector,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
  if (existingElement) {
    callback([existingElement]);
    return;
  }
}

function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

class YouTubeElement {
  constructor(config) {
    this.id = config.id;
    this.selector = config.selector;
    this.checked = config.checked;
    this.category = config.category;
    this.isClickAction = config.id === "expand-video-description"; // This will probably be changed in the future
    this.urlCondition = config.urlCondition; // Probably will be added to every element / category in the future
  }

  async toggle(hide) {
    this.checked = hide;
    if (this.isClickAction) {
      await this.handleClick(hide);
    } else {
      await this.handleVisibility(hide);
    }
  }

  async handleClick(click) {
    if (click) {
      const elementToClick = document.evaluate(
        this.selector,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;
      elementToClick?.click();
    }
  }

  async handleVisibility(hide) {
    const applyAndWait = () => {
      this.applyVisibility(hide);
      waitForElements(this.selector, () => this.applyVisibility(hide));
    };

    if (this.urlCondition && !this.urlCondition(window.location.href)) {
      return;
    }

    applyAndWait();
  }

  applyVisibility(hide) {
    const displayValue = hide ? "none" : "";
    const xpathResult = document.evaluate(
      this.selector,
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    );

    requestAnimationFrame(() => {
      const length = xpathResult.snapshotLength;
      for (let i = 0; i < length; i++) {
        xpathResult.snapshotItem(i).style.display = displayValue;
      }

      if (this.selector === "//div[@id='chat-container']") {
        const panelsContainer = document.getElementById(
          "panels-full-bleed-container"
        );
        if (panelsContainer) {
          panelsContainer.style.display = displayValue;
        }
      }
    });
  }
}

class ElementManager {
  constructor() {
    this.elements = [];
    this.initialize();
  }

  async initialize() {
    const storedElements = await this.getStoredElements();
    this.elements = storedElements.map((el) => new YouTubeElement(el));
  }

  async getStoredElements() {
    return new Promise((resolve) => {
      chrome.storage.local.get("elements", ({ elements }) => {
        resolve(elements ? JSON.parse(elements) : DEFAULT_ELEMENTS);
      });
    });
  }

  async saveElements() {
    const serializedElements = JSON.stringify(this.elements);
    await chrome.storage.local.set({ elements: serializedElements });
  }

  async handleAction(action) {
    const element = this.elements.find((el) => el.id === action.target);
    if (element) {
      await element.toggle(action.hide);
      await this.saveElements();
    }
  }

  async applyAllElements() {
    for (const element of this.elements) {
      if (element.checked !== undefined) {
        await element.toggle(element.checked);
      }
    }
  }
}

class TubeMod {
  constructor() {
    this.elementManager = new ElementManager();
    this.setupEventListeners();
  }

  setupEventListeners() {
    chrome.runtime.onMessage.addListener(this.handleMessage.bind(this));
    eventBus.subscribe(
      "DOMContentLoaded",
      this.handleDOMContentLoaded.bind(this)
    );
    eventBus.subscribe("load", this.handleLoad.bind(this));
    eventBus.subscribe(
      "yt-navigate-finish",
      this.handleYouTubeNavigate.bind(this)
    );
    eventBus.subscribe("resize", this.handleResize.bind(this));
  }

  handleMessage(request) {
    if (request.action === "clearLocalStorage") {
      this.clearLocalStorage();
    } else {
      this.elementManager.handleAction(request.action);
    }
  }

  clearLocalStorage() {
    chrome.storage.local.clear(() => {
      console.info("Settings cleared.");
      location.reload();
    });
  }

  handleDOMContentLoaded() {
    this.elementManager.applyAllElements();
  }

  handleLoad() {
    this.elementManager.applyAllElements();
  }

  handleYouTubeNavigate() {
    this.debouncedApplyElements();
  }

  handleResize() {
    this.debouncedApplyElements();
  }

  debouncedApplyElements = debounce(() => {
    this.elementManager.applyAllElements();
  }, 200);
}

const tubeMod = new TubeMod();

document.addEventListener("DOMContentLoaded", () =>
  eventBus.publish("DOMContentLoaded")
);
window.addEventListener("load", () => eventBus.publish("load"));
window.addEventListener("yt-navigate-finish", () =>
  eventBus.publish("yt-navigate-finish")
);
window.addEventListener("resize", () => eventBus.publish("resize"));
