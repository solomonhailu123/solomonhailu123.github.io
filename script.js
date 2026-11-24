// Update footer year automatically
const yearEl = document.getElementById("year");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// Portfolio Case Study Modals
document.querySelectorAll("[data-modal]").forEach((btn) => {
    btn.addEventListener("click", () => {
        const modal = document.getElementById(btn.getAttribute("data-modal"));
        if (modal) {
            modal.classList.add("open");
            modal.setAttribute("aria-hidden", "false");
        }
    });
});

document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
    backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop || e.target.classList.contains("modal-close")) {
            backdrop.classList.remove("open");
            backdrop.setAttribute("aria-hidden", "true");
        }
    });
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        document.querySelectorAll(".modal-backdrop.open").forEach((modal) => {
            modal.classList.remove("open");
            modal.setAttribute("aria-hidden", "true");
        });
    }
});

console.log("Solomon Hailu portfolio loaded successfully.");
