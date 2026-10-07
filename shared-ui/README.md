# shared-ui

Gemensam CSS-bas för Umeå Energis interna verktyg och generatorer.

## Syfte

Ge alla interna verktyg ett konsekvent visuellt uttryck utan att binda dem till ett specifikt ramverk. `shared-ui` är en lättviktig uppsättning CSS-filer som ger:

- Enhetliga färger, typografi och spacing
- Grundläggande elementstilsättning
- Återanvändbara UI-komponenter (knappar, formulär, paneler, modaler, tabbar, accordion, toasts m.m.)
- Enkla layout- och spacing-hjälpare
- Automatisk stöd för ljust/mörkt tema (manuellt, system eller attribut)
- Cascade layers (`@layer`) för förutsägbar specificitet

Basen fungerar i vanilla HTML/JS, React, Vue, eller vilken annan teknikstack som helst.

---

## Filer och laddningsordning

Importera filerna i denna ordning:

```html
<link rel="stylesheet" href="/shared-ui/tokens.css">
<link rel="stylesheet" href="/shared-ui/base.css">
<link rel="stylesheet" href="/shared-ui/components.css">
<link rel="stylesheet" href="/shared-ui/utilities.css">

<!-- Verktygsspecifik CSS sist -->
<link rel="stylesheet" href="/app.css">
```

Eller med CSS `@import`:

```css
@import '../shared-ui/tokens.css';
@import '../shared-ui/base.css';
@import '../shared-ui/components.css';
@import '../shared-ui/utilities.css';
```

### Filöversikt

| Fil / mapp | Innehåll |
|---|---|
| `tokens.css` | Design tokens i CSS custom properties. Definierar `@layer`-ordning. Hanterar ljust/mörkt/system-tema. |
| `base.css` | Reset, font-face (Borna), grundstilar för html/body, rubriker, länkar, fokusmarkeringar |
| `components.css` | Alla återanvändbara komponenter: knappar, formulär, paneler, modal, switch, alert, badge, table, spinner, tabs, accordion, toast, dropdown, chip, progress, avatar, skeleton m.m. |
| `utilities.css` | Hjälpklasser: flex, grid, gap, stack, spacer, bredd, text, margin/padding, `.sr-only` |
| `fonts/` | Borna-typsnitt i woff2-format (Regular, Medium, Semibold + italic-varianter) |
| `logos/` | SVG-logotyper: standard, vit, ikon, slogan |
| `favicon.ico` | Favicon i ICO-format (32×32) |
| `styleguide.html` | Visuell referens som visar alla komponenter i aktion |

### Cascade Layers

Alla CSS-filer är indelade i lager via `@layer`:

```
@layer tokens, base, components, utilities;
```

Detta ger förutsägbar specificitet: utilities vinner alltid över components, som vinner över base. Verktygsspecifik CSS som inte placeras i ett lager hamnar utanför layer-ordningen och har högst specificitet.

---

## Assets

shared-ui levererar alla varumärkesresurser så att konsumerande verktyg inte behöver kopiera filer manuellt.

### Fonter

Borna-typsnittet (Umeå Energis varumärkesfont) ingår som woff2 i `fonts/`:

```
fonts/
  Borna-Regular.woff2
  Borna-RegularItalic.woff2
  Borna-Medium.woff2
  Borna-MediumItalic.woff2
  Borna-Semibold.woff2
  Borna-SemiboldItalic.woff2
```

`base.css` refererar till dessa via relativa sökvägar (`url("fonts/…")`). Om ditt verktyg kopierar shared-ui-filerna till en annan plats, överstyr `@font-face` i din lokala CSS **utanför** `@layer`:

```css
/* Lokal override – t.ex. om fonterna hamnar under /assets/fonts/ */
@font-face {
  font-family: "Borna";
  src: url("/assets/fonts/Borna-Regular.woff2") format("woff2");
  font-weight: 400; font-style: normal; font-display: swap;
}
```

### Logotyper

SVG-logotyper finns i `logos/`:

| Fil | Användning |
|---|---|
| `ue-logo.svg` | Standardlogotyp (mörk text) – för ljusa bakgrunder |
| `ue-logo-white.svg` | Vit text – för mörka/färgade bakgrunder |
| `ue-logo-icon.svg` | Bara symbolen (utan text) – för favicons, kompakta ytor |
| `ue-slogan.svg` | Slogan/tagline-grafik |

