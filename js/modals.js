// VITALORA - Global Action Modals (Workout, Meal, Weight, Sleep) & Toast System

// Toast System
window.showToast = function(message, duration = 3000) {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "fixed bottom-20 md:bottom-6 right-6 z-50 flex flex-col space-y-2 pointer-events-none";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "px-4 py-3 rounded-2xl glass-panel border border-emerald-500/40 bg-slate-900/90 text-white text-xs font-semibold shadow-2xl flex items-center space-x-2.5 toast-enter pointer-events-auto";
  toast.innerHTML = `
    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, duration);
};

// --- WORKOUT LOGGER MODAL ---
window.openWorkoutModal = function() {
  const modalHtml = `
    <div id="actionModalBackdrop" class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay overflow-y-auto">
      <div class="relative w-full max-w-lg rounded-3xl glass-panel p-6 sm:p-8 shadow-2xl border border-white/20 text-slate-900 dark:text-white" style="background-color: var(--bg-card);">
        
        <div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10 mb-5">
          <div>
            <h3 class="text-xl font-bold">Log Workout Activity</h3>
            <p class="text-xs text-slate-400">Record a new training or mobility session</p>
          </div>
          <button onclick="document.getElementById('actionModalBackdrop').remove()" class="text-slate-400 hover:text-white p-1">
            ✕
          </button>
        </div>

        <form id="workoutForm" onsubmit="window.submitWorkoutForm(event)" class="space-y-4 text-xs font-semibold">
          <div>
            <label class="block mb-1 text-slate-400">Workout Category</label>
            <select id="wType" class="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-white/10 text-sm focus:outline-none">
              <option value="Running">Running 🏃</option>
              <option value="Walking">Walking 🚶</option>
              <option value="Cycling">Cycling 🚴</option>
              <option value="Gym">Gym Strength 🏋️</option>
              <option value="Swimming">Swimming 🏊</option>
              <option value="Yoga">Yoga & Mobility 🧘</option>
              <option value="Sports">Sports ⚽</option>
              <option value="Other">Other Functional Movement ⚡</option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block mb-1 text-slate-400">Duration (Minutes)</label>
              <input id="wDuration" type="number" min="5" max="300" value="30" class="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-sm focus:outline-none" required />
            </div>
            <div>
              <label class="block mb-1 text-slate-400">Estimated Calories Burned</label>
              <input id="wCalories" type="number" min="10" max="2500" value="240" class="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-sm focus:outline-none" required />
            </div>
          </div>

          <div>
            <label class="block mb-1 text-slate-400">Intensity Level</label>
            <select id="wIntensity" class="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-white/10 text-sm focus:outline-none">
              <option value="Moderate">Moderate Pace</option>
              <option value="High">High Intensity / Max Effort</option>
              <option value="Light">Light Recovery</option>
            </select>
          </div>

          <div>
            <label class="block mb-1 text-slate-400">Session Notes</label>
            <input id="wNotes" type="text" placeholder="e.g. 5km tempo run on outdoor trail" class="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-sm focus:outline-none" />
          </div>

          <div class="pt-4 flex items-center justify-end space-x-3">
            <button type="button" onclick="document.getElementById('actionModalBackdrop').remove()" class="px-4 py-2 rounded-xl text-slate-400">Cancel</button>
            <button type="submit" class="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-500/20">
              Save Workout
            </button>
          </div>
        </form>

      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
};

window.submitWorkoutForm = function(e) {
  e.preventDefault();
  const type = document.getElementById("wType").value;
  const duration = parseInt(document.getElementById("wDuration").value, 10);
  const calories = parseInt(document.getElementById("wCalories").value, 10);
  const intensity = document.getElementById("wIntensity").value;
  const notes = document.getElementById("wNotes").value;

  window.vitaloraStore.logWorkout({ type, duration, calories, intensity, notes });
  document.getElementById("actionModalBackdrop").remove();
  window.renderApp();
  window.showToast(`${type} workout logged successfully! 💪`);
};

