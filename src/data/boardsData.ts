import { Board } from '../types/types';

// Статичный список категорий
const BOARD_CATEGORIES: Board[] = [
  { id: 'electrotovary', title: 'Электротовары' },
  { id: 'leshozsnab', title: 'Лесхозснаб' },
  { id: 'posudacity', title: 'Посуда-Сити' },
  { id: 'avtolizei', title: 'Автошкола “Автолицей”' },
];

// const boardsData: Board[] = [
//   { id: 'board-1', category: 'Электротовары' },
//   { id: 'board-2', category: 'Лесхозснаб' },
//   { id: 'board-3', category: 'Посуда-Сити' },
//   { id: 'board-4', category: 'Автошкола “Автолицей”' },
// ];

// const categories = Array.from(new Set(boards.map(board => board.category)));

export { BOARD_CATEGORIES };
// export { boards, categories };