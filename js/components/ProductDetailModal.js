// VITALORA - Dedicated Product Detail Page with Advanced Zoom & Pan Interaction

window.currentProductDetailId = null;
window.selectedImageIndex = 0;
window.zoomLevel = 1.0;
window.zoomPanX = 0;
window.zoomPanY = 0;
window.isDraggingZoom = false;
window.dragStartX = 0;
window.dragStartY = 0;
window.productQty = 1;

window.openProductDetailModal = function(productId) {
  window.currentProductDetailId = productId;
  window.selectedImageIndex = 0;
  window.zoomLevel = 1.0;
  window.zoomPanX = 0;
  window.zoomPanY = 0;
  window.productQty = 1;
  window.renderProductDetailModal();
};

window.closeProductDetailModal = function() {
  window.currentProductDetailId = null;
  const container = document.getElementById("productDetailContainer");
  if (container) container.innerHTML = "";
};

window.renderProductDetailModal = function() {
  const container = document.getElementById("productDetailContainer");
  if (!container || !window.currentProductDetailId) return;

  const store = window.vitaloraStore;
  const product = store.getState().products.find(p => p.id === window.currentProductDetailId);
  if (!product) return;

  const isWish = store.getState().wishlist.includes(product.id);
  const related = store.getState().products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);
  if (related.length === 0) {
    related.push(...store.getState().products.filter(p => p.id !== product.id).slice(0, 3));
  }

  const currentImg = product.images[window.selectedImageIndex] || product.images[0];

  container.innerHTML = `
    <div id="productModalBackdrop" class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 modal-overlay overflow-y-auto">
      <div class="relative w-full max-w-5xl rounded-3xl glass-panel p-4 sm:p-8 shadow-2xl border border-white/20 my-6 text-slate-900 dark:text-white max-h-[92vh] overflow-y-auto" style="background-color: var(--bg-card);">
        
        <!-- Close Button & Category Bar -->
        <div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10 mb-6 sticky top-0 bg-inherit backdrop-blur-md z-30">
          <div class="flex items-center space-x-2 text-xs font-semibold text-slate-400">
            <span class="cursor-pointer hover:text-emerald-500" onclick="window.closeProductDetailModal(); window.navigateTo('products')">Store</span>
            <span>/</span>
            <span class="text-emerald-500">${product.category}</span>
          </div>

          <button onclick="window.closeProductDetailModal()" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <!-- PRODUCT TOP HERO (Gallery + Zoom + Buying Box) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- LEFT: IMAGE GALLERY & ADVANCED ZOOM INTERACTION -->
          <div class="lg:col-span-6 space-y-4">
            
            <!-- Zoom Stage Container -->
            <div 
              id="zoomContainer"
              class="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-900/5 dark:bg-slate-950 border border-slate-200 dark:border-white/10 cursor-crosshair select-none flex items-center justify-center shadow-inner"
              onwheel="window.handleWheelZoom(event)"
              onmousedown="window.startZoomDrag(event)"
              onmousemove="window.doZoomDrag(event)"
              onmouseup="window.endZoomDrag(event)"
              onmouseleave="window.endZoomDrag(event)"
              ontouchstart="window.handleTouchStart(event)"
              ontouchmove="window.handleTouchMove(event)"
              ontouchend="window.handleTouchEnd(event)"
            >
              <!-- Zoomable Image -->
              <img 
                id="activeZoomImage"
                src="${currentImg}" 
                alt="${product.name}" 
                class="max-w-full max-h-full object-contain zoom-image transition-transform duration-75 pointer-events-none"
                style="transform: scale(${window.zoomLevel}) translate(${window.zoomPanX}px, ${window.zoomPanY}px);"
              />

              <!-- Zoom Controls Overlay -->
              <div class="absolute bottom-3 right-3 flex items-center space-x-1 p-1 rounded-xl bg-slate-900/80 backdrop-blur-md text-white text-xs z-20 border border-white/20">
                <button onclick="window.adjustZoomLevel(0.25)" class="px-2 py-1 rounded hover:bg-white/20 font-bold" title="Zoom in">+</button>
                <span class="px-1 text-[11px] font-mono">${Math.round(window.zoomLevel * 100)}%</span>
                <button onclick="window.adjustZoomLevel(-0.25)" class="px-2 py-1 rounded hover:bg-white/20 font-bold" title="Zoom out">-</button>
                <button onclick="window.resetZoomLevel()" class="px-2 py-1 rounded hover:bg-white/20 text-[10px]" title="Reset zoom">Reset</button>
              </div>

              <!-- Swipe arrows for image carousel -->
              <button 
                onclick="window.cycleImage(-1)" 
                class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/60 text-white flex items-center justify-center hover:bg-slate-900/90 z-20 transition-all"
                title="Previous image"
              >
                ‹
              </button>
              <button 
                onclick="window.cycleImage(1)" 
                class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/60 text-white flex items-center justify-center hover:bg-slate-900/90 z-20 transition-all"
                title="Next image"
              >
                ›
              </button>

              <div class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/70 backdrop-blur text-[10px] text-white font-medium border border-white/10 z-20">
                Pinch / Scroll / Drag to inspect
              </div>
            </div>

            <!-- Thumbnail Selector Strip -->
            <div class="flex items-center space-x-3 overflow-x-auto pb-1">
              ${product.images.map((img, idx) => `
                <button 
                  onclick="window.selectProductImage(${idx})"
                  class="w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    window.selectedImageIndex === idx 
                      ? 'border-emerald-500 scale-105 shadow-md' 
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }"
                >
                  <img src="${img}" alt="${product.name} ${idx}" class="w-full h-full object-cover" />
                </button>
              `).join('')}
            </div>

          </div>

          <!-- RIGHT: PRODUCT BUYING INFO & PRICING -->
          <div class="lg:col-span-6 space-y-6">
            
            <div class="space-y-2">
              <div class="flex items-center space-x-2 text-xs">
                <div class="flex items-center text-amber-400 font-bold">
                  <span>★★★★★ ${product.rating}</span>
                </div>
                <span class="text-slate-400">•</span>
                <span class="text-slate-500 dark:text-slate-400">${product.reviewsCount.toLocaleString()} verified customer reviews</span>
              </div>

              <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                ${product.name}
              </h2>
              <p class="text-xs text-slate-500 dark:text-slate-400">${product.tagline}</p>
            </div>

            <!-- Pricing Banner -->
            <div class="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
              <div>
                <div class="flex items-baseline space-x-3">
                  <span class="text-3xl font-black text-slate-900 dark:text-white">₹${product.price.toLocaleString()}</span>
                  <span class="text-sm text-slate-400 line-through">₹${product.originalPrice.toLocaleString()}</span>
                  <span class="px-2 py-0.5 rounded text-xs font-extrabold bg-emerald-500 text-white">
                    ${product.discount}% OFF
                  </span>
                </div>
                <span class="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-1 block">
                  Limited-time offer • Inclusive of all taxes
                </span>
              </div>
              <div class="text-right">
                <span class="text-xs text-emerald-500 font-bold block">In Stock (${product.stock} units)</span>
                <span class="text-[10px] text-slate-400">Dispatch in 24 hrs</span>
              </div>
            </div>

            <!-- Quantity Selector & Action Buttons -->
            <div class="space-y-4">
              <div class="flex items-center space-x-4">
                <span class="text-xs font-bold text-slate-700 dark:text-slate-300">Quantity:</span>
                <div class="flex items-center space-x-2 bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl p-1">
                  <button onclick="window.changeProductQty(-1)" class="w-8 h-8 rounded-lg flex items-center justify-center font-bold hover:bg-slate-200 dark:hover:bg-white/10">-</button>
                  <span class="w-8 text-center text-sm font-bold">${window.productQty}</span>
                  <button onclick="window.changeProductQty(1)" class="w-8 h-8 rounded-lg flex items-center justify-center font-bold hover:bg-slate-200 dark:hover:bg-white/10">+</button>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button 
                  onclick="window.vitaloraStore.addToCart('${product.id}', window.productQty); window.showToast('Added ${product.name} to cart 🛍️'); window.renderApp();"
                  class="py-3.5 px-4 rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                  <span>Add to Cart</span>
                </button>

                <button 
                  onclick="window.vitaloraStore.addToCart('${product.id}', window.productQty); window.closeProductDetailModal(); window.openCheckoutModal();"
                  class="py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all text-center"
                >
                  Buy Now
                </button>

                <button 
                  onclick="window.toggleProductWishlist('${product.id}'); window.renderProductDetailModal();"
                  class="py-3.5 px-4 rounded-xl border border-slate-300 dark:border-white/10 hover:border-rose-500/50 text-slate-700 dark:text-slate-200 font-bold text-xs transition-all flex items-center justify-center space-x-1.5"
                >
                  <svg class="w-4 h-4 ${isWish ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                  <span>${isWish ? 'Wishlisted' : 'Wishlist'}</span>
                </button>
              </div>
            </div>

            <!-- Shipping & Returns Trust Tags -->
            <div class="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div class="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-start space-x-2.5">
                <span class="text-base">🚚</span>
                <div>
                  <span class="font-bold text-slate-900 dark:text-white block">Express Shipping</span>
                  <span class="text-slate-500 dark:text-slate-400 text-[11px]">Free delivery in 2-3 business days across India</span>
                </div>
              </div>

              <div class="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-start space-x-2.5">
                <span class="text-base">🔄</span>
                <div>
                  <span class="font-bold text-slate-900 dark:text-white block">7-Day Replacement</span>
                  <span class="text-slate-500 dark:text-slate-400 text-[11px]">Hassle-free doorstep pickup & replacement guarantee</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        <!-- PRODUCT INFORMATION TABS & SECTIONS -->
        <div class="mt-12 pt-8 border-t border-slate-200 dark:border-white/10 space-y-8">
          
          <!-- Product Overview -->
          <div class="space-y-3">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">Product Overview</h3>
            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              ${product.description} Engineered to meet high-performance physiological standards, this product interfaces directly with active wellness workflows to deliver sustained metabolic and biometric feedback.
            </p>
          </div>

          <!-- Key Features -->
          <div class="space-y-3">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">Key Features</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              ${(product.features || []).map(f => `
                <div class="flex items-center space-x-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <span class="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-[10px]">✓</span>
                  <span>${f}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Specifications Table -->
          <div class="space-y-3">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">Technical Specifications</h3>
            <div class="rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden divide-y divide-slate-200 dark:divide-white/10 text-xs">
              ${Object.entries(product.specs || {}).map(([key, val]) => `
                <div class="grid grid-cols-3 p-3 bg-slate-50/50 dark:bg-white/[0.02]">
                  <span class="font-bold text-slate-500 dark:text-slate-400">${key}</span>
                  <span class="col-span-2 font-medium text-slate-900 dark:text-white">${val}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- What's Included -->
          <div class="space-y-3">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">What's in the Box</h3>
            <ul class="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300">
              ${(product.included || []).map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>

          <!-- Verified Customer Reviews Section -->
          <div class="space-y-4 pt-4 border-t border-slate-200 dark:border-white/10">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">Customer Reviews</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2 text-xs">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-slate-900 dark:text-white">Rohan K., Bengaluru</span>
                  <span class="text-amber-400 font-bold">★★★★★ 5.0</span>
                </div>
                <p class="text-slate-600 dark:text-slate-300">
                  "Exceeded my expectations. The biometric sync with the VITALORA app is seamless, and battery longevity matches the stated specs perfectly."
                </p>
                <span class="text-[10px] text-emerald-500 font-semibold block">✓ Verified Buyer • 2 weeks ago</span>
              </div>

              <div class="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2 text-xs">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-slate-900 dark:text-white">Pooja M., Mumbai</span>
                  <span class="text-amber-400 font-bold">★★★★★ 5.0</span>
                </div>
                <p class="text-slate-600 dark:text-slate-300">
                  "High quality materials with durable construction. Delivery was prompt and packaging was immaculate. Definitely recommend."
                </p>
                <span class="text-[10px] text-emerald-500 font-semibold block">✓ Verified Buyer • 1 month ago</span>
              </div>
            </div>
          </div>

          <!-- Related Products Carousel -->
          <div class="space-y-4 pt-4 border-t border-slate-200 dark:border-white/10">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">Related Products</h3>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              ${related.map(rel => `
                <div class="p-3 rounded-2xl glass-panel border border-slate-200 dark:border-white/10 flex items-center space-x-3 cursor-pointer hover:border-emerald-500 transition-all" onclick="window.openProductDetailModal('${rel.id}')">
                  <img src="${rel.images[0]}" alt="${rel.name}" class="w-14 h-14 rounded-xl object-cover" />
                  <div class="flex-1 min-w-0">
                    <h5 class="text-xs font-bold text-slate-900 dark:text-white truncate">${rel.name}</h5>
                    <span class="text-xs font-black text-emerald-500">₹${rel.price.toLocaleString()}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>

      </div>
    </div>
  `;
};

// --- ADVANCED PRODUCT ZOOM & EDGE SWIPE ENGINE ---
window.adjustZoomLevel = function(delta) {
  window.zoomLevel = Math.max(1.0, Math.min(3.5, window.zoomLevel + delta));
  if (window.zoomLevel === 1.0) {
    window.zoomPanX = 0;
    window.zoomPanY = 0;
  }
  window.updateZoomTransform();
};

window.resetZoomLevel = function() {
  window.zoomLevel = 1.0;
  window.zoomPanX = 0;
  window.zoomPanY = 0;
  window.updateZoomTransform();
};

window.updateZoomTransform = function() {
  const img = document.getElementById("activeZoomImage");
  if (img) {
    img.style.transform = `scale(${window.zoomLevel}) translate(${window.zoomPanX}px, ${window.zoomPanY}px)`;
  }
};

window.handleWheelZoom = function(e) {
  e.preventDefault();
  const delta = e.deltaY < 0 ? 0.2 : -0.2;
  window.adjustZoomLevel(delta);
};

window.startZoomDrag = function(e) {
  if (window.zoomLevel > 1.0) {
    window.isDraggingZoom = true;
    window.dragStartX = e.clientX - window.zoomPanX;
    window.dragStartY = e.clientY - window.zoomPanY;
  }
};

window.doZoomDrag = function(e) {
  if (!window.isDraggingZoom) return;
  window.zoomPanX = e.clientX - window.dragStartX;
  window.zoomPanY = e.clientY - window.dragStartY;

  // Boundary Edge check: if dragged far past edges, cycle to next image!
  const limitX = 180 * (window.zoomLevel - 0.8);
  if (window.zoomPanX > limitX + 40) {
    window.isDraggingZoom = false;
    window.cycleImage(-1);
    return;
  } else if (window.zoomPanX < -limitX - 40) {
    window.isDraggingZoom = false;
    window.cycleImage(1);
    return;
  }

  window.updateZoomTransform();
};

window.endZoomDrag = function() {
  window.isDraggingZoom = false;
};

// Touch gestures (Pinch / Mobile swipe)
let touchStartX = 0;
let touchStartY = 0;
window.handleTouchStart = function(e) {
  if (e.touches.length === 1) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    if (window.zoomLevel > 1.0) {
      window.isDraggingZoom = true;
      window.dragStartX = touchStartX - window.zoomPanX;
      window.dragStartY = touchStartY - window.zoomPanY;
    }
  }
};

window.handleTouchMove = function(e) {
  if (e.touches.length === 1 && window.isDraggingZoom) {
    const curX = e.touches[0].clientX;
    const curY = e.touches[0].clientY;
    window.zoomPanX = curX - window.dragStartX;
    window.zoomPanY = curY - window.dragStartY;
    window.updateZoomTransform();
  }
};

window.handleTouchEnd = function(e) {
  if (window.zoomLevel === 1.0 && e.changedTouches.length === 1) {
    const diffX = e.changedTouches[0].clientX - touchStartX;
    if (diffX > 50) {
      window.cycleImage(-1); // swipe right -> previous image
    } else if (diffX < -50) {
      window.cycleImage(1); // swipe left -> next image
    }
  }
  window.isDraggingZoom = false;
};

window.cycleImage = function(direction) {
  const store = window.vitaloraStore;
  const product = store.getState().products.find(p => p.id === window.currentProductDetailId);
  if (!product || !product.images) return;
  const count = product.images.length;
  window.selectedImageIndex = (window.selectedImageIndex + direction + count) % count;
  window.resetZoomLevel();
  window.renderProductDetailModal();
};

window.selectProductImage = function(idx) {
  window.selectedImageIndex = idx;
  window.resetZoomLevel();
  window.renderProductDetailModal();
};

window.changeProductQty = function(delta) {
  window.productQty = Math.max(1, window.productQty + delta);
  window.renderProductDetailModal();
};
