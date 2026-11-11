// Tiny dependency-free confetti burst. Skips itself when the user prefers reduced motion.
const COLORS = ["#e0218a", "#f4c7c3", "#c9a25a", "#8fd6d2", "#fff6ee"]; // magenta, blush, gold, mint, cream

export function confetti(x = window.innerWidth / 2, y = window.innerHeight / 3, count = 40) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "confetti-bit";
    el.style.background = COLORS[i % COLORS.length];
    document.body.appendChild(el);
    const angle = Math.random() * Math.PI * 2;
    const dist = 80 + Math.random() * 180;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 120;
    el.animate(
      [
        { transform: `translate(${x}px, ${y}px) rotate(0deg)`, opacity: 1 },
        { transform: `translate(${x + dx}px, ${y + dy + 260}px) rotate(${Math.random() * 720 - 360}deg)`, opacity: 0 },
      ],
      { duration: 1100 + Math.random() * 700, easing: "cubic-bezier(.2,.7,.4,1)" },
    ).onfinish = () => el.remove();
  }
}
