import jsPDF from 'jspdf';
import { Matrix, AppConfig } from '../types';

export async function exportToPDF(
  matrix: Matrix,
  config: AppConfig
): Promise<void> {
  try {
    // Erstelle PDF mit gewähltem Format und Orientierung
    const pdf = new jsPDF({
      orientation: config.orientation === 'landscape' ? 'landscape' : 'portrait',
      unit: 'mm',
      format: config.paperFormat
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Ränder
    const margin = 15; // mm
    const titleFontSize = config.titleFontSize || 12;
    const subtitleFontSize = config.subtitleFontSize || 10;
    const fontSizeLabelSize = config.fontSizeLabelSize || 8;
    const titleSubtitleGap = config.titleSubtitleGap || 3;
    const titleMatrixGap = 8; // Fester Abstand: 8mm
    const matrixLabelGap = 8; // Fester Abstand: 8mm
    
    // Berechne benötigten Platz für Titel (wird später mit tatsächlicher Höhe aktualisiert)
    let titleSpace = 0;
    
    const footerSpace = config.showFontSizeLabel ? (matrixLabelGap + fontSizeLabelSize) : 15;

    // Berechne Matrix-Dimensionen
    const rows = matrix.length;
    const cols = matrix[0]?.length || 0;
    
    // Gap in mm (separat für horizontal und vertikal)
    const gapHorizontalMm = config.gapHorizontal ?? config.fontSize;
    const gapVerticalMm = config.gapVertical ?? config.fontSize;
    
    // Schriftgröße in mm
    const fontSizeMm = config.fontSize;
    
    // Setze Schriftart
    const pdfFont = mapFontToPDF(config.fontFamily);
    pdf.setFont(pdfFont);
    pdf.setFontSize(fontSizeMm);
    
    // Berechne tatsächliche Höhe für mehrzeilige Beschreibung
    let subtitleLines = 0;
    if (config.showTitle && config.subtitle) {
      const maxWidth = pdfWidth - 2 * margin;
      pdf.setFontSize(subtitleFontSize);
      subtitleLines = pdf.splitTextToSize(config.subtitle, maxWidth).length;
    }
    
    // Aktualisiere titleSpace mit tatsächlicher Höhe
    if (config.showTitle && (config.title || config.subtitle)) {
      const subtitleHeight = subtitleLines > 0 ? (subtitleLines * subtitleFontSize * 1.2) : 0;
      titleSpace = margin + (config.title ? titleFontSize : 0) + 
                   (config.subtitle ? subtitleHeight + titleSubtitleGap : 0) + 
                   titleMatrixGap;
    }
    
    // Titel & Untertitel oben (optional)
    if (config.showTitle && (config.title || config.subtitle)) {
      pdf.setFont(pdfFont, 'bold');
      pdf.setFontSize(titleFontSize);
      pdf.setTextColor(0, 0, 0);
      
      let titleY = margin + titleFontSize * 0.75;
      
      if (config.title) {
        const titleWidth = pdf.getTextWidth(config.title);
        const titleX = (pdfWidth - titleWidth) / 2;
        pdf.text(config.title, titleX, titleY);
        titleY += titleSubtitleGap + subtitleFontSize * 0.25;
      }
      
      if (config.subtitle) {
        pdf.setFont(pdfFont, 'normal');
        pdf.setFontSize(subtitleFontSize);
        pdf.setTextColor(100, 100, 100);
        
        // Mehrzeiligen Text unterstützen
        const maxWidth = pdfWidth - 2 * margin;
        const lines = pdf.splitTextToSize(config.subtitle, maxWidth);
        const lineHeight = subtitleFontSize * 1.2;
        
        lines.forEach((line: string, index: number) => {
          const lineWidth = pdf.getTextWidth(line);
          const lineX = (pdfWidth - lineWidth) / 2;
          pdf.text(line, lineX, titleY + index * lineHeight);
        });
      }
    }
    
    // Berechne Schrittweiten
    const cellSize = fontSizeMm;
    const stepX = cellSize + gapHorizontalMm;
    const stepY = cellSize + gapVerticalMm;
    
    const totalWidth = (cols - 1) * stepX + cellSize;
    const totalHeight = (rows - 1) * stepY + cellSize;
    
    // Position basierend auf matrixPosition
    const position = config.matrixPosition || { horizontal: 'center', vertical: 'middle' };
    
    // Berechne horizontale Startposition
    let startX: number;
    switch (position.horizontal) {
      case 'left':
        startX = margin;
        break;
      case 'right':
        startX = pdfWidth - margin - totalWidth;
        break;
      case 'center':
      default:
        startX = (pdfWidth - totalWidth) / 2;
    }
    
    // Berechne vertikale Startposition (Basislinie des ersten Zeichens)
    let startY: number;
    const usableHeight = pdfHeight - margin - footerSpace - titleSpace;
    const topOffset = margin + titleSpace;
    switch (position.vertical) {
      case 'top':
        startY = topOffset + cellSize * 0.75;
        break;
      case 'bottom':
        startY = topOffset + usableHeight - totalHeight + cellSize * 0.75;
        break;
      case 'middle':
      default:
        startY = topOffset + (usableHeight - totalHeight) / 2 + cellSize * 0.75;
    }

    // Schreibe Matrix als Text
    matrix.forEach((row, rowIdx) => {
      row.forEach((cell, colIdx) => {
        if (!cell.symbol) return; // Überspringe leere Zellen

        pdf.setFontSize(fontSizeMm);
        
        // Schriftstil setzen
        const cellFontStyle = cell.fontStyle || 'normal';
        const pdfFontStyle = mapFontStyleToPDF(cellFontStyle);
        pdf.setFont(pdfFont, pdfFontStyle);
        
        // Position berechnen
        const x = startX + colIdx * stepX;
        const y = startY + rowIdx * stepY;
        
        // Zentriere Text horizontal in der Zelle
        const charWidth = pdf.getTextWidth(cell.symbol);
        const textX = x + (cellSize - charWidth) / 2;

        // Setze Farbe für Rot-Grün-Brille
        if (config.colorFilterEnabled && cell.color) {
          if (cell.color === 'red') {
            pdf.setTextColor(200, 0, 0); // Rot
          } else {
            pdf.setTextColor(0, 150, 0); // Grün
          }
        } else {
          pdf.setTextColor(0, 0, 0); // Schwarz
        }
        
        pdf.text(cell.symbol, textX, y);
      });
    });

    // Schriftgröße auf PDF anzeigen (unten, optional)
    if (config.showFontSizeLabel) {
      pdf.setFontSize(fontSizeLabelSize);
      pdf.setTextColor(100, 100, 100);
      const fontSizeText = `${config.fontSize}mm`;
      const labelWidth = pdf.getTextWidth(fontSizeText);
      const labelX = (pdfWidth - labelWidth) / 2;
      const labelY = pdfHeight - matrixLabelGap; // Abstand vom unteren Rand
      pdf.text(fontSizeText, labelX, labelY);
    }

    // Speichere PDF
    const fileName = `visuelles-training-${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
  } catch (error) {
    console.error('Fehler beim PDF-Export:', error);
    throw error;
  }
}

function mapFontToPDF(fontFamily: string): string {
  // jsPDF unterstützt: 'helvetica', 'times', 'courier'
  const fontMap: Record<string, string> = {
    'Arial': 'helvetica',
    'Helvetica': 'helvetica',
    'Verdana': 'helvetica',
    'Times New Roman': 'times',
    'Georgia': 'times',
    'Courier New': 'courier',
    'Monaco': 'courier'
  };
  
  return fontMap[fontFamily] || 'helvetica';
}

function mapFontStyleToPDF(fontStyle: 'normal' | 'bold' | 'italic' | 'boldItalic'): string {
  // jsPDF unterstützt: 'normal', 'bold', 'italic', 'bolditalic'
  const styleMap: Record<string, string> = {
    'normal': 'normal',
    'bold': 'bold',
    'italic': 'italic',
    'boldItalic': 'bolditalic'
  };
  
  return styleMap[fontStyle] || 'normal';
}
