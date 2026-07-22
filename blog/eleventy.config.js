export default function (eleventyConfig) {
  // --- Static assets ---------------------------------------------------------
  // Your CSS, plus any images you drop in content/images (great for Obsidian
  // attachments) get copied straight through to the built site.
  eleventyConfig.addPassthroughCopy({ "content/css": "css" });
  eleventyConfig.addPassthroughCopy({ "content/images": "images" });

  // --- Site-wide metadata ----------------------------------------------------
  // Edit these once and they flow into every page + the RSS feed.
  // Keeping this here (instead of a _data file) keeps your Obsidian vault tidy.
  eleventyConfig.addGlobalData("site", {
    title: "thoughts are worth expressing",
    author: "Steven Uy",
    description: "A minimal blog.",
    // Used for absolute links in the RSS feed. Set to your real domain.
    url: "https://example.com",
  });

  // --- Date formatting -------------------------------------------------------
  eleventyConfig.addFilter("readableDate", (dateObj) =>
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }).format(dateObj)
  );

  // ISO-8601 (e.g. 2026-07-21) for <time datetime> and the Atom feed.
  eleventyConfig.addFilter("htmlDate", (dateObj) =>
    new Date(dateObj).toISOString()
  );

  // Turn a 1–5 rating into stars, e.g. 4 -> ★★★★☆ (★ filled, ☆ empty).
  // Used by posts that set an optional `rating:` in their frontmatter.
  eleventyConfig.addFilter("stars", (n) => {
    const r = Math.max(0, Math.min(5, Math.round(Number(n) || 0)));
    return "★".repeat(r) + "☆".repeat(5 - r);
  });

  // --- Obsidian image embeds -------------------------------------------------
  // Make Obsidian's own ![[photo.png]] embed syntax render on the site.
  // Attachments live in content/images/ (also set as Obsidian's attachment
  // folder) and are served at /images/. This rewrites embeds to standard
  // markdown before the markdown is parsed. Only image files are touched, so
  // ordinary [[note links]] are left alone.
  eleventyConfig.addPreprocessor("obsidian-embeds", "md", (data, content) =>
    content.replace(
      /!\[\[([^\]|]+?\.(?:png|jpe?g|gif|svg|webp|avif))(?:\|[^\]]*)?\]\]/gi,
      (match, file) => `![](/images/${encodeURI(file.trim().split("/").pop())})`
    )
  );

  // --- Topics ----------------------------------------------------------------
  // Group posts by their single `topic:` field. Powers the per-topic pages
  // (content/topics.njk) and the topic index on the home page. Add a topic just
  // by using it in a post — no config change needed.
  eleventyConfig.addCollection("topics", (collectionApi) => {
    const byTopic = new Map();
    for (const post of collectionApi.getFilteredByTag("posts")) {
      const topic = post.data.topic;
      if (!topic) continue;
      if (!byTopic.has(topic)) byTopic.set(topic, []);
      byTopic.get(topic).push(post);
    }
    return [...byTopic.entries()]
      .map(([name, posts]) => ({ name, posts }))
      .sort((a, b) => a.name.localeCompare(b.name));
  });

  return {
    dir: {
      input: "content",
      includes: "_includes",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
