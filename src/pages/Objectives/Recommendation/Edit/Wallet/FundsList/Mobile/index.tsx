import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import Button from 'components/Button'
import ButtonIcon from 'components/Button/Icon'
import HorizontalList from 'components/HorizontalList'
import Loading from 'components/Loading'
import Text from 'components/Text'

import { formatMoney } from 'helpers'

import { RiskColorTag } from '../styles'
import { IMobileProps, IFundCard } from './types'
import * as s from './styles'

const FundCard = ({
  fund,
  onAddToWalletClick,
  onMoreInformationClick,
  fundsIdsAlreadyOnWallet,
}: IFundCard) => {
  const [isExpanded, setExpanded] = useState(false)

  return (
    <s.Card
      headerTitle={
        <Text type="headline" color="gray6" bold>
          {fund.nome_carteira}
        </Text>
      }
      headerEndItem={
        <ButtonIcon
          icon={isExpanded ? 'arrowup' : 'arrowdown'}
          onClick={() => setExpanded(expanded => !expanded)}
        />
      }
      footer={
        isExpanded ? (
          <s.FooterButtonWrapper>
            <Button outline onClick={() => onMoreInformationClick(fund)}>
              Mais informações
            </Button>
            <Button
              color="secondary"
              onClick={() => onAddToWalletClick(fund)}
              disabled={fundsIdsAlreadyOnWallet.includes(fund.id_carteira)}
            >
              Adicionar na carteira
            </Button>
          </s.FooterButtonWrapper>
        ) : null
      }
      key={fund.id_carteira}
    >
      <RiskColorTag borderRisk={fund.perfil_risco_ordem} />
      <HorizontalList
        size="small"
        startItems={[
          <Text color="gray5" bold>
            Aplicação mín.
          </Text>,
        ]}
        endItems={[
          <Text color="gray6" bold>
            {formatMoney(fund.minimo_inicial)}
          </Text>,
        ]}
      />
      <HorizontalList
        size="small"
        startItems={[
          <Text color="gray5" bold>
            Resgate (cotização)
          </Text>,
        ]}
        endItems={[
          <Text color="gray6" bold>
            {fund.resgate_cotizacao}
          </Text>,
        ]}
      />
      <HorizontalList
        size="small"
        startItems={[
          <Text color="gray5" bold>
            Rentabilidade mês
          </Text>,
        ]}
        endItems={[
          <Text color="gray6" bold>
            {fund.rentabil_fundo_mes}
          </Text>,
        ]}
      />
      {isExpanded ? (
        <>
          <HorizontalList
            size="small"
            startItems={[
              <Text color="gray5" bold>
                Rentabilidade últ. 12m
              </Text>,
            ]}
            endItems={[
              <Text color="gray6" bold>
                {fund.rentabil_fundo_12_meses}
              </Text>,
            ]}
          />
          <HorizontalList
            size="small"
            startItems={[
              <Text color="gray5" bold>
                Rentabilidade ano
              </Text>,
            ]}
            endItems={[
              <Text color="gray6" bold>
                {fund.rentabil_fundo_ano}
              </Text>,
            ]}
          />
          <HorizontalList
            size="small"
            startItems={[
              <Text color="gray5" bold>
                Taxa adm. (a.a.)
              </Text>,
            ]}
            endItems={[
              <Text color="gray6" bold>
                {fund.taxa_administracao}
              </Text>,
            ]}
          />
        </>
      ) : null}
    </s.Card>
  )
}

export default function FundsListMobile({ funds, ...rest }: IMobileProps) {
  const { isLoadingFundsList, hasErrorFundsList } = useSelector<any, any>(
    state => ({
      isLoadingFundsList: state.investmentsList.isLoading,
      hasErrorFundsList: state.investmentsList.hasError,
    })
  )

  if (isLoadingFundsList) {
    return (
      <s.Card>
        <s.LoadingContent>
          <Loading
            type="bar"
            legend="Buscando informações dos fundos de investimento"
          />
        </s.LoadingContent>
      </s.Card>
    )
  }

  if (hasErrorFundsList) {
    return (
      <s.Card>
        <s.LoadingContent>
          <Text type="headline" color="magenta2">
            Não foi possível carregar a lista de fundos. Por favor, tente
            novamente
          </Text>
          <Button>Tentar novamente</Button>
        </s.LoadingContent>
      </s.Card>
    )
  }

  return (
    <>
      {funds.map(fund => (
        <FundCard fund={fund} key={fund.id_carteira} {...rest} />
      ))}
    </>
  )
}
