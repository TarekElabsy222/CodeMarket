/* ==========================================================================
   CODECYNON - CLIENT DASHBOARD PORTAL RENDERER
   ========================================================================== */

import State from '../state.js';

export function renderClientDashboard(container) {
  let activeSubTab = 'overview'; // overview, projects, downloads, invoices, messages, settings

  function handleTabClick(tabName) {
    activeSubTab = tabName;
    renderPortalContent();
  }

  function renderPortalContent() {
    const projects = State.projects;
    
    // Calculate statistics
    const activeProjects = projects.filter(p => ['approved', 'development', 'testing', 'ready'].includes(p.status));
    const submittedProjects = projects.filter(p => ['new', 'review', 'proposal'].includes(p.status));
    const completedProjects = projects.filter(p => p.status === 'completed');
    
    const totalSpent = projects.reduce((sum, p) => {
      if (p.status === 'completed') {
        return sum + (p.acceptedPrice || p.budgetMax || 0);
      }
      if (['development', 'testing', 'ready'].includes(p.status)) {
        return sum + (p.acceptedPrice || 0);
      }
      return sum;
    }, 0);

    let contentHTML = '';

    // Render corresponding sub-tab views
    if (activeSubTab === 'overview') {
      contentHTML = `
        <!-- Metrics Grid -->
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-info">
              <span class="metric-label">المشاريع النشطة</span>
              <span class="metric-value en-nums">${activeProjects.length}</span>
            </div>
            <div class="metric-icon-box" style="background-color: var(--primary-light); color: var(--primary);">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
          </div>
          
          <div class="metric-card">
            <div class="metric-info">
              <span class="metric-label">طلبات قيد الدراسة / العروض</span>
              <span class="metric-value en-nums">${submittedProjects.length}</span>
            </div>
            <div class="metric-icon-box" style="background-color: var(--info-glow); color: var(--info);">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-info">
              <span class="metric-label">إجمالي الاستثمار البرمجي</span>
              <span class="metric-value en-nums">$${totalSpent.toLocaleString()}</span>
            </div>
            <div class="metric-icon-box" style="background-color: var(--success-glow); color: var(--success);">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="two-col-grid" style="margin-top: 30px;">
          <!-- Recent projects table card -->
          <div class="dashboard-card">
            <div class="dashboard-card-header">
              <h3>أحدث المشاريع</h3>
              <a href="javascript:void(0)" class="btn btn-sm btn-outline btn-subtab-trigger" data-subtab="projects">عرض الكل</a>
            </div>
            <div class="dashboard-card-body" style="padding: 0;">
              ${projects.length === 0 ? `
                <div style="padding: 40px; text-align: center; color: var(--text-muted);">
                  لا توجد مشاريع مضافة حالياً.
                </div>
              ` : `
                <table class="project-table">
                  <thead>
                    <tr>
                      <th>اسم المشروع</th>
                      <th>الميزانية</th>
                      <th>تاريخ الطلب</th>
                      <th>الحالة</th>
                      <th>إجراء</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${projects.slice(0, 5).map(p => `
                      <tr>
                        <td>
                          <div class="project-name-cell">
                            <strong>${p.title}</strong>
                            <span>${p.category === 'web-systems' ? 'نظام ويب سحابي' : 'تطبيق جوال'}</span>
                          </div>
                        </td>
                        <td class="en-nums">${p.acceptedPrice ? '$' + p.acceptedPrice : p.budget}</td>
                        <td class="en-nums">${p.dateSubmitted}</td>
                        <td>
                          <span class="badge-status ${p.status}">
                            ${State.getStatusLabel(p.status)}
                          </span>
                        </td>
                        <td>
                          <a href="#project/${p.id}" class="btn btn-sm btn-outline">المتابعة</a>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              `}
            </div>
          </div>

          <!-- Activity logs & notifications -->
          <div class="dashboard-card">
            <div class="dashboard-card-header">
              <h3>إشعارات المشروع</h3>
            </div>
            <div class="dashboard-card-body" style="padding: 0;">
              <div style="display: flex; flex-direction: column;">
                ${State.notifications.slice(0, 4).map(n => `
                  <a href="${n.link}" style="display: flex; gap: 12px; padding: 16px 20px; border-bottom: 1px solid var(--border-light); transition: background-color var(--transition-fast);">
                    <div style="width: 8px; height: 8px; border-radius: var(--radius-full); background-color: ${n.unread ? 'var(--primary)' : 'transparent'}; align-self: center;"></div>
                    <div>
                      <p style="font-size: 0.825rem; font-weight: ${n.unread ? '700' : '500'}; color: var(--text-primary); line-height: 1.4;">${n.text}</p>
                      <span style="font-size: 0.725rem; color: var(--text-muted);">${n.time}</span>
                    </div>
                  </a>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      `;
    } 
    
    else if (activeSubTab === 'projects') {
      contentHTML = `
        <div class="dashboard-card">
          <div class="dashboard-card-header">
            <h3>قائمة مشاريعك البرمجية</h3>
            <a href="#submit-request" class="btn btn-sm btn-primary">
              طلب مشروع جديد
            </a>
          </div>
          <div class="dashboard-card-body" style="padding: 0;">
            ${projects.length === 0 ? `
              <div style="padding: 60px; text-align: center; color: var(--text-muted);">
                لم تقم بإضافة أي طلبات بعد. اطلب مشروعك الأول الآن!
              </div>
            ` : `
              <table class="project-table">
                <thead>
                  <tr>
                    <th>المشروع والتصنيف</th>
                    <th>نوع العمل</th>
                    <th>الميزانية</th>
                    <th>تاريخ الطلب</th>
                    <th>المطور</th>
                    <th>الحالة</th>
                    <th>إجراء</th>
                  </tr>
                </thead>
                <tbody>
                  ${projects.map(p => {
                    const dev = State.developers.find(d => d.id === p.developerId);
                    return `
                      <tr>
                        <td>
                          <div class="project-name-cell">
                            <strong>${p.title}</strong>
                            <span class="en-nums">${p.id}</span>
                          </div>
                        </td>
                        <td>${p.type === 'full-system' ? 'نظام متكامل' : 'تعديل وتطوير'}</td>
                        <td class="en-nums">${p.acceptedPrice ? '$' + p.acceptedPrice : p.budget}</td>
                        <td class="en-nums">${p.dateSubmitted}</td>
                        <td>
                          ${dev ? `
                            <div style="display: flex; align-items: center; gap: 8px;">
                              <img src="${dev.avatar}" style="width: 24px; height: 24px; border-radius: var(--radius-full);">
                              <span style="font-size: 0.8rem; font-weight: 600;">${dev.name}</span>
                            </div>
                          ` : '<span style="color: var(--text-muted);">غير معين</span>'}
                        </td>
                        <td>
                          <span class="badge-status ${p.status}">
                            ${State.getStatusLabel(p.status)}
                          </span>
                        </td>
                        <td>
                          <a href="#project/${p.id}" class="btn btn-sm btn-outline" style="border-color: var(--primary); color: var(--primary);">
                            ${p.status === 'proposal' ? 'عرض ودراسة (' + p.proposals.length + ')' : 'عرض التفاصيل'}
                          </a>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            `}
          </div>
        </div>
      `;
    } 
    
    else if (activeSubTab === 'downloads') {
      // Completed custom projects delivery packages AND purchased digital products
      const completedProjs = projects.filter(p => p.status === 'completed' || p.status === 'ready');
      const products = State.products;
      
      contentHTML = `
        <div class="dashboard-card" style="margin-bottom: 30px;">
          <div class="dashboard-card-header">
            <h3>تسليمات المشاريع المخصصة الجاهزة</h3>
          </div>
          <div class="dashboard-card-body">
            ${completedProjs.length === 0 ? `
              <div style="padding: 30px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
                لا توجد مشاريع جاهزة للتحميل حالياً. تكتمل التسليمات بعد موافقتك النهائية.
              </div>
            ` : `
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
                ${completedProjs.map(p => `
                  <div class="invoice-card" style="border: 1px solid var(--border-light); background-color: var(--bg-secondary);">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                      <div>
                        <span class="badge-status completed" style="margin-bottom: 8px;">جاهز للتحميل</span>
                        <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary);">${p.title}</h4>
                        <p style="font-size: 0.775rem; color: var(--text-muted); margin-top: 4px;">تسليم: ${p.delivery ? p.delivery.date : p.dateSubmitted}</p>
                      </div>
                      <span class="en-nums" style="font-size: 0.8rem; font-weight: 700;">v1.0.0</span>
                    </div>
                    <div style="display: flex; gap: 10px; margin-top: 10px;">
                      <a href="#project/${p.id}/delivery" class="btn btn-sm btn-primary" style="flex-grow: 1;">فتح بوابة التحميل والملفات</a>
                      <a href="#project/${p.id}" class="btn btn-sm btn-outline">صفحة المشروع</a>
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        </div>

        <div class="dashboard-card">
          <div class="dashboard-card-header">
            <h3>المنتجات الجاهزة المشتراة</h3>
          </div>
          <div class="dashboard-card-body">
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
              ${products.map(pr => `
                <div class="invoice-card">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div>
                      <span class="badge-status new" style="margin-bottom: 8px; background-color: var(--primary-light); color: var(--primary);">${pr.type}</span>
                      <h4 style="font-size: 0.95rem; font-weight: 700;">${pr.name}</h4>
                      <p style="font-size: 0.775rem; color: var(--text-muted); margin-top: 4px;">الحجم: ${pr.size} | تحديث: ${pr.lastUpdated}</p>
                    </div>
                    <span class="en-nums" style="font-size: 0.8rem; font-weight: 700;">${pr.version}</span>
                  </div>
                  <div style="display: flex; gap: 10px; margin-top: 10px;">
                    <a href="#download-details/${pr.id}" class="btn btn-sm btn-primary" style="flex-grow: 1;">تفاصيل التثبيت والتحميل</a>
                    <a href="#downloads" class="btn btn-sm btn-outline">الترخيص</a>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    } 
    
    else if (activeSubTab === 'invoices') {
      const activeOrDone = projects.filter(p => p.acceptedPrice);
      contentHTML = `
        <div class="dashboard-card">
          <div class="dashboard-card-header">
            <h3>سجل الفواتير والمعاملات المالية</h3>
          </div>
          <div class="dashboard-card-body">
            ${activeOrDone.length === 0 ? `
              <div style="padding: 40px; text-align: center; color: var(--text-muted);">
                لا توجد فواتير أو دفعات مسجلة بعد.
              </div>
            ` : `
              <table class="project-table">
                <thead>
                  <tr>
                    <th>رقم الفاتورة</th>
                    <th>البيان والمشروع</th>
                    <th>القيمة المالية</th>
                    <th>تاريخ الدفع</th>
                    <th>الحالة</th>
                    <th>إجراء</th>
                  </tr>
                </thead>
                <tbody>
                  ${activeOrDone.map((p, idx) => `
                    <tr>
                      <td class="en-nums">#INV-2026-${1000 + idx}</td>
                      <td>دفعات برمجية مخصصة - ${p.title}</td>
                      <td class="en-nums" style="font-weight: 700; color: var(--text-primary);">$${p.acceptedPrice}</td>
                      <td class="en-nums">${p.dateSubmitted}</td>
                      <td>
                        <span class="badge-status completed" style="background-color: var(--success-glow); color: var(--success);">
                          مدفوعة (Stripe)
                        </span>
                      </td>
                      <td>
                        <button class="btn btn-sm btn-outline" onclick="alert('جاري توليد ملف PDF للفاتورة للتحميل...')">تحميل PDF</button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            `}
          </div>
        </div>
      `;
    } 
    
    else if (activeSubTab === 'messages') {
      // Find all projects with message histories
      const chatProjects = projects.filter(p => p.messages && p.messages.length > 0);
      
      contentHTML = `
        <div class="dashboard-card">
          <div class="dashboard-card-header">
            <h3>مركز الرسائل والتنسيق البرمجي</h3>
          </div>
          <div class="dashboard-card-body" style="padding: 0;">
            ${chatProjects.length === 0 ? `
              <div style="padding: 40px; text-align: center; color: var(--text-muted);">
                لا توجد محادثات نشطة مع المطورين حالياً.
              </div>
            ` : `
              <div class="inbox-container">
                <div class="threads-sidebar">
                  <div class="threads-search-bar">
                    <input type="text" placeholder="البحث في الرسائل...">
                  </div>
                  <div class="threads-list">
                    ${chatProjects.map((p, idx) => {
                      const lastMsg = p.messages[p.messages.length - 1];
                      const dev = State.developers.find(d => d.id === p.developerId) || { name: "إدارة كودساينون", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80" };
                      return `
                        <div class="thread-item ${idx === 0 ? 'active' : ''}" data-project-id="${p.id}">
                          <img class="thread-avatar" src="${dev.avatar}" alt="مطور">
                          <div class="thread-info">
                            <div class="thread-header">
                              <span class="thread-name">${dev.name}</span>
                              <span class="thread-time en-nums">${lastMsg ? lastMsg.time : ''}</span>
                            </div>
                            <div class="thread-last-msg">${lastMsg ? lastMsg.text : 'بدء المحادثة'}</div>
                          </div>
                        </div>
                      `;
                    }).join('')}
                  </div>
                </div>
                
                <div class="chat-pane" id="client-chat-window-pane">
                  <!-- Injected dynamically by handleThreadSelect below -->
                  <div style="display:flex; align-items:center; justify-content:center; height:100%; color:var(--text-muted); font-size:0.9rem;">
                    الرجاء تحديد محادثة من القائمة الجانبية لعرض الرسائل.
                  </div>
                </div>
              </div>
            `}
          </div>
        </div>
      `;
    } 
    
    else if (activeSubTab === 'settings') {
      contentHTML = `
        <div class="dashboard-card">
          <div class="dashboard-card-header">
            <h3>إعدادات الملف الشخصي للعميل</h3>
          </div>
          <div class="dashboard-card-body" style="max-width: 600px;">
            <form onsubmit="alert('تم حفظ إعدادات حسابك بنجاح!'); return false;">
              <div style="display: flex; gap: 20px; align-items: center; margin-bottom: 24px;">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80" style="width: 80px; height: 80px; border-radius: var(--radius-full); object-fit: cover;">
                <button type="button" class="btn btn-sm btn-outline">تغيير الصورة الشخصية</button>
              </div>
              <div class="form-group">
                <label>اسم المستخدم الكامل</label>
                <input type="text" class="form-control" value="أحمد العتيبي">
              </div>
              <div class="form-group">
                <label>البريد الإلكتروني</label>
                <input type="email" class="form-control" value="ahmad.otaibi@gmail.com">
              </div>
              <div class="form-group">
                <label>رقم الجوال (موثق)</label>
                <input type="tel" class="form-control" value="+966 50 123 4567" style="direction: ltr; text-align: right;">
              </div>
              <button class="btn btn-primary" style="margin-top: 10px;">حفظ التغييرات</button>
            </form>
          </div>
        </div>
      `;
    }

    // Assemble the full shell
    container.innerHTML = `
      <div class="dashboard-shell fade-in">
        <!-- Sidebar Navigation -->
        <aside class="dashboard-sidebar">
          <div class="sidebar-header-info">
            <img class="sidebar-avatar" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80" alt="عميل">
            <div class="sidebar-avatar-info">
              <h4>أحمد العتيبي</h4>
              <p>حساب العميل VIP</p>
            </div>
          </div>
          <ul class="sidebar-menu">
            <li>
              <a href="javascript:void(0)" class="sidebar-menu-item ${activeSubTab === 'overview' ? 'active' : ''}" data-subtab="overview">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="7" height="9"></rect>
                  <rect x="14" y="3" width="7" height="5"></rect>
                  <rect x="14" y="12" width="7" height="9"></rect>
                  <rect x="3" y="16" width="7" height="5"></rect>
                </svg>
                لوحة التحكم العامة
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" class="sidebar-menu-item ${activeSubTab === 'projects' ? 'active' : ''}" data-subtab="projects">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
                مشاريعي الخاصة
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" class="sidebar-menu-item ${activeSubTab === 'downloads' ? 'active' : ''}" data-subtab="downloads">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                مركز التحميل
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" class="sidebar-menu-item ${activeSubTab === 'invoices' ? 'active' : ''}" data-subtab="invoices">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
                  <line x1="12" y1="4" x2="12" y2="20"></line>
                </svg>
                الفواتير والدفعات
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" class="sidebar-menu-item ${activeSubTab === 'messages' ? 'active' : ''}" data-subtab="messages">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                الرسائل والتنسيق
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" class="sidebar-menu-item ${activeSubTab === 'settings' ? 'active' : ''}" data-subtab="settings">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                إعدادات الحساب
              </a>
            </li>
          </ul>
        </aside>

        <!-- Main Dashboard Content -->
        <section class="dashboard-content">
          <div class="dashboard-title-area">
            <div>
              <h2>بوابة العميل الخاصة بك</h2>
              <p class="dashboard-subtitle">متابعة مشاريعك المخصصة، الفواتير، التحميلات والتنسيق البرمجي مع المطورين.</p>
            </div>
            <div>
              <a href="#submit-request" class="btn btn-primary">
                اطلب مشروعاً جديداً
              </a>
            </div>
          </div>

          <div id="subtab-content-root">
            ${contentHTML}
          </div>
        </section>
      </div>
    `;

    // Attach sub-tab trigger events
    container.querySelectorAll('.sidebar-menu-item, .btn-subtab-trigger').forEach(item => {
      item.addEventListener('click', (e) => {
        const subtab = item.getAttribute('data-subtab');
        handleTabClick(subtab);
      });
    });

    // Handle Active thread clicking in Messages tab
    if (activeSubTab === 'messages' && chatProjects.length > 0) {
      const threadItems = container.querySelectorAll('.thread-item');
      
      function renderChatPane(projId) {
        const proj = projects.find(p => p.id === projId);
        const dev = State.developers.find(d => d.id === proj.developerId) || { name: "إدارة كودساينون", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80" };
        const chatPane = container.querySelector('#client-chat-window-pane');
        
        if (chatPane && proj) {
          chatPane.innerHTML = `
            <div class="chat-header">
              <div class="chat-user-info">
                <img src="${dev.avatar}" style="width: 32px; height: 32px; border-radius: var(--radius-full); object-fit: cover;">
                <div>
                  <div class="chat-username">${dev.name}</div>
                  <div class="chat-userstatus">نشط الآن في التطوير</div>
                </div>
              </div>
              <a href="#project/${proj.id}" class="btn btn-sm btn-outline">صفحة المشروع</a>
            </div>
            <div class="chat-messages-container" id="client-chat-msgs">
              ${proj.messages.map(m => `
                <div class="chat-bubble-wrapper ${m.sender === 'client' ? 'sent' : 'received'}">
                  <div class="chat-bubble">
                    ${m.text}
                  </div>
                  <span class="chat-meta">${m.sender === 'client' ? 'أنت' : m.sender === 'developer' ? dev.name : 'الإدارة'} • ${m.time}</span>
                </div>
              `).join('')}
            </div>
            <div class="chat-footer">
              <input type="text" class="chat-input" id="client-chat-input" placeholder="اكتب رسالة للمطور للتنسيق البرمجي...">
              <button class="btn btn-primary btn-sm" id="client-chat-send-btn">إرسال</button>
            </div>
          `;

          // Auto-scroll chat to bottom
          const chatMsgs = chatPane.querySelector('#client-chat-msgs');
          if (chatMsgs) chatMsgs.scrollTop = chatMsgs.scrollHeight;

          // Message send action
          const sendBtn = chatPane.querySelector('#client-chat-send-btn');
          const chatInput = chatPane.querySelector('#client-chat-input');
          
          function sendMessage() {
            const text = chatInput.value.trim();
            if (text) {
              State.addMessage(proj.id, 'client', text);
              chatInput.value = '';
              renderChatPane(proj.id);
            }
          }

          sendBtn.addEventListener('click', sendMessage);
          chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
          });
        }
      }

      threadItems.forEach(item => {
        item.addEventListener('click', () => {
          threadItems.forEach(t => t.classList.remove('active'));
          item.classList.add('active');
          const projId = item.getAttribute('data-project-id');
          renderChatPane(projId);
        });
      });

      // Load initial chat pane
      const firstProjId = chatProjects[0].id;
      renderChatPane(firstProjId);
    }
  }

  renderPortalContent();
}
