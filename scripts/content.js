const DISPLAY = "display";
const FILTER = "filter";
const DISPLAY_NONE = "none";

const PAGE_TYPES = {
  HOME: "home",
  SUBSCRIPTIONS: "subscriptions",
  VIDEO: "video",
  SEARCH: "search",
  TRENDING: "trending",
};

function saveSettings() {
  const a = document.createElement("a");
  chrome.storage.local.get(
    ["tubemod_elements", "tubemod_version"],
    (result) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        const file = new Blob([JSON.stringify(result)], {
          type: "application/json",
        });
        a.href = URL.createObjectURL(file);
        a.download = "tubeModSettings.json";
        a.click();
      }
    }
  );
  document.body.removeChild(a);
}

function importSettings(settings) {
  chrome.storage.local.set({
    tubemod_elements: JSON.parse(settings)["tubemod_elements"],
    tubemod_version: JSON.parse(settings)["tubemod_version"],
  });
  location.reload();
  alert("TubeMod settings uploaded and applied!");
}

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
  } else if (url.includes("/results?search_query")) {
    return PAGE_TYPES.SEARCH;
  } else if (url.includes("/feed/trending")) {
    return PAGE_TYPES.TRENDING;
  }
  return null;
}

const STORAGE = {
  tubemod_version: "1.10.0A",
  tubemod_elements: [
    {
      id: "scheduled-videos",
      selector:
        "//ytd-rich-item-renderer[.//ytd-thumbnail-overlay-time-status-renderer[@overlay-style='UPCOMING']]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [],
    },
    {
      id: "live-videos",
      selector:
        "//ytd-rich-item-renderer[.//div[@id='meta']/ytd-badge-supported-renderer[not(@hidden)]]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [],
    },
    {
      id: "video-previews",
      selector: "//div[@id='video-preview' or @id='mouseover-overlay']",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [],
    },
    {
      id: "video-thumbnails",
      selector: "//ytd-thumbnail//yt-image | //ytd-playlist-thumbnail",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [],
    },
    {
      id: "video-thumbnails-blur",
      selector: "//ytd-thumbnail//yt-image | //ytd-playlist-thumbnail",
      checked: false,
      property: FILTER,
      style: "blur(10px)",
      pageTypes: [],
    },
    {
      id: "video-meta-data",
      selector: "//div[@id='metadata-line']",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [],
    },
    {
      id: "logo",
      selector: "//ytd-topbar-logo-renderer",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [],
    },
    {
      id: "search-bar",
      selector: "//ytd-searchbox[@id='search']",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [],
    },
    {
      id: "microphone-search",
      selector: "//*[@id='voice-search-button']",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [],
    },
    {
      id: "create",
      selector:
        "(//div[@id='buttons' and contains(@class, 'ytd-masthead')]//a/../..)[1]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [],
    },
    {
      id: "notifications",
      selector: "//ytd-notification-topbar-button-renderer",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [],
    },
    {
      id: "profile-sign-out",
      selector: "//ytd-compact-link-renderer/a[@href='/logout']",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [],
    },
    {
      id: "home",
      selector:
        "//ytd-guide-entry-renderer[a[@href='/']] | //ytd-mini-guide-entry-renderer[a[@href='/']]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [],
    },
    {
      id: "shorts",
      selector:
        "//ytd-guide-entry-renderer[a[@title='Shorts']] | //ytd-mini-guide-entry-renderer[a[@title='Shorts']] | //ytd-guide-entry-renderer[a[@title='YouTube Shorts']] | //ytd-mini-guide-entry-renderer[a[@title='YouTube Shorts']]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [],
    },
    {
      id: "subscriptions",
      selector:
        "//ytd-guide-entry-renderer[a[@href='/feed/subscriptions']] | //ytd-mini-guide-entry-renderer[a[@href='/feed/subscriptions']]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [],
    },
    {
      id: "youtube-music",
      selector:
        "(//ytd-guide-entry-renderer[a[@href='https://music.youtube.com/']])[1] | //ytd-mini-guide-entry-renderer[a[@href='https://music.youtube.com/']]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [],
    },
    {
      id: "you",
      selector:
        "(//div[@id='header']/ytd-guide-entry-renderer)[1] | //ytd-mini-guide-entry-renderer[a[@href='/feed/you']]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [],
    },
    {
      id: "history",
      selector: "//ytd-guide-entry-renderer[a[@href='/feed/history']]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [],
    },
    {
      id: "playlists",
      selector: "//ytd-guide-entry-renderer[a[@href='/feed/playlists']]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [],
    },
    {
      id: "my-videos",
      selector:
        "//ytd-guide-entry-renderer[a[starts-with(@href, 'https://studio.youtube.com/channel')]]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [],
    },
    {
      id: "your-movies-and-tv",
      selector:
        "//ytd-guide-entry-renderer[a[@href='/feed/storefront?bp=ogUCKAQ%3D']]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [],
    },
    {
      id: "your-podcasts",
      selector: "//ytd-guide-entry-renderer[a[@href='/feed/podcasts']]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [],
    },
    {
      id: "watch-later",
      selector: "//ytd-guide-entry-renderer[a[@href='/playlist?list=WL']]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [],
    },
    {
      id: "courses",
      selector: "//ytd-guide-entry-renderer[a[@href='/feed/courses']]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [],
    },
    {
      id: "liked-videos",
      selector: "//ytd-guide-entry-renderer[a[@href='/playlist?list=LL']]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [],
    },
    {
      id: "my-clips",
      selector: "//ytd-guide-entry-renderer[a[@href='/feed/clips']]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [],
    },
    {
      id: "transfers",
      selector:
        "//div[@id='section-items']/ytd-guide-downloads-entry-renderer  | //ytd-mini-guide-entry-renderer[a[@href='/feed/downloads']]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [],
    },
    {
      id: "subscriptions-panel",
      selector: "(//ytd-guide-section-renderer)[2]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [],
    },
    {
      id: "subscriptions-panel-new-indicator",
      selector:
        "//ytd-guide-entry-renderer[@line-end-style='dot']//div[@id='newness-dot']",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [],
    },
    {
      id: "explore-panel",
      selector: "(//ytd-guide-section-renderer)[3]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [],
    },
    {
      id: "youtube-panel",
      selector: "(//ytd-guide-section-renderer)[4]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [],
    },
    {
      id: "youtube-settings",
      selector: "(//ytd-guide-section-renderer)[5]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [],
    },
    {
      id: "youtube-footer",
      selector: "//ytd-guide-renderer/div[@id='footer']",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [],
    },
    {
      id: "tabs",
      selector:
        "//ytd-feed-filter-chip-bar-renderer[@component-style='FEED_FILTER_CHIP_BAR_STYLE_TYPE_DEFAULT']/..",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.HOME],
    },
    {
      id: "ads",
      selector:
        "//ytd-ad-slot-renderer/ancestor::ytd-rich-item-renderer | //*[@id='player-ads'] | //ytd-banner-promo-renderer/..",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.HOME],
    },
    {
      id: "all-videos",
      selector: "//*[@page-subtype='home']/div[@id='primary']",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.HOME],
    },
    {
      id: "home-posts",
      selector: "//ytd-rich-section-renderer[.//ytd-post-renderer]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.HOME],
    },
    {
      id: "home-shorts",
      selector: "//ytd-rich-section-renderer[.//ytm-shorts-lockup-view-model]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.HOME],
    },
    // {
    //   id: "home-news",
    //   selector: "",
    //   checked: false,
    //   property: DISPLAY,
    //   style: DISPLAY_NONE,
    //   pageTypes: [PAGE_TYPES.HOME],
    // },
    {
      id: "playlist-mix",
      selector:
        "//ytd-rich-item-renderer[.//ytd-playlist-thumbnail[not(@hidden)]] | //ytd-rich-item-renderer[.//a[contains(@href, 'start_radio=1')]]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.HOME],
    },
    {
      id: "podcast-playlist",
      selector: "//ytd-rich-item-renderer[.//a[contains(@href, 'pp=')]]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.HOME],
    },
    {
      id: "viewed-videos",
      selector:
        "//ytd-rich-item-renderer[.//div[@id='progress'][contains(@style, 'width: 100%')]]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.HOME],
    },
    {
      id: "subscriptions-shorts",
      selector: "//ytd-rich-shelf-renderer/../.. | //ytd-rich-shelf-renderer",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.SUBSCRIPTIONS],
    },
    {
      id: "search-shorts",
      selector: "//ytd-reel-shelf-renderer",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.SEARCH],
    },
    {
      id: "search-people-also-searched",
      selector: "//div[@id='contents']/ytd-horizontal-card-list-renderer",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.SEARCH],
    },
    {
      id: "trending-shorts",
      selector: "//ytd-video-renderer[.//a[contains(@href, '/shorts')]]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.TRENDING],
    },
    {
      id: "video-settings-sleep-timer",
      selector:
        "(//div[contains(@class, 'ytp-settings-menu')]//div[@class='ytp-menuitem' and @role='menuitem'])[3]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
    {
      id: "video-title",
      selector: "//div[@id='above-the-fold']/div[@id='title']",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
    {
      id: "video-subscribers",
      selector: "(//div[@id='upload-info'])[1]/yt-formatted-string",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
    {
      id: "video-subscribe-button",
      selector: "//yt-button-shape[@id='subscribe-button-shape']",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
    {
      id: "video-subscribed-button",
      selector: "//div[@id='notification-preference-button']",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
    {
      id: "video-join-button",
      selector: "//div[@id='sponsor-button']",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
    {
      id: "video-likes-dislikes",
      selector: "//segmented-like-dislike-button-view-model",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
    {
      id: "video-share",
      selector: "//div[@id='top-level-buttons-computed']/yt-button-view-model",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
    {
      id: "video-download",
      selector: "//ytd-download-button-renderer",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
    {
      id: "video-extra-buttons",
      selector: "//div[@id='flexible-item-buttons']/yt-button-view-model",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
    {
      id: "video-collapsed-buttons",
      selector:
        "//div[@id='top-row']//ytd-menu-renderer//yt-button-shape[@id='button-shape']",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
    {
      id: "stream-show-chat",
      selector: "//div[@id='show-hide-button']",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
    {
      id: "video-description",
      selector: "//div[@id='description-inner']/parent::div",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
    {
      id: "video-views",
      selector:
        "//div[@id='view-count'] | (//yt-formatted-string[@id='info']/span)[position()<3]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
    {
      id: "video-chapters-description",
      selector:
        "//ytd-horizontal-card-list-renderer[contains (@class, 'ytd-structured-description-content-renderer')]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
    {
      id: "video-transcription-description",
      selector: "//ytd-video-description-transcript-section-renderer",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
    {
      id: "video-channel-links-description",
      selector: "//ytd-video-description-infocards-section-renderer",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
    {
      id: "video-live-chat-replay",
      selector: "//div[@id='teaser-carousel']",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
    {
      id: "video-summary-ai-generated",
      selector: "//div[@id='expandable-metadata']",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
    {
      id: "video-comments",
      selector: "//ytd-comments[@id='comments']",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
    {
      id: "video-categories-games",
      selector: "//ytd-rich-metadata-row-renderer/../..",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
    {
      id: "video-ads",
      selector: "//div[@id='player-ads']",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
    {
      id: "video-offer-module",
      selector: "//div[@id='offer-module']",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
    {
      id: "video-thumbnail",
      selector: "//ytd-watch-next-secondary-results-renderer/div[@id='items']",
      checked: false,
      // property: DISPLAY,
      // style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
    {
      id: "video-tabs",
      selector: "//yt-related-chip-cloud-renderer",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
    {
      id: "video-suggested-videos",
      selector:
        "//div[@id='contents']/parent::ytd-item-section-renderer[contains(@class, 'watch-next')]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
    {
      id: "video-suggested-shorts",
      selector: "//ytd-reel-shelf-renderer",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
    {
      id: "video-suggestion-wall",
      selector: "//div[@class='ytp-endscreen-content']",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
  ],
};

const THUMBNAIL_VARIANTS = [
  'maxresdefault.jpg',  // HD (1280x720)
  'maxres1.jpg',              // Alternate 1
  'maxres2.jpg',              // Alternate 2
  'maxres3.jpg'               // Alternate 3
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
    this.currentThumbnailIndex = 0;
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

  createCycleButtons(direction) {
    const button = document.createElement('button');
    button.innerHTML = direction === 'next' ? '→' : '←';
    const baseStyles = `
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(0, 0, 0, 0.7);
      color: white;
      border: none;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      cursor: pointer;
      z-index: 2;
    `;
    button.setAttribute('style', `
      ${baseStyles}
      ${direction === 'next' ? 'right: 10px;' : 'left: 10px;'}
    `);
    return button;
  }

  cycleThumbnail(videoId, image, container, direction) {
    const totalVariants = THUMBNAIL_VARIANTS.length;
    if (direction === 'next') {
      this.currentThumbnailIndex = (this.currentThumbnailIndex + 1) % totalVariants;
    } else {
      this.currentThumbnailIndex = (this.currentThumbnailIndex - 1 + totalVariants) % totalVariants;
    }
    const newThumbnailUrl = `https://img.youtube.com/vi/${videoId}/${THUMBNAIL_VARIANTS[this.currentThumbnailIndex]}`;
    image.setAttribute('src', newThumbnailUrl);
    container.setAttribute('href', newThumbnailUrl);
  }

  applyVisibility(hide) {
    const elements = document.evaluate(
      this.selector,
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null
    );

    for (let i = 0; i < elements.snapshotLength; i++) {
      hide
        ? (elements.snapshotItem(i).style[this.property] = this.style)
        : (elements.snapshotItem(i).style[this.property] = "");
    }

    if (this.id === "video-views") {
      const viewsElement = document.getElementById("view-count");
      if (viewsElement) {
        hide
          ? (viewsElement.disabled = "true")
          : (viewsElement.disabled = "false");
      }
    }

    if (this.id === "you") {
      const elementWithTopBorder = document.querySelector(
        "ytd-guide-collapsible-section-entry-renderer"
      );
      if (elementWithTopBorder) {
        elementWithTopBorder.style.borderTop = hide
          ? "none"
          : "1px solid var(--yt-spec-10-percent-layer)";
      }
    }

    if (this.id === "my-clips") {
      const elementWithBottomBorder = document.querySelector(
        "ytd-guide-section-renderer"
      );
      if (elementWithBottomBorder) {
        elementWithBottomBorder.style.borderBottom = hide
          ? "none"
          : "1px solid var(--yt-spec-10-percent-layer)";
      }
    }

    if (this.id === "video-thumbnail") {
      const thumbnailElement = document.getElementById("video-thumbnail-tubemod");
      if (hide && thumbnailElement === null) {
        const items = document.querySelector(
          "ytd-watch-next-secondary-results-renderer div#items"
        );
        let currentVideo = new URL(document.URL);
        let videoId = currentVideo.searchParams.get("v");
        let thumbnailSource = `https://img.youtube.com/vi/${videoId}/${THUMBNAIL_VARIANTS[0]}`;
        
        if (items) {
          let ytImage = document.createElement("ytd-thumbnail");
          ytImage.setAttribute('style', 'position: relative;');
          
          let anchorTag = document.createElement("a");
          anchorTag.setAttribute("target", "_blank");
          anchorTag.setAttribute("href", thumbnailSource);
          
          let image = document.createElement("img");
          image.setAttribute("id", "video-thumbnail-tubemod");
          image.setAttribute("src", thumbnailSource);
          image.setAttribute("class", "yt-core-image--fill-parent-width yt-core-image--loaded");
          image.setAttribute("style", "border-radius: 8px; margin-bottom: 8px;");
          
          const nextButton = this.createCycleButtons('next');
          const prevButton = this.createCycleButtons('prev');
          
          nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.cycleThumbnail(videoId, image, anchorTag, 'next');
          });
          
          prevButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.cycleThumbnail(videoId, image, anchorTag, 'prev');
          });

          anchorTag.append(image);
          ytImage.append(anchorTag);
          ytImage.append(nextButton);
          ytImage.append(prevButton);
          items.prepend(ytImage);
        }
      } else if (!hide && thumbnailElement) {
        thumbnailElement.closest('ytd-thumbnail').remove();
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
      chrome.storage.local.get(
        ["tubemod_elements", "tubemod_version"],
        (result) => {
          if (
            result.tubemod_elements &&
            result.tubemod_version === STORAGE.tubemod_version
          ) {
            resolve(JSON.parse(result.tubemod_elements));
          } else if (
            result.tubemod_elements &&
            result.tubemod_version !== STORAGE.tubemod_version
          ) {
            const storedElements = JSON.parse(result.tubemod_elements);
            const mergedElements = STORAGE.tubemod_elements.map(
              (newElement) => {
                const storedElement = storedElements.find(
                  (el) => el.id === newElement.id
                );
                if (storedElement) {
                  return { ...newElement, checked: storedElement.checked };
                }
                return newElement;
              }
            );
            chrome.storage.local.set({
              tubemod_elements: JSON.stringify(mergedElements),
              tubemod_version: STORAGE.tubemod_version,
            });
            resolve(mergedElements);
          } else {
            chrome.storage.local.set({
              tubemod_elements: JSON.stringify(STORAGE.tubemod_elements),
              tubemod_version: STORAGE.tubemod_version,
            });
            resolve(STORAGE.tubemod_elements);
          }
        }
      );
    });
  }

  async saveElements() {
    const serializedElements = JSON.stringify(this.elements);
    await chrome.storage.local.set({
      tubemod_elements: serializedElements,
      tubemod_version: STORAGE.tubemod_version,
    });
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
      relevantElements.map((element) => {
        element.checked !== undefined ? element.toggle(element.checked) : null;
      })
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
      "DOMContentLoaded",
      this.handleYouTubeNavigate.bind(this)
    );
    window.addEventListener("popstate", this.handleYouTubeNavigate.bind(this));
    window.addEventListener("load", this.handleLoad.bind(this));
  }

  handleMessage(request) {
    if (request.action === "clearLocalStorage") {
      this.clearLocalStorage();
    } else if (request.action === "saveSettings") {
      saveSettings();
    } else if (request.action === "importSettings") {
      importSettings(request.content);
    } else {
      this.elementManager.handleAction(request.action);
    }
  }

  clearLocalStorage() {
    chrome.storage.local.clear(() => {
      chrome.storage.local.set(
        { elements: JSON.stringify(STORAGE.tubemod_elements) },
        () => {
          console.info("Default settings restored.");
          location.reload();
        }
      );
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
