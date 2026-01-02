export type Language = 'de' | 'en';

export interface Translations {
  // Sections
  sections: {
    matrixSize: string;
    layoutShape: string;
    symbolSet: string;
    fontSize: string;
    spacing: string;
    font: string;
    colorFilter: string;
    pageSettings: string;
    titleSubtitle: string;
  };
  
  // Matrix Size
  matrixSize: {
    rows: string;
    cols: string;
  };
  
  // Layout Shapes
  layoutShapes: {
    rectangular: string;
    diamond: string;
    triangular: string;
    form: string;
  };
  
  // Symbol Sets
  symbolSets: {
    allNumbers: string;
    binary: string;
    confusionLetters: string;
    allNumbersAndLetters: string;
    allLetters: string;
    emotions: string;
    directions: string;
    shapes: string;
    custom: string;
    symbols: string;
    customSymbols: string;
    customSymbolsHint: string;
    customSymbolsPlaceholder: string;
  };
  
  // Font
  font: {
    size: string;
    family: string;
    style: string;
    styles: {
      normal: string;
      bold: string;
      italic: string;
      boldItalic: string;
      random: string;
    };
  };
  
  // Spacing
  spacing: {
    betweenChars: string;
    betweenRows: string;
  };
  
  // Color Filter
  colorFilter: {
    enable: string;
    distribution: string;
    distributions: {
      random: string;
      checkerboard: string;
      stripes: string;
    };
  };
  
  // Page Settings
  pageSettings: {
    paperFormat: string;
    orientation: string;
    matrixPosition: string;
    showFontSize: string;
    orientations: {
      portrait: string;
      landscape: string;
    };
  };
  
  // Title & Subtitle
  titleSubtitle: {
    showTitle: string;
    title: string;
    subtitle: string;
    titleFontSize: string;
    subtitleFontSize: string;
    titleSubtitleGap: string;
    fontSizeLabelSize: string;
    titlePlaceholder: string;
    subtitlePlaceholder: string;
  };
  
  // Buttons
  buttons: {
    newMatrix: string;
    exportPDF: string;
  };
  
  // Language
  language: {
    de: string;
    en: string;
    switchLanguage: string;
  };
  
  // Header
  header: {
    title: string;
    description: string;
    learnMore: string;
  };
  
  // Visual Training Info
  visualTraining: {
    title: string;
    whatIs: string;
    whatIsContent: string;
    keySkills: string;
    keySkillsList: string[];
    matrixTraining: string;
    matrixTrainingContent: string;
    redGreenGlasses: string;
    redGreenGlassesContent: string;
    applications: string;
    applicationsList: string[];
    close: string;
  };
  
  // Footer
  footer: {
    imprint: string;
    privacy: string;
    cookies: string;
    copyright: string;
  };
  
  // Legal Content
  legal: {
    imprint: {
      title: string;
      content: string;
    };
    privacy: {
      title: string;
      content: string;
    };
    cookies: {
      title: string;
      content: string;
    };
    close: string;
  };
}

