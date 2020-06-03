import {
  CAR,
  COURSE,
  EVENT,
  HOME,
  RETIREMENT,
  SAVE_MONEY,
  TRIP,
} from 'pages/Objectives/GoalStreams/types'

export default [
  {
    id: 1,
    icon: 'plane',
    title: 'Viagem',
    link: '/objetivos/viagem',
    goalType: TRIP,
  },
  {
    id: 2,
    icon: 'time',
    title: 'Aposentar',
    link: '/objetivos/aposentar',
    goalType: RETIREMENT,
  },
  {
    id: 3,
    icon: 'homewithwindow',
    title: 'Casa',
    link: '/objetivos/casa',
    goalType: HOME,
  },
  {
    id: 4,
    icon: 'car2',
    title: 'Carro',
    link: '/objetivos/carro',
    goalType: CAR,
  },
  {
    id: 5,
    icon: 'drink',
    title: 'Evento',
    link: '/objetivos/evento',
    goalType: EVENT,
  },
  {
    id: 6,
    icon: 'student',
    title: 'Curso',
    link: '/objetivos/curso',
    goalType: COURSE,
  },
  {
    id: 7,
    icon: 'money',
    title: 'Poupar',
    link: '/objetivos/poupar',
    goalType: SAVE_MONEY,
  },
  // {
  //   icon: 'financial',
  //   title: 'Multiplicar dinheiro',
  //   link: '/',
  // },
]
