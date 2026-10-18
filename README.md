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

The extension is built from the sources into `dist/` (requires Node.js). The version comes from `package.json`, and the build fails unless [the release notes](./documentation/ReleaseNotes.md) have an entry for it.

```
npm run build
```

This creates `dist/chrome`, `dist/firefox` and the two release zips (`dist/tubemod-<browser>-v<version>.zip`). Re-run it after every change.

### For Chromium based browsers:

1.  Go to `chrome://extensions`. The "chrome" part might be changed to the name of the browser.
2.  Enable the developer mode toggle.
3.  Click on "Load unpacked".
4.  Select the `dist/chrome` folder.
5.  Every time you make a change, rebuild and reload the extension. Removing and adding it again works better when dealing with js parts of the code.

### For Firefox based browsers:

1.  On Firefox set it up as a temporary add-on by going to `about:debugging` and on the "Load Temporary Addon" click add and select `dist/firefox/manifest.json`.
2.  Every time you make a change, rebuild and reload the temporary add-on.

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
