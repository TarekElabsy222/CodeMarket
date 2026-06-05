/* ==========================================================================
   CODECYNON - MULTI-STEP REQUEST PROJECT FORM RENDERER
   ========================================================================== */

import State from '../state.js';

export function renderSubmitRequest(container) {
  let currentStep = 1;
  const totalSteps = 5;

  // Form local state
  const formData = {
    title: '',
    category: 'web-systems',
    type: 'full-system',
    description: '',
    features: '',
    targetAudience: '',
    budget: '1,000$ - 3,000$',
    deadline: '30 يوم',
    priority: 'medium',
    references: '',
    additionalNotes: '',
    attachments: []
  };

  function updateWizardDOM() {
    // 1. Update active step panels
    for (let i = 1; i <= totalSteps; i++) {
      const panel = container.querySelector(`#wizard-step-${i}`);
      if (panel) {
        if (i === currentStep) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      }
    }

    // 2. Update step indicators
    const nodes = container.querySelectorAll('.step-node');
    nodes.forEach((node, index) => {
      const stepIdx = index + 1;
      if (stepIdx < currentStep) {
        node.classList.add('completed');
        node.classList.remove('active');
      } else if (stepIdx === currentStep) {
        node.classList.add('active');
        node.classList.remove('completed');
      } else {
        node.classList.remove('active', 'completed');
      }
    });

    // Update progress connection line
    const progressLine = container.querySelector('.step-progress-line');
    if (progressLine) {
      const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
      progressLine.style.width = `${percentage}%`;
    }

    // 3. Update Buttons
    const prevBtn = container.querySelector('#wizard-prev-btn');
    const nextBtn = container.querySelector('#wizard-next-btn');

    if (prevBtn && nextBtn) {
      if (currentStep === 1) {
        prevBtn.style.visibility = 'hidden';
      } else {
        prevBtn.style.visibility = 'visible';
      }

      if (currentStep === totalSteps) {
        nextBtn.innerHTML = `
          اعتماد وإرسال الطلب
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        `;
        nextBtn.classList.remove('btn-primary');
        nextBtn.classList.add('btn-secondary'); // emerald style
      } else {
        nextBtn.innerHTML = `
          الخطوة التالية
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        `;
        nextBtn.classList.remove('btn-secondary');
        nextBtn.classList.add('btn-primary');
      }
    }

    // 4. Fill review values if we are on step 5
    if (currentStep === 5) {
      fillReviewStep();
    }
  }

  function fillReviewStep() {
    container.querySelector('#rev-title').textContent = formData.title || 'غير محدد';
    container.querySelector('#rev-category').textContent = getCategoryLabel(formData.category);
    container.querySelector('#rev-type').textContent = getTypeLabel(formData.type);
    container.querySelector('#rev-desc').textContent = formData.description || 'لا يوجد';
    container.querySelector('#rev-features').textContent = formData.features || 'لا يوجد';
    container.querySelector('#rev-audience').textContent = formData.targetAudience || 'غير محدد';
    container.querySelector('#rev-budget').textContent = formData.budget;
    container.querySelector('#rev-deadline').textContent = formData.deadline;
    container.querySelector('#rev-priority').textContent = getPriorityLabel(formData.priority);
    container.querySelector('#rev-notes').textContent = formData.additionalNotes || 'لا توجد ملاحظات إضافية';
    
    // Attachments
    const filesContainer = container.querySelector('#rev-files');
    if (formData.attachments.length > 0) {
      filesContainer.innerHTML = formData.attachments.map(f => `
        <div class="selected-file-item" style="padding: 6px 12px; margin-top: 4px;">
          <span>📄 ${f.name} (${f.size})</span>
        </div>
      `).join('');
    } else {
      filesContainer.innerHTML = '<span style="color: var(--text-muted);">لا توجد ملفات مرفقة</span>';
    }
  }

  function getCategoryLabel(cat) {
    const cats = {
      'web-systems': 'موقع ويب / نظام سحابي',
      'mobile-apps': 'تطبيق جوال (iOS/Android)',
      'desktop-apps': 'برنامج لسطح المكتب',
      'custom-scripts': 'سكريبتات / إضافات أدوات'
    };
    return cats[cat] || cat;
  }

  function getTypeLabel(type) {
    const types = {
      'full-system': 'بناء نظام كامل من الصفر',
      'feature-addition': 'إضافة ميزات على مشروع قائم',
      'bug-fix': 'إصلاح أخطاء تقنية ومشاكل'
    };
    return types[type] || type;
  }

  function getPriorityLabel(prio) {
    const prios = {
      'low': 'منخفضة (مرن)',
      'medium': 'متوسطة (طبيعي)',
      'high': 'عالية (مستعجل)'
    };
    return prios[prio] || prio;
  }

  function validateStep(step) {
    if (step === 1) {
      const titleInput = container.querySelector('#proj-title-input');
      formData.title = titleInput.value.trim();
      if (!formData.title) {
        alert('الرجاء إدخال عنوان المشروع المناسب.');
        titleInput.focus();
        return false;
      }
    }
    if (step === 2) {
      const descInput = container.querySelector('#proj-desc-input');
      const featInput = container.querySelector('#proj-features-input');
      const audInput = container.querySelector('#proj-audience-input');

      formData.description = descInput.value.trim();
      formData.features = featInput.value.trim();
      formData.targetAudience = audInput.value.trim();

      if (formData.description.length < 20) {
        alert('يرجى كتابة وصف تفصيلي للمشروع (20 حرفاً على الأقل).');
        descInput.focus();
        return false;
      }
      if (!formData.features) {
        alert('الرجاء كتابة أهم الميزات المطلوبة في النظام.');
        featInput.focus();
        return false;
      }
    }
    if (step === 3) {
      formData.budget = container.querySelector('#proj-budget-input').value;
      formData.deadline = container.querySelector('#proj-deadline-input').value;
      formData.priority = container.querySelector('#proj-priority-input').value;
    }
    if (step === 4) {
      formData.references = container.querySelector('#proj-references-input').value.trim();
      formData.additionalNotes = container.querySelector('#proj-notes-input').value.trim();
    }
    return true;
  }

  // Draw Container Layout
  container.innerHTML = `
    <div class="landing-wrapper fade-in">
      <div class="form-wrapper">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 8px;">طلب مشروع برمجي مخصص</h2>
          <p style="color: var(--text-secondary); font-size: 0.95rem;">املأ هذا النموذج لنقوم بطرح مشروعك لنخبة المطورين المعتمدين بالمنصة.</p>
        </div>

        <!-- 5-Step Progress Indicator -->
        <div class="step-indicator">
          <div class="step-progress-line"></div>
          
          <div class="step-node active">
            <div class="step-circle">1</div>
            <span class="step-label">نوع المشروع</span>
          </div>
          <div class="step-node">
            <div class="step-circle">2</div>
            <span class="step-label">تفاصيل النظام</span>
          </div>
          <div class="step-node">
            <div class="step-circle">3</div>
            <span class="step-label">الميزانية والوقت</span>
          </div>
          <div class="step-node">
            <div class="step-circle">4</div>
            <span class="step-label">الملفات المرفقة</span>
          </div>
          <div class="step-node">
            <div class="step-circle">5</div>
            <span class="step-label">المراجعة والاعتماد</span>
          </div>
        </div>

        <!-- Form Panels -->
        <form id="project-request-form" onsubmit="return false;">
          
          <!-- STEP 1: Basic Classification -->
          <div class="wizard-step-panel active" id="wizard-step-1">
            <div class="form-group">
              <label for="proj-title-input">عنوان المشروع البرمجي</label>
              <span class="label-desc">اختر عنواناً واضحاً وموجزاً يصف الفكرة (مثال: منصة حجوزات عيادات طبية)</span>
              <input type="text" id="proj-title-input" class="form-control" placeholder="عنوان يوضح فكرة مشروعك..." required>
            </div>
            
            <div class="form-group">
              <label>تصنيف المشروع الأساسي</label>
              <div class="type-grid">
                <div class="type-option selected" data-cat="web-systems">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                  <span class="type-title">نظام ويب سحابي</span>
                </div>
                <div class="type-option" data-cat="mobile-apps">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                  </svg>
                  <span class="type-title">تطبيق جوال ذكي</span>
                </div>
                <div class="type-option" data-cat="desktop-apps">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="12" rx="2" ry="2"></rect>
                    <path d="M12 18V20"></path>
                    <path d="M7 20H17"></path>
                  </svg>
                  <span class="type-title">برامج ديسكتوب</span>
                </div>
              </div>
            </div>

            <div class="form-group" style="margin-top: 20px;">
              <label>نوع العمل المطلوب</label>
              <select id="proj-type-input" class="form-control">
                <option value="full-system" selected>بناء نظام متكامل وجديد بالكامل</option>
                <option value="feature-addition">إضافة وتطوير ميزات على كود قائم</option>
                <option value="bug-fix">إصلاح وحل مشاكل تقنية وأخطاء برمجية</option>
              </select>
            </div>
          </div>

          <!-- STEP 2: Project Specifications -->
          <div class="wizard-step-panel" id="wizard-step-2">
            <div class="form-group">
              <label for="proj-desc-input">وصف تفصيلي للنظام المقترح</label>
              <span class="label-desc">اكتب بالتفصيل فكرة التطبيق والوظائف التي ترغب في تحقيقها</span>
              <textarea id="proj-desc-input" class="form-control" placeholder="اشرح فكرة المشروع بدقة، مثلاً: موقع سحابي لحجز تذاكر الحفلات يدعم الدفع بمدى..."></textarea>
            </div>

            <div class="form-group">
              <label for="proj-features-input">الميزات الأساسية والوظائف المطلوبة</label>
              <span class="label-desc">ضع كل ميزة في سطر منفصل ليسهل على المطورين فهم المتطلبات</span>
              <textarea id="proj-features-input" class="form-control" placeholder="مثال:&#10;- تسجيل مستخدم جديد برقم الهاتف&#10;- لوحة تحكم للتحليلات والإحصائيات&#10;- إشعارات فورية بالبريد الإلكتروني"></textarea>
            </div>

            <div class="form-group">
              <label for="proj-audience-input">الجمهور والعملاء المستهدفين</label>
              <textarea id="proj-audience-input" class="form-control" placeholder="صف جمهور النظام المستهدف لمساعدة المطور على تصميم تجربة مستخدم ملائمة..."></textarea>
            </div>
          </div>

          <!-- STEP 3: Budget and Timeframe -->
          <div class="wizard-step-panel" id="wizard-step-3">
            <div class="budget-options">
              <div class="form-group">
                <label for="proj-budget-input">نطاق الميزانية التقديرية (USD)</label>
                <select id="proj-budget-input" class="form-control">
                  <option value="500$ - 1,000$">$500 - $1,000 (للمشاريع البسيطة)</option>
                  <option value="1,000$ - 3,000$" selected>$1,000 - $3,000 (تطبيقات ويب عادية)</option>
                  <option value="3,000$ - 5,000$">$3,000 - $5,000 (منصات متوسطة الحجم)</option>
                  <option value="5,000$ - 10,000$">$5,000 - $10,000 (أنظمة مخصصة متكاملة)</option>
                  <option value="10,000$+">$10,000+ (أنظمة كبرى ومشاريع مؤسسات)</option>
                </select>
              </div>

              <div class="form-group">
                <label for="proj-deadline-input">وقت التسليم المتوقع</label>
                <select id="proj-deadline-input" class="form-control">
                  <option value="7 - 14 يوم">أسبوعين (مستعجل)</option>
                  <option value="30 يوم" selected>شهر (طبيعي)</option>
                  <option value="45 يوم">45 يوماً</option>
                  <option value="60 يوم">شهرين</option>
                  <option value="90 يوم+">3 أشهر فأكثر (مشاريع طويلة الأجل)</option>
                </select>
              </div>
            </div>

            <div class="form-group" style="margin-top: 20px;">
              <label for="proj-priority-input">مستوى الأولوية والسرعة المطلوبة</label>
              <select id="proj-priority-input" class="form-control">
                <option value="low">منخفضة - الجدول الزمني مرن ويهمنا السعر الأقل</option>
                <option value="medium" selected>متوسطة - موازنة بين السرعة والسعر التنافسي</option>
                <option value="high">عالية جداً - نحتاج إنجاز سريع وأولوية تطوير قصوى</option>
              </select>
            </div>
          </div>

          <!-- STEP 4: Files and Attachments -->
          <div class="wizard-step-panel" id="wizard-step-4">
            <div class="form-group">
              <label>المستندات، المخططات أو ملفات مرجعية</label>
              <span class="label-desc">ارفع ملفات الشروط التقنية، تصاميم Figma، أو أي ملفات ذات علاقة بالمشروع</span>
              
              <!-- Drag and Drop Dropzone -->
              <div class="upload-dropzone" id="file-dropzone">
                <svg class="upload-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <span class="upload-text">اسحب الملفات هنا أو اضغط للتصفح من جهازك</span>
                <span class="upload-desc">الملفات المتاحة: PDF, PNG, JPG, ZIP, DOCX (حجم أقصى 25MB)</span>
                <input type="file" id="dropzone-file-input" style="display:none;" multiple>
              </div>

              <!-- Selected Files Output List -->
              <div class="selected-files-list" id="uploaded-files-list"></div>
            </div>

            <div class="form-group">
              <label for="proj-references-input">روابط لمواقع أو مشاريع ملهمة (References)</label>
              <input type="url" id="proj-references-input" class="form-control" placeholder="روابط لموقع تشبه فكرتك...">
            </div>

            <div class="form-group">
              <label for="proj-notes-input">ملاحظات وشروط إضافية للمطورين</label>
              <textarea id="proj-notes-input" class="form-control" placeholder="اكتب أي ملاحظة إضافية تود مشاركتها..."></textarea>
            </div>
          </div>

          <!-- STEP 5: Final Summary Review -->
          <div class="wizard-step-panel" id="wizard-step-5">
            <h4 style="margin-bottom: 16px; font-size: 1.05rem; font-weight: 700; color: var(--primary);">مراجعة وتأكيد بيانات الطلب قبل النشر</h4>
            
            <div class="dashboard-card" style="border-radius: var(--radius-md);">
              <div class="dashboard-card-body" style="padding: 20px; display: flex; flex-direction: column; gap: 4px;">
                <div class="review-item">
                  <div class="review-label">عنوان المشروع:</div>
                  <div class="review-val" id="rev-title"></div>
                </div>
                <div class="review-item">
                  <div class="review-label">التصنيف والنوع:</div>
                  <div class="review-val"><span id="rev-category"></span> | <span id="rev-type"></span></div>
                </div>
                <div class="review-item" style="flex-direction: column; align-items: flex-start; gap: 8px;">
                  <div class="review-label">الوصف الفني:</div>
                  <div class="review-val" id="rev-desc" style="white-space: pre-wrap; line-height: 1.5; color: var(--text-secondary);"></div>
                </div>
                <div class="review-item" style="flex-direction: column; align-items: flex-start; gap: 8px;">
                  <div class="review-label">الميزات المطلوبة:</div>
                  <div class="review-val" id="rev-features" style="white-space: pre-wrap; line-height: 1.5; color: var(--text-secondary);"></div>
                </div>
                <div class="review-item">
                  <div class="review-label">الجمهور المستهدف:</div>
                  <div class="review-val" id="rev-audience"></div>
                </div>
                <div class="review-item">
                  <div class="review-label">الميزانية والوقت:</div>
                  <div class="review-val"><span id="rev-budget"></span> / تسليم خلال <span id="rev-deadline"></span></div>
                </div>
                <div class="review-item">
                  <div class="review-label">مستوى الأولوية:</div>
                  <div class="review-val" id="rev-priority"></div>
                </div>
                <div class="review-item" style="flex-direction: column; align-items: flex-start; gap: 8px;">
                  <div class="review-label">الملفات المرفقة:</div>
                  <div class="review-val" id="rev-files" style="width: 100%;"></div>
                </div>
                <div class="review-item" style="flex-direction: column; align-items: flex-start; gap: 8px;">
                  <div class="review-label">شروط وملاحظات خاصة:</div>
                  <div class="review-val" id="rev-notes" style="color: var(--text-secondary);"></div>
                </div>
              </div>
            </div>

            <!-- Agreement check -->
            <div style="display: flex; gap: 10px; align-items: flex-start; margin-top: 24px;">
              <input type="checkbox" id="agree-terms" style="margin-top: 4px; width: 16px; height: 16px; cursor: pointer;" required checked>
              <label for="agree-terms" style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5;">
                أوافق على سياسة جودة البرمجيات المخصصة للمنصة، وتأكيد صحة البيانات الفنية الواردة في طلبي، وأتعهد بالتواصل مع المطور حصراً عبر القنوات البرمجية لكودساينون لحفظ حقوقي وحمايتها بالكامل.
              </label>
            </div>
          </div>

          <!-- Navigation buttons -->
          <div class="wizard-buttons">
            <button type="button" class="btn btn-outline" id="wizard-prev-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
              الخطوة السابقة
            </button>
            <button type="button" class="btn btn-primary" id="wizard-next-btn">
              الخطوة التالية
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
          </div>

        </form>
      </div>
    </div>
  `;

  // Attach Event Listeners
  const prevBtn = container.querySelector('#wizard-prev-btn');
  const nextBtn = container.querySelector('#wizard-next-btn');

  // Step 1 Category Option Grid clicks
  const typeOptions = container.querySelectorAll('.type-option');
  typeOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      typeOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      formData.category = opt.getAttribute('data-cat');
    });
  });

  // Uploader Setup
  const dropzone = container.querySelector('#file-dropzone');
  const fileInput = container.querySelector('#dropzone-file-input');
  const fileList = container.querySelector('#uploaded-files-list');

  dropzone.addEventListener('click', () => fileInput.click());
  
  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });
  
  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('dragover');
  });
  
  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
  });

  fileInput.addEventListener('change', () => {
    handleFiles(fileInput.files);
  });

  function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      const sizeStr = (f.size / (1024 * 1024)).toFixed(2) + ' MB';
      
      const fileData = {
        name: f.name,
        size: sizeStr,
        type: f.name.split('.').pop()
      };
      
      formData.attachments.push(fileData);
      
      const item = document.createElement('div');
      item.className = 'selected-file-item';
      item.innerHTML = `
        <div class="file-info-group">
          <span>📄</span>
          <strong>${f.name}</strong>
          <span style="color: var(--text-muted);">(${sizeStr})</span>
        </div>
        <button type="button" class="file-remove-btn" data-name="${f.name}">حذف</button>
      `;
      
      item.querySelector('.file-remove-btn').addEventListener('click', (e) => {
        const name = e.target.getAttribute('data-name');
        formData.attachments = formData.attachments.filter(att => att.name !== name);
        item.remove();
      });
      
      fileList.appendChild(item);
    }
  }

  // Navigation Logic
  prevBtn.addEventListener('click', () => {
    if (currentStep > 1) {
      currentStep--;
      updateWizardDOM();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        currentStep++;
        updateWizardDOM();
      } else {
        // Final Submit!
        const agreeCheckbox = container.querySelector('#agree-terms');
        if (!agreeCheckbox.checked) {
          alert('الرجاء الموافقة على شروط المنصة قبل تأكيد إرسال الطلب.');
          return;
        }

        const newProj = State.addProject(formData);
        
        // Show success alert & route
        alert(`تم تقديم مشروعك "${newProj.title}" بنجاح! تم توجيهك للوحة التحكم لمتابعته.`);
        window.location.hash = `#client-dashboard`;
      }
    }
  });

  // Run initial state update
  updateWizardDOM();
}
