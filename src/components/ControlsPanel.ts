import { AppConfig, SymbolSetName, LayoutShape, ColorDistributionMode, PaperFormat, FontStyle, Orientation, MatrixPosition, MatrixPositionH, MatrixPositionV } from '../types';
import { getSymbolSetLabels } from '../utils/symbolSets';
import { getTranslations, Language, getLanguage } from '../utils/i18n';
import { createRefreshIcon, createPDFIcon } from '../utils/icons';

export function createControlsPanel(
  config: AppConfig,
  onConfigChange: (newConfig: Partial<AppConfig>) => void,
  onRegenerate: () => void,
  onExportPDF: () => void,
  onLanguageChange?: (lang: Language) => void
): HTMLElement {
  const panel = document.createElement('div');
  panel.className = 'controls-panel';
  
  const t = getTranslations();

  // Language Selector (at the top)
  if (onLanguageChange) {
    const langSection = createLanguageSelector(onLanguageChange);
    panel.appendChild(langSection);
  }

  // Matrix-Größe
  const sizeSection = createSection(t.sections.matrixSize);
  const rowsInput = createNumberInput(t.matrixSize.rows, config.rows, 3, 50, (val) => {
    onConfigChange({ rows: val });
  });
  const colsInput = createNumberInput(t.matrixSize.cols, config.cols, 3, 50, (val) => {
    onConfigChange({ cols: val });
  });
  sizeSection.appendChild(rowsInput);
  sizeSection.appendChild(colsInput);

  // Layout-Form
  const layoutSection = createSection(t.sections.layoutShape);
  const layoutSelect = createSelect<LayoutShape>(
    t.layoutShapes.form,
    [
      { value: 'rectangular', label: t.layoutShapes.rectangular },
      { value: 'diamond', label: t.layoutShapes.diamond },
      { value: 'triangular', label: t.layoutShapes.triangular }
    ],
    config.layoutShape,
    (val) => onConfigChange({ layoutShape: val })
  );
  layoutSection.appendChild(layoutSelect);

  // Symbol-Set
  const symbolSection = createSection(t.sections.symbolSet);
  const symbolSelect = createSelect<SymbolSetName>(
    t.symbolSets.symbols,
    Object.entries(getSymbolSetLabels()).map(([value, label]) => ({
      value: value as SymbolSetName,
      label
    })),
    config.symbolSet,
    (val) => onConfigChange({ symbolSet: val })
  );
  symbolSection.appendChild(symbolSelect);

  // Custom Symbols Input (nur wenn custom ausgewählt)
  const customInputContainer = document.createElement('div');
  customInputContainer.style.display = config.symbolSet === 'custom' ? 'block' : 'none';
  customInputContainer.style.marginTop = '8px';

  const customInputLabel = document.createElement('label');
  customInputLabel.textContent = t.symbolSets.customSymbols;
  customInputLabel.style.display = 'block';
  customInputLabel.style.fontSize = '12px';
  customInputLabel.style.color = '#666';
  customInputLabel.style.marginBottom = '4px';

  const customInput = document.createElement('input');
  customInput.type = 'text';
  customInput.placeholder = t.symbolSets.customSymbolsPlaceholder;
  customInput.value = config.customSymbols || '';
  customInput.style.width = '100%';
  customInput.style.padding = '10px 12px';
  customInput.style.border = '1px solid #ddd';
  customInput.style.borderRadius = '6px';
  customInput.style.fontSize = '14px';
  customInput.style.boxSizing = 'border-box';
  customInput.style.transition = 'border-color 0.2s, box-shadow 0.2s';
  customInput.addEventListener('focus', () => {
    customInput.style.borderColor = '#4a90e2';
    customInput.style.boxShadow = '0 0 0 3px rgba(74, 144, 226, 0.1)';
    customInput.style.outline = 'none';
  });
  customInput.addEventListener('blur', () => {
    customInput.style.borderColor = '#ddd';
    customInput.style.boxShadow = 'none';
  });
  customInput.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    onConfigChange({ customSymbols: target.value });
  });

  const customInputHint = document.createElement('div');
  customInputHint.textContent = t.symbolSets.customSymbolsHint;
  customInputHint.style.fontSize = '11px';
  customInputHint.style.color = '#999';
  customInputHint.style.marginTop = '4px';

  customInputContainer.appendChild(customInputLabel);
  customInputContainer.appendChild(customInput);
  customInputContainer.appendChild(customInputHint);

  const symbolSelectElement = symbolSelect.querySelector('select') as HTMLSelectElement;
  symbolSelectElement.addEventListener('change', () => {
    const isCustom = symbolSelectElement.value === 'custom';
    customInputContainer.style.display = isCustom ? 'block' : 'none';
  });
  symbolSection.appendChild(customInputContainer);

  // Schriftgröße
  const fontSizeSection = createSection(t.sections.fontSize);
  const fontSizeInput = createRangeInputMM(
    t.font.size,
    config.fontSize,
    3,
    50,
    (val) => onConfigChange({ fontSize: val })
  );
  fontSizeSection.appendChild(fontSizeInput);

  // Abstände
  const gapSection = createSection(t.sections.spacing);
  const gapHorizontalInput = createRangeInputMM(
    t.spacing.betweenChars,
    config.gapHorizontal,
    0,
    50,
    (val) => onConfigChange({ gapHorizontal: val })
  );
  const gapVerticalInput = createRangeInputMM(
    t.spacing.betweenRows,
    config.gapVertical,
    0,
    50,
    (val) => onConfigChange({ gapVertical: val })
  );
  gapSection.appendChild(gapHorizontalInput);
  gapSection.appendChild(gapVerticalInput);

  // Schriftart
  const fontSection = createSection(t.sections.font);
  const fontSelect = createSelect<string>(
    t.font.family,
    [
      { value: 'Arial', label: 'Arial' },
      { value: 'Helvetica', label: 'Helvetica' },
      { value: 'Verdana', label: 'Verdana' },
      { value: 'Times New Roman', label: 'Times New Roman' },
      { value: 'Georgia', label: 'Georgia' },
      { value: 'Courier New', label: 'Courier New' },
      { value: 'Monaco', label: 'Monaco' }
    ],
    config.fontFamily,
    (val) => onConfigChange({ fontFamily: val })
  );
  fontSection.appendChild(fontSelect);

  // Schriftstil
  const fontStyleSelect = createSelect<FontStyle>(
    t.font.style,
    [
      { value: 'normal', label: t.font.styles.normal },
      { value: 'bold', label: t.font.styles.bold },
      { value: 'italic', label: t.font.styles.italic },
      { value: 'boldItalic', label: t.font.styles.boldItalic },
      { value: 'random', label: t.font.styles.random }
    ],
    config.fontStyle,
    (val) => onConfigChange({ fontStyle: val })
  );
  fontSection.appendChild(fontStyleSelect);

  // Rot-Grün-Brille
  const colorSection = createSection(t.sections.colorFilter);
  const colorToggle = createToggle(
    t.colorFilter.enable,
    config.colorFilterEnabled,
    (val) => onConfigChange({ colorFilterEnabled: val })
  );
  colorSection.appendChild(colorToggle);

  const distributionSelect = createSelect<ColorDistributionMode>(
    t.colorFilter.distribution,
    [
      { value: 'random', label: t.colorFilter.distributions.random },
      { value: 'checkerboard', label: t.colorFilter.distributions.checkerboard },
      { value: 'stripes', label: t.colorFilter.distributions.stripes }
    ],
    config.colorDistributionMode,
    (val) => onConfigChange({ colorDistributionMode: val })
  );
  distributionSelect.style.display = config.colorFilterEnabled ? 'block' : 'none';
  const toggleInput = colorToggle.querySelector('input[type="checkbox"]') as HTMLInputElement;
  toggleInput.addEventListener('change', () => {
    const isEnabled = toggleInput.checked;
    distributionSelect.style.display = isEnabled ? 'block' : 'none';
  });
  colorSection.appendChild(distributionSelect);

  // Papierformat & Layout
  const paperSection = createSection(t.sections.pageSettings);
  const paperSelect = createSelect<PaperFormat>(
    t.pageSettings.paperFormat,
    [
      { value: 'a4', label: 'A4' },
      { value: 'a3', label: 'A3' },
      { value: 'letter', label: 'Letter (US)' },
      { value: 'legal', label: 'Legal (US)' }
    ],
    config.paperFormat,
    (val) => onConfigChange({ paperFormat: val })
  );
  paperSection.appendChild(paperSelect);

  // Orientierung
  const orientationSelect = createSelect<Orientation>(
    t.pageSettings.orientation,
    [
      { value: 'portrait', label: t.pageSettings.orientations.portrait },
      { value: 'landscape', label: t.pageSettings.orientations.landscape }
    ],
    config.orientation,
    (val) => onConfigChange({ orientation: val })
  );
  paperSection.appendChild(orientationSelect);

  // Matrix-Position (visuelles 3x3 Grid)
  const positionLabel = document.createElement('label');
  positionLabel.textContent = t.pageSettings.matrixPosition;
  positionLabel.style.display = 'block';
  positionLabel.style.marginTop = '12px';
  positionLabel.style.marginBottom = '8px';
  positionLabel.style.fontSize = '13px';
  positionLabel.style.fontWeight = '500';
  paperSection.appendChild(positionLabel);

  const positionGrid = createPositionSelector(
    config.matrixPosition,
    (pos) => onConfigChange({ matrixPosition: pos })
  );
  paperSection.appendChild(positionGrid);

  // Schriftgrößen-Anzeige Toggle
  const showSizeToggle = createToggle(
    t.pageSettings.showFontSize,
    config.showFontSizeLabel,
    (val) => onConfigChange({ showFontSizeLabel: val })
  );
  showSizeToggle.style.marginTop = '12px';
  paperSection.appendChild(showSizeToggle);

  // Titel & Untertitel
  const titleSection = createSection(t.sections.titleSubtitle);
  
  // Funktion zum Aktualisieren der Sichtbarkeit (wird später definiert, aber hier deklariert)
  let updateTitleVisibility: ((isEnabled: boolean) => void) | null = null;
  
  // Toggle erstellen
  const showTitleToggle = createToggle(
    t.titleSubtitle.showTitle,
    config.showTitle || false,
    (val) => {
      onConfigChange({ showTitle: val });
      // Aktualisiere sofort die Sichtbarkeit
      if (updateTitleVisibility) {
        updateTitleVisibility(val);
      }
    }
  );
  titleSection.appendChild(showTitleToggle);
  
  // Titel Input
  const titleInputContainer = document.createElement('div');
  titleInputContainer.className = 'title-input-container';
  titleInputContainer.style.display = config.showTitle ? 'block' : 'none';
  titleInputContainer.style.marginTop = '8px';

  const titleInputLabel = document.createElement('label');
  titleInputLabel.textContent = t.titleSubtitle.title;
  titleInputLabel.style.display = 'block';
  titleInputLabel.style.fontSize = '12px';
  titleInputLabel.style.color = '#666';
  titleInputLabel.style.marginBottom = '4px';

  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.placeholder = t.titleSubtitle.titlePlaceholder;
  titleInput.value = config.title || '';
  titleInput.style.width = '100%';
  titleInput.style.padding = '10px 12px';
  titleInput.style.border = '1px solid #ddd';
  titleInput.style.borderRadius = '6px';
  titleInput.style.fontSize = '14px';
  titleInput.style.boxSizing = 'border-box';
  titleInput.style.transition = 'border-color 0.2s, box-shadow 0.2s';
  titleInput.addEventListener('focus', () => {
    titleInput.style.borderColor = '#4a90e2';
    titleInput.style.boxShadow = '0 0 0 3px rgba(74, 144, 226, 0.1)';
    titleInput.style.outline = 'none';
  });
  titleInput.addEventListener('blur', () => {
    titleInput.style.borderColor = '#ddd';
    titleInput.style.boxShadow = 'none';
  });
  titleInput.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    onConfigChange({ title: target.value });
  });

  titleInputContainer.appendChild(titleInputLabel);
  titleInputContainer.appendChild(titleInput);

  // Beschreibung Textarea
  const subtitleInputContainer = document.createElement('div');
  subtitleInputContainer.className = 'subtitle-input-container';
  subtitleInputContainer.style.display = config.showTitle ? 'block' : 'none';
  subtitleInputContainer.style.marginTop = '8px';

  const subtitleInputLabel = document.createElement('label');
  subtitleInputLabel.textContent = t.titleSubtitle.subtitle;
  subtitleInputLabel.style.display = 'block';
  subtitleInputLabel.style.fontSize = '12px';
  subtitleInputLabel.style.color = '#666';
  subtitleInputLabel.style.marginBottom = '4px';

  const subtitleInput = document.createElement('textarea');
  subtitleInput.placeholder = t.titleSubtitle.subtitlePlaceholder;
  subtitleInput.value = config.subtitle || '';
  subtitleInput.style.width = '100%';
  subtitleInput.style.minHeight = '80px';
  subtitleInput.style.padding = '10px 12px';
  subtitleInput.style.border = '1px solid #ddd';
  subtitleInput.style.borderRadius = '6px';
  subtitleInput.style.fontSize = '14px';
  subtitleInput.style.fontFamily = 'inherit';
  subtitleInput.style.boxSizing = 'border-box';
  subtitleInput.style.resize = 'vertical';
  subtitleInput.style.transition = 'border-color 0.2s, box-shadow 0.2s';
  subtitleInput.addEventListener('focus', () => {
    subtitleInput.style.borderColor = '#4a90e2';
    subtitleInput.style.boxShadow = '0 0 0 3px rgba(74, 144, 226, 0.1)';
    subtitleInput.style.outline = 'none';
  });
  subtitleInput.addEventListener('blur', () => {
    subtitleInput.style.borderColor = '#ddd';
    subtitleInput.style.boxShadow = 'none';
  });
  subtitleInput.addEventListener('input', (e) => {
    const target = e.target as HTMLTextAreaElement;
    onConfigChange({ subtitle: target.value });
  });

  subtitleInputContainer.appendChild(subtitleInputLabel);
  subtitleInputContainer.appendChild(subtitleInput);

  // Schriftgrößen und Abstände für Titel/Untertitel
  const titleSettingsContainer = document.createElement('div');
  titleSettingsContainer.className = 'title-settings-container';
  titleSettingsContainer.style.display = config.showTitle ? 'block' : 'none';
  titleSettingsContainer.style.marginTop = '12px';

  const titleFontSizeInput = createRangeInputMM(
    t.titleSubtitle.titleFontSize,
    config.titleFontSize || 12,
    4,
    30,
    (val) => onConfigChange({ titleFontSize: val })
  );
  titleSettingsContainer.appendChild(titleFontSizeInput);

  const subtitleFontSizeInput = createRangeInputMM(
    t.titleSubtitle.subtitleFontSize,
    config.subtitleFontSize || 10,
    4,
    30,
    (val) => onConfigChange({ subtitleFontSize: val })
  );
  titleSettingsContainer.appendChild(subtitleFontSizeInput);

  const titleSubtitleGapInput = createRangeInputMM(
    t.titleSubtitle.titleSubtitleGap,
    config.titleSubtitleGap || 3,
    0,
    20,
    (val) => onConfigChange({ titleSubtitleGap: val })
  );
  titleSettingsContainer.appendChild(titleSubtitleGapInput);

  // Schriftgröße für Größenanzeige
  const fontSizeLabelSizeInput = createRangeInputMM(
    t.titleSubtitle.fontSizeLabelSize,
    config.fontSizeLabelSize || 8,
    4,
    20,
    (val) => onConfigChange({ fontSizeLabelSize: val })
  );
  fontSizeLabelSizeInput.style.marginTop = '12px';
  titleSettingsContainer.appendChild(fontSizeLabelSizeInput);

  // Funktion zum Aktualisieren der Sichtbarkeit definieren
  updateTitleVisibility = (isEnabled: boolean) => {
    titleInputContainer.style.display = isEnabled ? 'block' : 'none';
    subtitleInputContainer.style.display = isEnabled ? 'block' : 'none';
    titleSettingsContainer.style.display = isEnabled ? 'block' : 'none';
  };
  
  // Initiale Sichtbarkeit setzen
  updateTitleVisibility(config.showTitle || false);
  
  // Zusätzlicher Event-Listener für direkte Checkbox-Änderungen (falls nötig)
  const titleToggleInput = showTitleToggle.querySelector('input[type="checkbox"]') as HTMLInputElement;
  if (titleToggleInput) {
    titleToggleInput.addEventListener('change', () => {
      const isEnabled = titleToggleInput.checked;
      if (updateTitleVisibility) {
        updateTitleVisibility(isEnabled);
      }
    });
  }

  titleSection.appendChild(titleInputContainer);
  titleSection.appendChild(subtitleInputContainer);
  titleSection.appendChild(titleSettingsContainer);

  // Buttons
  const buttonSection = document.createElement('div');
  buttonSection.className = 'button-section';

  const regenerateBtn = document.createElement('button');
  regenerateBtn.className = 'btn btn-primary';
  const refreshIcon = createRefreshIcon();
  regenerateBtn.appendChild(refreshIcon);
  regenerateBtn.appendChild(document.createTextNode(t.buttons.newMatrix));
  regenerateBtn.addEventListener('click', onRegenerate);

  const exportBtn = document.createElement('button');
  exportBtn.className = 'btn btn-secondary';
  const pdfIcon = createPDFIcon();
  exportBtn.appendChild(pdfIcon);
  exportBtn.appendChild(document.createTextNode(t.buttons.exportPDF));
  exportBtn.addEventListener('click', onExportPDF);

  buttonSection.appendChild(regenerateBtn);
  buttonSection.appendChild(exportBtn);

  // Alles zusammenfügen
  panel.appendChild(sizeSection);
  panel.appendChild(layoutSection);
  panel.appendChild(symbolSection);
  panel.appendChild(fontSizeSection);
  panel.appendChild(gapSection);
  panel.appendChild(fontSection);
  panel.appendChild(colorSection);
  panel.appendChild(paperSection);
  panel.appendChild(titleSection);
  panel.appendChild(buttonSection);

  return panel;
}

