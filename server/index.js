import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import https from 'https';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const app = express();
const PORT = 8888;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error('❌ ERROR: GEMINI_API_KEY no encontrada');
  process.exit(1);
}

console.log('✅ API Key cargada correctamente');

// Agente HTTPS que ignora certificados SSL
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

// Configurar variable de entorno para ignorar certificados
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.post('/api/analyze-url', async (req, res) => {
  try {
    const { url } = req.body;
    
    console.log('📥 Recibida solicitud para analizar URL:', url);

    if (!url) {
      return res.status(400).json({ error: 'URL es requerida' });
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    
    const prompt = `Analiza el sitio web en ${url} y extrae su sistema de diseño.
    
Devuelve ÚNICAMENTE un objeto JSON válido:

{
  "palette": {
    "primary": { "hex": "#4285F4", "name": "Primary" },
    "background": { "hex": "#FFFFFF", "name": "Background" },
    "surface": { "hex": "#F8F9FA", "name": "Surface" },
    "text": { "hex": "#202124", "name": "Text" },
    "subtle": { "hex": "#5F6368", "name": "Subtle" },
    "accents": [
      { "hex": "#EA4335", "name": "Accent 1" },
      { "hex": "#FBBC04", "name": "Accent 2" }
    ]
  },
  "typography": {
    "family": "Roboto",
    "weights": ["Regular - 400", "Bold - 700"],
    "previewText": "The quick brown fox jumps over the lazy dog."
  },
  "spacing": [
    { "label": "4px", "value": "0.25rem" },
    { "label": "8px", "value": "0.5rem" },
    { "label": "16px", "value": "1rem" }
  ],
  "radius": [
    { "label": "4px", "value": "0.25rem" },
    { "label": "8px", "value": "0.5rem" }
  ]
}`;

    const requestBody = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    };

    console.log('🤖 Enviando solicitud a Gemini API...');

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      agent: httpsAgent
    });

    console.log('📡 Status de respuesta:', response.status);

    // IMPORTANTE: Leer como texto primero
    const responseText = await response.text();
    
    console.log('📄 Respuesta (primeros 500 chars):');
    console.log(responseText.substring(0, 500));

    if (!response.ok) {
      console.error('❌ Error de la API de Gemini');
      return res.status(500).json({ 
        error: `Error ${response.status} de la API de Gemini`,
        details: responseText.substring(0, 500)
      });
    }

    // Intentar parsear como JSON
    let geminiData;
    try {
      geminiData = JSON.parse(responseText);
    } catch (parseError) {
      console.error('❌ La respuesta NO es JSON válido');
      console.error('Respuesta completa:', responseText);
      return res.status(500).json({ 
        error: 'La API de Gemini devolvió una respuesta inválida (probablemente bloqueada por proxy corporativo)',
        details: responseText.substring(0, 500),
        suggestion: 'Tu red corporativa puede estar bloqueando las peticiones a Google. Contacta con IT o usa una VPN.'
      });
    }

    const text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
      console.error('❌ No se encontró contenido en la respuesta');
      return res.status(500).json({ 
        error: 'Respuesta de Gemini sin contenido',
        details: JSON.stringify(geminiData)
      });
    }

    console.log('📝 Texto de Gemini:', text.substring(0, 300));

    // Extraer JSON del texto
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('❌ No se encontró JSON en el texto');
      return res.status(500).json({ 
        error: 'No se pudo extraer JSON',
        details: text.substring(0, 500)
      });
    }

    const styleData = JSON.parse(jsonMatch[0]);
    console.log('✅ Análisis completado exitosamente');
    res.json(styleData);

  } catch (error) {
    console.error('❌ Error en analyze-url:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({ 
      error: error.message,
      stack: error.stack 
    });
  }
});

app.listen(PORT, () => {
  console.log('🚀 API Server running on http://localhost:' + PORT);
  console.log('📡 Frontend should be on http://localhost:5173');
});