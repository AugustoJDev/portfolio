(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  if (headerToggleBtn) {
    headerToggleBtn.addEventListener('click', headerToggle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button click
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  let typedInstance = null;
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    typedInstance = new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    const filterButtons = isotopeItem.querySelectorAll('.isotope-filters li');
    // Skip Isotope JS overhead on mobile when there are no filter buttons (Bootstrap grid handles it natively)
    if (!filterButtons.length && window.innerWidth < 992) {
      return;
    }

    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    filterButtons.forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Pause offscreen animations & WebGL (Spline 3D, Typed.js, Tech Slider)
   * Prevents GPU/CPU accumulation when scrolling down on mobile
   */
  (function observeOffscreenAnimations() {
    if (!('IntersectionObserver' in window)) return;

    const heroSection = document.querySelector('#hero');
    const splineBg = document.querySelector('.hero-spline-bg');
    const splineViewer = document.querySelector('spline-viewer');
    const techSlider = document.querySelector('.tech-slider');

    // Only enable global pointer tracking on desktop with fine pointer
    if (splineViewer && window.matchMedia('(min-width: 1200px) and (hover: hover) and (pointer: fine)').matches) {
      splineViewer.setAttribute('events-target', 'global');
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target === heroSection) {
          if (entry.isIntersecting) {
            if (splineBg) splineBg.classList.remove('is-offscreen');
            if (splineViewer && splineViewer._spline && typeof splineViewer._spline.play === 'function') {
              splineViewer._spline.play();
            }
            if (typedInstance && typeof typedInstance.start === 'function') {
              typedInstance.start();
            }
          } else {
            if (splineBg) splineBg.classList.add('is-offscreen');
            if (splineViewer && splineViewer._spline && typeof splineViewer._spline.stop === 'function') {
              splineViewer._spline.stop();
            }
            if (typedInstance && typeof typedInstance.stop === 'function') {
              typedInstance.stop();
            }
          }
        } else if (entry.target === techSlider) {
          if (entry.isIntersecting) {
            techSlider.classList.remove('is-offscreen');
          } else {
            techSlider.classList.add('is-offscreen');
          }
        }
      });
    }, {
      rootMargin: '100px 0px'
    });

    if (heroSection) observer.observe(heroSection);
    if (techSlider) observer.observe(techSlider);
  })();

  /**
   * Unified, zero-reflow scroll pipeline (ScrollTop + Scrollspy + Timeline lines)
   * Caches DOM geometry outside the scroll loop to eliminate layout thrashing on mobile
   */
  (function initScrollPipeline() {
    const navmenulinks = Array.from(document.querySelectorAll('.navmenu a'));
    const resumeItems = Array.from(document.querySelectorAll('.resume .resume-item'));

    let navSections = [];
    let timelineData = [];
    let vh = window.innerHeight;
    let lastWindowWidth = window.innerWidth;
    let isScrollTopActive = false;
    let ticking = false;
    let resizeTimer = null;

    function measureLayout() {
      const scrollY = window.scrollY;
      vh = window.innerHeight;

      navSections = navmenulinks
        .map(link => {
          if (!link.hash) return null;
          const section = document.querySelector(link.hash);
          if (!section) return null;
          const rect = section.getBoundingClientRect();
          return {
            link,
            top: rect.top + scrollY,
            bottom: rect.top + scrollY + rect.height
          };
        })
        .filter(Boolean);

      timelineData = resumeItems.map(item => {
        const rect = item.getBoundingClientRect();
        return {
          item,
          top: rect.top + scrollY,
          height: Math.max(rect.height, 1),
          lastProgress: -1
        };
      });
    }

    function updateOnScroll() {
      const scrollY = window.scrollY;

      // 1. Scroll-top button state (DOM write only on state transition)
      if (scrollTop) {
        const shouldBeActive = scrollY > 100;
        if (shouldBeActive !== isScrollTopActive) {
          isScrollTopActive = shouldBeActive;
          scrollTop.classList.toggle('active', shouldBeActive);
        }
      }

      // 2. Navmenu Scrollspy using cached section bounds
      const spyPos = scrollY + 200;
      for (let i = 0; i < navSections.length; i++) {
        const entry = navSections[i];
        const isActive = spyPos >= entry.top && spyPos <= entry.bottom;
        if (isActive) {
          if (!entry.link.classList.contains('active')) {
            navmenulinks.forEach(l => l.classList.remove('active'));
            entry.link.classList.add('active');
          }
        } else if (entry.link.classList.contains('active')) {
          entry.link.classList.remove('active');
        }
      }

      // 3. Timeline lines progress (DOM write only when clamped value changes)
      const triggerY = scrollY + vh * 0.8;
      for (let i = 0; i < timelineData.length; i++) {
        const data = timelineData[i];
        const rawProgress = (triggerY - data.top) / data.height;
        const clamped = Math.min(1, Math.max(0, rawProgress));
        const rounded = Math.round(clamped * 1000) / 1000;
        if (rounded !== data.lastProgress) {
          data.lastProgress = rounded;
          data.item.style.setProperty('--line-progress', rounded.toString());
        }
      }

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateOnScroll);
      }
    }

    function onResize() {
      vh = window.innerHeight;
      // Ignore mobile URL bar height-only resize jitter; only re-measure DOM on width change
      if (window.innerWidth !== lastWindowWidth) {
        lastWindowWidth = window.innerWidth;
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          measureLayout();
          onScroll();
        }, 150);
      } else {
        onScroll();
      }
    }

    measureLayout();
    updateOnScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('load', () => {
      measureLayout();
      updateOnScroll();
      // Re-measure once lazy/AOS elements settle
      setTimeout(() => {
        measureLayout();
        updateOnScroll();
      }, 800);
    });
  })();

})();
