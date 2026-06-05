/* ==========================================================================
   CODECYNON - INITIAL DATA STORE
   ========================================================================== */

export const INITIAL_DEVELOPERS = [
  {
    id: "dev-1",
    name: "م. سليم الهاشمي",
    title: "مطور ويب متكامل وخبير سحابي Senior Fullstack",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
    rating: 4.92,
    reviewsCount: 148,
    badge: "خبير معتمد",
    completedProjects: 87,
    skills: ["React", "Node.js", "AWS", "Python", "PostgreSQL"]
  },
  {
    id: "dev-2",
    name: "م. منيرة القحطاني",
    title: "أخصائية تطبيقات الجوال وتصميم UI/UX Expert",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
    rating: 4.88,
    reviewsCount: 96,
    badge: "مطور نخبة",
    completedProjects: 42,
    skills: ["Flutter", "Swift", "Figma", "Firebase", "Dart"]
  },
  {
    id: "dev-3",
    name: "م. ياسر الحربي",
    title: "مطور أنظمة خلفية وقواعد بيانات Senior Backend Engineer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80",
    rating: 4.79,
    reviewsCount: 65,
    badge: "مطور محترف",
    completedProjects: 31,
    skills: ["Go", "Docker", "MongoDB", "Kubernetes", "Redis"]
  }
];

