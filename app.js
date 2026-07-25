/* ==========================================================================
   THALAIMAI 360 — APPLICATION LOGIC & INTERACTION ENGINE (app.js)
   Stats Counters, 3D Card Tilt Matrix, Methodology Timeline & Consultation Form
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. INITIALIZE LUCIDE ICONS
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }


  // 2. STATS COUNTER ANIMATION ENGINE
  window.initStatsCounters = function() {
    const statCards = document.querySelectorAll('.stat-number');
    statCards.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      if (isNaN(target)) return;

      let current = 0;
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = target / steps;
      const stepTime = duration / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }

        // Format number with Indian comma separation if large
        if (target >= 1000) {
          counter.textContent = Math.floor(current).toLocaleString('en-IN');
        } else {
          counter.textContent = Math.floor(current);
        }
      }, stepTime);
    });
  };


  // 3. 3D CARD TILT EFFECT FOR 12 CAPABILITY PILLARS
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach(card => {
    const inner = card.querySelector('.tilt-card-inner');
    const glow = card.querySelector('.card-glow');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles (-12 to +12 degrees max)
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

      if (glow) {
        glow.style.left = `${x - rect.width}px`;
        glow.style.top = `${y - rect.height}px`;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });


  // 4. METHODOLOGY 5-STEP TIMELINE SWITCHER
  const stepNodes = document.querySelectorAll('.step-node');
  const timelineProgress = document.getElementById('timeline-progress');
  const stepBadge = document.getElementById('step-card-badge');
  const stepTitle = document.getElementById('step-card-title');
  const stepDesc = document.getElementById('step-card-desc');
  const stepList = document.getElementById('step-card-list');

  const stepsData = {
    1: {
      badge: "STEP 01 OF 05",
      title: "01. ANALYZE — Constituency Audit & Intelligence Gathering",
      desc: "We execute a comprehensive 360° constituency diagnostic: booth-by-booth demographic mapping, pending infrastructure analysis, public sentiment surveys, and media audit.",
      deliverables: [
        "Detailed 150-page Constituency Health Report",
        "Booth-level Vulnerability & Opportunity Matrix",
        "Key Influencer & Stakeholder Heatmap"
      ]
    },
    2: {
      badge: "STEP 02 OF 05",
      title: "02. PLAN — Strategic Policy & Communication Blueprint",
      desc: "Formulating a tailored 5-year governance roadmap, defining legislative priorities, policy stance whitepapers, and hyper-local constituency development projects.",
      deliverables: [
        "5-Year Constituency Master Plan",
        "Legislative & Assembly Question Schedule",
        "Omnichannel Public Communications Strategy"
      ]
    },
    3: {
      badge: "STEP 03 OF 05",
      title: "03. ENGAGE — Stakeholder & Citizen Mobilization",
      desc: "Setting up modern MLA/MP office operational protocols, digital grievance portals, youth task forces, and community outreach programs.",
      deliverables: [
        "Constituent Relationship Management (CRM) System",
        "Youth & Women Leadership Task Force",
        "Town Hall & Grievance Redressal Calendar"
      ]
    },
    4: {
      badge: "STEP 04 OF 05",
      title: "04. MONITOR — Governance Dashboard & SLA Tracking",
      desc: "Continuous real-time tracking of public scheme implementation, grievance resolution turnaround times, media perception, and opposition dynamics.",
      deliverables: [
        "Real-Time Executive Governance Dashboard",
        "Monthly Sentiment & Perception Audits",
        "MLACD / MPLAD Fund Utilization Tracker"
      ]
    },
    5: {
      badge: "STEP 05 OF 05",
      title: "05. IMPACT — Measurable Public Trust & Re-election Readiness",
      desc: "Consolidating 5-year performance metrics into published transparency reports, establishing deep voter loyalty, and securing landslide re-election readiness.",
      deliverables: [
        "Published 5-Year Achievement Report Card",
        "Voter Retention & Sentiment Consolidation",
        "Permanent Electoral Stronghold Blueprint"
      ]
    }
  };

  stepNodes.forEach(node => {
    node.addEventListener('click', () => {
      const stepNum = parseInt(node.getAttribute('data-step'), 10);

      // Update active node state
      stepNodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      // Update progress bar percentage
      const progressPercent = ((stepNum - 1) / 4) * 100;
      if (timelineProgress) {
        timelineProgress.style.width = `${Math.max(10, progressPercent)}%`;
      }

      // Update detail card content with smooth fade
      const stepCard = document.getElementById('step-detail-card');
      if (stepCard) {
        stepCard.style.opacity = '0.4';
        stepCard.style.transform = 'translateY(8px)';

        setTimeout(() => {
          const data = stepsData[stepNum];
          if (data) {
            if (stepBadge) stepBadge.textContent = data.badge;
            if (stepTitle) stepTitle.textContent = data.title;
            if (stepDesc) stepDesc.textContent = data.desc;

            if (stepList) {
              stepList.innerHTML = data.deliverables
                .map(item => `<li><i data-lucide="check-circle2"></i> ${item}</li>`)
                .join('');
              if (typeof lucide !== 'undefined') lucide.createIcons();
            }
          }
          stepCard.style.opacity = '1';
          stepCard.style.transform = 'translateY(0)';
        }, 150);
      }
    });
  });


  // 5. CONSULTATION FORM & PROFILE DOWNLOAD INTERACTION
  const consultationForm = document.getElementById('consultation-form');
  const formFeedback = document.getElementById('form-feedback');
  const downloadProfileBtn = document.getElementById('download-profile-btn');

  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('form-submit-btn');
      const name = document.getElementById('form-name').value;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i data-lucide="loader" class="spin"></i> <span>Processing Briefing Request...</span>`;
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<i data-lucide="check"></i> <span>Request Submitted Successfully</span>`;
          if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        if (formFeedback) {
          formFeedback.classList.remove('hidden');
          formFeedback.className = 'form-feedback success';
          formFeedback.innerHTML = `
            <strong>Thank you, ${name}!</strong><br>
            Your confidential consultation request has been received by Srikala Sukumar's executive office. Our senior strategist will contact you within 24 hours.
          `;
        }

        consultationForm.reset();
      }, 1200);
    });
  }

  if (downloadProfileBtn) {
    downloadProfileBtn.addEventListener('click', () => {
      downloadProfileBtn.innerHTML = `<i data-lucide="check"></i> <span>Downloading Corporate Profile...</span>`;
      if (typeof lucide !== 'undefined') lucide.createIcons();

      // Create a simulated blob download of Thalaimai 360 Overview
      const profileText = `
THALAIMAI 360 — 3D INTERACTIVE GOVERNANCE CONSULTANCY
======================================================
Founder & Chief Governance Strategist: Srikala Sukumar
Headquarters: Nungambakkam High Road, Chennai, Tamil Nadu - 600034
Contact: office@thalaimai360.in | +91 94440 36000

OUR 12 STRATEGIC PILLARS:
1. Executive Leadership Development
2. Strategic Communication & Narrative Building
3. Stakeholder Relations & Coalition Management
4. Governance & Policy Advisory
5. Constituency Intelligence & Data Analytics
6. Citizen Relations & Redressal CRM
7. Community Leadership & Youth Mobilization
8. Digital Influence & Perception Operations
9. Administrative & Legislative Excellence
10. Resource Mobilization & Public Funding
11. Public Trust & Integrity Frameworks
12. Leadership Capacity & Crisis Management

"Transforming Electoral Mandates into Measurable Public Impact"
      `;

      const blob = new Blob([profileText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Thalaimai360_Corporate_Profile.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setTimeout(() => {
        downloadProfileBtn.innerHTML = `<i data-lucide="download"></i> <span>Request Corporate Profile (PDF)</span>`;
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }, 2000);
    });
  }


  // 6. NAVBAR SCROLL DETECTION & ACTIVE LINK HIGHLIGHTER
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy active link updates
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });


  // 7. MOBILE MENU TOGGLE
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = navMenu.style.display === 'flex';
      navMenu.style.display = isVisible ? 'none' : 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '100%';
      navMenu.style.left = '0';
      navMenu.style.width = '100%';
      navMenu.style.background = '#050B14';
      navMenu.style.padding = '1.5rem';
      navMenu.style.borderBottom = '1px solid #D4AF37';
    });
  }

});
