/* ==========================================================================
   CODECYNON - LANDING PAGE RENDERER
   ========================================================================== */

import State from '../state.js';

export function renderLanding(container) {
  container.innerHTML = `
    <div class="landing-wrapper fade-in">
      
      <!-- 1. Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <div class="hero-tag">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            منصة المشاريع البرمجية رقم #1 بالوطن العربي
          </div>
          <h1 class="hero-title">حول أفكارك الرقمية إلى <span>أنظمة واقعية</span></h1>
          <p class="hero-desc">لا داعي للقلق بشأن جودة البرمجة أو الالتزام بالتسليم. في كودساينون نقوم بربطك بنخبة المطورين المعتمدين مع ضمان مالي برمجى متكامل بنسبة 100%.</p>
          <div class="hero-ctas">
            <a href="#submit-request" class="btn btn-lg btn-primary">
              اطلب مشروعك الخاص الآن
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </a>
            <a href="#client-dashboard" class="btn btn-lg btn-outline">تصفح لوحة التحكم الخاصة بك</a>
          </div>
        </div>
        
        <div class="hero-visual">
          <div class="hero-img-card">
            <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&q=80" alt="فريق تطوير كودساينون المعتمد">
          </div>
        </div>
      </section>

      <!-- 2. Statistics Section -->
      <section class="stats-section">
        <div class="stat-card">
          <div class="stat-number">+150</div>
          <div class="stat-label">مشروعاً مخصصاً منفذاً</div>
          <div class="stat-desc">تم تسليمها بنجاح للمؤسسات والشركات</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">4.92 / 5</div>
          <div class="stat-label">تقييم رضا العملاء</div>
          <div class="stat-desc">بناءً على مراجعات العملاء المستقلة</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">%98.4</div>
          <div class="stat-label">الالتزام بمواعيد التسليم</div>
          <div class="stat-desc">تطبيق شروط تسليم صارمة مع المطورين</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">24 ساعة</div>
          <div class="stat-label">متوسط استجابة الدعم</div>
          <div class="stat-desc">مهندسو دعم مخصصون لحل المشكلات</div>
        </div>
      </section>

      <!-- 3. Explain Service Process Section -->
      <section class="process-section">
        <div class="section-header">
          <span class="section-subtitle">كيف تعمل الخدمة</span>
          <h2 class="section-title">رحلة بناء مشروعك البرمجي بأمان</h2>
        </div>
        
        <div class="process-grid">
          <div class="process-step">
            <div class="step-num">1</div>
            <h3 class="step-title">تقديم الطلب</h3>
            <p class="step-desc">حدد مواصفات وميزانية والجدول الزمني لمشروعك عبر نموذجنا الذكي متعدد الخطوات.</p>
          </div>
          <div class="process-step">
            <div class="step-num">2</div>
            <h3 class="step-title">المراجعة والاعتماد</h3>
            <p class="step-desc">يقوم فريقنا التقني بمراجعة طلبك وإتاحته للمطورين النخبة المعتمدين لتقديم عروضهم.</p>
          </div>
          <div class="process-step">
            <div class="step-num">3</div>
            <h3 class="step-title">مقارنة وقبول العروض</h3>
            <p class="step-desc">تلقى عروض تسعير وجداول زمنية من المطورين، قارن بينها، واختر العرض الأنسب لمشروعك.</p>
          </div>
          <div class="process-step">
            <div class="step-num">4</div>
            <h3 class="step-title">التنفيذ والتسليم الآمن</h3>
            <p class="step-desc">تابع تقدم مشروعك خطوة بخطوة، تواصل مع المطور، وحمل كودك المصدر والملفات عبر مركز التحميل الآمن.</p>
          </div>
        </div>
      </section>

      <!-- 4. Benefits Section -->
      <section class="benefits-section">
        <div class="section-header">
          <span class="section-subtitle">مزايا كودساينون</span>
          <h2 class="section-title">لماذا تطلب مشروعك من خلالنا؟</h2>
        </div>
        
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h4>نظام الضمان البرمجي</h4>
            <p>أموالك بأمان تام. لا يتم تحويل المبلغ للمطور إلا بعد استلامك للمشروع كاملاً، وفحصه والتأكد من مطابقته للشروط.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
              </svg>
            </div>
            <h4>مطورون معتمدون</h4>
            <p>نحن لا نقبل سوى 3% من المطورين المتقدمين للمنصة بعد اختبارات برمجية دقيقة وفحص لسجل أعمالهم.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h4>مراجعة جودة الأكواد</h4>
            <p>يقوم خبراؤنا بمراجعة معمارية الكود وجودة التنفيذ للمشاريع المسلمة لضمان كود نظيف، آمن، وقابل للتوسع المستقبلي.</p>
          </div>
        </div>
      </section>

      <!-- 5. Portfolio Showcase -->
      <section class="portfolio-section">
        <div class="section-header">
          <span class="section-subtitle">معرض الأعمال والمشاريع</span>
          <h2 class="section-title">نماذج من مشاريع عملائنا الناجحة</h2>
        </div>
        
        <div class="portfolio-grid">
          <div class="portfolio-card">
            <img class="portfolio-img" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80" alt="نظام ERP سحابي متكامل">
            <div class="portfolio-info">
              <span class="portfolio-category">أنظمة ويب سحابية</span>
              <h4 class="portfolio-card-title">نظام إدارة الموارد للمؤسسات (ERP)</h4>
              <p class="portfolio-card-desc">نظام سحابي لحسابات الشركات المتوسطة، يدعم الفوترة الإلكترونية وإدارة المخازن حضور الموظفين بالكامل.</p>
              <div class="portfolio-meta">
                <span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  مدة التنفيذ: 45 يوم
                </span>
                <span class="en-nums" style="font-weight: 700; color: var(--text-primary); font-size: 0.9rem;">$5,200</span>
              </div>
            </div>
          </div>
          
          <div class="portfolio-card">
            <img class="portfolio-img" src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80" alt="تطبيق متجر الكتروني">
            <div class="portfolio-info">
              <span class="portfolio-category">تطبيقات الجوال</span>
              <h4 class="portfolio-card-title">تطبيق متجر توصيل فوري رقمي</h4>
              <p class="portfolio-card-desc">تطبيق جوال Flutter ناعم جداً، يدعم الدفع ببطاقات الائتمان ومدونة مقالات متكاملة وتتبع التسليم.</p>
              <div class="portfolio-meta">
                <span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  مدة التنفيذ: 30 يوم
                </span>
                <span class="en-nums" style="font-weight: 700; color: var(--text-primary); font-size: 0.9rem;">$2,800</span>
              </div>
            </div>
          </div>

          <div class="portfolio-card">
            <img class="portfolio-img" src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80" alt="موقع حجز الفنادق الفاخرة">
            <div class="portfolio-info">
              <span class="portfolio-category">منصات حجز وسياحة</span>
              <h4 class="portfolio-card-title">منصة حجز الفنادق الفاخرة بالذكاء الاصطناعي</h4>
              <p class="portfolio-card-desc">موقع ويب متكامل يبحث ويقترح المنتجعات والفلل الفاخرة حسب ذوق المستخدم بالذكاء الاصطناعي.</p>
              <div class="portfolio-meta">
                <span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  مدة التنفيذ: 60 يوم
                </span>
                <span class="en-nums" style="font-weight: 700; color: var(--text-primary); font-size: 0.9rem;">$5,500</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 6. Client Testimonials -->
      <section class="testimonials-section">
        <div class="section-header">
          <span class="section-subtitle">أراء شركاء النجاح</span>
          <h2 class="section-title">ماذا يقول عملاؤنا عن تجاربهم؟</h2>
        </div>
        
        <div class="testimonials-grid">
          <div class="testimonial-card">
            <p class="testimonial-quote">"تجربة تفوق الخيال! طلبنا تطوير نظام ERP لشركتنا وكنا متخوفين من تسريب البيانات أو تعطل المشروع. كودساينون وفرت لنا نظام حماية وضمان مالي فريد، والمطور سليم كان محترفاً جداً."</p>
            <div class="testimonial-author">
              <img class="author-avatar" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80" alt="العميل خالد القحطاني">
              <div>
                <h4 class="author-name">أ. خالد القحطاني</h4>
                <p class="author-title">الرئيس التنفيذي، شركة روافد التقنية</p>
              </div>
            </div>
          </div>
          
          <div class="testimonial-card">
            <p class="testimonial-quote">"نموذج تقديم طلب المشروع كان واضحاً جداً وساعدنا على صياغة متطلباتنا التقنية بدقة. العروض التي تلقيناها كانت ذات جودة عالية والمقارنة بينها سهلة ومريحة. منصة رائعة فعلاً."</p>
            <div class="testimonial-author">
              <img class="author-avatar" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80" alt="العميلة ياسمين العمري">
              <div>
                <h4 class="author-name">م. ياسمين العمري</h4>
                <p class="author-title">مديرة المنتجات، متجر كاردس الفوري</p>
              </div>
            </div>
          </div>

          <div class="testimonial-card">
            <p class="testimonial-quote">"تسليم الأكواد والملفات عبر مركز التحميل المنظم وفر علينا الكثير من العناء. استلمنا دليلاً كاملاً للتثبيت وربط قاعدة البيانات، والمطور كان يجيب على أسئلتنا بسرعة."</p>
            <div class="testimonial-author">
              <img class="author-avatar" src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&h=100&q=80" alt="العميل طارق الغامدي">
              <div>
                <h4 class="author-name">د. طارق الغامدي</h4>
                <p class="author-title">عميد، كلية الاتصالات وتكنولوجيا المعلومات</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 7. Bottom CTA -->
      <section class="bottom-cta">
        <h3>هل أنت مستعد لبدء مشروعك الخاص؟</h3>
        <p>لا تدع أفكارك حبراً على ورق. انضم الآن إلى مئات الشركات والمؤسسات التي طورت برمجياتها بأمان مع كودساينون.</p>
        <a href="#submit-request" class="btn btn-lg btn-primary" style="background-color: white; color: var(--secondary); border-color: white;">
          اطلب مشروعك الخاص الآن
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </a>
      </section>

    </div>
  `;
}
