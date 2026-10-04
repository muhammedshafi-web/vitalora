// VITALORA - Top Navbar & Mobile Bottom Navigation Bar

window.renderNavbar = function(activeRoute = 'dashboard') {
  const store = window.vitaloraStore;
  const user = store.getState().user;
  const cartSummary = store.getCartSummary();
  const isDark = user.theme === 'dark';

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
    { id: 'health', label: 'Health', icon: 'heart-pulse' },
    { id: 'activity', label: 'Activity', icon: 'flame' },
    { id: 'nutrition', label: 'Nutrition', icon: 'utensils' },
    { id: 'products', label: 'Products', icon: 'shopping-bag' },
    { id: 'progress', label: 'Progress', icon: 'trending-up' },
    { id: 'timeline', label: 'Timeline', icon: 'calendar' },
    { id: 'ai-coach', label: 'AI Coach', icon: 'sparkles' },
    { id: 'wearables', label: 'Devices', icon: 'watch' },
    { id: 'goals', label: 'Goals', icon: 'target' },
    { id: 'profile', label: 'Profile', icon: 'user' }
  ];

  return `
    <!-- Top Fixed Desktop Navigation -->
    <header class="fixed top-0 left-0 right-0 z-40 bg-opacity-80 backdrop-blur-md border-b border-white/10 dark:border-white/5 transition-all duration-200" style="background-color: var(--bg-card);">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        <!-- Brand Logo & Title -->
        <div class="flex items-center space-x-3 cursor-pointer group" onclick="window.navigateTo('landing')">
          <div class="relative w-10 h-10 rounded-xl overflow-hidden bg-white dark:bg-white/10 p-1 flex items-center justify-center shadow-md border border-white/20">
            <img src="assets/vitalora_logo.jpg" alt="VITALORA Logo" class="brand-logo-img w-full h-full object-contain" />
          </div>
          <div class="flex flex-col">
            <div class="flex items-center space-x-1.5">
              <span class="vitalora-brand-font text-xl font-bold tracking-widest text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">VITALORA</span>
              <span class="px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">PRO</span>
            </div>
            <span class="text-[9px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-medium">Physical Health & Fitness</span>
          </div>
        </div>

        <!-- Desktop Navigation Links -->
        <nav class="hidden xl:flex items-center space-x-1 lg:space-x-2">
          ${navItems.map(item => `
            <button 
              onclick="window.navigateTo('${item.id}')"
              class="nav-link px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeRoute === item.id 
                  ? 'active text-emerald-500 bg-emerald-500/10 font-semibold' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-white/5'
              }"
            >
              ${item.label}
            </button>
          `).join('')}
        </nav>

        <!-- Right Side Utility Bar -->
        <div class="flex items-center space-x-2 sm:space-x-3">
          
          <!-- Admin Panel Quick Switcher -->
          <button 
            onclick="window.navigateTo(window.currentRoute === 'admin' ? 'dashboard' : 'admin')"
            title="Toggle Admin Store & Orders Panel"
            class="hidden md:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border ${
              activeRoute === 'admin'
                ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-500/20'
                : 'border-purple-500/30 text-purple-600 dark:text-purple-400 hover:bg-purple-500/10'
            }"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <span>${activeRoute === 'admin' ? 'User App' : 'Admin'}</span>
          </button>

          <!-- Shopping Cart Icon with Badge -->
          <button 
            onclick="window.toggleCartModal(true)" 
            class="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            title="Open Shopping Cart"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
            ${cartSummary.itemCount > 0 ? `
              <span class="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-500 text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
                ${cartSummary.itemCount}
              </span>
            ` : ''}
          </button>

          <!-- Notifications Bell with Dropdown Trigger -->
          <div class="relative">
            <button 
              onclick="window.toggleNotificationsDropdown()" 
              class="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              title="Notifications"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
              <span class="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-500"></span>
            </button>
            <div id="notificationsDropdown" class="hidden absolute right-0 mt-2 w-80 rounded-2xl glass-panel p-4 shadow-2xl z-50 text-left border border-white/10">
              <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                <span class="font-bold text-sm text-slate-900 dark:text-white">Health Alerts</span>
                <span class="text-xs text-emerald-500 font-semibold cursor-pointer" onclick="window.showToast('All alerts marked as read')">Mark all read</span>
              </div>
              <div class="space-y-3 mt-3 text-xs">
                <div class="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-slate-700 dark:text-slate-200">
                  <span class="font-bold text-emerald-500 block mb-0.5">💧 Hydration Reminder</span>
                  Time to drink 250ml of water to stay on track for your 2.5L goal.
                </div>
                <div class="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-slate-700 dark:text-slate-200">
                  <span class="font-bold text-cyan-500 block mb-0.5">🏃 Step Goal Near</span>
                  You are at 7,842 steps! Just 2,158 more to achieve today's 10,000 milestone.
                </div>
                <div class="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-slate-700 dark:text-slate-200">
                  <span class="font-bold text-purple-500 block mb-0.5">📦 Order Dispatched</span>
                  Vitalora Smart Fitness Band Pro is out for delivery.
                </div>
              </div>
            </div>
          </div>

          <!-- Dark / Light Theme Toggle -->
          <button 
            onclick="window.toggleAppTheme()" 
            class="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            title="Toggle Light/Dark Theme"
          >
            ${isDark ? `
              <!-- Sun Icon for switching to light -->
              <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
            ` : `
              <!-- Moon Icon for switching to dark -->
              <svg class="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
            `}
          </button>

          <!-- User Profile Avatar Pill -->
          <div 
            onclick="window.navigateTo('profile')"
            class="flex items-center space-x-2 pl-2 pr-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-emerald-500/50 cursor-pointer transition-all"
          >
            <div class="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 text-white font-bold text-xs flex items-center justify-center shadow">
              ${user.name ? user.name.charAt(0) : 'A'}
            </div>
            <span class="text-xs font-semibold text-slate-700 dark:text-slate-200 hidden md:inline-block">${user.name.split(' ')[0]}</span>
          </div>

        </div>
      </div>
    </header>

    <!-- Mobile Bottom Navigation Bar (Mobile-first Experience) -->
    <nav class="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-opacity-90 backdrop-blur-lg border-t border-slate-200 dark:border-white/10 py-2 px-3 flex items-center justify-around shadow-2xl" style="background-color: var(--bg-card);">
      <button onclick="window.navigateTo('dashboard')" class="flex flex-col items-center py-1 px-2.5 rounded-xl transition-colors ${activeRoute === 'dashboard' ? 'text-emerald-500' : 'text-slate-500 dark:text-slate-400'}">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
        <span class="text-[10px] font-semibold mt-0.5">Home</span>
      </button>

      <button onclick="window.navigateTo('health')" class="flex flex-col items-center py-1 px-2.5 rounded-xl transition-colors ${activeRoute === 'health' ? 'text-emerald-500' : 'text-slate-500 dark:text-slate-400'}">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
        <span class="text-[10px] font-semibold mt-0.5">Health</span>
      </button>

      <button onclick="window.navigateTo('activity')" class="flex flex-col items-center py-1 px-2.5 rounded-xl transition-colors ${activeRoute === 'activity' ? 'text-emerald-500' : 'text-slate-500 dark:text-slate-400'}">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        <span class="text-[10px] font-semibold mt-0.5">Activity</span>
      </button>

      <button onclick="window.navigateTo('products')" class="flex flex-col items-center py-1 px-2.5 rounded-xl transition-colors ${activeRoute === 'products' ? 'text-emerald-500' : 'text-slate-500 dark:text-slate-400'}">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
        <span class="text-[10px] font-semibold mt-0.5">Store</span>
      </button>

      <button onclick="window.navigateTo('ai-coach')" class="flex flex-col items-center py-1 px-2.5 rounded-xl transition-colors ${activeRoute === 'ai-coach' ? 'text-emerald-500' : 'text-slate-500 dark:text-slate-400'}">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
        <span class="text-[10px] font-semibold mt-0.5">AI Coach</span>
      </button>

      <button onclick="window.navigateTo('profile')" class="flex flex-col items-center py-1 px-2.5 rounded-xl transition-colors ${activeRoute === 'profile' ? 'text-emerald-500' : 'text-slate-500 dark:text-slate-400'}">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
        <span class="text-[10px] font-semibold mt-0.5">Profile</span>
      </button>
    </nav>
  `;
};
