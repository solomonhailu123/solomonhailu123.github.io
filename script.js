// Update footer year automatically
const yearEl = document.getElementById("year");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// Portfolio & Contact Modals
document.querySelectorAll("[data-modal]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const modalId = btn.getAttribute("data-modal");
        const modal = document.getElementById(modalId);
        if (modal) {
            e.preventDefault();
            const subject = btn.getAttribute("data-subject");
            if (subject && modalId === "modal-contact") {
                const encoded = encodeURIComponent(subject);
                const gmailLink = document.getElementById("gmail-compose-link");
                const mailtoLink = document.getElementById("default-mailto-link");
                if (gmailLink) gmailLink.href = `https://mail.google.com/mail/?view=cm&fs=1&to=Solomon@hailu.online&su=${encoded}`;
                if (mailtoLink) mailtoLink.href = `mailto:Solomon@hailu.online?subject=${encoded}`;
            }
            modal.classList.add("open");
            modal.setAttribute("aria-hidden", "false");
        }
    });
});

// Copy Business Email button
const copyBtn = document.getElementById("copy-email-btn");
if (copyBtn) {
    copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText("Solomon@hailu.online").then(() => {
            copyBtn.textContent = "Copied ✓";
            setTimeout(() => { copyBtn.textContent = "Copy Email"; }, 2000);
        });
    });
}

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
