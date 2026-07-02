// استيراد أدوات السحاب من ملف الإعدادات المشترك
import { db, collection, getDocs, query, where, addDoc } from "./firebase-config.js";

(function () {
  "use strict";

  const CITY_DATA = window.WAJHATI_CITY_DATA || {};
  const CATEGORY_META = window.WAJHATI_CATEGORY_META || {};

  const root = document.documentElement;
  const body = document.body;

  /* ============================================================
     RESOLVE CITY FROM URL
     ============================================================ */
  function getCitySlugFromURL() {
    const params = new URLSearchParams(window.location.search);
    const raw = (params.get("city") || "").trim().toLowerCase();
    return raw;
  }

  function resolveCity(slug) {
    if (!slug) return null;
    if (CITY_DATA[slug]) return CITY_DATA[slug];

    const entries = Object.values(CITY_DATA);
    const found = entries.find(
      (c) =>
        c.name.ar === slug ||
        c.name.en.toLowerCase() === slug ||
        slug.includes(c.slug)
    );
    return found || null;
  }

  const citySlug = getCitySlugFromURL();
  const city = resolveCity(citySlug);

  /* ============================================================
     LANGUAGE TOGGLE (mirrors home page behavior + session choice)
     ============================================================ */
  let currentLang = sessionStorage.getItem("wajhati-lang") || "ar";

  function translateStaticEls() {
    document.querySelectorAll("[data-ar][data-en]").forEach((el) => {
      const text = currentLang === "en" ? el.getAttribute("data-en") : el.getAttribute("data-ar");
      if (text !== null) el.textContent = text;
    });
  }

  function applyLang(lang) {
    currentLang = lang;
    sessionStorage.setItem("wajhati-lang", lang);
    const isEn = lang === "en";

    body.classList.toggle("lang-en", isEn);
    root.setAttribute("lang", isEn ? "en" : "ar");
    root.setAttribute("dir", isEn ? "ltr" : "rtl");

    translateStaticEls();

    if (city) {
      renderHero(city);
      renderNavAndSections(city);
      
      // جلب المعالم السحابية مجدداً لتحديث لغتها عند التبديل
      loadCloudLandmarks(citySlug);

      document.querySelectorAll(".landmark-card").forEach((c) => c.classList.add("revealed"));
      setupScrollSpy();
    }
  }

  const langBtn = document.getElementById("langSwitch");
  if (langBtn) {
    langBtn.addEventListener("click", () => applyLang(currentLang === "ar" ? "en" : "ar"));
  }

  /* ============================================================
     RENDER: CITY HERO
     ============================================================ */
  function renderHero(cityObj) {
    const isEn = currentLang === "en";
    document.getElementById("cityHeroImg").src = cityObj.heroImage;
    document.getElementById("cityHeroImg").alt = isEn ? cityObj.name.en : cityObj.name.ar;
    document.getElementById("cityTag").textContent = isEn ? cityObj.tagline.en : cityObj.tagline.ar;
    document.getElementById("cityName").textContent = isEn ? cityObj.name.en : cityObj.name.ar;
    document.getElementById("cityIntro").textContent = isEn ? cityObj.intro.en : cityObj.intro.ar;
    document.title = `وجهتي | ${isEn ? cityObj.name.en : cityObj.name.ar}`;
  }

  /* ============================================================
     RENDER: NAV TABS + LANDMARK SECTIONS
     ============================================================ */
  function renderNavAndSections(cityObj) {
    const isEn = currentLang === "en";
    const navInner = document.getElementById("catNavInner");
    const main = document.getElementById("landmarkSections");

    navInner.innerHTML = "";
    main.innerHTML = "";

    // "All" tab
    const allTab = document.createElement("button");
    allTab.className = "catnav__tab active";
    allTab.dataset.target = "all";
    allTab.innerHTML = `<span class="catnav__icon">✺</span><span>${isEn ? "All" : "الكل"}</span>`;
    navInner.appendChild(allTab);

    const categoryIds = Object.keys(cityObj.categories).filter(
      (id) => Array.isArray(cityObj.categories[id]) && cityObj.categories[id].length > 0
    );

    categoryIds.forEach((catId, catIndex) => {
      const meta = CATEGORY_META[catId] || { ar: catId, en: catId, icon: "📍" };
      const landmarks = cityObj.categories[catId];
      const sectionId = `cat-${catId}`;

      /* ---- nav tab ---- */
      const tab = document.createElement("button");
      tab.className = "catnav__tab";
      tab.dataset.target = sectionId;
      tab.innerHTML = `<span class="catnav__icon">${meta.icon}</span><span>${isEn ? meta.en : meta.ar}</span>`;
      navInner.appendChild(tab);

      /* ---- section ---- */
      const section = document.createElement("section");
      section.className = "cat-section";
      section.id = sectionId;
      section.dataset.category = catId;

      const head = document.createElement("div");
      head.className = "cat-section__head";
      head.innerHTML = `
        <span class="cat-section__eyebrow">${meta.icon} ${isEn ? "Category" : "التصنيف"}</span>
        <h2 class="cat-section__title">${isEn ? meta.en : meta.ar}</h2>
      `;
      section.appendChild(head);

      const list = document.createElement("div");
      list.className = "landmark-list";
      // إضافة معرف فريد لكل قائمة ليسهل استهدافه عند حقن البيانات السحابية
      list.id = `list-${catId}`;

      landmarks.forEach((landmark, i) => {
        const card = document.createElement("article");
        card.className = "landmark-card";

        const numStr = String(i + 1).padStart(2, "0");
        const imgAlt = isEn ? landmark.name.en : landmark.name.ar;

        card.innerHTML = `
          <div class="landmark-card__media">
            <img src="${landmark.image}" alt="${imgAlt}" loading="lazy">
          </div>
          <div class="landmark-card__text">
            <span class="landmark-card__number">${numStr}</span>
            <h3 class="landmark-card__title">${isEn ? landmark.name.en : landmark.name.ar}</h3>
            <p class="landmark-card__desc">${isEn ? landmark.description.en : landmark.description.ar}</p>
          </div>
        `;
        list.appendChild(card);
      });

      section.appendChild(list);
      main.appendChild(section);
    });

    navInner.querySelectorAll(".catnav__tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.target;
        if (target === "all") {
          document.getElementById("cityHero").scrollIntoView({ behavior: "smooth" });
        } else {
          const el = document.getElementById(target);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  /* ============================================================
     📥 FETCH AND INTEGRATE CLOUD LANDMARKS (FIREBASE)
     ============================================================ */
  async function loadCloudLandmarks(currentCitySlug) {
    if (!currentCitySlug) return;
    const isEn = currentLang === "en";

    try {
      // استعلام سحابي لجلب معالم هذه المدينة المحددة فقط
      const q = query(collection(db, "landmarks"), where("city", "==", currentCitySlug));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        
        // استهدف القائمة الخاصة بالتصنيف الصحيح للمعلم
        const targetList = document.getElementById(`list-${data.category}`);
        
        if (targetList) {
          // حساب رقم الترتيب بناءً على العناصر الموجودة حالياً
          const currentCardsCount = targetList.querySelectorAll(".landmark-card").length;
          const numStr = String(currentCardsCount + 1).padStart(2, "0");

          const name = isEn ? data.nameEn : data.nameAr;
          const desc = isEn ? data.descEn : data.descAr;

          const card = document.createElement("article");
          card.className = "landmark-card";

          // تم إزالة رمز النجمة التلقائي ✨ ليكون المظهر موحداً ونظيفاً
          card.innerHTML = `
            <div class="landmark-card__media">
              <img src="${data.image}" alt="${name}" loading="lazy">
            </div>
            <div class="landmark-card__text">
              <span class="landmark-card__number">${numStr}</span>
              <h3 class="landmark-card__title">${name}</h3>
              <p class="landmark-card__desc">${desc}</p>
            </div>
          `;

          // إضافة المعلم السحابي في نهاية القائمة
          targetList.appendChild(card);
        }
      });

      // تشغيل الرصد الحركي مجدداً ليشمل العناصر الجديدة المضافة سحابياً
      setupRevealAnimation();
      setupScrollSpy();

    } catch (error) {
      console.error("Error loading cloud data:", error);
    }
  }

  /* ============================================================
     ✉️ CONTACT FORM SUBMISSION TO SATELLITE (FIREBASE)
     ============================================================ */
  function setupContactForm() {
    const contactForm = document.getElementById('wajhatiContactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const isEn = currentLang === "en";
      const submitBtn = contactForm.querySelector('.contact-form__btn');
      
      // تغيير حالة الزر مؤقتاً لحين انتهاء الرفع
      if (submitBtn) submitBtn.disabled = true;

      const suggestionData = {
        name: document.getElementById('contactName').value.trim(),
        type: document.getElementById('contactType').value,
        subject: document.getElementById('contactSubject').value.trim(),
        message: document.getElementById('contactMessage').value.trim(),
        submittedAt: new Date()
      };

      try {
        // إرسال البيانات فوراً لمجلد الحفظ السحابي suggestions
        await addDoc(collection(db, "suggestions"), suggestionData);
        
        alert(isEn ? "Thank you! Your message has been sent successfully." : "شكراً لك! تم إرسال مقترحك بنجاح إلى سحابة وجهتي.");
        contactForm.reset();
      } catch (error) {
        alert(isEn ? "Failed to send the message. Please try again." : "عذراً، فشل إرسال الرسالة السحابية، يرجى المحاولة لاحقاً.");
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  /* ============================================================
     SCROLL-SPY
     ============================================================ */
  let spyObserver = null;

  function setupScrollSpy() {
    if (spyObserver) spyObserver.disconnect();

    const sections = Array.from(document.querySelectorAll(".cat-section"));
    const tabs = Array.from(document.querySelectorAll(".catnav__tab"));
    if (!sections.length || !("IntersectionObserver" in window)) return;

    const ratios = new Map(sections.map((s) => [s.id, 0]));

    const setActive = (sectionId) => {
      tabs.forEach((t) => {
        t.classList.toggle("active", t.dataset.target === sectionId);
      });
    };

    spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let bestId = null;
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        if (bestId) setActive(bestId);
      },
      {
        rootMargin: "-130px 0px -55% 0px",
        threshold: [0, 0.05, 0.1, 0.25, 0.5, 0.75, 1]
      }
    );

    sections.forEach((sec) => spyObserver.observe(sec));
  }

  /* ============================================================
     SCROLL REVEAL
     ============================================================ */
  let revealObserver = null;

  function setupRevealAnimation() {
    if (revealObserver) revealObserver.disconnect();
    const cards = document.querySelectorAll(".landmark-card");
    if (!cards.length) return;

    if (!("IntersectionObserver" in window)) {
      cards.forEach((c) => c.classList.add("revealed"));
      return;
    }

    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    cards.forEach((c) => revealObserver.observe(c));
  }

  /* ============================================================
     INIT
     ============================================================ */
  function init() {
    translateStaticEls();
    root.setAttribute("lang", currentLang === "en" ? "en" : "ar");
    root.setAttribute("dir", currentLang === "en" ? "ltr" : "rtl");
    body.classList.toggle("lang-en", currentLang === "en");

    if (!city) {
      document.getElementById("cityHero").style.display = "none";
      document.getElementById("catNav").style.display = "none";
      document.getElementById("notFound").hidden = false;
      document.getElementById("notFound").style.display = "flex"; 
      return;
    }

    renderHero(city);
    document.getElementById("notFound").style.display = "none"; 

    renderNavAndSections(city);
    
    // تشغيل الخدمات السحابية بعد بناء القوائم الأساسية
    loadCloudLandmarks(citySlug);
    setupContactForm();

    setupScrollSpy();
    setupRevealAnimation();

    window.addEventListener("load", () => {
      setupScrollSpy();
    });
  }

  init();
})();