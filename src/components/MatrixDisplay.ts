import { Matrix, AppConfig, PaperFormat, Orientation } from '../types';

// Papiergrößen in mm
const PAPER_SIZES: Record<PaperFormat, { width: number; height: number }> = {
  a4: { width: 210, height: 297 },
  a3: { width: 297, height: 420 },
  letter: { width: 216, height: 279 },
  legal: { width: 216, height: 356 }
};

export function createMatrixDisplay(
  matrix: Matrix,
  config: AppConfig
): HTMLElement {
  const container = document.createElement('div');
  container.className = 'matrix-display';
  container.id = 'matrix-display';

  const { 
    fontSize, fontFamily, colorFilterEnabled, gapHorizontal, gapVertical,
    paperFormat, orientation, matrixPosition, showTitle, title, subtitle,
    titleFontSize, subtitleFontSize, fontSizeLabelSize, titleSubtitleGap,
    showFontSizeLabel
  } = config;

  // Konvertiere mm zu px (1mm ≈ 3.779527559px bei 96dpi)
  const MM_TO_PX = 3.779527559;
  const fontSizePx = fontSize * MM_TO_PX;
  const gapHorizontalPx = gapHorizontal * MM_TO_PX;
  const gapVerticalPx = gapVertical * MM_TO_PX;
  const cellSizePx = fontSize * MM_TO_PX; // Zellengröße = Schriftgröße in px
  
  console.log('MatrixDisplay: fontSize =', fontSize, 'mm');
  console.log('MatrixDisplay: fontSizePx =', fontSizePx, 'px (unskaliert)');
  console.log('MatrixDisplay: cellSizePx =', cellSizePx, 'px (unskaliert)');

  // Papier-Dimensionen berechnen
  const paperSize = PAPER_SIZES[paperFormat];
  let paperWidthMm = paperSize.width;
  let paperHeightMm = paperSize.height;
  
  // Bei Querformat Breite und Höhe tauschen
  if (orientation === 'landscape') {
    [paperWidthMm, paperHeightMm] = [paperHeightMm, paperWidthMm];
  }

  // Skalieren für die Anzeige (max 600px Höhe)
  const maxDisplayHeight = 600;
  const scale = maxDisplayHeight / (paperHeightMm * MM_TO_PX);
  const displayWidth = paperWidthMm * MM_TO_PX * scale;
  const displayHeight = paperHeightMm * MM_TO_PX * scale;
  
  console.log('MatrixDisplay: Paper size =', paperWidthMm, 'x', paperHeightMm, 'mm');
  console.log('MatrixDisplay: scale =', scale);
  console.log('MatrixDisplay: displayWidth =', displayWidth, 'px');
  console.log('MatrixDisplay: displayHeight =', displayHeight, 'px');
  console.log('MatrixDisplay: cellSizePx * scale =', cellSizePx * scale, 'px (skaliert)');

  // Erstelle Papier-Container
  const paper = document.createElement('div');
  paper.className = 'paper-preview';
  paper.style.width = `${displayWidth}px`;
  paper.style.height = `${displayHeight}px`;
  paper.style.position = 'relative';
  paper.style.backgroundColor = 'white';
  paper.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
  paper.style.borderRadius = '2px';
  paper.style.overflow = 'hidden';

  // Erstelle Grid für die Matrix
  const grid = document.createElement('div');
  grid.className = 'matrix-grid';
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = `repeat(${config.cols}, ${cellSizePx * scale}px)`;
  grid.style.gridAutoRows = `${cellSizePx * scale}px`;
  grid.style.columnGap = `${gapHorizontalPx * scale}px`;
  grid.style.rowGap = `${gapVerticalPx * scale}px`;
  grid.style.position = 'absolute';

  // Positioniere Matrix basierend auf matrixPosition
  const margin = 15 * MM_TO_PX * scale; // 15mm Rand
  const titleMatrixGap = 8; // Fester Abstand: 8mm
  
  // Berechne tatsächliche Höhe der Beschreibung (wie im PDF)
  // WICHTIG: Berechnung in mm (wie im PDF), dann zu px konvertiert und skaliert
  let subtitleLines = 0;
  let subtitleHeight = 0;
  if (showTitle && subtitle) {
    // Berechne maxWidth in mm (wie im PDF)
    const maxWidthMm = paperWidthMm - 2 * 15; // Verfügbare Breite in mm
    
    // Erstelle temporäres Element um Textbreite zu messen (in skalierten px)
    const maxWidthPx = maxWidthMm * MM_TO_PX * scale;
    const fontSizePx = subtitleFontSize * MM_TO_PX * scale;
    
    const tempEl = document.createElement('div');
    tempEl.style.position = 'absolute';
    tempEl.style.visibility = 'hidden';
    tempEl.style.fontSize = `${fontSizePx}px`;
    tempEl.style.fontFamily = fontFamily;
    tempEl.style.whiteSpace = 'nowrap';
    document.body.appendChild(tempEl);
    
    // Teile Text in Wörter und berechne Zeilen (wie PDF splitTextToSize)
    const words = subtitle.split(/\s+/);
    let currentLine = '';
    
    words.forEach((word) => {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      tempEl.textContent = testLine;
      const lineWidth = tempEl.offsetWidth;
      
      if (lineWidth > maxWidthPx && currentLine) {
        subtitleLines++;
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });
    
    // Letzte Zeile
    if (currentLine) {
      subtitleLines++;
    }
    
    document.body.removeChild(tempEl);
    
    // Berechne Höhe in mm (wie im PDF: lineHeight = subtitleFontSize * 1.2), dann zu px konvertiert und skaliert
    const subtitleHeightMm = subtitleLines * subtitleFontSize * 1.2;
    subtitleHeight = subtitleHeightMm * MM_TO_PX * scale;
  }
  
  // Berechne titleSpace: von oben bis Ende der Beschreibung + Abstand zur Matrix
  // EXAKT wie im PDF: margin + titleFontSize + subtitleHeight + titleSubtitleGap + titleMatrixGap
  // WICHTIG: titleSpace wird im PDF so berechnet, dass es den gesamten Bereich von margin bis nach titleMatrixGap umfasst
  const titleSpace = showTitle && (title || subtitle) 
    ? (margin + 
       (title ? titleFontSize * MM_TO_PX * scale : 0) + 
       (subtitle ? subtitleHeight + (titleSubtitleGap * MM_TO_PX * scale) : 0) + 
       titleMatrixGap * MM_TO_PX * scale)
    : 0;
  
  // Horizontale Position
  switch (matrixPosition.horizontal) {
    case 'left':
      grid.style.left = `${margin}px`;
      break;
    case 'center':
      grid.style.left = '50%';
      grid.style.transform = 'translateX(-50%)';
      break;
    case 'right':
      grid.style.right = `${margin}px`;
      break;
  }
  
  // Vertikale Position (berücksichtigt Titel-Höhe) - EXAKT wie im PDF
  const matrixLabelGap = 8; // Fester Abstand: 8mm
  const footerSpaceMm = showFontSizeLabel ? (matrixLabelGap + fontSizeLabelSize) : 15;
  const footerSpace = footerSpaceMm * MM_TO_PX * scale;
  
  // EXAKT wie im PDF: usableHeight = pdfHeight - margin - footerSpace - titleSpace
  const usableHeight = displayHeight - margin - footerSpace - titleSpace;
  const totalHeight = (matrix.length - 1) * (cellSizePx + gapVerticalPx) * scale + cellSizePx * scale;
  const cellSizeMm = fontSize; // In mm, wie im PDF
  const cellSizePxScaled = cellSizeMm * MM_TO_PX * scale; // In px, skaliert
  
  // EXAKT wie im PDF: topOffset = margin + titleSpace
  const topOffset = margin + titleSpace;
  
  switch (matrixPosition.vertical) {
    case 'top':
      // EXAKT wie im PDF: topOffset + cellSize * 0.75 (Basislinie, in mm)
      grid.style.top = `${topOffset + cellSizeMm * 0.75 * MM_TO_PX * scale}px`;
      break;
    case 'middle':
      // EXAKT wie im PDF: topOffset + (usableHeight - totalHeight) / 2 + cellSize * 0.75
      const middleY = topOffset + (usableHeight - totalHeight) / 2 + cellSizeMm * 0.75 * MM_TO_PX * scale;
      grid.style.top = `${middleY}px`;
      if (matrixPosition.horizontal === 'center') {
        grid.style.transform = 'translateX(-50%)';
      }
      break;
    case 'bottom':
      // EXAKT wie im PDF: topOffset + usableHeight - totalHeight + cellSize * 0.75
      const bottomY = topOffset + usableHeight - totalHeight + cellSizeMm * 0.75 * MM_TO_PX * scale;
      grid.style.top = `${bottomY}px`;
      if (matrixPosition.horizontal === 'center') {
        grid.style.transform = 'translateX(-50%)';
      }
      break;
  }

  // Fülle Matrix
  matrix.forEach((row) => {
    row.forEach((cell) => {
      const cellElement = document.createElement('div');
      cellElement.className = 'matrix-cell';
      cellElement.textContent = cell.symbol;
      cellElement.style.fontSize = `${fontSizePx * scale}px`;
      cellElement.style.fontFamily = fontFamily;

      if (!cell.symbol) {
        cellElement.style.visibility = 'hidden';
      }

      // Schriftstil anwenden
      if (cell.fontStyle) {
        switch (cell.fontStyle) {
          case 'bold':
            cellElement.style.fontWeight = 'bold';
            break;
          case 'italic':
            cellElement.style.fontStyle = 'italic';
            break;
          case 'boldItalic':
            cellElement.style.fontWeight = 'bold';
            cellElement.style.fontStyle = 'italic';
            break;
        }
      }

      // Rot-Grün-Filter anwenden
      if (colorFilterEnabled && cell.color) {
        cellElement.classList.add(`color-${cell.color}`);
      }

      grid.appendChild(cellElement);
    });
  });

  // Titel & Untertitel oben (optional)
  if (showTitle && (title || subtitle)) {
    const titleContainer = document.createElement('div');
    titleContainer.style.position = 'absolute';
    // Gleiche Position wie im PDF: margin + titleFontSize * 0.75 für Basislinie
    const titleTop = margin + (titleFontSize * MM_TO_PX * scale * 0.75);
    titleContainer.style.top = `${titleTop}px`;
    titleContainer.style.left = '50%';
    titleContainer.style.transform = 'translateX(-50%)';
    titleContainer.style.textAlign = 'center';
    titleContainer.style.width = `calc(100% - ${2 * margin}px)`;

    if (title) {
      const titleEl = document.createElement('div');
      titleEl.textContent = title;
      // Schriftgröße in px, skaliert wie das Papier (gleiche Berechnung wie Matrix)
      titleEl.style.fontSize = `${titleFontSize * MM_TO_PX * scale}px`;
      titleEl.style.fontFamily = fontFamily;
      titleEl.style.fontWeight = 'bold';
      titleEl.style.color = '#333';
      // Gleicher Abstand wie im PDF: titleSubtitleGap + subtitleFontSize * 0.25
      titleEl.style.marginBottom = subtitle ? `${(titleSubtitleGap + subtitleFontSize * 0.25) * MM_TO_PX * scale}px` : '0';
      titleContainer.appendChild(titleEl);
    }

    if (subtitle) {
      // Erstelle Container für mehrzeilige Beschreibung - EXAKT wie im PDF
      const subtitleContainer = document.createElement('div');
      subtitleContainer.style.fontSize = `${subtitleFontSize * MM_TO_PX * scale}px`;
      subtitleContainer.style.fontFamily = fontFamily;
      subtitleContainer.style.color = 'rgb(100, 100, 100)'; // EXAKT wie im PDF: (100, 100, 100)
      subtitleContainer.style.lineHeight = '1.2'; // EXAKT wie im PDF: lineHeight = subtitleFontSize * 1.2
      subtitleContainer.style.textAlign = 'center';
      subtitleContainer.style.width = '100%';
      
      // Teile Text in Zeilen EXAKT wie im PDF splitTextToSize
      const maxWidth = (paperWidthMm - 2 * 15) * MM_TO_PX * scale;
      const fontSizePx = subtitleFontSize * MM_TO_PX * scale;
      
      const tempEl = document.createElement('div');
      tempEl.style.position = 'absolute';
      tempEl.style.visibility = 'hidden';
      tempEl.style.fontSize = `${fontSizePx}px`;
      tempEl.style.fontFamily = fontFamily;
      tempEl.style.whiteSpace = 'nowrap';
      document.body.appendChild(tempEl);
      
      // EXAKT wie PDF splitTextToSize: Teile in Wörter
      const words = subtitle.split(/\s+/);
      let currentLine = '';
      const lines: string[] = [];
      
      words.forEach((word) => {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        tempEl.textContent = testLine;
        const lineWidth = tempEl.offsetWidth;
        
        if (lineWidth > maxWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      });
      
      if (currentLine) {
        lines.push(currentLine);
      }
      
      document.body.removeChild(tempEl);
      
      // Erstelle div für jede Zeile (wie im PDF) - EXAKT positioniert
      const lineHeight = fontSizePx * 1.2; // EXAKT wie im PDF
      lines.forEach((line, index) => {
        const lineEl = document.createElement('div');
        lineEl.textContent = line;
        lineEl.style.lineHeight = `${lineHeight}px`;
        if (index > 0) {
          lineEl.style.marginTop = '0'; // Kein zusätzlicher Abstand
        }
        subtitleContainer.appendChild(lineEl);
      });
      
      titleContainer.appendChild(subtitleContainer);
    }

    paper.appendChild(titleContainer);
  }

  paper.appendChild(grid);

  // Schriftgrößen-Anzeige unten (optional)
  if (showFontSizeLabel) {
    const matrixLabelGap = 8; // Fester Abstand: 8mm
    const sizeLabel = document.createElement('div');
    sizeLabel.className = 'paper-size-label';
    sizeLabel.textContent = `${fontSize}mm`;
    sizeLabel.style.position = 'absolute';
    sizeLabel.style.bottom = `${matrixLabelGap * MM_TO_PX * scale}px`;
    sizeLabel.style.left = '50%';
    sizeLabel.style.transform = 'translateX(-50%)';
    sizeLabel.style.fontSize = `${fontSizeLabelSize * MM_TO_PX * scale}px`;
    sizeLabel.style.color = '#666';
    paper.appendChild(sizeLabel);
  }

  container.appendChild(paper);

  // Twemoji: Ersetze Emojis durch SVGs für konsistente Darstellung
  if (typeof (window as any).twemoji !== 'undefined') {
    (window as any).twemoji.parse(grid, {
      folder: 'svg',
      ext: '.svg'
    });
  }

  return container;
}
