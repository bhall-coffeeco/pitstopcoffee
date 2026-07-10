(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const closeMenu = () => {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
  };
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('open', !open);
      document.body.classList.toggle('menu-open', !open);
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    addEventListener('resize', () => { if (innerWidth > 760) closeMenu(); });
  }
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    items.forEach(item => observer.observe(item));
  } else items.forEach(item => item.classList.add('visible'));
  const form = document.getElementById('quote-form');
  if (form) form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const v = key => String(data.get(key) || '').trim();
    const subject = `Event inquiry — ${v('eventType') || 'Coffee cart'}`;
    const body = [
      'Hi Pit Stop Coffee Shop,', '',
      'I would like to ask about coffee cart service for an event.', '',
      `Name: ${v('name')}`, `Reply email: ${v('email')}`,
      `Event type: ${v('eventType')}`, `Estimated guests: ${v('guests')}`,
      `Event date: ${v('date') || 'Not selected'}`, `Event city: ${v('city') || 'Not provided'}`, '',
      'Event details:', v('message') || 'No additional details yet.', '', 'Thank you!'
    ].join('\n');
    location.href = `mailto:info@pitstopcoffee.co?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
