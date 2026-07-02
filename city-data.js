
const CATEGORY_META = {
  historical: {
    ar: "الأماكن الأثرية",
    en: "Historical Sites",
    icon: "🏛️"
  },
  religious: {
    ar: "الأماكن الدينية",
    en: "Religious Sites",
    icon: "🕌"
  },
  touristic: {
    ar: "الأماكن السياحية",
    en: "Tourist Attractions",
    icon: "🌅"
  }

};

/* ---------- City data ---------- */
const CITY_DATA = {

  jeddah: {
    slug: "jeddah",
    name: { ar: "جدة", en: "Jeddah" },
    tagline: { ar: "عروس البحر الأحمر", en: "Bride of the Red Sea" },
    heroImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3QonoEvuys_ifdmq8AvYgefjI7_ArIs8GaLgPFwZIPSbZ4iLvled9uHA&s=10",
    intro: {
      ar: "حيث تتنفّس أزقة البلد التاريخية عبق القرون، وتمتد الواجهة البحرية لتروي حكاية مدينة لم تتوقف يوماً عن الحركة والتجارة منذ كانت ميناءً للحجاج القادمين إلى مكة المكرمة.",
      en: "Where the alleys of historic Al-Balad still breathe centuries of history, and a long waterfront tells the story of a city that never stopped moving since it welcomed pilgrims bound for Makkah."
    },
    categories: {

      historical: [
        {
          id: "albalad",
          name: { ar: "حي البلد التاريخي", en: "Historic Al-Balad" },
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYT5_T6g4H-Trot7MIAq2WSsJSedYB86wSbjcr8k-Qzg&s=10",
          description: {
            ar: "قلب جدة القديم، وأحد مواقع التراث العالمي المسجلة لدى اليونسكو منذ عام 2014. أزقته الضيقة تتعرّج بين بيوت بُنيت من الحجر المرجاني، بنوافذها الخشبية المشربية التي تسمح بمرور الهواء وتحفظ الخصوصية في آنٍ واحد. كل زاوية هنا تحمل أثراً من تاريخ المدينة كميناء رئيسي للحجاج والتجار عبر القرون.",
            en: "The historic heart of Jeddah, inscribed on the UNESCO World Heritage list since 2014. Its narrow lanes wind between coral-stone houses with carved wooden mashrabiya windows that let air through while preserving privacy — every corner carries a trace of the city's centuries as a port for pilgrims and traders."
          }
        },
        {
          id: "naseef-house",
          name: { ar: "بيت نصيف", en: "Naseef House" },
          image: "https://cnn-arabic-images.cnn.io/cloudinary/image/upload/w_1920,c_scale,q_auto/cnnarabic/2020/07/14/images/159753.jpg",
          description: {
            ar: "من أبرز القصور التاريخية في جدة، بُني عام 1872م وكان يُستخدم كمقر إقامة لكبار الزوار، بل أقام فيه الملك عبدالعزيز عند دخوله جدة. يتميز بزخارفه الجميلة ونوافذه المشربية الواسعة، ويُعد اليوم متحفاً مفتوحاً للزوار الراغبين في استكشاف العمارة الجداوية التقليدية عن قرب.",
            en: "One of Jeddah's most prominent historic houses, built in 1872. It once hosted distinguished guests — including King Abdulaziz upon entering Jeddah — and is known for its ornate carvings and wide mashrabiya windows. Today it operates as an open museum of traditional Hijazi architecture."
          }
        },
        {
          id: "makkah-gate",
          name: { ar: "باب مكة", en: "Makkah Gate" },
          image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/%D8%A7%D9%84%D8%A8%D9%84%D8%AF_%D8%AC%D8%AF%D8%A9.jpg",
          description: {
            ar: "أحد أبواب سور جدة القديم الثمانية، بُني في عهد المماليك عام 1509م ليكون المدخل الشرقي للمدينة ونقطة انطلاق القوافل والحجاج المتجهين إلى مكة المكرمة. يحمل الباب أهمية تاريخية ودينية معاً، وما يزال شاهداً على عراقة جدة وتراثها المعماري.",
            en: "One of the eight gates of Jeddah's old city wall, built during the Mamluk era in 1509 as the eastern entrance and departure point for caravans and pilgrims heading to Makkah. The gate carries both historical and religious weight, standing today as a witness to Jeddah's architectural heritage."
          }
        }
      ],

      religious: [
        {
          id: "rahma-mosque",
          name: { ar: "مسجد الرحمة (المسجد العائم)", en: "Al-Rahma Mosque (The Floating Mosque)" },
          image: "https://alsyahaalarabia.com/wp-content/uploads/2023/09/Al-Rahma-Mosque.jpg",
          description: {
            ar: "يُعرف محلياً بالمسجد العائم لأنه يبدو وكأنه يطفو على سطح البحر الأحمر مباشرة. يجمع تصميمه بين الأصالة الإسلامية والحداثة المعمارية، وتنعكس قبابه البيضاء على صفحة الماء بشكل ساحر، خاصة عند غروب الشمس، ما يجعله من أكثر معالم جدة الروحانية والجمالية زيارةً.",
            en: "Known locally as the Floating Mosque for appearing to rest directly on the Red Sea. Its design blends Islamic tradition with architectural modernity, and its white domes reflect beautifully on the water — especially at sunset — making it one of Jeddah's most visited spiritual and aesthetic landmarks."
          }
        },
        {
          id: "basha-mosque",
          name: { ar: "مسجد الباشا", en: "Al-Basha Mosque" },
          image: "https://pbs.twimg.com/media/B_jwgXbWYAAVsr_.jpg",
          description: {
            ar: "يقع في حي الشام العريق، ويعود تاريخ بنائه إلى القرن الثامن عشر الميلادي بأمر من الوزير أبوبكر باشا. تميزت عمارته الأصلية بطابعها الإسلامي ومئذنته الشاهقة التي كانت من معالم جدة البارزة لعقود طويلة، وما يزال حاضراً في ذاكرة أهل المدينة كرمز للتراث الإسلامي العريق.",
            en: "Located in the old Al-Sham district, dating back to the 18th century by order of Wazir Abu Bakr Pasha. Its original architecture carried a distinctly Islamic character, with a tall minaret that was a Jeddah landmark for decades, and remains a symbol of the city's Islamic heritage."
          }
        }
      ],

      touristic: [
        {
          id: "corniche",
          name: { ar: "كورنيش جدة", en: "Jeddah Corniche" },
          image: "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=400,height=265,dpr=2/tour_img/644e530a268ac.jpeg",
          description: {
            ar: "واجهة بحرية تمتد لأكثر من 30 كيلومتراً على ساحل البحر الأحمر، تجمع بين المساحات الخضراء والمنحوتات الفنية المفتوحة والمقاهي العائلية. مكان مثالي لمشاهدة غروب الشمس أو نزهة مسائية، ويعكس الجانب الحديث والمنفتح من جدة في مقابل عبق البلد التاريخي.",
            en: "A waterfront promenade stretching over 30 kilometers along the Red Sea, lined with green spaces, open-air sculptures, and family cafés. An ideal spot for sunset views or an evening stroll, reflecting Jeddah's modern, open side in contrast to historic Al-Balad."
          }
        },
        {
          id: "king-fahd-fountain",
          name: { ar: "نافورة الملك فهد", en: "King Fahd's Fountain" },
          image: "https://golden4tic.com/blog/wp-content/uploads/2024/11/%D9%86%D8%A7%D9%81%D9%88%D8%B1%D8%A9-%D8%AC%D8%AF%D8%A9-%D8%B9%D9%86-%D9%82%D8%B1%D8%A8.webp",
          description: {
            ar: "تُصنَّف موسوعة غينيس للأرقام القياسية هذه النافورة كأعلى نافورة مائية في العالم، حيث يندفع الماء منها بقوة ثلاث مضخات عملاقة ليصل ارتفاعه إلى أكثر من 260 متراً. تقع على كورنيش جدة الجنوبي، وتتحول مع الإضاءة الليلية إلى مشهد بصري ساحر يجذب آلاف الزوار سنوياً.",
            en: "Recognized by Guinness World Records as the tallest fountain of its kind, shooting water more than 260 meters into the air via three giant pumps. Located on the southern corniche, it transforms into a mesmerizing nighttime spectacle under floodlights, drawing thousands of visitors yearly."
          }
        },
        {
          id: "alawi-souq",
          name: { ar: "سوق العلوي", en: "Al-Alawi Souq" },
          image: "https://cdn2.wingie.com/uploads/f_webp,s_500x300,q_60,fit_cover/swq_alelwy_jdt_4e5b45b95e.jpg",
          description: {
            ar: "من أقدم وأكبر الأسواق الشعبية في جدة، يضم أكثر من 600 محل تجاري بين أبواب خشبية تقليدية، تُباع فيه الأقمشة والمجوهرات والتحف والأطعمة الشعبية. التجول بين ممراته الضيقة تجربة حسية كاملة، تجمع بين رائحة البخور وأصوات الباعة وألوان البضائع المتراصة.",
            en: "One of Jeddah's oldest and largest traditional markets, with more than 600 shops behind traditional wooden doors, selling fabrics, jewelry, antiques, and street food. Wandering its narrow lanes is a full sensory experience — incense in the air, vendors calling out, and goods stacked in every color."
          }
        },

        {
          id: "bicycle-roundabout",
          name: { ar: "ميدان الدراجة", en: "The Bicycle Roundabout" },
          image: "https://saudiauto.com.sa/wp-content/uploads/2023/03/d985d98ad8afd8a7d986-d8a7d984d8afd8b1d8a7d8acd8a9-d8a5d8b1d8ab-d8add8b6d8a7d8b1d98a-d98ad8aad8acd8a7d988d8b2-d8a7d984d980-40-d8b9d8a7_63fef11887db4.jpeg",
          description: {
            ar: "نُصب فني ضخم على شكل دراجة هوائية في شمال جدة، مصنوع من مخلفات أول مصنع رخام سعودي، ومسجل في موسوعة غينيس كأكبر دراجة في العالم. مثال طريف على المنحوتات الفنية المفتوحة المنتشرة في شوارع جدة، التي حوّلتها إلى ما يشبه متحفاً مفتوحاً في الهواء الطلق.",
            en: "A massive bicycle-shaped public sculpture in north Jeddah, built from the remnants of Saudi Arabia's first marble factory and recognized by Guinness World Records as the largest bicycle in the world — a playful example of the open-air art scattered throughout the city's streets."
          }
        }
      ]
    }
  },

  riyadh: {
    slug: "riyadh",
    name: { ar: "الرياض", en: "Riyadh" },
    tagline: { ar: "عاصمة التحول", en: "Capital of Transformation" },
    heroImage: "https://www.rcrc.gov.sa/wp-content/uploads/2025/01/%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6-1.jpg.webp",
    intro: {
      ar: "عاصمة تجمع بين قصور الطين التي تروي ميلاد المملكة، وأبراج الزجاج التي تكتب فصلها القادم. في الرياض، تمشي من قصر تاريخي إلى ناطحة سحاب في دقائق معدودة.",
      en: "A capital where mud-brick palaces tell the story of the Kingdom's birth, and glass towers write its next chapter. In Riyadh, you can walk from a historic palace to a skyscraper in minutes."
    },

    categories: {

      historical: [
        {
          id: "masmak",
          name: { ar: "قصر المصمك", en: "Al-Masmak Palace" },
          image: "https://dealapp.sa/blog/wp-content/uploads/2024/09/%D9%82%D8%B5%D8%B1-%D8%A7%D9%84%D9%85%D8%B5%D9%85%D9%83-%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6.jpg",
          description: {
            ar: "حصن طيني شُيّد عام 1865م، ويُعد الشاهد الأبرز على توحيد المملكة العربية السعودية على يد الملك عبدالعزيز عام 1902م. ما تزال آثار الحربة التي انكسر رأسها في بوابته الغربية قائمة إلى اليوم، رمزاً للمعركة التي غيّرت تاريخ شبه الجزيرة العربية. تحوّل القصر إلى متحف يستعرض صوراً ووثائق من مراحل التأسيس.",
            en: "A mud-brick fortress built in 1865, considered the most iconic witness to the unification of Saudi Arabia by King Abdulaziz in 1902. The mark of a broken spear tip is still visible in its western gate, a symbol of the battle that changed the peninsula's history. Today it functions as a museum of photographs and documents from the founding era."
          }
        },
        {
          id: "diriyah",
          name: { ar: "الدرعية وحي الطريف", en: "Diriyah & At-Turaif District" },
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBQAMonMg55dBzAQWIs2Gpj41G810KjU-H2bil98y11ZvHwYRcrAoWR5w&s=10",
          description: {
            ar: "المهد التاريخي لتأسيس الدولة السعودية الأولى، وأحد مواقع التراث العالمي المسجلة لدى اليونسكو. يضم حي الطريف قصوراً وبيوتاً مبنية بالطراز النجدي التقليدي من الطين، وقد أعيد ترميمه بعناية فائقة ليصبح وجهة سياحية وثقافية عالمية، تضم مطاعم ومعارض فنية وسط أجواء تاريخية أصيلة.",
            en: "The historic birthplace of the First Saudi State, and a UNESCO World Heritage site. At-Turaif features palaces and homes built in traditional Najdi mud-brick style, meticulously restored into a world-class cultural destination with restaurants and galleries set among authentic historic surroundings."
          }
        }
      ],

      touristic: [
        {
          id: "najd-village",
          name: { ar: "قرية نجد التراثية", en: "Najd Village" },
          image: "https://live.staticflickr.com/5586/14607045920_84dc0553bb_b.jpg",
          description: {
            ar: "تجربة تراثية متكاملة وسط العاصمة، تعيد تجسيد الحياة النجدية القديمة من خلال البيوت الطينية والمأكولات التقليدية والحرف اليدوية. وجهة محببة للعائلات الراغبة في تذوّق نمط الحياة السعودي الأصيل دون مغادرة الرياض.",
            en: "A full heritage experience in the heart of the capital, recreating traditional Najdi life through mud-brick houses, traditional food, and handicrafts. A favorite for families wanting a taste of authentic Saudi life without leaving Riyadh."
          }
        },
        {
          id: "kingdom-tower",
          name: { ar: "برج المملكة", en: "Kingdom Centre & Sky Bridge" },
          image: "https://saudipedia.com/var/site/storage/images/2/3/0/4/5234032-1-ara-SA/82dfb6ee0756-88618.jpg",
          description: {
            ar: "بارتفاع 302 متر، يُعد برج المملكة أحد أبرز رموز الرياض الحديثة. يضم جسر السماء على القمة، حيث يمكن للزوار عبور الفجوة المعلقة بين البرجين والتمتع بإطلالة بانورامية على العاصمة من ارتفاع 300 متر — تجربة لا تُنسى لمحبي المرتفعات والمناظر الواسعة.",
            en: "Standing 302 meters tall, the Kingdom Centre is one of modern Riyadh's most recognizable landmarks. Its rooftop Sky Bridge lets visitors cross the suspended gap between the towers for a panoramic view of the capital from 300 meters up — an unforgettable experience for anyone who loves heights and skylines."
          }
        },
        {
          id: "bujairi-terrace",
          name: { ar: "البجيري تراس", en: "Bujairi Terrace" },
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwUOvGLZmDZTJKgl_NQ-_Te9bRmmE5DIE-SVAN969Y_OlJEsusn-fRO9U&s=10",
          description: {
            ar: "وجهة طعام راقية تطل مباشرة على حي الطريف التاريخي في الدرعية، تجمع بين أفضل المطاعم العالمية والمحلية وسط عمارة نجدية أصيلة. مكان مثالي لتناول وجبة المساء بينما تتلألأ أضواء الدرعية القديمة في الخلفية.",
            en: "An upscale dining destination overlooking the historic At-Turaif district in Diriyah, blending top local and international restaurants within authentic Najdi architecture. A perfect place for an evening meal as the lights of old Diriyah glow in the background."
          }
        }
      ]
    }
  },

  dubai: {
    slug: "dubai",
    name: { ar: "دبي", en: "Dubai" },
    tagline: { ar: "مدينة المستقبل", en: "City of the Future" },
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80",
    intro: {
      ar: "من أزقة الفهيدي الطينية إلى أعلى برج في العالم، دبي مدينة تعيد تعريف المستحيل كل عقد، دون أن تفقد خيوطها المتصلة بالماضي القريب.",
      en: "From the mud-brick lanes of Al Fahidi to the tallest tower on earth, Dubai is a city that redefines the impossible every decade, without losing its thread to a not-so-distant past."
    },
    // NOTE: Dubai also has NO "religious" key, just like Riyadh —
    // demonstrating the same flexible structure across cities.
    categories: {

      historical: [
        {
          id: "al-fahidi",
          name: { ar: "حي الفهيدي التاريخي", en: "Al Fahidi Historic District" },
          image: "https://www.propertyfinder.ae/blog/wp-content/uploads/2024/01/4-49.jpg",
          description: {
            ar: "أحد أقدم الأحياء في دبي، يعود إلى أواخر القرن التاسع عشر، ويتميز بأبراج الهواء التقليدية (البراجيل) التي كانت تُستخدم لتبريد المنازل قبل عصر التكييف. أزقته الضيقة المرممة تضم اليوم معارض فنية ومقاهي تراثية، وتمنح الزائر لقطة حقيقية من دبي القديمة وسط مدينة تتغير بسرعة.",
            en: "One of Dubai's oldest neighborhoods, dating to the late 19th century, known for traditional wind towers (barjeel) once used to cool homes before air conditioning. Its restored narrow lanes now host art galleries and heritage cafés, offering a genuine glimpse of old Dubai inside a fast-changing city."
          }
        },
        {
          id: "dubai-museum",
          name: { ar: "متحف دبي في حصن الفهيدي", en: "Dubai Museum at Al Fahidi Fort" },
          image: "https://mybayutcdn.bayut.com/mybayut/wp-content/uploads/Dubai-museum-front-side-ar07062020.jpg",
          description: {
            ar: "يقع داخل حصن الفهيدي، أقدم مبنى قائم في دبي والذي يعود تاريخه إلى عام 1787م. يروي المتحف قصة تحوّل دبي من قرية صيد صغيرة على ساحل الخليج إلى مدينة عالمية، من خلال مجسمات ومقتنيات تعرض الحياة التقليدية قبل اكتشاف النفط.",
            en: "Housed inside Al Fahidi Fort, Dubai's oldest standing building, dating back to 1787. The museum tells the story of Dubai's transformation from a small fishing village on the Gulf coast into a global city, through dioramas and artifacts depicting traditional life before oil."
          }
        }
      ],
      religious: [
        {
          id: "jumeirah-mosque",
          name: { ar: "مسجد جميرا", en: "Jumeirah Mosque" },
          image: "https://travelourplanet.com/wp-content/uploads/2021/07/Visitare-la-Jumeirah-Mosque-la-Moschea-Piu-Bella-da-Vedere-a-Dubai-.jpg",
          description: {
            ar: "يُعد من أجمل المساجد في دبي وأكثرها انفتاحاً على الزوار من غير المسلمين، عبر جولات تعريفية منظمة تتيح فهم العمارة الإسلامية وتقاليد الصلاة. بُني على الطراز المملوكي بأحجار بيضاء ناصعة، ويُضاء ليلاً بإضاءة ذهبية تجعله من أكثر المعالم تصويراً في المدينة.",
            en: "One of Dubai's most beautiful mosques and among the most welcoming to non-Muslim visitors through organized guided tours explaining Islamic architecture and prayer traditions. Built in Mamluk style from pristine white stone, it glows gold at night, making it one of the city's most photographed landmarks."
          }
        },
      ],

      touristic: [
        {
          id: "burj-khalifa",
          name: { ar: "برج خليفة", en: "Burj Khalifa" },
          image: "https://d2csxpduxe849s.cloudfront.net/media/42BB6A60-DC5B-4A0B-87CC3E8C248CB543/C8B8C53F-D4FB-47AD-BC8F1EAB4D570E00/webimage-3D0ADACC-95C6-4E46-917F764AC40B7B27.png",
          description: {
            ar: "أطول برج في العالم بارتفاع يتجاوز 828 متراً، ويضم منصات مشاهدة في الطابقين 124 و148 تتيح إطلالة لا حدود لها على مدينة دبي ومياه الخليج. عند الغروب، يتحول البرج إلى لوحة ضوئية مع نافورة دبي المجاورة التي تؤدي عروضاً مائية وموسيقية كل مساء.",
            en: "The tallest building in the world at over 828 meters, with observation decks on floors 124 and 148 offering limitless views over Dubai and the Gulf. At sunset, the tower becomes a canvas of light alongside the neighboring Dubai Fountain, which performs nightly water and music shows."
          }
        },
        {
          id: "dubai-frame",
          name: { ar: "برواز دبي", en: "Dubai Frame" },
          image: "https://www.agoda.com/wp-content/uploads/2020/03/Dubai-Frame-view-attractions-UAE-United-Arab-Emirates.jpg",
          description: {
            ar: "إطار ضخم بارتفاع 150 متراً يفصل بين دبي القديمة ودبي الجديدة بصرياً، حيث يمكن من خلاله مشاهدة كلا الجانبين في لقطة واحدة. يضم جسراً زجاجياً علوياً وتجربة تفاعلية تستعرض مستقبل المدينة المتخيل.",
            en: "A massive 150-meter frame that visually separates old Dubai from new Dubai, letting visitors view both sides in a single glance. It features a glass-floored sky bridge and an interactive exhibit imagining the city's future."
          }
        },
        {
          id: "dubai-marina",
          name: { ar: "دبي مارينا", en: "Dubai Marina" },
          image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/4b/5c/fe/the-view-from-dubai-marina.jpg?w=1200&h=-1&s=1",
          description: {
            ar: "ممشى بحري حديث يمتد بطول 7 كيلومترات حول قناة مائية صناعية، محاط بناطحات سحاب لامعة ويخوت فاخرة ومطاعم على الواجهة المائية. أحد أكثر الأماكن حيوية في دبي للمشي مساءً أو ركوب القوارب التقليدية (العبرة) عبر القناة.",
            en: "A modern 7-kilometer waterfront promenade wrapped around an artificial canal, lined with glittering skyscrapers, luxury yachts, and waterside restaurants. One of Dubai's liveliest spots for an evening walk or a traditional abra boat ride across the canal."
          }
        },
        {
          id: "madinat-jumeirah",
          name: { ar: "سوق مدينة جميرا", en: "Souk Madinat Jumeirah" },
          image: "https://mybayutcdn.bayut.com/mybayut/wp-content/uploads/Sunset-in-Souk-Madinat-Jumeirah.jpg",
          description: {
            ar: "سوق مبني على الطراز العربي التقليدي بقنوات مائية وممرات متعرجة، يجمع بين المتاجر الحرفية والمطاعم الفاخرة وسط أجواء تستحضر الأسواق الخليجية القديمة، مع إطلالة مباشرة على برج العرب الشهير من معظم زواياه.",
            en: "A souk built in traditional Arabian style with winding waterways and alleyways, combining craft shops and upscale dining in an atmosphere evoking old Gulf markets — with direct views of the iconic Burj Al Arab from most of its corners."
          }
        }
      ]
    }
  }
};

window.WAJHATI_CATEGORY_META = CATEGORY_META;
window.WAJHATI_CITY_DATA = CITY_DATA;
