import { useState } from 'react';
import { Globe, Monitor, MemoryStick, HardDrive, Check, Lock, Info } from 'lucide-react';

function Slider({
  label, value, min, max, step, unit, onChange, color, description,
}: {
  label: string; value: number; min: number; max: number; step: number;
  unit: string; onChange: (v: number) => void; color: string; description: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <MemoryStick size={15} style={{ color }} />
          <span className="text-sm font-semibold text-white">{label}</span>
        </div>
        <span className="text-lg font-bold font-mono" style={{ color }}>
          {value}<span className="text-xs text-zinc-500 ml-1">{unit}</span>
        </span>
      </div>
      <p className="text-[11px] text-zinc-500 mb-4">{description}</p>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer outline-none"
        style={{
          background: `linear-gradient(to right, ${color} 0%, ${color} ${pct}%, rgba(255,255,255,0.08) ${pct}%, rgba(255,255,255,0.08) 100%)`,
        }}
      />
      <div className="flex justify-between mt-1.5 text-[10px] text-zinc-600 font-mono">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}

function Segmented<T extends string>({
  options, value, onChange, disabled,
}: {
  options: { id: T; label: string }[];
  value: T; onChange: (v: T) => void;
  disabled?: boolean;
}) {
  return (
    <div className={`inline-flex p-1 rounded-xl bg-white/5 border border-white/5 ${disabled ? 'opacity-70' : ''}`}>
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => !disabled && onChange(o.id)}
          disabled={disabled}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
            value === o.id ? 'bg-violet-400/15 text-violet-400' : 'text-zinc-400 hover:text-white'
          } ${disabled && value === o.id ? 'cursor-default' : ''}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default function SettingsView({
  ram, onRam, rom, onRom, language, onLanguage, graphics, onGraphics,
}: {
  ram: number; onRam: (v: number) => void;
  rom: number; onRom: (v: number) => void;
  language: 'es' | 'en'; onLanguage: (l: 'es' | 'en') => void;
  graphics: 'fast' | 'fancy' | 'extreme'; onGraphics: (g: 'fast' | 'fancy' | 'extreme') => void;
}) {
  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      <div className="px-10 pt-10 pb-16 max-w-3xl">
        <div className="mb-8">
          <div className="text-[11px] uppercase tracking-[0.25em] text-violet-400/80 font-medium mb-2">Configuración</div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Ajustes Rápidos</h1>
          <p className="text-sm text-zinc-400 mt-1">Optimiza el rendimiento para tu equipo.</p>
        </div>

        {/* Memory section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <MemoryStick size={16} className="text-violet-400" />
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Memoria</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Slider
              label="RAM Física"
              value={ram}
              min={1}
              max={16}
              step={0.5}
              unit="GB"
              onChange={onRam}
              color="#a855f7"
              description="Cantidad de memoria RAM asignada a Minecraft."
            />
            <Slider
              label="ROM (Memoria Virtual)"
              value={rom}
              min={2}
              max={64}
              step={2}
              unit="GB"
              onChange={onRom}
              color="#7c3aed"
              description="Espacio en disco usado como memoria de rescate (swap) cuando la RAM se agota."
            />
          </div>
          <div className="mt-3 flex items-start gap-2 px-4 py-2.5 rounded-lg bg-amber-400/[0.06] border border-amber-400/15">
            <HardDrive size={14} className="text-amber-400 mt-0.5 shrink-0" />
            <p className="text-[11px] text-zinc-400">
              La memoria virtual (swap) evita cierres inesperados en PCs con poca RAM. Se recomienda asignar entre 4 y 8 GB.
            </p>
          </div>
        </div>

        {/* Preferences */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Globe size={16} className="text-violet-400" />
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Preferencias</h2>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.02] divide-y divide-white/5">
            <Row label="Idioma" hint="Idioma de la interfaz del launcher">
              <Segmented
                options={[{ id: 'es', label: 'Español' }, { id: 'en', label: 'English' }]}
                value={language}
                onChange={onLanguage}
              />
            </Row>
            <Row label="Gráficos" hint="Calidad visual del juego (fija en Detallado)">
              <div className="flex items-center gap-2">
                <Segmented
                  options={[
                    { id: 'fast', label: 'Rápido' },
                    { id: 'fancy', label: 'Detallado' },
                    { id: 'extreme', label: 'Extremo' },
                  ]}
                  value={graphics}
                  onChange={onGraphics}
                  disabled
                />
                <Lock size={13} className="text-zinc-600" />
              </div>
            </Row>
            <div className="px-5 pb-4 -mt-1">
              <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-violet-400/[0.05] border border-violet-400/15">
                <Info size={13} className="text-violet-400 mt-0.5 shrink-0" />
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  La calidad gráfica se mantiene fija en <span className="text-violet-400 font-semibold">Detallado</span>. La optimización
                  se realiza por código y gestión dinámica de chunks, sin sacrificar la belleza gráfica de Minecraft.
                </p>
              </div>
            </div>
            <Row label="Resolución" hint="Tamaño de la ventana del juego">
              <Segmented
                options={[
                  { id: '1280', label: '1280×720' },
                  { id: '1600', label: '1600×900' },
                  { id: '1920', label: '1920×1080' },
                ]}
                value="1600"
                onChange={() => {}}
              />
            </Row>
            <Row label="Mantener abierta" hint="No cerrar el launcher al iniciar el juego">
              <Toggle defaultOn />
            </Row>
            <Row label="Tema del launcher" hint="Apariencia de la interfaz">
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <span className="w-4 h-4 rounded-md bg-[#05070a] border border-violet-400/40 flex items-center justify-center">
                  <Check size={10} className="text-violet-400" />
                </span>
                Oscuro (predeterminado)
              </div>
            </Row>
          </div>
        </div>

        {/* System info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Monitor size={16} className="text-zinc-400" />
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Información del Sistema</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Sistema', value: 'Windows 10' },
              { label: 'CPU', value: 'Dual-Core 2.4GHz' },
              { label: 'RAM total', value: '8 GB' },
              { label: 'VRAM', value: '128 MB' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                <div className="text-[10px] uppercase tracking-wider text-zinc-600">{s.label}</div>
                <div className="text-sm font-semibold text-white mt-1">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, hint, children }: { label: string; hint: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
      <div>
        <div className="text-sm font-medium text-white">{label}</div>
        <div className="text-[11px] text-zinc-500 mt-0.5">{hint}</div>
      </div>
      {children}
    </div>
  );
}

function Toggle({ defaultOn }: { defaultOn?: boolean }) {
  return <ToggleInner defaultOn={defaultOn} />;
}

function ToggleInner({ defaultOn }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <button
      onClick={() => setOn((o) => !o)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
        on ? 'bg-gradient-to-r from-violet-500 to-purple-600' : 'bg-zinc-700'
      }`}
      aria-pressed={on}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
          on ? 'translate-x-5' : ''
        }`}
      />
    </button>
  );
}
