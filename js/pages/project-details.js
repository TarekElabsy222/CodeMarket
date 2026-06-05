/* ==========================================================================
   CODECYNON - PROJECT DETAILS & WORKSPACE RENDERER
   ========================================================================== */

import State from '../state.js';

export function renderProjectDetails(container, projectId, subView = 'overview') {
  // subView can be: overview, proposals, messages, files
  const project = State.projects.find(p => p.id === projectId);
  
  if (!project) {
    container.innerHTML = `
      <div class="landing-wrapper" style="text-align: center; padding: 80px 0;">
        <h3>المشروع المطلوب غير موجود</h3>
        <p style="margin-top: 10px;">يرجى التحقق من الرابط أو الانتقال إلى لوحة التحكم الخاصة بك.</p>
        <a href="#client-dashboard" class="btn btn-primary" style="margin-top: 20px;">العودة للوحة التحكم</a>
      </div>
    `;
    return;
  }

  const dev = State.developers.find(d => d.id === project.developerId);
  const userRole = State.currentUserRole; // client, developer, admin

  // Helper to draw status timeline index
  const statusOrder = ['new', 'review', 'proposal', 'approved', 'development', 'testing', 'ready', 'completed', 'cancelled'];
  let currentStatusIdx = statusOrder.indexOf(project.status);
  if (project.status === 'cancelled') {
    currentStatusIdx = 8; // Highlight cancelled uniquely
  }

  function renderWorkspace() {
    let workspaceContent = '';

    if (subView === 'overview') {
      workspaceContent = `
        <div class="two-col-grid">
          <!-- Main description & details -->
          <div style="display: flex; flex-direction: column; gap: 24px;">
            <div class="dashboard-card">
              <div class="dashboard-card-header">
                <h3>الوصف الفني ومتطلبات المشروع</h3>
              </div>
              <div class="dashboard-card-body" style="display: flex; flex-direction: column; gap: 16px;">
                <div>
                  <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">الفكرة العامة:</h4>
                  <p style="font-size: 0.875rem; line-height: 1.6; color: var(--text-secondary);">${project.description}</p>
                </div>
                
                <div style="border-top: 1px solid var(--border-light); padding-top: 16px;">
                  <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">الميزات المطلوب تطويرها:</h4>
                  <ul style="display: flex; flex-direction: column; gap: 8px; list-style-type: disc; padding-right: 20px; font-size: 0.85rem; color: var(--text-secondary);">
                    ${project.features.split('\n').map(f => `<li>${f.replace(/^- /, '')}</li>`).join('')}
                  </ul>
                </div>

                ${project.targetAudience ? `
                  <div style="border-top: 1px solid var(--border-light); padding-top: 16px;">
                    <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">الجمهور المستهدف:</h4>
                    <p style="font-size: 0.85rem; color: var(--text-secondary);">${project.targetAudience}</p>
                  </div>
                ` : ''}
              </div>
            </div>

            <!-- Attachments and Reference links -->
            <div class="dashboard-card">
              <div class="dashboard-card-header">
                <h3>ملفات الشروط والمراجع المرفقة</h3>
              </div>
              <div class="dashboard-card-body">
                ${project.attachments.length === 0 && !project.references ? `
                  <p style="font-size: 0.85rem; color: var(--text-muted); text-align: center;">لا توجد ملفات مرفقة بالطلب.</p>
                ` : `
                  <div style="display: flex; flex-direction: column; gap: 14px;">
                    ${project.references ? `
                      <div>
                        <strong style="display:block; font-size:0.85rem; margin-bottom:4px;">روابط مرجعية:</strong>
                        <a href="${project.references}" target="_blank" style="font-size:0.8rem; color:var(--primary); font-weight:600; text-decoration:underline;">${project.references}</a>
                      </div>
                    ` : ''}
                    
                    ${project.attachments.length > 0 ? `
                      <div>
                        <strong style="display:block; font-size:0.85rem; margin-bottom:8px;">مستندات التصميم والمواصفات:</strong>
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                          ${project.attachments.map(att => `
                            <div class="selected-file-item" style="background-color: var(--bg-secondary); border-radius: var(--radius-md); padding: 10px 14px;">
                              <span>📄 ${att.name} (${att.size})</span>
                              <button class="btn btn-sm btn-outline" style="padding: 2px 8px; font-size: 0.7rem; border-color: var(--border-medium);" onclick="alert('جاري محاكاة تحميل الملف...')">تحميل</button>
                            </div>
                          `).join('')}
                        </div>
                      </div>
                    ` : ''}
                  </div>
                `}
              </div>
            </div>
          </div>

          <!-- Timeline sidebar logger -->
          <div style="display: flex; flex-direction: column; gap: 24px;">
            <!-- Assigned Developer Card -->
            <div class="dashboard-card">
              <div class="dashboard-card-header">
                <h3>المطور المعين</h3>
              </div>
              <div class="dashboard-card-body" style="text-align: center;">
                ${dev ? `
                  <img src="${dev.avatar}" style="width: 64px; height: 64px; border-radius: var(--radius-full); border: 2.5px solid var(--primary-light); object-fit: cover; margin-bottom: 12px;">
                  <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary);">${dev.name}</h4>
                  <p style="font-size: 0.775rem; color: var(--text-muted); margin-top: 4px;">${dev.title}</p>
                  <div style="display: flex; justify-content: center; gap: 4px; color: var(--warning); font-size: 0.8rem; margin: 8px 0;">
                    ★ ${dev.rating} (${dev.reviewsCount} مراجعة)
                  </div>
                  <div style="border-top: 1px solid var(--border-light); padding-top: 12px; margin-top: 12px; display: flex; gap: 10px; justify-content: center;">
                    <a href="javascript:void(0)" class="btn btn-sm btn-outline btn-subtab-direct" data-subtab="messages">إرسال رسالة</a>
                    <a href="javascript:void(0)" class="btn btn-sm btn-outline btn-subtab-direct" data-subtab="files">ملفات العمل</a>
                  </div>
                ` : `
                  <div style="padding: 20px 0;">
                    <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px;">لم يتم تعيين مطور للمشروع بعد.</p>
                    ${project.status === 'proposal' ? `
                      <a href="javascript:void(0)" class="btn btn-sm btn-primary btn-subtab-direct" data-subtab="proposals">دراسة العروض البرمجية</a>
                    ` : `
                      <span style="font-size: 0.75rem; color: var(--primary); font-weight: 600;">بانتظار موافقة الإدارة وطرح العطاء للمطورين...</span>
                    `}
                  </div>
                `}
              </div>
            </div>

            <!-- Financial Card summary -->
            <div class="dashboard-card">
              <div class="dashboard-card-header">
                <h3>الميزانية والجدول الزمني</h3>
              </div>
              <div class="dashboard-card-body" style="display: flex; flex-direction: column; gap: 12px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; padding-bottom: 8px; border-bottom: 1px solid var(--bg-tertiary);">
                  <span style="color: var(--text-secondary);">ميزانية العقد المالي:</span>
                  <strong class="en-nums" style="color: var(--primary);">${project.acceptedPrice ? '$' + project.acceptedPrice : project.budget}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; padding-bottom: 8px; border-bottom: 1px solid var(--bg-tertiary);">
                  <span style="color: var(--text-secondary);">فترة التنفيذ المعتمدة:</span>
                  <strong class="en-nums">${project.acceptedDays ? project.acceptedDays + ' يوم' : project.deadline}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
                  <span style="color: var(--text-secondary);">تاريخ البداية:</span>
                  <strong class="en-nums">${project.dateSubmitted}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    } 
    
    else if (subView === 'proposals') {
      const proposals = project.proposals || [];
      workspaceContent = `
        <div class="dashboard-card">
          <div class="dashboard-card-header">
            <h3>عروض المطورين المقدمة لمشروعك</h3>
            <span>إجمالي العروض المتوفرة: <strong class="en-nums">${proposals.length}</strong></span>
          </div>
          <div class="dashboard-card-body">
            ${proposals.length === 0 ? `
              <div style="padding: 40px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
                لا توجد عروض مقدمة على مشروعك حالياً. يقوم المطورون بدراسة شروط مشروعك الآن وتقديم عروضهم قريباً.
              </div>
            ` : `
              <div class="proposals-comparison-grid">
                ${proposals.map(prop => {
                  const pDev = State.developers.find(d => d.id === prop.developerId);
                  return `
                    <div class="proposal-comparison-card">
                      <!-- Dev details -->
                      <div class="proposal-dev-details">
                        <img src="${pDev.avatar}" class="dev-avatar" alt="avatar">
                        <div class="dev-info">
                          <h4>${pDev.name}</h4>
                          <span class="dev-rating">★ ${pDev.rating} (${pDev.reviewsCount})</span>
                        </div>
                      </div>
                      
                      <!-- Cost Metric -->
                      <div class="proposal-metric">
                        <span class="prop-lbl">قيمة العرض المالي:</span>
                        <strong class="prop-val en-nums" style="color: var(--primary); font-size: 1.15rem;">$${prop.price}</strong>
                      </div>

                      <!-- Timeline Metric -->
                      <div class="proposal-metric">
                        <span class="prop-lbl">فترة التسليم:</span>
                        <strong class="prop-val en-nums">${prop.days} يوم</strong>
                      </div>

                      <!-- Action CTA -->
                      <div style="text-align: left;">
                        ${userRole === 'client' ? `
                          <button class="btn btn-primary btn-sm accept-proposal-btn" data-proposal-id="${prop.id}">
                            قبول العرض وبدء العمل
                          </button>
                        ` : `
                          <span style="color: var(--text-muted); font-size: 0.775rem;">بانتظار رد العميل</span>
                        `}
                      </div>

                      <!-- Cover Letter Block -->
                      <div style="grid-column: 1 / -1; border-top: 1px solid var(--border-light); padding-top: 14px; margin-top: 4px;">
                        <strong style="display:block; font-size:0.8rem; margin-bottom:6px; color:var(--text-primary);">تفاصيل المنهجية الفنية المقترحة:</strong>
                        <p style="font-size:0.825rem; line-height:1.6; color:var(--text-secondary); white-space:pre-wrap;">${prop.coverLetter}</p>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            `}
          </div>
        </div>
      `;
    } 
    
    else if (subView === 'messages') {
      workspaceContent = `
        <div class="dashboard-card">
          <div class="dashboard-card-header">
            <h3>قناة المحادثة والتنسيق البرمجي المباشر</h3>
            <span style="font-size: 0.75rem; color: var(--text-muted);">تخضع المحادثات لسياسة حماية كودساينون التقنية لضمان حقوقك.</span>
          </div>
          <div class="dashboard-card-body" style="padding: 0;">
            <div class="chat-pane" style="height: 480px;">
              <div class="chat-messages-container" id="details-chat-msgs">
                ${project.messages.map(m => {
                  let senderName = '';
                  let bubbleClass = '';
                  
                  if (m.sender === 'client') {
                    senderName = 'أحمد العتيبي (أنت)';
                    bubbleClass = userRole === 'client' ? 'sent' : 'received';
                  } else if (m.sender === 'developer') {
                    senderName = dev ? dev.name : 'المطور';
                    bubbleClass = userRole === 'developer' ? 'sent' : 'received';
                  } else {
                    senderName = 'إدارة كودساينون';
                    bubbleClass = 'received';
                  }

                  return `
                    <div class="chat-bubble-wrapper ${bubbleClass}">
                      <div class="chat-bubble">
                        ${m.text}
                      </div>
                      <span class="chat-meta">${senderName} • ${m.time}</span>
                    </div>
                  `;
                }).join('')}
              </div>
              <div class="chat-footer">
                <input type="text" class="chat-input" id="details-chat-input" placeholder="اكتب رسالة للتنسيق وتبادل التفاصيل الفنية...">
                <button class="btn btn-primary btn-sm" id="details-chat-send-btn">إرسال الرسالة</button>
              </div>
            </div>
          </div>
        </div>
      `;
    } 
    
    else if (subView === 'files') {
      // Modern cloud file explorer
      const projectFiles = project.files || [];
      const currentFolder = 'src'; // default selected folder in simulation

      function renderFileExplorer(folderName) {
        const filteredFiles = projectFiles.filter(f => f.category === folderName);
        const folderMain = container.querySelector('#explorer-main-content');
        
        if (folderMain) {
          folderMain.innerHTML = `
            <div class="file-manager-actions">
              <div>
                <h4 style="font-size: 1rem; font-weight:700;">المستندات في المجلد: <span style="color:var(--primary);">${getFolderLabel(folderName)}</span></h4>
              </div>
              <div style="display:flex; gap:10px;">
                <button class="btn btn-sm btn-outline" onclick="alert('جاري ضغط الملفات وتحميل الحزمة كاملة...')">
                  تحميل مجلد العمل بالكامل (.zip)
                </button>
                ${userRole === 'developer' ? `
                  <button class="btn btn-sm btn-primary" id="sim-upload-file-btn">
                    رفع ملف جديد للمجلد
                  </button>
                ` : ''}
              </div>
            </div>

            <!-- Files list -->
            ${filteredFiles.length === 0 ? `
              <div style="padding: 40px; text-align: center; color: var(--text-muted); font-size: 0.85rem; border: 1px dashed var(--border-light); border-radius: var(--radius-md);">
                المجلد فارغ حالياً. لا توجد ملفات مرفوعة هنا.
              </div>
            ` : `
              <div class="file-grid">
                ${filteredFiles.map(f => `
                  <div class="file-card">
                    <div class="file-card-icon ${f.category}">
                      📄
                    </div>
                    <div class="file-card-name" title="${f.name}">${f.name}</div>
                    <div class="file-card-size en-nums">${f.size}</div>
                    <div style="font-size:0.7rem; color:var(--text-muted); margin-top:-4px;">الإصدار: <strong class="en-nums">${f.version}</strong></div>
                    <div class="file-card-actions">
                      <button class="btn btn-sm btn-outline" style="padding: 2px 8px; font-size: 0.7rem;" onclick="alert('بدء تحميل ${f.name}...')">تحميل</button>
                      <button class="btn btn-sm btn-outline" style="padding: 2px 8px; font-size: 0.7rem;" onclick="alert('تاريخ الإصدارات للملف:\\n- ${f.version} تم رفعه في ${f.date} بواسطة ${f.uploadedBy === 'developer' ? 'المطور' : 'العميل'}')">الإصدارات</button>
                    </div>
                  </div>
                `).join('')}
              </div>
            `}

            <!-- Recent activity logs inside folder -->
            <div style="border-top:1px solid var(--border-light); padding-top:20px; margin-top:10px;">
              <h5 style="margin-bottom: 12px; font-weight:700;">سجل العمليات الأخير على المجلد</h5>
              <div class="activity-log">
                ${filteredFiles.map(f => `
                  <div class="activity-item">
                    <div class="activity-meta">
                      <span style="font-size: 1.1rem;">⚡</span>
                      <span>قام المطور برفع الملف <strong class="en-nums" style="color:var(--primary); font-size:0.8rem;">${f.name}</strong> كإصدار جديد <strong class="en-nums">${f.version}</strong></span>
                    </div>
                    <span class="en-nums" style="color:var(--text-muted); font-size:0.75rem;">${f.date}</span>
                  </div>
                `).join('')}
                ${filteredFiles.length === 0 ? '<span style="font-size:0.775rem; color:var(--text-muted);">لا توجد عمليات مسجلة</span>' : ''}
              </div>
            </div>
          `;

          // Setup simulation file uploader inside folder
          const uploadBtn = folderMain.querySelector('#sim-upload-file-btn');
          if (uploadBtn) {
            uploadBtn.addEventListener('click', () => {
              const name = prompt('أدخل اسم الملف المراد رفعه لمحاكاة العملية (مثال: index.js, db_schema.sql):');
              if (name) {
                const ext = name.split('.').pop();
                let category = 'src';
                if (['sql', 'db'].includes(ext)) category = 'db';
                if (['pdf', 'docx', 'md'].includes(ext)) category = 'docs';
                if (['png', 'jpg', 'zip'].includes(ext)) category = 'assets';

                State.addFile(project.id, {
                  name: name,
                  category: category,
                  size: '1.8 MB',
                  uploadedBy: userRole,
                  version: 'v1.0.0'
                });

                alert(`تم محاكاة رفع الملف ${name} بنجاح إلى مجلد ${getFolderLabel(category)}.`);
                renderFileExplorer(folderName);
              }
            });
          }
        }
      }

      function getFolderLabel(folder) {
        const labels = {
          'src': 'الأكواد المصدرية (Source Code)',
          'db': 'قواعد البيانات (Database)',
          'docs': 'المستندات والتعليمات (Documentation)',
          'assets': 'ملفات التصاميم والأصول (Assets)'
        };
        return labels[folder] || folder;
      }

      workspaceContent = `
        <div class="file-manager">
          <!-- Folder selection sidebar -->
          <div class="file-manager-sidebar">
            <h5 style="margin-bottom:12px; font-weight:700; font-size:0.85rem; color:var(--text-primary);">المجلدات السحابية</h5>
            <div class="file-folder-menu">
              <button class="folder-menu-item active" data-folder="src">
                📁 الأكواد المصدرية
              </button>
              <button class="folder-menu-item" data-folder="db">
                📁 قواعد البيانات
              </button>
              <button class="folder-menu-item" data-folder="docs">
                📁 المستندات والكتيبات
              </button>
              <button class="folder-menu-item" data-folder="assets">
                📁 الأصول والتصميمات
              </button>
            </div>
            
            <div style="border-top:1px solid var(--border-light); margin-top:20px; padding-top:16px;">
              <h6 style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">مساحة التخزين المستهلكة</h6>
              <div style="width:100%; height:6px; background-color:var(--border-light); border-radius:3px; margin:8px 0 4px 0; overflow:hidden;">
                <div style="width:45%; height:100%; background-color:var(--primary);"></div>
              </div>
              <span class="en-nums" style="font-size:0.7rem; color:var(--text-muted);">48.2 MB مستخدمة من 10 GB</span>
            </div>
          </div>

          <!-- Explorer dynamic window -->
          <div class="file-manager-main" id="explorer-main-content">
            <!-- Injected by renderFileExplorer above -->
          </div>
        </div>
      `;

      // Set timeout to draw initial folder after workspace is drawn
      setTimeout(() => {
        renderFileExplorer('src');
        
        // Attach sidebar folder click listeners
        const folderBtns = container.querySelectorAll('.folder-menu-item');
        folderBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            folderBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderFileExplorer(btn.getAttribute('data-folder'));
          });
        });
      }, 0);
    }

    // Draw main frame wrapper
    container.innerHTML = `
      <div class="landing-wrapper fade-in">
        <!-- Project header metrics card -->
        <div class="benefit-card" style="padding: 24px; margin-bottom: 24px; border: 1px solid var(--border-light); background-color: var(--bg-primary); border-radius: var(--radius-lg);">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px;">
            <div>
              <div style="display:flex; gap:10px; align-items:center; margin-bottom:8px;">
                <span class="badge-status ${project.status}">${State.getStatusLabel(project.status)}</span>
                <span class="en-nums" style="font-size: 0.775rem; color:var(--text-muted);">${project.id}</span>
              </div>
              <h2 style="font-size: 1.45rem; font-weight:800; color:var(--text-primary);">${project.title}</h2>
              <p style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">تاريخ إطلاق المناقصة: ${project.dateSubmitted}</p>
            </div>
            
            <div style="display:flex; gap:12px; align-items:center;">
              ${project.status === 'ready' && userRole === 'client' ? `
                <a href="#project/${project.id}/delivery" class="btn btn-secondary">
                  فحص حزمة تسليم المشروع النهائي
                </a>
              ` : ''}
              <a href="#${userRole === 'developer' ? 'dev-dashboard' : userRole === 'admin' ? 'admin-portal' : 'client-dashboard'}" class="btn btn-outline">
                العودة للوحة التحكم
              </a>
            </div>
          </div>

          <!-- Vertical / Horizontal 9-state Project Timeline design -->
          <div style="border-top:1px solid var(--border-light); margin-top:20px; padding-top:20px;">
            <div class="status-timeline">
              <div class="status-timeline-progress" style="width: ${project.status === 'cancelled' ? '0%' : (currentStatusIdx / 7) * 100}%"></div>
              
              <div class="timeline-step ${currentStatusIdx >= 0 ? 'completed' : ''} ${project.status === 'new' ? 'active' : ''}">
                <div class="timeline-dot">1</div>
                <span class="timeline-text">جديد</span>
              </div>
              <div class="timeline-step ${currentStatusIdx >= 1 ? 'completed' : ''} ${project.status === 'review' ? 'active' : ''}">
                <div class="timeline-dot">2</div>
                <span class="timeline-text">مراجعة</span>
              </div>
              <div class="timeline-step ${currentStatusIdx >= 2 ? 'completed' : ''} ${project.status === 'proposal' ? 'active' : ''}">
                <div class="timeline-dot">3</div>
                <span class="timeline-text">العروض</span>
              </div>
              <div class="timeline-step ${currentStatusIdx >= 3 ? 'completed' : ''} ${project.status === 'approved' ? 'active' : ''}">
                <div class="timeline-dot">4</div>
                <span class="timeline-text">موافق عليها</span>
              </div>
              <div class="timeline-step ${currentStatusIdx >= 4 ? 'completed' : ''} ${project.status === 'development' ? 'active' : ''}">
                <div class="timeline-dot">5</div>
                <span class="timeline-text">التطوير</span>
              </div>
              <div class="timeline-step ${currentStatusIdx >= 5 ? 'completed' : ''} ${project.status === 'testing' ? 'active' : ''}">
                <div class="timeline-dot">6</div>
                <span class="timeline-text">الاختبار</span>
              </div>
              <div class="timeline-step ${currentStatusIdx >= 6 ? 'completed' : ''} ${project.status === 'ready' ? 'active' : ''}">
                <div class="timeline-dot">7</div>
                <span class="timeline-text">جاهز للتسليم</span>
              </div>
              <div class="timeline-step ${currentStatusIdx >= 7 ? 'completed' : ''} ${project.status === 'completed' ? 'active' : ''}">
                <div class="timeline-dot">8</div>
                <span class="timeline-text">مكتمل</span>
              </div>
            </div>
            ${project.status === 'cancelled' ? `
              <div style="text-align: center; color: var(--danger); font-weight:700; font-size:0.8rem; margin-top:-10px;">
                ⚠️ تم إلغاء هذا المشروع!
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Project workspace subviews navigation tabs -->
        <div style="display:flex; border-bottom: 1.5px solid var(--border-light); margin-bottom: 24px; gap: 20px;">
          <button class="nav-link btn-subtab-link ${subView === 'overview' ? 'active' : ''}" data-view="overview" style="padding-bottom:12px;">نظرة عامة على المتطلبات</button>
          ${project.status === 'proposal' || project.proposals.length > 0 ? `
            <button class="nav-link btn-subtab-link ${subView === 'proposals' ? 'active' : ''}" data-view="proposals" style="padding-bottom:12px;">العروض وعطاء المطورين (${project.proposals.length})</button>
          ` : ''}
          ${project.developerId || userRole === 'admin' ? `
            <button class="nav-link btn-subtab-link ${subView === 'messages' ? 'active' : ''}" data-view="messages" style="padding-bottom:12px;">قناة التنسيق والرسائل</button>
            <button class="nav-link btn-subtab-link ${subView === 'files' ? 'active' : ''}" data-view="files" style="padding-bottom:12px;">ملفات ومجلدات المشروع</button>
          ` : ''}
        </div>

        <!-- Workspace main contents -->
        <div id="project-workspace-root">
          ${workspaceContent}
        </div>
      </div>
    `;

    // Tab switcher links action
    container.querySelectorAll('.btn-subtab-link, .btn-subtab-direct').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.getAttribute('data-view') || btn.getAttribute('data-subtab');
        renderProjectDetails(container, projectId, view);
      });
    });

    // Chat handling (in messages subview)
    if (subView === 'messages') {
      const chatMsgs = container.querySelector('#details-chat-msgs');
      if (chatMsgs) chatMsgs.scrollTop = chatMsgs.scrollHeight;

      const sendBtn = container.querySelector('#details-chat-send-btn');
      const chatInput = container.querySelector('#details-chat-input');

      function sendMessage() {
        const text = chatInput.value.trim();
        if (text) {
          State.addMessage(project.id, userRole, text);
          chatInput.value = '';
          renderProjectDetails(container, projectId, 'messages');
        }
      }

      sendBtn.addEventListener('click', sendMessage);
      chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
      });
    }

    // Accept proposals logic (in proposals subview)
    if (subView === 'proposals') {
      container.querySelectorAll('.accept-proposal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const propId = btn.getAttribute('data-proposal-id');
          if (confirm('هل أنت متأكد من رغبتك في قبول هذا العرض البرمجي؟ سيتم تجميد مبلغ العقد في الضمان وبدء التنفيذ فوراً.')) {
            State.acceptProposal(project.id, propId);
            alert('تم قبول العرض! وبدأ العمل على مشروعك الخاص. تم فتح قناة التواصل والمجلدات.');
            renderProjectDetails(container, projectId, 'overview');
          }
        });
      });
    }
  }

  renderWorkspace();
}
