# Projektplan: Visuelles Training App für ADHS

## Projektübersicht
Web-App zur Anzeige von Zahlen-/Symbol-Matrizen für visuelles Training. Die App soll verschiedene Symbol-Sets, Schriftgrößen, Schriftarten unterstützen und PDF-Export ermöglichen.

## Technologie-Stack (Finale Entscheidung)

### Frontend-Framework
- **Vanilla JavaScript + Vite** (leichtgewichtig, keine Framework-Overhead)
- ODER **Svelte + Vite** (sehr leichtgewichtig, reaktives System ohne Virtual DOM)
- **TypeScript** (optional, aber empfohlen für bessere Code-Qualität)

**Entscheidung**: Vanilla JS + Vite ist am einfachsten und schnellsten für diese Anwendung. Keine Framework-Dependencies nötig.

### Styling
- **Vanilla CSS** mit CSS Custom Properties für dynamische Werte
- **CSS Grid/Flexbox** für Layout
- Optional: **CSS Variables** für Themes

### PDF-Export
- **jsPDF** + **html2canvas** für Client-seitigen PDF-Export
- ODER **html2pdf.js** (einfacher, aber weniger Kontrolle)

### Build-Tools
- **Vite** (schnell, modern, perfekt für Vanilla JS)
- **npm** als Package Manager

### Backend
- **Kein Backend nötig** - reine Client-Side App

## Detaillierte Feature-Liste

### 1. Zahlen-Matrix Anzeige
- **Dynamische Matrix-Größe**: ✅ **KONFIGURIERBAR** - Benutzer kann Zeilen/Spalten anpassen
- **Layout**: ✅ **KONFIGURIERBAR** - Rechteckig, Diamant, Triangular, etc.
- **Zufällige/Strukturierte Generierung**: Option für zufällige oder strukturierte Anordnung
- **Responsive Design**: Anpassung an verschiedene Bildschirmgrößen

### 2. Symbol-Sets (Auswählbar)
- **Alle Zahlen**: 0-9
- **Binär**: Nur 0 und 1
- **Verwechslungs-Buchstaben**: p, q, b, d (häufig bei ADHS relevant)
- **Alle Zahlen + Buchstaben**: 0-9, A-Z, a-z
- **Nur Buchstaben**: A-Z, a-z
- **Emojis**: 
  - Emotionen: 😊 😢 😠 😮 😴 😰
  - Richtungen: ⬆️ ⬇️ ⬅️ ➡️
  - Formen: ⭕ ⬛ ⬜ 🔴 🔵
  - Weitere Sets nach Bedarf
- **Custom Set**: Benutzerdefinierte Zeichen eingeben

### 3. Schriftgrößen-Steuerung
- **UI-Element**: Slider oder Dropdown
- **Bereich**: z.B. 12px - 72px (anpassbar)
- **Live-Vorschau**: Sofortige Aktualisierung beim Ändern
- **Presets**: Kleine, Mittel, Große, Sehr Große Buttons

### 4. Schriftarten-Steuerung
- **Auswahl**: Dropdown mit verschiedenen Fonts
- **Optionen**:
  - Sans-Serif: Arial, Helvetica, Verdana
  - Serif: Times New Roman, Georgia
  - Monospace: Courier New, Monaco
  - Dyslexie-freundlich: OpenDyslexic (falls verfügbar)
  - Weitere nach Bedarf

### 5. Rot-Grün-Brille Modus
- **Toggle-Button**: Ein/Aus-Schalter
- **Farbfilter**: ✅ **KONFIGURIERBARE VERTEILUNG**
  - **Zufällig**: Trainiert selektive Aufmerksamkeit (wissenschaftlich sinnvoll für ADHS)
  - **Strukturierte Muster**: Trainiert Mustererkennung (z.B. Schachbrett, Streifen)
  - **Benutzerdefiniert**: Spezifische Übungen möglich
  - CSS-Filter oder Hintergrundfarben für Zellen
  - Option: Rot-Grün-Kontrast erhöhen
- **Anpassbare Intensität**: Wie stark der Filter sein soll
- **Wissenschaftlicher Hintergrund**: 
  - Rot-Grün-Brillen werden in der visuellen Therapie eingesetzt, um selektive Aufmerksamkeit zu trainieren
  - Zufällige Verteilung zwingt das Gehirn, zwischen rot/grün zu unterscheiden → Aufmerksamkeitstraining
  - Strukturierte Muster trainieren Mustererkennung und visuelle Verarbeitung
- **Hinweis**: Info-Text über Rot-Grün-Brille Nutzung

### 6. PDF-Export
- **Export-Button**: Generiert PDF der aktuellen Matrix
- **Optionen**:
  - Format: A4, Letter, Custom
  - Ausrichtung: Hochformat, Querformat
  - Rand: Mit/Ohne Rand
  - Titel/Header optional
