type Palette = string[]
type Palettes = Record<string, Palette>

const colorPalettes: Palettes = {
  pastel: [
    '#ffcdb2',
    '#ffb4a2',
    '#e5989b',
    '#b5838d',
  ] as Palette,
  neon: [
    '#f72585',
    '#7209b7',
    '#3a0ca3',
    '#4361ee',
  ] as Palette,
  dark: [
    '#000000',
    '#14213d',
    '#fca311',
    '#e5e5e5',
  ] as Palette,
  spring: [
    '#f6bd60',
    '#f7ede2',
    '#f5cac3',
    '#84a59d',
  ] as Palette
} as const
