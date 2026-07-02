/* ============================================================
   WAJHATI — firebase-cities.js
   ------------------------------------------------------------
   يجلب المدن الجديدة من Firestore ويضيفها إلى شبكة الكروت
   في الصفحة الرئيسية (index.html) بنفس الهيكل المعتمد
   الذي يتوقعه script.js تماماً.

   ✅ يُستدعى تلقائياً عند تحميل الصفحة
   ✅ يبني كل كارت بنفس HTML الموجود في index.html
   ✅ يضيف data-slug لكل كارت (مطلوب للتنقل)
   ✅ يربط click handlers و keyboard handlers فوراً
   ✅ يفعّل scroll-reveal على الكروت الجديدة
   ✅ يُحدِّث قائمة الاقتراحات في شريط البحث
   ✅ يُحدِّث قائمة المدن في نموذج إضافة المعالم (admin)
   ============================================================ */

import {
  db,
  collection,
  getDocs
} from "./firebase-config.js";

/* ------ الثوابت المشتركة مع style.css ------ */
const EASE = "cubic-bezier(.22,1,.36,1)";

/* ============================================================
   بناء كارت مدينة واحدة بنفس هيكل HTML الموجود في index.html
   ============================================================ */
function buildCityCard(city, isFirst) {
  const article = document.createElement("article");

  // نفس الـ classes التي يبحث عنها script.js
  article.className = isFirst
    ? "city-card city-card--feature"
    : "city-card";

  // data-slug مطلوب لعمل goToCity() في script.js
  article.setAttribute("data-city",    city.nameAr || city.slug);
  article.setAttribute("data-city-en", city.nameEn || city.slug);
  article.setAttribute("data-slug",    city.slug);
  article.setAttribute("tabindex",     "0");
  article.setAttribute("role",         "button");

  /* إذا لم يُسجَّل nameEn في Firestore (مدن أُضيفت قبل الإصلاح)،
     نحوّل الـ slug إلى اسم مقروء: "al-madinah" → "Al Madinah" */
  const nameEnFallback = (city.slug || "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const nameEn = city.nameEn || nameEnFallback;
  const tagAr  = city.taglineAr || "";
  const tagEn  = city.taglineEn || "";
  const descAr = city.descAr    || "";
  const descEn = city.descEn    || "";

  article.innerHTML = `
    <img class="city-card__img"
         src="${city.heroImage || ""}"
         alt="${city.nameAr || city.slug}"
         loading="lazy">
    <div class="city-card__shade"></div>
    <div class="city-card__content">
      <span class="city-card__tag"
            data-ar="${tagAr}"
            data-en="${tagEn}">${tagAr}</span>
      <h3 class="city-card__name"
          data-ar="${city.nameAr || city.slug}"
          data-en="${nameEn}">${city.nameAr || city.slug}</h3>
      <p class="city-card__desc"
         data-ar="${descAr}"
         data-en="${descEn}">${descAr}</p>
      <span class="city-card__cta"
            data-ar="اكتشف المدينة ←"
            data-en="Discover the city →">اكتشف المدينة ←</span>
    </div>
  `;

  return article;
}

/* ============================================================
   ربط التفاعل بكارت مدينة جديدة
   (نفس منطق script.js لكن مطبّق على عنصر بعينه)
   ============================================================ */
function bindCardEvents(card) {
  const slug = card.getAttribute("data-slug");
  if (!slug) return;

  card.addEventListener("click", () => {
    window.location.href = `city-details.html?city=${encodeURIComponent(slug)}`;
  });

  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      window.location.href = `city-details.html?city=${encodeURIComponent(slug)}`;
    }
  });
}

/* ============================================================
   تفعيل scroll-reveal لكارت واحد
   ============================================================ */
function bindReveal(card) {
  if (!("IntersectionObserver" in window)) {
    card.classList.add("revealed");
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  io.observe(card);
}

/* ============================================================
   مزامنة قائمة المدن في شريط البحث (script.js → CITIES)
   يُضيف المدينة الجديدة لمصفوفة الاقتراحات إن وجدت
   ============================================================ */
function syncSearchList(city) {
  // script.js يحتفظ بقائمة CITIES داخل IIFE ولا يمكن الوصول إليها مباشرة،
  // لكن يمكننا تزويد dataset-slug في كارت البحث عبر إضافة option للـ <datalist>
  // إن وجد، أو تحديث المصفوفة عبر custom event يلتقطه script.js
  const event = new CustomEvent("wajhati:newCity", {
    detail: {
      slug:  city.slug,
      ar:    city.nameAr || city.slug,
      en:    nameEn
    },
    bubbles: true
  });
  document.dispatchEvent(event);
}

/* ============================================================
   إضافة المدينة لقائمة الـ Admin (select#cityNameSlug)
   إن كانت صفحة الأدمن مفتوحة في نفس الجلسة
   ============================================================ */
function syncAdminSelect(city) {
  const select = document.getElementById("cityNameSlug");
  if (!select) return;

  // تجنّب التكرار
  if (select.querySelector(`option[value="${city.slug}"]`)) return;

  const opt = document.createElement("option");
  opt.value       = city.slug;
  opt.textContent = city.nameAr || city.slug;
  select.appendChild(opt);
}

/* ============================================================
   الدالة الرئيسية: جلب المدن من Firestore وعرضها
   ============================================================ */
async function loadDynamicCities() {
  const grid = document.getElementById("cityGrid");
  if (!grid) return; // لسنا في صفحة index.html

  try {
    const querySnapshot = await getDocs(collection(db, "cities"));

    querySnapshot.forEach((doc) => {
      const city = { id: doc.id, ...doc.data() };

      // تجنّب إضافة مدينة موجودة مسبقاً في HTML الثابت
      const alreadyExists = grid.querySelector(
        `[data-slug="${city.slug}"]`
      );
      if (alreadyExists) {
        // المدينة موجودة — فقط حدِّث select الأدمن إن احتجنا
        syncAdminSelect(city);
        return;
      }

      // بناء الكارت وإضافته للشبكة
      const card = buildCityCard(city, false);

      // ربط التفاعل
      bindCardEvents(card);
      bindReveal(card);

      // تطبيق اللغة الحالية على النصوص الجديدة
      const currentLang = sessionStorage.getItem("wajhati-lang") || "ar";
      if (currentLang === "en") {
        card.querySelectorAll("[data-ar][data-en]").forEach((el) => {
          el.textContent = el.getAttribute("data-en") || "";
        });
      }

      // إضافة الكارت للشبكة
      grid.appendChild(card);

      // مزامنة البحث والأدمن
      syncSearchList(city);
      syncAdminSelect(city);
    });

  } catch (err) {
    console.error("Wajhati — خطأ في جلب المدن السحابية:", err);
  }
}

/* ============================================================
   تشغيل تلقائي عند جاهزية الصفحة
   ============================================================ */
document.addEventListener("DOMContentLoaded", loadDynamicCities);