// Helper-Funktionen
function createSection(title: string): HTMLElement {
  const section = document.createElement('div');
  section.className = 'control-section';
  const titleEl = document.createElement('h3');
  titleEl.textContent = title;
  section.appendChild(titleEl);
  return section;
}

function createNumberInput(
  label: string,
  value: number,
  min: number,
  max: number,
  onChange: (value: number) => void
): HTMLElement {
  const container = document.createElement('div');
  container.className = 'control-item';

  const labelEl = document.createElement('label');
  labelEl.textContent = label;
  labelEl.htmlFor = `input-${label}`;

  const input = document.createElement('input');
  input.id = `input-${label}`;
  input.type = 'number';
  input.min = min.toString();
  input.max = max.toString();
  input.value = value.toString();
  input.addEventListener('input', (e) => {
    const val = parseInt((e.target as HTMLInputElement).value, 10);
    if (!isNaN(val) && val >= min && val <= max) {
      onChange(val);
    }
  });

  container.appendChild(labelEl);
  container.appendChild(input);
  return container;
}

function createRangeInputMM(
  label: string,
  value: number,
  min: number,
  max: number,
  onChange: (value: number) => void
): HTMLElement {
  const container = document.createElement('div');
  container.className = 'control-item';

  const labelEl = document.createElement('label');
  labelEl.textContent = `${label}: ${value}mm`;

  const input = document.createElement('input');
  input.type = 'range';
  input.min = min.toString();
  input.max = max.toString();
  input.step = '0.5';
  input.value = value.toString();
  input.addEventListener('input', (e) => {
    const val = parseFloat((e.target as HTMLInputElement).value);
    labelEl.textContent = `${label}: ${val}mm`;
    onChange(val);
  });

  container.appendChild(labelEl);
  container.appendChild(input);
  return container;
}

