// VITALORA - 3D Three.js Interactive Scene & Holographic Telemetry Engine

class Vitalora3DScene {
  constructor() {
    this.bgCanvas = null;
    this.bgRenderer = null;
    this.bgScene = null;
    this.bgCamera = null;
    this.particles = null;
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;
    this.globeInstances = {};

    this.initBackground = this.initBackground.bind(this);
    this.animateBackground = this.animateBackground.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  // --- 1. GLOBAL 3D COSMIC BIOMETRIC BACKGROUND ---
  initBackground() {
    if (typeof THREE === 'undefined') return;

    let canvas = document.getElementById("threeBgCanvas");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "threeBgCanvas";
      canvas.className = "fixed inset-0 pointer-events-none z-0 opacity-40 dark:opacity-60 transition-opacity duration-1000";
      document.body.prepend(canvas);
    }
    this.bgCanvas = canvas;

    this.bgScene = new THREE.Scene();
    this.bgCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.bgCamera.position.z = 85;

    this.bgRenderer = new THREE.WebGLRenderer({ canvas: this.bgCanvas, alpha: true, antialias: true });
    this.bgRenderer.setSize(window.innerWidth, window.innerHeight);
    this.bgRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create 3D Synaptic Particle Constellation
    const particleCount = 280;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const emerald = new THREE.Color("#10b981");
    const cyan = new THREE.Color("#06b6d4");
    const violet = new THREE.Color("#8b5cf6");

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 160;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

      // Color distribution (emerald, cyan, violet)
      const r = Math.random();
      const c = r < 0.4 ? emerald : r < 0.7 ? cyan : violet;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Soft glowing particle point material
    const pMaterial = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(geometry, pMaterial);
    this.bgScene.add(this.particles);

    // Subtle 3D Wireframe Icosahedron (Ethereal biological core)
    const icoGeo = new THREE.IcosahedronGeometry(28, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.08
    });
    this.coreMesh = new THREE.Mesh(icoGeo, icoMat);
    this.bgScene.add(this.coreMesh);

    window.addEventListener('resize', this.onWindowResize);
    window.addEventListener('mousemove', this.onMouseMove);

    this.animateBackground();
  }

  onMouseMove(e) {
    this.targetMouseX = (e.clientX - window.innerWidth / 2) * 0.0006;
    this.targetMouseY = (e.clientY - window.innerHeight / 2) * 0.0006;
  }

  onWindowResize() {
    if (!this.bgCamera || !this.bgRenderer) return;
    this.bgCamera.aspect = window.innerWidth / window.innerHeight;
    this.bgCamera.updateProjectionMatrix();
    this.bgRenderer.setSize(window.innerWidth, window.innerHeight);
  }

  animateBackground() {
    requestAnimationFrame(this.animateBackground);

    // Smooth lerp mouse parallax
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

    if (this.particles) {
      this.particles.rotation.y += 0.0008;
      this.particles.rotation.x = this.mouseY * 0.6;
      this.particles.rotation.y += this.mouseX * 0.01;
    }

    if (this.coreMesh) {
      this.coreMesh.rotation.x += 0.0015;
      this.coreMesh.rotation.y += 0.002;
    }

    if (this.bgRenderer && this.bgScene && this.bgCamera) {
      this.bgRenderer.render(this.bgScene, this.bgCamera);
    }
  }

  // --- 2. INTERACTIVE 3D HOLOGRAPHIC BIOMETRIC GLOBE ---
  renderBiometricGlobe(containerId) {
    const container = document.getElementById(containerId);
    if (!container || typeof THREE === 'undefined') return;

    // Clean up existing instance if any
    if (this.globeInstances[containerId]) {
      try {
        container.innerHTML = "";
      } catch (e) {}
    }

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 260;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Sphere Wireframe Core
    const sphereGeo = new THREE.SphereGeometry(1.6, 24, 24);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.28
    });
    const globe = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(globe);

    // Outer Orbital Ring 1 (Steps - Emerald)
    const ring1Geo = new THREE.RingGeometry(2.1, 2.15, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x10b981, side: THREE.DoubleSide, transparent: true, opacity: 0.6 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    // Outer Orbital Ring 2 (Heart - Violet)
    const ring2Geo = new THREE.RingGeometry(2.4, 2.45, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xa855f7, side: THREE.DoubleSide, transparent: true, opacity: 0.5 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = Math.PI / 6;
    scene.add(ring2);

    // Pulsing Telemetry Nodes on Globe
    const nodeCount = 18;
    const nodeGroup = new THREE.Group();
    const nodeGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(
        1.62 * Math.cos(theta) * Math.sin(phi),
        1.62 * Math.sin(theta) * Math.sin(phi),
        1.62 * Math.cos(phi)
      );
      nodeGroup.add(nodeMesh);
    }
    globe.add(nodeGroup);

    // Mouse Drag Rotation Controls
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    renderer.domElement.style.cursor = "grab";

    renderer.domElement.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      renderer.domElement.style.cursor = "grabbing";
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
      if (renderer.domElement) renderer.domElement.style.cursor = "grab";
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      globe.rotation.y += deltaX * 0.008;
      globe.rotation.x += deltaY * 0.008;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    });

    // Touch support for mobile
    renderer.domElement.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      globe.rotation.y += deltaX * 0.008;
      globe.rotation.x += deltaY * 0.008;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    });

    window.addEventListener('touchend', () => { isDragging = false; });

    // Animation Loop
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging) {
        globe.rotation.y += 0.005;
        globe.rotation.x += 0.002;
      }
      ring1.rotation.z += 0.006;
      ring2.rotation.z -= 0.004;

      renderer.render(scene, camera);
    };
    animate();

    this.globeInstances[containerId] = { renderer, animId };
  }
}

// Global instance
window.vitalora3D = new Vitalora3DScene();
