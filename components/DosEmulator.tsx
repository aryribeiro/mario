'use client';

import { useEffect, useRef, useState } from 'react';

export default function DosEmulator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized) return;
    
    let ci: any = null;

    const loadScript = () => {
      return new Promise((resolve, reject) => {
        if ((window as any).Dos) {
          resolve((window as any).Dos);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://js-dos.com/6.22/current/js-dos.js';
        script.onload = () => {
          setTimeout(() => {
            if ((window as any).Dos) {
              resolve((window as any).Dos);
            } else {
              reject(new Error('Dos not available after script load'));
            }
          }, 100);
        };
        script.onerror = () => reject(new Error('Failed to load js-dos script'));
        document.head.appendChild(script);
      });
    };

    const initDos = async () => {
      try {
        if (!canvasRef.current) return;

        setInitialized(true);
        setLoading(true);
        
        const Dos = await loadScript() as any;
        
        console.log('Inicializando DOSBox v6...');
        
        ci = await Dos(canvasRef.current, {
          wdosboxUrl: 'https://js-dos.com/6.22/current/wdosbox.js',
          dosboxConf: `
[render]
aspect=true
scaler=none
frameskip=0

[cpu]
cycles=fixed 20000
core=simple
cputype=pentium_slow

[dosbox]
machine=svga_s3

[mixer]
nosound=false
rate=44100
blocksize=512
prebuffer=20

[sblaster]
sbtype=sb16
sbbase=220
irq=7
dma=1
hdma=5
sbmixer=true
oplmode=auto
oplemu=default
oplrate=44100

[speaker]
pcspeaker=false
pcrate=44100
tandy=off
tandyrate=44100
disney=false

[midi]
mpu401=intelligent
mididevice=default
          `.trim(),
        });

        console.log('Carregando bundle do Mario...');

        const response = await fetch('/mario.zip');
        if (!response.ok) {
          throw new Error(`Failed to load mario.zip: ${response.status}`);
        }
        
        const zipBlob = await response.blob();
        console.log(`Bundle carregado: ${(zipBlob.size / 1024 / 1024).toFixed(2)} MB`);

        const zipUrl = URL.createObjectURL(zipBlob);
        await ci.fs.extract(zipUrl);
        console.log('Arquivos extraídos com sucesso!');
        URL.revokeObjectURL(zipUrl);

        console.log('Executando MARIO.EXE...');
        ci.main(['-c', 'MARIO.EXE']);
        
        // Aguardar um pouco para o jogo iniciar antes de remover loading
        setTimeout(() => {
          setLoading(false);
          console.log('Mario iniciado!');
        }, 2000); // 2 segundos de delay
      } catch (err) {
        console.error('Erro ao inicializar DOS:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        setLoading(false);
      }
    };

    initDos();

    return () => {
      if (ci) {
        try {
          ci.exit();
        } catch (e) {
          // Ignorar erros ao sair
        }
      }
    };
  }, [initialized]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-blue-900 to-black">
      {loading && (
        <div className="absolute z-50 flex flex-col items-center justify-center">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-white mb-2 tracking-wider" style={{ fontFamily: 'monospace' }}>
              MARIO TEACHES TYPING
            </h1>
            <p className="text-xl text-blue-300 text-center" style={{ fontFamily: 'monospace' }}>
              Classic MS-DOS Edition
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              <div className="w-4 h-4 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '450ms' }}></div>
            </div>
            
            <div className="text-white text-lg font-mono mt-4">
              <span className="inline-block animate-pulse">Loading DOSBox emulator v8...</span>
            </div>
            
            <div className="w-96 h-2 bg-gray-700 rounded-full overflow-hidden mt-4">
              <div className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 animate-pulse"></div>
            </div>
            
            <p className="text-gray-400 text-sm mt-6 font-mono">
              🎮 Preparing your typing adventure...
            </p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute z-50 max-w-2xl mx-auto p-8 bg-red-900 bg-opacity-90 rounded-lg border-4 border-red-500">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-6xl">❌</div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Error Loading Emulator</h2>
              <p className="text-red-200">Something went wrong while initializing DOSBox</p>
            </div>
          </div>
          <div className="bg-black bg-opacity-50 p-4 rounded font-mono text-sm text-red-300 mb-4">
            {error}
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition-colors"
          >
            🔄 Reload Page
          </button>
          <p className="text-gray-400 text-xs mt-4 text-center">
            Press F12 to open browser console for details
          </p>
        </div>
      )}
      
      {/* Container do canvas com tamanho maior */}
      <div className="relative w-full h-full max-w-7xl max-h-screen p-4">
        <canvas
          ref={canvasRef}
          className="w-full h-full rounded-lg shadow-2xl"
          style={{ 
            imageRendering: 'pixelated',
            backgroundColor: '#000',
            display: loading ? 'none' : 'block',
            opacity: loading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out',
            imageSmoothing: 'false',
            cursor: 'none',
          } as React.CSSProperties}
        />
      </div>
    </div>
  );
}
