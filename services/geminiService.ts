import { StyleData } from '../types';

const API_BASE_URL = 'http://localhost:8888/api';

/**
 * Analiza una URL y extrae los estilos visuales usando Gemini AI
 */
export async function analyzeWebsiteStyles(url: string): Promise<Partial<StyleData>> {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze-url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al analizar la URL');
    }

    const styleData = await response.json();
    return styleData;

  } catch (error) {
    console.error('Error analizando sitio web:', error);
    throw error;
  }
}

/**
 * Analiza una imagen y extrae los estilos visuales usando Gemini Vision
 */
export async function analyzeImageStyles(imageBase64: string): Promise<Partial<StyleData>> {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageBase64 })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al analizar la imagen');
    }

    const styleData = await response.json();
    return styleData;

  } catch (error) {
    console.error('Error analizando imagen:', error);
    throw error;
  }
}
