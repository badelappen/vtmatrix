import { Matrix, MatrixCell, AppConfig } from '../types';
import { getRandomSymbol } from './symbolSets';
import { applyLayoutShape } from './layoutShapes';
import { assignColors } from './colorFilter';

const FONT_STYLES: Array<'normal' | 'bold' | 'italic' | 'boldItalic'> = ['normal', 'bold', 'italic', 'boldItalic'];

function getRandomFontStyle(): 'normal' | 'bold' | 'italic' | 'boldItalic' {
  return FONT_STYLES[Math.floor(Math.random() * FONT_STYLES.length)];
}

export function generateMatrix(config: AppConfig): Matrix {
  const { rows, cols, symbolSet, customSymbols, layoutShape, colorFilterEnabled, colorDistributionMode, fontStyle } = config;

  // Erstelle leere Matrix
  const matrix: Matrix = [];

  for (let row = 0; row < rows; row++) {
    const matrixRow: MatrixCell[] = [];
    for (let col = 0; col < cols; col++) {
      const symbol = getRandomSymbol(symbolSet, customSymbols);
      const cellFontStyle = fontStyle === 'random' ? getRandomFontStyle() : fontStyle;
      matrixRow.push({ symbol, fontStyle: cellFontStyle as 'normal' | 'bold' | 'italic' | 'boldItalic' });
    }
    matrix.push(matrixRow);
  }

  // Layout-Form anwenden
  let shapedMatrix = applyLayoutShape(matrix, layoutShape);

  // Farben zuweisen wenn aktiviert
  if (colorFilterEnabled) {
    shapedMatrix = assignColors(shapedMatrix, colorDistributionMode);
  }

  return shapedMatrix;
}

