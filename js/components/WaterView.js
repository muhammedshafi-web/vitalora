// VITALORA - Water Tracker with Animated Fluid Bottle & Quick Logging

window.renderWaterView = function() {
  const store = window.vitaloraStore;
  const state = store.getState();
  const today = state.todayStats;
  const user = state.user;
  const waterLogs = state.waterLogs;

  const currentMl = today.waterMl || 0;
  const goalMl = user.waterGoal || 2500;
  const pct = Math.min(100, Math.round((currentMl / goalMl) * 100));
  const remainingMl = Math.max(0, goalMl - currentMl);

  return `
    <div class="pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <!-- Top Title Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span class="text-xs uppercase font-bold tracking-widest text-cyan-500">Cellular Osmosis & Hydration</span>
          <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Daily Hydration Tracker</h1>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Maintain cognitive alertness, joint lubrication, and optimal metabolic function.</p>
        </div>

        <!-- Customize Goal Button -->
        <button 
          onclick="window.customizeWaterGoalPrompt()" 
          class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-white/10 text-xs font-bold flex items-center space-x-1.5 transition-all self-start md:self-auto"
        >
          <svg class="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          <span>Adjust Water Goal</span>
        </button>
      </div>

      <!-- MAIN HYDRATION DASHBOARD & ANIMATED BOTTLE -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <!-- Large Animated Water Bottle Visual (Canvas / SVG Waveform) -->
        <div class="lg:col-span-5 flex justify-center">
          <div class="relative w-64 h-[440px] rounded-[3.5rem] p-4 glass-panel border-2 border-cyan-400/30 flex flex-col items-center justify-between shadow-2xl bg-gradient-to-b from-white/10 to-cyan-500/5">
            
            <!-- Bottle Cap -->
            <div class="w-20 h-7 rounded-t-xl bg-slate-300 dark:bg-slate-700 border border-cyan-400/40 -mt-8 flex items-center justify-center">
              <div class="w-10 h-1.5 rounded-full bg-cyan-400"></div>
            </div>

            <!-- Bottle Neck & Measurement Hashmarks -->
            <div class="absolute top-12 left-4 bottom-12 flex flex-col justify-between text-[10px] font-mono text-cyan-500 font-bold opacity-60">
              <span>2.5L</span>
              <span>2.0L</span>
              <span>1.5L</span>
              <span>1.0L</span>
              <span>0.5L</span>
            </div>

            <!-- Fluid Fill Tank with Waves -->
            <div class="relative w-full flex-1 rounded-[2.5rem] overflow-hidden bg-slate-100 dark:bg-slate-900/40 flex flex-col justify-end mt-4">
              
              <!-- Fluid Wave Level Container -->
              <div 
                class="w-full relative transition-all duration-1000 bg-gradient-to-t from-cyan-500 to-blue-400 flex flex-col justify-start"
                style="height: ${pct}%;"
              >
                <!-- SVG Crest Waves -->
                <div class="absolute -top-4 left-0 right-0 h-6 overflow-hidden">
                  <svg class="w-[200%] h-6 fill-cyan-400 wave-animation" viewBox="0 0 1000 40" preserveAspectRatio="none">
                    <path d="M0,20 C150,40 350,0 500,20 C650,40 850,0 1000,20 L1000,40 L0,40 Z"/>
                  </svg>
                </div>

                <div class="relative z-10 text-center pt-3 text-white">
                  <span class="text-2xl font-black drop-shadow">${(currentMl / 1000).toFixed(2)}L</span>
                  <span class="text-[11px] font-bold block drop-shadow opacity-90">${pct}% of target</span>
                </div>
              </div>

            </div>

            <!-- Percentage Pill at base of bottle -->
            <div class="w-full text-center pt-2">
              <span class="text-xs font-bold text-cyan-500">${remainingMl > 0 ? `${(remainingMl / 1000).toFixed(1)}L remaining today` : 'Target achieved! 🎉'}</span>
            </div>

          </div>
        </div>

        <!-- Hydration Controls & Metrics -->
        <div class="lg:col-span-7 space-y-6">
          
          <!-- Big Metric Banner -->
          <div class="p-6 sm:p-8 rounded-3xl glass-panel border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-transparent space-y-4">
            <div class="flex items-baseline space-x-3">
              <span class="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">${(currentMl / 1000).toFixed(1)}L</span>
              <span class="text-lg text-slate-500 dark:text-slate-400">/ ${(goalMl / 1000).toFixed(1)} Liters Goal</span>
            </div>

            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Optimal daily hydration boosts metabolic efficiency, kidney filtration, and cognitive reaction speeds.
            </p>

            <!-- Quick Add Action Buttons (Prompt Requirement: +250ml, +500ml, +750ml) -->
            <div class="pt-2">
              <span class="text-xs font-bold uppercase tracking-wider text-cyan-500 block mb-3">Quick Add Hydration</span>
              <div class="grid grid-cols-3 sm:grid-cols-4 gap-3">
                <button 
                  onclick="window.quickAddWater(250)" 
                  class="py-3 px-4 rounded-2xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all flex flex-col items-center card-lift"
                >
                  <span class="text-xs opacity-80">Cup</span>
                  <span>+250 ml</span>
                </button>

                <button 
                  onclick="window.quickAddWater(500)" 
                  class="py-3 px-4 rounded-2xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all flex flex-col items-center card-lift"
                >
                  <span class="text-xs opacity-80">Bottle</span>
                  <span>+500 ml</span>
                </button>

                <button 
                  onclick="window.quickAddWater(750)" 
                  class="py-3 px-4 rounded-2xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all flex flex-col items-center card-lift"
                >
                  <span class="text-xs opacity-80">Flask</span>
                  <span>+750 ml</span>
                </button>

                <button 
                  onclick="window.vitaloraStore.undoWater(); window.renderApp(); window.showToast('Last entry undone');" 
                  class="py-3 px-4 rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 font-bold text-xs border border-slate-200 dark:border-white/10 transition-all flex flex-col items-center justify-center col-span-3 sm:col-span-1"
                  title="Undo last recorded intake"
                >
                  <span>↺ Undo</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Stats comparison grid: Today, Weekly average, Daily goal -->
          <div class="grid grid-cols-3 gap-3">
            <div class="p-4 rounded-2xl glass-panel border border-slate-200/80 dark:border-white/10 text-center">
              <span class="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">Today's Intake</span>
              <span class="text-xl font-black text-cyan-500">${(currentMl / 1000).toFixed(1)}L</span>
            </div>

            <div class="p-4 rounded-2xl glass-panel border border-slate-200/80 dark:border-white/10 text-center">
              <span class="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">Weekly Average</span>
              <span class="text-xl font-black text-slate-900 dark:text-white">2.3L</span>
            </div>

            <div class="p-4 rounded-2xl glass-panel border border-slate-200/80 dark:border-white/10 text-center">
              <span class="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">Daily Target</span>
              <span class="text-xl font-black text-emerald-500">${(goalMl / 1000).toFixed(1)}L</span>
            </div>
          </div>

          <!-- Today's Hydration History Timeline -->
          <div class="p-6 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 space-y-4">
            <div class="flex items-center justify-between">
              <h4 class="font-bold text-sm text-slate-900 dark:text-white">Hydration Timeline Today</h4>
              <span class="text-xs text-slate-400">${waterLogs.length} logs recorded</span>
            </div>

            <div class="space-y-2 max-h-40 overflow-y-auto">
              ${waterLogs.map(log => `
                <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between text-xs">
                  <div class="flex items-center space-x-2">
                    <span class="text-cyan-500 font-bold">💧</span>
                    <span class="font-medium text-slate-700 dark:text-slate-300">${log.time}</span>
                  </div>
                  <span class="font-extrabold text-cyan-500">+${log.amount} ml</span>
                </div>
              `).join('')}
            </div>
          </div>

        </div>

      </div>

    </div>
  `;
};

window.customizeWaterGoalPrompt = function() {
  const current = window.vitaloraStore.getState().user.waterGoal || 2500;
  const newGoal = prompt("Set customized daily water target (in ml):", current);
  if (newGoal && !isNaN(newGoal)) {
    window.vitaloraStore.setWaterGoal(newGoal);
    window.renderApp();
    window.showToast(`Water goal updated to ${newGoal}ml`);
  }
};
