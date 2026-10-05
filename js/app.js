// VITALORA - Master Router & Application Controller

window.currentRoute = "landing";

// Route Navigator
window.navigateTo = function(route) {
  window.currentRoute = route;
  window.scrollTo({ top: 0, behavior: "smooth" });
  window.renderApp();

  // Close notifications dropdown if open
  const dropdown = document.getElementById("notificationsDropdown");
  if (dropdown) dropdown.classList.add("hidden");
};

// Start Tracking CTA action
window.startTrackingAction = function() {
  const store = window.vitaloraStore;
  const user = store.getState().user;
  if (!user.onboarded) {
    window.onboardingStep = 1;
    const container = document.getElementById("onboardingContainer");
    if (container) {
      container.innerHTML = window.renderOnboardingModal();
    }
  } else {
    window.navigateTo("dashboard");
  }
};

// Quick add water helper
window.quickAddWater = function(amount) {
  window.vitaloraStore.addWater(amount);
  window.renderApp();
  window.showToast(`Hydration +${amount}ml logged! 💧`);
};

// Theme Toggle
window.toggleAppTheme = function() {
  const newTheme = window.vitaloraStore.toggleTheme();
  document.documentElement.setAttribute("data-theme", newTheme);
  window.renderApp();
  window.showToast(`Switched to ${newTheme} mode`);
};

// Toggle Notifications Dropdown
window.toggleNotificationsDropdown = function() {
  const dropdown = document.getElementById("notificationsDropdown");
  if (dropdown) {
    dropdown.classList.toggle("hidden");
  }
};

// Master App Renderer
window.renderApp = function() {
  const appContainer = document.getElementById("app");
  if (!appContainer) return;

  const store = window.vitaloraStore;
  const state = store.getState();
  const activeRoute = window.currentRoute;

  // Sync theme attribute
  document.documentElement.setAttribute("data-theme", state.user.theme || "dark");

  let mainContent = "";

  switch (activeRoute) {
    case "landing":
      mainContent = window.renderLandingPage();
      break;
    case "dashboard":
      mainContent = window.renderDashboardView();
      break;
    case "health":
      mainContent = window.renderHealthView();
      break;
    case "activity":
      mainContent = window.renderActivityView();
      break;
    case "water":
      mainContent = window.renderWaterView();
      break;
    case "sleep":
      mainContent = window.renderSleepView();
      break;
    case "nutrition":
      mainContent = window.renderNutritionView();
      break;
    case "products":
      mainContent = window.renderStoreView();
      break;
    case "progress":
      mainContent = window.renderProgressView();
      break;
    case "timeline":
      mainContent = window.renderTimelineView();
      break;
    case "ai-coach":
      mainContent = window.renderAiCoachView();
      break;
    case "wearables":
      mainContent = window.renderWearablesView();
      break;
    case "goals":
      mainContent = window.renderGoalsView();
      break;
    case "profile":
      mainContent = window.renderProfileView();
      break;
    case "admin":
      mainContent = window.renderAdminView();
      break;
    default:
      mainContent = window.renderDashboardView();
  }

  appContainer.innerHTML = `
    <!-- Top & Mobile Navigation -->
    ${window.renderNavbar(activeRoute)}

    <!-- Main Dynamic Route View -->
    <main class="min-h-screen">
      ${mainContent}
    </main>

    <!-- Global Modals Holders -->
    <div id="onboardingContainer"></div>
    <div id="productDetailContainer"></div>
    <div id="cartModalContainer"></div>
    <div id="checkoutModalContainer"></div>
  `;

  // Render omnipresent Floating AI Chatbot
  if (typeof window.renderFloatingChatbot === "function") {
    window.renderFloatingChatbot();
  }

  // Re-bind Universal 3D Card Tilt & Specular Reflection
  if (typeof window.init3DTilt === "function") {
    window.init3DTilt();
  }

  // Render 3D Biometric Globe if current route is dashboard
  if (activeRoute === "dashboard" && window.vitalora3D) {
    setTimeout(() => {
      window.vitalora3D.renderBiometricGlobe('dashboardGlobe3D');
    }, 60);
  }
};

// Touch Gestures for Mobile Viewport (Left/Right swipe between primary routes)
let appTouchStartX = 0;
let appTouchStartY = 0;
document.addEventListener("touchstart", (e) => {
  appTouchStartX = e.touches[0].clientX;
  appTouchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener("touchend", (e) => {
  // If an active modal is open or zoom is active, skip route swipe
  if (document.getElementById("actionModalBackdrop") || 
      document.getElementById("productModalBackdrop") || 
      document.getElementById("cartModalBackdrop")) {
    return;
  }

  const deltaX = e.changedTouches[0].clientX - appTouchStartX;
  const deltaY = e.changedTouches[0].clientY - appTouchStartY;

  // Only trigger horizontal swipe if movement is predominantly horizontal
  if (Math.abs(deltaX) > 90 && Math.abs(deltaY) < 60) {
    const mainRoutes = ["dashboard", "health", "activity", "nutrition", "products", "progress", "ai-coach", "profile"];
    const curIdx = mainRoutes.indexOf(window.currentRoute);
    if (curIdx >= 0) {
      if (deltaX < 0 && curIdx < mainRoutes.length - 1) {
        // Swipe left -> next route
        window.navigateTo(mainRoutes[curIdx + 1]);
      } else if (deltaX > 0 && curIdx > 0) {
        // Swipe right -> previous route
        window.navigateTo(mainRoutes[curIdx - 1]);
      }
    }
  }
}, { passive: true });

// Keyboard shortcuts (Escape to close modals)
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const actionModal = document.getElementById("actionModalBackdrop");
    if (actionModal) actionModal.remove();
    window.closeProductDetailModal();
    window.toggleCartModal(false);
    window.closeCheckoutModal();
    window.closeOnboardingModal();
    const hsModal = document.getElementById("healthScoreModalBackdrop");
    if (hsModal) hsModal.remove();
  }
});

// App Initialization
window.addEventListener("DOMContentLoaded", () => {
  // Initialize 3D Cosmic Background Particle Constellation
  if (window.vitalora3D && typeof window.vitalora3D.initBackground === "function") {
    window.vitalora3D.initBackground();
  }

  // Initial render
  window.renderApp();
  console.log("VITALORA Physical Health & Fitness System Initialized with 3D Holographic Telemetry & AI.");
});
