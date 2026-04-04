/* ===================================================
   WHERE IS LOYOLA SANTHOSH? — script.js
   =================================================== */

const LAST_DM    = new Date('2026-03-27T02:56:00');
const LAST_GROUP = new Date('2026-03-26T17:45:00');

/* ---------- Excuse data ---------- */
const EXCUSES = [
  { text: '"Loyola Santhosh is fine. He just needs time. As he stated. Deepak and Matheshaww respect this."', source: '— Official Position of the Waiting Committee' },
  { text: '"Loyola Santhosh is crafting the perfect reply for Deepak and Matheshaww. It takes time to be this thoughtful."', source: '— Optimism Department' },
  { text: '"His thumbs are temporarily unavailable. No further statement from Loyola Santhosh at this time."', source: '— Official Communiqué' },
  { text: '"Loyola Santhosh became a monk. Monks do not text Deepak or Matheshaww. This is entirely consistent."', source: '— Research Division' },
  { text: '"He saw the notification, thought deeply about replying, got distracted, and repeated this for several days."', source: '— Extremely Relatable Behaviour Unit' },
  { text: '"Loyola Santhosh is stuck in the longest traffic jam in recorded history. Deepak and Matheshaww are patient."', source: '— Geographic Excuse Bureau' },
  { text: '"He is emotionally preparing a very good meme to send when he returns. Great art takes time."', source: '— Cultural Analysis Wing' },
  { text: '"Loyola Santhosh is planning a surprise for Deepak and Matheshaww. The silence is strategic. Trust the process."', source: '— Hopeful Speculation Unit' },
  { text: '"He is doing great things and simply forgot. He will feel very bad about it later. Deepak and Matheshaww forgive him."', source: '— Forgiving Committee' },
  { text: '"Loyola Santhosh\'s phone battery died at 02:56 AM. He has no charger. He has no power bank. He lives in the dark now."', source: '— Technical Fault Division' },
  { text: '"He is writing a very long, very heartfelt message for Deepak and Matheshaww and wants it to be absolutely perfect."', source: '— Sweet Theory Department' },
  { text: '"Loyola Santhosh is on a vision quest. He will return transformed. He will have many things to tell Deepak and Matheshaww."', source: '— Spiritual Hypothesis Bureau' },
  { text: '"Loyola Santhosh is working on a startup. The startup requires 100% focus. Messaging Deepak and Matheshaww is a distraction. It will be a great startup. Series A is coming. Then he will text."', source:'— Entrepreneurship Excuse Lab'},
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
  if (days < 7)  return { status: 'ALL CHILL',          desc: 'Loyola Santhosh just needs a moment. Deepak and Matheshaww are unbothered.', pct: 15 };
  if (days < 14)  return { status: 'MILD CONCERN',       desc: 'Has anyone checked if Loyola Santhosh is okay? (He is okay.) The committee notes this.', pct: 35 };
  if (days < 21) return { status: 'GETTING DRAMATIC',   desc: 'Deepak has deployed a website. Matheshaww co-signed. The situation has officially escalated.', pct: 60 };
  if (days < 30) return { status: 'DEEPLY SUSPICIOUS',  desc: 'Loyola Santhosh has been unreachable for over two weeks. Deepak and Matheshaww are on record.', pct: 78 };
  if (days < 47) return { status: 'LEGENDARY SILENCE',  desc: 'Loyola Santhosh has achieved what most cannot. Deepak and Matheshaww respect the arc.', pct: 90 };
  return         { status: 'HISTORICAL',                 desc: 'Textbooks will be written. Loyola Santhosh will be in them. Deepak and Matheshaww: footnotes.', pct: 99 };
}

/* ---------- Main update loop ---------- */
function update() {
  const now    = new Date();
  const diffMs = now - LAST_DM;

  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours   = Math.floor(totalMinutes / 60);
  const days         = Math.floor(totalHours / 24);

  const displaySeconds = totalSeconds % 60;
  const displayMinutes = totalMinutes % 60;
  const displayHours   = totalHours % 24;

  const fmt = n => String(n).padStart(2, '0');

  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  set('cnt-days',    String(days));
  set('cnt-hours',   fmt(displayHours));
  set('cnt-minutes', fmt(displayMinutes));
  set('cnt-seconds', fmt(displaySeconds));

  /* Alert level */
  const alert = getAlertLevel(days);
  set('alert-status', alert.status);
  set('alert-desc',   alert.desc);
  const bar = document.getElementById('alert-bar');
  if (bar) bar.style.width = alert.pct + '%';

  /* Patience metrics */
  set('p-drafts',  days + 3);
  set('p-refresh', (days * 8).toLocaleString());
  set('p-soon',    days * 5);
  set('p-snacks',  Math.floor(days * 4));
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
