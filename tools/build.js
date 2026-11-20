const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const layout = fs.readFileSync(path.join(root, "src/layout.html"), "utf8");
const header = fs.readFileSync(path.join(root, "src/partials/header.html"), "utf8");
const footer = fs.readFileSync(path.join(root, "src/partials/footer.html"), "utf8").trim();

const pages = [
  { name: "index", title: "Home", description: "Linux, your way", nav: "home" },
  { name: "about", title: "About", description: "The story behind Linux.", nav: "about" },
  { name: "why-linux", title: "Why Linux", description: "Why use Linux", nav: "why" },
  { name: "how-it-works", title: "How it works", description: "How Linux works", nav: "how" },
  {
    name: "distributions",
    title: "Distributions",
    description: "Find a suitable Linux distro",
    nav: "distros",
  },
  {
    name: "get-started",
    title: "Get started",
    description: "Get started with Linux",
    nav: "start",
  },
];

function setActiveNav(nav) {
  const navKeys = ["home", "about", "why", "how", "distros", "start"];
  let pageHeader = header;

  for (const key of navKeys) {
    pageHeader = pageHeader.replace(
      ` {{active-${key}}}`,
      key === nav ? ' class="active"' : "",
    );
  }

  return pageHeader.trim();
}

for (const page of pages) {
  const body = fs
    .readFileSync(path.join(root, "src/pages", `${page.name}.body.html`), "utf8")
    .trim();

  const content = body
    .split("\n")
    .map((line) => (line.trim() === "" ? "" : "      " + line))
    .join("\n");

  const scripts =
    page.name === "distributions"
      ? '    <script src="static/js/distros.js" defer></script>'
      : "";

  const html = layout
    .replace("{{title}}", page.title)
    .replace("{{description}}", page.description)
    .replace("{{header}}", setActiveNav(page.nav))
    .replace("{{content}}", content)
    .replace("{{footer}}", footer)
    .replace("{{scripts}}", scripts);

  const output = `${page.name}.html`;
  fs.writeFileSync(path.join(root, output), html + "\n");
  console.log("built", output);
}
