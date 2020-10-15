import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import 'styled-components/macro'
import { Row, Col } from 'styled-bootstrap-grid'

import Card from 'components/Card'
import FundDetailCard from 'components/FundDetail/Card'
import FundDetailDrawer from 'components/FundDetail/Drawer'
import FundDetailModal from 'components/FundDetail/Modal'
import useMedia from 'hooks/useMedia'

import BaseLayer from '../BaseLayer'
import Filter from './filter'
import ExtractTable from './extractTable'
// import useFilterExtract from './useFilter'

// import useFilterExtract from './useFilter'

import {
  HeaderWrapper,
  LogoConquistaBeta,
  FundDetailContainer,
} from './styles'

interface IProps {
  isOpen: boolean
  handleClose: () => void
}

const FundExtract = ({ isOpen, handleClose }: IProps) => {
  const dispatch = useDispatch()
  const [isFundDetailOpen, setFundDetailOpen] = useState(false)
  const { idFund, selectedExtratFilter, auth } = useSelector((state: any) => ({
    auth: state.auth,
    idFund: state.investmentPosition.idFund,
    selectedExtratFilter: state.bankExtractFund.selectedFilter,
  }))
  const extractTableData = [
    {
      data: '30/12/2020',
      tipo: 'Aplicação',
      valor: 'R$ 90.000,00',
    },
    {
      data: '30/12/2020',
      tipo: 'Resgate',
      valor: 'R$ 5.000,00',
    },
    {
      data: '30/12/2020',
      tipo: 'Aplicação',
      valor: 'R$ 45.000,00',
    },
    {
      data: '30/12/2020',
      tipo: 'Aplicação',
      valor: 'R$ 90.000,00',
    },
    {
      data: '30/12/2020',
      tipo: 'Resgate',
      valor: 'R$ 5.000,00',
    },
    {
      data: '30/12/2020',
      tipo: 'Aplicação',
      valor: 'R$ 45.000,00',
    },
    {
      data: '30/12/2020',
      tipo: 'Aplicação',
      valor: 'R$ 90.000,00',
    },
    {
      data: '30/12/2020',
      tipo: 'Resgate',
      valor: 'R$ 5.000,00',
    },
    {
      data: '30/12/2020',
      tipo: 'Aplicação',
      valor: 'R$ 45.000,00',
    },
  ]
  const isMobile = useMedia('sm')

  return (
    <BaseLayer
      id="layer-fund-extract"
      handleClose={handleClose}
      isOpen={isOpen}
      title="Movimentações do fundo"
    >
      <Row>
        <Col lg={3} md={12}>
            <FundDetailCard
              handleFundDetailOpen={() => setFundDetailOpen(true)}
              selectedFundId={idFund}
              isRedeem={false}
            />
          </Col>
          <Col lg={9} md={12}>
            <Card
              data-testid="table-account-extract"
              css={`
                height: 410px;
                padding: 21px 21px 0 21px;
              `}
            >
              <Filter />
              <ExtractTable dataTable={extractTableData} />
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
