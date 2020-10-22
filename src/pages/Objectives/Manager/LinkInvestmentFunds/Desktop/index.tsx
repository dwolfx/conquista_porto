import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as S from './styles'
import { columns } from './columns'
import { ILinkableFunds } from '../types'
import { PutObjectiveFundsMovementRequest } from 'store/modules/ObjectiveManagement/action'
import { useToast } from 'hooks/toast'
import Button from 'components/Button'

export default function LinkInvestmentFundsDesktop({
  funds,
  onSuccess,
}: {
  funds: ILinkableFunds[]
  onSuccess?: () => void
}) {
  const { addToast } = useToast()
  const dispatch = useDispatch()
  const history = useHistory()
  const [linkableFunds, setLinkableFunds] = useState<ILinkableFunds[]>([])
  const [changedFunds, setChangedFunds] = useState<any[]>([])
  const tableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setLinkableFunds(funds.filter(linkableFundsRule))
  }, [funds])

  function linkableFundsRule({
    invested,
    fund_wallet_type,
  }: ILinkableFunds): boolean {
    return invested === 0 && fund_wallet_type === 'MANUAL'
  }

  function save() {
    const rows = tableRef.current?.querySelectorAll('div[role="row"]')
    if (!rows) return

    rows.forEach(row => {
      const input = row.querySelector('input')
      const inputValue = input?.value
      const inputFundId = input?.getAttribute('data-fundid')

      if (!inputValue || inputValue === '0,00') return
      setChangedFunds([
        ...changedFunds,
        {
          fund_id: inputFundId,
          value: inputValue,
        },
      ])
    })

    if (!changedFunds.length) {
      addToast({
        type: 'error',
        title: 'Escreva um valor para vincular',
      })
      return
    }

    dispatch(
      PutObjectiveFundsMovementRequest({
        data: {
          fund_list: changedFunds,
        },
        onSuccess,
        addToast,
      })
    )
  }

  return (
    <S.LinkInvestmentFunds data-testid="linkInvestmentFunds">
      <S.CardContainer>
        <S.CustomCard>
          <S.CustomTable
            customRef={tableRef}
            data={linkableFunds}
            columns={columns()}
          />
        </S.CustomCard>
      </S.CardContainer>
      <S.Footer>
        <S.FooterContainer>
          <Button outline={true} onClick={() => history.push('/investimentos')}>
            Gerenciar fundos
          </Button>
          <Button color="secondary" onClick={() => save()}>
            Salvar alterações
          </Button>
        </S.FooterContainer>
      </S.Footer>
    </S.LinkInvestmentFunds>
  )
}
