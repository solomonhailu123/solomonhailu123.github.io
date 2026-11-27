// Mobile Navigation Toggle & Clean Dismissal
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

if (navToggle && navLinks) {
    const closeNavDrawer = () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
    };

    navToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeNavDrawer);
    });

    document.addEventListener("click", (e) => {
        if (!navLinks.classList.contains("open")) return;
        if (!e.target.closest(".navbar")) {
            closeNavDrawer();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navLinks.classList.contains("open")) {
            closeNavDrawer();
        }
    });
}

// Portfolio Case-Study Modal Controls (Single Active Modal + Guaranteed Close)
const closeAllModals = () => {
    document.querySelectorAll(".modal, .modal-backdrop").forEach((m) => {
        m.classList.remove("open");
        m.setAttribute("aria-hidden", "true");
    });
    document.body.style.overflow = "";
};

document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-modal]");
    if (trigger) {
        e.preventDefault();
        const modalId = trigger.getAttribute("data-modal");
        const targetModal = document.getElementById(modalId);
        closeAllModals();
        if (targetModal) {
            targetModal.classList.add("open");
            targetModal.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
        }
        return;
    }

    const closeBtn = e.target.closest("[data-close], .modal-close");
    if (closeBtn) {
        e.preventDefault();
        closeAllModals();
        return;
    }

    const openBackdrop = document.querySelector(".modal-backdrop.open, .modal.open");
    if (openBackdrop && e.target === openBackdrop) {
        closeAllModals();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeAllModals();
    }
});
// Bilingual Support (English / Amharic)
const LANG_STORAGE_KEY = "hailu_site_lang";
let currentLang = localStorage.getItem(LANG_STORAGE_KEY) === "am" ? "am" : "en";

