import { Matrix, ColorDistributionMode } from '../types';

export function assignColors(
  matrix: Matrix,
  mode: ColorDistributionMode
): Matrix {
  const rows = matrix.length;
  const cols = matrix[0]?.length || 0;

  return matrix.map((row, rowIdx) =>
    row.map((cell, colIdx) => {
      if (!cell.symbol) {
        return cell; // Leere Zellen nicht färben
      }

      let color: 'red' | 'green' | undefined;

      switch (mode) {
        case 'random':
          color = Math.random() > 0.5 ? 'red' : 'green';
          break;

        case 'checkerboard':
          color = (rowIdx + colIdx) % 2 === 0 ? 'red' : 'green';
          break;

        case 'stripes':
          color = rowIdx % 2 === 0 ? 'red' : 'green';
          break;

        case 'custom':
          // Für später: Benutzerdefinierte Zuordnung
          color = Math.random() > 0.5 ? 'red' : 'green';
          break;
      }

      return { ...cell, color };
    })
  );
}

