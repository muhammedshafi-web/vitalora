// VITALORA - Nutrition & Food Tracker with Macronutrient Analytics

window.renderNutritionView = function() {
  const store = window.vitaloraStore;
  const state = store.getState();
  const user = state.user;
  const meals = state.meals;

  // Calculate totals
  const totalCalories = meals.reduce((sum, m) => sum + (m.calories || 0), 0);
  const totalProtein = meals.reduce((sum, m) => sum + (m.protein || 0), 0);
  const totalCarbs = meals.reduce((sum, m) => sum + (m.carbs || 0), 0);
  const totalFat = meals.reduce((sum, m) => sum + (m.fat || 0), 0);

  const calGoal = user.caloriesGoal || 2200;
  const protGoal = user.proteinGoal || 130;
  const carbsGoal = user.carbsGoal || 280;
  const fatGoal = user.fatGoal || 70;

  const protPct = Math.min(100, Math.round((totalProtein / protGoal) * 100));
  const carbsPct = Math.min(100, Math.round((totalCarbs / carbsGoal) * 100));
  const fatPct = Math.min(100, Math.round((totalFat / fatGoal) * 100));
  const calPct = Math.min(100, Math.round((totalCalories / calGoal) * 100));

  const categories = ["Breakfast", "Lunch", "Dinner", "Snacks"];

  return `
    <div class="pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <!-- Top Title Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span class="text-xs uppercase font-bold tracking-widest text-emerald-500">Metabolic Fuel & Macronutrients</span>
          <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Nutrition & Meal Tracker</h1>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Balance caloric intake, lean amino acids, complex glycogens, and healthy lipids.</p>
        </div>

        <button 
          onclick="window.openMealModal()" 
          class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 flex items-center space-x-2 transition-all self-start md:self-auto"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          <span>Log Meal / Food Item</span>
        </button>
      </div>

      <!-- DAILY NUTRITION & MACROS CARDS (Prompt: Calories 1850/2200, Protein 105/130g, Carbs 210/280g, Fat 55/70g) -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <!-- Calories -->
        <div class="p-6 rounded-3xl glass-panel border border-amber-500/30 bg-amber-500/5 card-lift space-y-3">
          <div class="flex items-center justify-between text-xs text-amber-500 font-bold uppercase tracking-wider">
            <span>Energy Intake</span>
            <span>🔥</span>
          </div>
          <div class="text-3xl font-black text-amber-500 tracking-tight">${totalCalories.toLocaleString()} <span class="text-sm font-normal text-slate-400">/ ${calGoal.toLocaleString()} kcal</span></div>
          <div class="w-full bg-slate-200 dark:bg-white/10 rounded-full h-2 overflow-hidden">
            <div class="bg-amber-500 h-2 rounded-full" style="width: ${calPct}%"></div>
          </div>
          <div class="text-[11px] text-slate-400 font-medium">${calGoal - totalCalories} kcal remaining today</div>
        </div>

        <!-- Protein -->
        <div class="p-6 rounded-3xl glass-panel border border-emerald-500/30 bg-emerald-500/5 card-lift space-y-3">
          <div class="flex items-center justify-between text-xs text-emerald-500 font-bold uppercase tracking-wider">
            <span>Pure Protein</span>
            <span>🥩</span>
          </div>
          <div class="text-3xl font-black text-emerald-500 tracking-tight">${totalProtein}g <span class="text-sm font-normal text-slate-400">/ ${protGoal}g</span></div>
          <div class="w-full bg-slate-200 dark:bg-white/10 rounded-full h-2 overflow-hidden">
            <div class="bg-emerald-500 h-2 rounded-full" style="width: ${protPct}%"></div>
          </div>
          <div class="text-[11px] text-slate-400 font-medium">${protPct}% of daily amino target</div>
        </div>

        <!-- Carbohydrates -->
        <div class="p-6 rounded-3xl glass-panel border border-cyan-500/30 bg-cyan-500/5 card-lift space-y-3">
          <div class="flex items-center justify-between text-xs text-cyan-500 font-bold uppercase tracking-wider">
            <span>Carbohydrates</span>
            <span>🌾</span>
          </div>
          <div class="text-3xl font-black text-cyan-500 tracking-tight">${totalCarbs}g <span class="text-sm font-normal text-slate-400">/ ${carbsGoal}g</span></div>
          <div class="w-full bg-slate-200 dark:bg-white/10 rounded-full h-2 overflow-hidden">
            <div class="bg-cyan-500 h-2 rounded-full" style="width: ${carbsPct}%"></div>
          </div>
          <div class="text-[11px] text-slate-400 font-medium">${carbsPct}% of glycogen quota</div>
        </div>

        <!-- Healthy Fats -->
        <div class="p-6 rounded-3xl glass-panel border border-rose-500/30 bg-rose-500/5 card-lift space-y-3">
          <div class="flex items-center justify-between text-xs text-rose-500 font-bold uppercase tracking-wider">
            <span>Healthy Fats</span>
            <span>🥑</span>
          </div>
          <div class="text-3xl font-black text-rose-500 tracking-tight">${totalFat}g <span class="text-sm font-normal text-slate-400">/ ${fatGoal}g</span></div>
          <div class="w-full bg-slate-200 dark:bg-white/10 rounded-full h-2 overflow-hidden">
            <div class="bg-rose-500 h-2 rounded-full" style="width: ${fatPct}%"></div>
          </div>
          <div class="text-[11px] text-slate-400 font-medium">${fatPct}% of lipid balance</div>
        </div>

      </div>

      <!-- MEALS CATEGORIES BREAKDOWN (Breakfast, Lunch, Dinner, Snacks) -->
      <div class="space-y-6">
        <h3 class="text-xl font-bold text-slate-900 dark:text-white">Logged Meals for Today</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${categories.map(cat => {
            const catMeals = meals.filter(m => m.category === cat);
            const catCal = catMeals.reduce((s, m) => s + (m.calories || 0), 0);
            return `
              <div class="p-6 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
                  <div class="flex items-center space-x-2.5">
                    <span class="w-8 h-8 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center font-bold text-sm">
                      ${cat === 'Breakfast' ? '🍳' : cat === 'Lunch' ? '🥗' : cat === 'Dinner' ? '🍲' : '🍎'}
                    </span>
                    <div>
                      <h4 class="font-bold text-base text-slate-900 dark:text-white">${cat}</h4>
                      <span class="text-xs text-slate-400">${catMeals.length} item(s) logged</span>
                    </div>
                  </div>

                  <div class="text-right">
                    <span class="font-black text-sm text-slate-900 dark:text-white">${catCal} kcal</span>
                    <button 
                      onclick="window.openMealModal('${cat}')" 
                      class="text-xs text-emerald-500 font-bold hover:underline block"
                    >
                      + Add Item
                    </button>
                  </div>
                </div>

                <div class="space-y-3">
                  ${catMeals.length > 0 ? catMeals.map(m => `
                    <div class="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between text-xs">
                      <div class="space-y-0.5">
                        <div class="font-bold text-slate-900 dark:text-white">${m.food}</div>
                        <div class="text-[11px] text-slate-400">${m.quantity} • P: ${m.protein}g | C: ${m.carbs}g | F: ${m.fat}g</div>
                      </div>

                      <div class="flex items-center space-x-3">
                        <span class="font-extrabold text-slate-900 dark:text-white">${m.calories} kcal</span>
                        <button 
                          onclick="window.vitaloraStore.deleteMeal('${m.id}'); window.renderApp(); window.showToast('Meal item removed');" 
                          class="text-rose-500 hover:text-rose-400 p-1 rounded hover:bg-rose-500/10"
                          title="Remove item"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  `).join('') : `
                    <div class="text-center py-6 text-xs text-slate-400 italic">
                      No ${cat.toLowerCase()} logged yet.
                    </div>
                  `}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

    </div>
  `;
};
