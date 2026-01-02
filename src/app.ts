import { AppConfig } from './types';
import { generateMatrix } from './utils/matrixGenerator';
import { createMatrixDisplay } from './components/MatrixDisplay';
import { createControlsPanel } from './components/ControlsPanel';
import { createHeader, updateHeader } from './components/Header';
import { createFooter, updateFooter } from './components/Footer';
import { updateModal } from './components/Modal';
import { exportToPDF } from './utils/pdfExporter';
import { initLanguage, setLanguage, Language } from './utils/i18n';

import { Matrix } from './types';

export class App {
  private config: AppConfig;
  private matrixContainer: HTMLElement;
  private controlsContainer: HTMLElement;
  private mainContentContainer: HTMLElement;
  private currentMatrix: ReturnType<typeof createMatrixDisplay> | null = null;
  private currentMatrixData: Matrix | null = null;

  constructor(container: HTMLElement) {
    // Initialize language
    const lang = initLanguage();
    document.documentElement.lang = lang;
    
    this.config = this.getDefaultConfig();
    
    // Create header
    const header = createHeader();
    container.appendChild(header);
    
    // Create main content container
    this.mainContentContainer = document.createElement('div');
    this.mainContentContainer.className = 'main-content';
    
    this.matrixContainer = document.createElement('div');
    this.matrixContainer.className = 'matrix-container';
    this.controlsContainer = document.createElement('div');
    this.controlsContainer.className = 'controls-container';

    this.mainContentContainer.appendChild(this.controlsContainer);
    this.mainContentContainer.appendChild(this.matrixContainer);
    container.appendChild(this.mainContentContainer);
    
    // Create footer
    const footer = createFooter();
    container.appendChild(footer);

    this.loadConfigFromStorage();
    this.initialize();
  }

  private getDefaultConfig(): AppConfig {
    const defaultFontSize = 6; // Standard: 6mm
    return {
      rows: 8, // Standard: 8 Zeilen
      cols: 8,
      fontSize: defaultFontSize,
      fontFamily: 'Arial',
      fontStyle: 'normal',
      symbolSet: 'allNumbers',
      layoutShape: 'rectangular',
      colorFilterEnabled: false,
      colorDistributionMode: 'random',
      colorIntensity: 50,
      paperFormat: 'a4',
      orientation: 'portrait',
      matrixPosition: { horizontal: 'center', vertical: 'middle' },
      gapHorizontal: defaultFontSize, // Standard: gleich der Schriftgröße
      gapVertical: defaultFontSize, // Standard: gleich der Schriftgröße
      showFontSizeLabel: true, // Standard: Schriftgröße anzeigen
      showTitle: false, // Standard: Titel nicht anzeigen
      title: '',
      subtitle: '',
      titleFontSize: 12, // Standard: 12mm für Titel
      subtitleFontSize: 10, // Standard: 10mm für Beschreibung
      fontSizeLabelSize: 8, // Standard: 8mm für Größenanzeige
      titleSubtitleGap: 3 // Standard: 3mm zwischen Titel und Beschreibung
    };
  }

  private loadConfigFromStorage(): void {
    try {
      const saved = localStorage.getItem('visualTrainingConfig');
      if (saved) {
        const loadedConfig = JSON.parse(saved);
        this.config = { ...this.config, ...loadedConfig };
        
        // Wenn alte Konfiguration ohne neue Felder geladen wird, setze Defaults
        if (loadedConfig.gapHorizontal === undefined) {
          this.config.gapHorizontal = this.config.fontSize;
        }
        if (loadedConfig.gapVertical === undefined) {
          this.config.gapVertical = this.config.fontSize;
        }
        if (loadedConfig.fontStyle === undefined) {
          this.config.fontStyle = 'normal';
        }
        if (loadedConfig.orientation === undefined) {
          this.config.orientation = 'portrait';
        }
        if (loadedConfig.matrixPosition === undefined) {
          this.config.matrixPosition = { horizontal: 'center', vertical: 'middle' };
        }
        if (loadedConfig.showFontSizeLabel === undefined) {
          this.config.showFontSizeLabel = true;
        }
        if (loadedConfig.showTitle === undefined) {
          this.config.showTitle = false;
        }
        if (loadedConfig.title === undefined) {
          this.config.title = '';
        }
        if (loadedConfig.subtitle === undefined) {
          this.config.subtitle = '';
        }
        if (loadedConfig.titleFontSize === undefined) {
          this.config.titleFontSize = 12;
        }
        if (loadedConfig.subtitleFontSize === undefined) {
          this.config.subtitleFontSize = 10;
        }
        if (loadedConfig.fontSizeLabelSize === undefined) {
          this.config.fontSizeLabelSize = 8;
        }
        if (loadedConfig.titleSubtitleGap === undefined) {
          this.config.titleSubtitleGap = 3;
        }
      }
    } catch (e) {
      console.warn('Konnte Konfiguration nicht laden:', e);
    }
  }

