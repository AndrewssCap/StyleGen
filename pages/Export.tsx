import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, RefreshCw, Hexagon } from 'lucide-react';
import { Layout } from '../components/Layout';
import { useStyle } from '../context/StyleContext';
import { AppRoute } from '../types';

export const Export: React.FC = () => {
    const navigate = useNavigate();
    const { data } = useStyle();
    const [saturation, setSaturation] = useState(50);
    const [brightness, setBrightness] = useState(75);
    const [format, setFormat] = useState('css');

    const generateCode = () => {
        if (format === 'json') {
            return JSON.stringify({
                colors: {
                    primary: data.palette.primary.hex,
                    background: data.palette.background.hex,
                    surface: data.palette.surface.hex,
                    text: data.palette.text.hex
                }
            }, null, 2);
        }
        if (format === 'scss') {
            return `$primary: ${data.palette.primary.hex};\n$dark-bg: ${data.palette.background.hex};\n$surface: ${data.palette.surface.hex};\n$text: ${data.palette.text.hex};\n$subtle: ${data.palette.subtle.hex};`;
        }
        if (format === 'tailwind') {
             return `module.exports = {\n  theme: {\n    extend: {\n      colors: {\n        primary: '${data.palette.primary.hex}',\n        'dark-bg': '${data.palette.background.hex}',\n        surface: '${data.palette.surface.hex}',\n        text: '${data.palette.text.hex}'\n      }\n    }\n  }\n}`;
        }
        // CSS Variables default
        return `:root {\n  ${data.palette.primary.variable}: ${data.palette.primary.hex};\n  ${data.palette.background.variable}: ${data.palette.background.hex};\n  ${data.palette.surface.variable}: ${data.palette.surface.hex};\n  ${data.palette.text.variable}: ${data.palette.text.hex};\n  ${data.palette.subtle.variable}: ${data.palette.subtle.hex};\n}`;
    };

  return (
    <Layout>
      {/* TopNavBar */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-white/10 dark:border-b-[#232f48] px-6 sm:px-10 lg:px-20 py-3">
        <div className="flex items-center gap-4 text-white">
          <div className="size-6 text-primary flex items-center justify-center cursor-pointer" onClick={() => navigate(AppRoute.HOME)}>
            <Hexagon size={28} />
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] cursor-pointer" onClick={() => navigate(AppRoute.HOME)}>StyleGen</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="hidden sm:flex items-center gap-9">
             <button onClick={() => navigate(AppRoute.HOME)} className="text-white/80 hover:text-white text-sm font-medium leading-normal">Dashboard</button>
             <button onClick={() => navigate(AppRoute.RESULTS)} className="text-white/80 hover:text-white text-sm font-medium leading-normal">Análisis</button>
          </div>
          <div 
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" 
            style={{ backgroundImage: 'url("https://picsum.photos/100/100")' }}
          ></div>
        </div>
      </header>

      <main className="flex h-full grow flex-col">
        <div className="px-6 sm:px-10 lg:px-20 py-8">
          <div className="flex flex-col mx-auto w-full">
            
            {/* Breadcrumbs */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button onClick={() => navigate(AppRoute.RESULTS)} className="text-[#92a4c9]/80 hover:text-[#92a4c9] text-sm font-medium leading-normal">Análisis</button>
              <span className="text-[#92a4c9] text-sm font-medium leading-normal">/</span>
              <span className="text-white text-sm font-medium leading-normal">Ajustes y Exportación</span>
            </div>

            {/* PageHeading */}
            <div className="flex flex-wrap justify-between gap-3 mb-8">
              <div className="flex min-w-72 flex-col gap-2">
                <p className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">Ajustes y Exportación</p>
                <p className="text-[#92a4c9] text-base font-normal leading-normal">Refina la paleta de colores generada y exporta los estilos en tu formato preferido.</p>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Column: Color Palette Refinement */}
              <div className="flex flex-col gap-6">
                <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Refinar Paleta de Colores</h2>
                
                {/* Global Controls */}
                <div className="flex flex-col gap-6 p-6 rounded-xl bg-white/5 border border-white/10">
                  <h3 className="text-white text-lg font-bold">Ajustes Globales</h3>
                  <div className="flex flex-col gap-4">
                    <label className="text-[#92a4c9] text-sm font-medium" htmlFor="saturation">Saturación ({saturation})</label>
                    <input 
                        className="w-full h-2 bg-[#232f48] rounded-full appearance-none cursor-pointer accent-primary" 
                        id="saturation" 
                        max="100" 
                        min="0" 
                        type="range" 
                        value={saturation}
                        onChange={(e) => setSaturation(parseInt(e.target.value))}
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <label className="text-[#92a4c9] text-sm font-medium" htmlFor="brightness">Brillo ({brightness})</label>
                    <input 
                        className="w-full h-2 bg-[#232f48] rounded-full appearance-none cursor-pointer accent-primary" 
                        id="brightness" 
                        max="100" 
                        min="0" 
                        type="range" 
                        value={brightness}
                        onChange={(e) => setBrightness(parseInt(e.target.value))}
                    />
                  </div>
                </div>

                {/* Color Swatches */}
                <div>
                  <h3 className="text-white text-lg font-bold mb-4">Paleta Generada</h3>
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4">
                    {[
                        data.palette.primary,
                        data.palette.background,
                        data.palette.surface,
                        data.palette.text,
                        data.palette.subtle
                    ].map((color) => (
                        <div key={color.name} className="flex flex-col gap-2 group cursor-pointer">
                            <div className="aspect-video rounded-lg border-2 border-transparent group-hover:border-primary transition-colors" style={{ backgroundColor: color.hex }}></div>
                            <p className="text-white text-sm font-semibold leading-tight">{color.hex}</p>
                            <p className="text-[#92a4c9] text-xs">{color.name}</p>
                        </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Export Options */}
              <div className="flex flex-col gap-6">
                <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Exportar Estilos</h2>
                
                {/* Export Format */}
                <div className="flex flex-col gap-4 p-6 rounded-xl bg-white/5 border border-white/10">
                  <h3 className="text-white text-lg font-bold">Formato</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                        { id: 'css', label: 'Variables CSS' },
                        { id: 'json', label: 'JSON' },
                        { id: 'scss', label: 'SCSS' },
                        { id: 'tailwind', label: 'Tailwind Config' }
                    ].map((fmt) => (
                        <label key={fmt.id} className={`flex items-center gap-3 p-3 rounded-lg bg-white/5 cursor-pointer border border-transparent ${format === fmt.id ? 'bg-primary/20 border-primary' : ''}`}>
                            <input 
                                className="form-radio bg-transparent border-[#92a4c9] text-primary focus:ring-primary" 
                                name="export-format" 
                                type="radio" 
                                checked={format === fmt.id}
                                onChange={() => setFormat(fmt.id)}
                            />
                            <span className="text-white text-sm font-medium">{fmt.label}</span>
                        </label>
                    ))}
                  </div>
                </div>

                {/* Code Preview */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-white text-lg font-bold">Vista Previa</h3>
                  <div className="relative bg-[#0d1117] p-4 rounded-xl border border-white/10 min-h-[200px]">
                    <button className="absolute top-3 right-3 flex items-center gap-2 text-[#92a4c9] hover:text-white text-xs font-medium transition-colors">
                      <Copy size={16} />
                      Copiar
                    </button>
                    <pre className="text-sm text-[#92a4c9] overflow-auto font-mono">
                        <code>{generateCode()}</code>
                    </pre>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <button className="flex-1 flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors">
                    <span className="truncate">Exportar Archivos</span>
                  </button>
                  <button className="flex-1 flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-white/10 text-white text-base font-medium leading-normal hover:bg-white/20 transition-colors gap-2">
                    <RefreshCw size={18} />
                    <span className="truncate">Restablecer Ajustes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};
