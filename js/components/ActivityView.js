// VITALORA - Activity Dashboard, Workout Logger & Weekly Charts

window.renderActivityView = function() {
  const store = window.vitaloraStore;
  const state = store.getState();
  const today = state.todayStats;
  const weekly = state.weeklyActivity;
  const workouts = state.workouts;

  // Weekly Goal Calculation (150 minutes standard)
  const totalWeeklyMins = weekly.reduce((sum, d) => sum + (d.exercise || 0), 0);
  const weeklyTarget = 150;
  const weeklyGoalPct = Math.min(100, Math.round((totalWeeklyMins / weeklyTarget) * 100));

  // Max daily minutes for bar chart scaling
  const maxMins = Math.max(70, ...weekly.map(d => d.exercise || 0));

  return `
    <div class="pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <!-- Top Title Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span class="text-xs uppercase font-bold tracking-widest text-emerald-500">Cardiovascular & Kinetic Energy</span>
          <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Activity & Exercise Tracker</h1>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Monitor active movement volume, metabolic burns, and multi-sport sessions.</p>
        </div>

        <button 
          onclick="window.openWorkoutModal()" 
          class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 flex items-center space-x-2 transition-all self-start md:self-auto"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          <span>Log New Workout</span>
        </button>
      </div>

      <!-- KEY ACTIVITY SUMMARY STATS -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div class="p-6 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 card-lift">
          <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Steps Today</span>
            <span>🚶</span>
          </div>
          <div class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">${today.steps.toLocaleString()}</div>
          <div class="text-xs text-emerald-500 font-semibold mt-1">78% of 10,000 goal</div>
        </div>

        <div class="p-6 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 card-lift">
          <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Walking Distance</span>
            <span>🗺️</span>
          </div>
          <div class="text-3xl font-extrabold text-cyan-500 tracking-tight">${today.distanceKm} km</div>
          <div class="text-xs text-slate-400 mt-1">~7,400 active paces</div>
        </div>

        <div class="p-6 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 card-lift">
          <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Active Calories</span>
            <span>🔥</span>
          </div>
          <div class="text-3xl font-extrabold text-amber-500 tracking-tight">${today.caloriesBurned} kcal</div>
          <div class="text-xs text-slate-400 mt-1">Exercise + basal expenditure</div>
        </div>

        <div class="p-6 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 card-lift">
          <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Workout Duration</span>
            <span>⏱️</span>
          </div>
          <div class="text-3xl font-extrabold text-rose-500 tracking-tight">${today.exerciseMinutes} min</div>
          <div class="text-xs text-slate-400 mt-1">Across 2 logged workouts</div>
        </div>

      </div>

      <!-- WEEKLY EXERCISE GOAL: 150 MINUTES (As requested) -->
      <div class="p-6 sm:p-8 rounded-3xl glass-panel border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div class="inline-flex items-center space-x-2 text-xs uppercase font-bold tracking-widest text-emerald-500">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>AHA & WHO Recommended Guideline</span>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mt-1">Weekly Goal: 150 minutes</h3>
          </div>
          <div class="text-right">
            <span class="text-2xl font-black text-emerald-500">${totalWeeklyMins} / 150 min</span>
            <span class="text-xs text-slate-400 block">${weeklyGoalPct}% completed</span>
          </div>
        </div>

        <!-- Animated Progress Bar -->
        <div class="w-full bg-slate-200 dark:bg-white/10 rounded-full h-3 overflow-hidden">
          <div 
            class="bg-gradient-to-r from-emerald-400 to-teal-500 h-3 rounded-full transition-all duration-1000" 
            style="width: ${weeklyGoalPct}%"
          ></div>
        </div>

        <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Just 15 more minutes of moderate activity required this week!</span>
          <span class="text-emerald-500 font-bold">Excellent momentum 🏆</span>
        </div>
      </div>

      <!-- WEEKLY ACTIVITY BAR CHART -->
      <div class="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 space-y-6">
        <div class="flex items-center justify-between">
          <h3 class="font-bold text-lg text-slate-900 dark:text-white">Weekly Activity Profile (Minutes)</h3>
          <span class="text-xs text-slate-400">Mon - Sun</span>
        </div>

        <!-- Responsive Bar Chart -->
        <div class="h-56 flex items-end justify-between gap-2 sm:gap-4 pt-6 pb-2 border-b border-slate-100 dark:border-white/10">
          ${weekly.map(d => {
            const barHeightPct = Math.round((d.exercise / maxMins) * 100);
            return `
              <div class="flex-1 flex flex-col items-center group h-full justify-end">
                <span class="text-[10px] font-bold text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity mb-1">${d.exercise}m</span>
                <div class="w-full max-w-[42px] bg-slate-100 dark:bg-white/5 rounded-t-xl overflow-hidden flex items-end h-full">
                  <div 
                    class="w-full bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t-xl group-hover:from-emerald-400 group-hover:to-teal-300 transition-all duration-300"
                    style="height: ${barHeightPct}%;"
                  ></div>
                </div>
                <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-2">${d.day}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- WORKOUT LOGS & CATEGORIES LIST -->
      <div class="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 space-y-6">
        
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-bold text-lg text-slate-900 dark:text-white">Recorded Workouts History</h3>
            <p class="text-xs text-slate-400">Manually logged and sensor-synced physical sessions</p>
          </div>
          <button onclick="window.openWorkoutModal()" class="text-xs font-bold text-emerald-500 hover:underline">
            + Add Workout
          </button>
        </div>

        <div class="divide-y divide-slate-100 dark:divide-white/5">
          ${workouts.map(w => `
            <div class="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-xl flex-shrink-0">
                  ${
                    w.type === 'Running' ? '🏃' :
                    w.type === 'Yoga' ? '🧘' :
                    w.type === 'Cycling' ? '🚴' :
                    w.type === 'Gym' ? '🏋️' :
                    w.type === 'Swimming' ? '🏊' :
                    w.type === 'Walking' ? '🚶' : '⚡'
                  }
                </div>
                <div>
                  <div class="flex items-center space-x-2">
                    <h4 class="font-bold text-slate-900 dark:text-white">${w.type} Workout</h4>
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
                      w.intensity === 'High' ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'
                    }">${w.intensity} Intensity</span>
                  </div>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${w.date} at ${w.time} • ${w.notes || 'Routine session'}</p>
                </div>
              </div>

              <div class="flex items-center justify-between sm:justify-end space-x-6">
                <div class="text-right">
                  <span class="font-black text-base text-emerald-500 block">${w.duration} min</span>
                  <span class="text-xs text-slate-400">${w.calories} kcal</span>
                </div>
                <button 
                  onclick="window.vitaloraStore.deleteWorkout('${w.id}'); window.renderApp(); window.showToast('Workout removed');"
                  class="text-rose-500 hover:text-rose-400 p-2 rounded-lg hover:bg-rose-500/10"
                  title="Delete workout entry"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
              </div>
            </div>
          `).join('')}
        </div>

      </div>

    </div>
  `;
};
