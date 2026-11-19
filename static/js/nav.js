// Mobile menu toggle. CSS: WIP TODO
document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");

  if (!button || !nav) return;

  button.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    button.setAttribute("aria-expanded", String(open));
  });
});
