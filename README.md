# SPM Physics & Chemistry Definition Practice
Infinity Tuition Centre · F4 / F5 · BI / BM

Static web page (no build step). Flow: password → language → form → subject → chapter → Study / Quiz.

## Files
- `index.html` – page shell
- `style.css` – styles
- `data.js` – all definitions (edit here to add or fix a definition)
- `app.js` – screens, quiz logic, password check
- `assets/` – background image and logo

## Quiz marking
Typed answer. Pass = at least 80% of the model answer's key words found AND all keywords present.
BM prefixes/suffixes (imbuhan) and small spelling slips are tolerated.
Keywords are picked automatically (long words and numbers); add a 3rd item `[term, definition, ["kw1","kw2"]]` in `data.js` to set them by hand.

## Publish with GitHub Pages
1. Create a repository and upload all files (keep the `assets` folder).
2. Settings → Pages → Deploy from a branch → `main` / `(root)` → Save.
3. The site appears at `https://<username>.github.io/<repo>/`.

Note: the password check runs in the browser, so it only deters casual access; the page source is public on a public repo.
