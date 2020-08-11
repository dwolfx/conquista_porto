import reducer from './reducer'
import { Types } from './types'

describe('Rewards - Recommentations reducer', () => {
  it('should return INITIAL_STATE', () => {
    expect(reducer(undefined, {})).toEqual({
      data: [],
      isLoading: false,
      hasError: false,
    })
  })
  it('should handle GET_RECOMMENDATIONS_REQUEST', () => {
    expect(
      reducer(
        {
          data: [],
          isLoading: false,
          hasError: false,
        },
        { type: Types.GET_RECOMMENDATIONS_REQUEST }
      )
    ).toEqual({
      data: [],
      isLoading: true,
      hasError: false,
    })
  })
  it('should handle GET_RECOMMENDATIONS_SUCCESS', () => {
    expect(
      reducer(
        {
          data: [],
          isLoading: false,
          hasError: false,
        },
        {
          type: Types.GET_RECOMMENDATIONS_SUCCESS,
          payload: [
            {
              icon_name:
                'https://res.cloudinary.com/sciensa/image/upload/v1590081874/conquista/10_seguro_de_vida.jpg',
              subject_name: 'Previdência Privada',
              button_name: 'PREVIDÊNCIA PRIVADA',
              url_name: '/portaldecliente/conquista/previdencia/home',
              text_content:
                'Quais são os seus planos para o futuro? Com o Conquista, você planeja sua proteção e da sua família. Conheça os planos de Previdência Privada, simule quantas vezes quiser e contrate tranquilidade para o amanhã.',
            },
            {
              icon_name:
                'https://res.cloudinary.com/sciensa/image/upload/v1590081874/conquista/8_fundos.jpg',
              subject_name: 'Foco em rentabilidade',
              button_name: 'INVESTIR',
              url_name:
                '/portaldecliente/conquista/investimentos/info-fundos-investimento',
              text_content:
                'Você ainda não investe com o Conquista? Com fundos da Porto Seguro e de gestoras parceiras, a plataforma reúne opções para todos os perfis e oferece comodidade para quem busca diversificar rendimentos.',
            },
          ],
        }
      )
    ).toEqual({
      data: [
        {
          icon_name:
            'https://res.cloudinary.com/sciensa/image/upload/v1590081874/conquista/10_seguro_de_vida.jpg',
          subject_name: 'Previdência Privada',
          button_name: 'PREVIDÊNCIA PRIVADA',
          url_name: '/portaldecliente/conquista/previdencia/home',
          text_content:
            'Quais são os seus planos para o futuro? Com o Conquista, você planeja sua proteção e da sua família. Conheça os planos de Previdência Privada, simule quantas vezes quiser e contrate tranquilidade para o amanhã.',
        },
        {
          icon_name:
            'https://res.cloudinary.com/sciensa/image/upload/v1590081874/conquista/8_fundos.jpg',
          subject_name: 'Foco em rentabilidade',
          button_name: 'INVESTIR',
          url_name:
            '/portaldecliente/conquista/investimentos/info-fundos-investimento',
          text_content:
            'Você ainda não investe com o Conquista? Com fundos da Porto Seguro e de gestoras parceiras, a plataforma reúne opções para todos os perfis e oferece comodidade para quem busca diversificar rendimentos.',
        },
      ],
      isLoading: false,
      hasError: false,
    })
  })
  it('should handle GET_RECOMMENDATIONS_FAILURE', () => {
    expect(
      reducer(
        {
          data: [],
          hasError: false,
          isLoading: false,
        },
        {
          type: Types.GET_RECOMMENDATIONS_FAILURE,
        }
      )
    ).toEqual({
      data: [],
      isLoading: false,
      hasError: true,
    })
  })
})