// --- MEAL LOGGER MODAL ---
window.openMealModal = function(defaultCat = "Breakfast") {
  const modalHtml = `
    <div id="actionModalBackdrop" class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay overflow-y-auto">
      <div class="relative w-full max-w-lg rounded-3xl glass-panel p-6 sm:p-8 shadow-2xl border border-white/20 text-slate-900 dark:text-white" style="background-color: var(--bg-card);">
        
        <div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10 mb-5">
          <div>
            <h3 class="text-xl font-bold">Log Food & Macronutrients</h3>
            <p class="text-xs text-slate-400">Track calorie quota and macro distribution</p>
          </div>
          <button onclick="document.getElementById('actionModalBackdrop').remove()" class="text-slate-400 hover:text-white p-1">
            ✕
          </button>
        </div>

        <form id="mealForm" onsubmit="window.submitMealForm(event)" class="space-y-4 text-xs font-semibold">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block mb-1 text-slate-400">Meal Category</label>
              <select id="mCategory" class="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-white/10 text-sm focus:outline-none">
                <option value="Breakfast" ${defaultCat === 'Breakfast' ? 'selected' : ''}>Breakfast 🍳</option>
                <option value="Lunch" ${defaultCat === 'Lunch' ? 'selected' : ''}>Lunch 🥗</option>
                <option value="Dinner" ${defaultCat === 'Dinner' ? 'selected' : ''}>Dinner 🍲</option>
                <option value="Snacks" ${defaultCat === 'Snacks' ? 'selected' : ''}>Snacks 🍎</option>
              </select>
            </div>
            <div>
              <label class="block mb-1 text-slate-400">Serving / Quantity</label>
              <input id="mQty" type="text" value="1 bowl (200g)" class="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-sm focus:outline-none" required />
            </div>
          </div>

          <div>
            <label class="block mb-1 text-slate-400">Food Name</label>
            <input id="mFood" type="text" placeholder="e.g. Grilled Paneer Salad with Quinoa" class="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-sm focus:outline-none" required />
          </div>

          <div class="grid grid-cols-4 gap-2">
            <div>
              <label class="block mb-1 text-slate-400">Calories</label>
              <input id="mCal" type="number" value="350" class="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs focus:outline-none" required />
            </div>
            <div>
              <label class="block mb-1 text-slate-400">Protein (g)</label>
              <input id="mProt" type="number" value="25" class="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs focus:outline-none" required />
            </div>
            <div>
              <label class="block mb-1 text-slate-400">Carbs (g)</label>
              <input id="mCarbs" type="number" value="35" class="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs focus:outline-none" required />
            </div>
            <div>
              <label class="block mb-1 text-slate-400">Fat (g)</label>
              <input id="mFat" type="number" value="10" class="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs focus:outline-none" required />
            </div>
          </div>

          <div class="pt-4 flex items-center justify-end space-x-3">
            <button type="button" onclick="document.getElementById('actionModalBackdrop').remove()" class="px-4 py-2 rounded-xl text-slate-400">Cancel</button>
            <button type="submit" class="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-500/20">
              Save Meal
            </button>
          </div>
        </form>

      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
};

window.submitMealForm = function(e) {
  e.preventDefault();
  const category = document.getElementById("mCategory").value;
  const food = document.getElementById("mFood").value;
  const quantity = document.getElementById("mQty").value;
  const calories = parseInt(document.getElementById("mCal").value, 10);
  const protein = parseInt(document.getElementById("mProt").value, 10);
  const carbs = parseInt(document.getElementById("mCarbs").value, 10);
  const fat = parseInt(document.getElementById("mFat").value, 10);

  window.vitaloraStore.logMeal({ category, food, quantity, calories, protein, carbs, fat });
  document.getElementById("actionModalBackdrop").remove();
  window.renderApp();
  window.showToast(`Logged ${food} to ${category}! 🥗`);
};

// --- WEIGHT MODAL ---
window.openWeightModal = function() {
  const cur = window.vitaloraStore.getState().todayStats.currentWeight || 68.4;
  const modalHtml = `
    <div id="actionModalBackdrop" class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay overflow-y-auto">
      <div class="relative w-full max-w-sm rounded-3xl glass-panel p-6 shadow-2xl border border-white/20 text-slate-900 dark:text-white" style="background-color: var(--bg-card);">
        <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10 mb-4">
          <h3 class="text-lg font-bold">Record Weight</h3>
          <button onclick="document.getElementById('actionModalBackdrop').remove()" class="text-slate-400 hover:text-white">✕</button>
        </div>

        <div class="space-y-4 text-xs font-semibold">
          <div>
            <label class="block mb-1 text-slate-400">Weight (in kg)</label>
            <input id="inputWeight" type="number" step="0.1" value="${cur}" class="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-base font-bold focus:outline-none" />
          </div>

          <div>
            <label class="block mb-1 text-slate-400">Milestone Note (Optional)</label>
            <input id="inputWeightNote" type="text" placeholder="e.g. Post-cardio morning weigh-in" class="w-full px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs focus:outline-none" />
          </div>

          <div class="pt-2 flex justify-end space-x-2">
            <button onclick="document.getElementById('actionModalBackdrop').remove()" class="px-4 py-2 rounded-xl text-slate-400">Cancel</button>
            <button onclick="window.saveWeightModal()" class="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold">Save Weight</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
};

