import { call, put } from 'redux-saga/effects'
import { get } from 'services/api'

import { getData } from './sagas'
import {
  GetRewardRecommendationsSuccess,
  GetRewardRecommendationsFailure,
} from './action'

describe('get Rewards - recommendations', () => {
  it('success triggers success action', () => {
    const generator = getData()
    const response = {
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
    }

    expect(generator.next().value).toEqual(
      call(get, '/recommendations/products')
    )

    expect(generator.next(response).value).toEqual(
      put(GetRewardRecommendationsSuccess(response.data))
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })

  it('failure triggers failure action', () => {
    const generator = getData()
    const response = undefined
    expect(generator.next().value).toEqual(
      call(get, '/recommendations/products')
    )
    expect(generator.next(response).value).toEqual(
      put(GetRewardRecommendationsFailure())
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
