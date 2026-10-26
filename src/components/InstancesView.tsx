import { useState } from 'react';
import { Plus, X, Boxes, Sparkles, Check } from 'lucide-react';
import { MINECRAFT_VERSIONS, LOADERS, ICON_COLORS, type Loader, type Instance } from '../types';

function AddInstanceModal({
  onClose, onCreate,
}: {
  onClose: () => void;
  onCreate: (i: Omit<Instance, 'id' | 'createdAt'>) => void;
}) {
  const [version, setVersion] = useState(MINECRAFT_VERSIONS[0]);
  const [loader, setLoader] = useState<Loader>('Fabric');
  const [name, setName] = useState('');
  const [color, setColor] = useState(ICON_COLORS[0]);
  const [creating, setCreating] = useState(false);

  const handleCreate = () => {
    setCreating(true);
    const finalName = name.trim() || `${loader} ${version}`;
    setTimeout(() => {
      onCreate({
        name: finalName,
        version,
        loader,
        loaderVersion: 'build.0.16.' + Math.floor(Math.random() * 99),
        iconColor: color,
      });
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg glass rounded-2xl border border-white/10 shadow-2xl animate-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-violet-400/10 flex items-center justify-center">
              <Plus size={18} className="text-violet-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Añadir Instancia</h2>
              <p className="text-xs text-zinc-500">Crea una nueva instalación de Minecraft</p>
            </div>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          <div>
            <label className="text-xs font-medium text-zinc-400 mb-2 block">Nombre (opcional)</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={`Ej: ${loader} ${version}`}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-400/50 focus:bg-white/[0.07] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-400 mb-2 block">Versión de Minecraft</label>
            <div className="flex flex-wrap gap-2">
              {MINECRAFT_VERSIONS.map((v) => (
                <button
                  key={v}
                  onClick={() => setVersion(v)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    v === version
                      ? 'bg-violet-400/15 text-violet-400 border border-violet-400/40'
                      : 'bg-white/5 text-zinc-400 border border-white/5 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-400 mb-2 block">Mod Loader</label>
            <div className="grid grid-cols-3 gap-2">
              {LOADERS.map((l) => (
                <button
                  key={l.name}
                  onClick={() => setLoader(l.name)}
                  className={`relative p-3 rounded-xl border text-left transition-all ${
                    l.name === loader
                      ? 'bg-white/[0.07] border-violet-400/40'
                      : 'bg-white/5 border-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-sm" style={{ background: l.color }} />
                    <span className={`text-sm font-semibold ${l.name === loader ? 'text-white' : 'text-zinc-300'}`}>{l.name}</span>
                    {l.name === loader && <Check size={14} className="text-violet-400 ml-auto" />}
                  </div>
                  <div className="text-[10px] text-zinc-500 leading-snug">{l.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-400 mb-2 block">Color de icono</label>
            <div className="flex gap-2">
              {ICON_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-lg transition-transform ${c === color ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0d1117] scale-110' : 'hover:scale-105'}`}
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-white/5">
          <div className="flex items-center gap-2 text-[11px] text-zinc-500">
            <Sparkles size={12} className="text-violet-400/70" />
            Fabric incluye Mod Menu preinstalado
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleCreate}
              disabled={creating}
              className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-violet-500 to-purple-600 hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-60"
            >
              {creating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full spin-slow" />
                  Instalando...
                </>
              ) : (
                <>
                  <Plus size={15} />
                  Crear Instancia
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InstanceCard({
  instance, onClick,
}: {
  instance: Instance; onClick: () => void;
}) {
  const initial = instance.name.charAt(0).toUpperCase();
  return (
    <button
      onClick={onClick}
      className="group relative rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-violet-400/30 p-5 text-left transition-all duration-200 animate-in"
    >
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-black text-black shadow-lg shrink-0 group-hover:scale-105 transition-transform"
          style={{ background: `linear-gradient(135deg, ${instance.iconColor}, ${instance.iconColor}dd)` }}
        >
          {initial}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-white truncate group-hover:text-violet-400 transition-colors">{instance.name}</div>
          <div className="text-xs text-zinc-500 mt-0.5">Minecraft {instance.version}</div>
          <div className="mt-2 flex items-center gap-2">
            <span
              className="text-[10px] font-medium px-2 py-0.5 rounded-md"
              style={{ background: `${LOADERS.find((l) => l.name === instance.loader)?.color}22`, color: LOADERS.find((l) => l.name === instance.loader)?.color }}
            >
              {instance.loader}
            </span>
            <span className="text-[10px] text-zinc-600">·</span>
            <span className="text-[10px] text-zinc-500">{instance.loaderVersion}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function InstancesView({
  instances, onAddInstance, onOpenInstance,
}: {
  instances: Instance[];
  onAddInstance: (i: Omit<Instance, 'id' | 'createdAt'>) => void;
  onOpenInstance: (id: string) => void;
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      <div className="px-10 pt-10 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-[11px] uppercase tracking-[0.25em] text-violet-400/80 font-medium mb-2">Gestor</div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Instancias</h1>
            <p className="text-sm text-zinc-400 mt-1">{instances.length} instalación{instances.length !== 1 ? 'es' : ''} disponible{instances.length !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-500 to-purple-600 hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20"
          >
            <Plus size={17} />
            Añadir Instancia
          </button>
        </div>

        {instances.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-5">
              <Boxes size={36} className="text-zinc-600" />
            </div>
            <h2 className="text-lg font-semibold text-white mb-1">No hay instancias todavía</h2>
            <p className="text-sm text-zinc-500 mb-5">Crea tu primera instalación de Minecraft para empezar.</p>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-500 to-purple-600 hover:opacity-90 transition-opacity"
            >
              <Plus size={17} />
              Crear Instancia
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {instances.map((inst) => (
              <InstanceCard key={inst.id} instance={inst} onClick={() => onOpenInstance(inst.id)} />
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <AddInstanceModal
          onClose={() => setShowModal(false)}
          onCreate={(i) => { onAddInstance(i); setShowModal(false); }}
        />
      )}
    </div>
  );
}
