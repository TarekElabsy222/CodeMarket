/* ==========================================================================
   CODECYNON - SPA ROUTER & APPLICATION ORCHESTRATOR
   ========================================================================== */

import State from './state.js';
import { renderLanding } from './pages/landing.js';
import { renderSubmitRequest } from './pages/submit-request.js';
import { renderClientDashboard } from './pages/client-dashboard.js';
import { renderDevDashboard } from './pages/dev-dashboard.js';
import { renderProjectDetails } from './pages/project-details.js';
import { renderDownloadCenter } from './pages/download-center.js';
import { renderAdminPortal } from './pages/admin-portal.js';

// 1. Client-Side Hash Router
function router() {
  const hash = window.location.hash || '#landing';
  const container = document.getElementById('app-root');
  
  if (!container) return;

  // Clear active classes on all nav links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => link.classList.remove('active'));

  // Route routing logic
  if (hash === '#landing' || hash === '#') {
    document.getElementById('nav-landing')?.classList.add('active');
    renderLanding(container);
  } else if (hash === '#submit-request') {
    renderSubmitRequest(container);
  } else if (hash === '#client-dashboard') {
    document.getElementById('nav-client')?.classList.add('active');
    renderClientDashboard(container);
  } else if (hash === '#dev-dashboard') {
    document.getElementById('nav-dev')?.classList.add('active');
    renderDevDashboard(container);
  } else if (hash === '#admin-portal') {
    document.getElementById('nav-admin')?.classList.add('active');
    renderAdminPortal(container);
  } else if (hash === '#downloads') {
    document.getElementById('nav-downloads')?.classList.add('active');
    renderDownloadCenter(container, { view: 'list' });
  } else if (hash.startsWith('#download-details/')) {
    const id = hash.replace('#download-details/', '');
    renderDownloadCenter(container, { view: 'details', id });
  } else if (hash.startsWith('#project/')) {
    const parts = hash.replace('#project/', '').split('/');
    const id = parts[0];
    const sub = parts[1];

    if (sub === 'delivery') {
      renderDownloadCenter(container, { view: 'delivery', id });
    } else if (sub === 'files') {
      renderProjectDetails(container, id, 'files');
    } else {
      renderProjectDetails(container, id);
    }
  } else if (hash.startsWith('#download-success/')) {
    const parts = hash.replace('#download-success/', '').split('?');
    const id = parts[0];
    const query = parts[1] || '';
    const isProject = query.includes('isProject=true') ? 'true' : 'false';
    renderDownloadCenter(container, { view: 'success', id, isProject: isProject });
  } else {
    // Fallback page
    renderLanding(container);
  }

  // Scroll to top on navigation
  window.scrollTo(0, 0);

  // Close overlays
  document.getElementById('profile-dropdown')?.classList.remove('open');
  document.getElementById('notification-panel')?.classList.remove('open');
}

