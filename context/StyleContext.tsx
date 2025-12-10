import React, { createContext, useContext, useState, ReactNode } from 'react';
import { StyleData } from '../types';

const defaultStyleData: StyleData = {
  sourceUrl: 'your-client-website.com',
  palette: {
    primary: { hex: '#2b6cee', name: 'Primary', variable: '--primary' },
    background: { hex: '#111827', name: 'Dark BG', variable: '--dark-bg' },
    surface: { hex: '#1F2937', name: 'Surface', variable: '--surface' },
    text: { hex: '#FFFFFF', name: 'Text', variable: '--text' },
    subtle: { hex: '#6B7280', name: 'Subtle', variable: '--subtle' },
    accents: [
        { hex: '#5D5FEF', name: 'Accent 1', variable: '--accent-1' },
        { hex: '#C335A3', name: 'Accent 2', variable: '--accent-2' },
        { hex: '#F6F6F8', name: 'Light BG', variable: '--bg-light' },
        { hex: '#92A4C9', name: 'Muted', variable: '--muted' },
        { hex: '#232F48', name: 'Border', variable: '--border' },
        { hex: '#192233', name: 'Dark Surface', variable: '--surface-dark' }
    ]
  },
  typography: {
    family: 'Manrope',
    weights: ['Regular - 400', 'Bold - 700'],
    previewText: 'The quick brown fox jumps over the lazy dog.'
  },
  spacing: [
    { label: '4px', value: '0.25rem' },
    { label: '8px', value: '0.5rem' },
    { label: '16px', value: '1rem' },
    { label: '24px', value: '1.5rem' },
    { label: '32px', value: '2rem' },
  ],
  radius: [
    { label: '8px', value: '0.5rem' },
    { label: '12px', value: '0.75rem' },
    { label: '16px', value: '1rem' },
    { label: '999px', value: '9999px' },
  ]
};

interface StyleContextType {
  data: StyleData;
  updateData: (newData: Partial<StyleData>) => void;
}

const StyleContext = createContext<StyleContextType | undefined>(undefined);

export const StyleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<StyleData>(defaultStyleData);

  const updateData = (newData: Partial<StyleData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  return (
    <StyleContext.Provider value={{ data, updateData }}>
      {children}
    </StyleContext.Provider>
  );
};

export const useStyle = () => {
  const context = useContext(StyleContext);
  if (!context) {
    throw new Error('useStyle must be used within a StyleProvider');
  }
  return context;
};
