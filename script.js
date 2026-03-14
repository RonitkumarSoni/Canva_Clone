(function () {
  'use strict';

  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');
  const navbar = document.getElementById('navbar');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tmplTabs = document.querySelectorAll('.tmpl-tab');

  const mobileTemplatesDropdown = document.getElementById('mobileTemplatesDropdown');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const closeMobileNav = document.getElementById('closeMobileNav');

  function openMobileMenu() {
    mobileMenu.classList.add('open');
    mobileOverlay.classList.add('active');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    hamburgerBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('active');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = mobileMenu.classList.contains('open');
      isOpen ? closeMobileMenu() : openMobileMenu();
    });
  }

  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeMobileMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 768 && mobileMenu.classList.contains('open')) {
      closeMobileMenu();
    }
    if (window.innerWidth > 768 && mobileNavOverlay && mobileNavOverlay.classList.contains('active')) {
      mobileNavOverlay.classList.remove('active');
    }
  });

  if (mobileTemplatesDropdown && mobileNavOverlay) {
    mobileTemplatesDropdown.addEventListener('click', function () {
      mobileNavOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeMobileNav && mobileNavOverlay) {
    closeMobileNav.addEventListener('click', function () {
      mobileNavOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', function (e) {
      if (e.target === mobileNavOverlay) {
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  mobileMenu.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    const focusable = mobileMenu.querySelectorAll(
      'a, button, input, [tabindex]:not([tabindex="-1"])'
    );
    const firstEl = focusable[0];
    const lastEl = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      }
    } else {
      if (document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  });

  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
    });
  });

  tmplTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tmplTabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
    });
  });

  const heroSearch = document.getElementById('heroSearch');
  const searchBox = document.querySelector('.hero-search-box');

  if (heroSearch && searchBox) {
    heroSearch.addEventListener('focus', function () {
      searchBox.style.boxShadow = '0 8px 40px rgba(125,42,232,0.28)';
      searchBox.style.transform = 'scale(1.01)';
    });
    heroSearch.addEventListener('blur', function () {
      searchBox.style.boxShadow = '0 8px 32px rgba(0,0,0,0.18)';
      searchBox.style.transform = 'scale(1)';
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const animatedEls = document.querySelectorAll(
    '.feature-card, .template-card, .stat-item'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animatedEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

  const heroVideo = document.getElementById('heroVideo');
  const playBtn = document.getElementById('videoPlayBtn');

  if (heroVideo && playBtn) {
    playBtn.addEventListener('click', function () {
      if (heroVideo.paused) {
        heroVideo.play();
        playBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="white"><rect x="5" y="3" width="4" height="18"/><rect x="15" y="3" width="4" height="18"/></svg>';
      } else {
        heroVideo.pause();
        playBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>';
      }
    });

    heroVideo.addEventListener('ended', function () {
      playBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>';
    });
  }

  const exploreTabs = document.querySelectorAll('.explore-tab');
  exploreTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      exploreTabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
    });
  });

  const templatesNextBtn = document.getElementById('templatesNextBtn');
  const templatesGrid = document.getElementById('templatesGrid');

  if (templatesNextBtn && templatesGrid) {
    templatesNextBtn.addEventListener('click', function () {
      templatesGrid.scrollBy({
        left: 600,
        behavior: 'smooth'
      });
    });
  }

  const templateVideos = document.querySelectorAll('.template-card video');
  templateVideos.forEach(video => {
    video.parentElement.addEventListener('mouseenter', () => {
      video.play();
    });
    video.parentElement.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
  });

  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', function () {
      if (window.innerWidth <= 991) {
        const item = this.parentElement;
        item.classList.toggle('active');
      }
    });
  });

})();
