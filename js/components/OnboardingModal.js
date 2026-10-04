// VITALORA - Multi-step Interactive User Onboarding Flow

window.onboardingStep = 1;
window.onboardingData = {
  name: "Aarav Sharma",
  age: 26,
  gender: "Male",
  height: 178,
  weight: 68.4,
  activityLevel: "Moderate",
  fitnessGoal: "Improve fitness",
  stepGoal: 10000,
  waterGoal: 2500,
  sleepGoal: 8.0
};

window.renderOnboardingModal = function() {
  const store = window.vitaloraStore;
  const bmiResult = store.calculateBmi(window.onboardingData.height, window.onboardingData.weight);

  return `
    <div id="onboardingModalBackdrop" class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay overflow-y-auto">
      <div class="relative w-full max-w-xl rounded-3xl glass-panel p-6 sm:p-8 shadow-2xl border border-white/20 my-8 text-slate-900 dark:text-white" style="background-color: var(--bg-card);">
        
        <!-- Top Wizard Header & Close / Step indicator -->
        <div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10 mb-6">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-sm">
              ${window.onboardingStep}/4
            </div>
            <div>
              <h3 class="font-bold text-lg leading-tight">Welcome to VITALORA</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">Personalizing your biometric profile</p>
            </div>
          </div>

          <button onclick="window.closeOnboardingModal()" class="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <!-- Step Indicator Progress Bar -->
        <div class="grid grid-cols-4 gap-2 mb-6">
          <div class="h-1.5 rounded-full ${window.onboardingStep >= 1 ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-white/10'}"></div>
          <div class="h-1.5 rounded-full ${window.onboardingStep >= 2 ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-white/10'}"></div>
          <div class="h-1.5 rounded-full ${window.onboardingStep >= 3 ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-white/10'}"></div>
          <div class="h-1.5 rounded-full ${window.onboardingStep >= 4 ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-white/10'}"></div>
        </div>

        <!-- STEP 1: PERSONAL IDENTITY -->
        ${window.onboardingStep === 1 ? `
          <div class="space-y-5">
            <div class="space-y-1">
              <h4 class="text-xl font-bold">Tell us about yourself</h4>
              <p class="text-xs text-slate-500 dark:text-slate-400">Basic details to calibrate your metabolic baseline</p>
            </div>

            <div class="space-y-4">
              <div>
                <label class="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">Full Name</label>
                <input 
                  type="text" 
                  value="${window.onboardingData.name}" 
                  onchange="window.onboardingData.name = this.value"
                  placeholder="e.g. Aarav Sharma" 
                  class="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 focus:border-emerald-500 focus:outline-none text-sm font-medium"
                />
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">Age</label>
                  <input 
                    type="number" 
                    value="${window.onboardingData.age}" 
                    onchange="window.onboardingData.age = parseInt(this.value, 10)"
                    min="12" max="100"
                    class="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 focus:border-emerald-500 focus:outline-none text-sm font-medium"
                  />
                </div>
                <div>
                  <label class="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">Gender</label>
                  <select 
                    onchange="window.onboardingData.gender = this.value"
                    class="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-white/10 focus:border-emerald-500 focus:outline-none text-sm font-medium"
                  >
                    <option value="Male" ${window.onboardingData.gender === 'Male' ? 'selected' : ''}>Male</option>
                    <option value="Female" ${window.onboardingData.gender === 'Female' ? 'selected' : ''}>Female</option>
                    <option value="Non-binary" ${window.onboardingData.gender === 'Non-binary' ? 'selected' : ''}>Non-binary</option>
                    <option value="Prefer not to say" ${window.onboardingData.gender === 'Prefer not to say' ? 'selected' : ''}>Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- STEP 2: BODY METRICS & AUTO BMI -->
        ${window.onboardingStep === 2 ? `
          <div class="space-y-5">
            <div class="space-y-1">
              <h4 class="text-xl font-bold">Body Metrics & Height</h4>
              <p class="text-xs text-slate-500 dark:text-slate-400">Used for accurate BMI and calorie expenditure estimations</p>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">Height (cm)</label>
                <input 
                  type="number" 
                  value="${window.onboardingData.height}" 
                  oninput="window.onboardingData.height = parseFloat(this.value); window.refreshOnboardingModal();"
                  min="100" max="250"
                  class="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 focus:border-emerald-500 focus:outline-none text-sm font-medium"
                />
              </div>
              <div>
                <label class="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">Weight (kg)</label>
                <input 
                  type="number" 
                  step="0.1"
                  value="${window.onboardingData.weight}" 
                  oninput="window.onboardingData.weight = parseFloat(this.value); window.refreshOnboardingModal();"
                  min="30" max="250"
                  class="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 focus:border-emerald-500 focus:outline-none text-sm font-medium"
                />
              </div>
            </div>

            <!-- Auto-Calculated BMI Preview Box -->
            <div class="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
              <div>
                <span class="text-xs text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider block">Calculated BMI</span>
                <span class="text-3xl font-extrabold text-emerald-500">${bmiResult.value || '--'}</span>
                <span class="text-xs text-slate-600 dark:text-slate-300 ml-2 font-medium">(${bmiResult.category})</span>
              </div>
              <div class="text-right">
                <span class="text-[11px] text-slate-500 dark:text-slate-400 block">Healthy Range: 18.5 - 24.9</span>
                <span class="text-[10px] text-emerald-500 font-bold">Standard WHO Reference</span>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- STEP 3: FITNESS GOALS & ACTIVITY -->
        ${window.onboardingStep === 3 ? `
          <div class="space-y-5">
            <div class="space-y-1">
              <h4 class="text-xl font-bold">What is your primary fitness goal?</h4>
              <p class="text-xs text-slate-500 dark:text-slate-400">Select what matters most to your routine</p>
            </div>

            <div class="grid grid-cols-2 gap-2.5">
              ${[
                { id: "Lose weight", label: "Lose weight", icon: "🔥" },
                { id: "Gain muscle", label: "Gain muscle", icon: "💪" },
                { id: "Maintain weight", label: "Maintain weight", icon: "⚖️" },
                { id: "Improve fitness", label: "Improve fitness", icon: "⚡" },
                { id: "Improve sleep", label: "Improve sleep", icon: "🌙" },
                { id: "Build healthy habits", label: "Build healthy habits", icon: "🌱" }
              ].map(g => `
                <button 
                  type="button"
                  onclick="window.onboardingData.fitnessGoal = '${g.id}'; window.refreshOnboardingModal();"
                  class="p-3 rounded-2xl border text-left transition-all flex items-center space-x-2.5 ${
                    window.onboardingData.fitnessGoal === g.id
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400 shadow-md font-bold'
                      : 'border-slate-200 dark:border-white/10 hover:border-emerald-500/40 text-slate-700 dark:text-slate-300'
                  }"
                >
                  <span class="text-xl">${g.icon}</span>
                  <span class="text-xs font-semibold">${g.label}</span>
                </button>
              `).join('')}
            </div>

            <div>
              <label class="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">Activity Level</label>
              <select 
                onchange="window.onboardingData.activityLevel = this.value"
                class="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-white/10 focus:border-emerald-500 focus:outline-none text-sm font-medium"
              >
                <option value="Sedentary" ${window.onboardingData.activityLevel === 'Sedentary' ? 'selected' : ''}>Sedentary (Little to no exercise)</option>
                <option value="Light" ${window.onboardingData.activityLevel === 'Light' ? 'selected' : ''}>Light (Exercise 1-3 times/week)</option>
                <option value="Moderate" ${window.onboardingData.activityLevel === 'Moderate' ? 'selected' : ''}>Moderate (Exercise 3-5 times/week)</option>
                <option value="Very Active" ${window.onboardingData.activityLevel === 'Very Active' ? 'selected' : ''}>Very Active (Hard training 6-7 days/week)</option>
                <option value="Athlete" ${window.onboardingData.activityLevel === 'Athlete' ? 'selected' : ''}>Athlete (Twice daily training)</option>
              </select>
            </div>
          </div>
        ` : ''}

        <!-- STEP 4: DAILY TARGETS -->
        ${window.onboardingStep === 4 ? `
          <div class="space-y-5">
            <div class="space-y-1">
              <h4 class="text-xl font-bold">Customize Your Daily Targets</h4>
              <p class="text-xs text-slate-500 dark:text-slate-400">Set realistic milestones to build lifelong consistency</p>
            </div>

            <div class="space-y-4">
              <!-- Steps Goal -->
              <div>
                <div class="flex items-center justify-between text-xs font-semibold mb-1">
                  <span>Daily Step Goal</span>
                  <span class="text-emerald-500 font-bold">${window.onboardingData.stepGoal.toLocaleString()} steps</span>
                </div>
                <input 
                  type="range" 
                  min="4000" max="25000" step="500"
                  value="${window.onboardingData.stepGoal}"
                  oninput="window.onboardingData.stepGoal = parseInt(this.value, 10); window.refreshOnboardingModal();"
                  class="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <!-- Water Goal -->
              <div>
                <div class="flex items-center justify-between text-xs font-semibold mb-1">
                  <span>Daily Water Goal</span>
                  <span class="text-cyan-500 font-bold">${(window.onboardingData.waterGoal / 1000).toFixed(1)} Liters (${window.onboardingData.waterGoal} ml)</span>
                </div>
                <input 
                  type="range" 
                  min="1500" max="5000" step="250"
                  value="${window.onboardingData.waterGoal}"
                  oninput="window.onboardingData.waterGoal = parseInt(this.value, 10); window.refreshOnboardingModal();"
                  class="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <!-- Sleep Goal -->
              <div>
                <div class="flex items-center justify-between text-xs font-semibold mb-1">
                  <span>Daily Sleep Target</span>
                  <span class="text-purple-400 font-bold">${window.onboardingData.sleepGoal} Hours</span>
                </div>
                <input 
                  type="range" 
                  min="6" max="10" step="0.5"
                  value="${window.onboardingData.sleepGoal}"
                  oninput="window.onboardingData.sleepGoal = parseFloat(this.value); window.refreshOnboardingModal();"
                  class="w-full accent-purple-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Modal Bottom Navigation Buttons -->
        <div class="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-white/10 mt-6">
          ${window.onboardingStep > 1 ? `
            <button 
              type="button" 
              onclick="window.onboardingStep--; window.refreshOnboardingModal();"
              class="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
            >
              ← Back
            </button>
          ` : `<div></div>`}

          ${window.onboardingStep < 4 ? `
            <button 
              type="button" 
              onclick="window.onboardingStep++; window.refreshOnboardingModal();"
              class="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center space-x-2"
            >
              <span>Continue</span>
              <span>→</span>
            </button>
          ` : `
            <button 
              type="button" 
              onclick="window.finishOnboarding()"
              class="px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-sm shadow-xl shadow-emerald-500/30 transition-all flex items-center space-x-2"
            >
              <span>Launch My Dashboard 🎉</span>
            </button>
          `}
        </div>

      </div>
    </div>
  `;
};

window.refreshOnboardingModal = function() {
  const container = document.getElementById("onboardingContainer");
  if (container) {
    container.innerHTML = window.renderOnboardingModal();
  }
};

window.closeOnboardingModal = function() {
  const container = document.getElementById("onboardingContainer");
  if (container) container.innerHTML = "";
};

window.finishOnboarding = function() {
  window.vitaloraStore.completeOnboarding(window.onboardingData);
  window.closeOnboardingModal();
  window.showToast("Profile personalized! Welcome to VITALORA.");
  window.navigateTo("dashboard");
};
