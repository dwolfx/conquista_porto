import userEvent from '@testing-library/user-event'
import React from 'react'
import { storeFactory } from 'setupTests'
import { renderWithReduxAndTheme, screen } from 'testUtils'

import RegisterDocumentStep from './index'

describe('Credit Card Creation Register Document Step', () => {
  it('should render component', () => {
    const store = storeFactory({
      creditCard: {
        clientData: {
          cep: '0918919',
          codigoEstadoCivil: 1,
          cpfCnpj: '00000000191',
          dataExpedicao: '2017-01-17T00:00:00-03:00',
          dataNascimento: '1987-11-25T00:00:00-03:00',
          dddNumeroTelefone: 11,
          emailCliente: 'blablabla@whiskas.com',
          estado: 'SP',
          message: {
            mensagem: 'SUCESSO',
            tipoCritica: 'SUCESSO',
          },
          nomeCliente: 'Naruto Uzumaki',
          nomeMae: 'Kushina Uzumaki',
          numeroDocumento: 999999999,
          numeroEnderecoResidencial: 321,
          numeroTelefone: 40028922,
          orgaoEmissor: 'DETRAN',
          sexo: 'M',
          tipoDocumento: 'CNH',
        },
      },
    })

    renderWithReduxAndTheme(
      <RegisterDocumentStep formData={{}} onNextStep={() => null} />,
      {
        store,
      }
    )

    expect(screen.getByDisplayValue('999999999')).toBeDefined()
    expect(screen.getByDisplayValue('Outros')).toBeDefined()
    expect(screen.getByDisplayValue('17/01/2017')).toBeDefined()
    expect(screen.getByDisplayValue('DETRAN')).toBeDefined()
    expect(screen.getByRole('button', { name: 'Próximo' })).toBeDefined()
  })

  it('should have button disabled', () => {
    const store = storeFactory({
      creditCard: {
        clientData: {
          cep: '0918919',
          codigoEstadoCivil: 1,
          cpfCnpj: '00000000191',
          dataExpedicao: '2017-01-17T00:00:00-03:00',
          dataNascimento: '1987-11-25T00:00:00-03:00',
          dddNumeroTelefone: 11,
          emailCliente: 'blablabla@whiskas.com',
          estado: 'SP',
          message: {
            mensagem: 'SUCESSO',
            tipoCritica: 'SUCESSO',
          },
          nomeCliente: 'Naruto Uzumaki',
          nomeMae: 'Kushina Uzumaki',
          numeroDocumento: 999999999,
          numeroEnderecoResidencial: 321,
          numeroTelefone: 40028922,
          orgaoEmissor: 'DE',
          sexo: 'M',
          tipoDocumento: 'CNH',
        },
      },
    })

    renderWithReduxAndTheme(
      <RegisterDocumentStep formData={{}} onNextStep={() => null} />,
      {
        store,
      }
    )

    expect(screen.getByDisplayValue('DE')).toBeDefined()
    expect(screen.getByRole('button', { name: 'Próximo' })).toBeDisabled()
  })

  it('should trigger nextStep function', () => {
    const store = storeFactory({
      creditCard: {
        clientData: {
          cep: '0918919',
          codigoEstadoCivil: 1,
          cpfCnpj: '00000000191',
          dataExpedicao: '2017-01-17T00:00:00-03:00',
          dataNascimento: '1987-11-25T00:00:00-03:00',
          dddNumeroTelefone: 11,
          emailCliente: 'blablabla@whiskas.com',
          estado: 'SP',
          message: {
            mensagem: 'SUCESSO',
            tipoCritica: 'SUCESSO',
          },
          nomeCliente: 'Naruto Uzumaki',
          nomeMae: 'Kushina Uzumaki',
          numeroDocumento: 999999999,
          numeroEnderecoResidencial: 321,
          numeroTelefone: 40028922,
          orgaoEmissor: 'DETRAN',
          sexo: 'M',
          tipoDocumento: 'CNH',
        },
      },
    })
    const nextStepFuncion = jest.fn()

    renderWithReduxAndTheme(
      <RegisterDocumentStep formData={{}} onNextStep={nextStepFuncion} />,
      {
        store,
      }
    )

    const buttonNext = screen.getByRole('button', { name: 'Próximo' })
    expect(buttonNext).toBeDefined()
    userEvent.click(buttonNext)
    expect(nextStepFuncion).toHaveBeenCalled()
  })
})