// 2. Sync Header UI elements with current State Role
function updateHeaderUI(state) {
  const role = state.currentUserRole;
  
  const avatar = document.getElementById('header-avatar');
  const name = document.getElementById('header-username');
  const roleText = document.getElementById('header-role');

  if (avatar && name && roleText) {
    if (role === 'client') {
      avatar.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80";
      name.textContent = "أحمد العتيبي";
      roleText.textContent = "عميل VIP";
      
      // Theme settings: light mode with client brand
      document.body.className = "role-client-theme";
    } else if (role === 'developer') {
      avatar.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80";
      name.textContent = "م. منيرة القحطاني";
      roleText.textContent = "مطور نخبة (Flutter)";
      
      // Theme settings: Dark mode for developers
      document.body.className = "dark-theme role-developer-theme";
    } else if (role === 'admin') {
      avatar.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80";
      name.textContent = "عبدالمحسن التميمي";
      roleText.textContent = "المدير الفني للمنصة";
      
      // Theme: Dark mode with purple theme for admins
      document.body.className = "dark-theme role-admin-theme";
    }
  }

  // Update checkmark class on role selection dropdown items
  document.querySelectorAll('.role-switch-btn').forEach(btn => {
    if (btn.getAttribute('data-role') === role) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update notification count badge
  const unreadCount = state.notifications.filter(n => n.unread).length;
  const countBadge = document.getElementById('notification-count');
  if (countBadge) {
    countBadge.textContent = unreadCount;
    countBadge.style.display = unreadCount > 0 ? 'flex' : 'none';
  }

  // Render notification lists panel
  const notList = document.getElementById('notifications-list');
  if (notList) {
    if (state.notifications.length === 0) {
      notList.innerHTML = `<div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 0.8rem;">لا توجد إشعارات حالياً</div>`;
    } else {
      notList.innerHTML = state.notifications.map(n => `
        <a href="${n.link}" class="notification-item ${n.unread ? 'unread' : ''}">
          <div class="notification-icon-wrapper">
            🔔
          </div>
          <div class="notification-content">
            <p class="notification-text">${n.text}</p>
            <span class="notification-time en-nums">${n.time}</span>
          </div>
        </a>
      `).join('');
    }
  }
}

// 3. Initialize & Bind Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Setup Router
  window.addEventListener('hashchange', router);
  
  // Initial router render
  router();

  // Initial UI sync
  updateHeaderUI(State);

  // Subscribe UI sync on any State updates (Pub/Sub reactivity)
  State.subscribe((state) => {
    updateHeaderUI(state);
    router(); // Hot reload currently active route to see changes
  });

  // Toggle user profile dropdown
  const profileBtn = document.getElementById('profile-dropdown-btn');
  const profileDropdown = document.getElementById('profile-dropdown');
  
  profileBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    profileDropdown?.classList.toggle('open');
    document.getElementById('notification-panel')?.classList.remove('open');
  });

  // Role Switch buttons actions
  document.querySelectorAll('.role-switch-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const role = btn.getAttribute('data-role');
      State.setRole(role);
      profileDropdown?.classList.remove('open');
      alert(`تم التبديل بنجاح إلى حساب: ${role === 'client' ? 'العميل' : role === 'developer' ? 'المطور' : 'المسؤول'}. تم تعديل الثيم والألوان تلقائياً.`);
      
      // Auto-route to corresponding dashboard for easy demo!
      if (role === 'client') window.location.hash = '#client-dashboard';
      if (role === 'developer') window.location.hash = '#dev-dashboard';
      if (role === 'admin') window.location.hash = '#admin-portal';
    });
  });

  // Toggle notifications panel
  const notBtn = document.getElementById('notification-bell');
  const notPanel = document.getElementById('notification-panel');

  notBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    notPanel?.classList.toggle('open');
    profileDropdown?.classList.remove('open');
    
    // Mark read
    if (notPanel?.classList.contains('open')) {
      State.markNotificationsRead();
    }
  });

  // Clear notifications button
  document.getElementById('clear-notifications-btn')?.addEventListener('click', () => {
    State.markNotificationsRead();
  });

  // Close overlays on clicking body
  document.addEventListener('click', () => {
    profileDropdown?.classList.remove('open');
    notPanel?.classList.remove('open');
  });

  // Floating helper actions
  const simTrigger = document.getElementById('sim-widget-trigger');
  const simBody = document.getElementById('sim-widget-body');
  
  simTrigger?.addEventListener('click', (e) => {
    e.stopPropagation();
    simBody?.classList.toggle('open');
  });

  simBody?.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  document.addEventListener('click', () => {
    simBody?.classList.remove('open');
  });

  document.getElementById('sim-reset-data')?.addEventListener('click', () => {
    if (confirm('هل ترغب في إعادة تعيين كافة البيانات إلى قيمها الافتراضية؟')) {
      State.resetState();
      alert('تمت إعادة تعيين البيانات بنجاح!');
      window.location.hash = '#landing';
    }
  });
});