const AM_TRANSLATIONS = {
    nav: {
        "index.html": "መነሻ",
        "services.html": "አገልግሎቶች",
        "pricing.html": "ዋጋዎች",
        "portfolio.html": "የተሰሩ ስራዎች",
        "contact.html": "ያግኙን",
        "quoteBtn": "ዋጋ ይጠይቁ"
    },
    servicesMap: {
        "Data Management": {
            title: "የመረጃ አያያዝ እና ማደራጀት (Data Management)",
            desc: "የExcel እና CSV መረጃዎችን ማጽዳት፣ ተደጋጋሚ መረጃዎችን ማስወገድ፣ ወጥ ቅርጽ ማስያዝ እና ትክክለኛነታቸውን ማረጋገጥ።"
        },
        "Data Analysis & Reporting": {
            title: "የመረጃ ትንተና እና ሪፖርት (Data Analysis & Reporting)",
            desc: "የንግድ እና የፕሮጀክት መረጃዎችን በመተንተን ግልጽ ሰንጠረዦችን፣ ቻርቶችን እና ለውሳኔ የሚረዱ ሪፖርቶችን ማዘጋጀት።"
        },
        "Field Data Operations": {
            title: "የመስክ መረጃ አሰባሰብ (Field Data Operations)",
            desc: "በKoboToolbox እና ODK ዲጂታል ቅጾችን መገንባት፣ የመስክ መረጃ መሰብሰብ እና የጥራት ቁጥጥር ማድረግ።"
        },
        "Virtual Assistance & Online Research": {
            title: "ቨርቹዋል ረዳት እና የመረጃ ጥናት (Virtual Assistance)",
            desc: "የገበያ እና የድርጅት መረጃ ማፈላለግ፣ ሰነዶችን ማደራጀት፣ ኢሜይል እና የቀን መቁጠሪያ አስተዳደር።"
        },
        "Website Development & Maintenance": {
            title: "የድረ-ገጽ ግንባታ እና ጥገና (Website Development)",
            desc: "ለንግድ ድርጅቶች እና ለግል ስራዎች ዘመናዊ፣ በሞባይል እና በኮምፒውተር በጥራት የሚሰሩ ድረ-ገጾችን መገንባት።"
        },
        "AI Automation & Chatbot Development": {
            title: "AI አውቶሜሽን እና ቻትቦት (AI & Telegram Bots)",
            desc: "የደንበኛ ጥያቄዎችን የሚመልሱ የቴሌግራም ቦቶችን፣ AI የስራ አጋዥ ሲስተሞችን እና ፈጣን የስራ ሂደቶችን መገንባት።"
        },
        "Social Media Management": {
            title: "የማህበራዊ ሚዲያ አስተዳደር (Social Media Management)",
            desc: "ለFacebook፣ Instagram፣ TikTok እና Telegram ይዘቶችን ማዘጋጀት፣ ፕሮፋይል ማደራጀት እና ገጾችን ማሳደግ።"
        },
        "Graphic Design": {
            title: "ግራፊክ ዲዛይን (Graphic Design)",
            desc: "ሎጎ፣ ቢዝነስ ካርድ፣ ባነር፣ ፖስተር እና ለማህበራዊ ሚዲያ የሚሆኑ ማራኪ የንግድ ማስታወቂያ ዲዛይኖች።"
        },
        "Transcription & Subtitles": {
            title: "የድምጽ/ቪዲዮ ጽሑፍ እና ሰብታይትል (Transcription & Subtitles)",
            desc: "የድምጽ እና የቪዲዮ ፋይሎችን በአማርኛ፣ በትግርኛ እና በእንግሊዝኛ በትክክል ወደ ጽሑፍ መቀየር እና ሰብታይትል ማዘጋጀት።"
        }
    },
    contact: {
        heroTag: "ያግኙን • ፈጣን የዋጋ መጠየቂያ",
        heroTitle: "ስለ ፕሮጀክትዎ ይንገሩን — ግልጽ የዋጋ ግምት ይቀበሉ",
        heroSub: "የሚፈልጉትን አገልግሎት ከታች ይምረጡ ወይም በአማርኛም ሆነ በእንግሊዝኛ ፍላጎትዎን በአጭሩ ይጻፉ። በፍጥነት ምላሽ እንሰጣለን።",
        formHeading: "የፕሮጀክት መጠየቂያ ቅጽ (Request a Quote)",
        formSub: "ኮከብ (*) ያለባቸውን 3 መሰረታዊ መረጃዎች (ስም፣ ኢሜይል እና የፕሮጀክት ዝርዝር) መሙላት ግዴታ ነው።",
        noticeHtml: "ይህን ቅጽ ሲልኩ መልዕክትዎ በቀጥታ ወደ <strong>Solomon@hailu.online</strong> ይደርሳል። በተጨማሪም በኢሜይል አፕ፣ በGmail ወይም ጽሑፉን ኮፒ በማድረግ መላክ የሚችሉባቸው አማራጮች ከታች ይቀርባሉ።",
        labels: {
            "client-name": "ሙሉ ስም ወይም የድርጅት ስም *",
            "client-email": "የኢሜይል አድራሻ *",
            "service": "የሚፈልጉት አገልግሎት *",
            "package": "የፓኬጅ ምርጫ *",
            "budget": "የተገመተ በጀት (አማራጭ)",
            "deadline": "ስራው የሚፈለግበት ጊዜ (አማራጭ)",
            "project-details": "የፕሮጀክት ዝርዝር እና ፍላጎት *"
        },
        placeholders: {
            "client-name": "ሙሉ ስምዎን ወይም የድርጅትዎን ስም ያስገቡ",
            "client-email": "name@example.com",
            "budget": "ለምሳሌ፡ 15,000 ብር ወይም $100 USD",
            "deadline": "ለምሳሌ፡ በ5 የስራ ቀናት ውስጥ",
            "project-details": "ስለሚፈልጉት ስራ፣ ፋይሎች ወይም ዓላማ በአማርኛ ወይም በእንግሊዝኛ በአጭሩ ይግለጹ..."
        },
        submitBtn: "ጥያቄውን ላክ (Send Inquiry)",
        pricingBtn: "የዋጋ ፓኬጆችን ይመልከቱ"
    }
};

