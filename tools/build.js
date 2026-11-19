// Tiny static site builder. No dependencies, just Node's standard library.
//
// Edit files in src/, then run:  npm run build
// That reads src/pages/*.body.html and writes the finished *.html files.

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const layout = fs.readFileSync(path.join(root, "src/layout.html"), "utf8");
const header = fs.readFileSync(path.join(root, "src/partials/header.html"), "utf8");
const footer = fs.readFileSync(path.join(root, "src/partials/footer.html"), "utf8");

const pages = [
  {
    body: "index.body.html",
    out: "index.html",
    title: "Home",
    description: "Linux, your way",
    nav: "home",
    scripts: ["static/js/distros.js"],
  },
  {
    body: "about.body.html",
    out: "about.html",
    title: "About",
    description: "The story behind Linux.",
    nav: "about",
    scripts: [],
  },
  {
    body: "why-linux.body.html",
    out: "why-linux.html",
    title: "Why Linux",
    description: "Why use Linux",
    nav: "why",
    scripts: [],
  },
  {
    body: "how-it-works.body.html",
    out: "how-it-works.html",
    title: "How it works",
    description: "How Linux works",
    nav: "how",
    scripts: [],
  },
  {
    body: "distributions.body.html",
    out: "distributions.html",
    title: "Distributions",
    description: "Find a suitable Linux distro",
    nav: "distros",
    scripts: ["static/js/distros.js"],
  },
  {
    body: "get-started.body.html",
    out: "get-started.html",
    title: "Get started",
    description: "Get started with Linux",
    nav: "start",
    scripts: [],
  }
];

function activeNav(headerHtml, nav) {
  // Turn ` {{active-home}}` into ` class="active"` on the current page,
  // and remove it everywhere else (including the leading space).
  const keys = ["home", "about", "why", "how", "distros", "start", "resources"];
  let out = headerHtml;
  for (const key of keys) {
    out = out.replace(` {{active-${key}}}`, key === nav ? ' class="active"' : "");
  }
  return out;
}

for (const page of pages) {
  const body = fs.readFileSync(path.join(root, "src/pages", page.body), "utf8").trim();

  // Indent body content two extra levels so the output reads naturally.
  const content = body
    .split("\n")
    .map((line) => (line.trim() === "" ? "" : "      " + line))
    .join("\n");

  const scripts = page.scripts
    .map((src) => `    <script src="${src}" defer></script>`)
    .join("\n");

  const html = layout
    .replace("{{title}}", page.title)
    .replace("{{description}}", page.description)
    .replace("{{header}}", activeNav(header, page.nav).trim())
    .replace("{{content}}", content)
    .replace("{{footer}}", footer.trim())
    .replace("{{scripts}}", scripts);

  fs.writeFileSync(path.join(root, page.out), html + "\n");
  console.log("built", page.out);
}