  private saveConfigToStorage(): void {
    try {
      localStorage.setItem('visualTrainingConfig', JSON.stringify(this.config));
    } catch (e) {
      console.warn('Konnte Konfiguration nicht speichern:', e);
    }
  }

  private initialize(): void {
    this.renderControls();
    this.renderMatrix();
  }

  private renderControls(): void {
    this.controlsContainer.innerHTML = '';
    const panel = createControlsPanel(
      this.config,
      (newConfig) => this.updateConfig(newConfig),
      () => this.regenerateMatrix(),
      () => this.exportPDF(),
      (lang: Language) => this.handleLanguageChange(lang)
    );
    this.controlsContainer.appendChild(panel);
  }

  private handleLanguageChange(lang: Language): void {
    setLanguage(lang);
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    // Re-render controls to update all text
    this.renderControls();
    // Update header and footer
    updateHeader();
    updateFooter();
    // Update modal if open
    updateModal();
  }

  private renderMatrix(): void {
    console.log('renderMatrix called with config:', this.config);
    // Nur das Display aktualisieren, nicht die Daten neu generieren
    if (!this.currentMatrixData) {
      this.generateNewMatrix();
      return;
    }
    
    // Container komplett leeren
    while (this.matrixContainer.firstChild) {
      this.matrixContainer.removeChild(this.matrixContainer.firstChild);
    }
    
    console.log('Creating new matrix display');
    // Neue Matrix mit aktueller Config erstellen
    const display = createMatrixDisplay(this.currentMatrixData, this.config);
    this.currentMatrix = display;
    this.matrixContainer.appendChild(display);
    console.log('Matrix display appended to container');
  }

  private generateNewMatrix(): void {
    // Neue Matrix-Daten generieren
    const matrix = generateMatrix(this.config);
    this.currentMatrixData = matrix;
    this.renderMatrix();
  }

  private updateConfig(newConfig: Partial<AppConfig>, rerenderControls: boolean = false): void {
    console.log('updateConfig called with:', newConfig);
    const oldConfig = { ...this.config };
    this.config = { ...this.config, ...newConfig };
    this.saveConfigToStorage();
    
    // Controls nur neu rendern wenn nötig (z.B. bei Strukturänderungen)
    // Bei Slider-Änderungen nicht neu rendern, sonst unterbricht es die Interaktion
    if (rerenderControls) {
      this.renderControls();
    }
    
    // Prüfen ob sich Zeilen/Spalten geändert haben - dann muss neu generiert werden
    const needsNewMatrix = oldConfig.rows !== this.config.rows || 
                           oldConfig.cols !== this.config.cols ||
                           oldConfig.symbolSet !== this.config.symbolSet ||
                           oldConfig.customSymbols !== this.config.customSymbols ||
                           oldConfig.layoutShape !== this.config.layoutShape ||
                           oldConfig.fontStyle !== this.config.fontStyle ||
                           oldConfig.colorDistributionMode !== this.config.colorDistributionMode ||
                           oldConfig.colorFilterEnabled !== this.config.colorFilterEnabled;
    
    console.log('needsNewMatrix:', needsNewMatrix);
    
    if (needsNewMatrix) {
      this.generateNewMatrix();
    } else {
      // Immer das Display aktualisieren (auch bei Schriftgrößen-Änderungen)
      // Die Matrix-Daten bleiben gleich, aber das Aussehen wird aktualisiert
      // WICHTIG: renderMatrix() muss aufgerufen werden, damit Änderungen sichtbar werden
      console.log('Calling renderMatrix() - should update display');
      this.renderMatrix();
    }
  }

  private regenerateMatrix(): void {
    this.generateNewMatrix();
  }

  private async exportPDF(): Promise<void> {
    if (!this.currentMatrixData) return;

    try {
      await exportToPDF(this.currentMatrixData, this.config);
      // Erfolgs-Feedback
      const btn = document.querySelector('.btn-secondary') as HTMLButtonElement;
      if (btn) {
        const originalText = btn.textContent;
        const { getTranslations } = await import('./utils/i18n');
        const t = getTranslations();
        btn.textContent = '✅ ' + (t.buttons.exportPDF.includes('Export') ? 'Exported!' : 'Exportiert!');
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
        }, 2000);
      }
    } catch (error) {
      console.error('PDF-Export fehlgeschlagen:', error);
      const { getTranslations } = await import('./utils/i18n');
      const t = getTranslations();
      alert(t.buttons.exportPDF.includes('Export') 
        ? 'Error exporting PDF. Please try again.' 
        : 'Fehler beim PDF-Export. Bitte versuchen Sie es erneut.');
    }
  }
}

