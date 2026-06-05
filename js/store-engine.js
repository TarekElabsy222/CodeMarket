/* ==========================================================================
   CODECYNON - STATE MANAGEMENT & STORAGE ENGINE (localStorage)
   ========================================================================== */

(function() {
  // Global Toast Notification System
  window.showToast = function(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-message toast-${type}`;
    
    let icon = '🔔';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '❌';
    if (type === 'warning') icon = '⚠️';

    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <div class="toast-content">
        <p class="toast-text">${message}</p>
      </div>
      <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
    `;

    container.appendChild(toast);

    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      toast.style.animation = 'toastFadeOut 0.3s ease forwards';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 4000);
  };

  // Override window.alert globally to show toast instead of blocking popup
  window.alert = function(msg) {
    let type = 'info';
    const messageLower = (msg || '').toLowerCase();
    if (messageLower.includes('نجاح') || messageLower.includes('تم') || messageLower.includes('success') || messageLower.includes('بنجاح')) {
      type = 'success';
    } else if (messageLower.includes('خطأ') || messageLower.includes('فشل') || messageLower.includes('error') || messageLower.includes('غير صحيح')) {
      type = 'error';
    } else if (messageLower.includes('تحذير') || messageLower.includes('انتبه') || messageLower.includes('warning') || messageLower.includes('يرجى') || messageLower.includes('الرجاء')) {
      type = 'warning';
    }
    window.showToast(msg, type);
  };

  // Default Seed Categories
  const DEFAULT_CATEGORIES = [
    { id: "js", name: "JS & Next.js", icon: "📦" },
    { id: "php", name: "PHP & Laravel", icon: "🐘" },
    { id: "mobile", name: "تطبيقات الجوال", icon: "📱" },
    { id: "wp", name: "WordPress", icon: "🌐" },
    { id: "templates", name: "قوالب HTML/CSS", icon: "🎨" }
  ];

  // Default Seed Products with multi-image screenshots
  const DEFAULT_PRODUCTS = [
    {
      id: "store-nextjs",
      title: "قالب متجر إلكتروني عصري - CodeStore Pro",
      subtitle: "متجر Next.js 15 فائق السرعة، يدعم Server Components بالكامل، متكامل مع Stripe وسلة تسليم رقمي تلقائي.",
      category: "js",
      priceRegular: 59,
      priceExtended: 249,
      techIcon: "⚛️",
      size: "14.2 MB",
      version: "v2.4.0",
      published: "2025-09-10",
      updated: "2026-05-20",
      author: "م. سليم الهاشمي",
      downloads: 1840,
      rating: 4.90,
      reviewsCount: 184,
      tags: ["Next.js 15", "Tailwind CSS", "Stripe"],
      description: "قالب متجر إلكتروني متكامل مبني باستخدام أحدث تقنيات Next.js 15 و React 19. يتميز المتجر بالأداء الفائق وسرعة التحميل المثالية المتوافقة مع أحدث معايير SEO. يحتوي الكود على لوحة تحكم كاملة لإدارة المخزون، الطلبات، والمنتجات، ويدعم بشكل كامل تكامل الدفع مع Stripe وPayPal مع سلة المشتريات التفاعلية وحفظ الفواتير بصيغة PDF. الكود نظيف جداً ومكتب برسمي تنسيق TypeScript مع هيكل مجلدات متميز لسهولة التطوير والتوسيع.",
      features: [
        "دعم React Server Components (RSC) لسرعة لا تضاهى.",
        "تكامل كلي مع بوابة الدفع الشهيرة Stripe مع صفحة إكمال دفع آمنة.",
        "لوحة تحكم إحصائية كاملة لإدارة الطلبيات والمبيعات والمنتجات.",
        "دعم كامل للغة العربية والاتجاه من اليمين إلى اليسار RTL بشكل افتراضي.",
        "تصميم متجاوب بالكامل باستخدام Tailwind CSS متوافق مع كافة أحجام الشاشات.",
        "متطابق 100% مع معايير محركات البحث SEO وخفيف الوزن للتحميل السريع."
      ],
      changelog: [
        { ver: "v2.4.0", date: "2026-05-20", note: "إضافة خيار الوضع المظلم (Dark Mode) بشكل متكامل، وتحديث توافق المكتبات لـ Next.js 15.0." },
        { ver: "v2.3.1", date: "2026-03-12", note: "تحسين سرعة معالجة سلة المشتريات على أجهزة الأندرويد وإصلاح أخطاء حقول التوثيق." }
      ],
      images: [
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: "rest-laravel",
      title: "نظام إدارة المطاعم والمقاهي المتكامل - CodeRest ERP",
      subtitle: "نظام POS متكامل لإدارة الطاولات، الحسابات والمخازن، متوافق مع هيئة الزكاة والضريبة والجمارك (فاتورة).",
      category: "php",
      priceRegular: 89,
      priceExtended: 349,
      techIcon: "🐘",
      size: "32.5 MB",
      version: "v1.1.2",
      published: "2025-11-05",
      updated: "2026-04-18",
      author: "م. ياسر الحربي",
      downloads: 520,
      rating: 4.82,
      reviewsCount: 92,
      tags: ["Laravel 11", "MySQL", "فواتير"],
      description: "نظام تخطيط موارد المؤسسة (ERP) متكامل لإدارة المطاعم والمقاهي وصالات الطعام. يحتوي على لوحة تحكم كاملة لإدارة الطاولات، المطبخ، الحسابات، الموردين، وإصدار الفواتير الإلكترونية المتوافقة بالكامل مع متطلبات الفوترة الإلكترونية للمرحلة الثانية بالمملكة العربية السعودية (هيئة الزكاة والضريبة والجمارك - فاتورة). يتميز النظام بالقدرة على العمل في بيئات محلية دون اتصال بالإنترنت مع مزامنة سحابية دورية لقاعدة البيانات.",
      features: [
        "توليد الفاتورة الضريبية الإلكترونية بنظام رمز الاستجابة السريع QR المعتمد.",
        "لوحة شاشة المطبخ الفورية (Kitchen Display System) لتلقي طلبات الطاولات.",
        "إدارة كاملة للمخازن، جرد الأغذية والمشروبات، والتنبيه التلقائي لنقص المواد.",
        "صلاحيات مستخدمين متعددة (مدير، كاشير، نادل، محاسب، مشرف مطبخ).",
        "دعم توصيل الطابعات الحرارية المتعددة وبكرات الفواتير مباشرة بكبسة زر.",
        "تقارير محاسبية مفصلة تشمل الأرباح والخسائر اليومية وضريبة القيمة المضافة VAT."
      ],
      changelog: [
        { ver: "v1.1.2", date: "2026-04-18", note: "تطوير ودعم ربط الطابعات المتعددة لخطوط المطبخ والحلويات وإصلاح أخطاء حساب الضريبة للمجموعات." },
        { ver: "v1.0.0", date: "2025-11-05", note: "الإطلاق الأساسي للنظام بمتطلبات الفوترة الإلكترونية." }
      ],
      images: [
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: "school-php",
      title: "منصة إدارة المدارس والطلاب - EduSmart System",
      subtitle: "نظام متكامل للمدارس لإدارة الغياب، الدرجات، الرسوم، مع لوحة تحكم للطلاب وأولياء الأمور والمعلمين.",
      category: "php",
      priceRegular: 69,
      priceExtended: 289,
      techIcon: "🏫",
      size: "24.8 MB",
      version: "v1.8.0",
      published: "2025-08-12",
      updated: "2026-02-10",
      author: "م. سليم الهاشمي",
      downloads: 248,
      rating: 4.75,
      reviewsCount: 48,
      tags: ["PHP Laravel", "MySQL", "Bootstrap 5"],
      description: "منصة ويب سحابية متكاملة لإدارة المدارس والجامعات الأهلية. يوفر النظام 4 لوحات تحكم متكاملة (لوحة المدير العام، لوحة المعلم، لوحة الطالب، ولوحة ولي الأمر) لمتابعة سير العملية التعليمية بكافة تفاصيلها من الحضور والغياب، إدخال العلامات، إصدار الشهادات المدرسية، وجدولة الحصص المدرسية وصولاً لإدارة الحسابات ودفع الرسوم المدرسية إلكترونياً.",
      features: [
        "لوحات تحكم منفصلة وآمنة تماماً لكل مستخدم في السلك التعليمي.",
        "إدارة الحضور والغياب اليومي مع إمكانية إرسال رسائل SMS تلقائية لأولياء الأمور.",
        "منظومة الامتحانات الذكية وتسجيل النتائج وتوليد كشوف العلامات تلقائياً.",
        "إرسال واستقبال الواجبات المنزلية والمهام والملاحظات المدرسية سحابياً.",
        "نظام مالي متميز لمتابعة ودفع الأقساط المدرسية عبر بوابات الدفع الإلكتروني.",
        "دعم استيراد وتصدير بيانات الطلاب والمدرسين عبر ملفات Excel بضغطة زر."
      ],
      changelog: [
        { ver: "v1.8.0", date: "2026-02-10", note: "تحسين لوحة المعلمين وإضافة ميزة الواجبات التفاعلية مع دعم رفع الملفات الكبيرة حتى 50 ميغابايت." }
      ],
      images: [
        "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: "delivery-flutter",
      title: "تطبيق توصيل طلبات متكامل - GoDelivo Flutter",
      subtitle: "تطبيق جوال كامل للزبون والمندوب والمحل التجاري مع نظام محادثة وتتبع خرائط فوري بنظام GPS.",
      category: "mobile",
      priceRegular: 129,
      priceExtended: 499,
      techIcon: "📱",
      size: "48.2 MB",
      version: "v3.0.1",
      published: "2025-10-22",
      updated: "2026-05-18",
      author: "م. منيرة القحطاني",
      downloads: 412,
      rating: 4.95,
      reviewsCount: 122,
      tags: ["Flutter Cross", "Node.js API", "Map GPS"],
      description: "حزمة برمجية متكاملة لبناء مشروع توصيل فوري محلي. تشمل الحزمة 3 تطبيق جوال مبنية بـ Flutter (تطبيق الزبون لطلب المنتجات، تطبيق المندوب لتلقي طلبات التوصيل وتتبع المسار، وتطبيق صاحب المتجر لإدارة وتجهيز الطلبات) بالإضافة إلى لوحة تحكم إدارية مركزية مبنية بـ Next.js مع سيرفر خلفي سريع بـ Node.js وقاعدة بيانات MongoDB.",
      features: [
        "تتبع فوري ومباشر لموقع المندوب على الخريطة بنظام GPS والخرائط التفاعلية.",
        "نظام محادثة فورية مدمج (Chat Real-time) بين الزبون والمندوب والمحل.",
        "إشعارات فورية جذابة (Push Notifications) عبر Firebase لجميع الأطراف.",
        "يدعم الدفع ببطاقات الائتمان ومدى وحسابات Apple Pay وGoogle Pay.",
        "نظام تقييم ومراجعة للخدمة لزيادة الجودة وثقة العملاء.",
        "أكواد Flutter نظيفة جداً بتصميم ناعم ومقسمة حسب معمارية Bloc ونظام الألوان HSL."
      ],
      changelog: [
        { ver: "v3.0.1", date: "2026-05-18", note: "تحديث شاشات الخرائط وتجاوز مشكلة تعليق الموقع في الخلفية على أجهزة iOS 18 ومزامنة إشعارات Firebase." }
      ],
      images: [
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: "chat-rn",
      title: "تطبيق محادثة فوري مشفر - Chatty Messenger",
      subtitle: "تطبيق شات مشفر للرسائل النصية والملفات والصور، يدعم غرف المجموعات والإشعارات والتكامل مع Firebase.",
      category: "mobile",
      priceRegular: 79,
      priceExtended: 299,
      techIcon: "💬",
      size: "18.5 MB",
      version: "v1.2.0",
      published: "2025-12-15",
      updated: "2026-03-30",
      author: "م. منيرة القحطاني",
      downloads: 198,
      rating: 4.88,
      reviewsCount: 65,
      tags: ["React Native", "Firebase Chat", "AES-256"],
      description: "كود مصدري كامل لتطبيق محادثة فوري احترافي مشفر يعتمد على بروتوكولات الأمان العالية AES-256. التطبيق مبني بالكامل بتقنية React Native مما يعني أنه يعمل بكفاءة قصوى على كل من هواتف الأندرويد والآيفون. يعتمد النظام على Firebase Firestore و Firebase Storage للحصول على سرعة فائقة في مزامنة الرسائل وتحميل الصور والملفات الفورية.",
      features: [
        "تشفير كامل للرسائل والوسائط (End-to-End Encryption) لحماية خصوصية المستخدمين.",
        "يدعم إرسال الرسائل النصية، الصور، الملفات، والمواقع الجغرافية بنعومة وسرعة.",
        "إمكانية إنشاء محادثات ثنائية أو غرف مجموعات (Group Chats) غير محدودة الأعضاء.",
        "حفظ حالة قراءة الرسائل (Read Receipts) ومؤشر الكتابة الفوري (Typing Indicator).",
        "ميزة قفل التطبيق بالبصمة أو FaceID لزيادة الأمان الشخصي للمستخدم.",
        "توثيق تسجيل الدخول عبر رقم الجوال SMS أو الحسابات الاجتماعية (Google/Apple)."
      ],
      changelog: [
        { ver: "v1.2.0", date: "2026-03-30", note: "إضافة تشفير الملفات والوسائط بالكامل، وتحديث مكتبة التوثيق وحل أخطاء تشغيل التطبيق في الخلفية." }
      ],
      images: [
        "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: "multivendor-wp",
      title: "قالب متجر متعدد التجار معرّب - MultiArabia",
      subtitle: "قالب WooCommerce احترافي لإنشاء متجر يتيح للبائعين فتح حساب وعرض منتجاتهم مقابل نسبة عمولة.",
      category: "wp",
      priceRegular: 39,
      priceExtended: 189,
      techIcon: "🌐",
      size: "11.4 MB",
      version: "v2.1.0",
      published: "2025-07-15",
      updated: "2026-04-20",
      author: "م. ياسر الحربي",
      downloads: 710,
      rating: 4.70,
      reviewsCount: 144,
      tags: ["WordPress Theme", "WooCommerce", "RTL Ready"],
      description: "قالب ووردبريس احترافي متكامل لبناء منصة تجارة إلكترونية متعددة التجار (مثل سوق كوم أو أمازون). القالب معرّب ومترجم بالكامل 100% ومتوافق مع الاتجاه RTL، ومبني ليعمل بكفاءة عالية مع إضافات WooCommerce وDokan المشهورة لتمكين البائعين من عرض منتجاتهم، تتبع شحناتهم، والتحكم بحساباتهم عبر لوحة تحكم خاصة بكل بائع، مع احتساب عمولة تلقائية للمنصة الأم.",
      features: [
        "تصميم عربي فاخر متوافق تماماً مع محرر الصفحات الشهير Elementor لسهولة التعديل.",
        "لوحة تحكم معربة بالكامل لكل تاجر لإدخال المنتجات وإدارة كوبونات الخصم والطلبات الخاصة به.",
        "نظام عمولات متطور يتيح لصاحب الموقع تحديد نسبة عمولة عامة أو مخصصة لكل بائع.",
        "متوافق مع بوابات دفع متعددة تشمل بطاقات مدى، البطاقات الائتمانية والتحويلات البنكية.",
        "نظام سحب الأرباح للتجار يدعم طلبات التحويل البنكي أو السحب الفوري التلقائي.",
        "قالب سريع وخفيف جداً، مع تثبيت تجريبي للموقع بضغطة زر واحدة (1-Click Demo Import)."
      ],
      changelog: [
        { ver: "v2.1.0", date: "2026-04-20", note: "تحديث التوافق مع إصدار WordPress 6.5 وWooCommerce 8.8 وإصلاح أخطاء حاسبة الشحن للبائعين." }
      ],
      images: [
        "https://images.unsplash.com/photo-1561883088-2792d0674db0?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
      ]
    }
  ];

  // Default Users Database Seed
  const DEFAULT_USERS = [
    { name: "عبدالمحسن التميمي", email: "admin@codecynon.com", password: "admin", role: "admin" },
    { name: "أحمد العتيبي", email: "ahmad@gmail.com", password: "ahmad", role: "client" }
  ];

  // Initialize DB in localStorage
  function initStorage() {
    if (!localStorage.getItem("codecynon_categories")) {
      localStorage.setItem("codecynon_categories", JSON.stringify(DEFAULT_CATEGORIES));
    }
    if (!localStorage.getItem("codecynon_products")) {
      localStorage.setItem("codecynon_products", JSON.stringify(DEFAULT_PRODUCTS));
    }
    if (!localStorage.getItem("codecynon_cart")) {
      localStorage.setItem("codecynon_cart", JSON.stringify([]));
    }
    if (!localStorage.getItem("codecynon_favorites")) {
      localStorage.setItem("codecynon_favorites", JSON.stringify([]));
    }
    if (!localStorage.getItem("codecynon_users")) {
      localStorage.setItem("codecynon_users", JSON.stringify(DEFAULT_USERS));
    }
    if (!localStorage.getItem("codecynon_orders")) {
      // Seed default order
      const seedOrders = [
        {
          id: "TXN-8842109",
          date: "2026-05-24",
          productTitle: "قالب متجر إلكتروني عصري - CodeStore Pro",
          productId: "store-nextjs",
          price: 59,
          license: "regular",
          licenseKey: "CC-NEXT-7421-XXXX",
          name: "أحمد العتيبي",
          email: "ahmad@gmail.com"
        }
      ];
      localStorage.setItem("codecynon_orders", JSON.stringify(seedOrders));
    }
  }

  initStorage();

  // Helper Functions
  window.StoreEngine = {
    // 1. Products API
    getProducts: function() {
      return JSON.parse(localStorage.getItem("codecynon_products")) || [];
    },
    getProductById: function(id) {
      const prods = this.getProducts();
      return prods.find(p => p.id === id);
    },
    addProduct: function(prod) {
      const prods = this.getProducts();
      // Insert seeded mockup images automatically if not supplied
      if (!prod.images || prod.images.length === 0) {
        prod.images = [
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80"
        ];
      }
      prods.unshift(prod);
      localStorage.setItem("codecynon_products", JSON.stringify(prods));
      return true;
    },
    deleteProduct: function(id) {
      let prods = this.getProducts();
      prods = prods.filter(p => p.id !== id);
      localStorage.setItem("codecynon_products", JSON.stringify(prods));
      return true;
    },

    // 2. Categories API
    getCategories: function() {
      return JSON.parse(localStorage.getItem("codecynon_categories")) || [];
    },
    addCategory: function(cat) {
      const cats = this.getCategories();
      if (!cats.some(c => c.id === cat.id)) {
        cats.push(cat);
        localStorage.setItem("codecynon_categories", JSON.stringify(cats));
        return true;
      }
      return false;
    },
    deleteCategory: function(id) {
      let cats = this.getCategories();
      cats = cats.filter(c => c.id !== id);
      localStorage.setItem("codecynon_categories", JSON.stringify(cats));
      return true;
    },

    // 3. Cart API
    getCart: function() {
      return JSON.parse(localStorage.getItem("codecynon_cart")) || [];
    },
    addToCart: function(id, license, price) {
      const cart = this.getCart();
      const existing = cart.find(item => item.id === id && item.license === license);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ id, license, price, qty: 1 });
      }
      localStorage.setItem("codecynon_cart", JSON.stringify(cart));
      this.updateHeaderBadges();
      return true;
    },
    removeFromCart: function(id, license) {
      let cart = this.getCart();
      cart = cart.filter(item => !(item.id === id && item.license === license));
      localStorage.setItem("codecynon_cart", JSON.stringify(cart));
      this.updateHeaderBadges();
      return true;
    },
    updateCartQty: function(id, license, qty) {
      const cart = this.getCart();
      const item = cart.find(item => item.id === id && item.license === license);
      if (item) {
        item.qty = parseInt(qty) || 1;
        localStorage.setItem("codecynon_cart", JSON.stringify(cart));
      }
      this.updateHeaderBadges();
      return true;
    },
    clearCart: function() {
      localStorage.setItem("codecynon_cart", JSON.stringify([]));
      this.updateHeaderBadges();
    },

    // 4. Favorites (Wishlist) API
    getFavorites: function() {
      return JSON.parse(localStorage.getItem("codecynon_favorites")) || [];
    },
    isFavorite: function(id) {
      const favs = this.getFavorites();
      return favs.includes(id);
    },
    toggleFavorite: function(id) {
      let favs = this.getFavorites();
      let added = false;
      if (favs.includes(id)) {
        favs = favs.filter(fId => fId !== id);
      } else {
        favs.push(id);
        added = true;
      }
      localStorage.setItem("codecynon_favorites", JSON.stringify(favs));
      this.updateHeaderBadges();
      return added;
    },

    // 5. Orders API
    getOrders: function() {
      return JSON.parse(localStorage.getItem("codecynon_orders")) || [];
    },
    addOrder: function(order) {
      const orders = this.getOrders();
      orders.unshift(order);
      localStorage.setItem("codecynon_orders", JSON.stringify(orders));

      // Also increment download counter for purchased products in catalog
      const prods = this.getProducts();
      const p = prods.find(item => item.id === order.productId);
      if (p) {
        p.downloads = (p.downloads || 0) + 1;
        localStorage.setItem("codecynon_products", JSON.stringify(prods));
      }
      return true;
    },

    // 6. Users & Authentication API
    getUsers: function() {
      return JSON.parse(localStorage.getItem("codecynon_users")) || [];
    },
    getCurrentUser: function() {
      return JSON.parse(localStorage.getItem("codecynon_current_user")) || null;
    },
    login: function(email, password) {
      const users = this.getUsers();
      const found = users.find(u => u.email === email && u.password === password);
      if (found) {
        localStorage.setItem("codecynon_current_user", JSON.stringify(found));
        return true;
      }
      return false;
    },
    register: function(name, email, password, role = 'client') {
      const users = this.getUsers();
      if (users.some(u => u.email === email)) {
        return false; // Email already taken
      }
      const newUser = { name, email, password, role };
      users.push(newUser);
      localStorage.setItem("codecynon_users", JSON.stringify(users));
      localStorage.setItem("codecynon_current_user", JSON.stringify(newUser));
      return true;
    },
    logout: function() {
      localStorage.removeItem("codecynon_current_user");
      window.location.href = "index.html";
    },

    // 7. Header Badges Update
    updateHeaderBadges: function() {
      const cartBadge = document.getElementById("header-cart-count");
      const favBadge = document.getElementById("header-fav-count");
      
      if (cartBadge) {
        const cartCount = this.getCart().reduce((sum, item) => sum + item.qty, 0);
        cartBadge.textContent = cartCount;
        cartBadge.style.display = cartCount > 0 ? "flex" : "none";
      }
      if (favBadge) {
        const favCount = this.getFavorites().length;
        favBadge.textContent = favCount;
        favBadge.style.display = favCount > 0 ? "flex" : "none";
      }
    },

    updateProduct: function(id, updatedProd) {
      const prods = this.getProducts();
      const idx = prods.findIndex(p => p.id === id);
      if (idx !== -1) {
        prods[idx] = { ...prods[idx], ...updatedProd };
        localStorage.setItem("codecynon_products", JSON.stringify(prods));
        return true;
      }
      return false;
    },

    addUser: function(user) {
      const users = this.getUsers();
      if (users.some(u => u.email === user.email)) {
        return false;
      }
      users.push(user);
      localStorage.setItem("codecynon_users", JSON.stringify(users));
      return true;
    },

    updateUser: function(email, updatedUser) {
      const users = this.getUsers();
      const idx = users.findIndex(u => u.email === email);
      if (idx !== -1) {
        users[idx] = { ...users[idx], ...updatedUser };
        localStorage.setItem("codecynon_users", JSON.stringify(users));
        
        // Also update current active user session if they changed their own details
        const currentUser = this.getCurrentUser();
        if (currentUser && currentUser.email === email) {
          localStorage.setItem("codecynon_current_user", JSON.stringify(users[idx]));
        }
        return true;
      }
      return false;
    },

    deleteUser: function(email) {
      let users = this.getUsers();
      const initialLength = users.length;
      users = users.filter(u => u.email !== email);
      if (users.length < initialLength) {
        localStorage.setItem("codecynon_users", JSON.stringify(users));
        return true;
      }
      return false;
    },

    resetData: function() {
      localStorage.removeItem("codecynon_categories");
      localStorage.removeItem("codecynon_products");
      localStorage.removeItem("codecynon_cart");
      localStorage.removeItem("codecynon_favorites");
      localStorage.removeItem("codecynon_orders");
      localStorage.removeItem("codecynon_users");
      localStorage.removeItem("codecynon_current_user");
      initStorage();
      this.updateHeaderBadges();
      return true;
    }
  };

  // Auth Protection and Header/Footer Synchronization on load
  document.addEventListener("DOMContentLoaded", function() {
    const path = window.location.pathname;
    const user = window.StoreEngine.getCurrentUser();

    // 1. Role-based Gating Rules
    if (path.includes('admin-')) {
      if (!user || user.role !== 'admin') {
        alert('الدخول متاح للمسؤولين فقط! يرجى تسجيل الدخول بحساب الإدارة.');
        window.location.href = 'login.html?redirect=' + path.substring(path.lastIndexOf('/') + 1);
        return;
      }
    }
    if (path.endsWith('downloads.html') || path.endsWith('submit-request.html')) {
      if (!user) {
        alert('هذه الصفحة تتطلب تسجيل الدخول. يرجى تسجيل الدخول أولاً.');
        window.location.href = 'login.html?redirect=' + path.substring(path.lastIndexOf('/') + 1);
        return;
      }
    }

    // 2. Dynamic Nav Links Synchronization
    const navLinksUl = document.querySelector('.main-nav ul');
    if (navLinksUl) {
      const activeClass = (file) => (file === 'admin-portal.html' ? path.includes('admin-') : path.endsWith(file)) ? 'active' : '';
      let navHtml = `
        <li><a href="index.html" class="nav-link ${activeClass('index.html') || activeClass('/')}">الرئيسية</a></li>
        <li><a href="store.html" class="nav-link ${activeClass('store.html')}">المتجر</a></li>
      `;
      if (user && user.role === 'admin') {
        navHtml += `<li><a href="admin-portal.html" class="nav-link ${activeClass('admin-portal.html')}">لوحة الإدارة</a></li>`;
      }
      navHtml += `<li><a href="downloads.html" class="nav-link ${activeClass('downloads.html')}">مركز التحميل</a></li>`;
      navLinksUl.innerHTML = navHtml;
    }

    // 3. Dynamic Profile / Header Actions Synchronization
    const actionsArea = document.querySelector('.header-actions');
    if (actionsArea) {
      const cartCount = window.StoreEngine.getCart().reduce((sum, item) => sum + item.qty, 0);
      const favCount = window.StoreEngine.getFavorites().length;

      let actionsHtml = `
        <!-- Wishlist Button -->
        <a href="cart.html#wishlist" class="icon-btn" style="position:relative; margin-left: 14px; font-size:1.3rem; text-decoration:none;" title="المفضلة">
          ❤️
          <span class="badge-count en-nums" id="header-fav-count" style="position:absolute; top:-8px; left:-8px; background-color:var(--danger); color:white; font-size:0.7rem; font-weight:800; border-radius:50%; width:18px; height:18px; display:${favCount > 0 ? 'flex' : 'none'}; align-items:center; justify-content:center;">${favCount}</span>
        </a>
        
        <!-- Cart Button -->
        <a href="cart.html" class="icon-btn" style="position:relative; margin-left: 20px; font-size:1.3rem; text-decoration:none;" title="سلة المشتريات">
          🛒
          <span class="badge-count en-nums" id="header-cart-count" style="position:absolute; top:-8px; left:-8px; background-color:var(--primary); color:white; font-size:0.7rem; font-weight:800; border-radius:50%; width:18px; height:18px; display:${cartCount > 0 ? 'flex' : 'none'}; align-items:center; justify-content:center;">${cartCount}</span>
        </a>

        <a href="submit-request.html" class="btn btn-primary" style="margin-left: 12px;">
          اطلب مشروعك الخاص
        </a>
      `;

      if (user) {
        actionsHtml += `
          <div class="user-profile-menu" style="position:relative; display:inline-block;">
            <a href="#" class="profile-trigger" id="profile-dropdown-trigger" style="border-radius: var(--radius-lg); display:flex; align-items:center; gap:8px; text-decoration:none; padding: 6px 12px; background: rgba(255,255,255,0.05); border: 1px solid var(--border-light);">
              <div class="user-meta-header" style="text-align:right;">
                <span class="user-name" style="color:var(--text-primary); font-weight:700; display:block; font-size:0.85rem;">Hello ${user.name}</span>
              </div>
            </a>
            <div id="profile-dropdown-menu" style="display:none; position:absolute; left:0; top:100%; background:var(--bg-primary); border:1px solid var(--border-light); border-radius:var(--radius-md); box-shadow:var(--shadow-lg); width:160px; z-index:1000; padding:8px 0; margin-top:8px; text-align:right;">
              <a href="downloads.html" style="display:block; padding:8px 16px; color:var(--text-primary); text-decoration:none; font-size:0.85rem; transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='none'">مركز التحميل</a>
              ${user.role === 'admin' ? `<a href="admin-portal.html" style="display:block; padding:8px 16px; color:var(--text-primary); text-decoration:none; font-size:0.85rem; transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='none'">لوحة الإدارة</a>` : ''}
              <a href="#" id="header-logout-btn" style="display:block; padding:8px 16px; color:var(--danger); text-decoration:none; font-size:0.85rem; border-top:1px solid var(--border-light); transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='none'">تسجيل الخروج</a>
            </div>
          </div>
        `;
      } else {
        actionsHtml += `
          <a href="login.html" class="btn btn-outline" style="font-weight:700; font-size:0.85rem; padding: 8px 16px; margin-right:6px;">تسجيل الدخول</a>
          <a href="register.html" class="btn btn-primary" style="font-weight:700; font-size:0.85rem; padding: 8px 16px;">إنشاء حساب</a>
        `;
      }

      actionsArea.innerHTML = actionsHtml;

      // Dropdown toggle logic
      const dropdownTrigger = document.getElementById('profile-dropdown-trigger');
      const dropdownMenu = document.getElementById('profile-dropdown-menu');
      if (dropdownTrigger && dropdownMenu) {
        dropdownTrigger.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
        });
        document.addEventListener('click', function() {
          dropdownMenu.style.display = 'none';
        });
      }

      // Logout button click binding
      const logoutBtn = document.getElementById('header-logout-btn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
          e.preventDefault();
          window.StoreEngine.logout();
        });
      }
    }

    // Sync header badges counts
    window.StoreEngine.updateHeaderBadges();

    // Check for pending toast notification
    const pendingToast = sessionStorage.getItem('pending_toast');
    if (pendingToast) {
      try {
        const { message, type } = JSON.parse(pendingToast);
        setTimeout(() => {
          window.showToast(message, type);
        }, 300);
      } catch (e) {}
      sessionStorage.removeItem('pending_toast');
    }
  });
})();
