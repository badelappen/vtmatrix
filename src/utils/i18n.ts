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
      newMatrix: '🔄 Neue Matrix',
      exportPDF: '📄 Als PDF exportieren',
    },
    language: {
      de: 'Deutsch',
      en: 'English',
      switchLanguage: 'Sprache',
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
      newMatrix: '🔄 New Matrix',
      exportPDF: '📄 Export as PDF',
    },
    language: {
      de: 'Deutsch',
      en: 'English',
      switchLanguage: 'Language',
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

