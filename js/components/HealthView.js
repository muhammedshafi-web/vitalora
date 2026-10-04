// VITALORA - Health Analytics, Weight Tracker & Interactive BMI Calculator

window.weightDateFilter = "30d"; // 7d, 30d, 3m, 1y

window.renderHealthView = function() {
  const store = window.vitaloraStore;
  const state = store.getState();
  const user = state.user;
  const weightHistory = state.weightHistory;
  const currentWeight = state.todayStats.currentWeight || user.weight;
  const bmiInfo = store.calculateBmi(user.height, currentWeight);

  // SVG Line Chart Generation for Weight
  const points = weightHistory.map((item, idx) => {
    return { x: idx, y: item.weight, date: item.date, note: item.note };
  });

  const minWeight = Math.min(...points.map(p => p.y)) - 1;
  const maxWeight = Math.max(...points.map(p => p.y)) + 1;
  const range = maxWeight - minWeight || 1;

  const chartWidth = 650;
  const chartHeight = 220;
  const padding = 35;

  const svgPoints = points.map((p, idx) => {
    const x = padding + (idx / Math.max(1, points.length - 1)) * (chartWidth - padding * 2);
    const y = chartHeight - padding - ((p.y - minWeight) / range) * (chartHeight - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  return `
    <div class="pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <!-- Top Title Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span class="text-xs uppercase font-bold tracking-widest text-emerald-500">Body Biometrics</span>
          <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Health & Body Composition</h1>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Track longitudinal weight fluctuations, BMI thresholds, and metabolic indicators.</p>
        </div>

        <button 
          onclick="window.openWeightModal()" 
          class="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center space-x-2 transition-all self-start md:self-auto"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          <span>Record Weight Entry</span>
        </button>
      </div>

      <!-- WEIGHT TRACKER SECTION -->
      <div class="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 space-y-6">
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-white/5">
          <div class="flex items-baseline space-x-3">
            <span class="text-3xl font-black text-slate-900 dark:text-white">${currentWeight} kg</span>
            <span class="text-xs text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              -1.8 kg this month
            </span>
            <span class="text-xs text-slate-400">Target: ${user.targetWeight} kg</span>
          </div>

          <!-- Date Range Filter Buttons -->
          <div class="flex items-center space-x-1 p-1 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs">
            ${['7d', '30d', '3m', '1y'].map(filter => `
              <button 
                onclick="window.weightDateFilter = '${filter}'; window.renderApp();"
                class="px-3 py-1 rounded-lg font-bold transition-all ${
                  window.weightDateFilter === filter 
                    ? 'bg-emerald-500 text-white shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }"
              >
                ${filter.toUpperCase()}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Interactive Line Graph Container -->
        <div class="relative w-full overflow-x-auto pt-2">
          <svg viewBox="0 0 ${chartWidth} ${chartHeight}" class="w-full h-56 sm:h-64 overflow-visible">
            <!-- Grid Lines -->
            <line x1="${padding}" y1="${padding}" x2="${chartWidth - padding}" y2="${padding}" stroke="currentColor" stroke-opacity="0.08" stroke-dasharray="4"/>
            <line x1="${padding}" y1="${chartHeight / 2}" x2="${chartWidth - padding}" y2="${chartHeight / 2}" stroke="currentColor" stroke-opacity="0.08" stroke-dasharray="4"/>
            <line x1="${padding}" y1="${chartHeight - padding}" x2="${chartWidth - padding}" y2="${chartHeight - padding}" stroke="currentColor" stroke-opacity="0.15"/>

            <!-- Area Gradient Fill -->
            <defs>
              <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#10b981" stop-opacity="0.3"/>
                <stop offset="100%" stop-color="#10b981" stop-opacity="0.0"/>
              </linearGradient>
            </defs>
            <polygon points="${padding},${chartHeight - padding} ${svgPoints} ${chartWidth - padding},${chartHeight - padding}" fill="url(#weightGradient)" />

            <!-- Weight Path Curve -->
            <polyline fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" points="${svgPoints}" />

            <!-- Data Point Circles with hover tooltips -->
            ${points.map((p, idx) => {
              const x = padding + (idx / Math.max(1, points.length - 1)) * (chartWidth - padding * 2);
              const y = chartHeight - padding - ((p.y - minWeight) / range) * (chartHeight - padding * 2);
              return `
                <g class="cursor-pointer group">
                  <circle cx="${x}" cy="${y}" r="5" fill="#10b981" stroke="#ffffff" stroke-width="2" class="group-hover:r-7 transition-all"/>
                  <text x="${x}" y="${y - 10}" text-anchor="middle" font-size="10" font-weight="bold" fill="currentColor" class="opacity-80">${p.y}kg</text>
                  <text x="${x}" y="${chartHeight - 12}" text-anchor="middle" font-size="9" fill="#94a3b8">${p.date.split('-').slice(1).join('/')}</text>
                </g>
              `;
            }).join('')}
          </svg>
        </div>

        <!-- Weight History Log Table with Add / Edit / Delete as requested -->
        <div class="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 space-y-3">
          <div class="flex items-center justify-between">
            <h4 class="text-sm font-bold text-slate-900 dark:text-white">Logged Weight Entries</h4>
            <span class="text-xs text-slate-400">${weightHistory.length} recorded entries</span>
          </div>

          <div class="divide-y divide-slate-100 dark:divide-white/5 max-h-48 overflow-y-auto">
            ${weightHistory.slice().reverse().map((w, revIdx) => {
              const origIdx = weightHistory.length - 1 - revIdx;
              return `
                <div class="py-2.5 flex items-center justify-between text-xs">
                  <div class="flex items-center space-x-3">
                    <span class="font-semibold text-slate-700 dark:text-slate-300">${w.date}</span>
                    <span class="text-slate-400">•</span>
                    <span class="font-bold text-slate-900 dark:text-white">${w.weight} kg</span>
                    <span class="text-slate-500 italic hidden sm:inline-block">(${w.note})</span>
                  </div>
                  
                  <div class="flex items-center space-x-2">
                    <button 
                      onclick="window.editWeightPrompt(${origIdx})" 
                      class="text-cyan-500 hover:text-cyan-400 font-semibold px-2 py-0.5 rounded hover:bg-cyan-500/10"
                    >
                      Edit
                    </button>
                    <button 
                      onclick="window.vitaloraStore.deleteWeight(${origIdx}); window.renderApp();" 
                      class="text-rose-500 hover:text-rose-400 font-semibold px-2 py-0.5 rounded hover:bg-rose-500/10"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

      </div>

      <!-- BMI CALCULATOR & CLASSIFICATION MODULE -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Interactive Inputs -->
        <div class="lg:col-span-5 p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 space-y-5">
          <div class="space-y-1">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">BMI Calculator</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">Dynamically adjust height and weight to recalculate body mass index</p>
          </div>

          <div class="space-y-4">
            <div>
              <div class="flex items-center justify-between text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                <span>Height</span>
                <span class="text-emerald-500 font-bold">${user.height} cm</span>
              </div>
              <input 
                type="range" 
                min="120" max="220" 
                value="${user.height}"
                oninput="window.vitaloraStore.updateUser({ height: parseFloat(this.value) }); window.renderApp();"
                class="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <div class="flex items-center justify-between text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                <span>Weight</span>
                <span class="text-emerald-500 font-bold">${currentWeight} kg</span>
              </div>
              <input 
                type="range" 
                min="40" max="150" step="0.2"
                value="${currentWeight}"
                oninput="window.vitaloraStore.updateUser({ weight: parseFloat(this.value) }); window.renderApp();"
                class="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          <!-- Calculated Display -->
          <div class="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-1">
            <span class="text-xs uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-400">Current BMI</span>
            <div class="text-4xl font-black text-emerald-500">${bmiInfo.value}</div>
            <div class="text-sm font-bold text-slate-800 dark:text-slate-200">${bmiInfo.category}</div>
          </div>
        </div>

        <!-- BMI Category Visualization & Standard WHO Ranges -->
        <div class="lg:col-span-7 p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 space-y-6">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white">Classification Scale</h3>

          <!-- Visual Bar -->
          <div class="space-y-2">
            <div class="grid grid-cols-4 gap-1 h-3 rounded-full overflow-hidden">
              <div class="bg-blue-400" title="Underweight (< 18.5)"></div>
              <div class="bg-emerald-500" title="Normal (18.5 - 24.9)"></div>
              <div class="bg-amber-400" title="Overweight (25 - 29.9)"></div>
              <div class="bg-rose-500" title="Obese (≥ 30)"></div>
            </div>
            
            <div class="grid grid-cols-4 text-[10px] text-slate-400 font-semibold text-center">
              <span>&lt; 18.5 Under</span>
              <span class="text-emerald-500 font-bold">18.5 - 24.9 Normal</span>
              <span>25 - 29.9 Over</span>
              <span>≥ 30 Obese</span>
            </div>
          </div>

          <!-- Description Cards -->
          <div class="grid grid-cols-2 gap-3 text-xs">
            <div class="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <span class="font-bold text-emerald-500 block">Healthy Range</span>
              <span class="text-slate-500 dark:text-slate-400 text-[11px]">Associated with lower metabolic risk and optimal cardiovascular endurance.</span>
            </div>
            <div class="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <span class="font-bold text-cyan-500 block">Lean Mass Factor</span>
              <span class="text-slate-500 dark:text-slate-400 text-[11px]">Athletes with high muscle volume may reflect elevated BMI despite low adiposity.</span>
            </div>
          </div>

          <!-- Clear Medical Disclaimer as mandated -->
          <div class="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-700 dark:text-amber-300 leading-relaxed flex items-start space-x-3">
            <svg class="w-5 h-5 flex-shrink-0 text-amber-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.332.192 3 1.732 3z"/></svg>
            <div>
              <strong>Mandatory Disclaimer:</strong> This information is for general wellness tracking and is not a medical diagnosis. Consult a licensed physician or healthcare specialist for clinical diagnostic evaluation.
            </div>
          </div>

        </div>

      </div>

    </div>
  `;
};

window.editWeightPrompt = function(index) {
  const current = window.vitaloraStore.getState().weightHistory[index];
  const newWeight = prompt("Enter updated weight in kg:", current ? current.weight : 68.4);
  if (newWeight && !isNaN(newWeight)) {
    const note = prompt("Edit note (optional):", current ? current.note : "");
    window.vitaloraStore.getState().weightHistory[index].weight = parseFloat(newWeight);
    if (note !== null) window.vitaloraStore.getState().weightHistory[index].note = note;
    window.vitaloraStore.saveState();
    window.renderApp();
    window.showToast("Weight entry updated successfully!");
  }
};
