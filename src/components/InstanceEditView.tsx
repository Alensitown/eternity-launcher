import { useMemo, useState } from 'react';
import { ArrowLeft, Search, Download, Check, Info, Package, Image, Sun, Loader2, Trash2, AlertTriangle, X } from 'lucide-react';
import type { Instance, ModItem } from '../types';
import { MODS_CATALOG, TEXTURE_PACKS_CATALOG, SHADERS_CATALOG, formatDownloads } from '../data';

type Tab = 'mods' | 'textures' | 'shaders';

const TABS: { id: Tab; label: string; icon: typeof Package }[] = [
  { id: 'mods', label: 'Mods', icon: Package },
  { id: 'textures', label: 'Texture Packs', icon: Image },
  { id: 'shaders', label: 'Shaders', icon: Sun },
];

function CatalogCard({
  item, onInstall,
}: {
  item: ModItem;
  onInstall: (id: string) => void;
}) {
  const [pending, setPending] = useState(item.installed);
  const [installing, setInstalling] = useState(false);

  const handle = () => {
    if (pending || installing) return;
    setInstalling(true);
    setTimeout(() => {
      setInstalling(false);
      setPending(true);
      onInstall(item.id);
    }, 900);
  };

  return (
    <div className="group rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 p-4 transition-all duration-200">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-white/10 to-white/[0.03] flex items-center justify-center shrink-0 border border-white/5">
          <Package size={20} className="text-violet-400/70" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-white text-sm truncate">{item.name}</h3>
            <span className="text-[10px] text-zinc-600 font-mono shrink-0">/{item.slug}</span>
          </div>
          <div className="text-[11px] text-zinc-500 mb-2">por {item.author} · {formatDownloads(item.downloads)} descargas</div>
          <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">{item.description}</p>
        </div>
        <button
          onClick={handle}
          disabled={pending || installing}
          className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
            pending
              ? 'bg-violet-400/10 text-violet-400'
              : installing
                ? 'bg-white/5 text-zinc-400'
                : 'bg-violet-400/15 text-violet-400 hover:bg-violet-400 hover:text-black'
          }`}
        >
          {installing ? (
            <>
              <Loader2 size={13} className="spin-slow" />
              Instalando
            </>
          ) : pending ? (
            <>
              <Check size={13} />
              Instalado
            </>
          ) : (
            <>
              <Download size={13} />
              Instalar
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function InstanceEditView({
  instance, onBack, onDelete,
}: {
  instance: Instance;
  onBack: () => void;
  onDelete: (id: string) => void;
}) {
  const [tab, setTab] = useState<Tab>('mods');
  const [query, setQuery] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const baseCatalog = useMemo<ModItem[]>(() => {
    if (tab === 'mods') return MODS_CATALOG;
    if (tab === 'textures') return TEXTURE_PACKS_CATALOG;
    return SHADERS_CATALOG;
  }, [tab]);

  const [installed, setInstalled] = useState<Record<string, Set<string>>>({
    mods: new Set(['m1']),
    textures: new Set(),
    shaders: new Set(),
  });

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    const base = baseCatalog.map((m) => ({ ...m, installed: installed[tab].has(m.id) }));
    if (!q) return base;
    return base.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.slug.includes(q) ||
        m.author.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q),
    );
  }, [baseCatalog, query, installed, tab]);

  const handleInstall = (id: string) => {
    setInstalled((prev) => {
      const next = { ...prev, [tab]: new Set(prev[tab]) };
      next[tab].add(id);
      return next;
    });
  };

  const installedCount = installed[tab].size;
  const TabIcon = TABS.find((t) => t.id === tab)!.icon;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-10 pt-8 pb-5 border-b border-white/5">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft size={14} />
          Volver a Instancias
        </button>
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-black text-black shadow-lg"
            style={{ background: `linear-gradient(135deg, ${instance.iconColor}, ${instance.iconColor}dd)` }}
          >
            {instance.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white tracking-tight">{instance.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-zinc-400">Minecraft {instance.version}</span>
              <span className="text-zinc-600">·</span>
              <span className="text-xs font-medium text-violet-400">{instance.loader}</span>
              <span className="text-zinc-600">·</span>
              <span className="text-xs text-zinc-500">{installedCount} elementos instalados</span>
            </div>
          </div>
          <button
            onClick={() => setConfirmDelete(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-400 bg-red-500/10 hover:bg-red-500 hover:text-white border border-red-500/30 hover:border-red-500 transition-all duration-200"
          >
            <Trash2 size={16} />
            Borrar Instancia
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mt-6 -mb-px">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = t.id === tab;
            return (
              <button
                key={t.id}
                onClick={() => { setTab(t.id); setQuery(''); }}
                className={`relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors rounded-t-lg ${
                  active ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <Icon size={16} className={active ? 'text-violet-400' : ''} />
                {t.label}
                {installed[t.id].size > 0 && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${active ? 'bg-violet-400/15 text-violet-400' : 'bg-white/5 text-zinc-500'}`}>
                    {installed[t.id].size}
                  </span>
                )}
                {active && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-10 py-6">
        {/* Search + note */}
        <div className="flex items-center gap-3 mb-5">
          <div className="relative flex-1 max-w-md">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Buscar ${tab === 'mods' ? 'mods' : tab === 'textures' ? 'texture packs' : 'shaders'} en Modrinth...`}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-400/40 focus:bg-white/[0.07] transition-colors"
            />
          </div>
          <div className="text-[11px] text-zinc-500 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            API de Modrinth conectada
          </div>
        </div>

        {/* Mod Menu note for Fabric */}
        {instance.loader === 'Fabric' && tab === 'mods' && (
          <div className="flex items-center gap-2.5 mb-5 px-4 py-3 rounded-xl bg-violet-400/[0.07] border border-violet-400/20 fade-in">
            <Info size={16} className="text-violet-400 shrink-0" />
            <div className="text-xs">
              <span className="text-violet-400 font-semibold">Mod Menu</span>{' '}
              <span className="text-zinc-400">viene preinstalado por defecto en Fabric. Puedes gestionar tus mods desde el menú dentro del juego.</span>
            </div>
          </div>
        )}

        {results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Search size={32} className="text-zinc-700 mb-3" />
            <p className="text-sm text-zinc-500">No se encontraron resultados para "{query}"</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-[11px] uppercase tracking-wider text-zinc-600 font-medium flex items-center gap-2">
              <TabIcon size={12} />
              {results.length} resultado{results.length !== 1 ? 's' : ''}
            </div>
            {results.map((m) => (
              <CatalogCard key={m.id} item={m} onInstall={handleInstall} />
            ))}
          </div>
        )}
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 fade-in" onClick={() => setConfirmDelete(false)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-md glass rounded-2xl border border-red-500/20 shadow-2xl animate-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <AlertTriangle size={18} className="text-red-400" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Borrar Instancia</h2>
                  <p className="text-xs text-zinc-500">Esta acción no se puede deshacer</p>
                </div>
              </div>
              <button onClick={() => setConfirmDelete(false)} className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-zinc-300">
                ¿Seguro que quieres borrar <span className="font-semibold text-white">{instance.name}</span>?
              </p>
              <p className="text-xs text-zinc-500 mt-2">
                Se eliminarán todos los mods, texture packs y shaders instalados en esta instancia.
              </p>
            </div>
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-white/5">
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => onDelete(instance.id)}
                className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors"
              >
                <Trash2 size={15} />
                Borrar Definitivamente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
