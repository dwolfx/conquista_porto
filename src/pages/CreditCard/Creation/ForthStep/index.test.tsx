import React from 'react'

import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'

import ForthStep from './'

describe('ForthStep tests', () => {
  it('should exists', () => {
    expect(ForthStep).toBeDefined()
  })
  it('should have the credit card flags Card', () => {
    renderWithReduxAndTheme(
      <ForthStep 
        form={{}}
        setForm={() => {}}
        onNextStep={() => {}}  
      />
    )
    const flagsCreditCardHeader = screen.getByText('Selecione a bandeira do cartão')
    const flagsCreditCard = screen.getByTestId('card-credit-card-flags')
    expect(flagsCreditCard).toBeInTheDocument()
    expect(flagsCreditCardHeader).toBeInTheDocument()
  })
  it('should have the credit card bill expiration Card', () => {
    renderWithReduxAndTheme(
      <ForthStep 
        form={{}}
        setForm={() => {}}
        onNextStep={() => {}}  
      />
    )
    const validityCreditCardHeader = screen.getByText('Selecione o dia de vencimento da fatura')
    const validityCreditCard = screen.getByTestId('card-credit-card-bill-expiration')
    expect(validityCreditCardHeader).toBeInTheDocument()
    expect(validityCreditCard).toBeInTheDocument()
  })
  it('should test credit card bill expiration date input', () => {
    renderWithReduxAndTheme(
      <ForthStep 
        form={{}}
        setForm={() => {}}
        onNextStep={() => {}}  
      />
    )
    const dayInput = screen.getByTestId('select-option-input-data-vencimento-fatura')

    fireEvent.click(dayInput)
    fireEvent.click(screen.getByTestId('option-01'))
    expect(screen.getByTestId('select-option-input-data-vencimento-fatura')).toHaveValue('01')

    fireEvent.click(dayInput)
    fireEvent.click(screen.getByTestId('option-02'))
    expect(screen.getByTestId('select-option-input-data-vencimento-fatura')).toHaveValue('02')
  })
  it('should have the address form card', () => {
    renderWithReduxAndTheme(
      <ForthStep 
        form={{}}
        setForm={() => {}}
        onNextStep={() => {}}  
      />
    )
    const AddressCreditCardHeader = screen.getByText('Informe um endereço para receber o cartão')
    const AddressCreditCard = screen.getByTestId('card-credit-card-address')
    expect(AddressCreditCardHeader).toBeInTheDocument()
    expect(AddressCreditCard).toBeInTheDocument()
  })
  it('should render footer with next button', () => {
    renderWithReduxAndTheme(
      <ForthStep 
        form={{}}
        setForm={() => {}}
        onNextStep={() => {}}  
      />
    )
    const footer = screen.getByTestId('footer-layer')
    const nextButton = screen.getByRole('button', { name: 'próximo' })
    expect(footer).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()
  })
  it('should call onNextStep function by clicking on next button', () => {
    const onNextStepMock = jest.fn()
    renderWithReduxAndTheme(
      <ForthStep 
        form={{}}
        setForm={() => {}}
        onNextStep={onNextStepMock}  
      />
    )
    const nextButton = screen.getByRole('button', { name: 'próximo' })
    fireEvent.click(nextButton)
    expect(onNextStepMock).toHaveBeenCalled()
  })
  it('should render flag options', () => {
    renderWithReduxAndTheme(
      <ForthStep 
        form={{}}
        setForm={() => {}}
        onNextStep={() => {}}  
      />
    )
    expect(screen.getByTestId('card-credit-card-flag-master')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'mastercard'})).toBeInTheDocument()
    expect(screen.getByText('Mastercard')).toBeInTheDocument()
    expect(screen.getByTestId('card-credit-card-flag-visa')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'visa'})).toBeInTheDocument()
    expect(screen.getByText('Visa')).toBeInTheDocument()
  })
  it('should not be checked flags initialy', () => {
    renderWithReduxAndTheme(
      <ForthStep 
        form={{}}
        setForm={() => {}}
        onNextStep={() => {}}  
      />
    )
    const masterOption = screen.getByRole('radio', { name: 'master' })
    const visaOption = screen.getByRole('radio', { name: 'visa' })
    expect(masterOption).not.toBeChecked()
    expect(visaOption).not.toBeChecked()
  })
  it('should be checked the flag mastercard', () => {
    renderWithReduxAndTheme(
      <ForthStep 
        form={{}}
        setForm={() => {}}
        onNextStep={() => {}}  
      />
    )
    fireEvent.click(screen.getByRole('radio', { name: 'master' }))
    expect(screen.getByRole('radio', { name: 'master' })).toBeChecked()
    expect(screen.getByTestId('card-credit-card-flag-master')).toHaveStyleRule('border-color', '#00ADEF')
  })
  it('should be checked the flag visa', () => {
    renderWithReduxAndTheme(
      <ForthStep 
        form={{}}
        setForm={() => {}}
        onNextStep={() => {}}  
      />
    )
    fireEvent.click(screen.getByRole('radio', { name: 'visa' }))
    expect(screen.getByRole('radio', { name: 'visa' })).toBeChecked()
    expect(screen.getByTestId('card-credit-card-flag-visa')).toHaveStyleRule('border-color', '#00ADEF')
  })
  it('should contain the address inputs: CEP', () => {
    renderWithReduxAndTheme(
      <ForthStep 
        form={{}}
        setForm={() => {}}
        onNextStep={() => {}}  
      />
    )
    const cepInput = screen.getByTestId('cep')
    expect(cepInput).toBeInTheDocument()
  })
  it('should test the address inputs: CEP', () => {
    renderWithReduxAndTheme(
      <ForthStep 
        form={{}}
        setForm={() => {}}
        onNextStep={() => {}}  
      />
    )
    const cepInput = screen.getByTestId('cep')
    fireEvent.change(cepInput, { target: { value: '11533230' }})
    expect(cepInput).toHaveValue('11533-230')
  })
  it('should contain the address inputs: ENDEREÇO', () => {
    renderWithReduxAndTheme(
      <ForthStep 
        form={{}}
        setForm={() => {}}
        onNextStep={() => {}}  
      />
    )
    const addressInput = screen.getByTestId('endereço')
    expect(addressInput).toBeInTheDocument()
  })
  it('should test the address inputs: ENDEREÇO', () => {
    renderWithReduxAndTheme(
      <ForthStep 
        form={{}}
        setForm={() => {}}
        onNextStep={() => {}}  
      />
    )
    const addressInput = screen.getByTestId('endereço')
    fireEvent.change(addressInput, { target: { value: 'Rua Uruguai' }})
    expect(addressInput).toHaveValue('Rua Uruguai')
  })
  it('should contain the address inputs: NÚMERO', () => {
    renderWithReduxAndTheme(
      <ForthStep 
        form={{}}
        setForm={() => {}}
        onNextStep={() => {}}  
      />
    )
    const numberInput = screen.getByTestId('número')
    expect(numberInput).toBeInTheDocument()
  })
  it('should test the address inputs: NÚMERO', () => {
    renderWithReduxAndTheme(
      <ForthStep 
        form={{}}
        setForm={() => {}}
        onNextStep={() => {}}  
      />
    )
    const numberInput = screen.getByTestId('número')
    fireEvent.change(numberInput, { target: { value: '1225' }})
    expect(numberInput).toHaveValue('1225')
  })
  it('should contain the address inputs: COMPLEMENTO', () => {
    renderWithReduxAndTheme(
      <ForthStep 
        form={{}}
        setForm={() => {}}
        onNextStep={() => {}}  
      />
    )
    const additionalDetails = screen.getByTestId('complemento')
    expect(additionalDetails).toBeInTheDocument()
  })
  it('should test the address inputs: COMPLEMENTO', () => {
    renderWithReduxAndTheme(
      <ForthStep 
        form={{}}
        setForm={() => {}}
        onNextStep={() => {}}  
      />
    )
    const additionalDetails = screen.getByTestId('complemento')
    fireEvent.change(additionalDetails, { target: { value: 'apto. 22' }})
    expect(additionalDetails).toHaveValue('apto. 22')
  })
  it('should contain the address inputs: BAIRRO', () => {
    renderWithReduxAndTheme(
      <ForthStep 
        form={{}}
        setForm={() => {}}
        onNextStep={() => {}}  
      />
    )
    const neighborhoodInput = screen.getByTestId('bairro')
    expect(neighborhoodInput).toBeInTheDocument()
  })
  it('should test the address inputs: BAIRRO', () => {
    renderWithReduxAndTheme(
      <ForthStep 
        form={{}}
        setForm={() => {}}
        onNextStep={() => {}}  
      />
    )
    const neighborhoodInput = screen.getByTestId('bairro')
    fireEvent.change(neighborhoodInput, { target: { value: 'Jardim Casqueiro' }})
    expect(neighborhoodInput).toHaveValue('Jardim Casqueiro')
  })
  it('should contain the address inputs: CIDADE', () => {
    renderWithReduxAndTheme(
      <ForthStep 
        form={{}}
        setForm={() => {}}
        onNextStep={() => {}}  
      />
    )
    const cityInput = screen.getByTestId('cidade')
    expect(cityInput).toBeInTheDocument()
  })
  it('should test the address inputs: CIDADE', () => {
    renderWithReduxAndTheme(
      <ForthStep 
        form={{}}
        setForm={() => {}}
        onNextStep={() => {}}  
      />
    )
    const cityInput = screen.getByTestId('cidade')
    fireEvent.change(cityInput, { target: { value: 'São Paulo' }})
    expect(cityInput).toHaveValue('São Paulo')
  })
  it('should contain the address inputs: ESTADO', () => {
    renderWithReduxAndTheme(
      <ForthStep 
        form={{}}
        setForm={() => {}}
        onNextStep={() => {}}  
      />
    )
    const stateInput = screen.getByTestId('select-option-input-estado')
    expect(stateInput).toBeInTheDocument()
  })
  it('should test the address inputs: ESTADO', () => {
    renderWithReduxAndTheme(
      <ForthStep 
        form={{}}
        setForm={() => {}}
        onNextStep={() => {}}  
      />
    )
    const stateInput = screen.getByTestId('select-option-input-estado')

    fireEvent.click(stateInput)
    fireEvent.click(screen.getByTestId('option-SP'))
    expect(screen.getByTestId('select-option-input-estado')).toHaveValue('SP')

    fireEvent.click(stateInput)
    fireEvent.click(screen.getByTestId('option-RJ'))
    expect(screen.getByTestId('select-option-input-estado')).toHaveValue('RJ')
  })
  it('should render correcly mobile components variation', () => {
    window.resizeTo(480, 600)
    renderWithReduxAndTheme(
      <ForthStep 
        form={{}}
        setForm={() => {}}
        onNextStep={() => {}}  
      />
    )
    expect(screen.getByText('Bandeira do cartão')).toBeInTheDocument()
    expect(screen.getByTestId('select-option-input-data-vencimento-fatura')).toBeInTheDocument()
    expect(screen.queryByTestId('card-credit-card-bill-expiration')).toBeFalsy()
  })

  // it('test', () => {
  //   renderWithReduxAndTheme(
  //     <ForthStep 
  //       form={{}}
  //       setForm={() => {}}
  //       onNextStep={() => {}}  
  //     />
  //   )
  //   const radio1 = screen.getByRole('radio', { name: 'Radio 1' })
  //   const radio2 = screen.getByRole('radio', { name: 'Radio 2' })
  //   expect(radio1).toBeChecked()
  //   fireEvent.click(radio2)
  //   expect(radio2).toBeChecked()

  // })
})