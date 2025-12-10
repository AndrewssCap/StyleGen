import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Monitor, Smartphone, Layout as LayoutIcon } from 'lucide-react';
import { Layout } from '../components/Layout';
import { AppRoute } from '../types';

export const Mockups: React.FC = () => {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState<'Web' | 'Móvil'>('Web');

  return (
    <Layout>
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid dark:border-border-dark px-10 py-3">
            <div className="flex items-center gap-4 text-white">
                <div className="size-6 text-primary flex items-center justify-center">
                    <LayoutIcon size={24} />
                </div>
                <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Generador de Mockups</h2>
            </div>
            <div className="flex flex-1 justify-end items-center gap-4">
                <button 
                    onClick={() => navigate(AppRoute.EXPORT)}
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
                >
                    <span className="truncate">Ir a Exportar</span>
                </button>
                <button 
                    onClick={() => navigate(AppRoute.RESULTS)}
                    className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-slate-200 dark:bg-surface-dark text-slate-900 dark:text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                >
                    <Settings size={20} />
                </button>
                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: 'url("https://picsum.photos/100/100")' }}></div>
            </div>
        </header>

        <main className="px-10 py-8 flex flex-1 justify-center">
            <div className="flex flex-col max-w-7xl flex-1 gap-8">
                
                {/* Heading */}
                <div className="flex flex-wrap justify-between gap-4">
                    <div className="flex min-w-72 flex-col gap-2">
                        <p className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Generación de Mockups</p>
                        <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">Selecciona un formato y una plantilla para previsualizar tus estilos.</p>
                    </div>
                </div>

                {/* Format Selector */}
                <div className="flex flex-col">
                    <div className="flex px-0 py-3">
                        <div className="flex h-10 w-full max-w-xs items-center justify-center rounded-lg bg-slate-200 dark:bg-surface-dark p-1">
                            <label className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-2 gap-2 text-sm font-medium leading-normal transition-all ${viewMode === 'Web' ? 'bg-background-light dark:bg-background-dark shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                                <Monitor size={16} />
                                <span className="truncate">Web</span>
                                <input className="invisible w-0" name="format-selector" type="radio" checked={viewMode === 'Web'} onChange={() => setViewMode('Web')} />
                            </label>
                            <label className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-2 gap-2 text-sm font-medium leading-normal transition-all ${viewMode === 'Móvil' ? 'bg-background-light dark:bg-background-dark shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                                <Smartphone size={16} />
                                <span className="truncate">Móvil</span>
                                <input className="invisible w-0" name="format-selector" type="radio" checked={viewMode === 'Móvil'} onChange={() => setViewMode('Móvil')} />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Templates List */}
                    <div className="md:col-span-1 flex flex-col gap-6">
                        <h2 className="text-slate-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-0">Elige una plantilla</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { name: 'Landing Page', img: 'https://picsum.photos/300/200?random=1' },
                                { name: 'Página de Producto', img: 'https://picsum.photos/300/200?random=2' },
                                { name: 'Blog', img: 'https://picsum.photos/300/200?random=3' },
                                { name: 'Dashboard', img: 'https://picsum.photos/300/200?random=4' }
                            ].map((tpl, idx) => (
                                <div key={idx} className="relative group cursor-pointer">
                                    <div className="absolute inset-0 bg-primary rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100 ring-2 ring-primary ring-offset-2 ring-offset-background-dark z-0"></div>
                                    <div 
                                        className="bg-cover bg-center flex flex-col gap-3 rounded-lg justify-end p-4 aspect-video relative z-10 hover:translate-x-1 hover:-translate-y-1 transition-transform" 
                                        style={{ backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%), url("${tpl.img}")` }}
                                    >
                                        <p className="text-white text-base font-bold leading-tight line-clamp-2 shadow-sm">{tpl.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Preview Area */}
                    <div className="md:col-span-2 flex flex-col gap-6">
                        <h2 className="text-slate-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Previsualización</h2>
                        <div className="flex-1 flex items-center justify-center bg-slate-200 dark:bg-surface-dark rounded-xl p-4 min-h-[400px]">
                            <div 
                                className={`bg-cover bg-center rounded-lg shadow-lg transition-all duration-500 ${viewMode === 'Web' ? 'w-full h-full' : 'w-[375px] h-[667px]'}`} 
                                style={{ backgroundImage: 'url("https://picsum.photos/1200/800?grayscale")' }}
                            >
                                {/* Simulate overlay of generated styles */}
                                <div className="w-full h-full bg-primary/10 rounded-lg flex items-center justify-center">
                                    <div className="bg-white/90 dark:bg-black/80 p-6 rounded-xl backdrop-blur-sm text-center">
                                        <h1 className="text-2xl font-bold mb-2 text-primary">Estilo Aplicado</h1>
                                        <p className="text-sm">Mockup de previsualización</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    </Layout>
  );
};
