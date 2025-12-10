export interface Color {
  hex: string;
  name: string;
  variable: string;
}

export interface Palette {
  primary: Color;
  background: Color;
  surface: Color;
  text: Color;
  subtle: Color;
  accents: Color[];
}

export interface Typography {
  family: string;
  weights: string[];
  previewText: string;
}

export interface Spacing {
  value: string;
  label: string;
}

export interface Radius {
  value: string;
  label: string;
}

export interface StyleData {
  sourceUrl?: string;
  palette: Palette;
  typography: Typography;
  spacing: Spacing[];
  radius: Radius[];
}

export enum AppRoute {
  HOME = '/',
  RESULTS = '/results',
  EXPORT = '/export',
  MOCKUPS = '/mockups'
}
