document.addEventListener('DOMContentLoaded', () => {

  // Menú móvil
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('siteNav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.textContent = isOpen ? 'Cerrar' : 'Menú';
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'Menú';
      });
    });
  }

  // Año en el footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Revelado en scroll (una sola vez por elemento)
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && !reduceMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // Camino: hilo de progreso vertical con puntos por sección
  const journeyTrack = document.getElementById('journeyTrack');
  const journey = document.getElementById('journey');
  const sections = Array.from(document.querySelectorAll('main section[id]'));

  if (journeyTrack && journey && sections.length) {
    const dots = sections.map((section) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'journey-dot';
      dot.style.top = '0px';
      dot.setAttribute('aria-label', section.dataset.journeyLabel || section.id);

      const label = document.createElement('span');
      label.className = 'journey-label';
      label.textContent = section.dataset.journeyLabel || section.id;

      dot.addEventListener('click', () => {
        section.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      });

      journeyTrack.appendChild(dot);
      journeyTrack.appendChild(label);
      return { section, dot };
    });

    function layoutDots() {
      const trackHeight = journeyTrack.offsetHeight;
      const first = sections[0].offsetTop;
      const last = sections[sections.length - 1].offsetTop;
      const span = Math.max(last - first, 1);

      dots.forEach(({ section, dot }) => {
        const ratio = (section.offsetTop - first) / span;
        dot.style.top = `${ratio * trackHeight}px`;
      });
    }

    function updateProgress() {
      const scrollTop = window.scrollY;
      const viewMid = scrollTop + window.innerHeight * 0.35;

      let activeIndex = 0;
      sections.forEach((section, i) => {
        if (section.offsetTop <= viewMid) activeIndex = i;
      });

      dots.forEach(({ dot }, i) => dot.classList.toggle('is-active', i === activeIndex));

      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      journeyTrack.style.setProperty('--progress', `${progress}%`);
    }

    journeyTrack.style.height = '260px';
    layoutDots();
    updateProgress();

    window.addEventListener('resize', () => {
      layoutDots();
      updateProgress();
    });
    window.addEventListener('scroll', updateProgress, { passive: true });
  }
});
