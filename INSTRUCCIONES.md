# 🎨 StyleGen - Generador de Estilos Visuales con IA

Aplicación que analiza sitios web e imágenes para extraer automáticamente estilos visuales (paleta de colores, tipografía, espaciados, etc.) usando Gemini AI.

## 🚀 Inicio Rápido

### Opción 1: Usar el script automático (Recomendado)
1. Haz doble clic en `start.bat`
2. Se abrirán 2 ventanas de consola
3. Espera 5-10 segundos
4. Abre tu navegador en: **http://localhost:5174**

### Opción 2: Inicio manual
Abre 2 terminales:

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Luego abre el navegador en la URL que muestre Vite (generalmente `http://localhost:5173` o `5174`)

## 📋 Configuración

### Requisitos
- Node.js v18+ instalado
- API Key de Google Gemini

### Variables de Entorno
El archivo `.env.local` ya contiene la API key configurada:
```
GEMINI_API_KEY=AIzaSyAm3q9A5uYOWHcLPmF-V-9tqtFDsCLXhts
```

## 🔧 Puertos Utilizados

- **Backend API**: Puerto 8888
- **Frontend**: Puerto 5173 o 5174 (si 5173 está ocupado)

## 💡 Uso

1. Ingresa una URL de un sitio web (ej: `https://www.google.com`)
2. O sube una imagen
3. Haz clic en "Generar Estilo"
4. Espera 5-15 segundos mientras Gemini analiza
5. ¡Visualiza los estilos extraídos!

## 📁 Estructura del Proyecto

```
StyleGen/
├── server/           # Backend API (Express + Gemini)
├── services/         # Servicios de frontend
├── pages/            # Páginas de la aplicación
├── components/       # Componentes reutilizables
├── context/          # Context API de React
├── .env.local        # Variables de entorno (API Key)
└── start.bat         # Script de inicio automático
```

## 🛠️ Comandos Disponibles

- `npm run dev` - Inicia el servidor de desarrollo frontend
- `npm run server` - Inicia el servidor backend
- `npm start` - Inicia ambos servidores (requiere concurrently)
- `npm run build` - Compila para producción
- `npm run preview` - Previsualiza la build de producción

## ⚠️ Solución de Problemas

### El puerto está ocupado
Si ves el error "address already in use", cierra todas las ventanas de consola y vuelve a ejecutar `start.bat`

### Error de CORS
Asegúrate de que el backend esté corriendo antes de intentar analizar una URL

### Error "API Key not configured"
Verifica que el archivo `.env.local` exista y contenga la API key

## 🎯 Tecnologías

- **Frontend**: React 19, TypeScript, Vite, TailwindCSS
- **Backend**: Node.js, Express
- **IA**: Google Gemini 1.5 Flash
- **Routing**: React Router DOM v7

---

**Desarrollado con ❤️ usando Gemini AI**
