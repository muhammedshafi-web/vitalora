// VITALORA - User Profile, Settings, Export & Health Privacy

window.renderProfileView = function() {
  const store = window.vitaloraStore;
  const state = store.getState();
  const user = state.user;
  const today = state.todayStats;
  const isDark = user.theme === 'dark';

  return `
    <div class="pt-24 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <!-- Top Title Header -->
      <div>
        <span class="text-xs uppercase font-bold tracking-widest text-emerald-500">Account & Biometric Vault</span>
        <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Profile & Preferences</h1>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Manage identity, privacy policies, device synchronizations, and data exports.</p>
      </div>

      <!-- USER PROFILE HERO CARD -->
      <div class="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
        
        <!-- Avatar Photo / Initials -->
        <div class="relative w-24 h-24 rounded-3xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 p-1 shadow-2xl flex-shrink-0">
          <div class="w-full h-full rounded-[1.3rem] bg-slate-900 flex items-center justify-center text-3xl font-black text-white">
            ${user.name.charAt(0)}
          </div>
          <span class="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-[10px] text-white">✓</span>
        </div>

        <div class="space-y-2 flex-1">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 class="text-2xl font-black text-slate-900 dark:text-white">${user.name}</h2>
              <p class="text-xs text-slate-400">${user.email} • Member since Jan 2026</p>
            </div>
            
            <button 
              onclick="window.openEditProfileModal()" 
              class="px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 font-bold text-xs border border-emerald-500/20 self-center sm:self-auto"
            >
              Edit Profile
            </button>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 text-xs">
            <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <span class="text-slate-400 text-[10px] block">Age & Gender</span>
              <span class="font-bold text-slate-900 dark:text-white">${user.age} yrs • ${user.gender}</span>
            </div>

            <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <span class="text-slate-400 text-[10px] block">Height & Weight</span>
              <span class="font-bold text-slate-900 dark:text-white">${user.height} cm • ${today.currentWeight} kg</span>
            </div>

            <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <span class="text-slate-400 text-[10px] block">Fitness Goal</span>
              <span class="font-bold text-emerald-500">${user.fitnessGoal}</span>
            </div>

            <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <span class="text-slate-400 text-[10px] block">Activity Level</span>
              <span class="font-bold text-cyan-500">${user.activityLevel}</span>
            </div>
          </div>
        </div>

      </div>

      <!-- SETTINGS & CONTROLS LIST (Section 18) -->
      <div class="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 space-y-6">
        <h3 class="text-xl font-bold text-slate-900 dark:text-white">Settings & Preferences</h3>

        <div class="divide-y divide-slate-100 dark:divide-white/5 text-sm">
          
          <!-- Units Toggle (kg/lb) -->
          <div class="py-4 flex items-center justify-between">
            <div>
              <span class="font-bold text-slate-900 dark:text-white block">Measurement Units</span>
              <span class="text-xs text-slate-400">Select standard metric (kg/cm) or imperial (lb/ft) units</span>
            </div>
            <div class="flex items-center space-x-1 p-1 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs">
              <button 
                onclick="window.vitaloraStore.updateUser({ units: 'metric' }); window.renderApp();" 
                class="px-3 py-1 rounded-lg font-bold ${user.units === 'metric' ? 'bg-emerald-500 text-white' : 'text-slate-400'}"
              >
                Metric (kg)
              </button>
              <button 
                onclick="window.vitaloraStore.updateUser({ units: 'imperial' }); window.renderApp();" 
                class="px-3 py-1 rounded-lg font-bold ${user.units === 'imperial' ? 'bg-emerald-500 text-white' : 'text-slate-400'}"
              >
                Imperial (lb)
              </button>
            </div>
          </div>

          <!-- Dark Mode Toggle -->
          <div class="py-4 flex items-center justify-between">
            <div>
              <span class="font-bold text-slate-900 dark:text-white block">Theme Appearance</span>
              <span class="text-xs text-slate-400">Switch between cosmic dark mode and clean porcelain light mode</span>
            </div>
            <button 
              onclick="window.toggleAppTheme()" 
              class="px-4 py-2 rounded-xl border border-slate-300 dark:border-white/10 text-xs font-bold flex items-center space-x-2"
            >
              <span>${isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}</span>
            </button>
          </div>

          <!-- Notifications Toggle -->
          <div class="py-4 flex items-center justify-between">
            <div>
              <span class="font-bold text-slate-900 dark:text-white block">Push Notifications</span>
              <span class="text-xs text-slate-400">Hydration alerts, workout streaks, and order dispatches</span>
            </div>
            <button 
              onclick="window.vitaloraStore.updateUser({ notificationsEnabled: !user.notificationsEnabled }); window.renderApp(); window.showToast('Notification preference saved');"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${user.notificationsEnabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}"
            >
              <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${user.notificationsEnabled ? 'translate-x-6' : 'translate-x-1'}"></span>
            </button>
          </div>

          <!-- Connected Devices Section link -->
          <div class="py-4 flex items-center justify-between">
            <div>
              <span class="font-bold text-slate-900 dark:text-white block">Connected Wearables & Devices</span>
              <span class="text-xs text-slate-400">Apple Health, Vitalora Band Pro, Google Fit</span>
            </div>
            <button onclick="window.navigateTo('wearables')" class="text-xs font-bold text-emerald-500 hover:underline">
              Manage Devices →
            </button>
          </div>

          <!-- Export Health Data (JSON download) -->
          <div class="py-4 flex items-center justify-between">
            <div>
              <span class="font-bold text-slate-900 dark:text-white block">Export Health Vault Data</span>
              <span class="text-xs text-slate-400">Download complete biometric archive in JSON format</span>
            </div>
            <button 
              onclick="window.vitaloraStore.exportDataJson(); window.showToast('Health data archive downloaded 📥');" 
              class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-200"
            >
              Export JSON
            </button>
          </div>

          <!-- Delete Account / Reset Data -->
          <div class="py-4 flex items-center justify-between">
            <div>
              <span class="font-bold text-rose-500 block">Delete Account & Clear Biometrics</span>
              <span class="text-xs text-slate-400">Permanently purge all stored local health parameters and order records</span>
            </div>
            <button 
              onclick="window.confirmResetData()" 
              class="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 font-bold text-xs border border-rose-500/30"
            >
              Reset Data
            </button>
          </div>

        </div>
      </div>

      <!-- PRIVACY & SECURITY BANNER (Section 23) -->
      <div class="p-6 rounded-3xl glass-panel border border-emerald-500/30 bg-emerald-500/5 space-y-3">
        <div class="flex items-center space-x-2 text-emerald-500 font-bold text-sm">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          <span>End-to-End Privacy & Data Confidentiality</span>
        </div>
        <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          "Your health data is private and should be protected." VITALORA maintains zero third-party commercial sharing. All biometric telemetry is cryptographically isolated and user-sovereign.
        </p>
      </div>

    </div>
  `;
};

window.confirmResetData = function() {
  if (confirm("Are you sure you want to reset all VITALORA health data to initial demo defaults?")) {
    window.vitaloraStore.resetDatabase();
    window.renderApp();
    window.showToast("Database reset to demo state.");
  }
};

window.openEditProfileModal = function() {
  const user = window.vitaloraStore.getState().user;
  const name = prompt("Edit full name:", user.name);
  if (name) {
    window.vitaloraStore.updateUser({ name });
    window.renderApp();
    window.showToast("Profile name updated!");
  }
};
