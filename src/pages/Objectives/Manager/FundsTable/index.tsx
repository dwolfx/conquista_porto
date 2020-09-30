import React, { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'

import Card from 'components/Card'
import CardAccordion from 'components/Card/Accordion'
import FundDetails from 'components/Objective/FundDetails'
import Table from 'components/Table'

import useMedia from 'hooks/useMedia'
import { GetInvestmentDetailsRequest } from 'store/modules/Investment/Details/action'

import FundsCards from './Mobile'
import { columns } from './tableStructure'
import * as t from './types'
import * as s from './styles'

export default function FundsTable({
  funds,
  footer,
  icon,
  isAccordion = false,
  showInfoCardOnMobile = true,
  textInfo,
  title,
  type,
  ...rest
}: t.IProps) {
  const dispatch = useDispatch()
  const isMobile = useMedia('sm')
  const isTabletVertical = useMedia('md')

  const [fundDetailsOpen, setFundDetailsOpen] = useState(false)
  const [fundDetailsTitle, setFundDetailsTitle] = useState('')
  const [fundDetailsCategory, setFundDetailsCategory] = useState('')

  const menuActions: t.IActions = {
    invest: () => {
      console.log('invest')
    },
    redeem: () => {
      console.log('redeem')
    },
    attach: () => {
      console.log('attach')
    },
    info: fundInfo => {
      setFundDetailsOpen(true)
      setFundDetailsTitle(fundInfo.nickname)
      setFundDetailsCategory(fundInfo.arena_category)
      dispatch(GetInvestmentDetailsRequest(fundInfo.fund_id))
    },
  }

  const columnsToRender = useMemo(
    () => columns(menuActions, isTabletVertical),
    [menuActions, isTabletVertical]
  )

  const renderDetails = () =>
    fundDetailsOpen ? (
      <FundDetails
        isOpen={fundDetailsOpen}
        setIsOpen={setFundDetailsOpen}
        category={fundDetailsCategory}
        title={fundDetailsTitle}
      />
    ) : null

  if (!funds.length) {
    return null
  }

  if (isMobile) {
    return (
      <>
        <FundsCards
          funds={funds}
          footer={footer}
          menuActions={menuActions}
          showInfoCard={showInfoCardOnMobile}
          textInfo={textInfo}
          title={title}
          type={type}
        />

        {renderDetails()}
      </>
    )
  }

  const CardFunds: React.FC = ({ children }) => {
    if (isAccordion) {
      return (
        <CardAccordion title={title} icon={icon} initialHeight={0} {...rest}>
          {children}
        </CardAccordion>
      )
    }

    return (
      <Card headerTitle={title} headerIcon={icon} {...rest}>
        {children}
      </Card>
    )
  }

  return (
    <>
      <CardFunds>
        <s.CardBody>
          {textInfo}

          <s.PercentualInfos funds={funds} />

          <Table columns={columnsToRender} data={funds} />

          {footer}
        </s.CardBody>
      </CardFunds>

      {renderDetails()}
    </>
  )
}