function createSelect<T extends string>(
  label: string,
  options: Array<{ value: T; label: string }>,
  value: T,
  onChange: (value: T) => void
): HTMLElement {
  const container = document.createElement('div');
  container.className = 'control-item';

  const labelEl = document.createElement('label');
  labelEl.textContent = label;
  labelEl.htmlFor = `select-${label}`;

  const select = document.createElement('select');
  select.id = `select-${label}`;
  options.forEach((opt) => {
    const option = document.createElement('option');
    option.value = opt.value;
    option.textContent = opt.label;
    option.selected = opt.value === value;
    select.appendChild(option);
  });
  select.addEventListener('change', (e) => {
    onChange((e.target as HTMLSelectElement).value as T);
  });

  container.appendChild(labelEl);
  container.appendChild(select);
  return container;
}

function createToggle(
  label: string,
  value: boolean,
  onChange: (value: boolean) => void
): HTMLElement {
  const container = document.createElement('div');
  container.className = 'control-item toggle-item';
  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.gap = '10px';
  container.style.cursor = 'pointer';

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = value;
  input.style.width = '18px';
  input.style.height = '18px';
  input.style.cursor = 'pointer';
  input.style.accentColor = '#4a90e2';
  input.addEventListener('change', (e) => {
    onChange((e.target as HTMLInputElement).checked);
  });

  const labelEl = document.createElement('span');
  labelEl.textContent = label;
  labelEl.style.fontSize = '13px';
  labelEl.style.fontWeight = '500';
  labelEl.style.cursor = 'pointer';

  // Klick auf Label schaltet auch die Checkbox
  labelEl.addEventListener('click', () => {
    input.checked = !input.checked;
    onChange(input.checked);
  });

  container.appendChild(input);
  container.appendChild(labelEl);
  return container;
}

