import { useState } from 'react';
import Sidebar from './components/Sidebar';
import HomeView from './components/HomeView';
import InstancesView from './components/InstancesView';
import InstanceEditView from './components/InstanceEditView';
import SettingsView from './components/SettingsView';
import { ICON_COLORS, type View, type Instance } from './types';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [extremeMode, setExtremeMode] = useState(false);
  const [instances, setInstances] = useState<Instance[]>([
    {
      id: 'seed-1',
      name: 'Fabric 1.20.4',
      version: '1.20.4',
      loader: 'Fabric',
      loaderVersion: 'build.0.16.5',
      iconColor: ICON_COLORS[2],
      createdAt: Date.now() - 86400000,
    },
    {
      id: 'seed-2',
      name: 'Aventura Modded',
      version: '1.19.2',
      loader: 'Forge',
      loaderVersion: 'build.43.3.0',
      iconColor: ICON_COLORS[3],
      createdAt: Date.now() - 172800000,
    },
    {
      id: 'seed-3',
      name: 'Vanilla Lightweight',
      version: '1.16.5',
      loader: 'Fabric',
      loaderVersion: 'build.0.14.21',
      iconColor: ICON_COLORS[4],
      createdAt: Date.now() - 259200000,
    },
  ]);
  const [selectedInstanceId, setSelectedInstanceId] = useState<string | null>('seed-1');
  const [activeInstanceId, setActiveInstanceId] = useState<string | null>(null);

  // settings
  const [ram, setRam] = useState(4);
  const [rom, setRom] = useState(8);
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [graphics, setGraphics] = useState<'fast' | 'fancy' | 'extreme'>('fancy');

  const addInstance = (i: Omit<Instance, 'id' | 'createdAt'>) => {
    const inst: Instance = { ...i, id: 'inst-' + Date.now(), createdAt: Date.now() };
    setInstances((prev) => [inst, ...prev]);
    setSelectedInstanceId(inst.id);
  };

  const deleteInstance = (id: string) => {
    setInstances((prev) => prev.filter((i) => i.id !== id));
    if (selectedInstanceId === id) {
      setSelectedInstanceId(null);
    }
    setActiveInstanceId(null);
    setView('instances');
  };

  const openInstance = (id: string) => {
    setActiveInstanceId(id);
    setView('instance');
  };

  const activeInstance = instances.find((i) => i.id === activeInstanceId) ?? null;

  const renderView = () => {
    if (view === 'instance' && activeInstance) {
      return <InstanceEditView instance={activeInstance} onBack={() => { setView('instances'); setActiveInstanceId(null); }} onDelete={deleteInstance} />;
    }
    switch (view) {
      case 'home':
        return (
          <HomeView
            instances={instances}
            selectedInstanceId={selectedInstanceId}
            onSelectInstance={setSelectedInstanceId}
            onPlay={() => {}}
            extremeMode={extremeMode}
            onToggleExtreme={() => setExtremeMode((e) => !e)}
          />
        );
      case 'instances':
        return <InstancesView instances={instances} onAddInstance={addInstance} onOpenInstance={openInstance} />;
      case 'settings':
        return (
          <SettingsView
            ram={ram}
            onRam={setRam}
            rom={rom}
            onRom={setRom}
            language={language}
            onLanguage={setLanguage}
            graphics={graphics}
            onGraphics={setGraphics}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#05070a] text-zinc-100">
      <Sidebar view={view} onNavigate={setView} />
      <main className="flex-1 h-full overflow-hidden">
        <div key={view} className="h-full fade-in">
          {renderView()}
        </div>
      </main>
    </div>
  );
}
