// VITALORA - Sleep Tracker, Restorative Stages & Circadian Analytics

window.renderSleepView = function() {
  const store = window.vitaloraStore;
  const state = store.getState();
  const today = state.todayStats;
  const weekly = state.weeklyActivity;

  // Weekly average calculation
  const totalSleepHours = weekly.reduce((sum, d) => sum + (d.sleep || 0), 0);
  const avgSleep = (totalSleepHours / weekly.length).toFixed(1);

  return `
    <div class="pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <!-- Top Title Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span class="text-xs uppercase font-bold tracking-widest text-purple-400">Circadian Biology & Recovery</span>
          <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Rest & Sleep Tracker</h1>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Analyze REM restoration, delta deep wave cycles, and sleep latency.</p>
        </div>

        <button 
          onclick="window.openSleepModal()" 
          class="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/20 flex items-center space-x-2 transition-all self-start md:self-auto"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          <span>Log Sleep Duration</span>
        </button>
      </div>

      <!-- MAIN SLEEP HERO CARDS -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        <!-- Big Sleep Metric Card -->
        <div class="md:col-span-5 p-6 sm:p-8 rounded-3xl glass-panel border border-purple-500/30 bg-gradient-to-b from-purple-500/15 via-purple-500/5 to-transparent space-y-5">
          <span class="text-xs uppercase font-bold tracking-widest text-purple-400">Last Night's Sleep</span>
          
          <div class="space-y-1">
            <div class="text-5xl font-black text-purple-600 dark:text-purple-300 tracking-tight">7h 24m</div>
            <div class="text-xs font-bold text-emerald-500 inline-flex items-center space-x-1.5 mt-2 bg-emerald-500/10 px-3 py-1 rounded-full">
              <span>●</span>
              <span>${today.sleepQuality}</span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 pt-4 border-t border-purple-500/20 text-xs">
            <div>
              <span class="text-slate-400 block mb-0.5">Bedtime</span>
              <span class="text-base font-bold text-slate-900 dark:text-white">${today.sleepBedtime || "11:15 PM"}</span>
            </div>
            <div>
              <span class="text-slate-400 block mb-0.5">Wake-Up</span>
              <span class="text-base font-bold text-slate-900 dark:text-white">${today.sleepWakeup || "06:39 AM"}</span>
            </div>
          </div>
        </div>

        <!-- Sleep Stages Breakdown -->
        <div class="md:col-span-7 p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 space-y-6">
          <div class="flex items-center justify-between">
            <h3 class="font-bold text-lg text-slate-900 dark:text-white">Sleep Stage Architecture</h3>
            <span class="text-xs text-slate-400">Total: 7.4 hrs</span>
          </div>

          <!-- Multi-colored Stage Bar -->
          <div class="space-y-2">
            <div class="h-4 rounded-full overflow-hidden flex">
              <div class="bg-indigo-600 h-full" style="width: 29%;" title="Deep Sleep (2h 10m)"></div>
              <div class="bg-purple-500 h-full" style="width: 24%;" title="REM Sleep (1h 45m)"></div>
              <div class="bg-blue-400 h-full" style="width: 47%;" title="Light Sleep (3h 29m)"></div>
            </div>

            <div class="flex items-center justify-between text-xs font-medium pt-1">
              <div class="flex items-center space-x-1.5">
                <span class="w-3 h-3 rounded-full bg-indigo-600"></span>
                <span class="text-slate-700 dark:text-slate-300">Deep Sleep: <strong>2h 10m</strong> (29%)</span>
              </div>
              <div class="flex items-center space-x-1.5">
                <span class="w-3 h-3 rounded-full bg-purple-500"></span>
                <span class="text-slate-700 dark:text-slate-300">REM: <strong>1h 45m</strong> (24%)</span>
              </div>
              <div class="flex items-center space-x-1.5">
                <span class="w-3 h-3 rounded-full bg-blue-400"></span>
                <span class="text-slate-700 dark:text-slate-300">Light: <strong>3h 29m</strong> (47%)</span>
              </div>
            </div>
          </div>

          <!-- Wellness Insight Box (Prompt Requirement) -->
          <div class="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-700 dark:text-purple-300 leading-relaxed flex items-start space-x-3">
            <span class="text-base">💡</span>
            <div>
              <strong>Circadian Wellness Insight:</strong> Your average sleep this week is <strong>${avgSleep}h</strong> (${Math.floor(avgSleep)}h ${Math.round((avgSleep % 1) * 60)}m). Regular bedtimes between 11:00 PM and 11:30 PM support optimal biological clock synchrony.
            </div>
          </div>

        </div>

      </div>

      <!-- WEEKLY SLEEP COMPARISON CHART -->
      <div class="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 space-y-6">
        <div class="flex items-center justify-between">
          <h3 class="font-bold text-lg text-slate-900 dark:text-white">Weekly Sleep Duration (Hours)</h3>
          <span class="text-xs text-slate-400">Target: 8.0 hrs/night</span>
        </div>

        <div class="h-48 flex items-end justify-between gap-2 sm:gap-6 pt-6 pb-2 border-b border-slate-100 dark:border-white/10">
          ${weekly.map(d => {
            const heightPct = Math.min(100, Math.round((d.sleep / 9.0) * 100));
            const isGood = d.sleep >= 7.5;
            return `
              <div class="flex-1 flex flex-col items-center group h-full justify-end">
                <span class="text-[10px] font-bold text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity mb-1">${d.sleep}h</span>
                <div class="w-full max-w-[42px] bg-slate-100 dark:bg-white/5 rounded-t-xl overflow-hidden flex items-end h-full">
                  <div 
                    class="w-full ${isGood ? 'bg-gradient-to-t from-purple-600 to-indigo-500' : 'bg-gradient-to-t from-purple-400 to-slate-400'} rounded-t-xl transition-all duration-300"
                    style="height: ${heightPct}%;"
                  ></div>
                </div>
                <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-2">${d.day}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- NON-MEDICAL DISCLAIMER -->
      <div class="p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-500 dark:text-slate-400 leading-relaxed text-center">
        <strong>Wellness Notice:</strong> Sleep monitoring indices are designed for personal habit coaching and behavioral lifestyle optimization. VITALORA does not provide medical diagnoses for sleep apnea, insomnia, or neurological conditions.
      </div>

    </div>
  `;
};
