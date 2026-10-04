// VITALORA - Clean 4-Step Checkout Flow & Order Confirmation

window.checkoutStep = 1; // 1: Address, 2: Delivery, 3: Payment, 4: Confirmed
window.checkoutData = {
  name: "Aarav Sharma",
  phone: "+91 98765 43210",
  address: "Flat 402, Lotus Grand Residences, Indiranagar",
  city: "Bengaluru",
  state: "Karnataka",
  pincode: "560038",
  deliveryOption: "Standard Free (2-3 business days)",
  paymentMethod: "UPI (Google Pay / PhonePe)",
  confirmedOrder: null
};

window.openCheckoutModal = function() {
  window.checkoutStep = 1;
  const container = document.getElementById("checkoutModalContainer");
  if (container) {
    container.innerHTML = window.renderCheckoutModal();
  }
};

window.closeCheckoutModal = function() {
  const container = document.getElementById("checkoutModalContainer");
  if (container) container.innerHTML = "";
};

window.renderCheckoutModal = function() {
  const store = window.vitaloraStore;
  const summary = store.getCartSummary();
  const order = window.checkoutData.confirmedOrder;

  return `
    <div id="checkoutModalBackdrop" class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 modal-overlay overflow-y-auto">
      <div class="relative w-full max-w-2xl rounded-3xl glass-panel p-6 sm:p-8 shadow-2xl border border-white/20 my-6 text-slate-900 dark:text-white" style="background-color: var(--bg-card);">
        
        <!-- Header -->
        <div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10 mb-6">
          <div class="flex items-center space-x-2">
            <span class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-sm">
              ${window.checkoutStep === 4 ? '✓' : `${window.checkoutStep}/3`}
            </span>
            <div>
              <h3 class="font-bold text-lg leading-tight">
                ${window.checkoutStep === 4 ? 'Order Confirmed 🎉' : 'VITALORA Express Checkout'}
              </h3>
              <p class="text-xs text-slate-400">Secure 256-bit encrypted checkout</p>
            </div>
          </div>

          <button onclick="window.closeCheckoutModal()" class="text-slate-400 hover:text-white p-1">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <!-- Step Indicator (Only for steps 1-3) -->
        ${window.checkoutStep < 4 ? `
          <div class="grid grid-cols-3 gap-2 mb-6">
            <div class="h-1.5 rounded-full ${window.checkoutStep >= 1 ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-white/10'}"></div>
            <div class="h-1.5 rounded-full ${window.checkoutStep >= 2 ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-white/10'}"></div>
            <div class="h-1.5 rounded-full ${window.checkoutStep >= 3 ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-white/10'}"></div>
          </div>
        ` : ''}

        <!-- STEP 1: SHIPPING ADDRESS -->
        ${window.checkoutStep === 1 ? `
          <div class="space-y-4">
            <h4 class="font-bold text-base text-slate-900 dark:text-white">1. Shipping Address</h4>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold mb-1 text-slate-400">Full Name</label>
                <input 
                  type="text" 
                  value="${window.checkoutData.name}"
                  onchange="window.checkoutData.name = this.value"
                  class="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-sm font-medium focus:outline-none"
                />
              </div>
              <div>
                <label class="block text-xs font-semibold mb-1 text-slate-400">Phone Number</label>
                <input 
                  type="text" 
                  value="${window.checkoutData.phone}"
                  onchange="window.checkoutData.phone = this.value"
                  class="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-sm font-medium focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold mb-1 text-slate-400">Street Address</label>
              <input 
                type="text" 
                value="${window.checkoutData.address}"
                onchange="window.checkoutData.address = this.value"
                class="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-sm font-medium focus:outline-none"
              />
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div>
                <label class="block text-xs font-semibold mb-1 text-slate-400">City</label>
                <input 
                  type="text" 
                  value="${window.checkoutData.city}"
                  onchange="window.checkoutData.city = this.value"
                  class="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs font-medium focus:outline-none"
                />
              </div>
              <div>
                <label class="block text-xs font-semibold mb-1 text-slate-400">State</label>
                <input 
                  type="text" 
                  value="${window.checkoutData.state}"
                  onchange="window.checkoutData.state = this.value"
                  class="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs font-medium focus:outline-none"
                />
              </div>
              <div>
                <label class="block text-xs font-semibold mb-1 text-slate-400">PIN Code</label>
                <input 
                  type="text" 
                  value="${window.checkoutData.pincode}"
                  onchange="window.checkoutData.pincode = this.value"
                  class="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs font-medium focus:outline-none"
                />
              </div>
            </div>
          </div>
        ` : ''}

        <!-- STEP 2: DELIVERY OPTIONS -->
        ${window.checkoutStep === 2 ? `
          <div class="space-y-4">
            <h4 class="font-bold text-base text-slate-900 dark:text-white">2. Select Delivery Speed</h4>
            
            <div class="space-y-3">
              <label class="p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                window.checkoutData.deliveryOption.includes('Standard') 
                  ? 'border-emerald-500 bg-emerald-500/10' 
                  : 'border-slate-200 dark:border-white/10'
              }">
                <div class="flex items-center space-x-3">
                  <input type="radio" name="delOpt" checked onchange="window.checkoutData.deliveryOption = 'Standard Free (2-3 business days)'" class="accent-emerald-500" />
                  <div>
                    <span class="font-bold text-sm block">Standard Express Ground (2-3 days)</span>
                    <span class="text-xs text-slate-400">Reliable logistics with live SMS tracking</span>
                  </div>
                </div>
                <span class="text-emerald-500 font-extrabold text-sm">FREE</span>
              </label>

              <label class="p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                window.checkoutData.deliveryOption.includes('Priority') 
                  ? 'border-emerald-500 bg-emerald-500/10' 
                  : 'border-slate-200 dark:border-white/10'
              }">
                <div class="flex items-center space-x-3">
                  <input type="radio" name="delOpt" onchange="window.checkoutData.deliveryOption = 'Priority Air (Next day)'" class="accent-emerald-500" />
                  <div>
                    <span class="font-bold text-sm block">Priority Jet Express (Next Day)</span>
                    <span class="text-xs text-slate-400">Morning dispatch via dedicated cargo flight</span>
                  </div>
                </div>
                <span class="text-slate-900 dark:text-white font-bold text-sm">₹199</span>
              </label>
            </div>
          </div>
        ` : ''}

        <!-- STEP 3: PAYMENT METHOD (UPI, Card, Net Banking, COD) -->
        ${window.checkoutStep === 3 ? `
          <div class="space-y-4">
            <h4 class="font-bold text-base text-slate-900 dark:text-white">3. Payment Selection</h4>
            <p class="text-xs text-slate-400">Mock gateway test mode — No real charges will be levied</p>

            <div class="grid grid-cols-2 gap-3">
              ${[
                { id: "UPI (Google Pay / PhonePe)", label: "UPI (GPay / PhonePe)", icon: "📱" },
                { id: "Credit / Debit Card", label: "Credit / Debit Card", icon: "💳" },
                { id: "Net Banking", label: "Net Banking (All Indian Banks)", icon: "🏦" },
                { id: "Cash on Delivery", label: "Cash on Delivery (COD)", icon: "💵" }
              ].map(pay => `
                <button 
                  type="button"
                  onclick="window.checkoutData.paymentMethod = '${pay.id}'; window.refreshCheckoutModal();"
                  class="p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    window.checkoutData.paymentMethod === pay.id
                      ? 'border-emerald-500 bg-emerald-500/15 text-emerald-500 shadow-md font-bold'
                      : 'border-slate-200 dark:border-white/10 hover:border-emerald-500/40 text-slate-700 dark:text-slate-300'
                  }"
                >
                  <span class="text-2xl mb-1">${pay.icon}</span>
                  <span class="text-xs font-semibold leading-tight">${pay.label}</span>
                </button>
              `).join('')}
            </div>

            <!-- Order Total Recap -->
            <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between text-xs">
              <span class="text-slate-400">Final Order Amount</span>
              <span class="text-lg font-black text-emerald-500">₹${summary.total.toLocaleString()}</span>
            </div>
          </div>
        ` : ''}

        <!-- STEP 4: ORDER CONFIRMED CELEBRATION (Prompt: Order Confirmed 🎉) -->
        ${window.checkoutStep === 4 && order ? `
          <div class="text-center space-y-6 py-4">
            <div class="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-4xl mx-auto animate-bounce">
              🎉
            </div>

            <div class="space-y-1">
              <h3 class="text-2xl font-black text-slate-900 dark:text-white">Order Confirmed Successfully!</h3>
              <p class="text-xs text-slate-400">Thank you for your order, ${order.shippingAddress.name}!</p>
            </div>

            <div class="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-left space-y-3 text-xs">
              <div class="flex items-center justify-between pb-2 border-b border-emerald-500/20">
                <span class="text-slate-400">Order Reference</span>
                <span class="font-mono font-black text-emerald-500 text-sm">${order.id}</span>
              </div>

              <div class="flex items-center justify-between">
                <span class="text-slate-400">Estimated Delivery</span>
                <span class="font-bold text-slate-900 dark:text-white">${order.estimatedDelivery}</span>
              </div>

              <div class="flex items-center justify-between">
                <span class="text-slate-400">Payment Mode</span>
                <span class="font-bold text-slate-900 dark:text-white">${order.paymentMethod}</span>
              </div>

              <div class="flex items-center justify-between pt-2 border-t border-emerald-500/20 text-sm font-black">
                <span>Total Amount Paid</span>
                <span class="text-emerald-500">₹${order.total.toLocaleString()}</span>
              </div>
            </div>

            <div class="flex items-center justify-center space-x-3 pt-2">
              <button 
                onclick="window.closeCheckoutModal(); window.navigateTo('dashboard');" 
                class="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg transition-all"
              >
                Return to Dashboard
              </button>
              <button 
                onclick="window.closeCheckoutModal(); window.navigateTo('products');" 
                class="px-6 py-3 rounded-xl border border-slate-300 dark:border-white/10 text-xs font-bold hover:bg-white/5 transition-all"
              >
                Shop More
              </button>
            </div>
          </div>
        ` : ''}

        <!-- Bottom Navigation for Steps 1-3 -->
        ${window.checkoutStep < 4 ? `
          <div class="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-white/10 mt-6">
            ${window.checkoutStep > 1 ? `
              <button 
                type="button" 
                onclick="window.checkoutStep--; window.refreshCheckoutModal();"
                class="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                ← Back
              </button>
            ` : `<div></div>`}

            ${window.checkoutStep < 3 ? `
              <button 
                type="button" 
                onclick="window.checkoutStep++; window.refreshCheckoutModal();"
                class="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg transition-all"
              >
                Continue →
              </button>
            ` : `
              <button 
                type="button" 
                onclick="window.submitCheckoutOrder()"
                class="px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-sm shadow-xl shadow-emerald-500/30 transition-all flex items-center space-x-2"
              >
                <span>Confirm & Place Order (₹${summary.total.toLocaleString()})</span>
              </button>
            `}
          </div>
        ` : ''}

      </div>
    </div>
  `;
};

window.refreshCheckoutModal = function() {
  const container = document.getElementById("checkoutModalContainer");
  if (container) container.innerHTML = window.renderCheckoutModal();
};

window.submitCheckoutOrder = function() {
  const store = window.vitaloraStore;
  const newOrder = store.createOrder({
    shippingAddress: {
      name: window.checkoutData.name,
      phone: window.checkoutData.phone,
      address: window.checkoutData.address,
      city: window.checkoutData.city,
      state: window.checkoutData.state,
      pincode: window.checkoutData.pincode
    },
    paymentMethod: window.checkoutData.paymentMethod
  });

  window.checkoutData.confirmedOrder = newOrder;
  window.checkoutStep = 4;
  window.refreshCheckoutModal();
  window.renderApp();
  window.showToast("Order placed successfully! Order ID: " + newOrder.id);
};
