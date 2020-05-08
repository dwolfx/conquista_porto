import { dict } from 'components/IconExporter'

interface ICategoryGoals {
  [key: number]: {
    icon: keyof typeof dict,
    text: string,
  }
}

export const categoryGoals:ICategoryGoals = {
  1: {
    icon: 'plane',
    text: 'Viagem',
  },
  2: {
    icon: 'time',
    text: 'Aposentadoria',
  },
  3: {
    icon: 'car2',
    text: 'Carro',
  },
  4: {
    icon: 'student',
    text: 'Curso',
  },
  5: {
    icon: 'drink',
    text: 'Evento',
  },
  6: {
    icon: 'homewithwindow',
    text: 'Casa',
  },
  7: {
    icon: 'money',
    text: 'Poupar',
  },
}
