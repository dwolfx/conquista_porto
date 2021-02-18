import React from 'react'
import { TOptions, TSelected } from 'components/Inputs/Select/types'
import { capitalize } from 'helpers'
import { TextsConsortiumBuilding } from 'pages/ConsortiumBuilding/commons/Texts'
import { validationInputError } from 'pages/CreditCard/Creation/CreditCardStep/validators'
import { useSelector } from 'react-redux'
import { IJobsConsortiumBuildingState } from 'store/modules/ConsortiumBuilding/Jobs/types'
import { IFinancialCard } from '../types'

import * as s from './styles'

const FinancialCard: React.FC<IFinancialCard> = ({
  label,
  financialData: [financialData, setFinancialData],
}: IFinancialCard) => {
  const { formDefault } = TextsConsortiumBuilding()

  const [validForm, setValidForm] = React.useState<{
    grossMonthlyIncome: boolean
  }>({
    grossMonthlyIncome: false,
  })

  const { jobsConsortiumBuilding } = useSelector(
    (state: { jobsConsortiumBuilding: IJobsConsortiumBuildingState }) => ({
      jobsConsortiumBuilding: state.jobsConsortiumBuilding.data,
    })
  )

  const [jobsSelect, setJobsSelect] = React.useState<TSelected>({
    id: 0,
    name: '',
  })

  const [jobsOption, setJobsOption] = React.useState<TOptions[]>([])

  React.useEffect(() => {
    if (jobsConsortiumBuilding && jobsConsortiumBuilding?.profissoes) {
      setJobsOption(
        jobsConsortiumBuilding?.profissoes.map((value, index) => ({
          id: index + 1,
          text: value.descricao
            .split(' ')
            .map(character =>
              character.length > 2
                ? capitalize(character)
                : character.toLowerCase()
            )
            .join(' '),
          onClick: () => {
            setJobsSelect({
              id: index + 1,
              name: value.descricao
                .split(' ')
                .map(character =>
                  character.length > 2
                    ? capitalize(character)
                    : character.toLowerCase()
                )
                .join(' '),
            })
            setFinancialData({
              ...financialData,
              profession: value.descricao
                .split(' ')
                .map(character =>
                  character.length > 2
                    ? capitalize(character)
                    : character.toLowerCase()
                )
                .join(' '),
            })
          },
        }))
      )
    }
  }, [financialData, jobsConsortiumBuilding, setFinancialData])

  return (
    <s.WrapperFinancialCard>
      <s.DelimiterWrapper>
        <s.Select
          data-testid="select-jobs-id"
          label={label.profession}
          options={jobsOption}
          selected={jobsSelect}
          optionBoxSize={200}
        />
      </s.DelimiterWrapper>
      <s.DelimiterWrapper>
        <s.InputMoney
          data-testid="financial-money-input"
          value={financialData.grossMonthlyIncome}
          label={label.grossMonthlyIncome}
          placeholder={formDefault.placeholderInputMoney}
          onBlur={() => setValidForm({ grossMonthlyIncome: true })}
          onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
            setFinancialData({
              ...financialData,
              grossMonthlyIncome: target.value,
            })
          }
          error={validationInputError(
            financialData.grossMonthlyIncome,
            validForm.grossMonthlyIncome
          )}
        />
      </s.DelimiterWrapper>
    </s.WrapperFinancialCard>
  )
}

export default FinancialCard
