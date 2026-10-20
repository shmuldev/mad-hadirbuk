# מד הדרבוק

A minimal, dark, Hebrew RTL quiz about coding with AI. Ten short questions, one deliberately fixed verdict.

## Preview locally

```sh
python3 -m http.server 4173 --directory dist
```

Open http://localhost:4173.

## Edit

- `dist/app.js` — questions, answers, navigation, and the fixed ending
- `dist/style.css` — dark theme and responsive layout
- `dist/index.html` — page shell, metadata, and the about dialog

No dependencies or build step are required. Progress is saved locally in the browser.

## Publish to GitHub Pages

GitHub Pages serves the root of the `gh-pages` branch. Publish the contents of `dist` after committing changes:

```sh
node --check dist/app.js
git push --no-verify github main
git subtree split --prefix=dist -b pages-release
git push --no-verify github pages-release:gh-pages
git branch -D pages-release
```

Live site: https://shmuldev.github.io/mad-hadirbuk/
