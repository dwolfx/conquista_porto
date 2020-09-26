import React, { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'

import Card from 'components/Card'
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

  const renderDetails = () => (
    <FundDetails
      isOpen={fundDetailsOpen}
      setIsOpen={setFundDetailsOpen}
      category={fundDetailsCategory}
      title={fundDetailsTitle}
    />
  )

  if (isMobile) {
    return (
      <>
        <FundsCards
          funds={funds}
          textInfo={textInfo}
          title={title}
          menuActions={menuActions}
          type={type}
          showInfoCard
        />

        {renderDetails()}
      </>
    )
  }

  return (
    <>
      <Card headerTitle={title} headerIcon={icon} {...rest}>
        <s.CardBody>
          {textInfo}

          <s.PercentualInfos funds={funds} />

          <Table columns={columnsToRender} data={funds} />

          {footer}
        </s.CardBody>
      </Card>

      {renderDetails()}
    </>
  )
}
