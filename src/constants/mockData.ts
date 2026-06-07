import type { ReadingPlan, Study } from '../types/firestore';

export const featuredStudies: Study[] = [
  {
    id: 'identity-in-christ',
    title: 'Identidade em Cristo',
    category: 'Temático',
    description: 'Um estudo guiado sobre nova vida, graça e propósito.',
    references: ['João 1:12', 'Romanos 8:1', 'Efésios 2:10'],
    estimatedMinutes: 18,
  },
  {
    id: 'david-courage',
    title: 'Davi: coragem e arrependimento',
    category: 'Personagem',
    description: 'A jornada de fé de Davi, com vitórias, quedas e restauração.',
    references: ['1 Samuel 17', 'Salmos 51', 'Atos 13:22'],
    estimatedMinutes: 24,
  },
  {
    id: 'john-book',
    title: 'Evangelho de João',
    category: 'Livro',
    description: 'Jesus como Palavra, vida, luz e Filho enviado pelo Pai.',
    references: ['João 1', 'João 3', 'João 15'],
    estimatedMinutes: 32,
  },
];

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
