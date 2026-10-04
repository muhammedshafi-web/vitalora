// VITALORA - Initial Seed Data & Database Store

const INITIAL_DATA = {
  user: {
    id: "usr_vitalora_01",
    name: "Aarav Sharma",
    email: "aarav.sharma@vitalora.health",
    age: 26,
    gender: "Male",
    height: 178, // in cm
    weight: 68.4, // in kg
    targetWeight: 66.0,
    activityLevel: "Moderate", // Sedentary, Light, Moderate, Very Active, Athlete
    fitnessGoal: "Improve fitness", // Lose weight, Gain muscle, Maintain weight, Improve fitness, Improve sleep, Build healthy habits
    stepGoal: 10000,
    waterGoal: 2500, // in ml
    sleepGoal: 8.0, // in hours
    exerciseGoal: 45, // in minutes
    caloriesGoal: 2200, // in kcal
    proteinGoal: 130, // in grams
    carbsGoal: 280, // in grams
    fatGoal: 70, // in grams
    units: "metric", // metric (kg/cm/ml) or imperial (lb/ft/fl oz)
    theme: "dark", // 'dark' or 'light'
    isAdmin: false,
    onboarded: true,
    notificationsEnabled: true,
    joinedDate: "2026-01-15"
  },

  todayStats: {
    date: new Date().toISOString().split("T")[0],
    steps: 7842,
    distanceKm: 5.88,
    caloriesBurned: 520,
    caloriesConsumed: 1850,
    waterMl: 1800,
    sleepHours: 7.4, // 7h 24m
    sleepMinutes: 24,
    sleepQuality: "Deep & Restful (92%)",
    sleepBedtime: "23:15",
    sleepWakeup: "06:39",
    sleepDeepHours: 2.15,
    sleepRemHours: 1.75,
    sleepLightHours: 3.5,
    exerciseMinutes: 45,
    currentWeight: 68.4,
    bmi: 21.6,
    bmiCategory: "Healthy Weight",
    restingHeartRate: 68,
    peakHeartRate: 124
  },

  waterLogs: [
    { id: "wl_1", time: "07:30 AM", amount: 350 },
    { id: "wl_2", time: "09:45 AM", amount: 250 },
    { id: "wl_3", time: "11:30 AM", amount: 500 },
    { id: "wl_4", time: "01:15 PM", amount: 200 },
    { id: "wl_5", time: "03:40 PM", amount: 500 }
  ],

  weightHistory: [
    { date: "2026-09-04", weight: 70.2, bmi: 22.2, note: "Initial monthly start" },
    { date: "2026-09-09", weight: 69.8, bmi: 22.0, note: "Consistent hydration" },
    { date: "2026-09-14", weight: 69.5, bmi: 21.9, note: "Added morning cardio" },
    { date: "2026-09-19", weight: 69.1, bmi: 21.8, note: "High protein diet" },
    { date: "2026-09-24", weight: 68.9, bmi: 21.7, note: "Clean weekend meals" },
    { date: "2026-09-29", weight: 68.6, bmi: 21.65, note: "Rest day recovery" },
    { date: "2026-10-04", weight: 68.4, bmi: 21.6, note: "Current milestone entry" }
  ],

  weeklyActivity: [
    { day: "Mon", steps: 8520, exercise: 40, water: 2200, sleep: 7.5, score: 84 },
    { day: "Tue", steps: 10420, exercise: 55, water: 2500, sleep: 8.0, score: 92 },
    { day: "Wed", steps: 6940, exercise: 30, water: 2000, sleep: 6.8, score: 76 },
    { day: "Thu", steps: 9810, exercise: 50, water: 2400, sleep: 7.8, score: 88 },
    { day: "Fri", steps: 11200, exercise: 60, water: 2600, sleep: 7.2, score: 90 },
    { day: "Sat", steps: 8900, exercise: 45, water: 2300, sleep: 8.5, score: 89 },
    { day: "Sun", steps: 7842, exercise: 45, water: 1800, sleep: 7.4, score: 87 }
  ],

  workouts: [
    {
      id: "w_1",
      date: "2026-10-04",
      time: "07:00 AM",
      type: "Running",
      duration: 30,
      calories: 310,
      intensity: "High",
      notes: "Outdoor morning jog around the lake"
    },
    {
      id: "w_2",
      date: "2026-10-04",
      time: "05:30 PM",
      type: "Yoga",
      duration: 15,
      calories: 90,
      intensity: "Moderate",
      notes: "Mobility stretching & deep breathing"
    },
    {
      id: "w_3",
      date: "2026-10-03",
      time: "06:30 PM",
      type: "Gym",
      duration: 45,
      calories: 380,
      intensity: "High",
      notes: "Upper body strength: chest & pull-ups"
    },
    {
      id: "w_4",
      date: "2026-10-02",
      time: "06:00 AM",
      type: "Cycling",
      duration: 50,
      calories: 420,
      intensity: "High",
      notes: "Interval cycling sprint training"
    },
    {
      id: "w_5",
      date: "2026-10-01",
      time: "07:30 PM",
      type: "Swimming",
      duration: 35,
      calories: 290,
      intensity: "Moderate",
      notes: "Freestyle laps with recovery pace"
    }
  ],

  meals: [
    {
      id: "m_1",
      category: "Breakfast",
      time: "08:15 AM",
      food: "Oatmeal with Almonds, Chia Seeds & Blueberries",
      quantity: "1 medium bowl (250g)",
      calories: 420,
      protein: 18,
      carbs: 65,
      fat: 11
    },
    {
      id: "m_2",
      category: "Lunch",
      time: "01:00 PM",
      food: "Grilled Herb Paneer / Chicken Bowl with Brown Rice & Dal",
      quantity: "1 healthy plate",
      calories: 680,
      protein: 48,
      carbs: 72,
      fat: 20
    },
    {
      id: "m_3",
      category: "Snacks",
      time: "04:45 PM",
      food: "Whey Protein Isolate Shake with 1 Banana",
      quantity: "350 ml shake",
      calories: 270,
      protein: 30,
      carbs: 28,
      fat: 3
    },
    {
      id: "m_4",
      category: "Dinner",
      time: "08:30 PM",
      food: "Steamed Broccoli, Quinoa Stir-Fry & Moong Soup",
      quantity: "1 bowl",
      calories: 480,
      protein: 26,
      carbs: 62,
      fat: 14
    }
  ],

  products: [
    {
      id: "prod_1",
      name: "Vitalora Smart Fitness Band Pro",
      tagline: "Advanced dual-sensor activity & sleep bio-tracker",
      description: "Continuous heart rate monitoring, SpO2 blood oxygen tracking, scientific sleep stages analysis, 30+ workout modes, and 14-day battery life with water resistance up to 50 meters.",
      category: "Smart Wearables",
      price: 2999,
      originalPrice: 4499,
      discount: 33,
      rating: 4.8,
      reviewsCount: 1420,
      badge: "Best Seller",
      stock: 45,
      images: [
        "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80"
      ],
      specs: {
        Brand: "Vitalora Tech",
        Model: "VB-Pro-2026",
        Weight: "22 grams",
        Dimensions: "46.5 x 20.7 x 12.2 mm",
        Battery: "180 mAh (up to 14 days)",
        Material: "Aerospace Aluminum + Skin-friendly Fluoroelastomer",
        Warranty: "1 Year Official Replacement",
        Compatibility: "Android 8.0+ / iOS 13.0+"
      },
      features: [
        "24/7 Precision Heart Rate & PPG Sensor",
        "Sleep Stage Breakdown (Deep, REM, Light)",
        "5ATM Water Resistant (Swim proof)",
        "Always-On AMOLED Crisp Display",
        "Seamless Vitalora App Bluetooth Auto-Sync"
      ],
      included: [
        "1x Vitalora Band Pro Device",
        "1x Magnetic Fast Charging Cable",
        "1x User Manual & Quick Start Guide",
        "1x Warranty Card"
      ]
    },
    {
      id: "prod_2",
      name: "PureHydrate Smart LED Temp Bottle (1000ml)",
      tagline: "Insulated vacuum bottle with touch hydration reminder",
      description: "Smart temperature readout touchscreen cap, hourly hydration pulse reminder, double-walled vacuum insulation keeping beverages cold for 24 hours or hot for 12 hours.",
      category: "Water Bottles",
      price: 1499,
      originalPrice: 2499,
      discount: 40,
      rating: 4.7,
      reviewsCount: 892,
      badge: "Trending",
      stock: 62,
      images: [
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
      ],
      specs: {
        Brand: "Vitalora Wellness",
        Model: "PH-1000-LED",
        Weight: "360 grams",
        Dimensions: "28 x 7.5 cm",
        Battery: "Rechargeable USB-C (30 days per charge)",
        Material: "Medical-grade 304 Stainless Steel (BPA Free)",
        Warranty: "6 Months Replacement",
        Compatibility: "Universal Hydration"
      },
      features: [
        "OLED Touch Temperature Display",
        "Timed Glow Ring Alerts to Drink Water",
        "24hr Ice-Cold / 12hr Steaming Hot Retention",
        "100% Leak-Proof Magnetic Cap Seal",
        "Eco-friendly Food Grade Coated Finish"
      ],
      included: [
        "1x PureHydrate 1000ml Flask",
        "1x Smart OLED Cap",
        "1x Type-C Charging Cord",
        "1x Cleaning Sponge Brush"
      ]
    },
    {
      id: "prod_3",
      name: "Vitalora Precision Body Composition Smart Scale",
      tagline: "14 Bio-Impedance parameters with wireless sync",
      description: "Measures Weight, BMI, Body Fat %, Muscle Mass, Visceral Fat, Bone Mass, BMR, and Water Weight with surgical high-precision ITO glass sensors.",
      category: "Health Tracking Devices",
      price: 2499,
      originalPrice: 3999,
      discount: 37,
      rating: 4.9,
      reviewsCount: 2310,
      badge: "Editor's Choice",
      stock: 38,
      images: [
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80"
      ],
      specs: {
        Brand: "Vitalora Health",
        Model: "SC-BIA-200",
        Weight: "1.4 kg",
        Dimensions: "300 x 300 x 24 mm",
        Battery: "3x AAA batteries (included, 12 months life)",
        Material: "6mm Tempered ITO Conductive Glass",
        Warranty: "2 Years Replacement",
        Compatibility: "Android & iOS Vitalora Direct Sync"
      },
      features: [
        "14 Comprehensive Body Health Metrics",
        "High Sensitivity G-type Strain Sensors (0.05kg accuracy)",
        "Unlimited Family Profiles Auto-Recognition",
        "Hidden LED Hidden Digital Matrix Display",
        "Instant Bluetooth 5.2 Auto-Sync"
      ],
      included: [
        "1x Smart Scale",
        "3x Heavy-duty AAA Batteries",
        "1x User Handbook"
      ]
    },
    {
      id: "prod_4",
      name: "Vitalora Pro Recovery Percussive Massage Gun",
      tagline: "Deep tissue muscle tension relief & recovery",
      description: "Equipped with a high-torque brushless motor delivering up to 3200 RPM, 6 interchangeable therapy heads, and whisper-quiet acoustic dampening technology.",
      category: "Yoga & Recovery",
      price: 3499,
      originalPrice: 5999,
      discount: 41,
      rating: 4.7,
      reviewsCount: 740,
      badge: "High Performance",
      stock: 25,
      images: [
        "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"
      ],
      specs: {
        Brand: "Vitalora Gear",
        Model: "MG-PERCUSS-X",
        Weight: "850 grams",
        Dimensions: "220 x 170 x 60 mm",
        Battery: "2600 mAh Li-ion (6 hours run time)",
        Material: "Reinforced ABS + Ergonomic Silicone Grip",
        Warranty: "1 Year Official Warranty",
        Compatibility: "All Athletes & Recovery"
      },
      features: [
        "30 Speed Adjustable Levels (1200 - 3200 RPM)",
        "6 Specialized Therapeutic Massage Heads",
        "QuietGlide Noise Reduction (< 40 dB)",
        "AI Smart Pressure Sensing LCD Screen",
        "Carrying Hard Travel Case Included"
      ],
      included: [
        "1x Vitalora Massage Gun",
        "6x Therapy Head Attachments",
        "1x Fast Charger",
        "1x Hard Shell Travel Bag"
      ]
    },
    {
      id: "prod_5",
      name: "Ultra-Grip Eco TPE Alignment Yoga Mat (6mm)",
      tagline: "Dual-sided non-slip with laser-etched alignment guides",
      description: "Biodegradable, odorless eco-friendly TPE foam with premium 6mm joint-cushioning and laser-printed posture alignment lines for perfect form.",
      category: "Yoga & Recovery",
      price: 1299,
      originalPrice: 1999,
      discount: 35,
      rating: 4.8,
      reviewsCount: 1105,
      badge: "Eco Friendly",
      stock: 80,
      images: [
        "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
      ],
      specs: {
        Brand: "Vitalora Zen",
        Model: "YM-ECO-6MM",
        Weight: "900 grams",
        Dimensions: "183 x 61 x 0.6 cm",
        Battery: "N/A",
        Material: "Non-toxic Biodegradable TPE (PVC/Latex Free)",
        Warranty: "6 Months",
        Compatibility: "Yoga, Pilates, Floor Stretches"
      },
      features: [
        "Body Line Alignment Engravings",
        "Dual-Layer Anti-Tear Grid Mesh",
        "Wet & Dry Superior Sweat Traction",
        "Includes Free Carrying Shoulder Strap",
        "Easy Wipe Clean Waterproof Surface"
      ],
      included: [
        "1x Premium 6mm Yoga Mat",
        "1x Durable Carrying Strap",
        "1x Mesh Carry Bag"
      ]
    },
    {
      id: "prod_6",
      name: "Vitalora Hydrolyzed Whey Isolate (1kg - Belgian Chocolate)",
      tagline: "27g Pure Protein per scoop with BCAAs & Digestive Enzymes",
      description: "Ultra-filtered 100% grass-fed whey isolate delivering 27g protein, 5.8g BCAAs, zero added sugar, and DigeZyme enzymes for rapid absorption.",
      category: "Protein/Fitness Nutrition",
      price: 2499,
      originalPrice: 3499,
      discount: 28,
      rating: 4.9,
      reviewsCount: 3120,
      badge: "Top Rated",
      stock: 120,
      images: [
        "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=800&q=80"
      ],
      specs: {
        Brand: "Vitalora Nutrition",
        Model: "ISO-WHEY-1KG",
        Weight: "1.0 kg (30 Servings)",
        Dimensions: "Container Tub",
        Battery: "N/A",
        Material: "Hydrolyzed Whey Protein Isolate",
        Warranty: "Authenticity Sealed Guarantee",
        Compatibility: "Post-workout recovery & daily macros"
      },
      features: [
        "27g Ultra-Pure Protein per 33g scoop",
        "5.8g Naturally Occurring BCAAs",
        "Zero Added Sugar & Low Carbs (<1g)",
        "Enriched with DigeZyme for zero bloating",
        "Labdoor Tested 100% Heavy-Metal Safe"
      ],
      included: [
        "1x 1kg Sealed Protein Tub",
        "1x Measuring 33g Scoop"
      ]
    },
    {
      id: "prod_7",
      name: "Vitalora Cast Iron Adjustable Kettlebell (4kg - 18kg)",
      tagline: "7-in-1 space-saving weight system with rapid dial lock",
      description: "Replace seven individual kettlebells with one modular cast-iron apparatus. Effortlessly switch weights from 4kg to 18kg in seconds.",
      category: "Fitness Equipment",
      price: 5999,
      originalPrice: 8999,
      discount: 33,
      rating: 4.8,
      reviewsCount: 420,
      badge: "Heavy Duty",
      stock: 18,
      images: [
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80"
      ],
      specs: {
        Brand: "Vitalora Forge",
        Model: "KB-ADJUST-18",
        Weight: "18 kg total",
        Dimensions: "28 x 22 x 34 cm",
        Battery: "N/A",
        Material: "Heavy-gauge Solid Cast Iron + Powder Coat",
        Warranty: "3 Years Structural Warranty",
        Compatibility: "Home Gym & Strength Training"
      },
      features: [
        "Quick Safety Slide-Lock Weight Selector",
        "Textured Ergonomic Anti-Slip Grip",
        "Rubber Base to Protect Flooring",
        "Weights: 4, 6, 8, 10, 12, 16, 18 kg",
        "Compact Living Space Friendly"
      ],
      included: [
        "1x Modular Kettlebell Core Unit",
        "6x Precision Iron Weight Plates",
        "1x Exercise Workout Wall Poster"
      ]
    },
    {
      id: "prod_8",
      name: "Vitalora SleepDeep Weighted Gravity Blanket (6.8kg)",
      tagline: "Therapeutic deep touch pressure for restorative sleep",
      description: "Engineered to promote serotonin and melatonin release naturally. Made with 100% breathable organic bamboo fabric and micro-glass beads.",
      category: "Sleep & Recovery",
      price: 3299,
      originalPrice: 4999,
      discount: 34,
      rating: 4.9,
      reviewsCount: 960,
      badge: "Sleep Essential",
      stock: 35,
      images: [
        "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80"
      ],
      specs: {
        Brand: "Vitalora SleepLab",
        Model: "WB-BAMBOO-15",
        Weight: "6.8 kg (15 lbs)",
        Dimensions: "150 x 200 cm (Queen size)",
        Battery: "N/A",
        Material: "Organic Bamboo Rayon + Micro Glass Beads",
        Warranty: "1 Year Stitching Warranty",
        Compatibility: "Adults 55kg - 85kg"
      },
      features: [
        "Deep Touch Pressure (DTP) Calming Stimulation",
        "Breathable Cooling Bamboo Cover",
        "Even Weight Distribution in 4x4-inch Pockets",
        "Hypoallergenic & Non-toxic Glass Beads",
        "Machine Washable Removable Duvet"
      ],
      included: [
        "1x Weighted Blanket Core",
        "1x Bamboo Cooling Duvet Cover",
        "1x Storage Carry Case"
      ]
    },
    {
      id: "prod_9",
      name: "Vitalora AeroSpeed Pro Running Belt & Hydration Pack",
      tagline: "Bounce-free waterproof pouch with dual 250ml flasks",
      description: "Ultralight, breathable reflective running belt designed for long-distance marathoners. Holds phone up to 6.8 inches, keys, nutrition gels, and two 250ml soft flasks.",
      category: "Running Accessories",
      price: 899,
      originalPrice: 1499,
      discount: 40,
      rating: 4.6,
      reviewsCount: 530,
      badge: "Marathon Ready",
      stock: 95,
      images: [
        "https://images.unsplash.com/photo-1502224562085-639556652f33?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80"
      ],
      specs: {
        Brand: "Vitalora Speed",
        Model: "RB-MARATHON-X",
        Weight: "140 grams",
        Dimensions: "Adjustable waist 26 to 44 inches",
        Battery: "N/A",
        Material: "Ripstop Waterproof Nylon + 3D Mesh",
        Warranty: "6 Months",
        Compatibility: "All smartphones & running gear"
      },
      features: [
        "Guaranteed Zero-Bounce Ergonomic Fit",
        "360-Degree Night Safety Reflective Strips",
        "Headphone Cord Cable Pass-through",
        "Sweatproof TPU Internal Lining",
        "Includes Two 250ml BPA-free Soft Flasks"
      ],
      included: [
        "1x AeroSpeed Running Belt",
        "2x 250ml Bite-valve Soft Flasks"
      ]
    },
    {
      id: "prod_10",
      name: "Vitalora Heavy-Duty Resistance Loop Bands Set (5 Levels)",
      tagline: "100% natural Malaysian latex bands with workout guide",
      description: "Five color-coded resistance bands ranging from X-Light (5 lbs) to X-Heavy (40 lbs). Perfect for strength training, warmups, rehabilitation, and glute activation.",
      category: "Gym Accessories",
      price: 499,
      originalPrice: 999,
      discount: 50,
      rating: 4.8,
      reviewsCount: 4120,
      badge: "Value Pick",
      stock: 150,
      images: [
        "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80"
      ],
      specs: {
        Brand: "Vitalora Power",
        Model: "RB-SET-5PK",
        Weight: "160 grams set",
        Dimensions: "60 x 5 cm each loop",
        Battery: "N/A",
        Material: "100% Natural Latex",
        Warranty: "1 Year Snap-Resistance Warranty",
        Compatibility: "Warmups, Calisthenics, Mobility"
      },
      features: [
        "5 Calibrated Resistances (5lb, 10lb, 20lb, 30lb, 40lb)",
        "Snap-Proof Elastic Memory Technology",
        "Skin-Friendly Smooth Finish",
        "Includes Waterproof Travel Drawstring Pouch",
        "Comprehensive 40-Exercise Illustrated Guide"
      ],
      included: [
        "5x Color-Coded Loop Bands",
        "1x Carry Pouch",
        "1x Illustrated Exercise Guide"
      ]
    }
  ],

  cart: [
    {
      productId: "prod_1",
      quantity: 1
    },
    {
      productId: "prod_2",
      quantity: 2
    }
  ],

  orders: [
    {
      id: "VIT-98241",
      date: "2026-10-02",
      items: [
        { productId: "prod_1", name: "Vitalora Smart Fitness Band Pro", price: 2999, quantity: 1 },
        { productId: "prod_2", name: "PureHydrate Smart LED Temp Bottle", price: 1499, quantity: 2 }
      ],
      subtotal: 5997,
      discount: 1000,
      delivery: 0,
      total: 4997,
      status: "In Transit",
      estimatedDelivery: "06 Oct 2026",
      shippingAddress: {
        name: "Aarav Sharma",
        phone: "+91 98765 43210",
        address: "Flat 402, Lotus Grand Residences, Indiranagar",
        city: "Bengaluru",
        state: "Karnataka",
        pincode: "560038"
      },
      paymentMethod: "UPI (Google Pay)"
    }
  ],

  wishlist: ["prod_3", "prod_6"],

  badges: [
    { id: "b_1", title: "7 Day Streak", icon: "🏆", desc: "Logged health metrics for 7 consecutive days", unlocked: true, date: "2026-10-04" },
    { id: "b_2", title: "Hydration Hero", icon: "💧", desc: "Reached 2.5L daily hydration target 5 days in a row", unlocked: true, date: "2026-10-03" },
    { id: "b_3", title: "50K Steps Club", icon: "🚶", desc: "Accumulated over 50,000 steps this week", unlocked: true, date: "2026-10-02" },
    { id: "b_4", title: "Workout Warrior", icon: "💪", desc: "Completed 5 intense workout sessions in a single week", unlocked: true, date: "2026-10-01" },
    { id: "b_5", title: "Sleep Champion", icon: "😴", desc: "Achieved optimal 8 hours of restorative sleep", unlocked: true, date: "2026-09-30" },
    { id: "b_6", title: "Calorie Crusher", icon: "🔥", desc: "Burned 3,500 active calories across workouts", unlocked: false, date: null },
    { id: "b_7", title: "Mind & Body Master", icon: "🧘", desc: "Completed 10 mindful recovery or yoga sessions", unlocked: false, date: null }
  ],

  reminders: [
    { id: "rem_1", label: "Drink Water", time: "Every 90 mins", enabled: true, icon: "droplet" },
    { id: "rem_2", label: "Daily Exercise", time: "05:30 PM", enabled: true, icon: "activity" },
    { id: "rem_3", label: "Bedtime Wind Down", time: "10:30 PM", enabled: true, icon: "moon" },
    { id: "rem_4", label: "Log Weight", time: "07:30 AM (Sundays)", enabled: true, icon: "scale" },
    { id: "rem_5", label: "Log Meals", time: "After Breakfast, Lunch, Dinner", enabled: false, icon: "utensils" }
  ],

  connectedDevices: [
    { id: "dev_apple", name: "Apple Health", icon: "heart", status: "Connected", synced: "2 mins ago", battery: "100%", type: "Mobile Health Platform" },
    { id: "dev_band", name: "Vitalora Band Pro", icon: "watch", status: "Connected", synced: "Just now", battery: "84%", type: "Smart Wearable" },
    { id: "dev_gfit", name: "Google Fit", icon: "activity", status: "Disconnected", synced: "Never", battery: null, type: "Health Service" },
    { id: "dev_smartwatch", name: "Wear OS Smartwatch", icon: "disc", status: "Disconnected", synced: "Never", battery: null, type: "Wearable Device" }
  ],

  timelineDays: [
    {
      day: "Sunday (Today)",
      date: "04 Oct 2026",
      steps: 7842,
      water: 1.8,
      sleep: "7h 24m",
      workout: "45 min",
      score: 87,
      highlights: "Morning 30m run + evening stretch, 1.8L water logged"
    },
    {
      day: "Saturday",
      date: "03 Oct 2026",
      steps: 8900,
      water: 2.3,
      sleep: "8h 30m",
      workout: "45 min",
      score: 89,
      highlights: "Strength workout completed, optimal 8.5h sleep cycle"
    },
    {
      day: "Friday",
      date: "02 Oct 2026",
      steps: 11200,
      water: 2.6,
      sleep: "7h 12m",
      workout: "60 min",
      score: 90,
      highlights: "10k step milestone passed, cycle sprint session"
    },
    {
      day: "Thursday",
      date: "01 Oct 2026",
      steps: 9810,
      water: 2.4,
      sleep: "7h 48m",
      workout: "50 min",
      score: 88,
      highlights: "35m swim session, balanced macros maintained"
    },
    {
      day: "Wednesday",
      date: "30 Sep 2026",
      steps: 6940,
      water: 2.0,
      sleep: "6h 48m",
      workout: "30 min",
      score: 76,
      highlights: "Rest recovery day, late work wrap-up"
    },
    {
      day: "Tuesday",
      date: "29 Sep 2026",
      steps: 10420,
      water: 2.5,
      sleep: "8h 00m",
      workout: "55 min",
      score: 92,
      highlights: "Highest wellness score day, 100% goals hit"
    },
    {
      day: "Monday",
      date: "28 Sep 2026",
      steps: 8520,
      water: 2.2,
      sleep: "7h 30m",
      workout: "40 min",
      score: 84,
      highlights: "Week kicked off with brisk morning run"
    }
  ],

  aiChatHistory: [
    {
      sender: "ai",
      time: "10:00 AM",
      text: "Hello Aarav! I'm your VITALORA AI Coach. I've reviewed your biometric summary for today: you're already at 78% of your step goal (7,842 steps) and your sleep efficiency was 92% last night. How can I help you optimize your health and recovery today?"
    }
  ]
};

window.VITALORA_INITIAL_DATA = INITIAL_DATA;
