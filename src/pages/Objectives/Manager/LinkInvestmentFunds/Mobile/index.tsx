import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Currency } from 'helpers/money'
import { GetInvestmentDetailsRequest } from 'store/modules/Investment/Details/action'

import ButtonIcon from 'components/Button/Icon'
import Icon from 'components/IconExporter'
import Text from 'components/Text'
import LinkFundModal from 'pages/Objectives/Manager/FundsTable/Actions/Link'

import { ILinkableFunds } from '../types'
import * as S from './styles'
import FundDetailModal from 'components/FundDetail/Modal'

export default function LinkInvestmentFundsMobile({
  funds,
  onSuccess,
}: {
  funds: ILinkableFunds[]
  onSuccess?: () => void
}) {
  enum Modal {
    LINKFUND,
    FUNDINFO,
    BACKDROP,
  }

  const dispatch = useDispatch()
  const [selectedFund, setSelectedFund] = useState<ILinkableFunds | null>(null)
  const [isBackdropOpen, setBackdropOpen] = useState(false)
  const [isLinkFundModalOpen, setLinkFundModalOpen] = useState(false)
  const [isInfoFundModalOpen, setInfoFundModalOpen] = useState(false)
  const [expandedList, setExpandedList] = useState<number[]>([])
  const [linkableFunds, setLinkableFunds] = useState<ILinkableFunds[]>([])
  const history = useHistory()

  useEffect(() => {
    setLinkableFunds(funds.filter(linkableFundsRule))
  }, [funds])

  function onClickFundHandler(fund: ILinkableFunds): void {
    setSelectedFund(fund)
    dispatch(GetInvestmentDetailsRequest(fund.fund_id))
    modalManager(Modal.BACKDROP)
  }

  function linkableFundsRule({
    invested,
    fund_wallet_type,
  }: ILinkableFunds): boolean {
    return invested === 0 && fund_wallet_type === 'MANUAL'
  }

  function hasFundInList(fund_id: number): boolean {
    return expandedList.includes(fund_id)
  }

  function toggeFundInList(fund_id: number): void {
    if (hasFundInList(fund_id)) {
      setExpandedList(expandedList.filter(id => id !== fund_id))
    } else {
      setExpandedList([...expandedList, fund_id])
    }
  }

  function modalManager(modalOpen: Modal) {
    setBackdropOpen(false)
    setLinkFundModalOpen(false)
    setInfoFundModalOpen(false)

    switch (modalOpen) {
      case Modal.LINKFUND:
        setLinkFundModalOpen(true)
        break
      case Modal.FUNDINFO:
        setInfoFundModalOpen(true)
        break
      case Modal.BACKDROP:
        setBackdropOpen(true)
        break
    }
  }

  return (
    <div data-testid="linkInvestmentFunds">
      <S.CustomContainer>
        {linkableFunds.map(
          (
            {
              fund_id,
              nickname,
              arena_category,
              order_profile_risk,
              balance,
              available,
            },
            index
          ) => (
            <S.CustomCard key={fund_id}>
              <S.RiskColor colorRisk={order_profile_risk} />
              <S.Content>
                <S.CustomHorizontalList
                  startItems={[
                    <S.Vertical>
                      <Text type="headline" bold color="gray6">
                        {nickname}
                      </Text>
                      <Text type="body" bold color="gray5">
                        {arena_category}
                      </Text>
                    </S.Vertical>,
                  ]}
                  endItems={[
                    <S.Vertical>
                      <ButtonIcon
                        role="button"
                        icon={hasFundInList(fund_id) ? 'arrowup' : 'arrowdown'}
                        onClick={() => toggeFundInList(fund_id)}
                      />
                    </S.Vertical>,
                  ]}
                />
              </S.Content>
              <S.CustomDivisor />
              <S.Content>
                <S.CustomHorizontalList
                  startItems={[
                    <S.Vertical>
                      <Text color="gray5" type="body">
                        Saldo bruto
                      </Text>
                      <Text color="gray5" type="body">
                        Disponível
                      </Text>
                    </S.Vertical>,
                  ]}
                  endItems={[
                    <S.Vertical>
                      <Text textAlign="right" color="gray6" type="title" bold>
                        {Currency.parse(balance, true)}
                      </Text>
                      <Text textAlign="right" color="gray6" type="title" bold>
                        {Currency.parse(available, true)}
                      </Text>
                    </S.Vertical>,
                  ]}
                />
              </S.Content>
              {hasFundInList(fund_id) && (
                <>
                  <S.CustomDivisor />
                  <S.Content>
                    <S.CardButton
                      onClick={() => onClickFundHandler(linkableFunds[index])}
                      color="primary"
                    >
                      Ver ações
                    </S.CardButton>
                  </S.Content>
                </>
              )}
            </S.CustomCard>
          )
        )}
        <S.ManagerButton
          onClick={() => history.push('/investimentos')}
          color="primary"
          outline={true}
        >
          Gerenciar fundos
        </S.ManagerButton>
      </S.CustomContainer>

      <S.CustomBackdrop
        handleClose={() => setBackdropOpen(false)}
        isOpen={isBackdropOpen}
      >
        <S.ActionMenuOption onClick={() => modalManager(Modal.LINKFUND)}>
          <Icon name="money" />
          <Text type="headline" color="gray6" bold>
            Vincular disponível ao objetivo
          </Text>
        </S.ActionMenuOption>
        <S.ActionMenuOption onClick={() => modalManager(Modal.FUNDINFO)}>
          <Icon name="information" />
          <Text type="headline" color="gray6" bold>
            Mais informações
          </Text>
        </S.ActionMenuOption>
      </S.CustomBackdrop>

      {selectedFund && (
        <LinkFundModal
          isOpen={isLinkFundModalOpen}
          handleClose={() => setLinkFundModalOpen(false)}
          fund={selectedFund}
          type="initial"
        />
      )}

      {selectedFund && (
        <FundDetailModal
          title={selectedFund.nickname}
          category={selectedFund.arena_category}
          isOpenForInvestments
          isLayerOpen
          isOpen={isInfoFundModalOpen}
          handleClose={() => setInfoFundModalOpen(false)}
        />
      )}
    </div>
  )
}
