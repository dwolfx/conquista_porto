import React from 'react'
import ReactDOM from 'react-dom'
import renderer, { act } from 'react-test-renderer'

import { ThemeProvider } from 'styled-components'

import theme from 'styles/theme'
import HorizontalCard from 'pages/TripInsurance/PRO/Creation/PartnerOffer/Steps/TravelDetailsForm/ProposalCard/HorizontalCard'

const proposalExample = {
  valorCartaoPortoSeguro: '8.27',
  ViagemCobertura: {
    coberturas: [
      {
        valor: 'R$ 10.000,00',
        descricao: 'Despesas Médicas, Hospitalares e/ou Odontológicas - DMHO',
      },
      {
        valor: 'R$ 80.000,00',
        descricao: 'Morte acidental',
      },
      {
        valor: 'R$ 80.000,00',
        descricao: 'Invalidez Permanente Total ou Parcial por Acidente',
      },
      {
        valor: 'Não',
        descricao: 'Cancelamento de Viagem',
      },
      {
        valor: 'Não',
        descricao: 'Interrupção da viagem',
      },
      {
        valor: 'R$  1.500,00',
        descricao: 'Extravio de bagagem',
      },
      {
        valor: 'R$ 300,00',
        descricao: 'Danos de Bagagem',
      },
      {
        valor: 'R$ 20.000,00',
        descricao: 'Traslado de Corpo',
      },
      {
        valor: 'R$ 20.000,00',
        descricao: 'Traslado Médico',
      },
      {
        valor: 'R$ 20.000,00',
        descricao: 'Regresso Sanitário',
      },
      {
        valor: 'R$ 5.000,00',
        descricao: 'Assistência Funeral',
      },
      {
        valor: 'R$100,00/Dia  Limite 5 Dias',
        descricao: 'Hospedagem após Alta Hospitalar',
      },
      {
        valor: 'R$ 3.000,00',
        descricao: 'Remarcação de Passagem para Regresso',
      },
      {
        valor: 'R$ 3.000,00',
        descricao:
          'Remarcação de passagem para regresso de membros da família.',
      },
      {
        valor: 'R$ 3.000,00',
        descricao: 'Acompanhante em caso de Hospitalização Prolongada',
      },
      {
        valor: 'R$ 100,00 / dia - Limite 5 dias',
        descricao:
          'Hospedagem para Acompanhante em caso de Hospitalização Prolongada',
      },
      {
        valor: 'R$ 3.000,00',
        descricao: 'Acompanhamento de menor',
      },
      {
        valor: 'Não',
        descricao: 'Fisioterapia',
      },
      {
        valor: 'Não',
        descricao: 'Despesas Farmacêuticas',
      },
      {
        valor: 'Não',
        descricao: 'Despesas Jurídicas',
      },
      {
        valor: 'Não',
        descricao: 'Pagamento de Fiança',
      },
      {
        valor: 'Sim',
        descricao: 'Extensão de Vigência por Razões Médicas',
      },
      {
        valor: 'Sim',
        descricao: 'Porto Viaje Bem',
      },
      {
        valor: 'Sim (se transporte aéreo ou marítimo)',
        descricao: 'Localização e Encaminhamento de bagagem',
      },
      {
        valor: 'Sim',
        descricao: 'Orientação e envio em caso de perda de documentos',
      },
      {
        valor: 'Sim',
        descricao: 'Transmissão de Mensagens Urgentes',
      },
    ],
  },
  valorAssistencia: '0.0',
  formasPagamento: {
    listaParcelamentoCartao: [
      {
        valor: '8.7',
        id: '1',
        descricao: 'À vista',
      },
      {
        valor: '4.35',
        id: '2',
        descricao: '2x',
      },
      {
        valor: '2.9',
        id: '3',
        descricao: '3x',
      },
      {
        valor: '2.17',
        id: '4',
        descricao: '4x',
      },
      {
        valor: '1.74',
        id: '5',
        descricao: '5x',
      },
      {
        valor: '1.45',
        id: '6',
        descricao: '6x',
      },
      {
        valor: '1.24',
        id: '7',
        descricao: '7x',
      },
      {
        valor: '1.09',
        id: '8',
        descricao: '8x',
      },
      {
        valor: '0.97',
        id: '9',
        descricao: '9x',
      },
      {
        valor: '0.87',
        id: '10',
        descricao: '10x',
      },
      {
        valor: '0.79',
        id: '11',
        descricao: '11x',
      },
      {
        valor: '0.73',
        id: '12',
        descricao: '12x',
      },
    ],
    listaParcelamentoCartaoPorto: [
      {
        valor: '8.27',
        id: '1',
        descricao: 'À vista',
      },
      {
        valor: '4.14',
        id: '2',
        descricao: '2x',
      },
      {
        valor: '2.76',
        id: '3',
        descricao: '3x',
      },
      {
        valor: '2.07',
        id: '4',
        descricao: '4x',
      },
      {
        valor: '1.65',
        id: '5',
        descricao: '5x',
      },
      {
        valor: '1.38',
        id: '6',
        descricao: '6x',
      },
      {
        valor: '1.18',
        id: '7',
        descricao: '7x',
      },
      {
        valor: '1.03',
        id: '8',
        descricao: '8x',
      },
      {
        valor: '0.92',
        id: '9',
        descricao: '9x',
      },
      {
        valor: '0.83',
        id: '10',
        descricao: '10x',
      },
      {
        valor: '0.75',
        id: '11',
        descricao: '11x',
      },
      {
        valor: '0.69',
        id: '12',
        descricao: '12x',
      },
    ],
  },
  valorTotal: '8.7',
  codigoPlano: '1',
  nomePlano: 'Brasil Prata',
  urlManualPlano:
    'http://www.portoseguro.com.br/static-files/Institucional/Documento/SeguroViagem/Porto%20Brasil%20Prata%202386.16.01.I.pdf',
  valorSeguroBruto: '8.7',
}

beforeAll(() => {
  ReactDOM.createPortal = jest.fn(element => element)
})

afterEach(() => {
  ReactDOM.createPortal.mockClear()
})

it('ProposalCard renders correctly', () => {
  let root
  const handleMockFn = jest.fn()
  act(() => {
    root = renderer.create(
      <ThemeProvider theme={theme}>
        <HorizontalCard
          proposal={proposalExample}
          handleOpenDetailsModal={handleMockFn}
        />
      </ThemeProvider>
    )
  })

  expect(root.toJSON()).toMatchSnapshot()
})
