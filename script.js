// ─── PARTICULES HERO ───
const container = document.getElementById('particles');
for (let i = 0; i < 35; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.cssText = `
    left: ${Math.random() * 100}%;
    animation-duration: ${6 + Math.random() * 10}s;
    animation-delay: ${Math.random() * 8}s;
    width: ${1 + Math.random() * 2}px;
    height: ${1 + Math.random() * 2}px;
    opacity: ${0.3 + Math.random() * 0.5};
  `;
  container.appendChild(p);
}

// ─── SCROLL REVEAL ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ─── CHATBOT ───
const MISTRAL_API_KEY = 'jKuJl4JmrmQCAj94k4phtZDDWFVaVtRU';
const MODEL = 'mistral-small-latest';
const SYSTEM_PROMPT = `Tu es Chronos, l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.
Ton role : conseiller les clients sur les meilleures destinations temporelles.
Ton ton : professionnel mais chaleureux, passionne d'histoire, enthousiaste sans etre familier.
Tu connais parfaitement :
- Paris 1889 (Belle Epoque, Tour Eiffel, Exposition Universelle) — a partir de 18 990EUR
- Cretace -65 millions d'annees (dinosaures, nature prehistorique sauvage) — a partir de 24 990EUR
- Florence 1504 (Renaissance, art, Michel-Ange, Leonard de Vinci) — a partir de 21 490EUR
Tu peux suggerer des destinations selon les interets du client.
Reponds toujours en francais, de maniere concise (3-4 phrases max par reponse).
Si le client souhaite reserver, dis-lui de cliquer sur le bouton Reserver de la destination souhaitee.`;

let chatHistory = [];
let chatOpen = false;

function toggleChat() {
  chatOpen = !chatOpen;
  document.getElementById('chat-window').classList.toggle('open', chatOpen);
  document.getElementById('chat-btn').classList.toggle('open', chatOpen);
  if (chatOpen && chatHistory.length === 0) {
    setTimeout(() => addBotMessage('Bonjour et bienvenue chez TimeTravel Agency ! Je suis Chronos, votre guide temporel. Quelle epoque vous fait rever : la Belle Epoque parisienne, la Renaissance florentine, ou l\'ere des dinosaures ?'), 400);
  }
}

function addBotMessage(text) {
  const msgs = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'msg bot';
  div.innerHTML = '<div class="msg-avatar">&#128336;</div><div class="msg-bubble">' + text + '</div>';
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function addUserMessage(text) {
  const msgs = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'msg user';
  div.innerHTML = '<div class="msg-bubble">' + text + '</div>';
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function showTyping() {
  const msgs = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'msg bot'; div.id = 'typing-indicator';
  div.innerHTML = '<div class="msg-avatar">&#128336;</div><div class="msg-bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>';
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function removeTyping() {
  const t = document.getElementById('typing-indicator');
  if (t) t.remove();
}

async function sendMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  addUserMessage(text);
  chatHistory.push({ role: 'user', content: text });
  document.getElementById('send-btn').disabled = true;
  showTyping();

  if (MISTRAL_API_KEY === 'VOTRE_CLE_MISTRAL_ICI') {
    await new Promise(r => setTimeout(r, 900));
    removeTyping();
    const replies = [
      'Excellente question ! Pour une premiere experience temporelle, je recommande vivement Paris 1889 — la magie de la Belle Epoque est incomparable.',
      "Le Cretace est notre destination la plus extraordinaire : observer un Tyrannosaure dans son habitat naturel, en toute securite, est une experience inoubliable.",
      "Florence 1504, c'est croiser Leonard de Vinci et Michel-Ange dans les rues. Pour les amateurs d'art, c'est le summum absolu.",
      "Tous nos voyages incluent un guide expert, des costumes d'epoque et un hebergement de luxe reconstitue.",
      "Nos tarifs demarrent a 18 990EUR pour Paris 1889, 21 490EUR pour Florence 1504, et 24 990EUR pour le Cretace. Souhaitez-vous reserver ?"
    ];
    addBotMessage(replies[Math.floor(Math.random() * replies.length)]);
    chatHistory.push({ role: 'assistant', content: 'demo' });
    document.getElementById('send-btn').disabled = false;
    return;
  }

  try {
    const res = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + MISTRAL_API_KEY },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...chatHistory],
        max_tokens: 200, temperature: 0.75
      })
    });
    const data = await res.json();
    removeTyping();
    const reply = data.choices?.[0]?.message?.content || 'Une erreur est survenue, veuillez reessayer.';
    addBotMessage(reply);
    chatHistory.push({ role: 'assistant', content: reply });
  } catch(err) {
    removeTyping();
    addBotMessage('Erreur de connexion. Verifiez votre cle API Mistral.');
    console.error(err);
  }
  document.getElementById('send-btn').disabled = false;
}

function handleKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
}

// ─── MODAL ───
function openModal(dest) {
  document.getElementById('modal-dest-name').textContent = 'Destination : ' + dest;
  const sel = document.getElementById('modal-dest-select');
  for (let opt of sel.options) { if (opt.value === dest || opt.text === dest) { opt.selected = true; break; } }
  document.getElementById('modal-overlay').classList.add('open');
}

function closeModal(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModalBtn();
}

function closeModalBtn() {
  document.getElementById('modal-overlay').classList.remove('open');
}

function confirmReservation() {
  closeModalBtn();
  setTimeout(() => {
    addBotMessage('Votre demande de reservation a bien ete enregistree ! Notre equipe vous contactera dans les 24h pour finaliser votre voyage temporel.');
    if (!chatOpen) toggleChat();
  }, 300);
}
