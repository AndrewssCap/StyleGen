import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, ArrowLeft, Palette as PaletteIcon, Copy, Hexagon } from 'lucide-react';
import { Layout } from '../components/Layout';
import { useStyle } from '../context/StyleContext';
import { AppRoute } from '../types';

export const Analysis: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useStyle();

  return (
    <Layout>
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          
          {/* TopNavBar */}
          <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border-dark px-4 sm:px-6 lg:px-10 py-3">
            <div className="flex items-center gap-4 text-white">
              <div className="size-6 text-primary flex items-center justify-center">
                 <Hexagon size={28} />
              </div>
              <h1 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Resultados del Análisis</h1>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => navigate(AppRoute.EXPORT)}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] gap-2 hover:bg-opacity-90 transition-colors"
              >
                <Download size={18} />
                <span className="truncate hidden sm:inline">Exportar Estilos</span>
              </button>
               <button 
                onClick={() => navigate(AppRoute.MOCKUPS)}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-white/10 text-white text-sm font-bold leading-normal tracking-[0.015em] gap-2 hover:bg-white/20 transition-colors"
              >
                <span className="truncate">Ver Mockups</span>
              </button>
              <button 
                onClick={() => navigate(AppRoute.HOME)}
                className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-surface-dark text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-slate-700 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
            </div>
          </header>

          <main className="flex flex-col gap-8 mt-6 px-2 sm:px-4">
            
            {/* Card Info */}
            <div className="p-2 sm:p-4">
              <div className="flex flex-col sm:flex-row items-stretch justify-between gap-4 rounded-lg bg-surface-dark p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
                <div className="flex flex-col gap-1 flex-[2_2_0px]">
                  <p className="text-white text-base font-bold leading-tight">Analizado: {data.sourceUrl}</p>
                  <p className="text-text-muted-dark text-sm font-normal leading-normal">Vista previa del recurso analizado</p>
                </div>
                <div 
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1" 
                    style={{ backgroundImage: 'url("https://picsum.photos/400/225")' }}
                ></div>
              </div>
            </div>

            {/* Color Palette Section */}
            <section>
              <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Paleta de Colores</h2>
              <div className="flex flex-col gap-6">
                
                {/* Primary Colors */}
                <div>
                  <h3 className="text-text-muted-dark px-4 pb-2 text-sm font-semibold">Colores Primarios</h3>
                  <div className="flex flex-wrap gap-5 p-4 rounded-lg bg-surface-dark">
                    <label className="size-12 rounded-full border-2 border-border-dark ring-2 ring-transparent has-[:checked]:border-white has-[:checked]:ring-primary cursor-pointer relative" style={{ backgroundColor: data.palette.primary.hex }}>
                      <input defaultChecked className="opacity-0 absolute inset-0 cursor-pointer" name="color-palette" type="radio" />
                    </label>
                     <label className="size-12 rounded-full border-2 border-border-dark ring-2 ring-transparent has-[:checked]:border-white has-[:checked]:ring-primary cursor-pointer relative" style={{ backgroundColor: data.palette.background.hex }}>
                      <input className="opacity-0 absolute inset-0 cursor-pointer" name="color-palette" type="radio" />
                    </label>
                  </div>
                  <div className="flex items-center gap-4 bg-background-dark px-4 min-h-14 justify-between border-t border-border-dark rounded-b-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-primary flex items-center justify-center shrink-0 size-10">
                        <PaletteIcon size={24} />
                      </div>
                      <p className="text-white text-base font-normal leading-normal flex-1 truncate">HEX: {data.palette.primary.hex}</p>
                    </div>
                    <button className="shrink-0 p-2 rounded-md hover:bg-surface-dark transition-colors">
                      <Copy size={20} className="text-text-muted-dark" />
                    </button>
                  </div>
                </div>

                {/* Accent & Neutral Colors */}
                <div>
                  <h3 className="text-text-muted-dark px-4 pb-2 text-sm font-semibold">Acentos y Neutrales</h3>
                  <div className="p-4 rounded-lg bg-surface-dark">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {data.palette.accents.map((color, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-2">
                            <div className="w-16 h-16 rounded-lg shadow-sm" style={{ backgroundColor: color.hex }}></div>
                            <p className="text-text-muted-dark text-xs">{color.hex}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Typography & Styles Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Typography Section */}
              <section>
                <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Tipografía</h2>
                <div className="flex flex-col bg-surface-dark rounded-lg overflow-hidden">
                  <div className="p-4">
                    <p className="text-white text-lg font-bold">{data.typography.family}</p>
                    <p className="text-text-muted-dark text-sm">Font Family</p>
                  </div>
                  <div className="px-4 py-6 border-t border-border-dark">
                    <h1 className="text-white text-4xl font-bold">Aa - The quick brown fox</h1>
                    <p className="text-text-muted-dark mt-2 text-base">{data.typography.weights[0]}</p>
                  </div>
                  <div className="px-4 py-4 border-t border-border-dark">
                    <p className="text-white text-base">{data.typography.previewText}</p>
                    <p className="text-text-muted-dark mt-1 text-sm">Body Text</p>
                  </div>
                </div>
              </section>

              {/* Interface Styles Section */}
              <section>
                <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Estilos de Interfaz</h2>
                <div className="flex flex-col gap-6">
                  {/* Spacing */}
                  <div className="bg-surface-dark rounded-lg p-4">
                    <h3 className="text-white font-bold mb-3">Espaciado</h3>
                    <div className="flex flex-wrap gap-3">
                        {data.spacing.map((space, idx) => (
                            <div key={idx} className={`text-sm font-mono py-1 px-3 rounded-full ${idx === 2 ? 'bg-primary/20 text-primary border border-primary' : 'bg-border-dark text-text-muted-dark'}`}>
                                {space.label}
                            </div>
                        ))}
                    </div>
                  </div>
                  {/* Border Radius */}
                  <div className="bg-surface-dark rounded-lg p-4">
                    <h3 className="text-white font-bold mb-4">Radios de Borde</h3>
                    <div className="flex items-end gap-4 text-center">
                        {data.radius.map((rad, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-2">
                                <div 
                                    className="bg-border-dark" 
                                    style={{ 
                                        width: idx === 3 ? '48px' : `${48 + (idx * 16)}px`, 
                                        height: idx === 3 ? '48px' : `${48 + (idx * 16)}px`,
                                        borderRadius: rad.value 
                                    }}
                                ></div>
                                <p className="text-text-muted-dark text-xs">{rad.label}</p>
                            </div>
                        ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};
