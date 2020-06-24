import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { renderWithReduxAndTheme } from 'testUtils'
import '@testing-library/jest-dom'
import 'jest-styled-components'

import Anbima from '.'

describe('Anbima', () => {
  describe('Test Anbima informations', () => {
    test('Should render inside anbima text - "indicadores"', () => {
      const textAnbima =
        'Indicadores: trata-se de mera referência econômica, e não meta ou parâmetro de performance. Leia a lâmina de informações essenciais, se houver, e o regulamento antes de investir. Rentabilidade passada não representa garantia de rentabilidade futura. A rentabilidade divulgada não é líquida de impostos. Fundos de Investimento não contam com a garantia do administrador, do gestor, de qualquer mecanismo de seguro ou Fundo Garantidor de Crédito – FGC. Descrição do tipo ANBIMA disponível no Formulário de Informações Complementares. Para avaliação de performance de um fundo de investimento, é recomendável a análise de, no mínimo, 12 (doze) meses.'
      const { getByText } = renderWithReduxAndTheme(
        <BrowserRouter>
          <Anbima />
        </BrowserRouter>
      )
      expect(getByText(textAnbima)).toBeDefined()
    })
    test('Should render inside anbima text - "informacoes legais"', () => {
      const textAnbima =
        'as informações legais referentes a cada investimento e as informações adicionais de fundos de investimento como data de início, patrimônio líquido, taxas aplicáveis e público alvo. SUPERVISÃO E FISCALIZAÇÃO: Comissão de Valores Mobiliários – CVM Serviço de Atendimento ao Cidadão em'
      const { getByText } = renderWithReduxAndTheme(
        <BrowserRouter>
          <Anbima />
        </BrowserRouter>
      )
      expect(getByText(textAnbima)).toBeDefined()
    })
    test('Should render inside anbima text - "central de atendimento"', () => {
      const textAnbima =
        '| Central de Atendimento: (11) 3366-3200/SAC 0800-727-2763/0800-727-8736 Atendimento para deficientes auditivos. Ouvidoria: 0800-727-1184 | 3366-3184'
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
