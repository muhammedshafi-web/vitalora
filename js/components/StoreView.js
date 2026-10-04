// VITALORA - Health & Fitness Products Store (Mini E-Commerce)

window.selectedCategory = "All";
window.productSearchQuery = "";
window.productSortBy = "featured";

window.renderStoreView = function() {
  const store = window.vitaloraStore;
  const state = store.getState();
  const products = state.products;
  const wishlist = state.wishlist || [];

  const categories = [
    "All",
    "Smart Wearables",
    "Water Bottles",
    "Health Tracking Devices",
    "Yoga & Recovery",
    "Protein/Fitness Nutrition",
    "Fitness Equipment",
    "Running Accessories",
    "Gym Accessories",
    "Sleep & Recovery"
  ];

  // Filtering
  let filtered = products.filter(p => {
    const matchesCat = window.selectedCategory === "All" || p.category === window.selectedCategory;
    const matchesSearch = !window.productSearchQuery || 
      p.name.toLowerCase().includes(window.productSearchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(window.productSearchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Sorting
  if (window.productSortBy === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (window.productSortBy === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (window.productSortBy === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return `
    <div class="pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <!-- STORE HERO BANNER -->
      <div class="rounded-3xl glass-panel p-6 sm:p-10 border border-slate-200/80 dark:border-white/10 bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-cyan-500/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="space-y-3 text-center md:text-left">
          <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
            <span>⚡ OFFICIAL VITALORA WELLNESS STORE</span>
          </div>
          <h1 class="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Premium Health Gear & Nutrition
          </h1>
          <p class="text-sm text-slate-600 dark:text-slate-300 max-w-xl">
            Clinically vetted recovery devices, smart wearables, BPA-free hydration bottles, and pure micro-filtered sports nutrition.
          </p>
        </div>

        <div class="flex items-center space-x-3 self-center md:self-auto">
          <button 
            onclick="window.toggleCartModal(true)" 
            class="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-xl shadow-emerald-500/25 flex items-center space-x-2.5 transition-all"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
            <span>View Cart (${store.getCartSummary().itemCount})</span>
          </button>
        </div>
      </div>

      <!-- SEARCH, SORT & CATEGORIES FILTER BAR -->
      <div class="space-y-4">
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <!-- Search input -->
          <div class="relative flex-1 max-w-md">
            <svg class="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input 
              type="text" 
              placeholder="Search equipment, bands, whey, bottles..." 
              value="${window.productSearchQuery}"
              oninput="window.productSearchQuery = this.value; window.renderApp();"
              class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-sm focus:outline-none focus:border-emerald-500 font-medium"
            />
          </div>

          <!-- Sort select -->
          <div class="flex items-center space-x-2 text-xs">
            <span class="text-slate-400 font-semibold">Sort By:</span>
            <select 
              onchange="window.productSortBy = this.value; window.renderApp();"
              class="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-white/10 font-bold text-slate-700 dark:text-slate-200 focus:outline-none"
            >
              <option value="featured" ${window.productSortBy === 'featured' ? 'selected' : ''}>Featured & Best Sellers</option>
              <option value="rating" ${window.productSortBy === 'rating' ? 'selected' : ''}>Highest Customer Rating</option>
              <option value="price-low" ${window.productSortBy === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
              <option value="price-high" ${window.productSortBy === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
            </select>
          </div>
        </div>

        <!-- Scrollable Category Pills -->
        <div class="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          ${categories.map(cat => `
            <button 
              onclick="window.selectedCategory = '${cat}'; window.renderApp();"
              class="flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                window.selectedCategory === cat 
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' 
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
              }"
            >
              ${cat}
            </button>
          `).join('')}
        </div>

      </div>

      <!-- PRODUCTS GRID (10+ Realistic Products with Indian Pricing) -->
      ${filtered.length > 0 ? `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          ${filtered.map(p => {
            const isWish = wishlist.includes(p.id);
            return `
              <div class="rounded-3xl glass-panel p-5 card-lift flex flex-col justify-between border border-slate-200/80 dark:border-white/10 group">
                
                <!-- Product Image & Overlay Badges -->
                <div class="relative h-56 rounded-2xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800 cursor-pointer" onclick="window.openProductDetailModal('${p.id}')">
                  <img src="${p.images[0]}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  
                  <div class="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                    <span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500 text-white shadow">
                      ${p.discount}% OFF
                    </span>
                    ${p.badge ? `
                      <span class="px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-900/80 text-white backdrop-blur border border-white/20">
                        ${p.badge}
                      </span>
                    ` : ''}
                  </div>

                  <!-- Wishlist Heart Toggle Icon -->
                  <button 
                    onclick="window.toggleProductWishlist('${p.id}', event)" 
                    class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur flex items-center justify-center text-rose-500 hover:scale-110 transition-transform shadow"
                    title="${isWish ? 'Remove from wishlist' : 'Add to wishlist'}"
                  >
                    <svg class="w-4 h-4 ${isWish ? 'fill-rose-500 text-rose-500' : 'fill-none text-slate-400'}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                  </button>
                </div>

                <!-- Product Details -->
                <div class="space-y-2 flex-1">
                  <div class="flex items-center justify-between text-xs">
                    <span class="text-emerald-500 font-bold uppercase tracking-wider text-[10px]">${p.category}</span>
                    <div class="flex items-center space-x-1 text-amber-400 font-bold">
                      <span>★ ${p.rating}</span>
                      <span class="text-slate-400 font-normal">(${p.reviewsCount})</span>
                    </div>
                  </div>

                  <h3 
                    onclick="window.openProductDetailModal('${p.id}')"
                    class="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors cursor-pointer line-clamp-1"
                  >
                    ${p.name}
                  </h3>

                  <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    ${p.description}
                  </p>
                </div>

                <!-- Pricing & Action Buttons (View Details, Add to Cart) -->
                <div class="mt-5 pt-4 border-t border-slate-100 dark:border-white/5 space-y-3">
                  <div class="flex items-baseline space-x-2">
                    <span class="text-xl font-black text-slate-900 dark:text-white">₹${p.price.toLocaleString()}</span>
                    <span class="text-xs text-slate-400 line-through">₹${p.originalPrice.toLocaleString()}</span>
                    <span class="text-[11px] font-bold text-emerald-500 ml-auto">Free Delivery</span>
                  </div>

                  <div class="grid grid-cols-2 gap-2">
                    <button 
                      onclick="window.openProductDetailModal('${p.id}')"
                      class="w-full py-2.5 rounded-xl border border-slate-300 dark:border-white/10 hover:border-emerald-500/50 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-center"
                    >
                      View Details
                    </button>

                    <button 
                      onclick="window.vitaloraStore.addToCart('${p.id}', 1); window.showToast('Added ${p.name} to cart 🛍️'); window.renderApp();"
                      class="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all text-center flex items-center justify-center space-x-1"
                    >
                      <span>+ Cart</span>
                    </button>
                  </div>
                </div>

              </div>
            `;
          }).join('')}
        </div>
      ` : `
        <!-- Beautiful Empty State -->
        <div class="p-16 rounded-3xl glass-panel text-center space-y-4 max-w-md mx-auto">
          <div class="text-5xl">🔍</div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white">No products found</h3>
          <p class="text-xs text-slate-400">Try adjusting your search query or reset category filter.</p>
          <button 
            onclick="window.selectedCategory = 'All'; window.productSearchQuery = ''; window.renderApp();"
            class="px-5 py-2.5 rounded-xl bg-emerald-500 text-white text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      `}

    </div>
  `;
};

window.toggleProductWishlist = function(productId, event) {
  if (event) event.stopPropagation();
  window.vitaloraStore.toggleWishlist(productId);
  window.renderApp();
  const isWish = window.vitaloraStore.getState().wishlist.includes(productId);
  window.showToast(isWish ? "Added to your wishlist ❤️" : "Removed from wishlist");
};
