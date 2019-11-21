import theme from '../../styles/theme'

const scrollTo = sectionId => {
  const el = document.getElementById(sectionId)
  el.scrollIntoView(true)
}

// const openModal = content => {
//   console.log('2')
// }

export const initialDashBoardSidebar = [
  {
    items: [
      {
        title: 'Perfil',
        icon: 'arrowdown',
        iconColor: theme.colors.lightPrimary,
      },
      {
        title: 'Dados pessoais',
        icon: 'arrowdown',
        iconColor: theme.colors.lightPrimary,
      },
      {
        title: 'Dados cadastrais',
        icon: 'arrowdown',
        iconColor: theme.colors.lightPrimary,
      },
      {
        title: 'Meu parceiro',
        icon: 'arrowdown',
        iconColor: theme.colors.lightPrimary,
      },
    ],
  },
]

export const completedDashboardSidebar = [
  {
    items: [
      {
        title: 'Conta de investimento',
        onItemClick: () => {
          scrollTo('investment')
        },
      },
      {
        title: 'Perfil',
        icon: 'arrowdown',
        iconColor: theme.colors.lightPrimary,
        onItemClick: () => {
          scrollTo('profile')
        },
      },
      {
        title: 'Dados pessoais',
        icon: 'arrowdown',
        iconColor: theme.colors.lightPrimary,
        onItemClick: () => {
          scrollTo('personal')
        },
      },
      {
        title: 'Dados cadastrais',
        icon: 'arrowdown',
        iconColor: theme.colors.lightPrimary,
        onItemClick: () => {
          scrollTo('registration')
        },
      },
      {
        title: 'Dados profissionais',
        icon: 'arrowdown',
        iconColor: theme.colors.lightPrimary,
        onItemClick: () => {
          scrollTo('professional')
        },
      },
      {
        title: 'Dados financeiros',
        icon: 'arrowdown',
        iconColor: theme.colors.lightPrimary,
        onItemClick: () => {
          scrollTo('financial')
        },
      },
      {
        title: 'Informe de rendimentos',
        icon: 'arrowdown',
        iconColor: theme.colors.lightPrimary,
        onItemClick: () => {
          scrollTo('income')
        },
      },
    ],
  },
  {
    items: [
      {
        title: 'Meu parceiro',
        color: 'primary',
        uppercase: true,
      },
      {
        title: 'Dados de acesso',
        color: 'primary',
        uppercase: true,
      },
    ],
  },
]
