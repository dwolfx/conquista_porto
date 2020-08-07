import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { renderWithReduxAndTheme } from 'testUtils'

import Anbima from '.'

describe('Anbima', () => {
  describe('Test Anbima informations', () => {
    test('Should render inside anbima text - "indicadores"', () => {
      const textAnbima =
        'Você está conectado ao Conquista, a Plataforma Digital de Produtos Financeiros da Porto Seguro. A Portopar recebe remuneração de distribuição do(s) Administrador(es) e/ou do(s) Fundo(s) de Investimento em que seus clientes aplicam recursos, seja na forma de investimento direto, seja por meio de conta e ordem e que esta remuneração pode ser diferenciada em função dos diversos Fundos de Investimento investidos. Leia o Prospecto, o Formulário de Informações Complementares, Lâmina de Informações Essenciais e o Regulamento antes de investir.'
      const { getByText } = renderWithReduxAndTheme(
        <BrowserRouter>
          <Anbima />
        </BrowserRouter>
      )
      expect(getByText(textAnbima)).toBeDefined()
    })
    test('Should render inside anbima text - "central de atendimento"', () => {
      const textAnbima =
        '| Central de Atendimento: (11) 3366-3200/ Atendimento para deficientes auditivos 0800-727-8736. Ouvidoria: 0800-727-1184 | 3366-3184 /'
      const { getByText } = renderWithReduxAndTheme(
        <BrowserRouter>
          <Anbima />
        </BrowserRouter>
      )
      expect(getByText(textAnbima)).toBeDefined()
    })
    test('Should render inside anbima text - "fale conosco"', () => {
      const textAnbima =
        ', (Seg à Sexta das 8h15 às 18h30, exceto feriados). Fale Conosco:'
      const { getByText } = renderWithReduxAndTheme(
        <BrowserRouter>
          <Anbima />
        </BrowserRouter>
      )
      expect(getByText(textAnbima)).toBeDefined()
    })
  })
})