- **Qualität**: Hochauflösend für Druck

### 7. Zusätzliche Features (Optional, aber sinnvoll)
- **Matrix-Größe anpassbar**: ✅ Bereits in Feature 1 integriert
- **Layout-Form anpassbar**: ✅ Bereits in Feature 1 integriert
- **Neue Matrix generieren**: Button zum Neu-Würfeln
- **Druck-Ansicht**: Optimiert für Druck
- **Speichern/Laden**: Konfigurationen speichern (LocalStorage)
- **Vollbild-Modus**: Ablenkungsfreie Ansicht für Training
- **Timer**: Optional für Training-Sessions

## Projektstruktur

```
TestMultiAgent/
├── package.json
├── tsconfig.json (falls TypeScript)
├── vite.config.js
├── index.html
├── src/
│   ├── main.js / main.ts
│   ├── app.js / app.ts (Haupt-App-Logik)
│   ├── components/
│   │   ├── MatrixDisplay.js
│   │   ├── ControlsPanel.js
│   │   ├── FontSelector.js
│   │   ├── SizeSelector.js
│   │   ├── SymbolSetSelector.js
│   │   ├── LayoutSelector.js
│   │   ├── MatrixSizeSelector.js
│   │   ├── ColorFilterToggle.js
│   │   └── ExportButton.js
│   ├── utils/
│   │   ├── matrixGenerator.js
│   │   ├── symbolSets.js
│   │   ├── pdfExporter.js
│   │   ├── colorFilter.js
│   │   └── layoutShapes.js
│   ├── types/
│   │   └── index.ts (falls TypeScript)
│   └── styles/
│       ├── main.css
│       └── components.css
├── public/
│   └── (statische Assets)
└── README.md
```

## Detaillierte Implementierungs-Schritte

### Phase 1: Projekt-Setup
1. Node.js Projekt initialisieren (`npm init`)
2. Vite Projekt mit Vanilla JS Template erstellen (`npm create vite@latest . -- --template vanilla`)
3. Dependencies installieren:
   - jsPDF + html2canvas (für PDF-Export)
   - TypeScript (optional, aber empfohlen)
4. Projektstruktur erstellen
5. Basis HTML/Entry Point konfigurieren

### Phase 2: Basis-Komponenten
1. **MatrixDisplay Komponente**
   - Parameter: matrix (2D Array), fontSize, fontFamily, symbolSet, layoutShape
   - Rendert Matrix in Grid-Layout
   - Unterstützt verschiedene Layout-Formen (rechteckig, diamant, triangular)
   - Responsive Styling

2. **Matrix-Generator Utility**
   - Funktion: `generateMatrix(rows, cols, symbolSet, layoutShape)`
   - Zufällige Verteilung der Symbole
   - Layout-Formen: Rechteckig, Diamant, Triangular
   - Optional: Strukturierte Muster

3. **Symbol-Sets Definition**
   - Objekt/Map mit allen Symbol-Sets
   - Funktion: `getSymbols(setName)`
   - Custom-Set Support für benutzerdefinierte Zeichen

### Phase 3: Steuerungs-UI
1. **ControlsPanel Komponente**
   - Container für alle Steuerungen
   - Layout: Sidebar oder Top-Bar
   - Kollabierbar für Vollbild-Modus

2. **FontSelector**
   - Dropdown mit verfügbaren Fonts
   - Live-Update der Matrix

3. **SizeSelector**
   - Slider oder Input für Schriftgröße
   - Min/Max Werte (z.B. 12px - 72px)
   - Live-Update

4. **SymbolSetSelector**
   - Radio-Buttons oder Dropdown
   - Alle Symbol-Sets auflisten
   - Custom-Input für benutzerdefinierte Sets

5. **LayoutSelector** (NEU)
   - Dropdown/Radio-Buttons für Layout-Form
   - Optionen: Rechteckig, Diamant, Triangular
   - Live-Update

6. **MatrixSizeSelector** (NEU)
   - Input-Felder für Zeilen/Spalten
   - Validierung (Min: z.B. 3, Max: z.B. 50)
   - Auto-Regenerierung bei Änderung

### Phase 4: Erweiterte Features
1. **Rot-Grün-Brille Modus**
   - Toggle-Button
   - **Verteilungs-Modus Auswahl**:
     - Zufällig (wissenschaftlich sinnvoll für selektive Aufmerksamkeit)
     - Strukturierte Muster (Schachbrett, Streifen, etc.)
     - Benutzerdefiniert (manuelle Auswahl)
   - CSS-Filter oder Klassen-basierte Farben für Zellen
   - Intensitäts-Slider für Filter-Stärke
   - Info-Text über wissenschaftlichen Hintergrund

2. **Layout-Shape Generator** (NEU)
   - Funktionen für verschiedene Formen
   - Diamant: Zentrierte, diamantförmige Anordnung
   - Triangular: Dreieckige Anordnung
   - Rechteckig: Standard Grid

