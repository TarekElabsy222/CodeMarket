/* ==========================================================================
   CODECYNON - ADMINISTRATOR PORTAL RENDERER
   ========================================================================== */

import State from '../state.js';

export function renderAdminPortal(container) {
  let activeSubTab = 'requests'; // requests, developers, analytics

  function handleTabClick(tabName) {
    activeSubTab = tabName;
    renderPortalContent();
  }

  function renderPortalContent() {
    const projects = State.projects;
    const developers = State.developers;

    // Filters for admin tasks
    const pendingRequests = projects.filter(p => p.status === 'new' || p.status === 'review');
    const biddingProjects = projects.filter(p => p.status === 'proposal');
    const activeProjects = projects.filter(p => ['approved', 'development', 'testing', 'ready'].includes(p.status));
    
    // Analytics values
    const totalContractValue = projects.reduce((sum, p) => sum + (p.acceptedPrice || 0), 0);
    const platformRevenue = totalContractValue * 0.1; // 10% platform cuts

    let contentHTML = '';

    if (activeSubTab === 'requests') {
      contentHTML = `
        <div class="dashboard-card" style="margin-bottom:30px;">
          <div class="dashboard-card-header">
            <h3>طلبات المشاريع الجديدة بانتظار الاعتماد الفني</h3>
            <span class="badge en-nums" style="background-color:var(--danger); color:white; padding:4px 8px; border-radius:var(--radius-sm); font-size:0.8rem; font-weight:700;">${pendingRequests.length}</span>
          </div>
          <div class="dashboard-card-body" style="padding:0;">
            ${pendingRequests.length === 0 ? `
              <div style="padding: 40px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
                لا توجد طلبات جديدة بانتظار المراجعة الفنية حالياً.
              </div>
            ` : `
              <table class="project-table">
                <thead>
                  <tr>
                    <th>اسم المشروع والعميل</th>
                    <th>التصنيف</th>
                    <th>الميزانية المقترحة</th>
                    <th>تاريخ التقديم</th>
                    <th>الحالة الحالية</th>
                    <th style="text-align:left;">إجراءات الإدارة</th>
                  </tr>
                </thead>
                <tbody>
                  ${pendingRequests.map(p => `
                    <tr>
                      <td>
                        <div class="project-name-cell">
                          <strong>${p.title}</strong>
                          <span>العميل: أحمد العتيبي</span>
                        </div>
                      </td>
                      <td>${p.category === 'web-systems' ? 'نظام ويب' : 'تطبيق جوال'}</td>
                      <td class="en-nums">${p.budget}</td>
                      <td class="en-nums">${p.dateSubmitted}</td>
                      <td>
                        <span class="badge-status ${p.status}">${State.getStatusLabel(p.status)}</span>
                      </td>
                      <td style="display:flex; gap:8px; justify-content:flex-end;">
                        <button class="btn btn-sm btn-secondary btn-admin-approve" data-project-id="${p.id}">
                          موافقة وطرح للعطاء
                        </button>
                        <button class="btn btn-sm btn-outline btn-admin-cancel" style="color:var(--danger); border-color:var(--danger);" data-project-id="${p.id}">
                          إلغاء الطلب
                        </button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            `}
          </div>
        </div>

        <!-- Simulator State Override Tool -->
        <div class="dashboard-card">
          <div class="dashboard-card-header" style="background-color: var(--primary-light);">
            <h3 style="color:var(--primary); font-weight:800;">أداة محاكاة تغيير الحالات (Developer Simulation Helper)</h3>
          </div>
          <div class="dashboard-card-body">
            <p style="font-size:0.825rem; line-height:1.6; margin-bottom:16px;">
              تتيح لك هذه الأداة الإدارية تجاوز تدفق العمل الطبيعي وتعديل حالة أي مشروع بشكل مباشر لمشاهدة كيف تنعكس التغيرات وتصاميم الخط الزمني والجداول في بوابات المطور والعميل والملفات.
            </p>
            
            <table class="project-table">
              <thead>
                <tr>
                  <th>اسم المشروع</th>
                  <th>المطور الحالي</th>
                  <th>الحالة الحالية</th>
                  <th>تغيير الحالة فوراً</th>
                </tr>
              </thead>
              <tbody>
                ${projects.map(p => {
                  const dev = developers.find(d => d.id === p.developerId);
                  return `
                    <tr>
                      <td><strong>${p.title}</strong></td>
                      <td>${dev ? dev.name : '<span style="color:var(--text-muted);">غير معين</span>'}</td>
                      <td>
                        <span class="badge-status ${p.status}">${State.getStatusLabel(p.status)}</span>
                      </td>
                      <td>
                        <select class="form-control sim-status-override-select" data-project-id="${p.id}" style="padding: 4px 8px; font-size: 0.8rem; width: 180px;">
                          <option value="new" ${p.status === 'new' ? 'selected' : ''}>جديد (New)</option>
                          <option value="review" ${p.status === 'review' ? 'selected' : ''}>تحت المراجعة (Review)</option>
                          <option value="proposal" ${p.status === 'proposal' ? 'selected' : ''}>العروض وطرح العطاء (Proposal)</option>
                          <option value="approved" ${p.status === 'approved' ? 'selected' : ''}>تمت الموافقة (Approved)</option>
                          <option value="development" ${p.status === 'development' ? 'selected' : ''}>قيد التنفيذ (Development)</option>
                          <option value="testing" ${p.status === 'testing' ? 'selected' : ''}>قيد الاختبار (Testing)</option>
                          <option value="ready" ${p.status === 'ready' ? 'selected' : ''}>جاهز للتسليم (Ready)</option>
                          <option value="completed" ${p.status === 'completed' ? 'selected' : ''}>مكتمل وصرف الدفعة (Completed)</option>
                          <option value="cancelled" ${p.status === 'cancelled' ? 'selected' : ''}>ملغى (Cancelled)</option>
                        </select>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } 
    
    else if (activeSubTab === 'developers') {
      contentHTML = `
        <div class="dashboard-card">
          <div class="dashboard-card-header">
            <h3>قائمة المطورين المعتمدين بالمنصة</h3>
            <button class="btn btn-sm btn-primary" onclick="alert('محاكاة: لا يمكن إضافة مطورين جدد في النسخة التجريبية الحالية.')">تسجيل مطور جديد</button>
          </div>
          <div class="dashboard-card-body" style="padding:0;">
            <table class="project-table">
              <thead>
                <tr>
                  <th>اسم المطور</th>
                  <th>العنوان الوظيفي</th>
                  <th>التقييم العام</th>
                  <th>المشاريع المنفذة</th>
                  <th>المهارات الفنية</th>
                  <th>حالة الموثوقية</th>
                </tr>
              </thead>
              <tbody>
                ${developers.map(d => `
                  <tr>
                    <td>
                      <div style="display:flex; align-items:center; gap:10px;">
                        <img src="${d.avatar}" style="width:36px; height:36px; border-radius:var(--radius-full); object-fit:cover;">
                        <strong>${d.name}</strong>
                      </div>
                    </td>
                    <td>${d.title}</td>
                    <td class="en-nums" style="color:var(--warning); font-weight:700;">★ ${d.rating}</td>
                    <td class="en-nums">${d.completedProjects} مشروع</td>
                    <td>
                      ${d.skills.map(sk => `<span class="badge-status new" style="font-size:0.7rem; padding:2px 6px; margin-left:4px;">${sk}</span>`).join('')}
                    </td>
                    <td>
                      <span class="badge-status completed" style="background-color:var(--success-glow); color:var(--success);">مفعل ومعتمد</span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } 
    
    else if (activeSubTab === 'analytics') {
      contentHTML = `
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-info">
              <span class="metric-label">إجمالي حجم التداولات (GMV)</span>
              <span class="metric-value en-nums">$${totalContractValue.toLocaleString()}</span>
            </div>
            <div class="metric-icon-box" style="background-color: var(--primary-light); color: var(--primary);">
              📈
            </div>
          </div>
          
          <div class="metric-card">
            <div class="metric-info">
              <span class="metric-label">أرباح عمولة المنصة (%10)</span>
              <span class="metric-value en-nums">$${platformRevenue.toLocaleString()}</span>
            </div>
            <div class="metric-icon-box" style="background-color: var(--success-glow); color: var(--success);">
              💰
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-info">
              <span class="metric-label">نسبة المشاريع المكتملة</span>
              <span class="metric-value en-nums">%92.4</span>
            </div>
            <div class="metric-icon-box" style="background-color: var(--info-glow); color: var(--info);">
              🏆
            </div>
          </div>
        </div>

        <div class="two-col-grid" style="margin-top:30px;">
          <div class="dashboard-card">
            <div class="dashboard-card-header">
              <h3>توزيع المشاريع البرمجية حسب التصنيف</h3>
            </div>
            <div class="dashboard-card-body" style="text-align:center; padding: 40px 20px;">
              <!-- Simple CSS representation of statistics metrics chart -->
              <div style="display:flex; justify-content:space-around; align-items:flex-end; height:180px; padding-bottom:20px;">
                <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
                  <div style="width:40px; height:120px; background:var(--primary); border-radius: var(--radius-sm) var(--radius-sm) 0 0;"></div>
                  <span style="font-size:0.8rem; font-weight:700;">أنظمة ويب (%60)</span>
                </div>
                <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
                  <div style="width:40px; height:60px; background:var(--info); border-radius: var(--radius-sm) var(--radius-sm) 0 0;"></div>
                  <span style="font-size:0.8rem; font-weight:700;">تطبيقات جوال (%30)</span>
                </div>
                <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
                  <div style="width:40px; height:20px; background:var(--warning); border-radius: var(--radius-sm) var(--radius-sm) 0 0;"></div>
                  <span style="font-size:0.8rem; font-weight:700;">أخرى (%10)</span>
                </div>
              </div>
            </div>
          </div>

          <div class="dashboard-card">
            <div class="dashboard-card-header">
              <h3>أداء معالجة طلبات المشاريع</h3>
            </div>
            <div class="dashboard-card-body" style="display:flex; flex-direction:column; gap:16px;">
              <div>
                <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-bottom:6px;">
                  <span>مراجعة الطلبات خلال 24 ساعة:</span>
                  <strong>%98.2</strong>
                </div>
                <div style="width:100%; height:6px; background-color:var(--border-light); border-radius:3px; overflow:hidden;">
                  <div style="width:98%; height:100%; background-color:var(--success);"></div>
                </div>
              </div>
              
              <div>
                <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-bottom:6px;">
                  <span>الموافقة على التصميمات الفنية:</span>
                  <strong>%88.5</strong>
                </div>
                <div style="width:100%; height:6px; background-color:var(--border-light); border-radius:3px; overflow:hidden;">
                  <div style="width:88%; height:100%; background-color:var(--primary);"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="dashboard-shell fade-in">
        <!-- Sidebar Navigation -->
        <aside class="dashboard-sidebar">
          <div class="sidebar-header-info">
            <div class="role-indicator admin" style="width:44px; height:44px; border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center; color:white; font-size:1.4rem;">
              ⚙️
            </div>
            <div class="sidebar-avatar-info">
              <h4>لوحة تحكم المسؤول</h4>
              <p>إدارة منصة كودساينون</p>
            </div>
          </div>
          <ul class="sidebar-menu">
            <li>
              <a href="javascript:void(0)" class="sidebar-menu-item ${activeSubTab === 'requests' ? 'active' : ''}" data-subtab="requests">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
                مراجعة واعتماد الطلبات
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" class="sidebar-menu-item ${activeSubTab === 'developers' ? 'active' : ''}" data-subtab="developers">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                سجل المطورين المعتمدين
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" class="sidebar-menu-item ${activeSubTab === 'analytics' ? 'active' : ''}" data-subtab="analytics">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
                تحليلات وإحصاءات الأداء
              </a>
            </li>
          </ul>
        </aside>

        <!-- Main Dashboard Content -->
        <section class="dashboard-content">
          <div class="dashboard-title-area">
            <div>
              <h2>الإدارة العامة لمنصة كودساينون (Admin)</h2>
              <p class="dashboard-subtitle">فحص واعتماد المشاريع المخصصة المطروحة، وإدارة عقود المطورين وتحليل المبيعات.</p>
            </div>
          </div>

          <div id="subtab-content-root">
            ${contentHTML}
          </div>
        </section>
      </div>
    `;

    // Attach sub-tab trigger events
    container.querySelectorAll('.sidebar-menu-item').forEach(item => {
      item.addEventListener('click', () => {
        handleTabClick(item.getAttribute('data-subtab'));
      });
    });

    // Accept request action
    container.querySelectorAll('.btn-admin-approve').forEach(btn => {
      btn.addEventListener('click', () => {
        const projId = btn.getAttribute('data-project-id');
        State.updateProjectStatus(projId, 'proposal');
        alert('تم اعتماد المشروع الفني بنجاح وطرحه لتلقي عروض المطورين.');
        renderPortalContent();
      });
    });

    // Decline request action
    container.querySelectorAll('.btn-admin-cancel').forEach(btn => {
      btn.addEventListener('click', () => {
        const projId = btn.getAttribute('data-project-id');
        if (confirm('هل أنت متأكد من رغبتك في إلغاء طلب المشروع؟')) {
          State.updateProjectStatus(projId, 'cancelled');
          alert('تم إلغاء طلب المشروع بنجاح.');
          renderPortalContent();
        }
      });
    });

    // Simulator State dropdown override event
    container.querySelectorAll('.sim-status-override-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const projId = select.getAttribute('data-project-id');
        const nextStatus = e.target.value;
        
        State.updateProjectStatus(projId, nextStatus);
        
        // If transitioning to approved/development/testing/ready and it has no developer assigned, assign developer A (Saleem) automatically for convenience
        const proj = State.projects.find(p => p.id === projId);
        if (proj && ['approved', 'development', 'testing', 'ready', 'completed'].includes(nextStatus) && !proj.developerId) {
          proj.developerId = 'dev-1'; // Saleem
          proj.acceptedPrice = proj.budgetMin || 5000;
          proj.acceptedDays = 40;
          State.saveState();
        }

        alert(`تم تغيير حالة المشروع بشكل يدوي إلى: ${State.getStatusLabel(nextStatus)}. يمكنك الآن تفقد كيف تبدو الصفحة في بوابة العميل أو المطور!`);
        renderPortalContent();
      });
    });
  }

  renderPortalContent();
}
