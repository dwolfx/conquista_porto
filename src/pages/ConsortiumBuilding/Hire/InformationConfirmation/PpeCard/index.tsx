import { TOptions, TSelected } from 'components/Inputs/Select/types'
import React from 'react'
import { IPpeCard } from '../types'

import * as s from './styles'

export const radioPpeOptions = [
  {
    value: '1',
    name: 'Sim',
  },
  {
    value: '2',
    name: 'Não',
  },
]

const PpeCard: React.FC<IPpeCard> = ({
  ppeData: [ppeData, setPeeData],
  label,
}: IPpeCard) => {
  const [ppeSelect, setPpeSelect] = React.useState<TSelected>({
    id: 0,
    name: '',
  })

  const [ppeOption] = React.useState<TOptions[]>(
    [
      'Eu mesmo',
      'Parente até 1° grau, cônjuge, representante, companheiro(a) ou enteado(a)',
      'Representante ou pessoa de meu relacionamento próximo (nos últimos 5 anos)',
    ].map((value, index) => ({
      id: index + 1,
      text: value,
      onClick: () => {
        setPpeSelect({
          id: index + 1,
          name: value,
        })
        setPeeData({
          isPpe: true,
          whoPoliticallyExport: value,
        })
      },
    }))
  )

  React.useEffect(() => {
    if (ppeSelect.name && !ppeData.isPpe && ppeData.whoPoliticallyExport) {
      setPeeData({
        ...ppeData,
        whoPoliticallyExport: '',
      })
      setPpeSelect({
        id: 0,
        name: '',
      })
    }
  }, [ppeData, ppeSelect.name, setPeeData])

  return (
    <s.ContainerPpeCard>
      <s.TextTitlePpeCard>{label.title}</s.TextTitlePpeCard>
      <s.TextPpeCard>{label.content}</s.TextPpeCard>
      <s.RadioOptionsWrapper data-testid="radio-ppe">
        <s.RadioPpeCard
          options={radioPpeOptions}
          checkedItem={ppeData.isPpe ? '1' : '2'}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setPeeData({
              ...ppeData,
              isPpe: e.currentTarget.value === '1',
            })
          }
        />
      </s.RadioOptionsWrapper>
      {ppeData.isPpe ? (
        <s.DelimiterWrapper>
          <s.Select
            label={label.label}
            options={ppeOption}
            selected={ppeSelect}
            data-testid="ppe-select"
          />
        </s.DelimiterWrapper>
      ) : null}
    </s.ContainerPpeCard>
  )
}

export default PpeCard
