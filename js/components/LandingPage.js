// VITALORA - Premium Landing Page with 3D-style Health Visual and Asset Integration

window.renderLandingPage = function() {
  const store = window.vitaloraStore;
  const user = store.getState().user;
  const today = store.getState().todayStats;
  const products = store.getState().products.slice(0, 4);

  return `
    <div class="pt-24 pb-20 overflow-hidden">
      
      <!-- HERO SECTION -->
      <section class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28">
        
        <!-- Ambient Decorative Glows -->
        <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-purple-600/20 via-cyan-500/15 to-emerald-500/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <!-- Hero Copy -->
          <div class="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            <!-- Brand Pill Badge -->
            <div class="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-panel border border-emerald-500/30 text-emerald-500 text-xs font-semibold tracking-wide">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Next-Generation Bio-Intelligence Platform</span>
            </div>

            <!-- Main Headline -->
            <h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-white">
              Understand Your Body. <br />
              <span class="gradient-text-emerald">Improve Your Life.</span>
            </h1>

            <!-- Subtitle -->
            <p class="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Track your health, fitness, nutrition, sleep and daily habits in one intelligent platform. Experience precision biometric intelligence with automated wellness scoring.
            </p>

            <!-- CTA Action Buttons -->
            <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button 
                onclick="window.startTrackingAction()" 
                class="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-base shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-3 group"
              >
                <span>Start Tracking</span>
                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
              </button>

              <button 
                onclick="window.navigateTo('dashboard')" 
                class="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel border border-slate-300 dark:border-white/10 hover:border-emerald-500/50 text-slate-800 dark:text-white font-semibold text-base hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                <span>Explore Dashboard</span>
              </button>
            </div>

            <!-- Trust proof badges -->
            <div class="flex items-center justify-center lg:justify-start space-x-6 pt-4 text-xs text-slate-500 dark:text-slate-400">
              <div class="flex items-center space-x-1.5">
                <svg class="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                <span>No Credit Card Required</span>
              </div>
              <div class="flex items-center space-x-1.5">
                <svg class="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                <span>100% Private Health Vault</span>
              </div>
            </div>

          </div>

          <!-- Hero Visual: Interactive 3D Cosmic Interface Card (Featuring Image 1 & Live Biometric Widgets) -->
          <div class="lg:col-span-5 relative card-perspective-container">
            
            <div class="relative card-3d-tilt rounded-3xl glass-panel p-4 sm:p-6 overflow-hidden border border-white/20 shadow-2xl bg-slate-900/90 text-white">
              
              <!-- Featured Cosmic Interface Header (Image 1 Integration) -->
              <div class="relative h-48 sm:h-56 rounded-2xl overflow-hidden mb-5 group border border-purple-500/20">
                <img src="assets/hero_interface.jpg" alt="VITALORA Futuristic Interface Style" class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90" />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                
                <div class="absolute top-3 left-3 flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-emerald-400">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>LIVE BIOMETRIC TELEMETRY</span>
                </div>

                <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <span class="text-white font-bold text-sm tracking-wide">VITALORA SYSTEM 2.0</span>
                  <span class="px-2 py-0.5 rounded bg-purple-500/30 text-purple-200 border border-purple-400/30">Synaptic Sync</span>
                </div>
              </div>

              <!-- Interactive Live 3D Health Cards Grid -->
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                
                <!-- Steps Card -->
                <div class="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all card-lift">
                  <div class="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span>Today's Steps</span>
                    <span class="text-emerald-400 font-bold">78%</span>
                  </div>
                  <div class="text-lg font-bold text-white tracking-tight">${today.steps.toLocaleString()}</div>
                  <div class="w-full bg-white/10 rounded-full h-1.5 mt-2 overflow-hidden">
                    <div class="bg-gradient-to-r from-emerald-400 to-teal-400 h-1.5 rounded-full" style="width: 78%"></div>
                  </div>
                  <div class="text-[9px] text-slate-400 mt-1">Goal: 10,000 steps</div>
                </div>

                <!-- Heart Rate Live Pulse -->
                <div class="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-rose-500/50 transition-all card-lift">
                  <div class="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span>Heart Rate</span>
                    <span class="text-rose-400 animate-pulse">●</span>
                  </div>
                  <div class="text-lg font-bold text-rose-400 tracking-tight flex items-baseline space-x-1">
                    <span>72</span>
                    <span class="text-[10px] text-slate-400 font-normal">BPM</span>
                  </div>
                  <!-- Mini SVG Waveform -->
                  <div class="h-4 mt-1 flex items-center">
                    <svg class="w-full h-4 stroke-rose-400 fill-none" viewBox="0 0 100 24">
                      <path d="M0,12 L20,12 L28,4 L36,20 L44,8 L52,14 L60,12 L100,12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div class="text-[9px] text-slate-400">Resting 68 • Peak 124</div>
                </div>

                <!-- Water Tracker -->
                <div class="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all card-lift">
                  <div class="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span>Water Intake</span>
                    <span class="text-cyan-400">💧</span>
                  </div>
                  <div class="text-lg font-bold text-cyan-400 tracking-tight">1.8L</div>
                  <div class="w-full bg-white/10 rounded-full h-1.5 mt-2 overflow-hidden">
                    <div class="bg-gradient-to-r from-cyan-400 to-blue-500 h-1.5 rounded-full" style="width: 72%"></div>
                  </div>
                  <div class="text-[9px] text-slate-400 mt-1">Goal: 2.5 Liters</div>
                </div>

                <!-- Sleep -->
                <div class="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all card-lift">
                  <div class="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span>Sleep Rest</span>
                    <span class="text-purple-400">🌙</span>
                  </div>
                  <div class="text-lg font-bold text-purple-300 tracking-tight">7h 24m</div>
                  <div class="text-[10px] text-emerald-400 font-medium mt-1">Deep (92%)</div>
                  <div class="text-[9px] text-slate-400">Bedtime 11:15 PM</div>
                </div>

                <!-- Calories -->
                <div class="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/50 transition-all card-lift">
                  <div class="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span>Calories</span>
                    <span class="text-amber-400">🔥</span>
                  </div>
                  <div class="text-lg font-bold text-amber-300 tracking-tight">2,140</div>
                  <div class="text-[10px] text-slate-300 mt-1">520 kcal burned</div>
                  <div class="text-[9px] text-slate-400">Net: 1,620 kcal</div>
                </div>

                <!-- BMI -->
                <div class="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all card-lift">
                  <div class="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span>Body BMI</span>
                    <span class="text-emerald-400">⚖️</span>
                  </div>
                  <div class="text-lg font-bold text-emerald-400 tracking-tight">${today.bmi}</div>
                  <div class="text-[10px] text-emerald-400 font-semibold mt-1">Healthy Range</div>
                  <div class="text-[9px] text-slate-400">Weight 68.4 kg</div>
                </div>

              </div>

              <!-- Quick action in Hero Card -->
              <div class="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <span class="text-xs text-slate-300">Daily Health Score: <strong class="text-emerald-400 text-sm">87/100</strong></span>
                <button onclick="window.navigateTo('dashboard')" class="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1">
                  <span>View Details</span>
                  <span>→</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </section>

      <!-- ANIMATED STATISTICS BANNER -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 text-center">
          
          <div class="space-y-1">
            <div class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">50,000+</div>
            <div class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">Active Health Members</div>
          </div>

          <div class="space-y-1">
            <div class="text-3xl sm:text-4xl font-extrabold text-emerald-500 tracking-tight">99.8%</div>
            <div class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">Biometric Precision Sync</div>
          </div>

          <div class="space-y-1">
            <div class="text-3xl sm:text-4xl font-extrabold text-cyan-500 tracking-tight">12M+</div>
            <div class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">Workouts Recorded</div>
          </div>

          <div class="space-y-1">
            <div class="text-3xl sm:text-4xl font-extrabold text-amber-500 tracking-tight">4.9 ★</div>
            <div class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">User Satisfaction Index</div>
          </div>

        </div>
      </section>

      <!-- "EVERYTHING YOU NEED TO TRACK YOUR HEALTH" SHOWCASE -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span class="text-xs uppercase font-bold tracking-widest text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Unified Wellness Engine</span>
          <h2 class="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Everything you need to track your health
          </h2>
          <p class="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Say goodbye to fragmented fitness apps. VITALORA unifies biometrics, hydration, recovery, activity, and nutrition into one cohesive dashboard.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          
          <!-- Daily Activity -->
          <div class="p-8 rounded-3xl glass-panel card-lift space-y-4 cursor-pointer" onclick="window.navigateTo('activity')">
            <div class="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">Daily Activity Tracking</h3>
            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Step counters, active distance, calorie burn analytics, and intelligent velocity curves with 150-minute weekly goal progression.
            </p>
            <div class="text-xs font-semibold text-emerald-500 flex items-center space-x-1 pt-2">
              <span>Explore Activity Module</span>
              <span>→</span>
            </div>
          </div>

          <!-- BMI Monitoring -->
          <div class="p-8 rounded-3xl glass-panel card-lift space-y-4 cursor-pointer" onclick="window.navigateTo('health')">
            <div class="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">BMI & Body Composition</h3>
            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Real-time BMI calculations based on WHO metrics, weight tracking timelines with range filters (7D to 1Y), and category classification.
            </p>
            <div class="text-xs font-semibold text-cyan-500 flex items-center space-x-1 pt-2">
              <span>View Health Analytics</span>
              <span>→</span>
            </div>
          </div>

          <!-- Water Tracking -->
          <div class="p-8 rounded-3xl glass-panel card-lift space-y-4 cursor-pointer" onclick="window.navigateTo('water')">
            <div class="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">Smart Hydration Tracker</h3>
            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Interactive visual fluid level bottle, instant +250ml / +500ml quick logging, customized daily targets, and cellular hydration insights.
            </p>
            <div class="text-xs font-semibold text-blue-500 flex items-center space-x-1 pt-2">
              <span>Track Water Balance</span>
              <span>→</span>
            </div>
          </div>

          <!-- Sleep Tracking -->
          <div class="p-8 rounded-3xl glass-panel card-lift space-y-4 cursor-pointer" onclick="window.navigateTo('sleep')">
            <div class="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">Restorative Sleep Stages</h3>
            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Monitor bedtime, wake-up times, deep sleep phases, REM cycles, and circadian rhythm patterns for optimum daytime vitality.
            </p>
            <div class="text-xs font-semibold text-purple-500 flex items-center space-x-1 pt-2">
              <span>View Sleep Metrics</span>
              <span>→</span>
            </div>
          </div>

          <!-- Exercise Tracking -->
          <div class="p-8 rounded-3xl glass-panel card-lift space-y-4 cursor-pointer" onclick="window.navigateTo('activity')">
            <div class="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">Multi-Sport Workouts</h3>
            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Log 8+ sports modalities including Running, Cycling, Swimming, Yoga, and Strength Training with intensity calibrations.
            </p>
            <div class="text-xs font-semibold text-rose-500 flex items-center space-x-1 pt-2">
              <span>Log a Workout</span>
              <span>→</span>
            </div>
          </div>

          <!-- AI Health Insights -->
          <div class="p-8 rounded-3xl glass-panel card-lift space-y-4 cursor-pointer" onclick="window.navigateTo('ai-coach')">
            <div class="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">AI Wellness Coach</h3>
            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Intelligent 24/7 conversational advice synthesizing your live biometric trends into tailored nutritional and recovery recommendations.
            </p>
            <div class="text-xs font-semibold text-amber-500 flex items-center space-x-1 pt-2">
              <span>Chat with AI Coach</span>
              <span>→</span>
            </div>
          </div>

        </div>

      </section>

      <!-- LIVE DASHBOARD SHOWCASE (FEATURING USER'S IMAGE 2 AS DASHBOARD VISUAL) -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="rounded-3xl glass-panel p-6 sm:p-12 border border-purple-500/20 bg-slate-950/80 relative overflow-hidden shadow-2xl">
          
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div class="lg:col-span-5 space-y-6 text-white">
              <span class="text-xs uppercase font-bold tracking-widest text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/30">
                Aesthetic Interface Architecture
              </span>
              <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Designed for Focus. <br />
                <span class="gradient-text-cosmic">Built for Longevity.</span>
              </h2>
              <p class="text-sm sm:text-base text-slate-300 leading-relaxed">
                Experience an interface inspired by deep biological rhythms and modern cosmic design. Every metric is structured to guide your decisions with zero cognitive clutter.
              </p>

              <div class="space-y-3 pt-2 text-xs sm:text-sm text-slate-300">
                <div class="flex items-center space-x-3">
                  <div class="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">✓</div>
                  <span>High-contrast dark mode & airy porcelain light mode</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">✓</div>
                  <span>Proprietary VITALORA Health Score (0-100)</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">✓</div>
                  <span>Integrated Indian ₹ INR Health & Fitness Store</span>
                </div>
              </div>

              <div class="pt-4">
                <button onclick="window.navigateTo('dashboard')" class="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all">
                  Launch Interactive Dashboard →
                </button>
              </div>
            </div>

            <!-- Image 2 Integration as Dashboard Showcase Visual -->
            <div class="lg:col-span-7">
              <div class="relative rounded-2xl overflow-hidden shadow-2xl border border-purple-500/30 group">
                <img 
                  src="assets/dashboard_preview.jpg" 
                  alt="VITALORA Dashboard Layout Showcase" 
                  class="w-full h-auto object-cover rounded-2xl transform group-hover:scale-[1.02] transition-transform duration-500" 
                />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60"></div>
                <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white bg-slate-900/80 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <span class="font-semibold text-purple-300">VITALORA Pro Dashboard Experience</span>
                  <span class="text-emerald-400 font-bold">Live Synchronized</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      <!-- FEATURED PRODUCTS STORE TEASER -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <span class="text-xs uppercase font-bold tracking-widest text-emerald-500">Official Health Store</span>
            <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Recommended Gear & Nutrition</h2>
          </div>
          <button onclick="window.navigateTo('products')" class="text-emerald-500 font-bold text-sm hover:underline flex items-center space-x-1 mt-4 sm:mt-0">
            <span>Browse All Products (${store.getState().products.length})</span>
            <span>→</span>
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${products.map(p => `
            <div class="rounded-2xl glass-panel p-4 card-lift flex flex-col justify-between border border-slate-200/80 dark:border-white/10">
              <div class="relative h-44 rounded-xl overflow-hidden mb-3 bg-slate-100 dark:bg-slate-800">
                <img src="${p.images[0]}" alt="${p.name}" class="w-full h-full object-cover" />
                <span class="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white">
                  ${p.discount}% OFF
                </span>
                <button 
                  onclick="window.toggleProductWishlist('${p.id}', event)" 
                  class="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-center text-rose-500 hover:scale-110 transition-transform"
                >
                  <svg class="w-4 h-4 ${store.getState().wishlist.includes(p.id) ? 'fill-rose-500' : 'fill-none'}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                </button>
              </div>

              <div class="space-y-1.5 flex-1">
                <div class="flex items-center space-x-1 text-amber-400 text-xs font-semibold">
                  <span>★ ${p.rating}</span>
                  <span class="text-slate-400 font-normal">(${p.reviewsCount})</span>
                </div>
                <h4 class="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">${p.name}</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">${p.tagline}</p>
              </div>

              <div class="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <div>
                  <span class="text-base font-extrabold text-slate-900 dark:text-white">₹${p.price.toLocaleString()}</span>
                  <span class="text-xs text-slate-400 line-through ml-1">₹${p.originalPrice.toLocaleString()}</span>
                </div>
                <button 
                  onclick="window.openProductDetailModal('${p.id}')"
                  class="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
                >
                  View
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- CALL TO ACTION FINAL FOOTER -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div class="p-12 rounded-3xl glass-panel border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-transparent space-y-6">
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Ready to Take Control of Your Physical Health?
          </h2>
          <p class="text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Join thousands tracking steps, body composition, workouts, and sleep in real time.
          </p>
          <div class="pt-2">
            <button 
              onclick="window.startTrackingAction()" 
              class="px-10 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg shadow-xl shadow-emerald-500/25 transition-all"
            >
              Start Free Tracking Now →
            </button>
          </div>
        </div>
      </section>

    </div>
  `;
};