window.saveWeightModal = function() {
  const w = parseFloat(document.getElementById("inputWeight").value);
  const n = document.getElementById("inputWeightNote").value;
  if (!isNaN(w) && w > 0) {
    window.vitaloraStore.logWeight(w, n);
    document.getElementById("actionModalBackdrop").remove();
    window.renderApp();
    window.showToast(`Weight recorded: ${w} kg ⚖️`);
  }
};

// --- SLEEP MODAL ---
window.openSleepModal = function() {
  const s = window.vitaloraStore.getState().todayStats;
  const modalHtml = `
    <div id="actionModalBackdrop" class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay overflow-y-auto">
      <div class="relative w-full max-w-sm rounded-3xl glass-panel p-6 shadow-2xl border border-white/20 text-slate-900 dark:text-white" style="background-color: var(--bg-card);">
        <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10 mb-4">
          <h3 class="text-lg font-bold">Log Sleep Duration</h3>
          <button onclick="document.getElementById('actionModalBackdrop').remove()" class="text-slate-400 hover:text-white">✕</button>
        </div>

        <div class="space-y-4 text-xs font-semibold">
          <div>
            <label class="block mb-1 text-slate-400">Total Hours</label>
            <input id="inputSleepHours" type="number" step="0.1" value="${s.sleepHours}" class="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-base font-bold focus:outline-none" />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block mb-1 text-slate-400">Bedtime</label>
              <input id="inputBedtime" type="time" value="${s.sleepBedtime || '23:15'}" class="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs focus:outline-none" />
            </div>
            <div>
              <label class="block mb-1 text-slate-400">Wake-up</label>
              <input id="inputWakeup" type="time" value="${s.sleepWakeup || '06:39'}" class="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs focus:outline-none" />
            </div>
          </div>

          <div class="pt-2 flex justify-end space-x-2">
            <button onclick="document.getElementById('actionModalBackdrop').remove()" class="px-4 py-2 rounded-xl text-slate-400">Cancel</button>
            <button onclick="window.saveSleepModal()" class="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold">Save Sleep</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
};

window.saveSleepModal = function() {
  const h = parseFloat(document.getElementById("inputSleepHours").value);
  const b = document.getElementById("inputBedtime").value;
  const w = document.getElementById("inputWakeup").value;
  if (!isNaN(h) && h > 0) {
    window.vitaloraStore.logSleep(h, b, w);
    document.getElementById("actionModalBackdrop").remove();
    window.renderApp();
    window.showToast(`Sleep logged: ${h} hours 🌙`);
  }
};
