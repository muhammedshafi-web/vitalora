// VITALORA - Progress Analytics Dashboard & Achievement Badges

window.progressRangeFilter = "30D"; // 7D, 30D, 3M, 6M, 1Y
window.activeProgressTab = "all"; // all, weight, steps, water, sleep, calories

window.renderProgressView = function() {
  const store = window.vitaloraStore;
  const state = store.getState();
  const badges = state.badges;
  const weekly = state.weeklyActivity;

  return `
    <div class="pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <!-- Top Title Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span class="text-xs uppercase font-bold tracking-widest text-emerald-500">Longitudinal Analytics</span>
          <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Progress & Milestone Analytics</h1>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Track multi-parameter wellness trajectory, habit adherence, and unlocked accolades.</p>
        </div>

        <!-- Date Range Filter Tabs: 7D | 30D | 3M | 6M | 1Y as requested -->
        <div class="flex items-center space-x-1 p-1 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs self-start md:self-auto">
          ${['7D', '30D', '3M', '6M', '1Y'].map(range => `
            <button 
              onclick="window.progressRangeFilter = '${range}'; window.renderApp();"
              class="px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                window.progressRangeFilter === range 
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' 
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }"
            >
              ${range}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- KEY PROGRESS INDICATORS CARDS -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div class="p-5 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 card-lift">
          <span class="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Weight Delta</span>
          <div class="text-2xl sm:text-3xl font-black text-emerald-500">-1.8 kg</div>
          <span class="text-[11px] text-slate-400 mt-1 block">In the past 30 days</span>
        </div>

        <div class="p-5 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 card-lift">
          <span class="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Step Velocity</span>
          <div class="text-2xl sm:text-3xl font-black text-cyan-500">9,340 / day</div>
          <span class="text-[11px] text-slate-400 mt-1 block">Average daily volume</span>
        </div>

        <div class="p-5 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 card-lift">
          <span class="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Workout Consistency</span>
          <div class="text-2xl sm:text-3xl font-black text-rose-500">5.2 sessions</div>
          <span class="text-[11px] text-slate-400 mt-1 block">Per week adherence</span>
        </div>

        <div class="p-5 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 card-lift">
          <span class="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Restful Sleep Mean</span>
          <div class="text-2xl sm:text-3xl font-black text-purple-400">7h 35m</div>
          <span class="text-[11px] text-slate-400 mt-1 block">91% sleep efficiency</span>
        </div>
      </div>

      <!-- INTERACTIVE MULTI-METRIC CHARTS CONTAINER -->
      <div class="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 class="font-bold text-lg text-slate-900 dark:text-white">Comparative Weekly Biometrics</h3>
            <p class="text-xs text-slate-400">Daily Steps vs Water (Liters) vs Exercise (Minutes)</p>
          </div>

          <div class="flex items-center space-x-4 text-xs font-semibold">
            <div class="flex items-center space-x-1.5">
              <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span class="text-slate-700 dark:text-slate-300">Steps (k)</span>
            </div>
            <div class="flex items-center space-x-1.5">
              <span class="w-3 h-3 rounded-full bg-cyan-500"></span>
              <span class="text-slate-700 dark:text-slate-300">Water (L)</span>
            </div>
            <div class="flex items-center space-x-1.5">
              <span class="w-3 h-3 rounded-full bg-rose-500"></span>
              <span class="text-slate-700 dark:text-slate-300">Workout (min)</span>
            </div>
          </div>
        </div>

        <!-- Multi-Metric Normalized Chart Visualization -->
        <div class="h-64 flex items-end justify-between gap-3 sm:gap-6 pt-6 pb-2 border-b border-slate-100 dark:border-white/10">
          ${weekly.map(d => {
            const stepH = Math.min(100, Math.round((d.steps / 12000) * 100));
            const waterH = Math.min(100, Math.round((d.water / 3000) * 100));
            const exH = Math.min(100, Math.round((d.exercise / 60) * 100));
            return `
              <div class="flex-1 flex flex-col items-center group h-full justify-end">
                <div class="w-full flex items-end justify-center space-x-1 h-full">
                  <!-- Steps bar -->
                  <div class="w-2.5 sm:w-3.5 bg-emerald-500 rounded-t-md transition-all duration-500" style="height: ${stepH}%;" title="${d.steps} steps"></div>
                  <!-- Water bar -->
                  <div class="w-2.5 sm:w-3.5 bg-cyan-500 rounded-t-md transition-all duration-500" style="height: ${waterH}%;" title="${d.water} ml water"></div>
                  <!-- Exercise bar -->
                  <div class="w-2.5 sm:w-3.5 bg-rose-500 rounded-t-md transition-all duration-500" style="height: ${exH}%;" title="${d.exercise} min exercise"></div>
                </div>
                <span class="text-xs font-bold text-slate-500 dark:text-slate-400 mt-2">${d.day}</span>
              </div>
            `;
          }).join('')}
        </div>

        <div class="text-[11px] text-slate-400 text-center">
          Interactive comparative normalization based on your active ${window.progressRangeFilter} timeline.
        </div>
      </div>

      <!-- ACHIEVEMENT BADGES SHOWCASE (Prompt: 🏆 7 Day Streak, 💧 Hydration Hero, 🚶 50K Steps, 💪 Workout Warrior, 😴 Sleep Champion) -->
      <div class="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <span class="text-xs uppercase font-bold tracking-widest text-amber-500">Gamification Milestones</span>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mt-1">Achievement Badges</h3>
          </div>
          <span class="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500/10 text-amber-500 border border-amber-500/20">
            5 / 7 Unlocked
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          ${badges.map(b => `
            <div class="p-4 rounded-2xl border transition-all ${
              b.unlocked 
                ? 'bg-gradient-to-br from-amber-500/10 via-transparent to-emerald-500/5 border-amber-500/30 card-lift' 
                : 'bg-slate-100/50 dark:bg-white/[0.02] border-dashed border-slate-300 dark:border-white/10 opacity-50'
            }">
              <div class="flex items-start justify-between mb-3">
                <span class="text-3xl">${b.icon}</span>
                <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  b.unlocked ? 'bg-emerald-500/20 text-emerald-500' : 'bg-slate-200 dark:bg-white/10 text-slate-400'
                }">
                  ${b.unlocked ? 'Unlocked' : 'In Progress'}
                </span>
              </div>

              <h4 class="font-extrabold text-sm text-slate-900 dark:text-white">${b.title}</h4>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">${b.desc}</p>
              
              ${b.date ? `
                <span class="text-[10px] text-slate-400 mt-3 block font-mono">Awarded on ${b.date}</span>
              ` : `
                <span class="text-[10px] text-slate-400 mt-3 block font-mono">Keep tracking to unlock</span>
              `}
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  `;
};
