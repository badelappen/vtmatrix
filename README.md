# Matrix Generator for Visual Training

A professional tool for creating custom number and symbol matrices for visual training. Generate personalized training materials with various symbol sets, layout shapes, and red-green glasses mode. Export high-resolution PDFs for printing.

## Features

- ✅ **Configurable Matrix Size**: Adjustable rows and columns (3-50)
- ✅ **Various Layout Shapes**: Rectangular, Diamond, Triangular
- ✅ **Symbol Sets**: 
  - All Numbers (0-9)
  - Binary (0, 1)
  - Confusion Letters (p, q, b, d)
  - Numbers + Letters
  - Letters Only
  - Emojis - Emotions (😊 😢 😠 😮 😴 etc.)
  - Arrows (↑ ↓ ← →)
  - Shapes (● ▲ ■ ✕)
  - Custom
- ✅ **Font Size Control**: 4mm - 30mm (in millimeters for precise printing)
- ✅ **Font Selection**: Arial, Helvetica, Verdana, Times New Roman, Georgia, Courier New, Monaco
- ✅ **Font Style**: Normal, Bold, Italic, Bold-Italic, Random
- ✅ **Character Spacing**: Individually adjustable horizontal and vertical spacing
- ✅ **Red-Green Glasses Mode**: 
  - Random distribution (scientifically recommended)
  - Checkerboard pattern
  - Striped pattern
  - Adjustable intensity
- ✅ **PDF Export with Advanced Options**:
  - Paper formats: A4, A3, Letter (US), Legal (US)
  - Orientation: Portrait, Landscape
  - Matrix position: 9 positions (3x3 grid) on the page
  - Title and subtitle (optional, multi-line)
  - Font size display on PDF (optional)
  - High resolution for professional printing
- ✅ **Auto-Save**: Configurations are saved in the browser (LocalStorage)

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The app runs on `http://localhost:3000`

## Production Build

```bash
npm run build
```

The built files are located in the `dist/` folder.

## Usage

1. **Set Matrix Size**: Choose the number of rows and columns (3-50)
2. **Choose Layout Shape**: Rectangular, Diamond, or Triangular
3. **Select Symbol Set**: Choose the desired symbol set or enter custom characters
4. **Adjust Font Size**: Use the slider (4mm - 30mm)
5. **Choose Font**: Select an appropriate font
6. **Choose Font Style**: Normal, Bold, Italic, Bold-Italic, or Random
7. **Adjust Spacing**: Horizontal and vertical spacing between characters (optional)
8. **Red-Green Glasses Mode**: Activate the mode for visual training
   - Choose distribution type (Random, Checkerboard, Stripes)
   - Adjust intensity
9. **PDF Settings** (optional):
   - Choose paper format (A4, A3, Letter, Legal)
   - Choose orientation (Portrait, Landscape)
   - Choose matrix position on the page (9 positions)
   - Add title and subtitle
   - Toggle font size display
10. **Generate New Matrix**: Click on "New Matrix"
11. **Export as PDF**: Click on "Export as PDF"

## What is Visual Training?

Visual training (also known as vision therapy or visual therapy) is a form of therapy that uses specific exercises to improve visual skills and processing. It involves training the brain and eyes to work together more effectively.

### Key Visual Skills Trained:
- **Selective Attention**: The ability to focus on specific visual elements while filtering out distractions
- **Visual Processing**: How the brain interprets and makes sense of visual information
- **Pattern Recognition**: Identifying and understanding visual patterns and relationships
- **Visual Working Memory**: Retaining and manipulating visual information in short-term memory
- **Visual Discrimination**: Distinguishing between similar visual elements
- **Concentration**: Maintaining sustained visual focus over time

### Matrix Training:
Matrix-based visual training uses grids of numbers, symbols, or patterns to train these visual skills. By systematically working through matrices, individuals can improve their visual processing abilities, attention span, and cognitive performance.

### Red-Green Glasses Training:
Red-green glasses are a specialized tool used in visual therapy. When viewing matrices with color-filtered elements:
- The brain must actively distinguish between red and green elements
- This trains **selective attention** by forcing focused visual processing
- **Random distribution** is particularly effective as it requires constant visual discrimination
- Structured patterns (checkerboard, stripes) train pattern recognition and visual organization

### Application Areas:
- **Therapy and Rehabilitation**: Used by vision therapists, occupational therapists, and rehabilitation specialists
- **Educational Support**: Helps improve visual skills that support learning and reading
- **Performance Training**: Used by athletes and professionals to enhance visual processing
- **Home Practice**: Printable materials for continued practice and progress tracking
- **Research**: Tool for visual perception studies and cognitive training research

## Technology Stack

- **Vanilla TypeScript** - No framework overhead
- **Vite** - Fast build tool and dev server
- **jsPDF** - Client-side PDF export (directly from matrix data, no canvas conversion)
- **CSS Custom Properties** - Dynamic styling
- **LocalStorage API** - Persistent configuration storage

## Browser Compatibility

Modern browsers (Chrome, Firefox, Safari, Edge) with ES2020 support and LocalStorage.

## Project Structure

```
vtmatrix/
├── src/
│   ├── app.ts              # Main app logic
│   ├── main.ts             # Entry point
│   ├── components/         # UI components
│   │   ├── ControlsPanel.ts
│   │   └── MatrixDisplay.ts
│   ├── utils/              # Utility functions
│   │   ├── matrixGenerator.ts
│   │   ├── symbolSets.ts
│   │   ├── pdfExporter.ts
│   │   ├── colorFilter.ts
│   │   └── layoutShapes.ts
│   ├── types/              # TypeScript types
│   │   └── index.ts
│   └── styles/             # CSS styles
│       └── main.css
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.js
```

## License

ISC
