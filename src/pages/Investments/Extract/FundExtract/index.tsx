import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import 'styled-components/macro'
import { Row, Col } from 'styled-bootstrap-grid'

import Card from 'components/Card'
import FundDetailCard from './FundDetail'
import FundDetailDrawer from 'components/FundDetail/Drawer'
import FundDetailModal from 'components/FundDetail/Modal'
import useMedia from 'hooks/useMedia'

import BaseLayer from '../BaseLayer'
import TableFilter from './TableFilter'

import { FundDetailContainer, ColFundDetail } from './styles'
import { ISelectInterval, IInterval } from '../AccountExtract/types'
import { INTERVAL_SELECT_OPTIONS } from '../constants'

interface IProps {
  isOpen: boolean
  handleClose: () => void
}
const FundExtract = ({ isOpen, handleClose }: IProps) => {
  const [isFundDetailOpen, setFundDetailOpen] = useState(false)
  const [selectedInterval, setSelectedInterval] = useState<ISelectInterval>(
    INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION
  )
  const [interval, setInterval] = useState<IInterval>({
    startDate: '',
    endDate: '',
  })
  const { idFund, auth } = useSelector((state: any) => ({
    auth: state.auth,
    idFund: state.investmentPosition.idFund,
  }))

  const isMobile = useMedia('sm')

  return (
    <BaseLayer
      id="layer-fund-extract"
      handleClose={handleClose}
      isOpen={isOpen}
      title="Movimentações do fundo"
    >
      <Row>
        <ColFundDetail lg={3} md={12} sm={12} data-testid="card-fund-info">
          <FundDetailContainer>
            <FundDetailCard
              handleFundDetailOpen={() => setFundDetailOpen(true)}
              selectedFundId={idFund}
            />
          </FundDetailContainer>
        </ColFundDetail>
        <Col lg={9} md={12} data-testid="table-fund-extract">
          <Card
            css={`
              height: 460px;
              padding: 21px 21px 0 21px;
            `}
          >
            <TableFilter
              selectedInterval={selectedInterval}
              handleSelectInterval={setSelectedInterval}
              handleInterval={setInterval}
            />
          </Card>
        </Col>
      </Row>
      {isMobile ? (
        <FundDetailModal
          isOpen={isFundDetailOpen}
          handleClose={() => setFundDetailOpen(false)}
          isLayerOpen
          title="Detalhes do fundo"
        />
      ) : (
        <FundDetailDrawer
          isOpen={isFundDetailOpen}
          isLayerOpen
          handleClose={() => setFundDetailOpen(false)}
        />
      )}
    </BaseLayer>
  )
}
export default FundExtract
