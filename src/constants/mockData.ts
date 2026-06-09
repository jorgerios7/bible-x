import type { ReadingPlan } from '../types/firestore';

export const readingPlans: ReadingPlan[] = [
  {
    id: 'gospel-7',
    title: 'Evangelhos em 7 dias',
    description: 'Leitura devocional para caminhar pelos principais encontros de Jesus.',
    days: 7,
    progress: 42,
    passages: ['Mateus 5', 'Marcos 4', 'Lucas 15', 'João 3'],
  },
  {
    id: 'wisdom-14',
    title: 'Sabedoria para decisões',
    description: 'Provérbios, Salmos e Tiago para discernimento prático.',
    days: 14,
    progress: 18,
    passages: ['Provérbios 3', 'Salmos 1', 'Tiago 1'],
  },
];
