import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'
import { storeFactory } from 'setupTests'
import userEvent from '@testing-library/user-event'

import EditingPersonalData from '.'

import * as t from './types'

const defaultStore: t.IDefaultStore = {
  creditCard: {
    clientData: {
      emailCliente: 'email@sciensa.com.br',
      cpfCnpj: '88888888888',
      dataNascimento: '1989-06-29T00:00:00-03:00',
      dddNumeroTelefone: 11,
      numeroTelefone: 997257249,
      cep: '0918919',
      codigoEstadoCivil: 1,
      dataExpedicao: '2017-01-17T00:00:00-03:00',
      estado: 'SP',
      message: {
        mensagem: 'SUCESSO',
        tipoCritica: 'SUCESSO',
      },
      nomeCliente: 'Naruto Uzumaki',
      nomeMae: 'Kushina Uzumaki',
      numeroDocumento: 999999999,
      numeroEnderecoResidencial: 321,
      orgaoEmissor: 'DETRAN',
      sexo: 'M',
      tipoDocumento: 'CNH',
    },
    isClientDataLoading: false,
  },
  creditCardOccupation: {
    data: {
      profissoesVO: [
        {
          codUsuarioAlteracao: 'P0621470',
          codProfissaoProduto: '1',
          dataInclusao: '2015-12-17T11:22:40-02:00',
          nome: 'MEDICO',
          dataAlteracao: '2015-12-17T11:22:40-02:00',
          codProduto: '0',
        },
      ],
    },
  },
}

const formData = {
  cidade: 'Rio de Janeiro',
  nomeMae: 'Dona Florinda',
  codigoEstadoCivil: '2',
  sexo: 'F',
  codigoProfissao: '1',
}

const createRootContainer = () => {
  let container = document.getElementById('root')
  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', 'root')
    document.body.appendChild(container)
  }
  return container
}

const setup = (initialState: t.IDefaultStore) => {
  const store = storeFactory(initialState)
  return renderWithReduxAndTheme(
    <EditingPersonalData
      isOpen
      handleClose={() => {}}
      formData={formData}
      setFormData={() => {}}
    />,
    { store, container: createRootContainer() }
  )
}

describe('EditingPersonalData component', () => {
  it('should exists', () => {
    expect(EditingPersonalData).toBeDefined()
  })
  it('should render Title', () => {
    renderWithReduxAndTheme(
      <EditingPersonalData
        isOpen
        handleClose={() => {}}
        formData={formData}
        setFormData={() => {}}
      />,
      { container: createRootContainer() }
    )

    expect(screen.getByText(/alterar dados pessoais/i)).toBeDefined()
  })
  it('should render customer data', () => {
    setup(defaultStore)

    expect(screen.getByText(/e-mail/i)).toBeDefined()
    expect(screen.getByText(/email@sciensa\.com\.br/i)).toBeDefined()
    expect(screen.getByText(/cpf/i)).toBeDefined()
    expect(screen.getByText(/888.888.888-88/i)).toBeDefined()
    expect(screen.getByText(/data de nascimento/i)).toBeDefined()
    expect(screen.getByText(/29\/06\/1989/i)).toBeDefined()
    expect(screen.getByText(/celular/i)).toBeDefined()
    expect(screen.getByText(/\(11\) 9 9725-7249/i)).toBeDefined()
  })
  describe('Buttons tests', () => {
    it(`should trigger 'ALTERAR NO PERFIL' button`, () => {
      setup(defaultStore)

      //@ts-expect-error
      delete window.location
      window.location = {
        ...window.location,
        href: '/',
      }

      const updateAtProfileButton = screen.getByRole('button', {
        name: /alterar no perfil/i,
      })
      userEvent.click(updateAtProfileButton)

      expect(
        window.location.href.includes('portaldecliente/conquista/perfil?r=true')
      ).toBeTruthy()
    })
    it(`should trigger 'SALVAR ALTERAÇÕES' button`, () => {
      const handleClose = jest.fn()
      const setFormData = jest.fn()

      const store = storeFactory(defaultStore)
      renderWithReduxAndTheme(
        <EditingPersonalData
          isOpen
          handleClose={handleClose}
          formData={formData}
          setFormData={setFormData}
        />,
        {
          store,
          container: createRootContainer(),
        }
      )

      const saveButton = screen.getByRole('button', {
        name: /SALVAR ALTERAÇÕES/i,
      })
      userEvent.click(saveButton)

      expect(handleClose).toHaveBeenCalled()
      expect(setFormData).toHaveBeenCalled()
    })
    it(`should trigger 'close' button`, () => {
      const handleClose = jest.fn()

      const store = storeFactory(defaultStore)
      renderWithReduxAndTheme(
        <EditingPersonalData
          isOpen
          handleClose={handleClose}
          formData={formData}
          setFormData={() => {}}
        />,
        {
          store,
          container: createRootContainer(),
        }
      )

      const closeButton = screen.getByText(/close/i)
      userEvent.click(closeButton)

      expect(handleClose).toHaveBeenCalled()
    })
  })
  it('should render loading state', () => {
    const storeMock = {
      creditCard: {
        clientData: null,
        isClientDataLoading: true,
      },
    }
    const store = storeFactory(storeMock)
    renderWithReduxAndTheme(
      <EditingPersonalData
        isOpen
        handleClose={() => {}}
        formData={formData}
        setFormData={() => {}}
      />,
      { store, container: createRootContainer() }
    )

    expect(screen.getByTestId(/loading-bar/i)).toBeDefined()
  })
  describe('Text inputs tests', () => {
    it('should render cityInput correctly', () => {
      setup(defaultStore)

      const cityInput = screen.getByTestId('cidade')
      // @ts-expect-error:
      cityInput.setSelectionRange(0, 14)
      userEvent.type(cityInput, '{backspace}Natal')
      expect(cityInput).toHaveValue('Natal')
    })
    it('should render motherNameInput correctly', () => {
      setup(defaultStore)

      const cityInput = screen.getByTestId('nome da mãe')
      // @ts-expect-error:
      cityInput.setSelectionRange(0, 28)
      userEvent.type(cityInput, '{backspace}Bruxa do 71')
      expect(cityInput).toHaveValue('Bruxa do 71')
    })
    it('should render inputs without formData', () => {
      const store = storeFactory(defaultStore)
      renderWithReduxAndTheme(
        <EditingPersonalData
          isOpen
          handleClose={() => {}}
          formData={{}}
          setFormData={() => {}}
        />,
        { store, container: createRootContainer() }
      )

      const cityInput = screen.getByTestId('cidade')
      expect(cityInput).toHaveValue('')

      const motherNameInput = screen.getByTestId('nome da mãe')
      expect(motherNameInput).toHaveValue('')
    })
  })
  it('should render modal', () => {
    window.resizeTo(400, 600)

    setup(defaultStore)

    expect(screen.getByText(/alterar dados pessoais/i)).toBeDefined()
  })
})
