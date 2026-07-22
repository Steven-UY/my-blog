# Minimal blog

A tiny, fast blog in the spirit of [stephango.com](https://stephango.com):
you write plain markdown notes in **Obsidian**, and [Eleventy](https://www.11ty.dev)
turns them into a static website.

## The workflow

1. Open the **`content/`** folder as an Obsidian vault (Obsidian → *Open folder as vault*).
2. To write a post, add a new `.md` note in **`content/posts/`** with this at the top:

   ```markdown
   ---
   title: My post title
   date: 2026-07-21
   description: One line for search engines.
   ---

   Write the post here.
   ```

3. Save. Publish (see below). Done.

Images: drop them in `content/images/` and reference with `![](/images/photo.jpg)`.

## Run it locally

```bash
npm install      # first time only
npm run dev      # live preview at http://localhost:8080
```

`npm run build` writes the finished site to `_site/`.

## Make it yours

- **Site name, author, domain:** edit the `site` block in `eleventy.config.js`.
- **Colors, font, width:** edit the variables at the top of `content/css/style.css`.
- **About page:** `content/about.md`.

## Publish (pick one)

### Netlify — easiest, recommended
- Push this folder to a GitHub repo and "Import" it in Netlify, **or** run
  `npm run build` and drag the `_site` folder onto app.netlify.com.
- `netlify.toml` already tells it how to build. Serves at the site root, so no
  extra config. Every `git push` auto-deploys.

### GitHub Pages
- Push to GitHub, then repo → Settings → Pages → Build and deployment → **GitHub Actions**.
- The included `.github/workflows/deploy.yml` builds and deploys on every push to `main`.
- Note: if the site lives at `username.github.io/repo-name` (a *project* site), the
  `/css/...` links need a path prefix. Use a **custom domain** or a
  `username.github.io` *user* repo to serve at the root and avoid this. Netlify
  sidesteps it entirely.

## Keeping the Obsidian vault tidy

The theme files (`_includes/`, `css/`) live alongside your notes. If you
don't want to see them in Obsidian, add them under Settings → *Files & Links →
Excluded files*.
