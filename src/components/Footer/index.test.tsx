import React from 'react'
import { renderWithReduxAndTheme } from 'testUtils'
import { storeFactory } from 'setupTests'
import 'pages/Investments/Management/Tablet/node_modules/@testing-library/jest-dom'
import 'jest-styled-components'
import { BrowserRouter } from 'react-router-dom'

import LinkTextFooter from '.'

const store = storeFactory({
  customerProfile: {
    data: {
      cpfCnpj: '36275312807',
      customerName: 'Rubao Teste',
      customerEmail: 'ricardo.eufrasio@portoseguro.com.br',
      customerState: 'SP',
      customerBirthdate: '1981-11-11T00:00:00-03:00',
    },
    status: 'loaded',
    hasError: false,
    isLoading: false,
  },
})

describe('LinkText Footer', () => {
  describe('Footer should have content:', () => {
    it('Should render on footer "MENSAGENS" content', () => {
      const { getByText } = renderWithReduxAndTheme(
        <BrowserRouter>
          <LinkTextFooter />
        </BrowserRouter>
      )
      expect(getByText('MENSAGENS')).toBeDefined()
      expect(getByText('suporte.conquista@portoseguro.com.br')).toBeDefined()
    })
    it('Should render on footer "CHAT ONLINE" content', () => {
      const { getByText } = renderWithReduxAndTheme(
        <BrowserRouter>
          <LinkTextFooter />
        </BrowserRouter>,
        { store }
      )
      expect(getByText('CHAT ONLINE')).toBeDefined()
      expect(getByText('Converse agora com um atendente')).toBeDefined()
    })
    it('Should render on footer "SAC" content', () => {
      const { getByText } = renderWithReduxAndTheme(
        <BrowserRouter>
          <LinkTextFooter />
        </BrowserRouter>
      )
      expect(getByText('SAC')).toBeDefined()
      expect(getByText('0800 727 2763')).toBeDefined()
    })
    it('Should render on footer "CENTRAL DE ATENDIMENTO" content', () => {
      const { getByText } = renderWithReduxAndTheme(
        <BrowserRouter>
          <LinkTextFooter />
        </BrowserRouter>
      )
      expect(getByText('CENTRAL DE ATENDIMENTO')).toBeDefined()
      expect(
        getByText(
          'Para assuntos relacionados a plataforma Conquista ligue: (11) 3366 3200'
        )
      ).toBeDefined()
    })
    it('Should render on footer "ATENDIMENTO PARA DEFICIENTES AUDITIVOS" content', () => {
      const { getByText } = renderWithReduxAndTheme(
        <BrowserRouter>
          <LinkTextFooter />
        </BrowserRouter>
      )
      expect(getByText('ATENDIMENTO PARA DEFICIENTES AUDITIVOS')).toBeDefined()
      expect(getByText('0800 727 8736')).toBeDefined()
    })
    it('Should render on footer "OUVIDORIA" content', () => {
      const { getByText } = renderWithReduxAndTheme(
        <BrowserRouter>
          <LinkTextFooter />
        </BrowserRouter>
      )
      expect(getByText('OUVIDORIA')).toBeDefined()
      expect(getByText('0800 727 1184')).toBeDefined()
      expect(getByText('(11) 3366 3184')).toBeDefined()
    })
    it('Should render on footer "DIAS E HORÀRIOS" content', () => {
      const { getByText, queryByText } = renderWithReduxAndTheme(
        <BrowserRouter>
          <LinkTextFooter />
        </BrowserRouter>
      )
      expect(getByText('DIAS E HORÁRIOS')).toBeDefined()
      expect(
        queryByText('Para todos os contatos, atendimento de segunda a sexta,')
      ).toBeDefined()
      expect(queryByText(' das 8h15 às 18h30, exceto feriados.')).toBeDefined()
    })
    it('Should render on footer "© Porto Seguro" content', () => {
      const { getByText } = renderWithReduxAndTheme(
        <BrowserRouter>
          <LinkTextFooter />
        </BrowserRouter>
      )
      expect(
        getByText(
          '© 2020 Porto Seguro Cia. de Seguros - Todos os direitos reservados'
        )
      ).toBeDefined()
    })
  })
})
