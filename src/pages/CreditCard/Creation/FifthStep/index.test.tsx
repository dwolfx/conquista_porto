import React from 'react'

import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'

import FifthStep from '.'

describe('FifthStep tests', () => {
  it('should exist', () => {
    expect(FifthStep).toBeDefined()
  })
  it('should render correctly', () => {
    renderWithReduxAndTheme(<FifthStep form={{}} onChangeForm={() => { }} onNextStep={() => {}}/>)
    expect(screen.getByText('Resumo')).toBeInTheDocument()
    expect(screen.getByText('Antes de enviar a solicitação, por favor, revise as informações.')).toBeInTheDocument()
    expect(screen.getByText('DADOS PESSOAIS')).toBeInTheDocument()
    expect(screen.getByText('DADOS DO CARTÃO')).toBeInTheDocument()
    expect(screen.getByText('DADOS DE ENTREGA')).toBeInTheDocument()
    expect(screen.getByText('Concordo com a solicitação do Cartão de Crédito Porto Seguro e com as condições do contrato, que será enviado com o cartão.')).toBeInTheDocument()
  })
  it('checkbox should work properly', () => {
    renderWithReduxAndTheme(<FifthStep form={{}} onChangeForm={() => { }} onNextStep={() => { }} />)
    const checkbox = screen.getByTestId('credit-card-check')
    fireEvent.click(checkbox)
    expect(screen.getByRole('button', { name: 'SOLICITAR CARTÃO' })).not.toBeDisabled()
  })
  it('should show next step', () => {
    const changeStepFunction = jest.fn()
    renderWithReduxAndTheme(<FifthStep form={{}} onChangeForm={() => { }} onNextStep={changeStepFunction} />)
    const checkbox = screen.getByTestId('credit-card-check')
    fireEvent.click(checkbox)
    fireEvent.click(screen.getByRole('button', { name: 'SOLICITAR CARTÃO' }))
    expect(changeStepFunction).toHaveBeenCalled()
  })
})
