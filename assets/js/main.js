document.addEventListener('DOMContentLoaded', () => {

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Voltear postales ---
  document.querySelectorAll('.postcard[data-flip]').forEach((postcard) => {
    const front = postcard.querySelector('.postcard-face.front');
    const backNav = postcard.querySelector('.back-nav');

    if (front) {
      front.addEventListener('click', () => {
        postcard.classList.add('is-flipped');
      });
    }
    if (backNav) {
      backNav.addEventListener('click', (e) => {
        e.stopPropagation();
        postcard.classList.remove('is-flipped');
      });
    }
  });

  // --- Hilo / camino central: progreso + puntos por parada ---
  const thread = document.getElementById('caminoThread');
  const stops = Array.from(document.querySelectorAll('.stop'));

  if (thread && stops.length) {
    const dots = stops.map((stop) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'camino-dot';
      dot.setAttribute('aria-label', stop.dataset.camino || 'Sección');
      dot.addEventListener('click', () => {
        stop.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
      });
      thread.appendChild(dot);
      return { stop, dot };
    });

    function layoutDots() {
      const threadRect = thread.getBoundingClientRect();
      const first = stops[0].offsetTop;
      const last = stops[stops.length - 1].offsetTop;
      const span = Math.max(last - first, 1);

      dots.forEach(({ stop, dot }) => {
        const ratio = (stop.offsetTop - first) / span;
        dot.style.top = `${ratio * threadRect.height}px`;
      });
    }

    function updateProgress() {
      const scrollTop = window.scrollY;
      const viewMid = scrollTop + window.innerHeight * 0.5;

      let activeIndex = 0;
      stops.forEach((stop, i) => {
        if (stop.offsetTop <= viewMid) activeIndex = i;
      });
      dots.forEach(({ dot }, i) => dot.classList.toggle('is-active', i === activeIndex));

      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      thread.style.setProperty('--progress', `${progress}%`);
    }

    layoutDots();
    updateProgress();
    window.addEventListener('resize', () => { layoutDots(); updateProgress(); });
    window.addEventListener('scroll', updateProgress, { passive: true });
  }
});
