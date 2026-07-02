import { db, collection, addDoc } from "./firebase-config.js";

(function () {
  "use strict";

  /* ------------------------------------------------------------------
     قائمة المدن الأساسية — تُضاف إليها المدن السحابية ديناميكياً
  ------------------------------------------------------------------ */
  const CITIES = [
    { slug: "jeddah", ar: "جدة",    en: "Jeddah" },
    { slug: "riyadh", ar: "الرياض", en: "Riyadh" },
    { slug: "dubai",  ar: "دبي",    en: "Dubai"  }
  ];

  const root = document.documentElement;
  const body = document.body;

  /* ============================================================
     LANGUAGE TOGGLE — مُصلح ليشمل:
     ✅ رابط "تواصل معنا" في الـ Navbar (data-en-list كانت ناقصة)
     ✅ placeholder حقول الفورم (contactName, contactSubject, contactMessage)
     ✅ خيارات الـ <select> (option)
     ✅ المدن المضافة حديثاً من Firebase
     ============================================================ */
  const langBtn = document.getElementById("langSwitch");
  let currentLang = sessionStorage.getItem("wajhati-lang") || "ar";

  function applyLang(lang) {
    currentLang = lang;
    sessionStorage.setItem("wajhati-lang", lang);

    const isEn = lang === "en";
    body.classList.toggle("lang-en", isEn);
    root.setAttribute("lang", isEn ? "en" : "ar");
    root.setAttribute("dir", isEn ? "ltr" : "rtl");

    /* 1️⃣ كل عنصر يحمل data-ar و data-en — يُبدَّل textContent */
    document.querySelectorAll("[data-ar][data-en]").forEach((el) => {
      /* تخطّي الـ <option> — تُعالَج أدناه بشكل خاص */
      if (el.tagName === "OPTION") return;
      const text = isEn ? el.getAttribute("data-en") : el.getAttribute("data-ar");
      if (text !== null) el.textContent = text;
    });

    /* 2️⃣ روابط الـ Navbar — المصدر هو JSON في data-ar-list / data-en-list
          الآن data-en-list تحتوي على 4 عناصر تشمل "Contact Us" */
    const navLinks = document.querySelector(".nav__links");
    if (navLinks) {
      const arList = JSON.parse(navLinks.getAttribute("data-ar-list") || "[]");
      const enList = JSON.parse(navLinks.getAttribute("data-en-list") || "[]");
      const list = isEn ? enList : arList;
      navLinks.querySelectorAll("a").forEach((a, i) => {
        if (list[i] !== undefined) a.textContent = list[i];
      });
    }

    /* 3️⃣ placeholder شريط البحث */
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.placeholder = isEn
        ? searchInput.getAttribute("data-en-placeholder")
        : searchInput.getAttribute("data-ar-placeholder");
    }

    /* 4️⃣ placeholder حقول فورم التواصل */
    const contactPlaceholders = {
      contactName:    { ar: "أدخل اسمك هنا...",                    en: "Enter your name..." },
      contactSubject: { ar: "عنوان الرسالة الرئيسي...",             en: "Message subject..." },
      contactMessage: { ar: "اكتب تفاصيل رسالتك أو مقترحك هنا...", en: "Write your message details here..." }
    };
    Object.entries(contactPlaceholders).forEach(([id, texts]) => {
      const el = document.getElementById(id);
      if (el) el.placeholder = isEn ? texts.en : texts.ar;
    });

    /* 5️⃣ خيارات الـ <select> في فورم التواصل
          نستخدم data-ar / data-en المضافَين على كل <option> */
    document.querySelectorAll("option[data-ar][data-en]").forEach((opt) => {
      opt.textContent = isEn
        ? opt.getAttribute("data-en")
        : opt.getAttribute("data-ar");
    });

    /* 6️⃣ المدن المضافة من Firebase — تأتي بعد تشغيل applyLang الأولي
          نعيد تمرير نفس المنطق على كل عناصر data-ar/data-en الجديدة
          (firebase-cities.js يضيفها بـ data-ar و data-en صحيحَين) */
    document.querySelectorAll(".city-grid [data-ar][data-en]").forEach((el) => {
      if (el.tagName === "OPTION") return;
      const text = isEn ? el.getAttribute("data-en") : el.getAttribute("data-ar");
      if (text !== null) el.textContent = text;
    });
  }

  langBtn.addEventListener("click", () => {
    applyLang(currentLang === "ar" ? "en" : "ar");
  });

  applyLang(currentLang);

  /* ============================================================
     NAVBAR BACKGROUND ON SCROLL
     ============================================================ */
  const nav = document.getElementById("nav");
  function onScrollNav() {
    nav.classList.toggle("scrolled", window.scrollY > 60);
  }
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  /* ============================================================
     NAVIGATION HELPER
     ============================================================ */
  function goToCity(slug) {
    if (!slug) return;
    window.location.href = `city-details.html?city=${encodeURIComponent(slug)}`;
  }

  /* ============================================================
     CITY CARDS — click / keyboard (الكروت الثابتة في HTML)
     ============================================================ */
  document.querySelectorAll(".city-card").forEach((card) => {
    const slug = card.getAttribute("data-slug");
    card.addEventListener("click", () => goToCity(slug));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        goToCity(slug);
      }
    });
  });

  /* ============================================================
     SEARCH BAR
     ============================================================ */
  const searchForm  = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const suggestBox  = document.getElementById("searchSuggest");

  function normalize(str) { return str.trim().toLowerCase(); }

  function findMatches(query) {
    const q = normalize(query);
    if (!q) return [];
    return CITIES.filter(
      (c) => c.ar.includes(query.trim()) || normalize(c.en).includes(q)
    );
  }

  function renderSuggestions(matches) {
    if (!matches.length) {
      suggestBox.hidden = true;
      suggestBox.innerHTML = "";
      return;
    }
    suggestBox.innerHTML = matches
      .map((c, i) => `
        <button type="button" data-slug="${c.slug}" data-idx="${i}">
          ${currentLang === "en" ? c.en : c.ar}
          <small>${currentLang === "en" ? c.ar : c.en}</small>
        </button>`)
      .join("");
    suggestBox.hidden = false;
    suggestBox.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => goToCity(btn.getAttribute("data-slug")));
    });
  }

  searchInput.addEventListener("input",  () => renderSuggestions(findMatches(searchInput.value)));
  searchInput.addEventListener("focus",  () => { if (searchInput.value.trim()) renderSuggestions(findMatches(searchInput.value)); });
  document.addEventListener("click",    (e) => { if (!suggestBox.contains(e.target) && e.target !== searchInput) suggestBox.hidden = true; });

  searchInput.addEventListener("keydown", (e) => {
    const buttons = Array.from(suggestBox.querySelectorAll("button"));
    if (!buttons.length) return;
    let idx = buttons.findIndex((b) => b.classList.contains("active"));
    if (e.key === "ArrowDown") { e.preventDefault(); idx = (idx + 1) % buttons.length; }
    else if (e.key === "ArrowUp")  { e.preventDefault(); idx = (idx - 1 + buttons.length) % buttons.length; }
    else if (e.key === "Enter" && idx > -1) { e.preventDefault(); buttons[idx].click(); return; }
    buttons.forEach((b) => b.classList.remove("active"));
    if (idx > -1) buttons[idx].classList.add("active");
  });

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = searchInput.value.trim();
    if (!value) { searchInput.focus(); return; }
    const matches = findMatches(value);
    if (matches.length === 1) {
      goToCity(matches[0].slug);
    } else {
      goToCity(normalize(value).replace(/\s+/g, "-") || value);
    }
  });

  /* ============================================================
     SCROLL REVEAL — كروت المدن
     ============================================================ */
  const revealTargets = document.querySelectorAll(".city-card");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("revealed"); io.unobserve(entry.target); }
      }),
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("revealed"));
  }

  /* ============================================================
     GEOMETRIC DIVIDER
     ============================================================ */
  const dividerPath = document.querySelector(".divider__path");
  if (dividerPath && "IntersectionObserver" in window) {
    const dividerIo = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) { dividerPath.classList.add("drawn"); dividerIo.unobserve(entry.target); }
      }),
      { threshold: 0.5 }
    );
    dividerIo.observe(dividerPath);
  } else if (dividerPath) {
    dividerPath.classList.add("drawn");
  }

  /* ============================================================
     🔄 استقبال المدن الجديدة من firebase-cities.js
     يُضيفها لقائمة البحث ويطبّق اللغة الحالية عليها فوراً
     ============================================================ */
  document.addEventListener("wajhati:newCity", (e) => {
    const { slug, ar, en } = e.detail || {};
    if (!slug) return;

    /* أضفها لقائمة البحث إن لم تكن موجودة */
    if (!CITIES.some((c) => c.slug === slug)) {
      CITIES.push({ slug, ar, en });
    }

    /* طبّق اللغة الحالية على الكارت الجديد فوراً */
    const newCard = document.querySelector(`.city-card[data-slug="${slug}"]`);
    if (newCard) {
      const isEn = currentLang === "en";
      newCard.querySelectorAll("[data-ar][data-en]").forEach((el) => {
        const text = isEn ? el.getAttribute("data-en") : el.getAttribute("data-ar");
        if (text !== null) el.textContent = text;
      });
    }
  });

})();

/* ============================================================
   فورم التواصل — إرسال Firebase
   ============================================================ */
document.getElementById("wajhatiContactForm")?.addEventListener("submit", async function (e) {
  e.preventDefault();
  const btn = this.querySelector(".contact-form__btn");
  if (btn) btn.disabled = true;

  const isEn = sessionStorage.getItem("wajhati-lang") === "en";

  try {
    await addDoc(collection(db, "suggestions"), {
      name:        document.getElementById("contactName").value.trim(),
      type:        document.getElementById("contactType").value,
      subject:     document.getElementById("contactSubject").value.trim(),
      message:     document.getElementById("contactMessage").value.trim(),
      submittedAt: new Date().toISOString()
    });
    alert(isEn
      ? "✅ Thank you! Your message has been sent successfully."
      : "✅ شكراً لك! تم إرسال رسالتك بنجاح إلى فريق وجهتي.");
    this.reset();
  } catch (err) {
    console.error(err);
    alert(isEn ? "❌ Failed to send. Please try again." : "❌ عذراً، فشل الإرسال. يرجى المحاولة لاحقاً.");
  } finally {
    if (btn) btn.disabled = false;
  }
});