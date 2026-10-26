import { useState, useEffect } from 'react';
import { Cpu, MemoryStick, HardDrive, Zap, ChevronDown, Check, Boxes, Rocket } from 'lucide-react';
import { LOADERS, type Instance } from '../types';

function SystemWidget({ extremeMode, onToggleExtreme }: { extremeMode: boolean; onToggleExtreme: () => void }) {
  const [ramUsed, setRamUsed] = useState(2.4);
  const [vramUsed, setVramUsed] = useState(96);

  useEffect(() => {
    const i = setInterval(() => {
      setRamUsed(2 + Math.random() * 1.2);
      setVramUsed(80 + Math.random() * 40);
    }, 2200);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="w-72 glass rounded-2xl border border-white/5 p-5 float-y">
      <div className="flex items-center gap-2 mb-4">
        <Cpu size={15} className="text-violet-400" />
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-300">Estado del Sistema</h3>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-[10px] text-violet-400/80 font-medium">En línea</span>
        </div>
      </div>

      <div className="space-y-4">
        <StatRow icon={MemoryStick} label="RAM" used={ramUsed} total={8} unit="GB" color="violet" />
        <StatRow icon={Zap} label="VRAM" used={vramUsed} total={128} unit="MB" color="purple" warning />

        <div className="pt-3 border-t border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HardDrive size={14} className="text-amber-400" />
              <div>
                <div className="text-xs font-semibold text-white">Modo Extremo</div>
                <div className="text-[10px] text-zinc-500">Optimización del sistema</div>
              </div>
            </div>
            <button
              onClick={onToggleExtreme}
              className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
                extremeMode ? 'bg-gradient-to-r from-violet-500 to-purple-600' : 'bg-zinc-700'
              }`}
              aria-pressed={extremeMode}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                  extremeMode ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>
          {extremeMode && (
            <div className="mt-2 text-[10px] text-violet-400/80 bg-violet-400/5 rounded-md px-2 py-1.5 fade-in">
              Optimización por código activada: chunks dinámicos, render inteligente y sin sacrificar los gráficos.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatRow({
  icon: Icon, label, used, total, unit, color, warning,
}: {
  icon: typeof Cpu; label: string; used: number; total: number; unit: string;
  color: 'violet' | 'purple'; warning?: boolean;
}) {
  const pct = Math.min((used / total) * 100, 100);
  const barColor = color === 'violet' ? 'from-violet-400 to-violet-500' : 'from-purple-400 to-purple-500';
  const textColor = color === 'violet' ? 'text-violet-400' : 'text-purple-400';
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <Icon size={13} className={textColor} />
          <span className="text-xs font-medium text-zinc-300">{label}</span>
        </div>
        <span className={`text-[11px] font-mono ${warning && used > total * 0.85 ? 'text-amber-400' : 'text-zinc-400'}`}>
          {used.toFixed(1)} / {total} {unit}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${barColor} transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function InstanceSelector({
  instances, selectedId, onSelect,
}: {
  instances: Instance[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = instances.find((i) => i.id === selectedId) ?? null;
  const currentLoader = selected ? LOADERS.find((l) => l.name === selected.loader) : null;

  return (
    <div className="relative w-full max-w-sm">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-white transition-colors"
      >
        {selected ? (
          <>
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-black shrink-0"
              style={{ background: `linear-gradient(135deg, ${selected.iconColor}, ${selected.iconColor}dd)` }}
            >
              {selected.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="text-sm font-semibold text-white truncate">{selected.name}</div>
              <div className="text-[10px] text-zinc-500">Minecraft {selected.version}</div>
            </div>
            {currentLoader && (
              <span
                className="text-[10px] font-medium px-2 py-0.5 rounded-md shrink-0"
                style={{ background: `${currentLoader.color}22`, color: currentLoader.color }}
              >
                {selected.loader}
              </span>
            )}
          </>
        ) : (
          <div className="flex items-center gap-2 text-zinc-500">
            <Boxes size={16} />
            <span>Selecciona una instancia</span>
          </div>
        )}
        <ChevronDown size={15} className={`text-zinc-400 transition-transform shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute z-20 mt-2 w-full max-h-72 overflow-y-auto no-scrollbar glass rounded-xl border border-white/10 p-1.5 shadow-2xl animate-in">
            {instances.length === 0 ? (
              <div className="px-3 py-6 text-center text-xs text-zinc-500">
                No hay instancias creadas. Ve a la sección Instancias para crear una.
              </div>
            ) : (
              instances.map((inst) => {
                const loader = LOADERS.find((l) => l.name === inst.loader);
                return (
                  <button
                    key={inst.id}
                    onClick={() => { onSelect(inst.id); setOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                      inst.id === selectedId ? 'bg-violet-400/10' : 'hover:bg-white/5'
                    }`}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-black shrink-0"
                      style={{ background: `linear-gradient(135deg, ${inst.iconColor}, ${inst.iconColor}dd)` }}
                    >
                      {inst.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-medium truncate ${inst.id === selectedId ? 'text-violet-400' : 'text-white'}`}>
                        {inst.name}
                      </div>
                      <div className="text-[10px] text-zinc-500">Minecraft {inst.version}</div>
                    </div>
                    {loader && (
                      <span
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md shrink-0"
                        style={{ background: `${loader.color}22`, color: loader.color }}
                      >
                        {inst.loader}
                      </span>
                    )}
                    {inst.id === selectedId && <Check size={14} className="text-violet-400 shrink-0" />}
                  </button>
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default function HomeView({
  instances, selectedInstanceId, onSelectInstance, onPlay, extremeMode, onToggleExtreme,
}: {
  instances: Instance[];
  selectedInstanceId: string | null;
  onSelectInstance: (id: string) => void;
  onPlay: () => void;
  extremeMode: boolean;
  onToggleExtreme: () => void;
}) {
  const [launching, setLaunching] = useState(false);
  const selected = instances.find((i) => i.id === selectedInstanceId) ?? null;

  const handlePlay = () => {
    if (launching || !selected) return;
    setLaunching(true);
    onPlay();
    setTimeout(() => setLaunching(false), 4000);
  };

  return (
    <div className="relative h-full overflow-y-auto no-scrollbar">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-purple-600/10 blur-[120px]" />
      </div>

      <div className="relative px-10 pt-10 pb-16 max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-[11px] uppercase tracking-[0.25em] text-violet-400/80 font-medium mb-2">Panel Principal</div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Bienvenido de vuelta</h1>
            <p className="text-sm text-zinc-400 mt-1">Selecciona una instancia y lanza tu aventura.</p>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-zinc-500">Tienes</div>
            <div className="text-2xl font-bold text-white">{instances.length}</div>
            <div className="text-[11px] text-zinc-500">instancias creadas</div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-10 py-8">
          <SystemWidget extremeMode={extremeMode} onToggleExtreme={onToggleExtreme} />

          <div className="flex flex-col items-center gap-6">
            <button
              onClick={handlePlay}
              disabled={launching || !selected}
              className="relative group disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 rounded-full bg-violet-500/30 blur-2xl scale-110 group-hover:scale-125 transition-transform duration-500" />
              <div className={`relative w-56 h-56 rounded-full bg-gradient-to-br from-violet-400 via-violet-500 to-purple-600 flex flex-col items-center justify-center play-glow group-active:scale-95 transition-transform ${launching ? 'scale-95' : 'group-hover:scale-105'}`}>
                {launching ? (
                  <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full spin-slow" />
                ) : (
                  <>
                    <Rocket size={36} className="text-white mb-1" />
                    <span className="text-4xl font-black tracking-tight text-white">JUGAR</span>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/70 mt-1">Iniciar</span>
                  </>
                )}
              </div>
            </button>

            <div className="text-center w-full flex flex-col items-center gap-3">
              <div className="text-xs text-zinc-500">Instancia que se va a arrancar</div>
              <InstanceSelector instances={instances} selectedId={selectedInstanceId} onSelect={onSelectInstance} />
            </div>

            {launching && selected && (
              <div className="text-sm text-violet-400 fade-in">
                Iniciando {selected.name} (Minecraft {selected.version} · {selected.loader})...
              </div>
            )}
            {!selected && (
              <div className="text-xs text-zinc-500 fade-in">
                Selecciona una instancia para poder jugar.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
