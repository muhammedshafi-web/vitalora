// VITALORA - Global Floating AI Chatbot Widget (Omnipresent across all pages)

window.isChatbotOpen = false;
window.isSpeechSynthesisEnabled = false;
window.isAiTyping = false;

window.toggleFloatingChatbot = function() {
  window.isChatbotOpen = !window.isChatbotOpen;
  window.renderFloatingChatbot();
  if (window.isChatbotOpen) {
    setTimeout(() => {
      const input = document.getElementById("floatingChatInput");
      if (input) input.focus();
      const stream = document.getElementById("floatingChatStream");
      if (stream) stream.scrollTop = stream.scrollHeight;
    }, 100);
  }
};

window.renderFloatingChatbot = function() {
  let container = document.getElementById("floatingChatbotRoot");
  if (!container) {
    container = document.createElement("div");
    container.id = "floatingChatbotRoot";
    container.className = "fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end pointer-events-none";
    document.body.appendChild(container);
  }

  const store = window.vitaloraStore;
  const state = store.getState();
  const chat = state.aiChatHistory || [];
  const today = state.todayStats;
  const user = state.user;
  const score = store.calculateHealthScore().total;

  const quickPills = [
    "How are my steps doing today?",
    "Why is my Health Score " + score + "?",
    "Suggest a high-protein dinner",
    "How to optimize deep sleep tonight?",
    "Log 250ml water for me 💧"
  ];

  container.innerHTML = `
    <!-- EXPANDABLE CHATBOT WINDOW -->
    ${window.isChatbotOpen ? `
      <div 
        id="floatingChatWindow"
        class="pointer-events-auto mb-3 w-[92vw] sm:w-[410px] h-[540px] max-h-[82vh] rounded-3xl glass-panel border border-emerald-500/30 shadow-2xl flex flex-col overflow-hidden text-slate-900 dark:text-white bg-slate-900/95 backdrop-blur-2xl transition-all duration-300 animate-in fade-in zoom-in-95"
        style="box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 35px rgba(16, 185, 129, 0.2);"
      >
        <!-- Header -->
        <div class="p-4 border-b border-white/10 bg-gradient-to-r from-emerald-500/15 via-cyan-500/10 to-purple-500/15 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-cyan-400 to-purple-500 p-0.5 shadow-md">
              <div class="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center text-sm">
                ✨
              </div>
              <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900"></span>
            </div>

            <div>
              <div class="flex items-center space-x-1.5">
                <h4 class="font-bold text-sm text-white">VITALORA AI Coach</h4>
                <span class="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Live</span>
              </div>
              <span class="text-[10px] text-slate-400">Contextual Biometric Assistant</span>
            </div>
          </div>

          <!-- Controls: Text-to-speech & Close -->
          <div class="flex items-center space-x-1.5">
            <button 
              onclick="window.toggleSpeechSynthesis()" 
              class="p-1.5 rounded-lg text-xs transition-colors ${window.isSpeechSynthesisEnabled ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'}"
              title="${window.isSpeechSynthesisEnabled ? 'Voice Voice: ON' : 'Voice Voice: OFF'}"
            >
              ${window.isSpeechSynthesisEnabled ? '🔊' : '🔇'}
            </button>

            <button 
              onclick="window.toggleFloatingChatbot()" 
              class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Close chat"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- Live Biometric Telemetry Ribbon -->
        <div class="px-3 py-1.5 bg-black/30 border-b border-white/5 flex items-center justify-between text-[10px] text-slate-400 overflow-x-auto scrollbar-none whitespace-nowrap gap-3">
          <span class="text-emerald-400 font-bold">🚶 ${today.steps.toLocaleString()}</span>
          <span>•</span>
          <span class="text-cyan-400 font-bold">💧 ${(today.waterMl / 1000).toFixed(1)}L</span>
          <span>•</span>
          <span class="text-purple-400 font-bold">🌙 ${today.sleepHours}h</span>
          <span>•</span>
          <span class="text-amber-400 font-bold">Score: ${score}/100</span>
        </div>

        <!-- Chat Stream -->
        <div id="floatingChatStream" class="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
          ${chat.map(msg => `
            <div class="flex items-start space-x-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}">
              ${msg.sender === 'ai' ? `
                <div class="w-6 h-6 rounded-lg bg-gradient-to-tr from-purple-500 to-emerald-400 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                  ✨
                </div>
              ` : ''}

              <div class="max-w-[82%] p-3 rounded-2xl leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-emerald-500 text-white rounded-br-none shadow font-medium'
                  : 'bg-white/10 text-slate-200 rounded-bl-none border border-white/5'
              }">
                <div class="text-[9px] opacity-60 mb-0.5">${msg.time} • ${msg.sender === 'user' ? 'You' : 'AI Coach'}</div>
                <div>${msg.text}</div>
              </div>

              ${msg.sender === 'user' ? `
                <div class="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                  ${user.name.charAt(0)}
                </div>
              ` : ''}
            </div>
          `).join('')}

          ${window.isAiTyping ? `
            <div class="flex items-center space-x-2 text-slate-400 text-xs py-1">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>AI Coach is synthesizing wellness data...</span>
            </div>
          ` : ''}
        </div>

        <!-- Quick Prompt Chips -->
        <div class="px-3 py-2 border-t border-white/10 bg-black/20 flex items-center space-x-1.5 overflow-x-auto scrollbar-none">
          ${quickPills.map(p => `
            <button 
              onclick="window.sendFloatingQuickPrompt('${p.replace(/'/g, "\\'")}')"
              class="flex-shrink-0 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-300 text-[11px] text-slate-300 border border-white/10 transition-colors whitespace-nowrap"
            >
              ${p}
            </button>
          `).join('')}
        </div>

        <!-- Message Input -->
        <div class="p-3 border-t border-white/10 bg-slate-950/80 flex items-center space-x-2">
          <input 
            id="floatingChatInput" 
            type="text" 
            placeholder="Type your health or fitness question..."
            onkeydown="if(event.key === 'Enter') window.submitFloatingChat();"
            class="flex-1 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
          <button 
            onclick="window.submitFloatingChat()" 
            class="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center"
          >
            Send
          </button>
        </div>

        <!-- Non-medical Disclaimer footer -->
        <div class="px-3 py-1 bg-black/40 text-[9px] text-slate-500 text-center">
          General wellness advice only • Not a medical diagnosis
        </div>

      </div>
    ` : ''}

    <!-- FLOATING CHATBOT ORB BUTTON (Always Visible) -->
    <div class="pointer-events-auto relative group flex items-center space-x-3">
      
      <!-- Hover / Greeting Badge -->
      ${!window.isChatbotOpen ? `
        <div 
          onclick="window.toggleFloatingChatbot()"
          class="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full glass-panel border border-emerald-500/30 bg-slate-900/90 text-white text-xs font-semibold shadow-xl cursor-pointer hover:border-emerald-400 transition-all card-lift"
        >
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Ask AI Coach</span>
          <span class="text-emerald-400 font-bold">✨</span>
        </div>
      ` : ''}

      <!-- Main Glowing 3D Button -->
      <button 
        onclick="window.toggleFloatingChatbot()"
        class="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 via-cyan-400 to-purple-600 p-0.5 shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
        style="box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4), 0 0 20px rgba(6, 182, 212, 0.3);"
        title="Open VITALORA AI Coach"
      >
        <!-- Animated Pulse Halo -->
        <div class="absolute inset-0 rounded-2xl bg-emerald-400 blur-lg opacity-40 group-hover:opacity-80 transition-opacity animate-pulse"></div>

        <div class="relative w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center text-white text-2xl font-bold">
          ${window.isChatbotOpen ? '✕' : '✨'}
        </div>
      </button>

    </div>
  `;
};