function createPositionSelector(
  currentPosition: MatrixPosition,
  onChange: (position: MatrixPosition) => void
): HTMLElement {
  const container = document.createElement('div');
  container.className = 'position-selector';
  container.style.display = 'grid';
  container.style.gridTemplateColumns = 'repeat(3, 1fr)';
  container.style.gap = '4px';
  container.style.width = '100px';
  container.style.margin = '0 auto';

  const positions: Array<{ h: MatrixPositionH; v: MatrixPositionV; label: string }> = [
    { h: 'left', v: 'top', label: '↖' },
    { h: 'center', v: 'top', label: '↑' },
    { h: 'right', v: 'top', label: '↗' },
    { h: 'left', v: 'middle', label: '←' },
    { h: 'center', v: 'middle', label: '●' },
    { h: 'right', v: 'middle', label: '→' },
    { h: 'left', v: 'bottom', label: '↙' },
    { h: 'center', v: 'bottom', label: '↓' },
    { h: 'right', v: 'bottom', label: '↘' }
  ];

  // Speichere Referenzen zu den Buttons
  const buttons: Map<string, HTMLButtonElement> = new Map();
  let currentPos = { ...currentPosition };

  // Funktion zum Aktualisieren der visuellen Hervorhebung
  const updateActiveButton = (newPosition: MatrixPosition) => {
    currentPos = { ...newPosition };
    buttons.forEach((btn, key) => {
      const [h, v] = key.split('|');
      const isActive = h === currentPos.horizontal && v === currentPos.vertical;
      
      if (isActive) {
        btn.style.backgroundColor = 'var(--primary-color)';
        btn.style.color = 'white';
        btn.style.borderColor = 'var(--primary-hover)';
      } else {
        btn.style.backgroundColor = '#f5f5f5';
        btn.style.color = '#333';
        btn.style.borderColor = '#ddd';
      }
    });
  };

  positions.forEach((pos) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = pos.label;
    btn.style.width = '30px';
    btn.style.height = '30px';
    btn.style.border = '1px solid #ddd';
    btn.style.borderRadius = '4px';
    btn.style.cursor = 'pointer';
    btn.style.fontSize = '14px';
    btn.style.display = 'flex';
    btn.style.alignItems = 'center';
    btn.style.justifyContent = 'center';
    btn.style.transition = 'all 0.2s';

    // Speichere Button-Referenz
    const key = `${pos.h}|${pos.v}`;
    buttons.set(key, btn);

    // Aktive Position hervorheben
    if (pos.h === currentPosition.horizontal && pos.v === currentPosition.vertical) {
      btn.style.backgroundColor = 'var(--primary-color)';
      btn.style.color = 'white';
      btn.style.borderColor = 'var(--primary-hover)';
    } else {
      btn.style.backgroundColor = '#f5f5f5';
      btn.style.color = '#333';
      btn.style.borderColor = '#ddd';
    }

    btn.addEventListener('click', () => {
      const newPosition = { horizontal: pos.h, vertical: pos.v };
      onChange(newPosition);
      updateActiveButton(newPosition);
    });

    btn.addEventListener('mouseenter', () => {
      const isActive = pos.h === currentPos.horizontal && pos.v === currentPos.vertical;
      if (!isActive) {
        btn.style.backgroundColor = '#e0e0e0';
      }
    });

    btn.addEventListener('mouseleave', () => {
      const isActive = pos.h === currentPos.horizontal && pos.v === currentPos.vertical;
      if (!isActive) {
        btn.style.backgroundColor = '#f5f5f5';
      }
    });

    container.appendChild(btn);
  });

  return container;
}

