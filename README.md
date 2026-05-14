# Portfolio — Dieter Foos

Persönliche Portfolio-Seite (Frontend-Entwickler, München).

**Live:** _<https://your-live-url.example>_ ← bitte ergänzen

## Stack

- Plain HTML / CSS / JavaScript (ES-Module)
- [Tailwind CSS v4](https://tailwindcss.com) für Utility-Klassen
- Optional: PHP für das Kontaktformular (`contact_form_mail.php`)

## Setup

```bash
npm install        # Dev-Dependencies installieren (Tailwind CLI)
npm run build      # css/tailwind.css einmal generieren
npm run watch      # Tailwind im Watch-Modus
```

Die Seite ist statisch — `index.html` kann direkt in jedem statischen Hoster (GitHub Pages, Netlify, eigener Webserver …) ausgeliefert werden.

## Projektstruktur

```
.
├── index.html
├── legal.html
├── tailwind-input.css      # Tailwind-Quelle (mit @theme-Variablen)
├── css/
│   ├── tailwind.css        # generiert aus tailwind-input.css
│   ├── global.css          # globale Basis-Styles
│   ├── main.css            # Komponenten-Styles
│   ├── section-hero.css    # Hero-Sektion
│   └── legal.css
├── js/
│   ├── main.js             # Entry-Point
│   ├── lang.js             # Sprachumschalter (DE/EN)
│   ├── menu.js             # Mobile-Menü
│   ├── projects.js         # Projekt-Liste + Overlay
│   ├── carousel.js         # Referenzen-Karussell
│   ├── ui.js               # Maus-Gradient, Checkbox, Textarea-Resize …
│   ├── template.js         # HTML-Templates
│   └── scrollable-buttons.js
├── json/
│   ├── projects.json
│   └── en.json             # englische Übersetzungen
└── assets/                 # Bilder, Icons, Fonts
```

## Kontakt

[contact@dieter-foos.de](mailto:contact@dieter-foos.de) · [GitHub](https://github.com/dfo81) · [LinkedIn](https://www.linkedin.com/in/dieter-foos-7a13a63ba/)