Använd i HTML:

```html
<img src="/shared-ui/logos/ue-logo.svg" alt="Umeå Energi" height="40">
```

Eller inline i toolbar:

```html
<header class="toolbar">
  <div class="toolbar__brand">
    <img src="/shared-ui/logos/ue-logo-icon.svg" alt="" height="24">
    Verktygsnamn
  </div>
</header>
```

### Favicon

```html
<link rel="icon" href="/shared-ui/favicon.ico" type="image/x-icon">
```

---

## Temahantering

### Manuellt tema

Sätt `data-theme` på `<html>`:

```js
document.documentElement.setAttribute('data-theme', 'dark');
document.documentElement.setAttribute('data-theme', 'light');
```

### Systempreferens (auto)

Om inget `data-theme`-attribut sätts, följer tokens automatiskt operativsystemets inställning via `prefers-color-scheme`. Ta bort `data-theme` för att aktivera auto:

```js
document.documentElement.removeAttribute('data-theme');
```

### Tema-väljare (JS-modul)

Se `theme.js` för en liten hjälpmodul som hanterar tema-val och sparar preferens i `localStorage`.

---

## Komponentöversikt

### Knappar

```html
<button class="btn">Primary (default)</button>
<button class="btn btn--primary">Primary</button>
<button class="btn btn--secondary">Secondary</button>
<button class="btn btn--ghost">Ghost</button>
<button class="btn btn--danger">Danger</button>
<button class="btn btn--sm">Small</button>
<button class="btn" disabled>Disabled</button>
```

### Formulär

```html
<div class="field">
  <label class="label" for="name">Namn</label>
  <input class="input" id="name" type="text" placeholder="Skriv här…">
  <span class="help-text">Ange fullständigt namn</span>
</div>

<div class="field">
  <label class="label" for="err">Med fel</label>
  <input class="input is-error" id="err">
  <span class="help-text is-error">Obligatoriskt fält</span>
</div>

<select class="select"><option>Välj…</option></select>
<textarea class="textarea" placeholder="Meddelande…"></textarea>
```

### Panel & Card

```html
<div class="panel">Större yta med rundade hörn och skugga</div>
<div class="card">Mindre kort med subtil skugga</div>
```

### Toolbar

```html
<header class="toolbar">
  <div class="toolbar__brand">
    <span class="toolbar__dot"></span>
    Verktygsnamn
  </div>
  <span class="spacer"></span>
  <button class="btn btn--sm">Åtgärd</button>
</header>
```

### Modal

```html
<div class="modal-overlay">
  <div class="modal">
    <div class="modal__header">
      <h2 class="modal__title">Rubrik</h2>
      <button class="modal__close" aria-label="Stäng">&times;</button>
    </div>
    <div class="modal__content">Innehåll</div>
  </div>
</div>
```

### Switch

```html
<label class="switch">
  <input type="checkbox">
  <span class="switch__track"></span>
</label>
```

### Alert

```html
<div class="alert alert--info">Information</div>
<div class="alert alert--success">Klart!</div>
<div class="alert alert--warning">Varning</div>
<div class="alert alert--error">Något gick fel</div>
```

### Badge

```html
<span class="badge">Default</span>
<span class="badge badge--primary">Primary</span>
<span class="badge badge--danger">Fel</span>
<span class="badge badge--success">OK</span>
```

### Tabs

```html
<!-- Underline tabs -->
<div class="tabs" role="tablist">
  <button class="tabs__tab is-active" role="tab">Flik 1</button>
  <button class="tabs__tab" role="tab">Flik 2</button>
</div>

<!-- Segmented / pill tabs -->
<div class="tabs tabs--segmented" role="tablist">
  <button class="tabs__tab is-active" role="tab">Val A</button>
  <button class="tabs__tab" role="tab">Val B</button>
</div>
```

### Accordion

```html
<div class="accordion">
  <div class="accordion__item">
    <button class="accordion__trigger" aria-expanded="true">
      Rubrik
      <svg class="accordion__icon">…</svg>
    </button>
    <div class="accordion__content is-open">
      <div class="accordion__body">Innehåll</div>
    </div>
  </div>
</div>
```

