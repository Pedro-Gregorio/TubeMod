# TubeMod

## What is it?

TubeMod is a Browser Extension that allows users to hide specific YouTube elements, giving them more control over their viewing experience. Rather than permanently removing elements, TubeMod provides simple toggles to hide parts of YouTube’s UI, making it a lightweight and customizable solution. It is planned, for a future release, allowing users to completely remove elements, instead of simply hiding them.

## How to Use

After installing the extension:

1. Click on the TubeMod icon in your browser toolbar.
2. Toggle the YouTube elements you want to hide via the popup interface.
3. Changes will be applied instantly. Enjoy your customized YouTube experience!

## How to Install

### From the Chrome Web Store

1. Go to the [TubeMod Extension Page on Chrome Web Store](https://chromewebstore.google.com/detail/tubemod/mhhalndcidpfcemnlidabgieccknndei).
2. Click 'Add to _Your Browser_' and follow the prompts.

### From the FireFox Add-Ons

1. Go to the [TubeMod Extension Page on Firefox Add Ons](https://addons.mozilla.org/en-GB/firefox/addon/tubemod/).
2. Click 'Add to Firefox' and follow the prompts.

## How to set up Dev

1. Clone the repository

```
git clone https://github.com/Pedro-Gregorio/TubeMod.git
cd TubeMod
```

If the clone command doesn't work just download the repository as a ZIP file and extract it to your desired location.

Depending on your browser you will have to take different routes:

### For Chromium based browsers:

2.  Go to `chrome://extensions`. The "chrome" part might be changed to the name of the browser.
3.  Enable the developer mode toggle.
4.  Click on "Load unpacked".
5.  Select the folder where the repository is (it should contain the manifest.json)
6.  Every time you make a change either reload the extension or remove it an add it again. The latter works better when dealing with js parts of the code.

### For Firefox based browsers:

2.  Change the name of the `manifest.json` to something like `manifest_chrome.json` to avoid conflicts.
3.  Also rename `manifest_firefox.json` to `manifest.json`.
4.  On Firefox set it up as a temporary add-on by going to `about:debugging` and on the "Load Temporary Addon" click add and select any file of the repository.
5.  Every time you make a change either reload the temporary add-on or remove it and add it again. The latter works better when dealing with js parts of the code.
6.  Before pushing your changes to GitHub, make sure to revert the name changes in the manifests.

Before pushing to GitHub, please update [the release notes](./documentation/ReleaseNotes.md) with the feature you're adding.

Some things to consider:

- Keep your commit messages clean by starting with `Add`, `Change`, `Fix` or `Remove`, depending on what you're doing.
- If possible, add evidences, of what you're working on, to the PR message.

## Features and Future Plans

Check all the available and planned features [here](./documentation/Features.md).

## How can I support the project?

The extension will always remain free to use. While contributions are not required, any support is greatly appreciated! If you'd like to contribute, you can:

- Buy me a coffee on [Ko-Fi](https://ko-fi.com/pedrogregorio).
- Share the extension with others or leave a review.
- Submit feedback, report bugs, or suggest new features via the Issues section on GitHub or via [email](mailto:pedro-gregorio@outlook.pt).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
