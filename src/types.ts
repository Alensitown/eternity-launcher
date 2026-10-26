export type View = 'home' | 'instances' | 'instance' | 'settings';

export type Loader = 'Fabric' | 'Forge' | 'NeoForge';

export interface Instance {
  id: string;
  name: string;
  version: string;
  loader: Loader;
  loaderVersion: string;
  iconColor: string;
  createdAt: number;
}

export interface ModItem {
  id: string;
  name: string;
  slug: string;
  author: string;
  downloads: number;
  description: string;
  category: 'mod' | 'texture' | 'shader';
  installed: boolean;
}

export const MINECRAFT_VERSIONS = [
  '1.21.1', '1.20.6', '1.20.4', '1.19.2', '1.18.2', '1.16.5', '1.12.2', '1.8.9',
];

export const LOADERS: { name: Loader; description: string; color: string }[] = [
  { name: 'Fabric', description: 'Ligero y modular. Recomendado para bajo rendimiento.', color: '#d6b24b' },
  { name: 'Forge', description: 'Clásico y compatible con la mayoría de mods.', color: '#e07b3f' },
  { name: 'NeoForge', description: 'Fork moderno de Forge, más rápido.', color: '#3fb8e0' },
];

export const ICON_COLORS = ['#a855f7', '#7c3aed', '#8b5cf6', '#06b6d4', '#f59e0b', '#ec4899'];
