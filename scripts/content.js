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
      "//ytd-guide-entry-renderer[a[@title='Shorts']] | //ytd-mini-guide-entry-renderer[a[@title='Shorts']] | //ytd-guide-entry-renderer[a[@title='YouTube Shorts']] | //ytd-mini-guide-entry-renderer[a[@title='YouTube Shorts']]",
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
    selector:
      "//div[@id='section-items']/ytd-guide-entry-renderer[a[starts-with(@href, '/@')]]",
    checked: false,
    category: "Sidebar",
    pageTypes: [],
  },
  {
    id: "history",
    selector: "//ytd-guide-entry-renderer[a[@href='/feed/history']]",
    checked: false,
    category: "Sidebar",
    pageTypes: [],
  },
  {
    id: "playlists",
    selector: "//ytd-guide-entry-renderer[a[@href='/feed/playlists']]",
    checked: false,
    category: "Sidebar",
    pageTypes: [],
  },
  {
    id: "my-videos",
    selector:
      "//ytd-guide-entry-renderer[a[starts-with(@href, 'https://studio.youtube.com/channel')]]",
    checked: false,
    category: "Sidebar",
    pageTypes: [],
  },
  {
    id: "your-movies-and-tv",
    selector: "//ytd-guide-entry-renderer[a[@href='/feed/storefront?bp=ogUCKAQ%3D']]",
    checked: false,
    category: "Sidebar",
    pageTypes: [],
  },
  {
    id: "watch-later",
    selector: "//ytd-guide-entry-renderer[a[@href='/playlist?list=WL']]",
    checked: false,
    category: "Sidebar",
    pageTypes: [],
  },
  {
    id: "courses",
    selector: "//ytd-guide-entry-renderer[a[@href='/feed/courses']]",
    checked: false,
    category: "Sidebar",
    pageTypes: [],
  },
  {
    id: "liked-videos",
    selector: "//ytd-guide-entry-renderer[a[@href='/playlist?list=LL']]",
    checked: false,
    category: "Sidebar",
    pageTypes: [],
  },
  {
    id: "my-clips",
    selector: "//ytd-guide-entry-renderer[a[@href='/feed/clips']]",
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
    id: "youtube-settings",
    selector: "(//ytd-guide-section-renderer)[5]",
    checked: false,
    category: "Sidebar",
    pageTypes: [],
  },
  {
    id: "youtube-footer",
    selector: "//ytd-guide-renderer/div[@id='footer']",
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
    id: "homepage-views",
    selector: "//div[@id='metadata-line']/span[1]",
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
    selector:
      "//div[@id='description']//div[@id='info-container']//yt-formatted-string[@id='info']//span[position()=1 or position()=2]",
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
    id: "video-share",
    selector: "//div[@id='top-level-buttons-computed']/yt-button-view-model",
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
    id: "video-chapters-description",
    selector:
      "//ytd-horizontal-card-list-renderer[contains (@class, 'ytd-structured-description-content-renderer')]",
    checked: false,
    category: "Video",
    pageTypes: [PAGE_TYPES.VIDEO],
  },
  {
    id: "video-transcription-description",
    selector: "//ytd-video-description-transcript-section-renderer",
    checked: false,
    category: "Video",
    pageTypes: [PAGE_TYPES.VIDEO],
  },
  {
    id: "video-channel-links-description",
    selector: "//ytd-video-description-infocards-section-renderer",
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
    id: "video-suggestion-wall",
    selector: "//div[@class='ytp-endscreen-content']",
    checked: false,
    category: "Video",
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
    Object.assign(this, config);
  }

  async toggle(hide) {
    this.checked = hide;
    return this.handleVisibility(hide);
  }

  handleVisibility(hide) {
    const currentPageType = getCurrentPageType();
    if (
      this.pageTypes.length > 0 &&
      !this.pageTypes.includes(currentPageType)
    ) {
      return;
    }
    this.applyVisibility(hide);
  }

  applyVisibility(hide) {
    const displayValue = hide ? "none" : "";
    const elements = document.evaluate(
      this.selector,
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null
    );

    for (let i = 0; i < elements.snapshotLength; i++) {
      elements.snapshotItem(i).style.display = displayValue;
    }

    if (this.selector === "//div[@id='chat-container']") {
      const panelsContainer = document.getElementById(
        "panels-full-bleed-container"
      );
      if (panelsContainer) {
        panelsContainer.style.display = displayValue;
      }
    }
  }
}

class ElementManager {
  constructor() {
    this.elements = [];
    this.observer = null;
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

  setupObserver() {
    this.observer?.disconnect();
    this.observer = new MutationObserver(
      debounce(this.handleMutations.bind(this), 100)
    );
    this.observer.observe(document.body, { childList: true, subtree: true });
  }

  handleMutations() {
    this.applyAllElements(getCurrentPageType());
  }

  async applyAllElements(pageType) {
    const relevantElements = this.elements.filter(
      (el) => el.pageTypes.length === 0 || el.pageTypes.includes(pageType)
    );

    await Promise.all(
      relevantElements.map((element) =>
        element.checked !== undefined ? element.toggle(element.checked) : null
      )
    );
  }
}

class TubeMod {
  constructor() {
    this.elementManager = new ElementManager();
    this.setupEventListeners();
  }

  setupEventListeners() {
    chrome.runtime.onMessage.addListener(this.handleMessage.bind(this));
    window.addEventListener(
      "yt-navigate-finish",
      this.handleYouTubeNavigate.bind(this)
    );
    window.addEventListener("load", this.handleLoad.bind(this));
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

  handleLoad() {
    this.elementManager.applyAllElements(getCurrentPageType());
    this.elementManager.setupObserver();
  }

  handleYouTubeNavigate() {
    this.elementManager.applyAllElements(getCurrentPageType());
  }
}

const tubeMod = new TubeMod();
