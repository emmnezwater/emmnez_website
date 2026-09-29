import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const header = document.querySelector<HTMLElement>('[data-header]');
const menuButton = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
const backdrop = document.querySelector<HTMLElement>('[data-menu-backdrop]');
let previousFocus: HTMLElement | null = null;

const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 36);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

function setMenu(open: boolean) {
  if (!menuButton || !menu || !backdrop) return;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menu.setAttribute('aria-hidden', String(!open));
  menu.classList.toggle('is-open', open);
  backdrop.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
  if (open) {
    previousFocus = document.activeElement as HTMLElement;
    menu.querySelector<HTMLElement>('a')?.focus();
  } else previousFocus?.focus();
}

menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
backdrop?.addEventListener('click', () => setMenu(false));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') setMenu(false);
  if (event.key !== 'Tab' || menu?.getAttribute('aria-hidden') === 'true') return;
  const focusable = [...(menu?.querySelectorAll<HTMLElement>('a, button') ?? [])];
  const first = focusable[0];
  const last = focusable.at(-1);
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
});

if (!reducedMotion) {
  gsap.from('[data-hero-line]', { y: 28, opacity: .18, duration: .85, stagger: .1, ease: 'power4.out', delay: .05, immediateRender: false });
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(element => {
    gsap.from(element, { y: 42, opacity: 0, duration: .85, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 88%', once: true } });
  });
  gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach(parent => {
    gsap.from([...parent.children], { y: 34, opacity: 0, duration: .7, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: parent, start: 'top 84%', once: true } });
  });
  document.querySelectorAll<HTMLElement>('[data-counter]').forEach(element => {
    const target = Number(element.dataset.counter);
    const suffix = element.dataset.suffix ?? '';
    const value = { current: 0 };
    gsap.to(value, { current: target, duration: 1.8, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 90%', once: true }, onUpdate: () => { element.textContent = `${Math.round(value.current)}${suffix}`; } });
  });
  const progress = document.querySelector<HTMLElement>('.pipeline-progress');
  if (progress) gsap.to(progress, { height: 'calc(100% - 4rem)', ease: 'none', scrollTrigger: { trigger: '.pipeline', start: 'top 65%', end: 'bottom 65%', scrub: true } });

  const hero = document.querySelector<HTMLElement>('.hero');
  const waveCanvas = document.querySelector<HTMLCanvasElement>('[data-hero-waves]');
  const lens = document.querySelector<HTMLElement>('[data-hero-lens]');
  if (hero && waveCanvas && lens && matchMedia('(pointer:fine)').matches) {
    const context = waveCanvas.getContext('2d');
    type Ripple = { x: number; y: number; radius: number; life: number; strength: number };
    const ripples: Ripple[] = [];
    let lastRipple = 0;
    let active = false;
    let frame = 0;

    const resizeWaves = () => {
      const ratio = Math.min(devicePixelRatio, 1.5);
      const bounds = hero.getBoundingClientRect();
      waveCanvas.width = Math.round(bounds.width * ratio);
      waveCanvas.height = Math.round(bounds.height * ratio);
      waveCanvas.style.width = `${bounds.width}px`;
      waveCanvas.style.height = `${bounds.height}px`;
      context?.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const addRipple = (x: number, y: number, strength = 1) => {
      ripples.push({ x, y, radius: 8, life: 1, strength });
      if (ripples.length > 12) ripples.shift();
    };
    const paintWaves = () => {
      if (!context) return;
      const bounds = hero.getBoundingClientRect();
      context.clearRect(0, 0, bounds.width, bounds.height);
      context.globalCompositeOperation = 'screen';
      for (let index = ripples.length - 1; index >= 0; index -= 1) {
        const ripple = ripples[index];
        ripple.radius += 1.7 + ripple.strength;
        ripple.life -= .014 + ripple.strength * .002;
        if (ripple.life <= 0) { ripples.splice(index, 1); continue; }
        const gradient = context.createRadialGradient(ripple.x, ripple.y, Math.max(0, ripple.radius - 7), ripple.x, ripple.y, ripple.radius + 7);
        gradient.addColorStop(0, 'rgba(147,241,230,0)');
        gradient.addColorStop(.46, `rgba(147,241,230,${ripple.life * .1 * ripple.strength})`);
        gradient.addColorStop(.54, `rgba(255,255,255,${ripple.life * .2 * ripple.strength})`);
        gradient.addColorStop(1, 'rgba(38,214,197,0)');
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(ripple.x, ripple.y, ripple.radius + 8, 0, Math.PI * 2);
        context.fill();
      }
      if (active || ripples.length) frame = requestAnimationFrame(paintWaves);
      else frame = 0;
    };
    const positionEffect = (event: PointerEvent) => {
      const bounds = hero.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      lens.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      const now = performance.now();
      if (now - lastRipple > 95) { addRipple(x, y, .72); lastRipple = now; }
      if (!frame) frame = requestAnimationFrame(paintWaves);
    };
    hero.addEventListener('pointerenter', event => {
      active = true;
      lens.classList.add('is-active');
      resizeWaves();
      positionEffect(event);
    });
    hero.addEventListener('pointermove', positionEffect, { passive: true });
    hero.addEventListener('pointerdown', event => {
      const bounds = hero.getBoundingClientRect();
      addRipple(event.clientX - bounds.left, event.clientY - bounds.top, 1.8);
    });
    hero.addEventListener('pointerleave', () => {
      active = false;
      lens.classList.remove('is-active');
      if (!frame) frame = requestAnimationFrame(paintWaves);
    });
    window.addEventListener('resize', resizeWaves, { passive: true });
  }

}

const form = document.querySelector<HTMLFormElement>('[data-quote-form]');
const formStatus = document.querySelector<HTMLElement>('[data-form-status]');
form?.addEventListener('submit', async event => {
  event.preventDefault();
  if (!formStatus || !form.reportValidity()) return;
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  if (!submit) return;
  submit.disabled = true;
  const original = submit.textContent;
  submit.textContent = 'Sending request…';
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 12000);
  try {
    const ajaxAction = form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');
    const response = await fetch(ajaxAction, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' }, signal: controller.signal });
    if (!response.ok) throw new Error('Submission failed');
    formStatus.textContent = 'Thank you. Your request has been sent and our team will contact you shortly.';
    formStatus.className = 'form-status is-visible';
    form.reset();
  } catch {
    formStatus.textContent = `We could not send your request. Please call or WhatsApp us instead.`;
    formStatus.className = 'form-status is-visible';
  } finally {
    clearTimeout(timeout);
    submit.disabled = false;
    submit.textContent = original;
    formStatus.focus();
  }
});
