const DISPLAY = "display";
const BACKGROUND = "background";
const FILTER = "filter";
const TEXT_TRANSFORM = "text-transform";
const DISPLAY_NONE = "none";
const LOWERCASE = "lowercase";
const YT_RED = "#F03"

const PAGE_TYPES = {
  HOME: "home",
  SUBSCRIPTIONS: "subscriptions",
  VIDEO: "video",
  SEARCH: "search",
  TRENDING: "trending",
  DOWNLOADS: "downloads"
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
  } else if (url.includes("/feed/downloads")) {
    return PAGE_TYPES.DOWNLOADS;
  }
  return null;
}

const STORAGE = {
  tubemod_version: "1.12.0",
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
      id: "lowercase-title",
      selector:
        "//ytd-watch-metadata//div[@id='title'] | //*[@id='video-title']",
      checked: false,
      property: TEXT_TRANSFORM,
      style: LOWERCASE,
      pageTypes: [],
    },
    {
      id: "download-badge",
      selector: "//p[text()[contains(., 'Downloaded')]]",
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
      selector: "//ytd-searchbox[@id='search'] | //yt-searchbox",
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
        "//div[@id='buttons' and contains(@class, 'ytd-masthead')]/ytd-button-renderer",
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
      id: "studio-button",
      selector: "//ytd-notification-topbar-button-renderer",
      checked: false,
      pageTypes: []
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
      id: "sidebar",
      selector: "//tp-yt-app-drawer | //ytd-mini-guide-renderer | //yt-icon-button[@id='guide-button']",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: []
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
        "//ytd-ad-slot-renderer/ancestor::ytd-rich-item-renderer | //*[@id='player-ads'] | //ytd-banner-promo-renderer/.. | //div[@id='masthead-ad']",
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
    {
      id: "home-news",
      selector: "//ytd-rich-section-renderer[not(.//ytm-shorts-lockup-view-model) and not(.//div[contains(@class, 'button-container') and not(@hidden)][.//*[local-name() = 'svg']//*[local-name() = 'path' and @d='m18 9.28-6.35 6.35-6.37-6.35.72-.71 5.64 5.65 5.65-5.65z']])]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.HOME],
    },
    {
      id: "home-trending",
      selector: "//ytd-rich-section-renderer[.//div[contains(@class, 'button-container') and not(@hidden)][.//*[local-name() = 'svg']//*[local-name() = 'path' and @d='m18 9.28-6.35 6.35-6.37-6.35.72-.71 5.64 5.65 5.65-5.65z']]]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.HOME],
    },
    {
      id: "home-playables",
      selector:
        "//ytd-rich-section-renderer[.//a[contains(@href, '/playables')]]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.HOME],
    },
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
      id: "video-progress-bar-dot",
      selector: "//div[@class='ytp-scrubber-container']",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
    {
      id: "video-settings-playback-speed",
      selector:
        "//div[@role='menuitem'][.//*[local-name() = 'svg']//*[local-name() = 'path' and @d='M10,8v8l6-4L10,8L10,8z M6.3,5L5.7,4.2C7.2,3,9,2.2,11,2l0.1,1C9.3,3.2,7.7,3.9,6.3,5z            M5,6.3L4.2,5.7C3,7.2,2.2,9,2,11 l1,.1C3.2,9.3,3.9,7.7,5,6.3z            M5,17.7c-1.1-1.4-1.8-3.1-2-4.8L2,13c0.2,2,1,3.8,2.2,5.4L5,17.7z            M11.1,21c-1.8-0.2-3.4-0.9-4.8-2 l-0.6,.8C7.2,21,9,21.8,11,22L11.1,21z            M22,12c0-5.2-3.9-9.4-9-10l-0.1,1c4.6,.5,8.1,4.3,8.1,9s-3.5,8.5-8.1,9l0.1,1 C18.2,21.5,22,17.2,22,12z']]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
    {
      id: "video-settings-sleep-timer",
      selector:
        "//div[@role='menuitem'][.//*[local-name() = 'svg']//*[local-name() = 'path' and @d='M16.67,4.31C19.3,5.92,21,8.83,21,12c0,4.96-4.04,9-9,9c-2.61,0-5.04-1.12-6.72-3.02C5.52,17.99,5.76,18,6,18 c6.07,0,11-4.93,11-11C17,6.08,16.89,5.18,16.67,4.31 M14.89,2.43C15.59,3.8,16,5.35,16,7c0,5.52-4.48,10-10,10 c-1,0-1.97-0.15-2.89-0.43C4.77,19.79,8.13,22,12,22c5.52,0,10-4.48,10-10C22,7.48,19,3.67,14.89,2.43L14.89,2.43z M12,6H6v1h4.5 L6,10.99v0.05V12h6v-1H7.5L12,7.01V6.98V6L12,6z']]",
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
      id: "video-thanks",
      selector: "//div[@id='flexible-item-buttons']/yt-button-view-model[.//*[local-name() = 'svg']//*[local-name() = 'path' and @d='M11 17h2v-1h1c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1h-3v-1h4V8h-2V7h-2v1h-1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h3v1H9v2h2v1zm5.5-15c-1.74 0-3.41.88-4.5 2.28C10.91 2.88 9.24 2 7.5 2 4.42 2 2 4.64 2 7.99c0 4.12 3.4 7.48 8.55 12.58L12 22l1.45-1.44C18.6 15.47 22 12.11 22 7.99 22 4.64 19.58 2 16.5 2zm-3.75 17.85-.75.74-.74-.73-.04-.04C6.27 14.92 3 11.69 3 7.99 3 5.19 4.98 3 7.5 3c1.4 0 2.79.71 3.71 1.89L12 5.9l.79-1.01C13.71 3.71 15.1 3 16.5 3 19.02 3 21 5.19 21 7.99c0 3.7-3.28 6.94-8.25 11.86z']]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
    {
      id: "video-save",
      selector: "//div[@id='flexible-item-buttons']/yt-button-view-model[.//*[local-name() = 'svg']//*[local-name() = 'path' and @d='M18 4v15.06l-5.42-3.87-.58-.42-.58.42L6 19.06V4h12m1-1H5v18l7-5 7 5V3z']]",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
    {
      id: "video-clip",
      selector: "//div[@id='flexible-item-buttons']/yt-button-view-model[.//*[local-name() = 'svg']//*[local-name() = 'path' and @d='M8 7c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zm-1 9c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm3.79-7.77L21 18.44V20h-3.27l-5.76-5.76-1.27 1.27c.19.46.3.96.3 1.49 0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4c.42 0 .81.08 1.19.2l1.37-1.37-1.11-1.11C8 10.89 7.51 11 7 11c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4c0 .43-.09.84-.21 1.23zm-.71.71-.43-.44.19-.58c.11-.34.16-.64.16-.92 0-1.65-1.35-3-3-3S4 5.35 4 7s1.35 3 3 3c.36 0 .73-.07 1.09-.21l.61-.24.46.46 1.11 1.11.71.71-.71.71-1.37 1.37-.43.43-.58-.18C7.55 14.05 7.27 14 7 14c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3c0-.38-.07-.75-.22-1.12l-.25-.61.47-.47 1.27-1.27.71-.71.71.71L18.15 19H20v-.15l-9.92-9.91zM17.73 4H21v1.56l-5.52 5.52-2.41-2.41L17.73 4zm.42 1-3.67 3.67 1 1L20 5.15V5h-1.85z']]",
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
      id: "video-people-mentioned-description",
      selector: "//yt-video-attributes-section-view-model",
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
      id: "video-shorts-description",
      selector:
        "//ytd-structured-description-content-renderer//ytd-reel-shelf-renderer",
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
      id: "video-comments-avatars",
      selector: "//ytd-comments[@id='comments']//div[@id='author-thumbnail']/a",
      checked: false,
      property: DISPLAY,
      style: DISPLAY_NONE,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
    {
      id: "video-comments-replies",
      selector: "//ytd-comments[@id='comments']//div[@id='replies']",
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
      selector:
        "//div[@id='contents']/parent::ytd-item-section-renderer[contains(@class, 'watch-next')]//ytd-reel-shelf-renderer",
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
    {
      id: "video-thumbnail",
      selector: "//ytd-watch-next-secondary-results-renderer/div[@id='items']",
      checked: false,
      pageTypes: [PAGE_TYPES.VIDEO],
    },
    {
      id: "youtube-progress-bar",
      selector: "//div[contains(@class,'ytp-play-progress')]",
      checked: false,
      property: BACKGROUND,
      style: YT_RED,
      pageTypes: [PAGE_TYPES.VIDEO],
    }
  ],
};

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
        hide ? (viewsElement.disabled = true) : (viewsElement.disabled = false);
      }
    }

    if (this.id === "video-shorts-description") {
      const descriptionShorts = document.querySelector(
        "ytd-structured-description-content-renderer > div#items > ytd-reel-shelf-renderer"
      );
      if (descriptionShorts) {
        hide
          ? (descriptionShorts.disabled = true)
          : (descriptionShorts.disabled = false);
      }
    }

    if (this.id === "tabs") {
      const frostedBar = document.getElementById("frosted-glass");
      if (frostedBar) {
        frostedBar.style.height = hide
          ? frostedBar.style.setProperty("height", "56px")
          : frostedBar.style.setProperty("height", "112px");
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
      const thumbnailElement = document.getElementById(
        "video-thumbnail-tubemod"
      );

      if (hide && thumbnailElement === null) {
        const items = document.querySelector(
          "ytd-watch-next-secondary-results-renderer div#items"
        );

        let currentVideo = new URL(document.URL);
        let videoId = currentVideo.searchParams.get("v");
        let thumbnailSource = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

        if (items) {
          let ytImage = document.createElement("ytd-thumbnail");

          let anchorTag = document.createElement("a");
          anchorTag.setAttribute("target", "_blank");
          anchorTag.setAttribute("href", "https://img.youtube.com/vi/" + videoId + "/maxresdefault.jpg");

          let image = document.createElement("img");
          image.setAttribute("id", "video-thumbnail-tubemod");
          image.setAttribute("src", thumbnailSource);
          image.setAttribute(
            "class",
            "yt-core-image--fill-parent-width yt-core-image--loaded"
          );
          image.setAttribute(
            "style",
            "border-radius: 8px; margin-bottom: 8px;"
          );

          anchorTag.append(image);
          ytImage.append(anchorTag);
          items.prepend(ytImage);
        }
      } else if (!hide && thumbnailElement) {
        thumbnailElement.remove();
      }
    }

    if (this.id === "sidebar") {
      const videoContainer = document.querySelector("ytd-app[guide-persistent-and-visible] ytd-page-manager.ytd-app");

      if (videoContainer) {
        videoContainer.style.marginLeft = hide ? 0 : null;
      }
    }

    if (this.id === "studio-button") {
      const youtubeStudioButton = document.getElementById(
        "studio-button-tubemod"
      );

      if (hide && youtubeStudioButton === null) {
        const youtubeStudioButtonAnchor = document.createElement("a");
        youtubeStudioButtonAnchor.setAttribute("href", "https://studio.youtube.com/");
        youtubeStudioButtonAnchor.setAttribute("id", "studio-button-tubemod");
        youtubeStudioButtonAnchor.setAttribute("style", "margin-right: 8px;")

        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("fill", (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? "#fff" : "#000");
        svg.setAttribute("width", "24");
        svg.setAttribute("height", "24");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("style", "pointer-events: none; display: inherit; width: 100%; height: 100%;");

        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", "M10 9.35 15 12l-5 2.65ZM12 3a.73.73 0 00-.31.06L4.3 7.28a.79.79 0 00-.3.52v8.4a.79.79 0 00.3.52l7.39 4.22a.83.83 0 00.62 0l7.39-4.22a.79.79 0 00.3-.52V7.8a.79.79 0 00-.3-.52l-7.39-4.22A.73.73 0 0012 3m0-1a1.6 1.6 0 01.8.19l7.4 4.22A1.77 1.77 0 0121 7.8v8.4a1.77 1.77 0 01-.8 1.39l-7.4 4.22a1.78 1.78 0 01-1.6 0l-7.4-4.22A1.77 1.77 0 013 16.2V7.8a1.77 1.77 0 01.8-1.39l7.4-4.22A1.6 1.6 0 0112 2Zm0 4a.42.42 0 00-.17 0l-4.7 2.8a.59.59 0 00-.13.39v5.61a.65.65 0 00.13.37l4.7 2.8A.42.42 0 0012 18a.34.34 0 00.17 0l4.7-2.81a.56.56 0 00.13-.39V9.19a.62.62 0 00-.13-.37L12.17 6A.34.34 0 0012 6m0-1a1.44 1.44 0 01.69.17L17.39 8A1.46 1.46 0 0118 9.19v5.61a1.46 1.46 0 01-.61 1.2l-4.7 2.81A1.44 1.44 0 0112 19a1.4 1.4 0 01-.68-.17L6.62 16A1.47 1.47 0 016 14.8V9.19A1.47 1.47 0 016.62 8l4.7-2.8A1.4 1.4 0 0112 5Z");

        svg.appendChild(path);

        const div = document.createElement("div");
        div.setAttribute("style", "width: 24px; height: 24px; display: block; fill: currentcolor;");

        div.appendChild(svg);

        const span = document.createElement("span");
        span.setAttribute("class", "yt-icon-shape style-scope yt-icon yt-spec-icon-shape");
        span.appendChild(div);

        const button = document.createElement("button");
        button.setAttribute("style", "display: inline-block; vertical-align: middle; justify-items: center; color: inherit; outline: none; background: none; margin: 0; border: none; padding: 0; width: 100%; height: 100%; line-height: 0; cursor: pointer;");
        button.append(span);

        const ytIconButton = document.createElement("div");
        ytIconButton.setAttribute("style", "height: 40px; width: 40px;");
        ytIconButton.append(button);

        youtubeStudioButtonAnchor.appendChild(ytIconButton);

        const headerButtons = document.querySelector("ytd-masthead div#buttons");
        const headerButtonsChildren = Array.from(headerButtons.children);
        const position = 1;

        headerButtons.insertBefore(youtubeStudioButtonAnchor, headerButtonsChildren[position]);
      } else if (!hide && youtubeStudioButton) {
        youtubeStudioButton.remove();
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
