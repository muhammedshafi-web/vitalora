// VITALORA - Shopping Cart Modal & Slide-over Drawer

window.couponCode = "";
window.couponApplied = false;

window.toggleCartModal = function(show) {
  const container = document.getElementById("cartModalContainer");
  if (!container) return;
  if (show) {
    container.innerHTML = window.renderCartModal();
  } else {
    container.innerHTML = "";
  }
};

window.renderCartModal = function() {
  const store = window.vitaloraStore;
  const summary = store.getCartSummary();

  return `
    <div id="cartModalBackdrop" class="fixed inset-0 z-50 flex items-center justify-end modal-overlay">
      <!-- Slide-over Drawer -->
      <div class="relative w-full max-w-md h-full glass-panel shadow-2xl border-l border-white/20 p-6 flex flex-col justify-between text-slate-900 dark:text-white" style="background-color: var(--bg-card);">
        
        <!-- Header -->
        <div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10">
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
            <h3 class="text-lg font-bold">Shopping Cart (${summary.itemCount})</h3>
          </div>

          <button onclick="window.toggleCartModal(false)" class="text-slate-400 hover:text-slate-900 dark:hover:text-white p-1">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <!-- Cart Item List -->
        <div class="flex-1 overflow-y-auto py-4 space-y-3">
          ${summary.items.length > 0 ? summary.items.map(item => `
            <div class="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between gap-3 text-xs">
              <img src="${item.images[0]}" alt="${item.name}" class="w-14 h-14 rounded-xl object-cover bg-slate-100" />
              
              <div class="flex-1 min-w-0">
                <h5 class="font-bold text-slate-900 dark:text-white truncate">${item.name}</h5>
                <span class="text-emerald-500 font-extrabold">₹${item.price.toLocaleString()}</span>
                
                <div class="flex items-center space-x-2 mt-2">
                  <button onclick="window.vitaloraStore.updateCartQty('${item.id}', ${item.quantity - 1}); window.refreshCartModal(); window.renderApp();" class="w-5 h-5 rounded bg-slate-200 dark:bg-white/10 font-bold flex items-center justify-center">-</button>
                  <span class="font-bold">${item.quantity}</span>
                  <button onclick="window.vitaloraStore.updateCartQty('${item.id}', ${item.quantity + 1}); window.refreshCartModal(); window.renderApp();" class="w-5 h-5 rounded bg-slate-200 dark:bg-white/10 font-bold flex items-center justify-center">+</button>
                </div>
              </div>

              <div class="text-right">
                <span class="font-black text-slate-900 dark:text-white block">₹${item.lineTotal.toLocaleString()}</span>
                <button onclick="window.vitaloraStore.removeFromCart('${item.id}'); window.refreshCartModal(); window.renderApp();" class="text-rose-500 text-[11px] hover:underline mt-2">
                  Remove
                </button>
              </div>
            </div>
          `).join('') : `
            <!-- Beautiful Empty State for Cart -->
            <div class="text-center py-16 space-y-4">
              <div class="text-5xl">🛒</div>
              <h4 class="font-bold text-base text-slate-900 dark:text-white">Your cart is empty</h4>
              <p class="text-xs text-slate-400">Explore our health gear, bands, and sports nutrition products.</p>
              <button onclick="window.toggleCartModal(false); window.navigateTo('products');" class="px-5 py-2.5 rounded-xl bg-emerald-500 text-white font-bold text-xs shadow-md">
                Explore Store
              </button>
            </div>
          `}
        </div>

        <!-- Footer Breakdown & Checkout Buttons -->
        ${summary.items.length > 0 ? `
          <div class="pt-4 border-t border-slate-200 dark:border-white/10 space-y-3">
            
            <!-- Coupon Code input -->
            <div class="flex items-center space-x-2">
              <input 
                type="text" 
                placeholder="Discount code (e.g. VITAL10)" 
                value="${window.couponCode}"
                oninput="window.couponCode = this.value"
                class="flex-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs font-semibold focus:outline-none"
              />
              <button 
                onclick="window.applyCouponCode()" 
                class="px-3 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-xs font-bold hover:bg-emerald-500 hover:text-white transition-colors"
              >
                Apply
              </button>
            </div>

            <div class="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
              <div class="flex items-center justify-between">
                <span>Subtotal</span>
                <span class="font-bold text-slate-900 dark:text-white">₹${summary.subtotal.toLocaleString()}</span>
              </div>
              <div class="flex items-center justify-between text-emerald-500">
                <span>Discount</span>
                <span class="font-bold">-₹${summary.discount.toLocaleString()}</span>
              </div>
              <div class="flex items-center justify-between">
                <span>Delivery</span>
                <span class="font-bold text-emerald-500">FREE</span>
              </div>
              <div class="flex items-center justify-between text-sm font-black text-slate-900 dark:text-white pt-2 border-t border-slate-100 dark:border-white/5">
                <span>Total Amount</span>
                <span class="text-lg text-emerald-500">₹${summary.total.toLocaleString()}</span>
              </div>
            </div>

            <div class="space-y-2 pt-2">
              <button 
                onclick="window.toggleCartModal(false); window.openCheckoutModal();" 
                class="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-sm shadow-xl shadow-emerald-500/25 transition-all text-center flex items-center justify-center space-x-2"
              >
                <span>Proceed to Checkout</span>
                <span>→</span>
              </button>

              <button 
                onclick="window.toggleCartModal(false)" 
                class="w-full py-2.5 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white text-xs font-bold transition-colors text-center"
              >
                Continue Shopping
              </button>
            </div>

          </div>
        ` : ''}

      </div>
    </div>
  `;
};

window.refreshCartModal = function() {
  const container = document.getElementById("cartModalContainer");
  if (container && container.innerHTML.trim().length > 0) {
    container.innerHTML = window.renderCartModal();
  }
};

window.applyCouponCode = function() {
  if (window.couponCode.toUpperCase() === "VITAL10") {
    window.showToast("Coupon VITAL10 applied! 10% bonus discount active");
  } else {
    window.showToast("Try coupon 'VITAL10' for extra discounts");
  }
};
