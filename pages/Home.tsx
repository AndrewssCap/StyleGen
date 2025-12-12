import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Upload, Loader2 } from 'lucide-react';
import { Layout } from '../components/Layout';
import { AppRoute } from '../types';
import { useStyle } from '../context/StyleContext';
import { analyzeWebsiteStyles, analyzeImageStyles } from '../services/geminiService';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { updateData } = useStyle();
  const [inputType, setInputType] = useState<'URL' | 'IMAGE'>('URL');
  const [url, setUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setError(null);
    setIsLoading(true);

    try {
      if (inputType === 'URL') {
        if (!url.trim()) {
          setError('Por favor, ingresa una URL válida');
          setIsLoading(false);
          return;
        }

        // Validar formato de URL
        try {
          new URL(url.startsWith('http') ? url : `https://${url}`);
        } catch {
          setError('URL inválida. Asegúrate de incluir el dominio completo');
          setIsLoading(false);
          return;
        }

        const styleData = await analyzeWebsiteStyles(url);
        updateData(styleData);
        navigate(AppRoute.RESULTS);
      } else {
        if (!imageFile) {
          setError('Por favor, selecciona una imagen');
          setIsLoading(false);
          return;
        }

        // Convertir imagen a base64
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64 = (reader.result as string).split(',')[1];
          const styleData = await analyzeImageStyles(base64);
          updateData(styleData);
          navigate(AppRoute.RESULTS);
        };
        reader.readAsDataURL(imageFile);
      }
    } catch (err) {
      console.error('Error al analizar:', err);
      setError(err instanceof Error ? err.message : 'Error al analizar. Por favor, intenta de nuevo.');
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar que sea una imagen
      if (!file.type.startsWith('image/')) {
        setError('Por favor, selecciona un archivo de imagen válido');
        return;
      }
      setImageFile(file);
      setError(null);
    }
  };

  return (
    <Layout className="items-center justify-center p-4">
      <div className="flex h-full w-full max-w-2xl grow flex-col items-center justify-center">
        <div className="flex w-full flex-col items-center gap-8 py-10">
          {/* PageHeading */}
          <div className="flex w-full flex-col gap-3 text-center">
            <h1 className="text-slate-900 dark:text-white text-4xl sm:text-5xl font-extrabold tracking-[-0.033em]">
              Genera Estilos Visuales al Instante
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
              Pega una URL o sube una imagen para extraer su identidad visual.
            </p>
          </div>

          <div className="flex w-full max-w-md flex-col gap-4">
            {/* Error Message */}
            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/50 p-4 text-red-500 text-sm">
                {error}
              </div>
            )}

            {/* SegmentedButtons */}
            <div className="flex h-12 items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-800 p-1.5">
              <label className={`flex h-full flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-md px-2 text-sm font-medium transition-colors duration-200 ${inputType === 'URL' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                <span className="truncate">URL</span>
                <input 
                  type="radio" 
                  className="invisible w-0" 
                  name="input-type" 
                  checked={inputType === 'URL'} 
                  onChange={() => setInputType('URL')}
                />
              </label>
              <label className={`flex h-full flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-md px-2 text-sm font-medium transition-colors duration-200 ${inputType === 'IMAGE' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                <span className="truncate">Subir Imagen</span>
                <input 
                  type="radio" 
                  className="invisible w-0" 
                  name="input-type" 
                  checked={inputType === 'IMAGE'}
                  onChange={() => setInputType('IMAGE')}
                />
              </label>
            </div>

            {/* Input Area */}
            <div className="flex flex-col">
              {inputType === 'URL' ? (
                <div className="flex flex-col">
                  <label className="flex flex-col flex-1">
                    <div className="flex w-full items-stretch rounded-lg">
                      <input 
                        className="form-input h-14 flex-1 resize-none overflow-hidden rounded-l-lg border-slate-300 bg-white p-4 text-base text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500" 
                        placeholder="https://ejemplo.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                      />
                      <div className="flex items-center justify-center rounded-r-lg border border-l-0 border-slate-300 bg-white px-4 text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-500">
                        <Link className="text-2xl" size={24} />
                      </div>
                    </div>
                  </label>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-6 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 px-6 py-14">
                    <div className="flex max-w-md flex-col items-center gap-2 text-center">
                        <p className="text-lg font-bold text-slate-900 dark:text-white">
                          {imageFile ? imageFile.name : 'Arrastra y suelta una imagen aquí'}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {imageFile ? 'Archivo seleccionado' : 'o haz clic para seleccionar un archivo'}
                        </p>
                    </div>
                    <label className="flex min-w-[84px] max-w-sm cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-slate-200 text-slate-900 text-sm font-bold tracking-[0.015em] hover:bg-slate-300 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">
                        <span className="truncate">Seleccionar archivo</span>
                        <Upload size={20} className="ml-2"/>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleFileChange}
                        />
                    </label>
                </div>
              )}
            </div>

            {/* Generate Button */}
            <div className="flex justify-center pt-2">
              <button 
                onClick={handleGenerate}
                disabled={isLoading || (inputType === 'URL' && !url.trim()) || (inputType === 'IMAGE' && !imageFile)}
                className="flex h-12 w-full max-w-md cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-5 text-base font-bold text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="mr-2 animate-spin" />
                    <span className="truncate">Analizando...</span>
                  </>
                ) : (
                  <span className="truncate">Generar Estilo</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
