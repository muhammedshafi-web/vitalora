// VITALORA - AI Health & Wellness Coach Conversational Interface

window.aiPromptDraft = "";

window.renderAiCoachView = function() {
  const store = window.vitaloraStore;
  const state = store.getState();
  const chat = state.aiChatHistory || [];
  const today = state.todayStats;
  const user = state.user;

  const quickPrompts = [
    "I only walked 4,000 steps today.",
    "How can I optimize my hydration balance?",
    "Review my VITALORA Health Score for today.",
    "My sleep was under 7 hours, what should I adjust?",
    "Suggest a high protein post-workout snack."
  ];

  return `
    <div class="pt-24 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      
      <!-- Top Title & Coach Identity Header -->
      <div class="flex items-center space-x-4 pb-4 border-b border-slate-200 dark:border-white/10">
        <div class="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-cyan-500 to-emerald-400 p-0.5 shadow-xl">
          <div class="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center text-2xl text-white font-bold">
            ✨
          </div>
          <span class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center"></span>
        </div>

        <div>
          <div class="flex items-center space-x-2">
            <h1 class="text-2xl font-black text-slate-900 dark:text-white">VITALORA AI Coach</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-500/20 text-purple-400 border border-purple-500/30">
              SYNAPSE 2.0
            </span>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Context-aware conversational wellness engine synced to your biometrics</p>
        </div>
      </div>

      <!-- Prominent Medical Disclaimer as requested -->
      <div class="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-700 dark:text-purple-300 flex items-start space-x-3">
        <span class="text-base flex-shrink-0">ℹ️</span>
        <div>
          <strong>Non-Medical Notice:</strong> VITALORA AI Coach provides general lifestyle habit coaching, fitness motivation, and nutritional guidance. It does not provide medical diagnoses, clinical prescriptions, or replace consultation with licensed physicians.
        </div>
      </div>

      <!-- Live Biometric Context Telemetry Pill Bar -->
      <div class="p-3 rounded-2xl glass-panel border border-slate-200/80 dark:border-white/10 flex items-center justify-between text-xs overflow-x-auto scrollbar-none gap-4">
        <span class="text-slate-400 font-semibold whitespace-nowrap">Live Context Synced:</span>
        <div class="flex items-center space-x-3 whitespace-nowrap">
          <span class="text-emerald-500 font-bold">🚶 ${today.steps.toLocaleString()} steps</span>
          <span class="text-slate-300 dark:text-white/10">•</span>
          <span class="text-cyan-500 font-bold">💧 ${(today.waterMl / 1000).toFixed(1)}L water</span>
          <span class="text-slate-300 dark:text-white/10">•</span>
          <span class="text-purple-400 font-bold">🌙 ${today.sleepHours}h sleep</span>
          <span class="text-slate-300 dark:text-white/10">•</span>
          <span class="text-amber-500 font-bold">⚖️ ${today.currentWeight}kg</span>
        </div>
      </div>

      <!-- Conversational Chat Stream Box -->
      <div id="aiChatBox" class="rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 p-4 sm:p-6 h-[460px] overflow-y-auto space-y-4">
        ${chat.map(msg => `
          <div class="flex items-start space-x-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}">
            
            ${msg.sender === 'ai' ? `
              <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-emerald-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                ✨
              </div>
            ` : ''}

            <div class="max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-emerald-500 text-white rounded-br-none shadow-md font-medium'
                : 'bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-bl-none shadow-sm'
            }">
              <div class="text-[10px] opacity-70 mb-1 font-mono">${msg.time} • ${msg.sender === 'user' ? 'You' : 'AI Coach'}</div>
              <div>${msg.text}</div>
            </div>

            ${msg.sender === 'user' ? `
              <div class="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-xs font-bold flex-shrink-0">
                ${user.name.charAt(0)}
              </div>
            ` : ''}

          </div>
        `).join('')}
      </div>

      <!-- Quick Prompt Suggestion Pills -->
      <div class="space-y-2">
        <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Suggested Questions</span>
        <div class="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          ${quickPrompts.map(p => `
            <button 
              onclick="window.sendAiQuickPrompt('${p.replace(/'/g, "\\'")}')"
              class="flex-shrink-0 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-emerald-500/10 hover:text-emerald-500 border border-slate-200 dark:border-white/10 text-xs font-semibold transition-all text-slate-700 dark:text-slate-300"
            >
              ${p}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Input Bar -->
      <div class="relative flex items-center">
        <input 
          id="aiChatInput"
          type="text" 
          placeholder="Ask AI Coach about steps, workouts, sleep, or nutrition..." 
          onkeydown="if(event.key === 'Enter') window.submitAiMessage();"
          class="w-full pl-5 pr-14 py-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 shadow-inner"
        />
        <button 
          onclick="window.submitAiMessage()" 
          class="absolute right-2.5 w-10 h-10 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-md transition-all"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </button>
      </div>

    </div>
  `;
};

window.sendAiQuickPrompt = function(promptText) {
  window.vitaloraStore.sendAiMessage(promptText);
  window.renderApp();
  setTimeout(() => {
    const box = document.getElementById("aiChatBox");
    if (box) box.scrollTop = box.scrollHeight;
  }, 50);
};

window.submitAiMessage = function() {
  const input = document.getElementById("aiChatInput");
  if (!input || !input.value.trim()) return;
  const txt = input.value.trim();
  input.value = "";
  window.vitaloraStore.sendAiMessage(txt);
  window.renderApp();
  setTimeout(() => {
    const box = document.getElementById("aiChatBox");
    if (box) box.scrollTop = box.scrollHeight;
  }, 50);
};
