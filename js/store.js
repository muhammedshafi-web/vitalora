// VITALORA - Reactive State Store & Business Logic Engine

class VitaloraStore {
  constructor() {
    this.storageKey = "vitalora_state_v1";
    this.listeners = [];
    this.state = this.loadState();
  }

  loadState() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure products and critical structures are preserved
        return parsed;
      }
    } catch (e) {
      console.warn("Failed to load Vitalora local storage state", e);
    }
    return JSON.parse(JSON.stringify(window.VITALORA_INITIAL_DATA || {}));
  }

  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {
      console.warn("Failed to save state to localStorage", e);
    }
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => {
      try {
        listener(this.state);
      } catch (err) {
        console.error("Store listener error:", err);
      }
    });
  }

  getState() {
    return this.state;
  }

  // --- HEALTH SCORE CALCULATION ALGORITHM (Non-medical wellness index) ---
  calculateHealthScore() {
    const s = this.state.todayStats;
    const u = this.state.user;

    // 1. Activity (Max 25 pts) based on step goal
    const stepPct = Math.min(1.0, (s.steps || 0) / (u.stepGoal || 10000));
    const activityPts = Math.round(stepPct * 25);

    // 2. Hydration (Max 20 pts) based on water goal
    const waterPct = Math.min(1.0, (s.waterMl || 0) / (u.waterGoal || 2500));
    const hydrationPts = Math.round(waterPct * 20);

    // 3. Sleep (Max 20 pts) based on sleep duration & quality
    const sleepPct = Math.min(1.0, (s.sleepHours || 0) / (u.sleepGoal || 8.0));
    const sleepPts = Math.round(sleepPct * 20);

    // 4. Exercise (Max 20 pts) based on daily workout minutes
    const exercisePct = Math.min(1.0, (s.exerciseMinutes || 0) / (u.exerciseGoal || 45));
    const exercisePts = Math.round(exercisePct * 20);

    // 5. Nutrition (Max 15 pts) based on calorie adherence
    const calTarget = u.caloriesGoal || 2200;
    const calDiff = Math.abs((s.caloriesConsumed || 0) - calTarget);
    const calRatio = Math.max(0, 1 - calDiff / calTarget);
    const nutritionPts = Math.round(calRatio * 15);

    const total = activityPts + hydrationPts + sleepPts + exercisePts + nutritionPts;

    return {
      total: Math.min(100, Math.max(0, total)),
      breakdown: {
        activity: { score: activityPts, max: 25, label: "Daily Steps & Movement" },
        hydration: { score: hydrationPts, max: 20, label: "Hydration Balance" },
        sleep: { score: sleepPts, max: 20, label: "Restorative Sleep" },
        exercise: { score: exercisePts, max: 20, label: "Workout Duration" },
        nutrition: { score: nutritionPts, max: 15, label: "Nutritional Balance" }
      }
    };
  }

  // --- BMI CALCULATOR ---
  calculateBmi(heightCm, weightKg) {
    if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
      return { value: 0, category: "Unknown", color: "gray" };
    }
    const heightM = heightCm / 100;
    const bmiVal = +(weightKg / (heightM * heightM)).toFixed(1);

    let category = "Normal";
    let color = "emerald";

    if (bmiVal < 18.5) {
      category = "Underweight";
      color = "blue";
    } else if (bmiVal < 25) {
      category = "Normal / Healthy Weight";
      color = "emerald";
    } else if (bmiVal < 30) {
      category = "Overweight";
      color = "amber";
    } else {
      category = "Obesity Range";
      color = "rose";
    }

    return {
      value: bmiVal,
      category,
      color
    };
  }

  // --- USER ONBOARDING & PROFILE ---
  updateUser(updates) {
    this.state.user = { ...this.state.user, ...updates };

    // If height or weight changed, update BMI automatically
    if (updates.height || updates.weight) {
      const h = updates.height || this.state.user.height;
      const w = updates.weight || this.state.user.weight;
      const bmiResult = this.calculateBmi(h, w);
      this.state.todayStats.currentWeight = w;
      this.state.todayStats.bmi = bmiResult.value;
      this.state.todayStats.bmiCategory = bmiResult.category;
    }

    this.saveState();
  }

  completeOnboarding(data) {
    this.state.user = {
      ...this.state.user,
      ...data,
      onboarded: true
    };
    const bmiResult = this.calculateBmi(data.height, data.weight);
    this.state.todayStats.currentWeight = data.weight;
    this.state.todayStats.bmi = bmiResult.value;
    this.state.todayStats.bmiCategory = bmiResult.category;
    if (data.stepGoal) this.state.user.stepGoal = data.stepGoal;
    if (data.waterGoal) this.state.user.waterGoal = data.waterGoal;
    if (data.sleepGoal) this.state.user.sleepGoal = data.sleepGoal;
    this.saveState();
  }

  toggleTheme() {
    const nextTheme = this.state.user.theme === "dark" ? "light" : "dark";
    this.state.user.theme = nextTheme;
    this.saveState();
    return nextTheme;
  }

  // --- WATER TRACKER ACTIONS ---
  addWater(amountMl) {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.state.todayStats.waterMl = (this.state.todayStats.waterMl || 0) + amountMl;
    this.state.waterLogs.unshift({
      id: "wl_" + Date.now(),
      time: timeStr,
      amount: amountMl
    });
    this.saveState();
  }

  undoWater() {
    if (this.state.waterLogs.length > 0) {
      const last = this.state.waterLogs.shift();
      this.state.todayStats.waterMl = Math.max(0, (this.state.todayStats.waterMl || 0) - last.amount);
      this.saveState();
    }
  }

  setWaterGoal(newGoalMl) {
    this.state.user.waterGoal = parseInt(newGoalMl, 10);
    this.saveState();
  }

  // --- WEIGHT & BMI ACTIONS ---
  logWeight(weightKg, note = "") {
    const today = new Date().toISOString().split("T")[0];
    const bmiRes = this.calculateBmi(this.state.user.height, weightKg);

    const existingIdx = this.state.weightHistory.findIndex(w => w.date === today);
    const entry = {
      date: today,
      weight: parseFloat(weightKg),
      bmi: bmiRes.value,
      note: note || "Daily log"
    };

    if (existingIdx >= 0) {
      this.state.weightHistory[existingIdx] = entry;
    } else {
      this.state.weightHistory.push(entry);
      this.state.weightHistory.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    this.state.todayStats.currentWeight = parseFloat(weightKg);
    this.state.todayStats.bmi = bmiRes.value;
    this.state.todayStats.bmiCategory = bmiRes.category;
    this.state.user.weight = parseFloat(weightKg);

    this.saveState();
  }

  deleteWeight(index) {
    if (index >= 0 && index < this.state.weightHistory.length) {
      this.state.weightHistory.splice(index, 1);
      if (this.state.weightHistory.length > 0) {
        const latest = this.state.weightHistory[this.state.weightHistory.length - 1];
        this.state.todayStats.currentWeight = latest.weight;
        this.state.todayStats.bmi = latest.bmi;
      }
      this.saveState();
    }
  }

  // --- WORKOUT ACTIONS ---
  logWorkout(workout) {
    const newWorkout = {
      id: "w_" + Date.now(),
      date: workout.date || new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: workout.type || "Walking",
      duration: parseInt(workout.duration, 10) || 30,
      calories: parseInt(workout.calories, 10) || 200,
      intensity: workout.intensity || "Moderate",
      notes: workout.notes || ""
    };

    this.state.workouts.unshift(newWorkout);
    this.state.todayStats.exerciseMinutes = (this.state.todayStats.exerciseMinutes || 0) + newWorkout.duration;
    this.state.todayStats.caloriesBurned = (this.state.todayStats.caloriesBurned || 0) + newWorkout.calories;
    this.saveState();
  }

  deleteWorkout(id) {
    const item = this.state.workouts.find(w => w.id === id);
    if (item) {
      this.state.todayStats.exerciseMinutes = Math.max(0, (this.state.todayStats.exerciseMinutes || 0) - item.duration);
      this.state.todayStats.caloriesBurned = Math.max(0, (this.state.todayStats.caloriesBurned || 0) - item.calories);
      this.state.workouts = this.state.workouts.filter(w => w.id !== id);
      this.saveState();
    }
  }

  // --- MEAL & NUTRITION ACTIONS ---
  logMeal(meal) {
    const newMeal = {
      id: "m_" + Date.now(),
      category: meal.category || "Snacks",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      food: meal.food || "Nutritious Snack",
      quantity: meal.quantity || "1 serving",
      calories: parseInt(meal.calories, 10) || 250,
      protein: parseInt(meal.protein, 10) || 15,
      carbs: parseInt(meal.carbs, 10) || 30,
      fat: parseInt(meal.fat, 10) || 8
    };

    this.state.meals.unshift(newMeal);
    this.state.todayStats.caloriesConsumed = (this.state.todayStats.caloriesConsumed || 0) + newMeal.calories;
    this.saveState();
  }

  deleteMeal(id) {
    const item = this.state.meals.find(m => m.id === id);
    if (item) {
      this.state.todayStats.caloriesConsumed = Math.max(0, (this.state.todayStats.caloriesConsumed || 0) - item.calories);
      this.state.meals = this.state.meals.filter(m => m.id !== id);
      this.saveState();
    }
  }

  // --- SLEEP ACTIONS ---
  logSleep(hours, bedtime, wakeup) {
    this.state.todayStats.sleepHours = parseFloat(hours);
    this.state.todayStats.sleepBedtime = bedtime || "23:00";
    this.state.todayStats.sleepWakeup = wakeup || "07:00";
    this.state.todayStats.sleepQuality = hours >= 7 ? "Deep & Restful (92%)" : "Fair (74%)";
    this.saveState();
  }

  // --- E-COMMERCE / CART ACTIONS ---
  addToCart(productId, qty = 1) {
    const existing = this.state.cart.find(item => item.productId === productId);
    if (existing) {
      existing.quantity += qty;
    } else {
      this.state.cart.push({ productId, quantity: qty });
    }
    this.saveState();
  }

  updateCartQty(productId, qty) {
    if (qty <= 0) {
      this.removeFromCart(productId);
    } else {
      const item = this.state.cart.find(i => i.productId === productId);
      if (item) {
        item.quantity = qty;
        this.saveState();
      }
    }
  }

  removeFromCart(productId) {
    this.state.cart = this.state.cart.filter(item => item.productId !== productId);
    this.saveState();
  }

  clearCart() {
    this.state.cart = [];
    this.saveState();
  }

  toggleWishlist(productId) {
    if (!this.state.wishlist) this.state.wishlist = [];
    const idx = this.state.wishlist.indexOf(productId);
    if (idx >= 0) {
      this.state.wishlist.splice(idx, 1);
    } else {
      this.state.wishlist.push(productId);
    }
    this.saveState();
  }

  getCartSummary() {
    let subtotal = 0;
    const items = this.state.cart.map(cItem => {
      const prod = this.state.products.find(p => p.id === cItem.productId) || {
        id: cItem.productId,
        name: "Fitness Item",
        price: 999,
        images: [""]
      };
      const lineTotal = prod.price * cItem.quantity;
      subtotal += lineTotal;
      return {
        ...prod,
        quantity: cItem.quantity,
        lineTotal
      };
    });

    const discount = subtotal > 3000 ? 500 : 0;
    const delivery = 0; // Free delivery
    const total = Math.max(0, subtotal - discount + delivery);

    return {
      items,
      subtotal,
      discount,
      delivery,
      total,
      itemCount: this.state.cart.reduce((sum, i) => sum + i.quantity, 0)
    };
  }

  createOrder(orderData) {
    const summary = this.getCartSummary();
    const newOrder = {
      id: "VIT-" + Math.floor(10000 + Math.random() * 90000),
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      items: summary.items.map(it => ({
        productId: it.id,
        name: it.name,
        price: it.price,
        quantity: it.quantity
      })),
      subtotal: summary.subtotal,
      discount: summary.discount,
      delivery: summary.delivery,
      total: summary.total,
      status: "Confirmed",
      estimatedDelivery: "In 3 Business Days",
      shippingAddress: orderData.shippingAddress || {
        name: this.state.user.name,
        phone: "+91 98765 43210",
        address: "42 Wellness Boulevard",
        city: "Bengaluru",
        state: "Karnataka",
        pincode: "560001"
      },
      paymentMethod: orderData.paymentMethod || "UPI"
    };

    if (!this.state.orders) this.state.orders = [];
    this.state.orders.unshift(newOrder);
    this.clearCart();
    return newOrder;
  }

  // --- ADMIN STORE MANAGEMENT ---
  addProduct(newProd) {
    const product = {
      ...newProd,
      id: "prod_" + Date.now(),
      rating: 4.8,
      reviewsCount: 1,
      stock: parseInt(newProd.stock, 10) || 50,
      price: parseInt(newProd.price, 10) || 999,
      originalPrice: parseInt(newProd.originalPrice, 10) || 1499,
      discount: Math.round(((newProd.originalPrice - newProd.price) / newProd.originalPrice) * 100) || 30
    };
    this.state.products.unshift(product);
    this.saveState();
  }

  updateProduct(id, updates) {
    const idx = this.state.products.findIndex(p => p.id === id);
    if (idx >= 0) {
      this.state.products[idx] = { ...this.state.products[idx], ...updates };
      this.saveState();
    }
  }

  deleteProduct(id) {
    this.state.products = this.state.products.filter(p => p.id !== id);
    this.saveState();
  }

  // --- CONNECTED DEVICES ---
  toggleDevice(id) {
    const dev = this.state.connectedDevices.find(d => d.id === id);
    if (dev) {
      if (dev.status === "Connected") {
        dev.status = "Disconnected";
        dev.synced = "Never";
      } else {
        dev.status = "Connected";
        dev.synced = "Just now";
        dev.battery = "95%";
      }
      this.saveState();
    }
  }

  // --- REMINDERS ---
  toggleReminder(id) {
    const rem = this.state.reminders.find(r => r.id === id);
    if (rem) {
      rem.enabled = !rem.enabled;
      this.saveState();
    }
  }

  // --- AI COACH CONVERSATIONAL AGENT ---
  sendAiMessage(userText) {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Add user message
    this.state.aiChatHistory.push({
      sender: "user",
      time: timeStr,
      text: userText
    });

    // Generate intelligent contextual response
    const reply = this.generateAiResponse(userText);
    this.state.aiChatHistory.push({
      sender: "ai",
      time: timeStr,
      text: reply
    });

    this.saveState();
    return reply;
  }

  generateAiResponse(query) {
    const q = query.toLowerCase();
    const u = this.state.user;
    const s = this.state.todayStats;
    const score = this.calculateHealthScore().total;

    if (q.includes("step") || q.includes("walk")) {
      const pct = Math.round((s.steps / u.stepGoal) * 100);
      return `You're currently at ${s.steps.toLocaleString()} steps today (${pct}% of your ${u.stepGoal.toLocaleString()} goal). Taking a brisk 20-minute evening walk will add roughly 2,200 steps and easily push you over your daily target! Remember: consistent cadence aids post-meal glucose stabilization.`;
    }

    if (q.includes("water") || q.includes("hydrate") || q.includes("hydration")) {
      const remaining = Math.max(0, u.waterGoal - s.waterMl);
      return `You've logged ${s.waterMl}ml of water so far today. To hit your target of ${u.waterGoal}ml, you need another ${(remaining / 1000).toFixed(1)}L. Drinking a tall glass right now will boost your metabolic efficiency and maintain cellular energy!`;
    }

    if (q.includes("score") || q.includes("health score") || q.includes("vitalora score")) {
      return `Your VITALORA Health Score is currently ${score}/100! Your sleep and workout habits are performing excellently. To boost your score closer to 95+, try logging another 700ml of water and completing an active post-dinner mobility routine.`;
    }

    if (q.includes("sleep") || q.includes("tired") || q.includes("rest")) {
      return `Last night you logged ${s.sleepHours} hours with an estimated 92% sleep quality index. To further optimize deep restorative sleep tonight, try dimming screens 45 minutes before bedtime and keeping your bedroom temperature slightly cool (around 20-22°C).`;
    }

    if (q.includes("protein") || q.includes("food") || q.includes("eat") || q.includes("diet") || q.includes("nutrition")) {
      return `Your daily protein target is ${u.proteinGoal}g. Current logged intake is ~122g across meals. High-quality sources like paneer, Greek yogurt, lentils/dal, or whey isolate will help hit your target and support muscular tissue recovery.`;
    }

    if (q.includes("weight") || q.includes("lose") || q.includes("gain") || q.includes("bmi")) {
      return `Your current recorded weight is ${s.currentWeight} kg (BMI: ${s.bmi} - ${s.bmiCategory}). Over the past month, your trend reflects a healthy, gradual reduction towards your target of ${u.targetWeight} kg. Maintain your daily calorie balance and hydration for sustained results!`;
    }

    return `Based on your biometrics today: Steps are at ${s.steps.toLocaleString()}, Water at ${s.waterMl}ml, and Health Score is ${score}/100. Staying consistent with regular physical activity, balanced whole foods, and 7-8 hours of sleep is the foundation of lifelong vitality. What specific area would you like to optimize next?`;
  }

  // --- DATA EXPORT & RESET ---
  exportDataJson() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `vitalora_health_export_${new Date().toISOString().split("T")[0]}.json`);
    dlAnchor.click();
  }

  resetDatabase() {
    localStorage.removeItem(this.storageKey);
    this.state = JSON.parse(JSON.stringify(window.VITALORA_INITIAL_DATA));
    this.saveState();
  }
}

// Global Store Instance
window.vitaloraStore = new VitaloraStore();