export const INITIAL_PROJECTS = [
  {
    id: "proj-101",
    title: "نظام إدارة الموارد للمؤسسات المتوسطة (ERP)",
    category: "web-systems",
    type: "full-system",
    status: "proposal", // New, Under Review, Proposal Sent, Approved, In Development, Testing, Ready For Delivery, Completed, Cancelled
    budget: "5,000$ - 7,000$",
    budgetMin: 5000,
    budgetMax: 7000,
    deadline: "45 يوم",
    priority: "high",
    developerId: null,
    dateSubmitted: "2026-05-28",
    description: "تطوير لوحة تحكم سحابية لإدارة الحسابات والمخازن وحضور الموظفين للمحلات التجارية الكبرى، وربطها بأنظمة المحاسبة السعودية المتوافقة مع هيئة الزكاة والضريبة والجمارك (فاتورة).",
    features: "إصدار فواتير ضريبية إلكترونية، لوحة تحكم إحصائية للرؤساء، إدارة كاملة للمخازن، صلاحيات متقدمة للموظفين، أمان مشدد للبيانات",
    targetAudience: "أصحاب الأعمال والمتاجر الكبرى والشركات المتوسطة",
    references: "مثال على النظام المطلوب: Stripe Dashboard و Odoo ERP",
    additionalNotes: "أرجو الاهتمام الكامل بواجهات الجوال للوحة التحكم.",
    attachments: [
      { name: "technical_specs.pdf", size: "1.4 MB", type: "pdf" },
      { name: "database_schema_v1.png", size: "850 KB", type: "image" }
    ],
    proposals: [
      {
        id: "prop-1",
        developerId: "dev-1",
        price: 5200,
        days: 40,
        coverLetter: "أهلاً بك يا أخي أحمد، لقد قرأت تفاصيل مشروعك بدقة. قمت مسبقاً ببناء 3 أنظمة ERP متوافقة مع متطلبات الفوترة الإلكترونية. يمكنني توفير لوحة تحكم سريعة للغاية مبنية بـ React و Node.js مع استضافة آمنة على AWS.",
        rating: 4.92
      },
      {
        id: "prop-2",
        developerId: "dev-3",
        price: 4900,
        days: 45,
        coverLetter: "مرحباً أحمد. أنا خبير في قواعد البيانات والأنظمة الخلفية. يمكنني تصميم نظام ERP متين للغاية باستخدام Go وبنية قواعد بيانات مرنة تتحمل الضغط العالي. سأضمن لك سرعة فائقة في معالجة العمليات الحسابية وتوليد التقارير.",
        rating: 4.79
      }
    ],
    messages: [
      {
        sender: "admin",
        text: "مرحباً بك يا أحمد، تم إرسال مشروعك للمراجعة وتمت الموافقة عليه بنجاح. المطورون الآن يقدمون عروضهم للمشروع.",
        time: "10:15 AM",
        date: "2026-05-28"
      }
    ],
    files: []
  },
  {
    id: "proj-102",
    title: "تطبيق الهواتف لمتجر توصيل المنتجات الرقمية",
    category: "mobile-apps",
    type: "full-system",
    status: "development",
    budget: "2,000$ - 3,500$",
    budgetMin: 2000,
    budgetMax: 3500,
    deadline: "30 يوم",
    priority: "medium",
    developerId: "dev-2", // Assigned to Monira
    dateSubmitted: "2026-05-15",
    description: "تطبيق توصيل يعمل على نظامي أندرويد وآي أو إس لطلب وتحميل المنتجات الرقمية تلقائياً بمجرد إتمام الدفع مع نظام محادثة فورية للدعم الفني.",
    features: "تحميل تلقائي للملفات، تكامل مع Stripe، إشعارات فورية عبر Firebase، نظام محادثة للدعم، لوحة تحكم للمبيعات",
    targetAudience: "مستخدمي الهواتف الذكية ومشتري الألعاب والكتب الرقمية",
    references: "تصميم واجهات ناعم مثل تطبيق Apple Wallet",
    additionalNotes: "الملفات جاهزة للتصميم على Figma وسأقوم بمشاركتها بعد الموافقة.",
    attachments: [
      { name: "figma_designs.link", size: "1 KB", type: "link" }
    ],
    proposals: [
      {
        id: "prop-3",
        developerId: "dev-2",
        price: 2800,
        days: 28,
        coverLetter: "مرحباً، يسعدني جداً العمل على هذا المشروع. أنا متخصصة في Flutter و UI/UX. سأقوم بتطوير تطبيق ناعم وسريع للغاية مع تطبيق نظام التحميل الذكي وحفظ الفواتير في Apple Wallet.",
        rating: 4.88
      }
    ],
    messages: [
      {
        sender: "client",
        text: "مرحباً مهندسة منيرة. هل يمكننا البدء بتصميم شاشات الدخول والملف الشخصي أولاً؟",
        time: "02:30 PM",
        date: "2026-05-16"
      },
      {
        sender: "developer",
        text: "بالتأكيد أخي أحمد. سأقوم بمشاركة تصاميم Figma الأولية لك بحلول مساء الغد لمراجعتها واعتمادها.",
        time: "03:10 PM",
        date: "2026-05-16"
      },
      {
        sender: "developer",
        text: "لقد أضفت شاشات الدفع والتحميل أيضاً. يرجى مراجعة الرابط المرفق.",
        time: "08:45 PM",
        date: "2026-05-17"
      }
    ],
    files: [
      { id: "f-1", name: "Source_Code_Draft.zip", category: "src", size: "8.4 MB", uploadedBy: "developer", version: "v0.1.0", date: "2026-05-25" },
      { id: "f-2", name: "UI_Design_Prototypes.pdf", category: "assets", size: "4.2 MB", uploadedBy: "developer", version: "v1.0.0", date: "2026-05-18" }
    ]
  },
  {
    id: "proj-103",
    title: "موقع حجز الفنادق الفاخرة مع نظام ذكاء اصطناعي",
    category: "web-systems",
    type: "feature-addition",
    status: "completed",
    budget: "4,000$ - 6,000$",
    budgetMin: 4000,
    budgetMax: 6000,
    deadline: "60 يوم",
    priority: "low",
    developerId: "dev-1", // Assigned to Saleem
    dateSubmitted: "2026-04-10",
    description: "منصة ويب متكاملة تقدم خدمة البحث الذكي وحجز المنتجعات الفندقية الفاخرة عبر خوارزميات اقتراح ذكية تحلل تفضيلات العميل السابقة.",
    features: "نظام البحث والتصفية المتقدم، محرك التوصيات بالذكاء الاصطناعي، خرائط تفاعلية، إدارة الفنادق للشركاء",
    targetAudience: "السياح والمسافرين الباحثين عن حجز فنادق فخمة",
    references: "موقع Airbnb بتصميم أكثر فخامة وخصوصية",
    additionalNotes: "",
    attachments: [],
    proposals: [
      {
        id: "prop-4",
        developerId: "dev-1",
        price: 5500,
        days: 55,
        coverLetter: "يسعدني تقديم عرض لهذا المشروع الكبير. سأستخدم Python (FastAPI) للذكاء الاصطناعي و Next.js للواجهة الأمامية السريعة والمتجاوبة مع محركات البحث.",
        rating: 4.92
      }
    ],
    messages: [
      {
        sender: "developer",
        text: "أخي أحمد، تم الانتهاء من دمج خريطة الفنادق والذكاء الاصطناعي. يمكنك فحص الملفات المرفوعة بالكامل.",
        time: "09:00 AM",
        date: "2026-05-10"
      },
      {
        sender: "client",
        text: "رائع جداً! تم الفحص والاعتماد وكل شيء يعمل بسلاسة فائقة. شكراً لجهودك الاحترافية.",
        time: "11:20 AM",
        date: "2026-05-11"
      }
    ],
    files: [
      { id: "f-3", name: "Full_Project_Source.zip", category: "src", size: "42.8 MB", uploadedBy: "developer", version: "v1.0.0", date: "2026-05-10" },
      { id: "f-4", name: "Installation_Guide.md", category: "docs", size: "24 KB", uploadedBy: "developer", version: "v1.0.0", date: "2026-05-10" },
      { id: "f-5", name: "Database_Backup.sql", category: "db", size: "1.2 MB", uploadedBy: "developer", version: "v1.0.0", date: "2026-05-10" },
      { id: "f-6", name: "Vector_Assets_Pack.zip", category: "assets", size: "18.5 MB", uploadedBy: "developer", version: "v1.0.0", date: "2026-05-09" }
    ],
    delivery: {
      date: "2026-05-11",
      notes: "تم تسليم النظام بكافة ملفاته وقواعد بياناته وشرح مفصل لخطوات التركيب والتشغيل على خوادم AWS.",
      files: [
        { name: "Full_Project_Source.zip", size: "42.8 MB", type: "src", version: "v1.0.0" },
        { name: "Database_Backup.sql", size: "1.2 MB", type: "db", version: "v1.0.0" },
        { name: "Installation_Guide.md", size: "24 KB", type: "docs", version: "v1.0.0" },
        { name: "Vector_Assets_Pack.zip", size: "18.5 MB", type: "assets", version: "v1.0.0" }
      ]
    },
    review: {
      rating: 5,
      comment: "مهندس سليم متميز للغاية، دقيق في المواعيد، وكود نظيف جداً ومنظم. أنصح بشدة بالتعامل معه."
    }
  }
];

