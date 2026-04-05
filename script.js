/* ===================================================
   WHERE IS LOYOLA SANTHOSH? — script.js
   =================================================== */

const LAST_DM = new Date('2026-04-04T19:02:00');   // Latest response after tracker was shared
const LAST_GROUP = new Date('2026-03-26T17:45:00');
const ORIGINAL_SILENCE = new Date('2026-03-27T02:56:00'); // Original radio silence date

/* ---------- Excuse data ---------- */
const EXCUSES = [
  { text: '"He\'s probably fine. This is just how he operates."', source: '— Common Knowledge' },
  { text: '"Loyola Santhosh is crafting the perfect reply. It\'s been days. Must be a really good one."', source: '— Optimistic Take' },
  { text: '"His phone died. His charger broke. His electricity got cut. All at once. Very plausible."', source: '— Technical Analysis' },
  { text: '"He became a monk. Monks don\'t text. Simple."', source: '— Research Division' },
  { text: '"He saw the notification, thought about replying, got distracted. Repeat for 8 days."', source: '— Extremely Relatable Behaviour Unit' },
  { text: '"He is stuck in the longest traffic jam ever recorded. Happens."', source: '— Geographic Bureau' },
  { text: '"He\'s preparing a meme so good it justifies the wait. Art takes time."', source: '— Cultural Wing' },
  { text: '"He\'s working on a startup. Series A any day now. Then he\'ll text."', source: '— Entrepreneurship Lab' },
  { text: '"He\'s on a mountain somewhere. Breathing clean air. Good for him honestly."', source: '— Wellness Department' },
  { text: '"He hit a final boss in some game. Can\'t pause. We get it."', source: '— Gaming Division' },
  { text: '"He fell asleep at 2:56 AM and simply hasn\'t woken up yet. Legend."', source: '— Sleep Studies Unit' },
  { text: '"He\'s planning something big. The silence is strategic. Allegedly."', source: '— Conspiracy Desk' },
];

let excuseIndex = Math.floor(Math.random() * EXCUSES.length);

function showExcuse() {
  const el = document.getElementById('excuse-text');
  const src = document.getElementById('excuse-source');
  if (!el || !src) return;
  el.style.opacity = '0';
  setTimeout(() => {
    el.textContent = EXCUSES[excuseIndex].text;
    src.textContent = EXCUSES[excuseIndex].source;
    el.style.opacity = '1';
  }, 200);
}

function nextExcuse() {
  excuseIndex = (excuseIndex + 1) % EXCUSES.length;
  showExcuse();
}

/* ---------- Alert level ---------- */
function getAlertLevel(days) {
  if (days < 7) return { status: 'ALL GOOD', desc: 'Literally no one is worried. We\'re just vibing.', pct: 15 };
  if (days < 14) return { status: 'SLIGHTLY FUNNY', desc: 'Okay it\'s been a minute. Still funny though.', pct: 35 };
  if (days < 21) return { status: 'CONTENT UNLOCKED', desc: 'This is now website-worthy. And so it was built.', pct: 60 };
  if (days < 30) return { status: 'LORE DEEPENING', desc: 'At this point it\'s a meme. Loyola Santhosh is the meme.', pct: 78 };
  if (days < 47) return { status: 'LEGENDARY ARC', desc: 'Loyola Santhosh has achieved main character status. Respect.', pct: 90 };
  return { status: 'HISTORICAL', desc: 'This website is now a monument. Loyola Santhosh is immortalised.', pct: 99 };
}

/* ---------- Main update loop ---------- */
function update() {
  const now = new Date();
  const diffMs = now - LAST_DM;

  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const days = Math.floor(totalHours / 24);

  const displaySeconds = totalSeconds % 60;
  const displayMinutes = totalMinutes % 60;
  const displayHours = totalHours % 24;

  const fmt = n => String(n).padStart(2, '0');

  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  set('cnt-days', String(days));
  set('cnt-hours', fmt(displayHours));
  set('cnt-minutes', fmt(displayMinutes));
  set('cnt-seconds', fmt(displaySeconds));

  /* Alert level */
  const alert = getAlertLevel(days);
  set('alert-status', alert.status);
  set('alert-desc', alert.desc);
  const bar = document.getElementById('alert-bar');
  if (bar) bar.style.width = alert.pct + '%';

  /* Patience metrics */
  set('p-drafts', days + 0.6);
  set('p-refresh', (days * 8).toLocaleString());
  set('p-soon', days * 5);
  set('p-snacks', Math.floor(days * 4));

  /* Reset log — total from original silence */
  const origDiffMs = now - ORIGINAL_SILENCE;
  const origTotalHours = Math.floor(origDiffMs / (1000 * 60 * 60));
  const origTotalDays = Math.floor(origDiffMs / (1000 * 60 * 60 * 24));
  set('rl-total-hours', origTotalHours.toLocaleString());
  set('rl-total-days', origTotalDays);
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  showExcuse();
  update();
  setInterval(update, 1000);

  const btn = document.getElementById('excuse-btn');
  if (btn) btn.addEventListener('click', nextExcuse);

  /* Animate alert bar after short delay */
  setTimeout(() => update(), 300);
});