// Quick Prompt Sender
window.sendFloatingQuickPrompt = function(promptText) {
  if (promptText.includes("Log 250ml water")) {
    window.vitaloraStore.addWater(250);
    window.vitaloraStore.sendAiMessage("I have automatically logged +250ml of water to your daily hydration record! 💧 Total intake is now " + (window.vitaloraStore.getState().todayStats.waterMl / 1000).toFixed(1) + "L.");
  } else {
    window.vitaloraStore.sendAiMessage(promptText);
  }

  // Voice speech if enabled
  if (window.isSpeechSynthesisEnabled && 'speechSynthesis' in window) {
    const history = window.vitaloraStore.getState().aiChatHistory;
    const lastMsg = history[history.length - 1];
    if (lastMsg && lastMsg.sender === 'ai') {
      window.speakAiText(lastMsg.text);
    }
  }

  window.renderApp();
  window.renderFloatingChatbot();
  setTimeout(() => {
    const stream = document.getElementById("floatingChatStream");
    if (stream) stream.scrollTop = stream.scrollHeight;
  }, 50);
};

// Message Submission
window.submitFloatingChat = function() {
  const input = document.getElementById("floatingChatInput");
  if (!input || !input.value.trim()) return;
  const userText = input.value.trim();
  input.value = "";

  window.isAiTyping = true;
  window.renderFloatingChatbot();

  setTimeout(() => {
    window.isAiTyping = false;
    const aiReply = window.vitaloraStore.sendAiMessage(userText);

    if (window.isSpeechSynthesisEnabled && 'speechSynthesis' in window) {
      window.speakAiText(aiReply);
    }

    window.renderApp();
    window.renderFloatingChatbot();
    setTimeout(() => {
      const stream = document.getElementById("floatingChatStream");
      if (stream) stream.scrollTop = stream.scrollHeight;
    }, 50);
  }, 350);
};

// Text-to-Speech Toggle
window.toggleSpeechSynthesis = function() {
  window.isSpeechSynthesisEnabled = !window.isSpeechSynthesisEnabled;
  window.showToast(window.isSpeechSynthesisEnabled ? "AI Voice Synthesis Enabled 🔊" : "AI Voice Synthesis Muted 🔇");
  window.renderFloatingChatbot();
};

window.speakAiText = function(text) {
  try {
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[^\w\s.,!?-]/g, '');
    const utter = new SpeechSynthesisUtterance(cleanText);
    utter.rate = 1.05;
    utter.pitch = 1.0;
    window.speechSynthesis.speak(utter);
  } catch (e) {
    console.warn("Speech synthesis error", e);
  }
};
