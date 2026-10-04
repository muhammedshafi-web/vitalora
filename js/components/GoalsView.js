// VITALORA - Goals & Reminders Management

window.renderGoalsView = function() {
  const store = window.vitaloraStore;
  const state = store.getState();
  const user = state.user;
  const today = state.todayStats;
  const reminders = state.reminders;

  // Goals completion calculations
  const stepPct = Math.min(100, Math.round((today.steps / user.stepGoal) * 100));
  const waterPct = Math.min(100, Math.round((today.waterMl / user.waterGoal) * 100));
  const sleepPct = Math.min(100, Math.round((today.sleepHours / user.sleepGoal) * 100));
  const exercisePct = Math.min(100, Math.round((today.exerciseMinutes / (user.exerciseGoal || 45)) * 100));

  return `
    <div class="pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <!-- Top Title Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span class="text-xs uppercase font-bold tracking-widest text-emerald-500">Milestone Calibration</span>
          <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Personalized Goals & Reminders</h1>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Configure daily physical habit quotas and automated wellness notifications.</p>
        </div>

        <button 
          onclick="window.showToast('All goal quotas synchronized!');"
          class="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center space-x-2 transition-all self-start md:self-auto"
        >
          <span>Sync All Targets ✓</span>
        </button>
      </div>

      <!-- ACTIVE GOALS PROGRESS CARDS (Prompt: 10k steps, 2.5L water, 8h sleep, 30-45m exercise, target weight) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- Steps Goal -->
        <div class="p-6 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2.5">
              <span class="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">🚶</span>
              <div>
                <h4 class="font-bold text-base text-slate-900 dark:text-white">Daily Steps Goal</h4>
                <span class="text-xs text-slate-400">Target: ${user.stepGoal.toLocaleString()} steps/day</span>
              </div>
            </div>
            <span class="text-emerald-500 font-black text-lg">${stepPct}%</span>
          </div>

          <div class="w-full bg-slate-100 dark:bg-white/10 rounded-full h-2.5 overflow-hidden">
            <div class="bg-emerald-500 h-2.5 rounded-full transition-all duration-700" style="width: ${stepPct}%"></div>
          </div>

          <div class="flex items-center justify-between text-xs text-slate-400">
            <span>Today: <strong>${today.steps.toLocaleString()}</strong></span>
            <button onclick="window.editGoalPrompt('stepGoal')" class="text-emerald-500 font-bold hover:underline">Edit Goal</button>
          </div>
        </div>

        <!-- Water Goal -->
        <div class="p-6 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2.5">
              <span class="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold">💧</span>
              <div>
                <h4 class="font-bold text-base text-slate-900 dark:text-white">Daily Water Intake</h4>
                <span class="text-xs text-slate-400">Target: ${(user.waterGoal / 1000).toFixed(1)}L (${user.waterGoal} ml)/day</span>
              </div>
            </div>
            <span class="text-cyan-500 font-black text-lg">${waterPct}%</span>
          </div>

          <div class="w-full bg-slate-100 dark:bg-white/10 rounded-full h-2.5 overflow-hidden">
            <div class="bg-cyan-500 h-2.5 rounded-full transition-all duration-700" style="width: ${waterPct}%"></div>
          </div>

          <div class="flex items-center justify-between text-xs text-slate-400">
            <span>Today: <strong>${(today.waterMl / 1000).toFixed(1)}L</strong></span>
            <button onclick="window.editGoalPrompt('waterGoal')" class="text-cyan-500 font-bold hover:underline">Edit Goal</button>
          </div>
        </div>

        <!-- Sleep Goal -->
        <div class="p-6 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2.5">
              <span class="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">🌙</span>
              <div>
                <h4 class="font-bold text-base text-slate-900 dark:text-white">Nightly Sleep Duration</h4>
                <span class="text-xs text-slate-400">Target: ${user.sleepGoal} Hours/night</span>
              </div>
            </div>
            <span class="text-purple-400 font-black text-lg">${sleepPct}%</span>
          </div>

          <div class="w-full bg-slate-100 dark:bg-white/10 rounded-full h-2.5 overflow-hidden">
            <div class="bg-purple-500 h-2.5 rounded-full transition-all duration-700" style="width: ${sleepPct}%"></div>
          </div>

          <div class="flex items-center justify-between text-xs text-slate-400">
            <span>Last Night: <strong>${today.sleepHours}h</strong></span>
            <button onclick="window.editGoalPrompt('sleepGoal')" class="text-purple-400 font-bold hover:underline">Edit Goal</button>
          </div>
        </div>

        <!-- Exercise Goal -->
        <div class="p-6 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2.5">
              <span class="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold">⚡</span>
              <div>
                <h4 class="font-bold text-base text-slate-900 dark:text-white">Workout Duration</h4>
                <span class="text-xs text-slate-400">Target: ${user.exerciseGoal || 45} minutes/day</span>
              </div>
            </div>
            <span class="text-rose-500 font-black text-lg">${exercisePct}%</span>
          </div>

          <div class="w-full bg-slate-100 dark:bg-white/10 rounded-full h-2.5 overflow-hidden">
            <div class="bg-rose-500 h-2.5 rounded-full transition-all duration-700" style="width: ${exercisePct}%"></div>
          </div>

          <div class="flex items-center justify-between text-xs text-slate-400">
            <span>Today: <strong>${today.exerciseMinutes} min</strong></span>
            <button onclick="window.editGoalPrompt('exerciseGoal')" class="text-rose-500 font-bold hover:underline">Edit Goal</button>
          </div>
        </div>

      </div>

      <!-- TARGET WEIGHT TRACKER CARD -->
      <div class="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <span class="text-xs uppercase font-bold tracking-wider text-slate-400">Body Composition Objective</span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white">Target Weight: ${user.targetWeight} kg</h3>
          <p class="text-xs text-slate-400">Current recorded weight: <strong>${today.currentWeight} kg</strong> (Remaining: 2.4 kg to target)</p>
        </div>

        <button 
          onclick="window.editGoalPrompt('targetWeight')"
          class="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 hover:border-emerald-500 font-bold text-xs"
        >
          Change Target Weight
        </button>
      </div>

      <!-- SMART REMINDERS SYSTEM (Prompt: Drink water, Exercise, Sleep, Log weight, Log meals) -->
      <div class="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">Smart Reminders & Prompts</h3>
            <p class="text-xs text-slate-400">Automated habit reinforcement alerts</p>
          </div>
          <span class="text-xs text-emerald-500 font-bold">Push Notifications Active</span>
        </div>

        <div class="divide-y divide-slate-100 dark:divide-white/5">
          ${reminders.map(rem => `
            <div class="py-4 flex items-center justify-between">
              <div class="flex items-center space-x-3.5">
                <div class="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-lg">
                  ${
                    rem.id === 'rem_1' ? '💧' :
                    rem.id === 'rem_2' ? '⚡' :
                    rem.id === 'rem_3' ? '🌙' :
                    rem.id === 'rem_4' ? '⚖️' : '🥗'
                  }
                </div>
                <div>
                  <h4 class="font-bold text-sm text-slate-900 dark:text-white">${rem.label}</h4>
                  <span class="text-xs text-slate-400">${rem.time}</span>
                </div>
              </div>

              <!-- Interactive Toggle Switch -->
              <button 
                onclick="window.vitaloraStore.toggleReminder('${rem.id}'); window.renderApp(); window.showToast('${rem.label} reminder toggled');"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  rem.enabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
                }"
              >
                <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  rem.enabled ? 'translate-x-6' : 'translate-x-1'
                }"></span>
              </button>
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  `;
};

window.editGoalPrompt = function(field) {
  const store = window.vitaloraStore;
  const current = store.getState().user[field] || 10000;
  const val = prompt(`Enter new value for ${field}:`, current);
  if (val && !isNaN(val)) {
    store.updateUser({ [field]: parseFloat(val) });
    window.renderApp();
    window.showToast("Goal updated successfully!");
  }
};