### Phase 5: PDF-Export
1. **PDF-Exporter Utility**
   - Funktion: `exportToPDF(matrix, config)`
   - jsPDF Integration
   - Formatierung: Schriftgröße, Layout, Ränder
   - Download-Trigger

2. **ExportButton Komponente**
   - Button mit Icon
   - Loading-State während Export
   - Erfolgs-Feedback

### Phase 6: Styling & UX
1. **Responsive Design**
   - Mobile-First Ansatz
   - Breakpoints für verschiedene Bildschirmgrößen
   - Touch-freundliche Controls

2. **Accessibility**
   - ARIA-Labels
   - Keyboard-Navigation
   - Screen-Reader Support

3. **UI-Polish**
   - Moderne, saubere UI
   - Smooth Transitions
   - Loading States
   - Error Handling

### Phase 7: Testing & Optimierung
1. Browser-Kompatibilität testen
2. Performance-Optimierung (große Matrizen)
3. PDF-Qualität prüfen
4. Mobile-Ansicht testen

## ✅ Entscheidungen (Geklärt)

1. **Matrix-Größe**: ✅ **KONFIGURIERBAR** - Benutzer kann Zeilen/Spalten anpassen
2. **Layout**: ✅ **KONFIGURIERBAR** - Rechteckig, Diamant, Triangular, etc.
3. **Rot-Grün-Verteilung**: ✅ **KONFIGURIERBAR** - Zufällig, Strukturiert, Benutzerdefiniert
4. **Backend**: ✅ **NICHT NÖTIG** - Reine Client-Side App
5. **Tech-Stack**: ✅ **Vanilla JS + Vite** (leichtgewichtig, kein Framework-Overhead)

## Offene Fragen (Optional)

1. **Speicherung**: Sollen Konfigurationen gespeichert werden können (LocalStorage)?
2. **Deployment**: Wo soll die App gehostet werden? (Vercel, Netlify, GitHub Pages, etc.)
3. **Zufälligkeit**: Sollen die Symbole komplett zufällig sein oder bestimmte Muster erlaubt?

## Dependencies (Finale Version)

```json
{
  "dependencies": {
    "jspdf": "^2.5.1",
    "html2canvas": "^1.4.1"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "vite": "^5.0.0"
  }
}
```

**Viel einfacher ohne React!** Nur 2 Runtime-Dependencies für PDF-Export.

## Zeitplan (Schätzung)

- Phase 1 (Setup): 1-2 Stunden
- Phase 2 (Basis): 3-4 Stunden
- Phase 3 (Controls): 2-3 Stunden
- Phase 4 (Features): 3-4 Stunden
- Phase 5 (PDF): 2-3 Stunden
- Phase 6 (Styling): 3-4 Stunden
- Phase 7 (Testing): 2-3 Stunden

**Gesamt**: ~16-23 Stunden

## Wissenschaftliche Überlegungen: Rot-Grün-Brille Training

### Hintergrund
Rot-Grün-Brillen werden in der visuellen Therapie eingesetzt, um:
- **Selektive Aufmerksamkeit** zu trainieren (wichtig bei ADHS)
- **Visuelle Verarbeitung** zu verbessern
- **Mustererkennung** zu schärfen

### Empfohlene Verteilungs-Modi

1. **Zufällige Verteilung** (Wissenschaftlich am sinnvollsten)
   - Zwingt das Gehirn, zwischen rot/grün zu unterscheiden
   - Trainiert selektive Aufmerksamkeit
   - Gut für ADHS-Training geeignet

2. **Strukturierte Muster**
   - Schachbrett-Muster: Trainiert räumliche Wahrnehmung
   - Streifen: Trainiert horizontale/vertikale Mustererkennung
   - Cluster: Trainiert Gruppierung

3. **Benutzerdefiniert**
   - Für spezifische Übungen
   - Therapeutisch angepasste Muster

### Implementierungs-Empfehlung
- Standard: **Zufällige Verteilung** (wissenschaftlich am besten belegt)
- Option für strukturierte Muster für Abwechslung
- Benutzerdefiniert für spezielle Anforderungen

## Nächste Schritte

1. ✅ **Technologie-Stack**: Vanilla JS + Vite (bestätigt)
2. ✅ **Alle Haupt-Fragen geklärt**
3. **Optional**: Design-Mockup gewünscht?
4. **Start der Implementierung**: Bereit zum Start!

---

**Plan ist vollständig und bereit für Implementierung!**

Alle wichtigen Entscheidungen sind getroffen:
- ✅ Vanilla JS + Vite (leichtgewichtig)
- ✅ Alle Features konfigurierbar
- ✅ Wissenschaftlich fundierte Rot-Grün-Verteilung
- ✅ Kein Backend nötig

Soll ich mit der Implementierung beginnen?

