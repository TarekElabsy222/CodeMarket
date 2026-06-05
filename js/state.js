/* ==========================================================================
   CODECYNON - STATE MANAGEMENT & PERSISTENCE
   ========================================================================== */

import {
  INITIAL_DEVELOPERS,
  INITIAL_PROJECTS,
  INITIAL_PRODUCTS,
  INITIAL_NOTIFICATIONS
} from './data.js';

class StateManager {
  constructor() {
    this.subscribers = [];
    this.loadState();
  }

  loadState() {
    const saved = localStorage.getItem('codecynon_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.projects = parsed.projects || [];
        this.products = parsed.products || [];
        this.notifications = parsed.notifications || [];
        this.currentUserRole = parsed.currentUserRole || 'client'; // 'client', 'developer', 'admin'
        this.currentUserId = parsed.currentUserId || 'client-1';
        this.developers = parsed.developers || INITIAL_DEVELOPERS;
      } catch (e) {
        console.error("Error parsing saved state", e);
        this.loadDefaults();
      }
    } else {
      this.loadDefaults();
    }
  }

  loadDefaults() {
    this.projects = [...INITIAL_PROJECTS];
    this.products = [...INITIAL_PRODUCTS];
    this.notifications = [...INITIAL_NOTIFICATIONS];
    this.currentUserRole = 'client';
    this.currentUserId = 'client-1';
    this.developers = [...INITIAL_DEVELOPERS];
    this.saveState();
  }

  saveState() {
    const dataToSave = {
      projects: this.projects,
      products: this.products,
      notifications: this.notifications,
      currentUserRole: this.currentUserRole,
      currentUserId: this.currentUserId,
      developers: this.developers
    };
    localStorage.setItem('codecynon_state', JSON.stringify(dataToSave));
    this.notifySubscribers();
  }

  resetState() {
    localStorage.removeItem('codecynon_state');
    this.loadDefaults();
  }

  // Pub/Sub Subscription
  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  notifySubscribers() {
    this.subscribers.forEach(callback => callback(this));
  }

  // Action Methods
  setRole(role) {
    this.currentUserRole = role;
    this.currentUserId = role === 'developer' ? 'dev-2' : role === 'admin' ? 'admin' : 'client-1';
    this.saveState();
  }

  addProject(projectData) {
    const newProject = {
      id: `proj-${Date.now()}`,
      title: projectData.title,
      category: projectData.category,
      type: projectData.type,
      status: "new", // 'new', 'review', 'proposal', 'approved', 'development', 'testing', 'ready', 'completed', 'cancelled'
      budget: projectData.budget,
      budgetMin: parseInt(projectData.budget.split('-')[0]) || 500,
      budgetMax: parseInt(projectData.budget.split('-')[1]) || 1500,
      deadline: projectData.deadline,
      priority: projectData.priority || 'medium',
      developerId: null,
      dateSubmitted: new Date().toISOString().split('T')[0],
      description: projectData.description,
      features: projectData.features,
      targetAudience: projectData.targetAudience,
      references: projectData.references || '',
      additionalNotes: projectData.additionalNotes || '',
      attachments: projectData.attachments || [],
      proposals: [],
      messages: [
        {
          sender: "admin",
          text: "مرحباً بك في كودساينون. تم استلام طلب مشروعك بنجاح، وهو الآن قيد المراجعة والتدقيق الفني من قبل الإدارة.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          date: new Date().toISOString().split('T')[0]
        }
      ],
      files: []
    };

    this.projects.unshift(newProject);
    this.addNotification(`تم تقديم طلب مشروعك الجديد بنجاح: ${newProject.title}`, `#project/${newProject.id}`);
    this.saveState();
    return newProject;
  }

  updateProjectStatus(projectId, status) {
    const project = this.projects.find(p => p.id === projectId);
    if (project) {
      project.status = status;
      
      let systemText = "";
      switch (status) {
        case 'review':
          systemText = "تم نقل حالة المشروع إلى: قيد المراجعة الفنية.";
          break;
        case 'proposal':
          systemText = "تم اعتماد طلب المشروع وتفعيله. المطورون المعتمدون مدعوون الآن لتقديم عروضهم.";
          break;
        case 'approved':
          systemText = "تمت الموافقة على المشروع واعتماد المطور.";
          break;
        case 'development':
          systemText = "بدأ المطور العمل الفعلي على المشروع. يرجى التنسيق عبر لوحة الرسائل.";
          break;
        case 'testing':
          systemText = "بدأت مرحلة الاختبار وفحص الجودة.";
          break;
        case 'ready':
          systemText = "قام المطور بتسليم حزمة المشروع النهائية وهي جاهزة للتحميل والمراجعة من قبل العميل.";
          break;
        case 'completed':
          systemText = "تم إكمال المشروع بنجاح واستلام كافة المخرجات.";
          break;
        case 'cancelled':
          systemText = "تم إلغاء المشروع من قبل العميل أو الإدارة.";
          break;
      }

      project.messages.push({
        sender: "admin",
        text: systemText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toISOString().split('T')[0]
      });

      this.addNotification(`تغيرت حالة مشروعك "${project.title}" إلى: ${this.getStatusLabel(status)}`, `#project/${projectId}`);
      this.saveState();
    }
  }

  addProposal(projectId, proposalData) {
    const project = this.projects.find(p => p.id === projectId);
    if (project) {
      const dev = this.developers.find(d => d.id === proposalData.developerId);
      const newProposal = {
        id: `prop-${Date.now()}`,
        developerId: proposalData.developerId,
        price: parseFloat(proposalData.price),
        days: parseInt(proposalData.days),
        coverLetter: proposalData.coverLetter,
        rating: dev ? dev.rating : 4.8
      };
      project.proposals.push(newProposal);
      
      // Auto upgrade status to proposal if it was review
      if (project.status === 'review' || project.status === 'new') {
        project.status = 'proposal';
      }

      this.addNotification(`عرض جديد مقدم لمشروعك "${project.title}" من ${dev ? dev.name : 'مطور'}`, `#project/${projectId}`);
      this.saveState();
    }
  }

  acceptProposal(projectId, proposalId) {
    const project = this.projects.find(p => p.id === projectId);
    if (project) {
      const proposal = project.proposals.find(pr => pr.id === proposalId);
      if (proposal) {
        project.developerId = proposal.developerId;
        project.status = 'development'; // Moves straight to development
        project.acceptedPrice = proposal.price;
        project.acceptedDays = proposal.days;
        
        const dev = this.developers.find(d => d.id === proposal.developerId);
        project.messages.push({
          sender: "admin",
          text: `تم قبول عرض المطور ${dev ? dev.name : ''} بقيمة $${proposal.price} وفترة تسليم ${proposal.days} أيام. تم بدء المشروع!`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          date: new Date().toISOString().split('T')[0]
        });

        this.addNotification(`تم قبول عرضك لمشروع "${project.title}". يرجى بدء التطوير!`, `#project/${projectId}`);
        this.saveState();
      }
    }
  }

  addMessage(projectId, sender, text) {
    const project = this.projects.find(p => p.id === projectId);
    if (project) {
      project.messages.push({
        sender: sender, // 'client', 'developer', 'admin'
        text: text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toISOString().split('T')[0]
      });
      
      // Notify recipient
      let recText = `رسالة جديدة في مشروع "${project.title}"`;
      this.addNotification(recText, `#project/${projectId}`);
      
      this.saveState();
    }
  }

  addFile(projectId, fileData) {
    const project = this.projects.find(p => p.id === projectId);
    if (project) {
      const newFile = {
        id: `f-${Date.now()}`,
        name: fileData.name,
        category: fileData.category || 'src', // src, docs, db, assets
        size: fileData.size || '1.2 MB',
        uploadedBy: fileData.uploadedBy || 'developer',
        version: fileData.version || 'v1.0.0',
        date: new Date().toISOString().split('T')[0]
      };
      project.files.push(newFile);
      this.saveState();
    }
  }

  deliverProject(projectId, deliveryData) {
    const project = this.projects.find(p => p.id === projectId);
    if (project) {
      project.status = 'ready';
      project.delivery = {
        date: new Date().toISOString().split('T')[0],
        notes: deliveryData.notes || '',
        files: deliveryData.files || []
      };

      // Add delivery files to files list
      deliveryData.files.forEach(f => {
        this.addFile(projectId, {
          name: f.name,
          category: f.type,
          size: f.size,
          uploadedBy: 'developer',
          version: f.version
        });
      });

      project.messages.push({
        sender: "developer",
        text: `لقد قمت بتسليم المشروع النهائي! الملاحظات: ${deliveryData.notes}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toISOString().split('T')[0]
      });

      this.addNotification(`تسليم نهائي بانتظار مراجعتك لمشروع "${project.title}"`, `#project/${projectId}`);
      this.saveState();
    }
  }

  completeProject(projectId, reviewData) {
    const project = this.projects.find(p => p.id === projectId);
    if (project) {
      project.status = 'completed';
      project.review = {
        rating: reviewData.rating || 5,
        comment: reviewData.comment || 'عمل ممتاز ومطور متميز!'
      };

      project.messages.push({
        sender: "client",
        text: `تم استلام المشروع بنجاح وتقييمه بـ ${reviewData.rating} نجوم. شكراً جزيلاً!`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toISOString().split('T')[0]
      });

      this.addNotification(`اكتمل مشروعك "${project.title}"! تم تقييم المطور بنجاح.`, `#downloads`);
      this.saveState();
    }
  }

  addNotification(text, link) {
    this.notifications.unshift({
      id: `not-${Date.now()}`,
      text: text,
      time: "الآن",
      unread: true,
      link: link
    });
    this.saveState();
  }

  markNotificationsRead() {
    this.notifications.forEach(n => n.unread = false);
    this.saveState();
  }

  // Helpers
  getStatusLabel(status) {
    const labels = {
      new: "جديد",
      review: "تحت المراجعة",
      proposal: "تم إرسال العروض",
      approved: "تمت الموافقة",
      development: "قيد التنفيذ",
      testing: "قيد الاختبار",
      ready: "جاهز للتسليم",
      completed: "مكتمل",
      cancelled: "ملغى"
    };
    return labels[status] || status;
  }
}

export const State = new StateManager();
export default State;
