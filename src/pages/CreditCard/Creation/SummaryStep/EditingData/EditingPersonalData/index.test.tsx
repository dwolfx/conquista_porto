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
  tipoDocumento: 'RG',
  numeroDocumentoIdentificacao: '99999999x',
  dataEmissaoDocumento: '10/10/2017',
  orgaoExpedidor: 'SSP',
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
  it('should render client phone number data', () => {
    const storeMock = {
      ...defaultStore,
      creditCard: {
        ...defaultStore.creditCard,
        clientData: {
          ...defaultStore.creditCard.clientData,
          numeroTelefone: 88888888,
        },
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

    expect(screen.getByText(/telefone/i)).toBeDefined()
    expect(screen.getByText(/\(11\) 8888-8888/i)).toBeDefined()
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
    it('should render documentNumberInput correctly', () => {
      setup(defaultStore)

      const documentNumberInput = screen.getByTestId('número do documento')
      // @ts-expect-error:
      documentNumberInput.setSelectionRange(0, 9)
      userEvent.type(documentNumberInput, '{backspace}11111111x')
      expect(documentNumberInput).toHaveValue('11111111x')
    })
    it('should render issuingBodyInput correctly', () => {
      setup(defaultStore)

      const issuingBodyInput = screen.getByTestId('órgão emissor')
      // @ts-expect-error:
      issuingBodyInput.setSelectionRange(0, 3)
      userEvent.type(issuingBodyInput, '{backspace}SSP')
      expect(issuingBodyInput).toHaveValue('SSP')
    })
    it('should render expeditionDateInput correctly', () => {
      setup(defaultStore)

      const expeditionDateInput = screen.getByTestId('data de expedição')
      // @ts-expect-error:
      expeditionDateInput.setSelectionRange(0, 10)
      userEvent.type(expeditionDateInput, '{backspace}01012015')
      expect(expeditionDateInput).toHaveValue('01/01/2015')
    })
    it('should render expiredDateInput correctly', () => {
      const formDataWithCNH = {
        cidade: 'Rio de Janeiro',
        nomeMae: 'Dona Florinda',
        codigoEstadoCivil: '2',
        sexo: 'F',
        codigoProfissao: '1',
        tipoDocumento: 'CNH',
        numeroDocumentoIdentificacao: '77777777777',
        dataEmissaoDocumento: '10/10/2017',
        orgaoExpedidor: 'DETRAN',
      }

      const store = storeFactory(defaultStore)
      renderWithReduxAndTheme(
        <EditingPersonalData
          isOpen
          handleClose={() => {}}
          formData={formDataWithCNH}
          setFormData={() => {}}
        />,
        { store, container: createRootContainer() }
      )

      const expiredDateInput = screen.getByTestId('data de vencimento')
      // @ts-expect-error:
      expiredDateInput.setSelectionRange(0, 10)
      userEvent.type(expiredDateInput, '{backspace}01012015')
      expect(screen.getByText(/digite uma data válida/i)).toBeDefined()

      // @ts-expect-error:
      expiredDateInput.setSelectionRange(0, 10)
      userEvent.type(expiredDateInput, '{backspace}01012021')
      expect(expiredDateInput).toHaveValue('01/01/2021')
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
  describe('Documents tests', () => {
    it(`should render 'RG' inputs`, () => {
      setup(defaultStore)

      const documentSelect = screen.getByTestId(
        'select-option-input-data-documento'
      )
      expect(documentSelect).toHaveValue('RG')

      const documentNumberInput = screen.getByTestId('número do documento')
      expect(documentNumberInput).toHaveValue('99999999x')

      const expeditionDate = screen.getByTestId('data de expedição')
      expect(expeditionDate).toHaveValue('10/10/2017')

      const issuingBody = screen.getByTestId('órgão emissor')
      expect(issuingBody).toHaveValue('SSP')
    })
    it(`should render 'RNE' inputs`, () => {
      const formDataWithRNE = {
        cidade: 'Rio de Janeiro',
        nomeMae: 'Dona Florinda',
        codigoEstadoCivil: '2',
        sexo: 'F',
        codigoProfissao: '1',
        tipoDocumento: 'RNE',
        numeroDocumentoIdentificacao: '88888888',
        dataEmissaoDocumento: '10/10/2017',
        orgaoExpedidor: 'CGPI/DIREX/DPF',
      }

      const store = storeFactory(defaultStore)
      renderWithReduxAndTheme(
        <EditingPersonalData
          isOpen
          handleClose={() => {}}
          formData={formDataWithRNE}
          setFormData={() => {}}
        />,
        { store, container: createRootContainer() }
      )

      const documentSelect = screen.getByTestId(
        'select-option-input-data-documento'
      )
      expect(documentSelect).toHaveValue('RNE')

      const documentNumberInput = screen.getByTestId('número do documento')
      expect(documentNumberInput).toHaveValue('88888888')

      const expeditionDate = screen.getByTestId('data de expedição')
      expect(expeditionDate).toHaveValue('10/10/2017')

      // const expeditionDate = screen.getByTestId('data de vencimento')
      // expect(expeditionDate).toHaveValue('10/10/2021')

      const issuingBody = screen.getByTestId('órgão emissor')
      expect(issuingBody).toHaveValue('CGPI/DIREX/DPF')
    })
    it(`should render 'CNH' inputs`, () => {
      const formDataWithCNH = {
        cidade: 'Rio de Janeiro',
        nomeMae: 'Dona Florinda',
        codigoEstadoCivil: '2',
        sexo: 'F',
        codigoProfissao: '1',
        tipoDocumento: 'CNH',
        numeroDocumentoIdentificacao: '77777777777',
        dataEmissaoDocumento: '10/10/2017',
        orgaoExpedidor: 'DETRAN',
      }

      const store = storeFactory(defaultStore)
      renderWithReduxAndTheme(
        <EditingPersonalData
          isOpen
          handleClose={() => {}}
          formData={formDataWithCNH}
          setFormData={() => {}}
        />,
        { store, container: createRootContainer() }
      )

      const documentSelect = screen.getByTestId(
        'select-option-input-data-documento'
      )
      expect(documentSelect).toHaveValue('CNH')

      const documentNumberInput = screen.getByTestId('número do documento')
      expect(documentNumberInput).toHaveValue('77777777777')

      const expeditionDate = screen.getByTestId('data de expedição')
      expect(expeditionDate).toHaveValue('10/10/2017')

      // const expeditionDate = screen.getByTestId('data de vencimento')
      // expect(expeditionDate).toHaveValue('10/10/2025')
    })
    it(`should be able to select 'CNH' option`, () => {
      const { rerender } = setup(defaultStore)

      const documentSelect = screen.getByTestId(
        'select-option-input-data-documento'
      )

      userEvent.click(documentSelect)

      const CNHOption = screen.getByTestId('option-CNH')
      userEvent.click(CNHOption)

      rerender(
        <EditingPersonalData
          isOpen
          handleClose={() => {}}
          formData={formData}
          setFormData={() => {}}
        />
      )

      expect(documentSelect).toHaveValue('CNH')
    })
  })
  it('should render modal', () => {
    window.resizeTo(400, 600)

    setup(defaultStore)

    expect(screen.getByText(/alterar dados pessoais/i)).toBeDefined()
  })
})
