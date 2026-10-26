import type { ModItem } from './types';

export const MODS_CATALOG: ModItem[] = [
  { id: 'm1', name: 'Sodium', slug: 'sodium', author: 'CaffeineMC', downloads: 48200000, description: 'Motor de renderizado moderno. Reduce el uso de CPU y mejora los FPS drásticamente.', category: 'mod', installed: false },
  { id: 'm2', name: 'Lithium', slug: 'lithium', author: 'CaffeineMC', downloads: 32100000, description: 'Optimiza el tick del juego (IA, físicas, spawns) sin afectar la jugabilidad.', category: 'mod', installed: false },
  { id: 'm3', name: 'FerriteCore', slug: 'ferritecore', author: 'malte0811', downloads: 18700000, description: 'Reduce drásticamente el consumo de RAM almacenando datos de forma compacta.', category: 'mod', installed: false },
  { id: 'm4', name: 'Indium', slug: 'indium', author: 'comp500', downloads: 9200000, description: 'Compatibilidad de Sodium con el API de renderizado de Fabric.', category: 'mod', installed: false },
  { id: 'm5', name: 'ImmediatelyFast', slug: 'immediatelyfast', author: 'RaphiMC', downloads: 6400000, description: 'Acelera el renderizado inmediato de la GUI y los textos.', category: 'mod', installed: false },
  { id: 'm6', name: 'ModernFix', slug: 'modernfix', author: 'embeddedt', downloads: 12100000, description: 'Corrige fallos de rendimiento y reduce el tiempo de carga del juego.', category: 'mod', installed: false },
  { id: 'm7', name: 'Dynamic FPS', slug: 'dynamic-fps', author: 'juliand665', downloads: 5800000, description: 'Reduce los FPS cuando el juego está en segundo plano para ahorrar recursos.', category: 'mod', installed: false },
  { id: 'm8', name: 'Entity Culling', slug: 'entityculling', author: 'tr7zw', downloads: 8900000, description: 'Evita renderizar entidades que el jugador no puede ver.', category: 'mod', installed: false },
];

export const TEXTURE_PACKS_CATALOG: ModItem[] = [
  { id: 't1', name: 'Faithful 32x', slug: 'faithful-32x', author: 'Vattic', downloads: 21500000, description: 'Texturas clásicas en mayor resolución, fieles al estilo vanilla.', category: 'texture', installed: false },
  { id: 't2', name: 'Bare Bones', slug: 'bare-bones', author: 'Pie_Guy_Pan', downloads: 4300000, description: 'Estilo minimalista y colorido con paleta plana.', category: 'texture', installed: false },
  { id: 't3', name: 'Programmer Art++', slug: 'programmer-art-plus', author: 'sheeppa', downloads: 2100000, description: 'Versión mejorada del antiguo estilo de texturas de Minecraft.', category: 'texture', installed: false },
  { id: 't4', name: 'Tiny Block', slug: 'tiny-block', author: 'oily_olive', downloads: 1900000, description: 'Texturas en baja resolución (8x) ideales para PCs muy modestos.', category: 'texture', installed: false },
  { id: 't5', name: 'Quadral', slug: 'quadral', author: 'm1thr4nd41r', downloads: 1100000, description: 'Paleta moderna y suave en 32x.', category: 'texture', installed: false },
];

export const SHADERS_CATALOG: ModItem[] = [
  { id: 's1', name: 'Complementary Shaders', slug: 'complementary-shaders', author: 'EminGT', downloads: 19800000, description: 'Shaders equilibrados con iluminación suave y soporte para bajos recursos.', category: 'shader', installed: false },
  { id: 's2', name: 'BSL Shaders', slug: 'bsl-shaders', author: 'capttatsu', downloads: 16200000, description: 'Shaders clásicos y personalizables con buen rendimiento.', category: 'shader', installed: false },
  { id: 's3', name: 'MakeUp - Ultra Fast', slug: 'makeup-ultra-fast', author: 'XonDeL', downloads: 3400000, description: 'Diseñados específicamente para maximizar FPS en hardware modesto.', category: 'shader', installed: false },
  { id: 's4', name: 'Astralex', slug: 'astralex', author: 'AureliusSol', downloads: 2100000, description: 'Estilo cinematográfico con opciones de rendimiento.', category: 'shader', installed: false },
  { id: 's5', name: 'Phosphor', slug: 'phosphor', author: 'EminGT', downloads: 4300000, description: 'Optimiza la iluminación del juego sin cambiar la estética vanilla.', category: 'shader', installed: false },
];

export function formatDownloads(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace('.0', '') + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace('.0', '') + 'K';
  return String(n);
}
