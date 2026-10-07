# Umeå Energi appslideshow

Fristående vanilla HTML/CSS/JS-slideshow för att visa Umeå Energis app i ett Storyblok iframe-block.

Komponenten är byggd för en fast iframe-höjd på cirka `850px`, transparent bakgrund och responsiv layout baserad på iframens egen bredd.

## Funktioner

- Vanilla HTML, CSS och JavaScript.
- Transparent bakgrund så Storyblok-sektionens bakgrund syns igenom.
- Responsiv layout:
  - bred iframe: telefon till vänster, slide-copy till höger
  - smal iframe: telefon, navigation och slide-copy staplat
- Telefonram från `assets/phone.png`.
- Appskärmar maskas innanför telefonens skärmyta.
- Horisontell slide-animation mellan skärmar.
- Vertikal scroll inuti telefonen när en appskärm är längre än visningsytan.
- Light/dark-val för appskärmarna.
- Text utanför telefonen följer användarens `prefers-color-scheme`, inte appens light/dark-val.
- Navigation med föregående/nästa, swipe och piltangenter.
- Loop från sista till första slide.
- Ingen autoplay.
- Respekterar `prefers-reduced-motion`.

## Filstruktur

```text
.
├── index.html
├── styles.css
├── script.js
├── assets/
│   ├── phone.png
│   ├── light-home.jpg
│   ├── dark-home.jpg
│   ├── light-current-month.jpg
│   ├── dark-current-month.jpg
│   ├── light-heating.jpg
│   ├── dark-heating.jpg
│   ├── light-comparison.jpg
│   ├── dark-comparison.jpg
│   ├── light-invoices.jpg
│   ├── dark-invoices.jpg
│   ├── light-more.jpg
│   └── dark-more.jpg
└── shared-ui/
    ├── tokens.css
    ├── base.css
    ├── components.css
    ├── utilities.css
    └── ...
```

## Lokal preview

Starta en enkel lokal server i projektmappen:

```bash
python3 -m http.server 8787
```

Öppna sedan:

```text
http://127.0.0.1:8787/index.html
```

## Rekommenderad iframe

```html
<iframe
  src="https://example.com/app-slideshow/index.html"
  title="Umeå Energi-appen"
  style="width:100%;height:850px;border:0;background:transparent;"
  allowtransparency="true"
></iframe>
```

Viktigt: iframens höjd sätts av sidan som bäddar in komponenten. Komponenten är optimerad för `850px` och fyller inte nödvändigtvis hela höjden på alla bredder.

## Anpassa slides

Slides definieras i `script.js`:

```js
{
  title: 'Få snabb överblick',
  text: 'Se användning, fakturor och viktiga genvägar direkt på startsidan.',
  light: 'assets/light-home.jpg',
  dark: 'assets/dark-home.jpg',
}
```

Varje slide ska ha:

- `title`: kort rubrik
- `text`: kort beskrivning, helst max 1-2 rader
- `light`: appskärm för ljust läge
- `dark`: appskärm för mörkt läge

Skärmbilderna bör ha samma bredd och vara exporterade utan telefonram. Telefonramen läggs ovanpå av komponenten.

## Tema och färger

Det finns två separata temalager:

- Appskärmens läge styrs av textvalen `Mörkt läge` och `Ljust läge`.
- Texten utanför telefonen följer användarens systemtema via `prefers-color-scheme` och `shared-ui`-tokens.

Det betyder att besökaren kan titta på appen i mörkt eller ljust läge utan att texten utanför telefonen byter färg av appvalet.

## Telefonmask

Telefonen består av två lager:

1. `.screen-viewport` visar och klipper appskärmarna.
2. `assets/phone.png` ligger ovanpå som telefonram.

Maskens position styrs i `styles.css` med:

```css
--phone-top: 2.65%;
--phone-right: 6.4%;
--phone-bottom: 2.65%;
--phone-left: 6.5%;
```

Ändra bara dessa värden om telefonramen byts ut.

## Publiceringschecklista

- Alla assets har webbsäkra filnamn.
- `index.html`, `styles.css`, `script.js`, `assets/` och `shared-ui/` publiceras tillsammans.
- Iframen har `width: 100%`, `height: 850px`, `border: 0` och transparent bakgrund.
- Testa minst dessa bredder:
  - cirka `320px`
  - cirka `390px`
  - cirka `760px`
  - desktopbredd
- Testa både ljust och mörkt systemtema.
- Testa att appskärmar som är längre än telefonen går att scrolla inuti telefonen.

## Browserstöd

Komponenten använder modern CSS och bör fungera i aktuella versioner av Chrome, Edge, Safari och Firefox.

Notera att `:has()` används för fokusstil på temavalet. Om stöd för äldre webbläsare krävs kan den regeln ersättas med en enklare fokusstil på input/label.
