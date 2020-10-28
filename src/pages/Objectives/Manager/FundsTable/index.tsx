import React, { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'

import Card from 'components/Card'
import CardAccordion from 'components/Card/Accordion'
import FundDetails from 'components/Objective/FundDetails'
import Table from 'components/Table'

import useMedia from 'hooks/useMedia'

import { GetInvestmentDetailsRequest } from 'store/modules/Investment/Details/action'
import { TObjectiveFunds } from 'store/modules/ObjectiveManagement/types'

import InvestLayer from './Actions/Invest'
import RedeemDrawer from './Actions/Redeem'
import LinkDrawer from './Actions/Link'
import ExtractLayer from './Actions/Extract'
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

  const [isInvestLayerOpen, setInvestLayerOpen] = useState(false)
  const [fundDetailsOpen, setFundDetailsOpen] = useState(false)
  const [fundsDetailsSelected, setFundsDetailsSelected] = useState<
    TObjectiveFunds | undefined
  >(undefined)
  const [isRedeemActionOpen, setRedeemActionOpen] = useState(false)
  const [isLinkActionOpen, setLinkActionOpen] = useState(false)
  const [isExtractLayerOpen, setExtractLayerOpen] = useState(false)

  const menuActions: t.IActions = {
    invest: fundInfo => {
      setInvestLayerOpen(true)
      setFundsDetailsSelected(fundInfo)
    },
    redeem: fundInfo => {
      setRedeemActionOpen(true)
      setFundsDetailsSelected(fundInfo)
    },
    link: fundInfo => {
      setLinkActionOpen(true)
      setFundsDetailsSelected(fundInfo)
    },
    extract: fundInfo => {
      setExtractLayerOpen(true)
      setFundsDetailsSelected(fundInfo)
    },
    info: fundInfo => {
      setFundDetailsOpen(true)
      setFundsDetailsSelected(fundInfo)
      dispatch(GetInvestmentDetailsRequest(fundInfo.fund_id))
    },
  }

  const columnsToRender = useMemo(
    () => columns(menuActions, isTabletVertical),
    [menuActions, isTabletVertical]
  )

  const renderActions = () => (
    <>
      {isInvestLayerOpen && fundsDetailsSelected ? (
        <InvestLayer
          isOpen={isInvestLayerOpen}
          handleClose={() => setInvestLayerOpen(false)}
          fund={fundsDetailsSelected}
        />
      ) : null}

      {isRedeemActionOpen && fundsDetailsSelected ? (
        <RedeemDrawer
          isOpen={isRedeemActionOpen}
          handleClose={() => setRedeemActionOpen(false)}
          fund={fundsDetailsSelected}
        />
      ) : null}

      {isLinkActionOpen && fundsDetailsSelected ? (
        <LinkDrawer
          isOpen={isLinkActionOpen}
          handleClose={() => setLinkActionOpen(false)}
          fund={fundsDetailsSelected}
          type={type}
        />
      ) : null}

      {isExtractLayerOpen && fundsDetailsSelected ? (
        <ExtractLayer
          isOpen={isExtractLayerOpen}
          handleClose={() => setExtractLayerOpen(false)}
          fund={fundsDetailsSelected}
        />
      ) : null}

      {fundDetailsOpen && fundsDetailsSelected ? (
        <FundDetails
          isOpen={fundDetailsOpen}
          setIsOpen={setFundDetailsOpen}
          category={fundsDetailsSelected.arena_category}
          title={fundsDetailsSelected.nickname}
        />
      ) : null}
    </>
  )

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

        {renderActions()}
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

      {renderActions()}
    </>
  )
}
