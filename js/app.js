const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];

document.addEventListener("DOMContentLoaded", () => {
  const menu = $(".menu-btn");
  const links = $(".nav-links");
  if (menu)
    menu.addEventListener("click", () => links.classList.toggle("open"));

  $$(".js-demo").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      showToast(btn.dataset.message || "Demo action completed!");
    }),
  );

  const forms = $$("form[data-demo-form]");
  forms.forEach((form) =>
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = form.dataset.message || "Submitted successfully!";
      showToast(msg);
      form.reset();
    }),
  );

  const search = $("#siteSearch");
  if (search) {
    search.addEventListener("input", () => {
      const q = search.value.toLowerCase();
      $$(".searchable").forEach((card) => {
        card.style.display = card.innerText.toLowerCase().includes(q)
          ? ""
          : "none";
      });
    });
  }

  const packageSelect = $("#packageSelect");
  const people = $("#people");
  const total = $("#totalPrice");
  if (packageSelect && people && total) {
    const update = () => {
      const price = Number(
        packageSelect.selectedOptions[0]?.dataset.price || 0,
      );
      total.textContent =
        "$" + (price * Number(people.value || 1)).toLocaleString();
    };
    packageSelect.addEventListener("change", update);
    people.addEventListener("input", update);
    update();
  }
});

function showToast(message) {
  const toast =
    $("#toast") ||
    (() => {
      const t = document.createElement("div");
      t.id = "toast";
      t.className = "toast";
      document.body.appendChild(t);
      return t;
    })();
  toast.textContent = message;
  toast.style.display = "block";
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => (toast.style.display = "none"), 2600);
}
