/* ==========================================================================
   THALAIMAI 360 — GATE ENGINE (gate3d.js)
   Realistic secretariat gate: split building image + light burst on open
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const overlay    = document.getElementById('gate-overlay');
  const mainContent= document.getElementById('main-content');
  const lightBurst = document.getElementById('gate-light-burst');

  let isOpening = false;

  /* ── THREE.JS PARTICLE CANVAS ────────────────────────────────── */
  const canvas = document.getElementById('gate-canvas');
  if (canvas && typeof THREE !== 'undefined') {
    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.1, 1000);
    camera.position.z = 420;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    // Dust particles in brand palette
    const N   = 1000;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);

    const palette = [
      [0.93, 0.26, 0.21], // coral #EE4235
      [0.11, 0.19, 0.27], // navy  #1C3144
      [1.00, 1.00, 1.00], // white
      [1.00, 0.42, 0.37], // coral light
    ];

    for (let i = 0; i < N; i++) {
      pos[i*3]   = (Math.random() - 0.5) * 1300;
      pos[i*3+1] = (Math.random() - 0.5) * 1300;
      pos[i*3+2] = (Math.random() - 0.5) * 800;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i*3] = c[0]; col[i*3+1] = c[1]; col[i*3+2] = c[2];
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));

    const mat = new THREE.PointsMaterial({
      size: 2.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const pts = new THREE.Points(geo, mat);
    scene.add(pts);

    (function loop() {
      requestAnimationFrame(loop);
      pts.rotation.y += isOpening ? 0.006 : 0.0006;
      pts.rotation.x += 0.0003;
      if (isOpening) mat.opacity = Math.max(0, mat.opacity - 0.007);
      renderer.render(scene, camera);
    })();

    window.addEventListener('resize', () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    });
  }

  /* ── OPEN GATE ───────────────────────────────────────────────── */
  function openGate() {
    if (isOpening) return;
    isOpening = true;

    // 1. Light burst flash
    if (lightBurst) {
      overlay.classList.add('bursting');
      setTimeout(() => overlay.classList.remove('bursting'), 300);
    }

    // 2. CSS 3D hinge rotation
    overlay.classList.add('opening');

    // 3. Reveal main content with GSAP
    if (typeof gsap !== 'undefined') {
      gsap.to('#main-content', {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        delay: 0.35,
        ease: 'power3.out',
        onStart() {
          mainContent.classList.remove('content-hidden');
          mainContent.classList.add('content-visible');
        },
      });
    } else {
      setTimeout(() => {
        mainContent.classList.remove('content-hidden');
        mainContent.classList.add('content-visible');
      }, 400);
    }

    // 4. Remove gate from DOM after animation
    setTimeout(() => {
      overlay.classList.add('opened');
      if (window.initStatsCounters) window.initStatsCounters();
    }, 1800);
  }

  overlay.addEventListener('click', openGate);

  // Accessibility: skip for prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) openGate();
});