const applyLanguage = (lang) => {
    currentLang = lang === "am" ? "am" : "en";
    localStorage.setItem(LANG_STORAGE_KEY, currentLang);
    document.documentElement.lang = currentLang;

    // Update toggle button state
    document.querySelectorAll(".lang-toggle-btn").forEach((btn) => {
        btn.innerHTML = currentLang === "am"
            ? '<span>EN</span> | <span class="active-lang">አማ</span>'
            : '<span class="active-lang">EN</span> | <span>አማ</span>';
    });

    // Save original English text once and swap
    const swapText = (el, amText) => {
        if (!el) return;
        if (!el.dataset.enText) el.dataset.enText = el.textContent;
        el.textContent = currentLang === "am" ? amText : el.dataset.enText;
    };

    const swapHtml = (el, amHtml) => {
        if (!el) return;
        if (!el.dataset.enHtml) el.dataset.enHtml = el.innerHTML;
        el.innerHTML = currentLang === "am" ? amHtml : el.dataset.enHtml;
    };

    // Translate Navigation links
    document.querySelectorAll("#nav-links a").forEach((a) => {
        const href = a.getAttribute("href");
        if (a.classList.contains("nav-contact")) {
            swapText(a, AM_TRANSLATIONS.nav.quoteBtn);
        } else if (AM_TRANSLATIONS.nav[href]) {
            swapText(a, AM_TRANSLATIONS.nav[href]);
        }
    });

    // Translate Service Cards (Homepage & Services Page)
    document.querySelectorAll(".service-card, .service-detail-card").forEach((card) => {
        const h3 = card.querySelector("h3");
        const p = card.querySelector("p");
        if (!h3) return;
        if (!h3.dataset.enText) h3.dataset.enText = h3.textContent.trim();
        const entry = AM_TRANSLATIONS.servicesMap[h3.dataset.enText];
        if (entry) {
            swapText(h3, entry.title);
            if (p) swapText(p, entry.desc);
        }
    });

    // Translate Contact Page Form & Headings
    const quoteFormEl = document.getElementById("quote-form");
    if (quoteFormEl) {
        swapText(document.querySelector(".page-hero .section-tag"), AM_TRANSLATIONS.contact.heroTag);
        swapText(document.querySelector(".page-hero h1"), AM_TRANSLATIONS.contact.heroTitle);
        swapText(document.querySelector(".page-hero .page-hero-sub"), AM_TRANSLATIONS.contact.heroSub);
        swapText(document.querySelector(".quote-form-card h2"), AM_TRANSLATIONS.contact.formHeading);
        swapText(document.querySelector(".quote-form-card > p"), AM_TRANSLATIONS.contact.formSub);
        swapHtml(document.querySelector(".transparency-notice"), AM_TRANSLATIONS.contact.noticeHtml);

        Object.entries(AM_TRANSLATIONS.contact.labels).forEach(([fieldId, amLabel]) => {
            const label = document.querySelector(`label[for="${fieldId}"]`);
            swapText(label, amLabel);
        });

        Object.entries(AM_TRANSLATIONS.contact.placeholders).forEach(([fieldId, amPlaceholder]) => {
            const input = document.getElementById(fieldId);
            if (!input) return;
            if (!input.dataset.enPlaceholder) input.dataset.enPlaceholder = input.getAttribute("placeholder") || "";
            input.setAttribute("placeholder", currentLang === "am" ? amPlaceholder : input.dataset.enPlaceholder);
        });

        const submitButton = quoteFormEl.querySelector('button[type="submit"]');
        swapText(submitButton, AM_TRANSLATIONS.contact.submitBtn);

        const secondaryPricingBtn = quoteFormEl.querySelector('.form-actions a.btn-outline');
        swapText(secondaryPricingBtn, AM_TRANSLATIONS.contact.pricingBtn);
    }

    // Translate Home, Services, Pricing, and Portfolio page headers, tags & key cards
    const pageHero = document.querySelector(".page-hero");
    if (pageHero && !quoteFormEl) {
        const heroTag = pageHero.querySelector(".section-tag");
        const heroH1 = pageHero.querySelector("h1");
        const heroSub = pageHero.querySelector(".page-hero-sub");
        const path = window.location.pathname.toLowerCase();

        if (path.endsWith("services.html")) {
            swapText(heroTag, "አገልግሎቶች • 9 ዋና የስራ ዘርፎች");
            swapText(heroH1, "ለንግድዎ እና ለድርጅትዎ የሚሆኑ ሙያዊ አገልግሎቶች");
            swapText(heroSub, "የመረጃ አያያዝ፣ የድረ-ገጽ ግንባታ፣ AI ቻትቦት፣ ግራፊክ ዲዛይን እና ትርጉም/ሰብታይትል በግልጽ ፓኬጆች።");
        } else if (path.endsWith("pricing.html")) {
            swapText(heroTag, "የዋጋ ፓኬጆች • 27 ዝርዝር ፓኬጆች");
            swapText(heroH1, "ግልጽ የዋጋ ዝርዝር (USD እና ብር / ETB)");
            swapText(heroSub, "ለፍላጎትዎ የሚስማማውን ፓኬጅ ይምረጡ እና በቀጥታ የዋጋ ግምት ይጠይቁ።");
        } else if (path.endsWith("portfolio.html")) {
            swapText(heroTag, "የተሰሩ ስራዎች • ናሙናዎች እና ፕሮጀክቶች");
            swapText(heroH1, "የተሰሩ ፕሮጀክቶች እና የስራ ውጤቶች");
            swapText(heroSub, "ለደንበኞች የተሰሩ ስራዎች እና የግል ማሳያ ፕሮጀክት (Solomon Data Assistant - Personal Demo)።");
        }
    }

    // Translate homepage hero primary CTA & pricing tier badges/buttons where present
    const homeHero = document.querySelector(".hero");
    if (homeHero) {
        const primaryHeroBtn = homeHero.querySelector(".hero-buttons .btn-primary");
        const secondaryHeroBtn = homeHero.querySelector(".hero-buttons .btn-outline");
        swapText(primaryHeroBtn, "ዋጋ ይጠይቁ (Request a Quote)");
        swapText(secondaryHeroBtn, "አገልግሎቶችን ይመልከቱ");
    }

    document.querySelectorAll(".pricing-card .btn").forEach((btn) => {
        swapText(btn, "ይህን ፓኬጅ ይምረጡ &rarr;".replace("&rarr;", "→"));
    });

    document.querySelectorAll(".project-info .btn").forEach((btn) => {
        swapText(btn, "ዝርዝር ይመልከቱ");
    });

    // Switch downloadable pricing catalog PDF between English and Amharic editions
    document.querySelectorAll('a[href*="Solomon_Hailu_Service_Pricing_Catalog"]').forEach((pdfLink) => {
        const targetPdf = currentLang === "am"
            ? (window.AM_PDF_CATALOG_PATH || "assets/Solomon_Hailu_Service_Pricing_Catalog_AM.pdf")
            : (window.EN_PDF_CATALOG_PATH || "assets/Solomon_Hailu_Service_Pricing_Catalog.pdf");
        pdfLink.setAttribute("href", targetPdf);
        if (pdfLink.hasAttribute("download")) {
            pdfLink.setAttribute("download", currentLang === "am"
                ? "Solomon_Hailu_Service_Pricing_Catalog_AM.pdf"
                : "Solomon_Hailu_Service_Pricing_Catalog.pdf");
        }
        if (!pdfLink.dataset.enPdfText) pdfLink.dataset.enPdfText = pdfLink.textContent.trim();
        pdfLink.textContent = currentLang === "am"
            ? "የዋጋ ዝርዝር PDF ያውርዱ (አማርኛ)"
            : pdfLink.dataset.enPdfText;
    });

    // Apply full dictionary to text elements across all pages
    if (window.AM_FULL_DICTIONARY) {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
            const parentTag = node.parentElement ? node.parentElement.tagName : "";
            if (["SCRIPT", "STYLE", "TEXTAREA"].includes(parentTag)) continue;
            const norm = node.nodeValue.replace(/\s+/g, " ").trim();
            if (!norm) continue;
            if (!node._enRaw) node._enRaw = node.nodeValue;
            const amVal = window.AM_FULL_DICTIONARY[norm];
            if (currentLang === "am" && amVal && !amVal.startsWith("[አማ] ")) {
                node.nodeValue = node._enRaw.replace(norm, amVal);
            } else if (currentLang === "en" && node._enRaw) {
                node.nodeValue = node._enRaw;
            }
        }
    }
};