export const INITIAL_PRODUCTS = [
  {
    id: "prod-1",
    name: "قالب متجر إلكتروني عصري - CodeStore Next.js",
    version: "v2.4.0",
    lastUpdated: "2026-05-20",
    downloadsCount: 1840,
    size: "14.2 MB",
    type: "قوالب جاهزة",
    releaseNotes: "تحسين سرعة الفتح بمعدل 40%، إضافة دعم لـ React Server Components، دمج كلي لبوابة دفع Stripe.",
    license: "رخصة تجارية للاستخدام الفردي (Single Commercial License)",
    changelog: [
      { version: "v2.4.0", date: "2026-05-20", note: "إضافة خيار Dark Mode، وتوافق كامل مع Next.js 15." },
      { version: "v2.3.1", date: "2026-03-12", note: "إصلاح خطأ سلة المشتريات وتحديث الأيقونات." }
    ]
  },
  {
    id: "prod-2",
    name: "نظام إدارة المطاعم والمقاهي المتكامل - CodeRest Pro",
    version: "v1.1.2",
    lastUpdated: "2026-04-18",
    downloadsCount: 520,
    size: "32.5 MB",
    type: "برمجيات كاملة",
    releaseNotes: "إضافة خيار الطابعات المتعددة في المطبخ، تحسين واجهات الكاشير، إضافة لوحة تقارير الأرباح الشهرية.",
    license: "رخصة المطورين غير المحدودة (Unlimited Developer License)",
    changelog: [
      { version: "v1.1.2", date: "2026-04-18", note: "دعم الطابعات الحرارية وإصلاح أخطاء حساب الضريبة." }
    ]
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "not-1",
    text: "تم إرسال عرض جديد لمشروعك 'ERP' من قبل م. سليم الهاشمي.",
    time: "منذ ساعة",
    unread: true,
    link: "#project/proj-101"
  },
  {
    id: "not-2",
    text: "قامت م. منيرة القحطاني بتحديث ملفات العمل في تطبيق متجر التوصيل.",
    time: "منذ يومين",
    unread: false,
    link: "#project/proj-102"
  }
];
