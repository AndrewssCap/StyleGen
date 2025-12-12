import https from 'https';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const API_KEY = process.env.GEMINI_API_KEY;

console.log('🔑 Testing API Key:', API_KEY);

const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const testBody = {
  contents: [{
    parts: [{
      text: "Di 'hola' en JSON: {\"mensaje\": \"hola\"}"
    }]
  }]
};

console.log('\n📤 Enviando petición de prueba a Gemini...\n');

fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testBody),
  agent: httpsAgent
})
.then(async response => {
  console.log('📡 Status:', response.status);
  console.log('📡 Status Text:', response.statusText);
  
  const text = await response.text();
  
  console.log('\n=== RESPUESTA COMPLETA ===');
  console.log(text);
  console.log('=== FIN ===\n');
  
  if (response.ok) {
    try {
      const json = JSON.parse(text);
      console.log('✅ JSON válido recibido');
      console.log('📄 Contenido:', JSON.stringify(json, null, 2));
    } catch (e) {
      console.log('❌ Respuesta no es JSON:', e.message);
    }
  } else {
    console.log('❌ Error de la API');
  }
})
.catch(error => {
  console.error('❌ Error en fetch:', error.message);
  console.error('Stack:', error.stack);
});