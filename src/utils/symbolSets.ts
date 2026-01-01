import { SymbolSetName } from '../types';
import { getTranslations } from './i18n';

export const SYMBOL_SETS: Record<SymbolSetName, string[]> = {
  allNumbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  binary: ['0', '1'],
  confusionLetters: ['p', 'q', 'b', 'd'],
  allNumbersAndLetters: [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
  ],
  allLetters: [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
  ],
  emotions: ['😊', '😢', '😠', '😮', '😴', '😍', '🤔', '😎', '😃', '🥳'],
  directions: ['↑', '↓', '←', '→'],
  shapes: ['●', '▲', '■', '✕'],
  custom: []
};

export function getSymbolSetLabels(): Record<SymbolSetName, string> {
  const t = getTranslations();
  return {
    allNumbers: t.symbolSets.allNumbers,
    binary: t.symbolSets.binary,
    confusionLetters: t.symbolSets.confusionLetters,
    allNumbersAndLetters: t.symbolSets.allNumbersAndLetters,
    allLetters: t.symbolSets.allLetters,
    emotions: t.symbolSets.emotions,
    directions: t.symbolSets.directions,
    shapes: t.symbolSets.shapes,
    custom: t.symbolSets.custom
  };
}

export function getSymbols(setName: SymbolSetName, customSymbols?: string): string[] {
  if (setName === 'custom' && customSymbols) {
    const trimmed = customSymbols.trim();
    if (!trimmed) return [];
    
    // Wenn Leerzeichen vorhanden sind, durch Leerzeichen trennen (für Multi-Char-Symbole wie Emojis)
    if (trimmed.includes(' ')) {
      return trimmed.split(/\s+/).filter(s => s.trim() !== '');
    }
    
    // Wenn keine Leerzeichen vorhanden sind, jedes Zeichen einzeln verwenden
    return Array.from(trimmed);
  }
  return SYMBOL_SETS[setName];
}

export function getRandomSymbol(setName: SymbolSetName, customSymbols?: string): string {
  const symbols = getSymbols(setName, customSymbols);
  if (symbols.length === 0) return '?';
  return symbols[Math.floor(Math.random() * symbols.length)];
}

