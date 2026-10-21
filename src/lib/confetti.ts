// Lightweight zero-dependency celebration confetti engine
export default function triggerCelebration(options?: { particleCount?: number; spread?: number }) {
  const count = options?.particleCount || 60;
  const colors = ['#00F0FF', '#00E599', '#F59E0B', '#8B5CF6', '#FFFFFF'];

  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100vw';
  container.style.height = '100vh';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '9999';
  container.style.overflow = 'hidden';
  document.body.appendChild(container);

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 8 + 6;

    p.style.position = 'absolute';
    p.style.width = `${size}px`;
    p.style.height = `${size * 0.6}px`;
    p.style.backgroundColor = color;
    p.style.borderRadius = '2px';
    p.style.top = '50%';
    p.style.left = '50%';
    p.style.opacity = '1';
    p.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
    container.appendChild(p);

    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 450 + 200;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity - 200;

    let posX = 0;
    let posY = 0;
    let opacity = 1;
    let startTime: number | null = null;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = (time - startTime) / 1000;

      if (elapsed > 1.8) {
        p.remove();
        return;
      }

      posX = vx * elapsed;
      posY = vy * elapsed + 0.5 * 600 * elapsed * elapsed; // gravity
      opacity = Math.max(0, 1 - elapsed / 1.8);

      p.style.transform = `translate(calc(-50% + ${posX}px), calc(-50% + ${posY}px)) rotate(${elapsed * 720}deg)`;
      p.style.opacity = `${opacity}`;

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  setTimeout(() => {
    container.remove();
  }, 2200);
}
