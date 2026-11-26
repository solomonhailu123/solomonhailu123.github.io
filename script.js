// Update footer year automatically
const yearEl = document.getElementById("year");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// Mobile navigation toggle
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");
if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });
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

// Copy Business Email button(s)
document.querySelectorAll("[data-copy-email], #copy-email-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        navigator.clipboard.writeText("Solomon@hailu.online").then(() => {
            const original = btn.textContent;
            btn.textContent = "Copied ✓";
            setTimeout(() => { btn.textContent = original; }, 2000);
        });
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

// Contact Page: Query Parameter Pre-selection & Transparent Mailto Inquiry Builder
const quoteForm = document.getElementById("quote-form");
if (quoteForm) {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get("service");
    const packageParam = params.get("package");

    const serviceSelect = document.getElementById("service");
    const packageSelect = document.getElementById("package");

    if (serviceParam && serviceSelect) {
        const hasOption = Array.from(serviceSelect.options).some((opt) => opt.value === serviceParam);
        if (hasOption) serviceSelect.value = serviceParam;
    }

    if (packageParam && packageSelect) {
        const normalizedPkg = packageParam.toLowerCase();
        const hasPkg = Array.from(packageSelect.options).some((opt) => opt.value === normalizedPkg);
        if (hasPkg) packageSelect.value = normalizedPkg;
    }

    const buildInquiryPayload = () => {
        const name = document.getElementById("client-name").value.trim();
        const email = document.getElementById("client-email").value.trim();
        const serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;
        const packageText = packageSelect.options[packageSelect.selectedIndex].text;
        const budget = document.getElementById("budget").value.trim() || "Not specified";
        const deadline = document.getElementById("deadline").value.trim() || "Flexible / Not specified";
        const details = document.getElementById("project-details").value.trim();

        const subject = `Quote Request: ${serviceText} (${packageText}) - ${name}`;
        const body = [
            `Hello Solomon,`,
            ``,
            `I would like to request a quotation for the following service:`,
            ``,
            `Client Name: ${name}`,
            `Client Email: ${email}`,
            `Service Requested: ${serviceText}`,
            `Package Preference: ${packageText}`,
            `Estimated Budget: ${budget}`,
            `Preferred Deadline: ${deadline}`,
            ``,
            `Project Description & Requirements:`,
            `${details}`,
            ``,
            `Sent via https://hailu.online/contact.html`
        ].join("\n");

        return { name, email, subject, body };
    };

    const statusBox = document.getElementById("form-status");

    quoteForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const { name, email, subject, body } = buildInquiryPayload();

        if (!name || !email || !document.getElementById("project-details").value.trim()) {
            statusBox.className = "form-status error";
            statusBox.innerHTML = "Please complete your <strong>Name</strong>, <strong>Email Address</strong>, and <strong>Project Description</strong> before preparing your email.";
            return;
        }

        const escapeHtml = (str) => String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");

        const renderFallbackButtons = () => {
            const mailtoUrl = `mailto:Solomon@hailu.online?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=Solomon@hailu.online&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            return `
                <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:12px;">
                    <a href="${mailtoUrl}" class="btn btn-outline btn-sm">Open Default Email App</a>
                    <a href="${gmailUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">Open in Gmail (Web)</a>
                    <button type="button" id="copy-inquiry-btn" class="btn btn-outline btn-sm">Copy Inquiry Text</button>
                </div>
            `;
        };

        const bindCopyFallback = () => {
            const copyInquiryBtn = document.getElementById("copy-inquiry-btn");
            if (copyInquiryBtn && navigator.clipboard) {
                copyInquiryBtn.addEventListener("click", () => {
                    navigator.clipboard.writeText(`To: Solomon@hailu.online\nSubject: ${subject}\n\n${body}`).then(() => {
                        copyInquiryBtn.textContent = "Inquiry Copied ✓";
                    });
                });
            }
        };

        const keyInput = quoteForm.querySelector('input[name="access_key"]');
        const accessKey = keyInput ? keyInput.value.trim() : "";
        const submitBtn = quoteForm.querySelector('button[type="submit"]');

        if (!accessKey || accessKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
            statusBox.className = "form-status error";
            statusBox.innerHTML = `
                <strong>Access Key Not Set Yet:</strong> Add your Web3Forms Access Key in <code>contact.html</code> for automatic sending, or send directly via one of the backup options below:
                ${renderFallbackButtons()}`;
            bindCopyFallback();
            return;
        }

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = "Sending Inquiry...";
        }

        statusBox.className = "form-status visible";
        statusBox.innerHTML = "Sending your inquiry directly to <strong>Solomon@hailu.online</strong>...";

        try {
            const formData = new FormData(quoteForm);
            formData.set("name", name);
            formData.set("email", email);
            formData.set("replyto", email);
            formData.set("subject", subject);
            formData.set("message", body);

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Accept": "application/json" },
                body: formData
            });

            const result = await response.json();

            if (response.ok && result.success) {
                statusBox.className = "form-status success";
                statusBox.innerHTML = `
                    <strong>Inquiry Sent!</strong> Your message has been delivered to <strong>Solomon@hailu.online</strong>. Thank you, <strong>${escapeHtml(name)}</strong>&mdash;I will review your details and follow up shortly.<br>
                    <span style="display:block; margin-top:8px; font-size:13px;">Backup options (if you also want a local copy or wish to follow up directly):</span>
                    ${renderFallbackButtons()}`;
                bindCopyFallback();
                quoteForm.reset();
            } else {
                throw new Error(result.message || "Submission failed");
            }
        } catch (err) {
            statusBox.className = "form-status error";
            statusBox.innerHTML = `
                <strong>Could Not Send Automatically:</strong> Please send your inquiry directly to <strong>Solomon@hailu.online</strong> using one of the backup options below:
                ${renderFallbackButtons()}`;
            bindCopyFallback();
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = "Send Inquiry";
            }
        }
    });
}
console.log("Solomon Hailu 5-page portfolio scripts loaded successfully.");
