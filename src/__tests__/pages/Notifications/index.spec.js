import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
import createStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import Notifications from 'pages/Notifications'

const INITIAL_STATE = {
  notifications: {
    data: {
      novas: [
        {
          icon: 'ALERT',
          idNotificacao: 170,
          link: null,
          descricaoLonga:
            'Para concluir seu cadastro, por favor envie os documentos solicitados.<br>',
          titulo: 'Cadastro de investidor incompleto.',
          urlServicoNotificacao: null,
          textoConteudo:
            'Para concluir seu cadastro, realize o upload dos documentos solicitados.<br>',
          lida: false,
          tipoNotificacao: {
            codigoTipoNotificacao: 999,
            nomeTipoNotificacao: 'nome do tipo',
            textoCaminhoImagem: 'caminho do texto',
            dataHoraUltimaAtualizacao: 1567306800000,
            cdUsuarioUltimaAlteracao: '1',
            cdEmpresaUltimaAlteracao: 1,
            cdMatriculaUsuarioUltimaAlteracao: 1,
            notificacao: null,
          },
          codTipoNotificacao: 999,
        },
      ],
      anteriores: [
        {
          icon: 'ALERT',
          idNotificacao: 114,
          link: null,
          descricaoLonga:
            'Para concluir seu cadastro, por favor envie os documentos solicitados.<br>',
          titulo: 'Cadastro de investidor incompleto.',
          urlServicoNotificacao: null,
          textoConteudo:
            'Para concluir seu cadastro, realize o upload dos documentos solicitados.<br>',
          lida: true,
          tipoNotificacao: {
            codigoTipoNotificacao: 999,
            nomeTipoNotificacao: 'nome do tipo',
            textoCaminhoImagem: 'caminho do texto',
            dataHoraUltimaAtualizacao: 1567306800000,
            cdUsuarioUltimaAlteracao: '1',
            cdEmpresaUltimaAlteracao: 1,
            cdMatriculaUsuarioUltimaAlteracao: 1,
            notificacao: null,
          },
          codTipoNotificacao: 999,
        },
      ],
    },
  },
}
const mockStore = createStore([])
const store = mockStore(INITIAL_STATE)

describe('Notifications', () => {
  beforeAll(() => {
    // eslint-disable-next-line no-unused-vars
    ReactDOM.createPortal = jest.fn((element, node) => element)
  })

  afterEach(() => {
    ReactDOM.createPortal.mockClear()
  })
  it('Notifications renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <Notifications />
            </ThemeProvider>
          </BrowserRouter>
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
