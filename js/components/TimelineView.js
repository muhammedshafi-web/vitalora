// VITALORA - Health Timeline (Unique Feature 26)

window.renderTimelineView = function() {
  const store = window.vitaloraStore;
  const state = store.getState();
  const timelineDays = state.timelineDays || [];

  return `
    <div class="pt-24 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <!-- Top Title Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span class="text-xs uppercase font-bold tracking-widest text-emerald-500">Historical Chronology</span>
          <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Visual Health Timeline</h1>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Scroll through your day-by-day biometric log and milestone milestones.</p>
        </div>

        <button 
          onclick="window.showToast('Timeline history refreshed')"
          class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-white/10 text-xs font-bold self-start md:self-auto"
        >
          Refresh Timeline
        </button>
      </div>

      <!-- TIMELINE LIST (Monday through Sunday) -->
      <div class="relative border-l-2 border-emerald-500/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8">
        ${timelineDays.map((t, idx) => `
          <div class="relative group">
            
            <!-- Timeline Pin Node -->
            <div class="absolute -left-[35px] sm:-left-[51px] top-6 w-6 h-6 rounded-full bg-slate-900 border-4 border-emerald-500 flex items-center justify-center text-[10px] text-white font-bold group-hover:scale-125 transition-transform">
            </div>

            <!-- Timeline Day Card -->
            <div class="p-6 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 card-lift space-y-4">
              
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-white/5">
                <div>
                  <h3 class="text-lg font-black text-slate-900 dark:text-white">${t.day}</h3>
                  <span class="text-xs text-slate-400 font-mono">${t.date}</span>
                </div>

                <div class="flex items-center space-x-2">
                  <span class="text-xs text-slate-400">Health Score:</span>
                  <span class="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-500/15 text-emerald-500 border border-emerald-500/20">
                    ${t.score}/100
                  </span>
                </div>
              </div>

              <!-- Day Biometric Stats Grid -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                
                <div class="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <span class="text-slate-400 block mb-0.5">Steps</span>
                  <span class="text-base font-black text-slate-900 dark:text-white">🚶 ${t.steps.toLocaleString()}</span>
                </div>

                <div class="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <span class="text-slate-400 block mb-0.5">Water</span>
                  <span class="text-base font-black text-cyan-500">💧 ${t.water}L</span>
                </div>

                <div class="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <span class="text-slate-400 block mb-0.5">Sleep</span>
                  <span class="text-base font-black text-purple-400">🌙 ${t.sleep}</span>
                </div>

                <div class="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <span class="text-slate-400 block mb-0.5">Workout</span>
                  <span class="text-base font-black text-rose-500">⚡ ${t.workout}</span>
                </div>

              </div>

              <!-- Highlights Note -->
              <div class="text-xs text-slate-500 dark:text-slate-400 italic">
                "${t.highlights}"
              </div>

            </div>

          </div>
        `).join('')}
      </div>

    </div>
  `;
};
