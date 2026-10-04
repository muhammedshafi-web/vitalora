// VITALORA - Full Admin Dashboard for Product & Order Management (Section 24)

window.adminActiveTab = "products"; // 'products' or 'orders'

window.renderAdminView = function() {
  const store = window.vitaloraStore;
  const state = store.getState();
  const products = state.products;
  const orders = state.orders || [];

  // Calculate stats
  const totalSales = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);

  return `
    <div class="pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <!-- Top Title Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold mb-1">
            <span>🛡️ ADMIN MANAGEMENT SUITE</span>
          </div>
          <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white">Store & Catalog Administration</h1>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Inventory control, live pricing configurations, and order fulfillment tracking.</p>
        </div>

        <div class="flex items-center space-x-3 self-start md:self-auto">
          <button 
            onclick="window.openAddProductModal()"
            class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-600/25 flex items-center space-x-2 transition-all"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>+ Add New Product</span>
          </button>

          <button 
            onclick="window.navigateTo('dashboard')"
            class="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 hover:border-purple-500/50 text-slate-700 dark:text-slate-200 text-xs font-bold"
          >
            Exit to App
          </button>
        </div>
      </div>

      <!-- KEY METRICS ROW -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div class="p-5 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 card-lift">
          <span class="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Total Sales Revenue</span>
          <div class="text-2xl sm:text-3xl font-black text-purple-500">₹${totalSales.toLocaleString()}</div>
          <span class="text-[11px] text-slate-400 mt-1 block">From ${orders.length} orders</span>
        </div>

        <div class="p-5 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 card-lift">
          <span class="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Active Catalog</span>
          <div class="text-2xl sm:text-3xl font-black text-emerald-500">${products.length} Products</div>
          <span class="text-[11px] text-slate-400 mt-1 block">Across 9 health categories</span>
        </div>

        <div class="p-5 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 card-lift">
          <span class="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Inventory in Stock</span>
          <div class="text-2xl sm:text-3xl font-black text-cyan-500">${totalStock} Units</div>
          <span class="text-[11px] text-slate-400 mt-1 block">Global warehouse count</span>
        </div>

        <div class="p-5 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 card-lift">
          <span class="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Fulfillment Rate</span>
          <div class="text-2xl sm:text-3xl font-black text-amber-500">100%</div>
          <span class="text-[11px] text-slate-400 mt-1 block">All orders processing</span>
        </div>
      </div>

      <!-- TAB TOGGLE: PRODUCTS vs ORDERS -->
      <div class="flex items-center space-x-2 border-b border-slate-200 dark:border-white/10 pb-2">
        <button 
          onclick="window.adminActiveTab = 'products'; window.renderApp();"
          class="px-5 py-2 rounded-xl text-xs font-bold transition-all ${
            window.adminActiveTab === 'products' 
              ? 'bg-purple-600 text-white shadow-md' 
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }"
        >
          Product Management (${products.length})
        </button>

        <button 
          onclick="window.adminActiveTab = 'orders'; window.renderApp();"
          class="px-5 py-2 rounded-xl text-xs font-bold transition-all ${
            window.adminActiveTab === 'orders' 
              ? 'bg-purple-600 text-white shadow-md' 
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }"
        >
          Customer Orders (${orders.length})
        </button>
      </div>

      <!-- TAB 1: PRODUCT MANAGEMENT TABLE -->
      ${window.adminActiveTab === 'products' ? `
        <div class="rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 overflow-hidden shadow-xl">
          <div class="p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
            <h3 class="font-bold text-base text-slate-900 dark:text-white">Store Catalog Inventory</h3>
            <span class="text-xs text-slate-400">Click actions to edit pricing, stock, or remove item</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-100/50 dark:bg-white/[0.02] text-slate-500 dark:text-slate-400 uppercase font-semibold">
                <tr>
                  <th class="p-4">Product</th>
                  <th class="p-4">Category</th>
                  <th class="p-4">Price (₹)</th>
                  <th class="p-4">Original (₹)</th>
                  <th class="p-4">Discount</th>
                  <th class="p-4">Stock</th>
                  <th class="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-white/5">
                ${products.map(p => `
                  <tr class="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                    <td class="p-4 flex items-center space-x-3">
                      <img src="${p.images[0]}" alt="${p.name}" class="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <span class="font-bold text-slate-900 dark:text-white block">${p.name}</span>
                        <span class="text-[10px] text-slate-400">ID: ${p.id}</span>
                      </div>
                    </td>
                    <td class="p-4 text-slate-600 dark:text-slate-300">${p.category}</td>
                    <td class="p-4 font-bold text-emerald-500">₹${p.price.toLocaleString()}</td>
                    <td class="p-4 text-slate-400 line-through">₹${p.originalPrice.toLocaleString()}</td>
                    <td class="p-4 font-semibold text-purple-400">${p.discount}%</td>
                    <td class="p-4 font-bold ${p.stock < 30 ? 'text-amber-500' : 'text-slate-700 dark:text-slate-200'}">
                      ${p.stock} units
                    </td>
                    <td class="p-4 text-right space-x-2">
                      <button 
                        onclick="window.quickEditProductPrice('${p.id}')"
                        class="px-2.5 py-1 rounded bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 font-bold"
                      >
                        Edit
                      </button>
                      <button 
                        onclick="window.vitaloraStore.deleteProduct('${p.id}'); window.renderApp(); window.showToast('Product deleted');"
                        class="px-2.5 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 font-bold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      ` : ''}

      <!-- TAB 2: ORDERS MANAGEMENT -->
      ${window.adminActiveTab === 'orders' ? `
        <div class="rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 overflow-hidden shadow-xl">
          <div class="p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
            <h3 class="font-bold text-base text-slate-900 dark:text-white">Customer Orders</h3>
            <span class="text-xs text-slate-400">Total ${orders.length} orders placed</span>
          </div>

          <div class="divide-y divide-slate-100 dark:divide-white/5">
            ${orders.map(o => `
              <div class="p-5 space-y-3">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div class="flex items-center space-x-3">
                    <span class="font-mono font-bold text-purple-400 text-sm">${o.id}</span>
                    <span class="text-slate-400">• ${o.date}</span>
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/20">
                      ${o.status}
                    </span>
                  </div>

                  <div class="text-right">
                    <span class="font-bold text-slate-400">Total: </span>
                    <span class="font-black text-emerald-500 text-base">₹${o.total.toLocaleString()}</span>
                  </div>
                </div>

                <div class="text-xs text-slate-400">
                  Customer: <strong class="text-slate-200">${o.shippingAddress.name}</strong> • ${o.shippingAddress.city}, ${o.shippingAddress.state} (${o.shippingAddress.phone})
                </div>

                <div class="space-y-1 text-xs pt-1">
                  ${o.items.map(it => `
                    <div class="flex items-center justify-between text-slate-400">
                      <span>• ${it.name} (x${it.quantity})</span>
                      <span class="font-mono text-slate-300">₹${(it.price * it.quantity).toLocaleString()}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

    </div>
  `;
};

window.quickEditProductPrice = function(id) {
  const p = window.vitaloraStore.getState().products.find(x => x.id === id);
  if (!p) return;
  const newPrice = prompt(`Update price for "${p.name}" (Current: ₹${p.price}):`, p.price);
  if (newPrice && !isNaN(newPrice)) {
    const newStock = prompt(`Update stock count (Current: ${p.stock}):`, p.stock);
    window.vitaloraStore.updateProduct(id, {
      price: parseInt(newPrice, 10),
      stock: newStock ? parseInt(newStock, 10) : p.stock
    });
    window.renderApp();
    window.showToast("Product updated successfully!");
  }
};

window.openAddProductModal = function() {
  const name = prompt("Product Name:", "Vitalora Ergonomic Foam Roller");
  if (!name) return;
  const price = prompt("Current Selling Price in ₹:", "999");
  const origPrice = prompt("Original MRP in ₹:", "1499");
  const category = prompt("Category (e.g. Yoga & Recovery, Fitness Equipment):", "Yoga & Recovery");

  window.vitaloraStore.addProduct({
    name,
    tagline: "High density myofascial release roller",
    description: "Engineered with triple-zone muscle stimulation nodules to release tight fascia and knots.",
    category: category || "Yoga & Recovery",
    price: parseInt(price, 10) || 999,
    originalPrice: parseInt(origPrice, 10) || 1499,
    stock: 50,
    images: [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80"
    ],
    specs: { Brand: "Vitalora", Warranty: "1 Year" },
    features: ["Deep tissue stimulation", "Eco-friendly high density foam"]
  });

  window.renderApp();
  window.showToast(`Product "${name}" added to catalog!`);
};