// Inject EN | አማ switcher into header navigation on all pages
if (navLinks && !document.getElementById("lang-toggle-btn")) {
    const li = document.createElement("li");
    li.className = "lang-switch-item";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = "lang-toggle-btn";
    btn.className = "lang-toggle-btn";
    btn.setAttribute("aria-label", "Switch language between English and Amharic");
    btn.addEventListener("click", () => {
        applyLanguage(currentLang === "en" ? "am" : "en");
    });
    li.appendChild(btn);
    navLinks.appendChild(li);
}
applyLanguage(currentLang);

// Contact Page: Query Parameter Pre-selection, Strict Validation & Web3Forms + Persistent Fallbacks
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

        return { name, email, details, subject, body };
    };

    const escapeHtml = (str) => String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

    const renderFallbackButtons = (subject, body) => {
        const mailtoUrl = `mailto:Solomon@hailu.online?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=Solomon@hailu.online&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        const appLabel = currentLang === "am" ? "በኢሜይል አፕ ይላኩ" : "Open Default Email App";
        const gmailLabel = currentLang === "am" ? "በGmail (Web) ይላኩ" : "Open in Gmail (Web)";
        const copyLabel = currentLang === "am" ? "ጽሑፉን ኮፒ ያድርጉ" : "Copy Inquiry Text";

        return `
            <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:12px;">
                <a href="${mailtoUrl}" class="btn btn-outline btn-sm">${appLabel}</a>
                <a href="${gmailUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">${gmailLabel}</a>
                <button type="button" id="copy-inquiry-btn" class="btn btn-outline btn-sm">${copyLabel}</button>
            </div>
        `;
    };

    const bindCopyFallback = (subject, body) => {
        const copyInquiryBtn = document.getElementById("copy-inquiry-btn");
        if (copyInquiryBtn && navigator.clipboard) {
            copyInquiryBtn.addEventListener("click", () => {
                navigator.clipboard.writeText(`To: Solomon@hailu.online\nSubject: ${subject}\n\n${body}`).then(() => {
                    copyInquiryBtn.textContent = currentLang === "am" ? "ኮፒ ተደርጓል ✓" : "Inquiry Copied ✓";
                });
            });
        }
    };

    const statusBox = document.getElementById("form-status");

    quoteForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const { name, email, details, subject, body } = buildInquiryPayload();
        const nameInput = document.getElementById("client-name");
        const emailInput = document.getElementById("client-email");
        const detailsInput = document.getElementById("project-details");
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Strict validation: block submission until Name, valid Email, and Project Description are filled
        if (!name) {
            statusBox.className = "form-status error";
            statusBox.innerHTML = currentLang === "am"
                ? "እባክዎ መጀመሪያ <strong>ሙሉ ስምዎን ወይም የድርጅትዎን ስም (*)</strong> ያስገቡ።"
                : "Please enter <strong>Your Name (*)</strong> before sending your inquiry.";
            nameInput.focus();
            return;
        }

        if (!email || !emailPattern.test(email)) {
            statusBox.className = "form-status error";
            statusBox.innerHTML = currentLang === "am"
                ? "እባክዎ ትክክለኛ <strong>የኢሜይል አድራሻ (*)</strong> ያስገቡ።"
                : "Please enter a valid <strong>Email Address (*)</strong> before sending your inquiry.";
            emailInput.focus();
            return;
        }

        if (!details) {
            statusBox.className = "form-status error";
            statusBox.innerHTML = currentLang === "am"
                ? "እባክዎ <strong>የፕሮጀክት ዝርዝር እና ፍላጎትዎን (*)</strong> ይጻፉ።"
                : "Please enter your <strong>Project Description &amp; Requirements (*)</strong> before sending your inquiry.";
            detailsInput.focus();
            return;
        }

        const keyInput = quoteForm.querySelector('input[name="access_key"]');
        const accessKey = keyInput ? keyInput.value.trim() : "";
        const submitBtn = quoteForm.querySelector('button[type="submit"]');

        if (!accessKey || accessKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
            statusBox.className = "form-status error";
            statusBox.innerHTML = (currentLang === "am"
                ? "<strong>የመላኪያ ቁልፍ ገና አልተሞላም፡</strong> እባክዎ ከታች ባሉት አማራጮች በቀጥታ ይላኩ፡"
                : "<strong>Access Key Not Set Yet:</strong> Please send your inquiry directly using the backup options below:")
                + renderFallbackButtons(subject, body);
            bindCopyFallback(subject, body);
            return;
        }

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = currentLang === "am" ? "በመላክ ላይ..." : "Sending Inquiry...";
        }

        statusBox.className = "form-status visible";
        statusBox.innerHTML = currentLang === "am"
            ? "ጥያቄዎ በቀጥታ ወደ <strong>Solomon@hailu.online</strong> በመላክ ላይ ነው..."
            : "Sending your inquiry directly to <strong>Solomon@hailu.online</strong>...";

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
                statusBox.innerHTML = (currentLang === "am"
                    ? `<strong>ጥያቄዎ በተሳካ ሁኔታ ተልኳል!</strong> መልዕክትዎ ወደ <strong>Solomon@hailu.online</strong> ደርሷል። እናመሰግናለን <strong>${escapeHtml(name)}</strong>&mdash;በአጭር ጊዜ ውስጥ ምላሽ እንሰጥዎታለን።<span style="display:block; margin-top:8px; font-size:13px;">ተጨማሪ የመላኪያ/ቅጂ አማራጮች (Backup Options)፦</span>`
                    : `<strong>Inquiry Sent!</strong> Your message has been delivered to <strong>Solomon@hailu.online</strong>. Thank you, <strong>${escapeHtml(name)}</strong>&mdash;I will review your details and follow up shortly.<span style="display:block; margin-top:8px; font-size:13px;">Backup options (if you also want a local copy or wish to follow up directly):</span>`)
                    + renderFallbackButtons(subject, body);
                bindCopyFallback(subject, body);
                quoteForm.reset();
            } else {
                throw new Error(result.message || "Submission failed");
            }
        } catch (err) {
            statusBox.className = "form-status error";
            statusBox.innerHTML = (currentLang === "am"
                ? "<strong>በቀጥታ መላክ አልተቻለም፡</strong> እባክዎ ከታች ባሉት አማራጮች ወደ <strong>Solomon@hailu.online</strong> ይላኩ፦"
                : "<strong>Could Not Send Automatically:</strong> Please send your inquiry directly to <strong>Solomon@hailu.online</strong> using one of the backup options below:")
                + renderFallbackButtons(subject, body);
            bindCopyFallback(subject, body);
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = currentLang === "am" ? AM_TRANSLATIONS.contact.submitBtn : "Send Inquiry";
            }
        }
    });
}

console.log("Solomon Hailu 5-page portfolio scripts loaded successfully.");