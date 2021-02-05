import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { renderWithReduxAndTheme } from 'testUtils'

import Anbima from '.'

describe('Anbima', () => {
  describe('Test Anbima informations', () => {
    test('Should render inside anbima text - "indicadores"', () => {
      const textAnbima = `Você está conectado ao Conquista, a Plataforma Digital de Produtos Financeiros da Porto Seguro. A distribuição dos fundos de investimento poderá ser realizada pela Portopar DTVM Ltda. e/ou por agentes autônomos de investimentos (“AAIs”) contratados pela Portopar. Os AAIs são remunerados pela distribuição dos fundos ao equivalente a um percentual da taxa de distribuição devida à Portopar DTVM, incidente sobre o montante aplicado nos fundos. A Portopar DTVM está autorizada a realizar a subscrição das cotas do fundo por conta e ordem de seus respectivos clientes, na forma dos artigos 30 e seguintes da Instrução CVM nº 555/2014. Leia o Prospecto, o Formulário de Informações Complementares, Lâmina de Informações Essenciais e o Regulamento antes de investir.`
      const { getByText } = renderWithReduxAndTheme(
        <BrowserRouter>
          <Anbima />
        </BrowserRouter>
      )
      expect(getByText(textAnbima)).toBeDefined()
    })
    test('Should render inside anbima text - "central de atendimento"', () => {
      const textAnbima = `| Central de Atendimento Conquista para clientes: 3366-3200; para parceiros: 3366-3762. SAC: 0800-727-2763. Atendimento para deficientes auditivos: 0800-727-8736. Ouvidoria: 0800-727-1184 | 3366-3184`
      const { getByText } = renderWithReduxAndTheme(
        <BrowserRouter>
          <Anbima />
        </BrowserRouter>
      )
      expect(getByText(textAnbima)).toBeDefined()
    })
    test('Should render inside anbima text - "fale conosco"', () => {
      const textAnbima = `. Disponíveis de seg a sex, das 8h15 às 18h30, exceto feriados. Fale Conosco:`
      const { getByText } = renderWithReduxAndTheme(
        <BrowserRouter>
          <Anbima />
        </BrowserRouter>
      )
      expect(getByText(textAnbima)).toBeDefined()
    })
    test('Should render inside anbima text - "copyright"', () => {
      const textAnbima = `. © 2020 Porto Seguro Cia. de Seguros Gerais - Todos os direitos reservados. - CNPJ: 61.198.164/0001-60, Avenida Rio Branco, nº 1.489 e Rua Guaianases, nº 1.238, Campos Elíseos, São Paulo/SP, CEP 01204-001.`
      const { getByText } = renderWithReduxAndTheme(
        <BrowserRouter>
          <Anbima />
        </BrowserRouter>
      )
      expect(getByText(textAnbima)).toBeDefined()
    })
  })
})