const translations: Record<Language, Translations> = {
  de: {
    sections: {
      matrixSize: 'Matrix-Größe',
      layoutShape: 'Layout-Form',
      symbolSet: 'Symbol-Set',
      fontSize: 'Schriftgröße',
      spacing: 'Abstände',
      font: 'Schriftart',
      colorFilter: 'Rot-Grün-Brille Modus',
      pageSettings: 'Seiten-Einstellungen',
      titleSubtitle: 'Titel & Untertitel',
    },
    matrixSize: {
      rows: 'Zeilen',
      cols: 'Spalten',
    },
    layoutShapes: {
      rectangular: 'Rechteckig',
      diamond: 'Diamant',
      triangular: 'Dreieckig',
      form: 'Form',
    },
    symbolSets: {
      allNumbers: 'Alle Zahlen (0-9)',
      binary: 'Binär (0, 1)',
      confusionLetters: 'Verwechslungs-Buchstaben (p, q, b, d)',
      allNumbersAndLetters: 'Zahlen + Buchstaben',
      allLetters: 'Nur Buchstaben',
      emotions: 'Emojis - Emotionen',
      directions: 'Pfeile (↑ ↓ ← →)',
      shapes: 'Formen (● ▲ ■ ✕)',
      custom: 'Benutzerdefiniert',
      symbols: 'Symbole',
      customSymbols: 'Eigene Zeichen',
      customSymbolsHint: 'Zeichen durch Leerzeichen trennen',
      customSymbolsPlaceholder: 'z.B. A B C oder 1 2 3',
    },
    font: {
      size: 'Größe',
      family: 'Font',
      style: 'Stil',
      styles: {
        normal: 'Normal',
        bold: 'Fett',
        italic: 'Kursiv',
        boldItalic: 'Fett + Kursiv',
        random: 'Zufällig',
      },
    },
    spacing: {
      betweenChars: 'Zwischen Zeichen',
      betweenRows: 'Zwischen Zeilen',
    },
    colorFilter: {
      enable: 'Aktivieren',
      distribution: 'Verteilung',
      distributions: {
        random: 'Zufällig (empfohlen)',
        checkerboard: 'Schachbrett',
        stripes: 'Streifen',
      },
    },
    pageSettings: {
      paperFormat: 'Papierformat',
      orientation: 'Ausrichtung',
      matrixPosition: 'Matrix-Position',
      showFontSize: 'Schriftgröße anzeigen',
      orientations: {
        portrait: 'Hochformat',
        landscape: 'Querformat',
      },
    },
    titleSubtitle: {
      showTitle: 'Titel anzeigen',
      title: 'Titel',
      subtitle: 'Beschreibung',
      titleFontSize: 'Titel-Schriftgröße',
      subtitleFontSize: 'Beschreibung-Schriftgröße',
      titleSubtitleGap: 'Abstand Titel ↔ Beschreibung',
      fontSizeLabelSize: 'Größenanzeige-Schriftgröße',
      titlePlaceholder: 'z.B. Visuelles Training',
      subtitlePlaceholder: 'z.B. Übung 1 - 1,5 Minuten pro Auge',
    },
    buttons: {
      newMatrix: 'Neue Matrix',
      exportPDF: 'Als PDF exportieren',
    },
    language: {
      de: 'Deutsch',
      en: 'English',
      switchLanguage: 'Sprache',
    },
    header: {
      title: 'Matrizen-Generator für Visuelles Training',
      description: 'Erstellen Sie individuelle Zahlen- und Symbol-Matrizen für visuelles Training. Professionelles Tool zur Generierung von Trainingsmaterialien mit verschiedenen Symbol-Sets, Layout-Formen und Rot-Grün-Brille Modus. Exportieren Sie hochauflösende PDFs für den Druck.',
      learnMore: 'Mehr über Visuelles Training erfahren',
    },
    visualTraining: {
      title: 'Was ist Visuelles Training?',
      whatIs: 'Grundlagen',
      whatIsContent: 'Visuelles Training (auch Vision Therapy oder Visual Therapy) ist eine Form der Therapie, die spezifische Übungen verwendet, um visuelle Fähigkeiten und Verarbeitungsprozesse zu verbessern. Es trainiert das Gehirn und die Augen, effektiver zusammenzuarbeiten.',
      keySkills: 'Trainierte visuelle Fähigkeiten',
      keySkillsList: [
        'Selektive Aufmerksamkeit: Fokussierung auf spezifische visuelle Elemente bei gleichzeitiger Filterung von Ablenkungen',
        'Visuelle Verarbeitung: Wie das Gehirn visuelle Informationen interpretiert und verarbeitet',
        'Mustererkennung: Identifizierung und Verständnis visueller Muster und Beziehungen',
        'Visuelles Arbeitsgedächtnis: Beibehaltung und Manipulation visueller Informationen im Kurzzeitgedächtnis',
        'Visuelle Diskrimination: Unterscheidung zwischen ähnlichen visuellen Elementen',
        'Konzentration: Aufrechterhaltung einer anhaltenden visuellen Fokussierung über Zeit'
      ],
      matrixTraining: 'Matrix-Training',
      matrixTrainingContent: 'Matrix-basiertes visuelles Training verwendet Raster aus Zahlen, Symbolen oder Mustern, um diese visuellen Fähigkeiten zu trainieren. Durch systematisches Arbeiten mit Matrizen können Personen ihre visuelle Verarbeitungsfähigkeit, Aufmerksamkeitsspanne und kognitive Leistung verbessern.',
      redGreenGlasses: 'Rot-Grün-Brille Training',
      redGreenGlassesContent: 'Rot-Grün-Brillen sind ein spezialisiertes Werkzeug in der visuellen Therapie. Beim Betrachten von Matrizen mit farbgefilterten Elementen muss das Gehirn aktiv zwischen roten und grünen Elementen unterscheiden. Dies trainiert die selektive Aufmerksamkeit durch erzwungene fokussierte visuelle Verarbeitung. Die zufällige Verteilung ist besonders effektiv, da sie eine konstante visuelle Diskrimination erfordert. Strukturierte Muster (Schachbrett, Streifen) trainieren Mustererkennung und visuelle Organisation.',
      applications: 'Anwendungsbereiche',
      applicationsList: [
        'Therapie und Rehabilitation: Verwendung durch Sehtherapeuten, Ergotherapeuten und Rehabilitationsspezialisten',
        'Bildungsunterstützung: Verbesserung visueller Fähigkeiten, die Lernen und Lesen unterstützen',
        'Performance-Training: Verwendung durch Sportler und Fachkräfte zur Verbesserung der visuellen Verarbeitung',
        'Hausübungen: Druckbare Materialien für kontinuierliche Praxis und Fortschrittsverfolgung',
        'Forschung: Werkzeug für visuelle Wahrnehmungsstudien und kognitives Training'
      ],
      close: 'Schließen',
    },
    footer: {
      imprint: 'Impressum',
      privacy: 'Datenschutzerklärung',
      cookies: 'Cookie-Richtlinie',
      copyright: '© 2024 Visuelles Training App. Alle Rechte vorbehalten.',
    },
    legal: {
      imprint: {
        title: 'Impressum',
        content: `Angaben gemäß § 5 TMG

Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:
Axel Evers
Bergkammstraße 34
30453 Hannover

Kontakt:
E-Mail: {EMAIL_PLACEHOLDER}

Haftungsausschluss:
Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.

Haftung für Links:
Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.`,
      },
      privacy: {
        title: 'Datenschutzerklärung',
        content: `1. Datenschutz auf einen Blick

Allgemeine Hinweise
Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.

Datenerfassung auf dieser Website
Diese Website speichert Daten lokal in Ihrem Browser (LocalStorage), um Ihre Einstellungen zu speichern. Es werden keine personenbezogenen Daten an Server übertragen oder gespeichert.

2. Hosting
Diese Website wird als statische Website gehostet. Es erfolgt keine Server-seitige Datenspeicherung.

3. Ihre Rechte
Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Datenschutz können Sie sich jederzeit an uns wenden.

4. Widerspruch gegen Datenerhebung
Sie können die Speicherung von Daten in Ihrem Browser jederzeit deaktivieren, indem Sie die LocalStorage-Funktion in Ihren Browser-Einstellungen deaktivieren.`,
      },
      cookies: {
        title: 'Cookie-Richtlinie',
        content: `Diese Website verwendet keine Cookies im herkömmlichen Sinne.

LocalStorage
Diese Anwendung verwendet die LocalStorage-Funktion Ihres Browsers, um Ihre Einstellungen lokal auf Ihrem Gerät zu speichern. Diese Daten werden ausschließlich auf Ihrem Gerät gespeichert und nicht an Server übertragen.

Gespeicherte Daten:
- Ihre Konfigurationseinstellungen (Matrix-Größe, Schriftart, etc.)
- Ihre Sprachauswahl (Deutsch/Englisch)

Löschung der Daten:
Sie können die gespeicherten Daten jederzeit löschen, indem Sie in Ihren Browser-Einstellungen die LocalStorage-Daten für diese Website löschen. Die Daten werden automatisch gelöscht, wenn Sie Ihre Browser-Daten löschen.

Keine Tracking-Cookies:
Diese Website verwendet keine Tracking-Cookies, keine Analyse-Tools und keine Werbe-Cookies.`,
      },
      close: 'Schließen',
    },
  },
  en: {
    sections: {
      matrixSize: 'Matrix Size',
      layoutShape: 'Layout Shape',
      symbolSet: 'Symbol Set',
      fontSize: 'Font Size',
      spacing: 'Spacing',
      font: 'Font',
      colorFilter: 'Red-Green Glasses Mode',
      pageSettings: 'Page Settings',
      titleSubtitle: 'Title & Subtitle',
    },
    matrixSize: {
      rows: 'Rows',
      cols: 'Columns',
    },
    layoutShapes: {
      rectangular: 'Rectangular',
      diamond: 'Diamond',
      triangular: 'Triangular',
      form: 'Shape',
    },
    symbolSets: {
      allNumbers: 'All Numbers (0-9)',
      binary: 'Binary (0, 1)',
      confusionLetters: 'Confusion Letters (p, q, b, d)',
      allNumbersAndLetters: 'Numbers + Letters',
      allLetters: 'Letters Only',
      emotions: 'Emojis - Emotions',
      directions: 'Arrows (↑ ↓ ← →)',
      shapes: 'Shapes (● ▲ ■ ✕)',
      custom: 'Custom',
      symbols: 'Symbols',
      customSymbols: 'Custom Characters',
      customSymbolsHint: 'Separate characters with spaces',
      customSymbolsPlaceholder: 'e.g. A B C or 1 2 3',
    },
    font: {
      size: 'Size',
      family: 'Font',
      style: 'Style',
      styles: {
        normal: 'Normal',
        bold: 'Bold',
        italic: 'Italic',
        boldItalic: 'Bold + Italic',
        random: 'Random',
      },
    },
    spacing: {
      betweenChars: 'Between Characters',
      betweenRows: 'Between Rows',
    },
    colorFilter: {
      enable: 'Enable',
      distribution: 'Distribution',
      distributions: {
        random: 'Random (recommended)',
        checkerboard: 'Checkerboard',
        stripes: 'Stripes',
      },
    },
    pageSettings: {
      paperFormat: 'Paper Format',
      orientation: 'Orientation',
      matrixPosition: 'Matrix Position',
      showFontSize: 'Show Font Size',
      orientations: {
        portrait: 'Portrait',
        landscape: 'Landscape',
      },
    },
    titleSubtitle: {
      showTitle: 'Show Title',
      title: 'Title',
      subtitle: 'Subtitle',
      titleFontSize: 'Title Font Size',
      subtitleFontSize: 'Subtitle Font Size',
      titleSubtitleGap: 'Title ↔ Subtitle Gap',
      fontSizeLabelSize: 'Size Label Font Size',
      titlePlaceholder: 'e.g. Visual Training',
      subtitlePlaceholder: 'e.g. Exercise 1 - 1.5 minutes per eye',
    },
    buttons: {
      newMatrix: 'New Matrix',
      exportPDF: 'Export as PDF',
    },
    language: {
      de: 'Deutsch',
      en: 'English',
      switchLanguage: 'Language',
    },
    header: {
      title: 'Matrix Generator for Visual Training',
      description: 'Create custom number and symbol matrices for visual training. Professional tool for generating training materials with various symbol sets, layout shapes, and red-green glasses mode. Export high-resolution PDFs for printing.',
      learnMore: 'Learn more about Visual Training',
    },
    visualTraining: {
      title: 'What is Visual Training?',
      whatIs: 'Basics',
      whatIsContent: 'Visual training (also known as vision therapy or visual therapy) is a form of therapy that uses specific exercises to improve visual skills and processing. It involves training the brain and eyes to work together more effectively.',
      keySkills: 'Trained Visual Skills',
      keySkillsList: [
        'Selective Attention: Focus on specific visual elements while filtering out distractions',
        'Visual Processing: How the brain interprets and makes sense of visual information',
        'Pattern Recognition: Identifying and understanding visual patterns and relationships',
        'Visual Working Memory: Retaining and manipulating visual information in short-term memory',
        'Visual Discrimination: Distinguishing between similar visual elements',
        'Concentration: Maintaining sustained visual focus over time'
      ],
      matrixTraining: 'Matrix Training',
      matrixTrainingContent: 'Matrix-based visual training uses grids of numbers, symbols, or patterns to train these visual skills. By systematically working through matrices, individuals can improve their visual processing abilities, attention span, and cognitive performance.',
      redGreenGlasses: 'Red-Green Glasses Training',
      redGreenGlassesContent: 'Red-green glasses are a specialized tool used in visual therapy. When viewing matrices with color-filtered elements, the brain must actively distinguish between red and green elements. This trains selective attention by forcing focused visual processing. Random distribution is particularly effective as it requires constant visual discrimination. Structured patterns (checkerboard, stripes) train pattern recognition and visual organization.',
      applications: 'Application Areas',
      applicationsList: [
        'Therapy and Rehabilitation: Used by vision therapists, occupational therapists, and rehabilitation specialists',
        'Educational Support: Helps improve visual skills that support learning and reading',
        'Performance Training: Used by athletes and professionals to enhance visual processing',
        'Home Practice: Printable materials for continued practice and progress tracking',
        'Research: Tool for visual perception studies and cognitive training research'
      ],
      close: 'Close',
    },
    footer: {
      imprint: 'Imprint',
      privacy: 'Privacy Policy',
      cookies: 'Cookie Policy',
      copyright: '© 2024 Visual Training App. All rights reserved.',
    },
    legal: {
      imprint: {
        title: 'Imprint',
        content: `Information according to § 5 TMG

Responsible for content according to § 55 Abs. 2 RStV:
Axel Evers
Bergkammstraße 34
30453 Hannover, Germany

Contact:
Email: {EMAIL_PLACEHOLDER}

Disclaimer:
The contents of our pages have been created with the greatest care. However, we cannot guarantee the accuracy, completeness and timeliness of the content. As a service provider, we are responsible for our own content on these pages in accordance with general law pursuant to § 7 Abs.1 TMG.

Liability for Links:
Our offer contains links to external websites of third parties, on whose contents we have no influence. The respective provider or operator of the pages is always responsible for the contents of the linked pages.`,
      },
      privacy: {
        title: 'Privacy Policy',
        content: `1. Privacy at a Glance

General Information
The following information provides a simple overview of what happens to your personal data when you visit this website. Personal data is any data with which you can be personally identified.

Data Collection on this Website
This website stores data locally in your browser (LocalStorage) to save your settings. No personal data is transmitted to or stored on servers.

2. Hosting
This website is hosted as a static website. No server-side data storage takes place.

3. Your Rights
You have the right at any time to receive information free of charge about the origin, recipient and purpose of your stored personal data. You also have the right to request the correction or deletion of this data. For this purpose, as well as for further questions about data protection, you can contact us at any time.

4. Objection to Data Collection
You can disable the storage of data in your browser at any time by disabling the LocalStorage function in your browser settings.`,
      },
      cookies: {
        title: 'Cookie Policy',
        content: `This website does not use cookies in the conventional sense.

LocalStorage
This application uses your browser's LocalStorage function to store your settings locally on your device. This data is stored exclusively on your device and is not transmitted to servers.

Stored Data:
- Your configuration settings (matrix size, font, etc.)
- Your language selection (German/English)

Deletion of Data:
You can delete the stored data at any time by deleting the LocalStorage data for this website in your browser settings. The data will be automatically deleted when you clear your browser data.

No Tracking Cookies:
This website does not use tracking cookies, analytics tools, or advertising cookies.`,
      },
      close: 'Close',
    },
  },
};

let currentLanguage: Language = 'de';

// Load language from localStorage or detect from browser
export function initLanguage(): Language {
  const saved = localStorage.getItem('visualTrainingLanguage');
  if (saved === 'de' || saved === 'en') {
    currentLanguage = saved;
    return currentLanguage;
  }
  
  // Try to detect from browser
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('en')) {
    currentLanguage = 'en';
  } else {
    currentLanguage = 'de';
  }
  
  saveLanguage();
  return currentLanguage;
}

export function getLanguage(): Language {
  return currentLanguage;
}

export function setLanguage(lang: Language): void {
  currentLanguage = lang;
  saveLanguage();
}

function saveLanguage(): void {
  localStorage.setItem('visualTrainingLanguage', currentLanguage);
}

export function t(): Translations {
  return translations[currentLanguage];
}

// Type-safe translation getter
export function getTranslations(): Translations {
  return translations[currentLanguage];
}

