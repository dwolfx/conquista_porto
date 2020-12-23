import React from 'react'

import ComparativeTable from './ComparativeTable'
import ComparativeTabs from './ComparativeTabs'

import useMedia from 'hooks/useMedia'

import * as t from './types'
import * as s from './styles'

// dados mockados retirar na tafera de integração
const viagemCobertura: t.ITravelCoverage[] = [
  {
    descricao: 'Despesas Médicas, Hospitalares e/ou Odontológicas - DMHO',
    valor: 'R$ 1.000.000.000,00',
  },
  {
    descricao: 'Morte acidental',
    valor: 'R$ 80.000,00',
  },
  {
    descricao: 'Invalidez Permanente Total ou Parcial por Acidente',
    valor: 'R$ 80.000,00',
  },
  {
    descricao: 'Cancelamento de Viagem',
    valor: 'Não',
  },
  {
    descricao: 'Interrupção da viagem',
    valor: 'Não',
  },
  {
    descricao: 'Extravio de bagagem',
    valor: 'R$  1.500,00',
  },
  {
    descricao: 'Danos de Bagagem',
    valor: 'R$ 300,00',
  },
  {
    descricao: 'Traslado de Corpo',
    valor: 'R$ 20.000,00',
  },
  {
    descricao: 'Traslado Médico',
    valor: 'R$ 20.000,00',
  },
  {
    descricao: 'Regresso Sanitário',
    valor: 'R$ 20.000,00',
  },
  {
    descricao: 'Assistência Funeral',
    valor: 'R$ 5.000,00',
  },
  {
    descricao: 'Hospedagem após Alta Hospitalar',
    valor: 'R$100,00/Dia  Limite 5 Dias',
  },
  {
    descricao: 'Remarcação de Passagem para Regresso',
    valor: 'R$ 3.000,00',
  },
  {
    descricao: 'Remarcação de passagem para regresso de membros da família.',
    valor: 'R$ 3.000,00',
  },
  {
    descricao: 'Acompanhante em caso de Hospitalização Prolongada',
    valor: 'R$ 3.000,00',
  },
  {
    descricao:
      'Hospedagem para Acompanhante em caso de Hospitalização Prolongada',
    valor: 'R$ 100,00 / dia - Limite 5 dias',
  },
  {
    descricao: 'Acompanhamento de menor',
    valor: 'R$ 3.000,00',
  },
  {
    descricao: 'Fisioterapia',
    valor: 'Não',
  },
  {
    descricao: 'Despesas Farmacêuticas',
    valor: 'Não',
  },
  {
    descricao: 'Despesas Jurídicas',
    valor: 'Não',
  },
  {
    descricao: 'Pagamento de Fiança',
    valor: 'Não',
  },
  {
    descricao: 'Extensão de Vigência por Razões Médicas',
    valor: 'Sim',
  },
  {
    descricao: 'Porto Viaje Bem',
    valor: 'Sim',
  },
  {
    descricao: 'Localização e Encaminhamento de bagagem',
    valor: 'Sim (se transporte aéreo ou marítimo)',
  },
  {
    descricao: 'Orientação e envio em caso de perda de documentos',
    valor: 'Sim',
  },
  {
    descricao: 'Transmissão de Mensagens Urgentes',
    valor: 'Sim',
  },
]

const planosDeViagem: t.ITravelPlans[] = [
  {
    nomePlano: 'Brasil Terra',
    viagemCobertura: viagemCobertura,
  },
  {
    nomePlano: 'Brasil Prata',
    viagemCobertura: viagemCobertura,
  },
  {
    nomePlano: 'Brasil Ouro',
    viagemCobertura: viagemCobertura,
  },
]
interface IComparativeModal {
  isOpen: boolean
  handleClose: (isOpen: boolean) => void
}

const ComparativeModal: React.FC<IComparativeModal> = ({
  isOpen,
  handleClose,
  ...rest
}) => {
  const isNotMobile = useMedia('mdUp')

  return (
    <s.Modal
      modalTitle={isNotMobile ? 'Comparativo de coberturas' : 'Planos Brasil'}
      isOpen={isOpen}
      handleClose={() => handleClose(false)}
      {...rest}
    >
      {isNotMobile ? (
        <ComparativeTable travelPlans={planosDeViagem} />
      ) : (
        <ComparativeTabs travelPlans={planosDeViagem} />
      )}
    </s.Modal>
  )
}

export default ComparativeModal
