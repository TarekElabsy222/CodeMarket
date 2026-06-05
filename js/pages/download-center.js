/* ==========================================================================
   CODECYNON - DOWNLOAD CENTER & PROJECT DELIVERY RENDERER
   ========================================================================== */

import State from '../state.js';

export function renderDownloadCenter(container, params = {}) {
  // params can contain: view ('list', 'details', 'delivery', 'success'), id (product or project id)
  const view = params.view || 'list';
  const id = params.id;

  if (view === 'list') {
    renderList();
  } else if (view === 'details') {
    renderDetails(id);
  } else if (view === 'delivery') {
    renderDelivery(id);
  } else if (view === 'success') {
    renderSuccess(id, params.isProject === 'true');
  }

  // 1. Render all purchased digital products and completed custom projects
  function renderList() {
    const completedProjs = State.projects.filter(p => p.status === 'completed' || p.status === 'ready');
    const products = State.products;

    container.innerHTML = `
      <div class="landing-wrapper fade-in">
        <div class="dashboard-title-area" style="margin-bottom:30px;">
          <div>
            <h2>مركز التحميل البرمجي</h2>
            <p class="dashboard-subtitle">حمل أكوادك المصدرية المشتراة، ملفات مشاريعك المخصصة، واطلع على التحديثات المستمرة والتراخيص.</p>
          </div>
        </div>

        <div class="dashboard-card" style="margin-bottom:30px;">
          <div class="dashboard-card-header">
            <h3>تسليمات المشاريع المخصصة الجاهزة</h3>
          </div>
          <div class="dashboard-card-body">
            ${completedProjs.length === 0 ? `
              <div style="padding: 40px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
                لا توجد مشاريع جاهزة للتسليم حالياً. تكتمل التسليمات بعد إكمال المطورين للعمل واعتمادك لها.
              </div>
            ` : `
              <div class="delivery-grid">
                ${completedProjs.map(p => `
                  <div class="delivery-card">
                    <div class="delivery-card-header">
                      <div class="delivery-card-icon">
                        📦
                      </div>
                      <div>
                        <h4 class="delivery-card-title">${p.title}</h4>
                        <span class="badge-status ${p.status}" style="margin-top: 4px;">${State.getStatusLabel(p.status)}</span>
                      </div>
                    </div>
                    
                    <p style="font-size: 0.775rem; color: var(--text-secondary); line-height: 1.5; margin: 12px 0;">
                      ${p.delivery ? p.delivery.notes.substring(0, 100) + '...' : 'المشروع بانتظار فحصك لملفاته المرفقة.'}
                    </p>

                    <div class="delivery-card-meta">
                      <div>
                        <span>الإصدار:</span>
                        <strong class="en-nums">v1.0.0</strong>
                      </div>
                      <div>
                        <span>تحديث:</span>
                        <strong class="en-nums">${p.delivery ? p.delivery.date : p.dateSubmitted}</strong>
                      </div>
                    </div>

                    <a href="#project/${p.id}/delivery" class="btn btn-sm btn-primary" style="margin-top: 10px; width: 100%;">
                      فتح صفحة التسليم والتحميل
                    </a>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        </div>

        <div class="dashboard-card">
          <div class="dashboard-card-header">
            <h3>المنتجات الرقمية الجاهزة والقوالب المشتراة</h3>
          </div>
          <div class="dashboard-card-body">
            <div class="delivery-grid">
              ${products.map(pr => `
                <div class="delivery-card">
                  <div class="delivery-card-header">
                    <div class="delivery-card-icon" style="background-color: var(--info-glow); color: var(--info);">
                      💾
                    </div>
                    <div>
                      <h4 class="delivery-card-title">${pr.name}</h4>
                      <span class="badge-status new" style="margin-top: 4px; background-color: var(--primary-light); color: var(--primary);">${pr.type}</span>
                    </div>
                  </div>

                  <p style="font-size: 0.775rem; color: var(--text-secondary); line-height: 1.5; margin: 12px 0;">
                    ${pr.releaseNotes}
                  </p>

                  <div class="delivery-card-meta">
                    <div>
                      <span>الحجم:</span>
                      <strong class="en-nums">${pr.size}</strong>
                    </div>
                    <div>
                      <span>الإصدار الحالي:</span>
                      <strong class="en-nums">${pr.version}</strong>
                    </div>
                  </div>

                  <a href="#download-details/${pr.id}" class="btn btn-sm btn-outline" style="margin-top: 10px; width: 100%; border-color: var(--primary); color: var(--primary);">
                    خيارات التحميل والتراخيص
                  </a>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 2. Download Details Page
  function renderDetails(prodId) {
    const product = State.products.find(p => p.id === prodId);
    if (!product) {
      container.innerHTML = `<div class="landing-wrapper"><h3>المنتج البرمجي غير متوفر</h3></div>`;
      return;
    }

    container.innerHTML = `
      <div class="landing-wrapper fade-in">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-light); padding-bottom:20px; margin-bottom:30px;">
          <div>
            <h2 style="font-size:1.5rem; font-weight:800;">تحميل المنتج: ${product.name}</h2>
            <p style="color:var(--text-muted); font-size:0.8rem; margin-top:4px;">الإصدار الحالي: <strong class="en-nums">${product.version}</strong> | تاريخ التحديث: <strong class="en-nums">${product.lastUpdated}</strong></p>
          </div>
          <a href="#downloads" class="btn btn-outline">العودة لمركز التحميل</a>
        </div>

        <div class="two-col-grid">
          <div style="display:flex; flex-direction:column; gap:24px;">
            <!-- Download info card -->
            <div class="dashboard-card">
              <div class="dashboard-card-header">
                <h3>حزمة الملفات والترخيص</h3>
              </div>
              <div class="dashboard-card-body" style="display:flex; flex-direction:column; gap:20px;">
                <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding:20px; text-align:center;">
                  <span style="font-size: 0.775rem; color:var(--text-muted); display:block; margin-bottom:8px;">حجم الملف الإجمالي</span>
                  <strong class="en-nums" style="font-size:2rem; color:var(--primary); font-weight:800; display:block; margin-bottom:16px;">${product.size}</strong>
                  <button class="btn btn-primary btn-lg" id="start-digital-download-btn" style="width:100%;">
                    بدء تحميل ملف الكود المصدري (.zip)
                  </button>
                </div>

                <div>
                  <h4 style="font-weight:700; font-size:0.9rem; margin-bottom:6px;">نوع ترخيص المنتج:</h4>
                  <div class="badge-status new" style="background-color: var(--success-glow); color:var(--success); font-weight:700; font-size:0.8rem;">
                    ${product.license}
                  </div>
                  <p style="font-size:0.775rem; color:var(--text-muted); margin-top:8px;">يمنحك هذا الترخيص حق تشغيل الكود في مواقع تجارية وفق الشروط المرفقة مع الأكواد المصدرية.</p>
                </div>
              </div>
            </div>

            <!-- Installation Guide & Documentation link -->
            <div class="dashboard-card">
              <div class="dashboard-card-header">
                <h3>دليل التثبيت والتوثيق المكتوب</h3>
              </div>
              <div class="dashboard-card-body" style="display:flex; flex-direction:column; gap:12px;">
                <p style="font-size:0.85rem; line-height:1.6;">نوفر لك شرحاً خطوة بخطوة لطريقة تثبيت وإعداد القالب/البرنامج على خادمك المحلي أو الاستضافة السحابية.</p>
                <div style="display:flex; gap:10px;">
                  <button class="btn btn-sm btn-outline" style="flex-grow:1;" onclick="alert('فتح التوثيق البرمجي الكامل في علامة تبويب جديدة...')">
                    📄 عرض مستند التثبيت (Documentation)
                  </button>
                  <button class="btn btn-sm btn-outline" onclick="alert('جاري نسخ مفتاح ترخيص التنشيط...')">
                    🔑 نسخ مفتاح التنشيط
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Changelog sidebar -->
          <div class="dashboard-card" style="height:fit-content;">
            <div class="dashboard-card-header">
              <h3>سجل التحديثات والإصدارات (Changelog)</h3>
            </div>
            <div class="dashboard-card-body">
              <div class="vertical-timeline">
                ${product.changelog.map(log => `
                  <div class="vertical-timeline-item active">
                    <span class="v-time-title en-nums" style="font-weight:700;">الإصدار ${log.version}</span>
                    <span class="v-time-date en-nums">${log.date}</span>
                    <p style="font-size:0.8rem; color:var(--text-secondary); line-height:1.5; margin-top:4px;">${log.note}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Download Button trigger success redirection
    container.querySelector('#start-digital-download-btn').addEventListener('click', () => {
      alert('بدء معالجة التحميل، سيتم توجيهك لصفحة إتمام التحميل والنجاح.');
      window.location.hash = `#download-success/${product.id}?isProject=false`;
    });
  }

  // 3. Project Delivery Page
  function renderDelivery(projId) {
    const project = State.projects.find(p => p.id === projId);
    if (!project) {
      container.innerHTML = `<div class="landing-wrapper"><h3>المشروع البرمجي غير متوفر</h3></div>`;
      return;
    }

    const files = project.delivery ? project.delivery.files : [
      { name: "Full_Project_Source.zip", size: "42.8 MB", type: "src", version: "v1.0.0" },
      { name: "Database_Backup.sql", size: "1.2 MB", type: "db", version: "v1.0.0" },
      { name: "Installation_Guide.md", size: "24 KB", type: "docs", version: "v1.0.0" }
    ];

    container.innerHTML = `
      <div class="landing-wrapper fade-in">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-light); padding-bottom:20px; margin-bottom:30px;">
          <div>
            <h2 style="font-size:1.5rem; font-weight:800;">بوابة استلام حزمة مشروع: ${project.title}</h2>
            <p style="color:var(--text-muted); font-size:0.8rem; margin-top:4px;">تسليم نهائي للمراجعة والفحص الفني • حالة المشروع: <span class="badge-status ${project.status}">${State.getStatusLabel(project.status)}</span></p>
          </div>
          <a href="#project/${project.id}" class="btn btn-outline">العودة لصفحة المشروع</a>
        </div>

        <div class="two-col-grid">
          <!-- Files details listing -->
          <div style="display:flex; flex-direction:column; gap:24px;">
            <div class="dashboard-card">
              <div class="dashboard-card-header">
                <h3>الملفات البرمجية المسلمة من المطور</h3>
              </div>
              <div class="dashboard-card-body">
                <div style="display:flex; flex-direction:column; gap:16px;">
                  ${files.map(f => `
                    <div class="benefit-card" style="border:1px solid var(--border-light); background-color: var(--bg-secondary); padding:16px; flex-direction:row; justify-content:space-between; align-items:center;">
                      <div style="display:flex; gap:12px; align-items:center;">
                        <span style="font-size:1.5rem;">
                          ${f.type === 'src' ? '💻' : f.type === 'db' ? '🗄️' : f.type === 'docs' ? '📄' : '📁'}
                        </span>
                        <div>
                          <h5 style="font-size:0.9rem; font-weight:700;" class="en-nums">${f.name}</h5>
                          <span style="font-size:0.75rem; color:var(--text-muted);">
                            حجم الملف: <strong class="en-nums">${f.size}</strong> | 
                            الإصدار: <strong class="en-nums">${f.version}</strong>
                          </span>
                        </div>
                      </div>
                      <button class="btn btn-sm btn-outline" style="border-color:var(--primary); color:var(--primary);" onclick="alert('جاري تحميل ${f.name}...')">
                        تحميل الملف
                      </button>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- Install guide instructions layout -->
            <div class="dashboard-card">
              <div class="dashboard-card-header">
                <h3>دليل التركيب والتشغيل المرفق (Installation Guide)</h3>
              </div>
              <div class="dashboard-card-body" style="direction:ltr; text-align:left; font-family:var(--font-english); font-size:0.85rem; background-color:var(--bg-secondary); border-radius:var(--radius-md); padding:20px; line-height:1.6;">
                <h4 style="font-weight:700; margin-bottom:10px; color:var(--primary); font-family:inherit;">Quick Start Guide</h4>
                <p>1. Extract the <b>Full_Project_Source.zip</b> file on your web server.</p>
                <p>2. Import the database script <b>Database_Backup.sql</b> into your MySQL/PostgreSQL server.</p>
                <p>3. Configure the connection parameters in <b>.env</b> file.</p>
                <p>4. Run the installation package command: <code style="background:#e2e8f0; padding:2px 6px; border-radius:4px;">npm install</code></p>
                <p>5. Boot the development workspace or server: <code style="background:#e2e8f0; padding:2px 6px; border-radius:4px;">npm run dev</code></p>
              </div>
            </div>
          </div>

          <!-- Approve Delivery Section -->
          <div>
            ${project.status === 'ready' && State.currentUserRole === 'client' ? `
              <div class="dashboard-card" style="border: 2px solid var(--success); box-shadow:var(--shadow-lg);">
                <div class="dashboard-card-header" style="background-color: var(--success-glow); border-bottom-color: var(--success);">
                  <h3 style="color: var(--success); font-weight:800;">تأكيد استلام وتقييم المشروع</h3>
                </div>
                <div class="dashboard-card-body" style="display:flex; flex-direction:column; gap:16px;">
                  <p style="font-size:0.85rem; line-height:1.6;">يرجى فحص واختبار الأكواد والملفات المسلمة بدقة. عند ضغطك على زر الاعتماد أدناه، سيتم تحويل مبلغ العقد للمطور وإكمال المشروع رسمياً.</p>
                  
                  <form id="approve-delivery-form" onsubmit="return false;">
                    <div class="form-group">
                      <label>تقييم جودة عمل المطور (1 - 5 نجوم)</label>
                      <select id="review-rating" class="form-control" style="font-weight:700; color:var(--warning);">
                        <option value="5" selected>★★★★★ 5/5 ممتازة جداً</option>
                        <option value="4">★★★★☆ 4/5 جيد جداً</option>
                        <option value="3">★★★☆☆ 3/5 متوسط</option>
                        <option value="2">★★☆☆☆ 2/5 ضعيف</option>
                        <option value="1">★☆☆☆☆ 1/5 سيء للغاية</option>
                      </select>
                    </div>

                    <div class="form-group">
                      <label>مراجعة فنية وتعليق للمطور</label>
                      <textarea id="review-comment" class="form-control" placeholder="اكتب شكرك أو تعليقاتك الفنية للمطور لمساعدته في تحسين عمله وقدراته..."></textarea>
                    </div>

                    <button type="button" class="btn btn-secondary" id="confirm-project-complete-btn" style="width:100%; font-weight:800; font-size:0.95rem;">
                      تأكيد استلام المشروع وصرف المستحقات
                    </button>
                  </form>
                </div>
              </div>
            ` : `
              <div class="dashboard-card">
                <div class="dashboard-card-header">
                  <h3>حالة استلام المشروع</h3>
                </div>
                <div class="dashboard-card-body" style="text-align:center;">
                  ${project.status === 'completed' ? `
                    <div style="color:var(--success); font-size:3rem; margin-bottom:10px;">✓</div>
                    <h4 style="font-weight:700; color:var(--success);">تم استلام المشروع بنجاح</h4>
                    <p style="font-size:0.8rem; color:var(--text-muted); margin-top:6px;">تم تحويل المستحقات للمطور بنجاح وإقفال العقد المالي.</p>
                    <div style="border-top:1px solid var(--border-light); margin-top:16px; padding-top:16px; font-size:0.825rem;">
                      <strong>تقييمك للمطور:</strong>
                      <div style="color:var(--warning); margin:6px 0;">
                        ${'★'.repeat(project.review ? project.review.rating : 5)}
                      </div>
                      <p style="font-style:italic; color:var(--text-secondary);">"${project.review ? project.review.comment : 'كود نظيف وتسليم سريع جداً'}"</p>
                    </div>
                  ` : `
                    <p style="font-size:0.85rem; color:var(--text-muted);">بانتظار قيام العميل باعتماد التسليم وتقييم المطور لصرف الدفعة المالية المعلقة.</p>
                  `}
                </div>
              </div>
            `}
          </div>
        </div>
      </div>
    `;

    // Process delivery acceptation
    if (project.status === 'ready' && State.currentUserRole === 'client') {
      container.querySelector('#confirm-project-complete-btn').addEventListener('click', () => {
        const rating = parseInt(container.querySelector('#review-rating').value);
        const comment = container.querySelector('#review-comment').value.trim();

        if (confirm('هل أنت متأكد من رغبتك في إكمال المشروع وصرف المستحقات المالية للمطور؟ لا يمكن التراجع عن هذا الإجراء.')) {
          State.completeProject(project.id, {
            rating: rating,
            comment: comment || 'عمل ممتاز ومطور متميز!'
          });

          // Construct Arabic WhatsApp message details
          let message = `مرحباً كودساينون،\n\nلقد قمت بتأكيد استلام وإكمال مشروعي المخصص بنجاح وصرف المستحقات للمطور:\n`;
          message += `💼 اسم المشروع: ${project.title}\n`;
          message += `🔑 رقم المشروع: ${project.id}\n`;
          message += `👤 العميل المعتمد: أحمد العتيبي\n`;
          message += `💰 إجمالي قيمة العقد المالي: $${project.acceptedPrice || project.budget}\n`;
          message += `★ التقييم الممنوح للمطور: ${rating}/5 نجوم\n`;
          message += `💬 المراجعة الفنية للعميل: "${comment || 'عمل ممتاز ومطور متميز!'}"\n\n`;
          message += `يرجى مراجعة وتأكيد عملية الإغلاق وصرف الدفعة للمطور. شكراً لكم!`;

          const encodedText = encodeURIComponent(message);
          const whatsappUrl = `https://wa.me/201026342592?text=${encodedText}`;

          alert('تم اعتماد المشروع وصرف المستحقات بنجاح! سيتم فتح تفاصيل إكمال المشروع عبر واتساب وتوجيهك لصفحة النجاح.');
          
          // Open WhatsApp link in new tab
          window.open(whatsappUrl, '_blank');
          
          window.location.hash = `#download-success/${project.id}?isProject=true`;
        }
      });
    }
  }

  // 4. Download Success Page
  function renderSuccess(targetId, isProject = false) {
    container.innerHTML = `
      <div class="landing-wrapper fade-in" style="text-align: center; max-width: 600px; padding: 60px 0;">
        <div style="width: 80px; height: 80px; border-radius: var(--radius-full); background-color: var(--success-glow); color: var(--success); display: flex; align-items: center; justify-content: center; margin: 0 auto 24px auto;">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        
        <h2 style="font-size: 2rem; font-weight: 800; margin-bottom: 8px;">تهانينا! اكتملت العملية بنجاح</h2>
        <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 30px;">
          ${isProject 
            ? 'شكراً جزيلاً لتعاملك مع مطوري كودساينون النخبة. تم حفظ سجلات التسليم وصرف أتعاب المطور بنجاح.'
            : 'تمت تهيئة ملفات الكود المصدري للمنتج وهي قيد التحميل الآن على متصفحك.'}
        </p>

        <div class="dashboard-card" style="text-align: right; margin-bottom: 30px; border-radius: var(--radius-md);">
          <div class="dashboard-card-body" style="padding: 20px;">
            <h4 style="font-size: 0.9rem; font-weight: 700; margin-bottom: 12px; border-bottom: 1px solid var(--border-light); padding-bottom: 8px;">الخطوات التالية الموصى بها:</h4>
            <ul style="display: flex; flex-direction: column; gap: 10px; font-size: 0.825rem; color: var(--text-secondary);">
              <li><b>1. فحص مجلد التنزيلات:</b> ستجد الملف مضغوطاً بصيغة <code style="font-family:var(--font-english);">.zip</code>.</li>
              <li><b>2. قراءة مستند التثبيت:</b> يرجى إتباع كتيب التعليمات المكتوب خطوة بخطوة لتفادي أي أخطاء سيرفر.</li>
              <li><b>3. الدعم الفني متوفر:</b> إذا واجهت أي مشاكل في التثبيت، يمكنك فتح تذكرة دعم فني وسيجيبك خبراؤنا.</li>
            </ul>
          </div>
        </div>

        <div style="display: flex; gap: 12px; justify-content: center;">
          <a href="#client-dashboard" class="btn btn-primary">بوابة التحكم الخاصة بك</a>
          <a href="#landing" class="btn btn-outline">تصفح المشاريع المفتوحة</a>
        </div>
      </div>
    `;
  }
}