### Toast

Använd `role="status"` för informativa toasts och `role="alert"` för felmeddelanden:

```html
<div class="toast-container">
  <div class="toast toast--success" role="status">
    <span class="toast__message">Sparat!</span>
    <button class="toast__close" aria-label="Stäng">&times;</button>
  </div>
</div>
```

### Dropdown

```html
<div class="dropdown">
  <button class="btn btn--ghost">Meny ▾</button>
  <div class="dropdown__menu is-open">
    <button class="dropdown__item">Redigera</button>
    <button class="dropdown__item">Duplicera</button>
    <hr class="dropdown__divider">
    <button class="dropdown__item dropdown__item--danger">Ta bort</button>
  </div>
</div>
```

### Chip

```html
<span class="chip">Etikett</span>
<span class="chip chip--primary">
  Aktiv
  <button class="chip__remove">&times;</button>
</span>
```

### Progress

Ange ARIA-attribut för skärmläsare:

```html
<div class="progress" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">
  <div class="progress__bar" style="width: 65%"></div>
</div>
```

### Avatar

```html
<span class="avatar">ET</span>
<span class="avatar avatar--sm">A</span>
<span class="avatar avatar--lg"><img src="…" alt=""></span>
```

### Skeleton

```html
<div class="skeleton skeleton--heading"></div>
<div class="skeleton skeleton--text"></div>
<div class="skeleton skeleton--text" style="width:60%"></div>
```

### Table

```html
<table class="table">
  <thead><tr><th>Kolumn</th></tr></thead>
  <tbody><tr><td>Värde</td></tr></tbody>
</table>
```

### Spinner

Lägg till `role="status"` och en `.sr-only`-text så skärmläsare meddelar laddningsstatus:

```html
<span class="spinner" role="status"><span class="sr-only">Laddar…</span></span>
<span class="spinner spinner--sm" role="status"><span class="sr-only">Laddar…</span></span>
<span class="spinner spinner--lg" role="status"><span class="sr-only">Laddar…</span></span>
```

### Editor Shell

Trekolumnslayout som kollapsar till en kolumn under 1100px:

```html
<div class="editor-shell">
  <aside class="panel">Vänster</aside>
  <main>Mittinnehåll</main>
  <aside class="panel">Höger</aside>
</div>
```

---

## Riktlinjer

### Vad hör hemma i shared-ui?

- Tokens som delas av alla verktyg (färger, fonter, spacing)
- Grundelement (body, rubriker, länkar, formulär)
- Generella UI-komponenter som förekommer i fler än ett verktyg
- Layout-mönster som är generellt användbara

### Vad ska stanna lokalt i ett verktyg?

- Domänspecifika komponenter (t.ex. A4-sidpreview, dokumenttypografi i pt/mm)
- Verktygsspecifik affärslogik
- Komplexa layouter som är unika för ett enskilt verktyg (overlay-/peek-lägen)
- Komponenter som används i exakt ett verktyg

### Lägg till nya komponenter

1. Kontrollera att komponenten behövs i mer än ett verktyg
2. Följ befintlig namngivning: `.komponent`, `.komponent__del`, `.komponent--variant`
3. Använd tokens från `tokens.css` – hårdkoda inte färger eller mått
4. Säkerställ att fokusstilar och kontraster fungerar i både ljust och mörkt tema
5. Lägg komponenten i `components.css` under en tydlig sektionsrubrik
6. Dokumentera användning i denna fil

---

## Tillgänglighet

- Alla interaktiva element har `:focus-visible`-stilar
- `.sr-only` finns för visuellt dold text som skärmläsare ska nå
- `prefers-reduced-motion` stänger av animationer
- Tabs och accordion använder ARIA-attribut (`role`, `aria-selected`, `aria-expanded`)
- Kontraster kontrolleras mot WCAG AA i båda teman
- `--on-primary`, `--on-danger` och `--on-success` garanterar textkontrast på statusbakgrunder
- Toast: använd `role="status"` (info/success/warning) eller `role="alert"` (error)
- Progress: använd `role="progressbar"` med `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Spinner: använd `role="status"` och en `.sr-only`-text ("Laddar…")
- Modal: implementera fokusfälla (trap focus) i JS – fokus ska stanna i modalen och återställas vid stängning
