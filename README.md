# 🕰️ TimeTravel Agency — Webapp Interactive

> Projet pédagogique M1 Informatique — Ynov Campus  
> Projet Supervisé IA — Session 2 : WEBAPP & IA AGENTS

---

## 👥 Membres du groupe

| Nom | Prénom |
|-----|--------|
| Moumine | Wassim |
| Arroud | Rayan |
| Boubeker | Sami |
---

## 🎯 Description du projet

Webapp interactive pour **TimeTravel Agency**, une agence de voyage temporel fictive de luxe.  
L'application permet aux visiteurs de découvrir trois destinations historiques, d'interagir avec un agent conversationnel IA, et de simuler une réservation de voyage temporel.

---

## 🛠️ Stack Technique

| Composant | Technologie |
|-----------|-------------|
| Structure | HTML5 sémantique (single-file app) |
| Style | CSS3 custom (variables, animations, responsive) |
| Interactivité | Vanilla JavaScript (ES2020+) |
| Chatbot IA | API Mistral AI — modèle `mistral-small-latest` |
| Images | Encodées en Base64 (assets Session 1 intégrés) |
| Déploiement | Netlify Drop (drag & drop) |

> **Choix d'architecture :** single-file HTML pour simplifier le déploiement et éviter toute dépendance serveur. Les images sont embarquées en base64 pour garantir un fonctionnement offline et faciliter le rendu Moodle.

---

## ✨ Features implémentées

### Phase 1 — Architecture
- [x] Définition des features et navigation (Header → Hero → About → Destinations → Experience → Footer)
- [x] Structure responsive mobile-first

### Phase 2 — Génération de code
- [x] **Hero section** avec particules animées et call-to-action
- [x] **Section À propos** avec stats et timeline chronologique
- [x] **Galerie des 3 destinations** — cards interactives avec hover effects
  - Paris 1889 (Belle Époque)
  - Crétacé −65 000 000 (Dinosaures)
  - Florence 1504 (Renaissance)
- [x] **Visuels Session 1** intégrés (images hero générées par IA en Session 1)
- [x] **Section Expériences** (arguments de vente)
- [x] **Animations CSS** : fade-in au scroll (IntersectionObserver), particules flottantes, hover sur cards
- [x] **Modal de réservation** avec pré-remplissage de la destination

### Phase 3 — Intelligence Artificielle
- [x] **Agent conversationnel Chronos** (widget flottant bas-droite)
  - Intégration API Mistral AI (`mistral-small-latest`)
  - Système de personnalité défini via system prompt
  - Historique de conversation maintenu en session
  - Animation de frappe (typing dots)
  - Fallback démo si clé API absente

### Phase 4 — Documentation & Déploiement
- [x] README complet (ce fichier)
- [x] Code commenté et structuré
- [x] Déploiement Netlify

---

## 🤖 IA Utilisées

| Usage | Outil / Modèle |
|-------|----------------|
| Génération du code | Claude Sonnet 4.6 (via Claude.ai) |
| Chatbot conversationnel | Mistral AI — `mistral-small-latest` |
| Visuels des destinations | Générés en Session 1 (IA générative d'images) |
| Redimensionnement images | Pillow (Python) — traitement automatisé |

---

## 🤖 Prompts utilisés

### Prompt système du chatbot Chronos

```
Tu es Chronos, l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.
Ton rôle : conseiller les clients sur les meilleures destinations temporelles.
Ton ton : professionnel mais chaleureux, passionné d'histoire, enthousiaste sans être familier.
Tu connais parfaitement :
- Paris 1889 (Belle Époque, Tour Eiffel, Exposition Universelle) — à partir de 18 990€
- Crétacé −65 millions d'années (dinosaures, nature préhistorique sauvage) — à partir de 24 990€
- Florence 1504 (Renaissance, art, Michel-Ange, Léonard de Vinci) — à partir de 21 490€
Tu peux suggérer des destinations selon les intérêts du client.
Réponds toujours en français, de manière concise (3-4 phrases max par réponse).
Si le client souhaite réserver, dis-lui de cliquer sur le bouton "Réserver" de la destination souhaitée.
```

### Prompt de génération du code (Claude.ai)

```
Génère une webapp complète en single-file HTML pour TimeTravel Agency,
agence de voyage temporel de luxe. Design dark mode premium, accents dorés (#c9a84c).
Sections : nav fixe, hero avec particules animées, about avec timeline, 
3 destination cards avec images base64, section expériences, footer.
Chatbot widget flottant bas-droite avec API Mistral.
Modal de réservation. Animations CSS scroll reveal. Responsive mobile-first.
```

---

## 📁 Structure du projet

```
TimeTravel_Agency.html    ← Application complète (single-file)
README.md                 ← Ce fichier
```

---

## 🚀 Installation & Déploiement

### Ouvrir en local
Double-cliquer sur `TimeTravel_Agency.html` — aucune installation requise.

### Activer le chatbot IA
1. Créer un compte sur [console.mistral.ai](https://console.mistral.ai)
2. Générer une clé API gratuite
3. Dans `TimeTravel_Agency.html`, remplacer `VOTRE_CLE_MISTRAL_ICI` par la clé (ligne ~320 du `<script>`)

### Déployer en ligne (Netlify)
1. Aller sur [app.netlify.com/drop](https://app.netlify.com/drop)
2. Glisser-déposer `TimeTravel_Agency.html`
3. L'URL publique est générée en < 30 secondes

---

## 🎨 Choix de design

- **Palette** : fond #0a0a0f (quasi-noir), accents or #c9a84c, texte #e8e8f0
- **Typographie** : Georgia serif pour l'élégance historique
- **Animations** : particules flottantes sur le hero, fade-up au scroll via IntersectionObserver, transitions hover sur les cards (translateY + glow)
- **UX** : navigation fixe, scroll fluide, modal avec fermeture au clic extérieur, chatbot avec historique

---

## 📄 Licence

Projet pédagogique — M1 Informatique, Ynov Campus  
Assets visuels générés par IA dans un cadre éducatif non-commercial.

---

## 🙏 Crédits

- **API chatbot** : [Mistral AI](https://mistral.ai) — modèle open source `mistral-small`
- **Visuels** : générés par IA en Session 1 du projet (droits pédagogiques)
- **Génération de code** : Claude Sonnet 4.6 (Anthropic)
- **Inspiration design** : Awwwards, Dribbble
