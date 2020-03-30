export const TRIP = '1'
export const RETIREMENT = '2'
export const CAR = '3'
export const COURSE = '4'
export const EVENT = '5'
export const HOME = '6'
export const SAVE_MONEY = '7'

export const categoryGoals = type => {
    const Goals = {
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
    return Goals[type]
}
