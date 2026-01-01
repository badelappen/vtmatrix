import { LayoutShape, Matrix, MatrixCell } from '../types';

export function shouldIncludeCell(
  row: number,
  col: number,
  rows: number,
  cols: number,
  shape: LayoutShape
): boolean {
  switch (shape) {
    case 'rectangular':
      return true;

    case 'diamond': {
      // Diamant: Berechne basierend auf der kleineren Dimension
      // Bei 8x8: Diamant nutzt alle 8 Zeilen voll aus
      const centerRow = (rows - 1) / 2;
      const centerCol = (cols - 1) / 2;
      
      // Normalisiere Abstände auf 0-1 Bereich
      const rowDist = Math.abs(row - centerRow) / centerRow;
      const colDist = Math.abs(col - centerCol) / centerCol;
      
      // Manhattan-Distanz normalisiert
      return rowDist + colDist <= 1.0;
    }

    case 'triangular': {
      // Dreieck: Oben wenig, unten voll
      // Zeile 0: 1 Element in der Mitte
      // Zeile rows-1: alle Elemente
      const centerCol = (cols - 1) / 2;
      
      // Wie viele Spalten sind in dieser Zeile erlaubt?
      // Zeile 0 -> 1 erlaubt, Zeile rows-1 -> cols erlaubt
      const progress = row / (rows - 1); // 0 bis 1
      const allowedWidth = 1 + progress * (cols - 1); // 1 bis cols
      const halfWidth = allowedWidth / 2;
      
      const colDist = Math.abs(col - centerCol);
      return colDist <= halfWidth;
    }

    default:
      return true;
  }
}

export function applyLayoutShape(
  matrix: Matrix,
  shape: LayoutShape
): Matrix {
  const rows = matrix.length;
  const cols = matrix[0]?.length || 0;

  return matrix.map((row, rowIdx) =>
    row.map((cell, colIdx) => {
      if (shouldIncludeCell(rowIdx, colIdx, rows, cols, shape)) {
        return cell;
      }
      return { symbol: '', color: cell.color };
    })
  );
}

