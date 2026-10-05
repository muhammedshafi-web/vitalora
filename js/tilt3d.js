// VITALORA - Universal 3D Interactive Card Tilt & Specular Glare Engine

class Vitalora3DTilt {
  constructor() {
    this.maxRotation = 8; // degrees
    this.perspective = 1000; // px
    this.scale = 1.025;
    this.activeCards = new Set();
    this.init = this.init.bind(this);
  }

  init() {
    // Select all interactive cards across dashboard, landing, and analytics views
    const cards = document.querySelectorAll('.card-lift, .card-3d, .tilt-card, .glass-panel');
    cards.forEach(card => {
      // Exclude navigation bars, floating chatbot container, and modals
      if (card.closest('header, nav, #floatingChatbotRoot, .modal-overlay, #onboardingContainer, #notificationsDropdown')) return;
      if (card.dataset.tiltAttached === "true") return;
      card.dataset.tiltAttached = "true";
      this.attachTilt(card);
    });
  }

  attachTilt(card) {
    card.style.transformStyle = "preserve-3d";
    card.style.perspective = `${this.perspective}px`;
    card.style.transition = "transform 0.15s ease-out, box-shadow 0.15s ease-out";

    // Create dynamic specular glare layer if not present
    let glare = card.querySelector('.specular-glare');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'specular-glare';
      glare.style.position = 'absolute';
      glare.style.inset = '0';
      glare.style.borderRadius = 'inherit';
      glare.style.pointerEvents = 'none';
      glare.style.background = 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 70%)';
      glare.style.opacity = '0';
      glare.style.transition = 'opacity 0.25s ease';
      glare.style.zIndex = '5';
      card.appendChild(glare);
    }

    card.addEventListener('mouseenter', () => {
      card.style.transition = "transform 0.08s ease-out, box-shadow 0.08s ease-out";
      glare.style.opacity = '1';
    });

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -this.maxRotation;
      const rotateY = ((x - centerX) / centerX) * this.maxRotation;

      card.style.transform = `perspective(${this.perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${this.scale}, ${this.scale}, ${this.scale})`;

      // Move specular glare with light reflection
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.18) 0%, transparent 65%)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s ease";
      card.style.transform = `perspective(${this.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      glare.style.opacity = '0';
    });
  }
}

window.vitaloraTilt = new Vitalora3DTilt();
window.init3DTilt = function() {
  setTimeout(() => window.vitaloraTilt.init(), 60);
};
