/* ==========================================================================
   CODECYNON - DEVELOPER DASHBOARD PORTAL RENDERER
   ========================================================================== */

import State from '../state.js';

export function renderDevDashboard(container) {
  let activeSubTab = 'available'; // available, accepted, earnings
  let selectedBidProjectId = null; // for modal bids

  function handleTabClick(tabName) {
    activeSubTab = tabName;
    renderPortalContent();
  }

  function renderPortalContent() {
    const projects = State.projects;
    const currentDevId = State.currentUserId; // e.g. dev-2
    const currentDev = State.developers.find(d => d.id === currentDevId) || State.developers[0];

    // Filter projects for developer
    // Available: status is 'proposal' AND developer hasn't bid already OR status is 'review' (can view)
    const availableProjects = projects.filter(p => p.status === 'proposal' && !p.proposals.some(pr => pr.developerId === currentDevId));
    
    // Accepted: assigned to current developer AND is active
    const acceptedProjects = projects.filter(p => p.developerId === currentDevId && ['approved', 'development', 'testing', 'ready'].includes(p.status));
    
    // Completed: assigned to current developer AND is completed
    const completedProjects = projects.filter(p => p.developerId === currentDevId && p.status === 'completed');

    // Calculate metrics
    const totalEarnings = completedProjects.reduce((sum, p) => sum + (p.acceptedPrice || 0), 0);
    const inProgressCount = acceptedProjects.filter(p => p.status !== 'ready').length;
    const ratingScore = currentDev.rating;

    let contentHTML = '';

    if (activeSubTab === 'available') {
      contentHTML = `
        <div class="dashboard-card">
          <div class="dashboard-card-header">
            <h3>مشاريع متاحة لتقديم عروض تسعير</h3>
            <span style="font-size: 0.8rem; color: var(--text-muted);">المشاريع المتطابقة مع مهاراتك: <strong>${currentDev.skills.join(', ')}</strong></span>
          </div>
          <div class="dashboard-card-body">
            ${availableProjects.length === 0 ? `
              <div style="padding: 40px; text-align: center; color: var(--text-muted); font-size: 0.875rem;">
                لا توجد مشاريع جديدة متاحة للتقديم عليها حالياً. يرجى مراجعة لوحة الإدارة لاعتماد عروض جديدة.
              </div>
            ` : `
              <div style="display: flex; flex-direction: column; gap: 20px;">
                ${availableProjects.map(p => `
                  <div class="benefit-card" style="border: 1px solid var(--border-light); background-color: var(--bg-secondary); padding: 24px;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px;">
                      <div>
                        <span class="badge-status review" style="margin-bottom: 8px;">متاح للتقديم</span>
                        <h4 style="font-size: 1.1rem; font-weight: 700;">${p.title}</h4>
                        <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">تاريخ الطرح: ${p.dateSubmitted}</p>
                      </div>
                      <div style="text-align: left;">
                        <span style="display: block; font-size: 0.75rem; color: var(--text-muted);">ميزانية العميل:</span>
                        <strong class="en-nums" style="font-size: 1.15rem; color: var(--primary);">${p.budget}</strong>
                      </div>
                    </div>
                    
                    <p style="font-size: 0.85rem; line-height: 1.6; margin: 16px 0; color: var(--text-secondary);">${p.description}</p>
                    
                    <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-light); padding-top: 16px; margin-top: 8px;">
                      <div style="display: flex; gap: 16px; font-size: 0.775rem; color: var(--text-muted);">
                        <span>📅 تاريخ التسليم: <strong class="en-nums">${p.deadline}</strong></span>
                        <span>⚠️ الأولوية: <strong>${p.priority === 'high' ? 'مستعجل' : 'طبيعي'}</strong></span>
                      </div>
                      <button class="btn btn-sm btn-primary bid-trigger-btn" data-project-id="${p.id}">
                        تقديم عرض فني ومالي
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        </div>
      `;
    } 
    
    else if (activeSubTab === 'accepted') {
      contentHTML = `
        <div class="dashboard-card">
          <div class="dashboard-card-header">
            <h3>مشاريعك البرمجية الجارية والمسلمة</h3>
          </div>
          <div class="dashboard-card-body" style="padding: 0;">
            ${acceptedProjects.length === 0 ? `
              <div style="padding: 60px; text-align: center; color: var(--text-muted);">
                لا توجد مشاريع قيد التنفيذ حالياً. تصفح المشاريع المتاحة وقدم عرضاً لبدء العمل!
              </div>
            ` : `
              <table class="project-table">
                <thead>
                  <tr>
                    <th>اسم المشروع</th>
                    <th>مبلغ العقد</th>
                    <th>فترة التسليم</th>
                    <th>حالة المشروع</th>
                    <th>التحكم والمتابعة</th>
                  </tr>
                </thead>
                <tbody>
                  ${acceptedProjects.map(p => `
                    <tr>
                      <td>
                        <div class="project-name-cell">
                          <strong>${p.title}</strong>
                          <span>العميل: أحمد العتيبي</span>
                        </div>
                      </td>
                      <td class="en-nums" style="font-weight: 700; color: var(--text-primary);">$${p.acceptedPrice || 1200}</td>
                      <td class="en-nums">${p.acceptedDays || 30} يوم</td>
                      <td>
                        <span class="badge-status ${p.status}">
                          ${State.getStatusLabel(p.status)}
                        </span>
                      </td>
                      <td style="display: flex; gap: 8px; justify-content: flex-end;">
                        <a href="#project/${p.id}" class="btn btn-sm btn-outline">لوحة العمل الفنية</a>
                        ${p.status === 'development' ? `
                          <button class="btn btn-sm btn-outline btn-status-test-trigger" data-project-id="${p.id}" style="border-color: var(--info); color: var(--info);">نقل للاختبار</button>
                        ` : ''}
                        ${['development', 'testing'].includes(p.status) ? `
                          <a href="#project/${p.id}/delivery" class="btn btn-sm btn-primary">تسليم المشروع</a>
                        ` : ''}
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
    
    else if (activeSubTab === 'earnings') {
      contentHTML = `
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-info">
              <span class="metric-label">إجمالي الأرباح المستلمة</span>
              <span class="metric-value en-nums">$${totalEarnings.toLocaleString()}</span>
            </div>
            <div class="metric-icon-box" style="background-color: var(--success-glow); color: var(--success);">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
                <line x1="12" y1="4" x2="12" y2="20"></line>
              </svg>
            </div>
          </div>
          
          <div class="metric-card">
            <div class="metric-info">
              <span class="metric-label">المشاريع المكتملة</span>
              <span class="metric-value en-nums">${completedProjects.length}</span>
            </div>
            <div class="metric-icon-box" style="background-color: var(--primary-light); color: var(--primary);">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-info">
              <span class="metric-label">متوسط تقييم العملاء</span>
              <span class="metric-value en-nums">${ratingScore.toFixed(2)} / 5</span>
            </div>
            <div class="metric-icon-box" style="background-color: var(--warning-glow); color: var(--warning);">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
          </div>
        </div>

        <div class="dashboard-card" style="margin-top: 30px;">
          <div class="dashboard-card-header">
            <h3>تفاصيل الدفعات والأرباح</h3>
          </div>
          <div class="dashboard-card-body">
            ${completedProjects.length === 0 ? `
              <div style="padding: 40px; text-align: center; color: var(--text-muted);">
                لا توجد دفعات محولة لمحفظتك بعد. يتم تحويل المبالغ بمجرد اعتماد العميل لتسليم المشروع المخصص.
              </div>
            ` : `
              <table class="project-table">
                <thead>
                  <tr>
                    <th>تاريخ التحويل</th>
                    <th>البيان والمشروع</th>
                    <th>عمولة المنصة (%10)</th>
                    <th>الأرباح الصافية</th>
                    <th>الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  ${completedProjects.map(p => `
                    <tr>
                      <td class="en-nums">${p.delivery ? p.delivery.date : p.dateSubmitted}</td>
                      <td>أتعاب تطوير مخصصة - ${p.title}</td>
                      <td class="en-nums" style="color: var(--danger);">$${(p.acceptedPrice * 0.1).toFixed(0)}</td>
                      <td class="en-nums" style="font-weight: 700; color: var(--success);">$${(p.acceptedPrice * 0.9).toFixed(0)}</td>
                      <td>
                        <span class="badge-status completed" style="background-color: var(--success-glow); color: var(--success);">
                          تم التحويل للمصرف
                        </span>
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

    // Render Shell Layout
    container.innerHTML = `
      <div class="dashboard-shell fade-in">
        <!-- Sidebar Navigation -->
        <aside class="dashboard-sidebar">
          <div class="sidebar-header-info">
            <img class="sidebar-avatar" src="${currentDev.avatar}" alt="مطور">
            <div class="sidebar-avatar-info">
              <h4>${currentDev.name}</h4>
              <p>${currentDev.title}</p>
            </div>
          </div>
          <ul class="sidebar-menu">
            <li>
              <a href="javascript:void(0)" class="sidebar-menu-item ${activeSubTab === 'available' ? 'active' : ''}" data-subtab="available">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                مشاريع متاحة للمزايدة
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" class="sidebar-menu-item ${activeSubTab === 'accepted' ? 'active' : ''}" data-subtab="accepted">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
                مشاريعي البرمجية الجارية (${inProgressCount})
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" class="sidebar-menu-item ${activeSubTab === 'earnings' ? 'active' : ''}" data-subtab="earnings">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                محفظة الأرباح والتقارير
              </a>
            </li>
          </ul>
        </aside>

        <!-- Main Dashboard Content -->
        <section class="dashboard-content">
          <div class="dashboard-title-area">
            <div>
              <h2>بوابة مطوري كودساينون النخبة</h2>
              <p class="dashboard-subtitle">قدم عروضك الفنية للمشاريع، نسق العمل البرمجي مع العملاء، وسلم حزم برمجياتك بكفاءة.</p>
            </div>
          </div>

          <div id="subtab-content-root">
            ${contentHTML}
          </div>
        </section>
      </div>

      <!-- Proposal Bidding Modal -->
      <div class="modal-overlay" id="bid-modal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.6); z-index: 1000; display: none; align-items: center; justify-content: center; backdrop-filter: blur(4px);">
        <div class="form-wrapper" style="width: 500px; padding: 30px; animation: fadeIn 0.2s forwards; position: relative;">
          <button class="icon-btn" id="close-bid-modal" style="position: absolute; top: 20px; left: 20px; border:none; background:none; font-size:1.5rem; font-weight:700;">×</button>
          <h3 style="margin-bottom: 20px; font-weight: 800;">تقديم عرض فني لمشروع مخصص</h3>
          
          <form id="bid-submit-form" onsubmit="return false;">
            <div class="form-group">
              <label>قيمة العرض المالي المقترح (USD)</label>
              <input type="number" id="bid-price" class="form-control" placeholder="أدخل السعر المقترح (مثلاً: 2500)" required>
            </div>
            
            <div class="form-group">
              <label>فترة التسليم المتوقعة (بالأيام)</label>
              <input type="number" id="bid-days" class="form-control" placeholder="مثال: 30" required>
            </div>

            <div class="form-group">
              <label>عرضك الفني وخطتك للتنفيذ (Cover Letter)</label>
              <span class="label-desc">وضح للعميل خبرتك السابقة وقدرتك على تلبية متطلباته بدقة</span>
              <textarea id="bid-cover" class="form-control" placeholder="اكتب عرضك هنا بالتفصيل..."></textarea>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 20px;">
              <button type="button" class="btn btn-outline" id="cancel-bid-btn">إلغاء</button>
              <button type="button" class="btn btn-primary" id="confirm-bid-btn">إرسال العرض الآن</button>
            </div>
          </form>
        </div>
      </div>
    `;

    // Attach sub-tab trigger events
    container.querySelectorAll('.sidebar-menu-item').forEach(item => {
      item.addEventListener('click', () => {
        handleTabClick(item.getAttribute('data-subtab'));
      });
    });

    // Handle Bid Modal triggers
    const bidModal = container.querySelector('#bid-modal');
    const bidPrice = container.querySelector('#bid-price');
    const bidDays = container.querySelector('#bid-days');
    const bidCover = container.querySelector('#bid-cover');

    container.querySelectorAll('.bid-trigger-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedBidProjectId = btn.getAttribute('data-project-id');
        const proj = projects.find(p => p.id === selectedBidProjectId);
        if (proj) {
          // prefill budget estimate
          bidPrice.value = proj.budgetMin || 1000;
          bidDays.value = 30;
          bidModal.style.display = 'flex';
        }
      });
    });

    // Close Modal
    const closeModal = () => {
      bidModal.style.display = 'none';
      selectedBidProjectId = null;
    };

    container.querySelector('#close-bid-modal').addEventListener('click', closeModal);
    container.querySelector('#cancel-bid-btn').addEventListener('click', closeModal);

    // Confirm Bid Submission
    container.querySelector('#confirm-bid-btn').addEventListener('click', () => {
      const price = bidPrice.value.trim();
      const days = bidDays.value.trim();
      const cover = bidCover.value.trim();

      if (!price || !days || !cover) {
        alert('الرجاء تعبئة كافة الحقول المطلوبة لتقديم العرض.');
        return;
      }

      State.addProposal(selectedBidProjectId, {
        developerId: currentDevId,
        price: price,
        days: days,
        coverLetter: cover
      });

      alert('تم تقديم عرضك الفني والمالي بنجاح! سيتم إخطار العميل فوراً.');
      closeModal();
      renderPortalContent();
    });

    // Handle Status changing for testing simulation
    container.querySelectorAll('.btn-status-test-trigger').forEach(btn => {
      btn.addEventListener('click', () => {
        const projId = btn.getAttribute('data-project-id');
        State.updateProjectStatus(projId, 'testing');
        alert('تم تغيير حالة المشروع إلى: قيد الاختبار. تم إرسال إشعار للعميل.');
        renderPortalContent();
      });
    });
  }

  renderPortalContent();
}
