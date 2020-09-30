import React, { useCallback, useState } from 'react'
import { uuid } from 'uuidv4'
import 'styled-components/macro'

import Button from 'components/Button'
import Card from 'components/Card'
import HorizontalList from 'components/HorizontalList'
import Icon from 'components/IconExporter'
import PercentualInfos from 'components/Objective/PercentualInfo'
import Text from 'components/Text'

import { Currency } from 'helpers/money'
import { TObjectiveFunds } from 'store/modules/ObjectiveManagement/types'

import { generateActionMenuOptions } from '../utils'
import * as t from '../types'
import * as s from './styles'

export default function({
  funds,
  footer,
  menuActions,
  title,
  textInfo,
  showInfoCard,
}: Omit<t.IProps, 'icon'> & t.IMobileProps) {
  const [backdropIsOpen, setBackdropOpen] = useState(false)
  const [selectedFund, setSelectedFund] = useState<TObjectiveFunds | undefined>(
    undefined
  )

  const renderBackdropMenuOptions = useCallback(() => {
    if (!selectedFund) {
      return null
    }

    const menuOptions = generateActionMenuOptions(selectedFund, menuActions)

    return menuOptions.map(option =>
      option.text && option.icon && option.onClick ? (
        <s.ActionMenuOption
          key={`action-menu-option-${uuid()}`}
          onClick={() => {
            if (option.onClick) {
              option.onClick()
            }

            setBackdropOpen(false)
          }}
          data-gtm-subname={`item ${option.text}`}
          data-gtm-name="menu de ações"
          data-gtm-type="click"
          data-gtm-clicktype="button"
        >
          <Icon name={option.icon} />
          <Text type="headline" color="gray6" bold>
            {option.text}
          </Text>
        </s.ActionMenuOption>
      ) : null
    )
  }, [selectedFund, menuActions])

  const renderCards = () =>
    funds.map(fund => (
      <s.AccordionCard
        initialHeight={70}
        title={
          <s.FundCardHeader>
            <Text type="headline" color="gray6" bold>
              {fund.nickname}
            </Text>
            <Text color="gray5" bold>
              {fund.arena_category}
            </Text>
          </s.FundCardHeader>
        }
        footer={
          <Button
            onClick={() => {
              setSelectedFund(fund)
              setBackdropOpen(true)
            }}
            data-gtm-subname={`ações do fundo ${fund.fund_id}`}
            data-gtm-name="abre menu de ações"
            data-gtm-type="click"
            data-gtm-clicktype="button"
            css={`
              width: 100%;
            `}
          >
            Ver ações
          </Button>
        }
        key={`fund-card-${fund.fund_id}`}
      >
        <s.RiskColorTag borderRisk={fund.order_profile_risk} />
        <s.FundCardContent>
          <HorizontalList
            startItems={[
              <Text color="gray5" bold>
                Investimento inicial
              </Text>,
            ]}
            endItems={[
              <Text type="title" color="gray6" bold>
                {Currency.parse(fund.initial_value, true)}
              </Text>,
            ]}
            size="small"
          />
          <HorizontalList
            startItems={[
              <Text color="gray5" bold>
                Disponível
              </Text>,
            ]}
            endItems={[
              <Text type="title" color="gray6" bold>
                {Currency.parse(fund.available, true)}
              </Text>,
            ]}
            size="small"
          />
          <HorizontalList
            startItems={[
              <Text color="gray5" bold>
                Saldo bruto
              </Text>,
            ]}
            endItems={[
              <Text type="title" color="gray6" bold>
                {Currency.parse(fund.balance, true)}
              </Text>,
            ]}
            size="small"
          />
        </s.FundCardContent>
      </s.AccordionCard>
    ))

  return (
    <>
      {showInfoCard ? (
        <Card headerTitle={title}>
          <s.CardBody>
            {textInfo}

            <PercentualInfos funds={funds} />
          </s.CardBody>
        </Card>
      ) : null}

      {renderCards()}

      {footer ? footer : null}

      <s.Backdrop
        isOpen={backdropIsOpen}
        handleClose={() => setBackdropOpen(false)}
      >
        {renderBackdropMenuOptions()}
      </s.Backdrop>
    </>
  )
}
