import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'
import userEvent from '@testing-library/user-event'

import EditingDeliveryData from './index'

const formData = {
  bairro: 'Aldeia da Areia',
  cep: '01412111',
  cidade: 'São Paulo',
  codigoBandeira: 2,
  codigoCanal: 14,
  codigoEstadoCivil: 1,
  codigoProfissao: 3,
  complemento: 'Ap 171',
  dataEmissaoDocumento: '12/02;2010',
  dataNascimento: '10/06/1984',
  dddTelefone: 11,
  diaVencimento: 17,
  email: 'uchiha@konoha.com.jp',
  idSimulacao: 16,
  logradouro: 'Avenida Brasil',
  nacionalidade: 'Brasileira',
  nome: 'Sasuke',
  nomeMae: 'Senhora Uchiha',
  numeroDocumentoIdentificacao: 92637929,
  numeroLogradouro: 20,
  numeroTelefone: 40028922,
  orgaoExpedidor: 'SP',
  sexo: 'M',
  tipoDocumento: 'RG',
  uf: 'SP',
  valorRenda: 10000,
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

const setup = () => {
  return renderWithReduxAndTheme(
    <EditingDeliveryData
      isOpen
      handleClose={() => {}}
      formData={formData}
      setFormData={() => {}}
    />,
    { container: createRootContainer() }
  )
}

describe('EditingDeliveryData component', () => {
  it('should exists', () => {
    expect(EditingDeliveryData).toBeDefined()
  })
  it('should render Title', () => {
    setup()

    expect(screen.getByText(/alterar endereço de entrega/i)).toBeDefined()
  })
  describe('Buttons tests', () => {
    it(`should trigger 'SALVAR ALTERAÇÕES' button`, () => {
      const handleClose = jest.fn()
      const setFormData = jest.fn()

      renderWithReduxAndTheme(
        <EditingDeliveryData
          isOpen
          handleClose={handleClose}
          formData={formData}
          setFormData={setFormData}
        />,
        { container: createRootContainer() }
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

      renderWithReduxAndTheme(
        <EditingDeliveryData
          isOpen
          handleClose={handleClose}
          formData={formData}
          setFormData={() => {}}
        />,
        { container: createRootContainer() }
      )

      const closeButton = screen.getByText(/close/i)
      userEvent.click(closeButton)

      expect(handleClose).toHaveBeenCalled()
    })
  })
  describe('Inputs tests', () => {
    it('should render CEPInput correctly', () => {
      setup()

      const CEPInput = screen.getByTestId('cep')
      // @ts-expect-error:
      CEPInput.setSelectionRange(0, 9)
      userEvent.type(CEPInput, '{backspace}33333333')
      expect(CEPInput).toHaveValue('33333-333')
    })
    it('should render AddressInput correctly', () => {
      setup()

      const AddressInput = screen.getByTestId('endereço')
      // @ts-expect-error:
      AddressInput.setSelectionRange(0, 14)
      userEvent.type(AddressInput, '{backspace}Rua Augusta')
      expect(AddressInput).toHaveValue('Rua Augusta')
    })
    it('should render AddressNumberInput correctly', () => {
      setup()

      const AddressNumberInput = screen.getByTestId('número')
      // @ts-expect-error:
      AddressNumberInput.setSelectionRange(0, 2)
      userEvent.type(AddressNumberInput, '{backspace}89')
      expect(AddressNumberInput).toHaveValue('89')
    })
    it('should render AdditionalInfoInput correctly', () => {
      setup()

      const AdditionalInfoInput = screen.getByTestId('complemento')
      // @ts-expect-error:
      AdditionalInfoInput.setSelectionRange(0, 6)
      userEvent.type(AdditionalInfoInput, '{backspace}Rua sem saída')
      expect(AdditionalInfoInput).toHaveValue('Rua sem saída')
    })
    it('should render NeighborhoodInput correctly', () => {
      setup()

      const NeighborhoodInput = screen.getByTestId('bairro')
      // @ts-expect-error:
      NeighborhoodInput.setSelectionRange(0, 15)
      userEvent.type(NeighborhoodInput, '{backspace}Tatuapé')
      expect(NeighborhoodInput).toHaveValue('Tatuapé')
    })
    it('should render CityInput correctly', () => {
      setup()

      const CityInput = screen.getByTestId('cidade')
      // @ts-expect-error:
      CityInput.setSelectionRange(0, 15)
      userEvent.type(CityInput, '{backspace}Rio de Janeiro')
      expect(CityInput).toHaveValue('Rio de Janeiro')
    })
    it('should render BrazilianStatesInput correctly', () => {
      const { rerender } = setup()

      const BrazilianStatesInput = screen.getByTestId(
        'select-option-input-data-test-id-estados'
      )

      userEvent.click(BrazilianStatesInput)
      userEvent.click(screen.getByTestId('option-Acre'))

      rerender(
        <EditingDeliveryData
          isOpen
          handleClose={() => {}}
          formData={formData}
          setFormData={() => {}}
        />
      )

      expect(BrazilianStatesInput).toHaveValue('Acre')

      userEvent.click(BrazilianStatesInput)
      userEvent.click(screen.getByTestId('option-Rio Grande do Norte'))

      rerender(
        <EditingDeliveryData
          isOpen
          handleClose={() => {}}
          formData={formData}
          setFormData={() => {}}
        />
      )

      expect(BrazilianStatesInput).toHaveValue('Rio Grande do Norte')
    })
    it('should render empty inputs', () => {
      renderWithReduxAndTheme(
        <EditingDeliveryData
          isOpen
          handleClose={() => {}}
          formData={{}}
          setFormData={() => {}}
        />,
        { container: createRootContainer() }
      )

      const CEPInput = screen.getByTestId('cep')
      expect(CEPInput).toHaveValue('')
      const AddressInput = screen.getByTestId('endereço')
      expect(AddressInput).toHaveValue('')
      const AddressNumberInput = screen.getByTestId('número')
      expect(AddressNumberInput).toHaveValue('')
      const AdditionalInfoInput = screen.getByTestId('complemento')
      expect(AdditionalInfoInput).toHaveValue('')
      const NeighborhoodInput = screen.getByTestId('bairro')
      expect(NeighborhoodInput).toHaveValue('')
      const CityInput = screen.getByTestId('cidade')
      expect(CityInput).toHaveValue('')
      const BrazilianStatesInput = screen.getByTestId(
        'select-option-input-data-test-id-estados'
      )
      expect(BrazilianStatesInput).toHaveValue('')
    })
  })
  it('should render modal', () => {
    window.resizeTo(400, 600)

    setup()

    expect(screen.getByText(/alterar endereço de entrega/i)).toBeDefined()
  })
})
