// Configuration

const PAGE_TYPES = {
  HOME: "home",
  SUBSCRIPTIONS: "subscriptions",
  VIDEO: "video",
};

function getCurrentPageType() {
  const url = window.location.href;
  if (
    url === "https://www.youtube.com/" ||
    url.startsWith("https://www.youtube.com/?")
  ) {
    return PAGE_TYPES.HOME;
  } else if (url.includes("/watch")) {
    return PAGE_TYPES.VIDEO;
  } else if (url.includes("/feed/subscriptions")) {
    return PAGE_TYPES.SUBSCRIPTIONS;
  }
  return null;
}

const DEFAULT_ELEMENTS = [
  {
    id: "logo",
    selector: "//ytd-topbar-logo-renderer",
    checked: false,
    category: "General",
    pageTypes: [],
  },
  {
    id: "microphone-search",
    selector: "//*[@id='voice-search-button']",
    checked: false,
    category: "General",
    pageTypes: [],
  },
  {
    id: "create",
    selector:
      "(//div[@id='buttons' and contains(@class, 'ytd-masthead')]//a/../..)[1]",
    checked: false,
    category: "General",
    pageTypes: [],
  },
  {
    id: "notifications",
    selector: "//ytd-notification-topbar-button-renderer",
    checked: false,
    category: "General",
    pageTypes: [],
  },
  {
    id: "scheduled-videos",
    selector: "//ytd-rich-item-renderer[.//ytd-toggle-button-renderer]",
    checked: false,
    category: "General",
    pageTypes: [],
  },
  {
    id: "home",
    selector:
      "//ytd-guide-entry-renderer[a[@href='/']] | //ytd-mini-guide-entry-renderer[a[@href='/']]",
    checked: false,
    category: "Sidebar",
    pageTypes: [],
  },
  {
    id: "shorts",
    selector:
      "//ytd-guide-entry-renderer[a[@title='Shorts']] | //ytd-mini-guide-entry-renderer[a[@title='Shorts']]",
    checked: false,
    category: "Sidebar",
    pageTypes: [],
  },
  {
    id: "subscriptions",
    selector:
      "//ytd-guide-entry-renderer[a[@href='/feed/subscriptions']] | //ytd-mini-guide-entry-renderer[a[@href='/feed/subscriptions']]",
    checked: false,
    category: "Sidebar",
    pageTypes: [],
  },
  {
    id: "youtube-music",
    selector:
      "(//ytd-guide-entry-renderer[a[@href='https://music.youtube.com/']])[1] | //ytd-mini-guide-entry-renderer[a[@href='https://music.youtube.com/']]",
    checked: false,
    category: "Sidebar",
    pageTypes: [],
  },
  {
    id: "you",
    selector:
      "(//div[@id='header']/ytd-guide-entry-renderer)[1] | //ytd-mini-guide-entry-renderer[a[@href='/feed/you']]",
    checked: false,
    category: "Sidebar",
    pageTypes: [],
  },
  {
    id: "my-channel",
    selector: "(//div[@id='section-items']/ytd-guide-entry-renderer)[1]",
    checked: false,
    category: "Sidebar",
    pageTypes: [],
  },
  {
    id: "history",
    selector: "(//div[@id='section-items']/ytd-guide-entry-renderer)[2]",
    checked: false,
    category: "Sidebar",
    pageTypes: [],
  },
  {
    id: "playlists",
    selector: "(//div[@id='section-items']/ytd-guide-entry-renderer)[3]",
    checked: false,
    category: "Sidebar",
    pageTypes: [],
  },
  {
    id: "my-videos",
    selector: "(//div[@id='section-items']/ytd-guide-entry-renderer)[4]",
    checked: false,
    category: "Sidebar",
    pageTypes: [],
  },
  {
    id: "watch-later",
    selector: "(//div[@id='section-items']/ytd-guide-entry-renderer)[5]",
    checked: false,
    category: "Sidebar",
    pageTypes: [],
  },
  {
    id: "liked-videos",
    selector: "(//div[@id='section-items']/ytd-guide-entry-renderer)[6]",
    checked: false,
    category: "Sidebar",
    pageTypes: [],
  },
  {
    id: "my-clips",
    selector: "(//div[@id='section-items']/ytd-guide-entry-renderer)[7]",
    checked: false,
    category: "Sidebar",
    pageTypes: [],
  },
  {
    id: "transfers",
    selector:
      "//div[@id='section-items']/ytd-guide-downloads-entry-renderer  | //ytd-mini-guide-entry-renderer[a[@href='/feed/downloads']]",
    checked: false,
    category: "Sidebar",
    pageTypes: [],
  },
  {
    id: "subscriptions-panel",
    selector: "(//ytd-guide-section-renderer)[2]",
    checked: false,
    category: "Sidebar",
    pageTypes: [],
  },
  {
    id: "explore-panel",
    selector: "(//ytd-guide-section-renderer)[3]",
    checked: false,
    category: "Sidebar",
    pageTypes: [],
  },
  {
    id: "youtube-panel",
    selector: "(//ytd-guide-section-renderer)[4]",
    checked: false,
    category: "Sidebar",
    pageTypes: [],
  },
  {
    id: "tabs",
    selector:
      "//ytd-feed-filter-chip-bar-renderer[@component-style='FEED_FILTER_CHIP_BAR_STYLE_TYPE_DEFAULT']/..",
    checked: false,
    category: "HomePage",
    pageTypes: [PAGE_TYPES.HOME],
  },
  {
    id: "ads",
    selector:
      "//ytd-ad-slot-renderer/ancestor::ytd-rich-item-renderer | //*[@id='player-ads'] | //ytd-banner-promo-renderer/..",
    checked: false,
    category: "HomePage",
    pageTypes: [PAGE_TYPES.HOME],
  },
  {
    id: "posts",
    selector: "//ytd-rich-shelf-renderer/../.. | //ytd-rich-shelf-renderer",
    checked: false,
    category: "HomePage",
    pageTypes: [PAGE_TYPES.HOME],
  },
  {
    id: "subscriptions-shorts",
    selector: "//ytd-rich-shelf-renderer/../.. | //ytd-rich-shelf-renderer",
    checked: false,
    category: "Subscriptions",
    pageTypes: [PAGE_TYPES.SUBSCRIPTIONS],
  },
  {
    id: "video-title",
    selector: "//div[@id='above-the-fold']/div[@id='title']",
    checked: false,
    category: "Video",
    pageTypes: [PAGE_TYPES.VIDEO],
  },
  {
    id: "video-subscribers",
    selector: "(//div[@id='upload-info'])[1]/yt-formatted-string",
    checked: false,
    category: "Video",
    pageTypes: [PAGE_TYPES.VIDEO],
  },
  {
    id: "video-views",
    selector: "(//div[@id='description']//div[@id='info-container']//yt-formatted-string[@id='info']//span)[1]",
    checked: false,
    category: "Video",
    pageTypes: [PAGE_TYPES.VIDEO],
  },
  {
    id: "video-likes-dislikes",
    selector: "//segmented-like-dislike-button-view-model",
    checked: false,
    category: "Video",
    pageTypes: [PAGE_TYPES.VIDEO],
  },
  {
    id: "video-description",
    selector: "//div[@id='description-inner']/parent::div",
    checked: false,
    category: "Video",
    pageTypes: [PAGE_TYPES.VIDEO],
  },
  {
    id: "expand-video-description",
    selector: "//div[@id='description-inner']/parent::div",
    checked: false,
    category: "Video",
    pageTypes: [PAGE_TYPES.VIDEO],
  },
  {
    id: "video-comments",
    selector: "//ytd-comments[@id='comments']",
    checked: false,
    category: "Video",
    pageTypes: [PAGE_TYPES.VIDEO],
  },
  {
    id: "video-categories-games",
    selector: "//ytd-rich-metadata-row-renderer/../..",
    checked: false,
    category: "Video",
    pageTypes: [PAGE_TYPES.VIDEO],
  },
  {
    id: "video-ads",
    selector: "//div[@id='player-ads']",
    checked: false,
    category: "Video",
    pageTypes: [PAGE_TYPES.VIDEO],
  },
  {
    id: "video-tabs",
    selector: "//yt-related-chip-cloud-renderer",
    checked: false,
    category: "Video",
    pageTypes: [PAGE_TYPES.VIDEO],
  },
  {
    id: "video-suggested-videos",
    selector:
      "//div[@id='contents']/parent::ytd-item-section-renderer[contains(@class, 'watch-next')]",
    checked: false,
    category: "Video",
    pageTypes: [PAGE_TYPES.VIDEO],
  },
  {
    id: "video-suggested-shorts",
    selector: "//ytd-reel-shelf-renderer",
    checked: false,
    category: "Video",
    pageTypes: [PAGE_TYPES.VIDEO],
  },
  {
    id: "stream-chat",
    selector: "//div[@id='chat-container']",
    checked: false,
    category: "Stream",
    pageTypes: [PAGE_TYPES.VIDEO],
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
    this.pageTypes = config.pageTypes || []; // Array of page types where this element should be checked
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
    const currentPageType = getCurrentPageType();
    if (
      this.pageTypes.length > 0 &&
      !this.pageTypes.includes(currentPageType)
    ) {
      return;
    }

    const applyAndWait = () => {
      this.applyVisibility(hide);
      waitForElements(this.selector, () => this.applyVisibility(hide));
    };

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

  async applyAllElements(pageType) {
    for (const element of this.elements) {
      if (
        element.checked !== undefined &&
        (element.pageTypes.length === 0 || element.pageTypes.includes(pageType))
      ) {
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
    const currentPageType = getCurrentPageType();
    this.debouncedApplyElements(currentPageType);
  }

  handleResize() {
    const currentPageType = getCurrentPageType();
    this.debouncedApplyElements(currentPageType);
  }

  debouncedApplyElements = debounce((pageType) => {
    this.elementManager.applyAllElements(pageType);
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
