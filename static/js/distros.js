// distro filter. runs if [data-distros] exists.
document.addEventListener("DOMContentLoaded", () => {
  // find the distro filter block. see src/pages/distributions.body.html
  const block = document.querySelector("[data-distros]");
  if (!block) return;

  const buttons = block.querySelectorAll(".flt");
  // find all the distro cards. see src/pages/distributions.body.html
  const cards = block.querySelectorAll("[data-tags]");

  function apply(filter) {
    buttons.forEach((btn) => btn.classList.toggle("active", btn === filter));
    const wanted = filter.dataset.filter;

    cards.forEach((card) => {
      const tags = card.dataset.tags.split(" ");
      card.hidden = wanted !== "all" && !tags.includes(wanted);
    });
  }

  // add a listener for clicks for each button
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => apply(btn));
  });
});
