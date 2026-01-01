export type SymbolSetName = 
  | 'allNumbers'
  | 'binary'
  | 'confusionLetters'
  | 'allNumbersAndLetters'
  | 'allLetters'
  | 'emotions'
  | 'directions'
  | 'shapes'
  | 'custom';

export type LayoutShape = 'rectangular' | 'diamond' | 'triangular';

export type ColorDistributionMode = 'random' | 'checkerboard' | 'stripes' | 'custom';

export type PaperFormat = 'a4' | 'a3' | 'letter' | 'legal';

export type FontStyle = 'normal' | 'bold' | 'italic' | 'boldItalic' | 'random';

export type Orientation = 'portrait' | 'landscape';

// 9 Positionen: 3x3 Grid
export type MatrixPositionH = 'left' | 'center' | 'right';
export type MatrixPositionV = 'top' | 'middle' | 'bottom';
export interface MatrixPosition {
  horizontal: MatrixPositionH;
  vertical: MatrixPositionV;
}

export interface AppConfig {
  rows: number;
  cols: number;
  fontSize: number;
  fontFamily: string;
  fontStyle: FontStyle;
  symbolSet: SymbolSetName;
  customSymbols?: string;
  layoutShape: LayoutShape;
  colorFilterEnabled: boolean;
  colorDistributionMode: ColorDistributionMode;
  colorIntensity: number;
  paperFormat: PaperFormat;
  orientation: Orientation;
  matrixPosition: MatrixPosition;
  gapHorizontal: number; // Abstand zwischen Zeichen (in mm)
  gapVertical: number; // Abstand zwischen Zeilen (in mm)
  showFontSizeLabel: boolean; // Schriftgröße auf Seite anzeigen
  showTitle: boolean; // Titel anzeigen
  title?: string; // Titel-Text
  subtitle?: string; // Untertitel-Text
  titleFontSize: number; // Schriftgröße für Titel (in mm)
  subtitleFontSize: number; // Schriftgröße für Beschreibung (in mm)
  fontSizeLabelSize: number; // Schriftgröße für Größenanzeige (in mm)
  titleSubtitleGap: number; // Abstand zwischen Titel und Beschreibung (in mm)
}

export interface MatrixCell {
  symbol: string;
  color?: 'red' | 'green';
  fontStyle?: 'normal' | 'bold' | 'italic' | 'boldItalic'; // Für random-Modus
}

export type Matrix = MatrixCell[][];

