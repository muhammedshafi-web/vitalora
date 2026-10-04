// VITALORA - Wearable Integration & Biometric Sync

window.renderWearablesView = function() {
  const store = window.vitaloraStore;
  const state = store.getState();
  const devices = state.connectedDevices;

  return `
    <div class="pt-24 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <!-- Top Title Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span class="text-xs uppercase font-bold tracking-widest text-emerald-500">Hardware Telemetry Bridges</span>
          <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Connect Wearables & Devices</h1>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Pair continuous optical photoplethysmography (PPG) sensors and platform health services.</p>
        </div>

        <button 
          onclick="window.mockSyncAllDevices()"
          class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 flex items-center space-x-2 transition-all self-start md:self-auto"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          <span>Sync All Live Telemetry</span>
        </button>
      </div>

      <!-- DEVICE CARDS (Prompt: Apple Health, Fitness Band, Google Fit, Smartwatch) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${devices.map(d => {
          const isConn = d.status === "Connected";
          return `
            <div class="p-6 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 card-lift space-y-5">
              <div class="flex items-start justify-between">
                <div class="flex items-center space-x-3.5">
                  <div class="w-12 h-12 rounded-2xl ${
                    isConn ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-100 dark:bg-white/5 text-slate-400'
                  } flex items-center justify-center font-bold text-2xl">
                    ${d.id === 'dev_apple' ? '🍎' : d.id === 'dev_band' ? '⌚' : d.id === 'dev_gfit' ? '🏃' : '⌚'}
                  </div>
                  <div>
                    <h3 class="font-bold text-base text-slate-900 dark:text-white">${d.name}</h3>
                    <span class="text-xs text-slate-400">${d.type}</span>
                  </div>
                </div>

                <span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                  isConn ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/20' : 'bg-slate-200 dark:bg-white/10 text-slate-400'
                }">
                  ${isConn ? 'Connected ✓' : 'Disconnected'}
                </span>
              </div>

              <!-- Device Status Details -->
              <div class="grid grid-cols-2 gap-3 text-xs pt-2">
                <div class="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <span class="text-slate-400 text-[10px] block">Last Synchronized</span>
                  <span class="font-bold text-slate-900 dark:text-white">${d.synced}</span>
                </div>

                <div class="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <span class="text-slate-400 text-[10px] block">Battery Status</span>
                  <span class="font-bold ${isConn ? 'text-emerald-500' : 'text-slate-400'}">${d.battery || 'N/A'}</span>
                </div>
              </div>

              <!-- Action Button -->
              <div class="pt-2 flex items-center justify-between">
                <span class="text-[11px] text-slate-400">
                  ${isConn ? 'Continuous background sync enabled' : 'Ready to pair via BLE / OAuth'}
                </span>

                <button 
                  onclick="window.vitaloraStore.toggleDevice('${d.id}'); window.renderApp(); window.showToast('${d.name} state changed');"
                  class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isConn 
                      ? 'border border-rose-500/30 text-rose-500 hover:bg-rose-500/10' 
                      : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md'
                  }"
                >
                  ${isConn ? 'Disconnect' : 'Connect'}
                </button>
              </div>

            </div>
          `;
        }).join('')}
      </div>

      <!-- FUTURE API ARCHITECTURE ROADMAP BOX (As detailed in the presentation) -->
      <div class="p-6 sm:p-8 rounded-3xl glass-panel border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-transparent space-y-4">
        <div class="flex items-center space-x-2 text-cyan-500 font-bold text-sm">
          <span>📡 Integration Architecture & Future Scope</span>
        </div>
        <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          The presentation specifically identifies wearable integration as the primary pipeline for continuous non-invasive telemetry (steps, photoplethysmographic heart rate, caloric expenditure, and actigraphy sleep phases). 
          In production, VITALORA interfaces with:
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
          <div class="p-3.5 rounded-2xl bg-white/40 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 space-y-1">
            <span class="font-bold text-slate-900 dark:text-white block">Apple HealthKit</span>
            <span class="text-slate-500 dark:text-slate-400 text-[11px]">Direct native SDK background delivery for real-time VO2 max & resting heart-rate.</span>
          </div>

          <div class="p-3.5 rounded-2xl bg-white/40 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 space-y-1">
            <span class="font-bold text-slate-900 dark:text-white block">Android Health Connect</span>
            <span class="text-slate-500 dark:text-slate-400 text-[11px]">Granular on-device health permissions with zero cloud broker latency.</span>
          </div>

          <div class="p-3.5 rounded-2xl bg-white/40 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 space-y-1">
            <span class="font-bold text-slate-900 dark:text-white block">Web Bluetooth GATT</span>
            <span class="text-slate-500 dark:text-slate-400 text-[11px]">Direct browser-to-hardware sync with Vitalora Band Pro and Smart Scales.</span>
          </div>
        </div>
      </div>

    </div>
  `;
};

window.mockSyncAllDevices = function() {
  window.showToast("Synchronizing biometric telemetry across connected devices... 🔄");
  setTimeout(() => {
    window.showToast("All devices synchronized! 12 new metrics received.");
  }, 1000);
};