function createLanguageSelector(onLanguageChange: (lang: Language) => void): HTMLElement {
  const t = getTranslations();
  const container = document.createElement('div');
  container.className = 'control-section';
  container.style.borderBottom = '2px solid var(--border-color)';
  container.style.marginBottom = '15px';
  container.style.paddingBottom = '15px';

  const label = document.createElement('label');
  label.textContent = t.language.switchLanguage;
  label.style.display = 'block';
  label.style.fontSize = '13px';
  label.style.fontWeight = '500';
  label.style.marginBottom = '8px';
  label.style.color = '#666';

  const select = document.createElement('select');
  select.style.width = '100%';
  select.style.padding = '8px 12px';
  select.style.border = '1px solid var(--border-color)';
  select.style.borderRadius = '4px';
  select.style.fontSize = '14px';
  select.style.cursor = 'pointer';

  const currentLang = getLanguage();
  
  const deOption = document.createElement('option');
  deOption.value = 'de';
  deOption.textContent = t.language.de;
  if (currentLang === 'de') deOption.selected = true;
  
  const enOption = document.createElement('option');
  enOption.value = 'en';
  enOption.textContent = t.language.en;
  if (currentLang === 'en') enOption.selected = true;

  select.appendChild(deOption);
  select.appendChild(enOption);

  select.addEventListener('change', (e) => {
    const lang = (e.target as HTMLSelectElement).value as Language;
    onLanguageChange(lang);
  });

  container.appendChild(label);
  container.appendChild(select);

  return container;
}

