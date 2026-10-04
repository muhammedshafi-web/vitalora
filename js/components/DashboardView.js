// VITALORA - Main Dashboard View with Biometric Cards & Health Score

window.renderDashboardView = function() {
  const store = window.vitaloraStore;
  const state = store.getState();
  const user = state.user;
  const today = state.todayStats;
  const healthScore = store.calculateHealthScore();

  // Dynamic time greeting
  const hr = new Date().getHours();
  const greeting = hr < 12 ? "Good morning" : hr < 17 ? "Good afternoon" : "Good evening";

  // Circular steps percentage
  const stepTarget = user.stepGoal || 10000;
  const stepPct = Math.min(100, Math.round((today.steps / stepTarget) * 100));
  const strokeRadius = 45;
  const circumference = 2 * Math.PI * strokeRadius;
  const strokeOffset = circumference - (stepPct / 100) * circumference;

  // Water percentage
  const waterTarget = user.waterGoal || 2500;
  const waterPct = Math.min(100, Math.round((today.waterMl / waterTarget) * 100));

  return `
    <div class="pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <!-- TOP GREETING & HEALTH SCORE HERO BANNER -->
      <div class="rounded-3xl glass-panel p-6 sm:p-8 border border-white/20 bg-gradient-to-r from-emerald-500/10 via-cyan-500/5 to-purple-500/10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div class="space-y-2 text-center md:text-left">
          <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-semibold">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Real-time Biometric Feed</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            ${greeting}, ${user.name.split(' ')[0]} 👋
          </h1>
          <p class="text-sm text-slate-600 dark:text-slate-300 max-w-xl">
            You've achieved <strong class="text-emerald-500 font-bold">${stepPct}%</strong> of your daily activity target and maintained steady hydration. Here is your holistic wellness index for today:
          </p>
        </div>

        <!-- VITALORA HEALTH SCORE BADGE (Unique Feature) -->
        <div 
          onclick="window.showHealthScoreModal()" 
          class="cursor-pointer group p-4 sm:p-5 rounded-2xl glass-panel border border-emerald-500/30 hover:border-emerald-500 transition-all bg-white/40 dark:bg-slate-900/60 shadow-xl flex items-center space-x-5 card-lift"
          title="Click to view full VITALORA Health Score breakdown"
        >
          <div class="relative w-20 h-20 flex items-center justify-center">
            <!-- Circular Radial SVG -->
            <svg class="w-20 h-20 transform -rotate-90">
              <circle cx="40" cy="40" r="34" stroke="currentColor" stroke-width="7" class="text-slate-200 dark:text-white/10 fill-none" />
              <circle 
                cx="40" cy="40" r="34" stroke="currentColor" stroke-width="7" 
                class="text-emerald-500 fill-none transition-all duration-1000 stroke-round"
                stroke-dasharray="213.6"
                stroke-dashoffset="${213.6 - (healthScore.total / 100) * 213.6}"
              />
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span class="text-xl font-black text-slate-900 dark:text-white leading-none">${healthScore.total}</span>
              <span class="text-[9px] text-slate-500 dark:text-slate-400 font-bold">/100</span>
            </div>
          </div>

          <div class="space-y-1">
            <div class="flex items-center space-x-1">
              <span class="text-xs uppercase font-bold tracking-widest text-emerald-500">HEALTH SCORE</span>
              <svg class="w-3.5 h-3.5 text-emerald-500 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <div class="text-sm font-extrabold text-slate-900 dark:text-white">Optimal Wellness</div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400">Tap to inspect score formula</div>
          </div>
        </div>

      </div>

      <!-- QUICK ACTION SHORTCUTS -->
      <div class="flex items-center space-x-2 sm:space-x-3 overflow-x-auto pb-2 scrollbar-none">
        <button 
          onclick="window.openWorkoutModal()" 
          class="flex-shrink-0 px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center space-x-1.5 transition-all"
        >
          <span>+ Log Workout</span>
        </button>

        <button 
          onclick="window.quickAddWater(250)" 
          class="flex-shrink-0 px-4 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-bold flex items-center space-x-1.5 transition-all"
        >
          <span>💧 +250ml Water</span>
        </button>

        <button 
          onclick="window.openMealModal()" 
          class="flex-shrink-0 px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold flex items-center space-x-1.5 transition-all"
        >
          <span>+ Log Meal</span>
        </button>

        <button 
          onclick="window.openWeightModal()" 
          class="flex-shrink-0 px-4 py-2.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-xs font-bold flex items-center space-x-1.5 transition-all"
        >
          <span>⚖️ Log Weight</span>
        </button>

        <button 
          onclick="window.navigateTo('ai-coach')" 
          class="flex-shrink-0 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-white/10 text-xs font-bold flex items-center space-x-1.5 transition-all"
        >
          <span>✨ Ask AI Coach</span>
        </button>
      </div>

      <!-- MAIN METRICS GRID (As requested: Steps, Water, Sleep, Weight, BMI, Exercise, Calories, Heart-Rate) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        <!-- CARD 1: STEPS (With animated circular progress indicator) -->
        <div class="p-6 rounded-3xl glass-panel card-lift flex flex-col justify-between border border-slate-200/80 dark:border-white/10 cursor-pointer" onclick="window.navigateTo('activity')">
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">Daily Steps</span>
            <span class="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-xs font-bold">🚶</span>
          </div>

          <div class="flex items-center justify-between my-2">
            <div>
              <div class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">${today.steps.toLocaleString()}</div>
              <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Target: ${stepTarget.toLocaleString()}</div>
            </div>

            <!-- Animated Circular Ring -->
            <div class="relative w-16 h-16 flex items-center justify-center">
              <svg class="w-16 h-16">
                <circle cx="32" cy="32" r="26" stroke="currentColor" stroke-width="5" class="text-slate-100 dark:text-white/10 fill-none" />
                <circle 
                  cx="32" cy="32" r="26" stroke="currentColor" stroke-width="5" 
                  class="progress-ring-circle text-emerald-500 fill-none"
                  stroke-dasharray="163.3"
                  stroke-dashoffset="${163.3 - (stepPct / 100) * 163.3}"
                />
              </svg>
              <span class="absolute text-xs font-bold text-slate-900 dark:text-white">${stepPct}%</span>
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Distance: <strong>5.88 km</strong></span>
            <span>Burned: <strong class="text-emerald-500">520 kcal</strong></span>
          </div>
        </div>

        <!-- CARD 2: WATER (1.8L / 2.5L with +250ml, +500ml, +750ml quick add) -->
        <div class="p-6 rounded-3xl glass-panel card-lift flex flex-col justify-between border border-slate-200/80 dark:border-white/10">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">Hydration Balance</span>
            <button onclick="window.navigateTo('water')" class="text-xs text-cyan-500 font-semibold hover:underline">View Page →</button>
          </div>

          <div class="my-2">
            <div class="flex items-baseline space-x-2">
              <span class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">${(today.waterMl / 1000).toFixed(1)}L</span>
              <span class="text-sm text-slate-500 dark:text-slate-400 font-medium">/ ${(waterTarget / 1000).toFixed(1)}L</span>
            </div>
            <div class="w-full bg-slate-100 dark:bg-white/10 rounded-full h-2 mt-2 overflow-hidden">
              <div class="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-500" style="width: ${waterPct}%"></div>
            </div>
          </div>

          <!-- Direct Quick-Add Buttons (+250ml, +500ml, +750ml) as specified in prompt -->
          <div class="mt-4 pt-3 border-t border-slate-100 dark:border-white/5">
            <span class="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold block mb-1.5">Quick Add Water</span>
            <div class="grid grid-cols-3 gap-1.5">
              <button onclick="window.quickAddWater(250)" class="py-1 px-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold transition-colors">
                +250ml
              </button>
              <button onclick="window.quickAddWater(500)" class="py-1 px-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold transition-colors">
                +500ml
              </button>
              <button onclick="window.quickAddWater(750)" class="py-1 px-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold transition-colors">
                +750ml
              </button>
            </div>
          </div>
        </div>

        <!-- CARD 3: SLEEP (7h 24m with quality rating) -->
        <div class="p-6 rounded-3xl glass-panel card-lift flex flex-col justify-between border border-slate-200/80 dark:border-white/10 cursor-pointer" onclick="window.navigateTo('sleep')">
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">Sleep Duration</span>
            <span class="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-xs font-bold">🌙</span>
          </div>

          <div class="my-2">
            <div class="text-3xl font-extrabold text-purple-600 dark:text-purple-300 tracking-tight">7h 24m</div>
            <div class="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold mt-2">
              <span>●</span>
              <span>${today.sleepQuality}</span>
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Bed: <strong>11:15 PM</strong></span>
            <span>Wake: <strong>06:39 AM</strong></span>
          </div>
        </div>

        <!-- CARD 4: WEIGHT (68.4 kg with change from previous entry) -->
        <div class="p-6 rounded-3xl glass-panel card-lift flex flex-col justify-between border border-slate-200/80 dark:border-white/10 cursor-pointer" onclick="window.navigateTo('health')">
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">Body Weight</span>
            <span class="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-xs font-bold">⚖️</span>
          </div>

          <div class="my-2">
            <div class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">${today.currentWeight} kg</div>
            <div class="flex items-center space-x-1.5 text-xs text-emerald-500 font-bold mt-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
              <span>-0.6 kg vs last week</span>
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Target: <strong>${user.targetWeight || 66.0} kg</strong></span>
            <span class="text-emerald-500 font-semibold">On Track</span>
          </div>
        </div>

        <!-- CARD 5: BMI (21.6 or 22.3 with category badge) -->
        <div class="p-6 rounded-3xl glass-panel card-lift flex flex-col justify-between border border-slate-200/80 dark:border-white/10 cursor-pointer" onclick="window.navigateTo('health')">
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">Body Mass Index</span>
            <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-500">WHO Standard</span>
          </div>

          <div class="my-2">
            <div class="text-3xl font-extrabold text-emerald-500 tracking-tight">${today.bmi}</div>
            <div class="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">
              Category: <span class="text-emerald-500">${today.bmiCategory}</span>
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 text-[11px] text-slate-500 dark:text-slate-400">
            Normal BMI standard: 18.5 – 24.9
          </div>
        </div>

        <!-- CARD 6: EXERCISE (45 min today workout duration) -->
        <div class="p-6 rounded-3xl glass-panel card-lift flex flex-col justify-between border border-slate-200/80 dark:border-white/10 cursor-pointer" onclick="window.navigateTo('activity')">
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">Exercise Duration</span>
            <span class="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center text-xs font-bold">⚡</span>
          </div>

          <div class="my-2">
            <div class="text-3xl font-extrabold text-rose-500 tracking-tight">${today.exerciseMinutes} min</div>
            <div class="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Workouts today: <strong>2 logged</strong>
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Weekly Goal: 150m</span>
            <span class="text-emerald-500 font-bold">90% Done</span>
          </div>
        </div>

        <!-- CARD 7: CALORIES (2,140 kcal consumed / burned) -->
        <div class="p-6 rounded-3xl glass-panel card-lift flex flex-col justify-between border border-slate-200/80 dark:border-white/10 cursor-pointer" onclick="window.navigateTo('nutrition')">
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">Energy & Calories</span>
            <span class="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-xs font-bold">🔥</span>
          </div>

          <div class="my-2">
            <div class="text-3xl font-extrabold text-amber-500 tracking-tight">2,140 kcal</div>
            <div class="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Consumed: <strong>1,850</strong> • Burned: <strong>520</strong>
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Net Calories</span>
            <span class="font-bold text-slate-900 dark:text-white">1,620 kcal</span>
          </div>
        </div>

        <!-- CARD 8: HEART RATE PLACEHOLDER (Real-time pulse) -->
        <div class="p-6 rounded-3xl glass-panel card-lift flex flex-col justify-between border border-slate-200/80 dark:border-white/10">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">Resting Heart Rate</span>
            <span class="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
          </div>

          <div class="my-2">
            <div class="text-3xl font-extrabold text-rose-500 tracking-tight flex items-baseline space-x-1">
              <span>${today.restingHeartRate}</span>
              <span class="text-sm font-normal text-slate-500 dark:text-slate-400">BPM</span>
            </div>
            
            <!-- Live ECG waveform animation -->
            <div class="h-6 mt-1 flex items-center overflow-hidden">
              <svg class="w-full h-6 stroke-rose-500 fill-none pulse-glow" viewBox="0 0 120 28">
                <path d="M0,14 L25,14 L32,4 L40,24 L48,6 L56,18 L64,14 L120,14" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Peak: <strong>124 BPM</strong></span>
            <span class="text-emerald-500 font-semibold">Optimal Range</span>
          </div>
        </div>

      </div>

      <!-- RECENT WORKOUTS & TODAY'S NUTRITION TWO-COLUMN SECTION -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <!-- Today's Logged Workouts -->
        <div class="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="font-bold text-lg text-slate-900 dark:text-white flex items-center space-x-2">
              <span>Recent Workouts</span>
            </h3>
            <button onclick="window.openWorkoutModal()" class="text-xs font-bold text-emerald-500 hover:underline">
              + Add Workout
            </button>
          </div>

          <div class="space-y-3">
            ${state.workouts.slice(0, 3).map(w => `
              <div class="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                    ${w.type === 'Running' ? '🏃' : w.type === 'Yoga' ? '🧘' : w.type === 'Gym' ? '🏋️' : '🚴'}
                  </div>
                  <div>
                    <h5 class="font-bold text-sm text-slate-900 dark:text-white">${w.type} Session</h5>
                    <span class="text-xs text-slate-500 dark:text-slate-400">${w.time} • ${w.notes || 'Routine'}</span>
                  </div>
                </div>

                <div class="text-right">
                  <span class="font-bold text-sm text-emerald-500 block">${w.duration} min</span>
                  <span class="text-xs text-slate-500 dark:text-slate-400">${w.calories} kcal</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Today's Nutrition Breakdown -->
        <div class="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="font-bold text-lg text-slate-900 dark:text-white flex items-center space-x-2">
              <span>Macronutrient Targets</span>
            </h3>
            <button onclick="window.navigateTo('nutrition')" class="text-xs font-bold text-emerald-500 hover:underline">
              View Meals →
            </button>
          </div>

          <div class="space-y-3 pt-1">
            <!-- Protein -->
            <div>
              <div class="flex items-center justify-between text-xs font-semibold mb-1">
                <span class="text-slate-700 dark:text-slate-300">Protein</span>
                <span class="text-emerald-500 font-bold">105g / 130g (81%)</span>
              </div>
              <div class="w-full bg-slate-100 dark:bg-white/10 rounded-full h-2 overflow-hidden">
                <div class="bg-emerald-500 h-2 rounded-full" style="width: 81%"></div>
              </div>
            </div>

            <!-- Carbohydrates -->
            <div>
              <div class="flex items-center justify-between text-xs font-semibold mb-1">
                <span class="text-slate-700 dark:text-slate-300">Carbohydrates</span>
                <span class="text-cyan-500 font-bold">210g / 280g (75%)</span>
              </div>
              <div class="w-full bg-slate-100 dark:bg-white/10 rounded-full h-2 overflow-hidden">
                <div class="bg-cyan-500 h-2 rounded-full" style="width: 75%"></div>
              </div>
            </div>

            <!-- Healthy Fats -->
            <div>
              <div class="flex items-center justify-between text-xs font-semibold mb-1">
                <span class="text-slate-700 dark:text-slate-300">Healthy Fats</span>
                <span class="text-amber-500 font-bold">55g / 70g (78%)</span>
              </div>
              <div class="w-full bg-slate-100 dark:bg-white/10 rounded-full h-2 overflow-hidden">
                <div class="bg-amber-500 h-2 rounded-full" style="width: 78%"></div>
              </div>
            </div>
          </div>

          <div class="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-slate-700 dark:text-slate-200 mt-4 flex items-center justify-between">
            <span>Total Intake Today: <strong>1,850 / 2,200 kcal</strong></span>
            <span class="text-emerald-500 font-bold">Optimal Deficit</span>
          </div>
        </div>

      </div>

    </div>
  `;
};

// Modal for explaining the VITALORA Health Score
window.showHealthScoreModal = function() {
  const store = window.vitaloraStore;
  const healthScore = store.calculateHealthScore();
  const b = healthScore.breakdown;

  const modalHtml = `
    <div id="healthScoreModalBackdrop" class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay overflow-y-auto">
      <div class="relative w-full max-w-lg rounded-3xl glass-panel p-6 sm:p-8 shadow-2xl border border-white/20 text-slate-900 dark:text-white" style="background-color: var(--bg-card);">
        
        <div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10 mb-4">
          <div>
            <h3 class="text-xl font-bold">VITALORA Health Score</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">Non-medical wellness index (0 - 100)</p>
          </div>
          <button onclick="document.getElementById('healthScoreModalBackdrop').remove()" class="text-slate-400 hover:text-white p-1">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div class="text-center py-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/30 mb-6">
          <span class="text-5xl font-black text-emerald-500">${healthScore.total}</span>
          <span class="text-base font-bold text-slate-500 dark:text-slate-400">/ 100</span>
          <div class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1 uppercase tracking-wider">
            Optimal Wellness Status
          </div>
        </div>

        <div class="space-y-3 mb-6">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">Point Breakdown</h4>
          
          <div class="flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-white/5 text-xs">
            <span>🚶 ${b.activity.label}</span>
            <span class="font-bold text-emerald-500">${b.activity.score} / ${b.activity.max} pts</span>
          </div>

          <div class="flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-white/5 text-xs">
            <span>💧 ${b.hydration.label}</span>
            <span class="font-bold text-cyan-500">${b.hydration.score} / ${b.hydration.max} pts</span>
          </div>

          <div class="flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-white/5 text-xs">
            <span>🌙 ${b.sleep.label}</span>
            <span class="font-bold text-purple-400">${b.sleep.score} / ${b.sleep.max} pts</span>
          </div>

          <div class="flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-white/5 text-xs">
            <span>⚡ ${b.exercise.label}</span>
            <span class="font-bold text-rose-500">${b.exercise.score} / ${b.exercise.max} pts</span>
          </div>

          <div class="flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-white/5 text-xs">
            <span>🥗 ${b.nutrition.label}</span>
            <span class="font-bold text-amber-500">${b.nutrition.score} / ${b.nutrition.max} pts</span>
          </div>
        </div>

        <!-- Non-Medical Disclaimer -->
        <div class="p-3.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
          <strong>Wellness Notice:</strong> The VITALORA Health Score is calculated exclusively from lifestyle tracking adherence and activity milestones. It is intended for fitness motivation and is not a clinical diagnosis or medical assessment.
        </div>

        <button 
          onclick="document.getElementById('healthScoreModalBackdrop').remove()" 
          class="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition-all"
        >
          Got It
        </button>

      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
};
