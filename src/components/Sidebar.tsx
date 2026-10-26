import { Home, LayoutGrid, Settings, Boxes } from 'lucide-react';
import type { View } from '../types';

const items: { id: View; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Inicio', icon: Home },
  { id: 'instances', label: 'Instancias', icon: LayoutGrid },
  { id: 'settings', label: 'Ajustes', icon: Settings },
];

export default function Sidebar({
  view,
  onNavigate,
}: {
  view: View;
  onNavigate: (v: View) => void;
}) {
  return (
    <aside className="w-60 shrink-0 h-full glass border-r border-white/5 flex flex-col">
      <div className="px-6 pt-6 pb-8 flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Boxes size={22} className="text-white" strokeWidth={2.5} />
          </div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-violet-400 ring-2 ring-[#05070a] animate-pulse" />
        </div>
        <div className="leading-tight">
          <div className="font-bold text-[15px] tracking-tight text-white">Eternity</div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-violet-400/80">Launcher</div>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {items.map((it) => {
          const active = view === it.id || (view === 'instance' && it.id === 'instances');
          const Icon = it.icon;
          return (
            <button
              key={it.id}
              onClick={() => onNavigate(it.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative group ${
                active
                  ? 'text-white bg-violet-400/10'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-gradient-to-b from-violet-400 to-purple-500" />
              )}
              <Icon size={18} className={active ? 'text-violet-400' : ''} />
              {it.label}
            </button>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center text-xs font-bold text-violet-400 ring-1 ring-white/10">
            ET
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-white truncate">Eternity User</div>
            <div className="text-[10px] text-zinc-500 truncate">Cuenta premium</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
