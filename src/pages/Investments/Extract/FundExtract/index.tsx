import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import 'styled-components/macro'
import { Row, Col } from 'styled-bootstrap-grid'

import Card from 'components/Card'
import FundDetailCard from 'components/FundDetail/Card'
import FundDetailDrawer from 'components/FundDetail/Drawer'
import FundDetailModal from 'components/FundDetail/Modal'
import useMedia from 'hooks/useMedia'

import BaseLayer from '../BaseLayer'
import Filter from './filter'
import TableFilter from './TableFilter'
import ExtractTable from './extractTable'

import {
  FundDetailContainer,
} from './styles'
import { ISelectInterval, IInterval } from '../AccountExtract/types'
import { INTERVAL_SELECT_OPTIONS } from '../constants'

interface IProps {
  isOpen: boolean
  handleClose: () => void
}
const FundExtract = ({ isOpen, handleClose }: IProps) => {
  // const dispatch = useDispatch()
  const [isFundDetailOpen, setFundDetailOpen] = useState(false)
  const [selectedInterval, setSelectedInterval] = useState<ISelectInterval>(INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION)
  // const [filters, setFilters] = useState<IFilter>({ ...initialFilters })
  const [interval, setInterval] = useState<IInterval>({ startDate: '', endDate: '' })
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
        <Col lg={3} md={12} sm={12}>
          <FundDetailContainer>
            <FundDetailCard
              handleFundDetailOpen={() => setFundDetailOpen(true)}
              selectedFundId={idFund}
              isRedeem={false}
            />
          </FundDetailContainer>
        </Col>
        <Col lg={9} md={12}>
          <Card
            data-testid="table-account-extract"
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
            {/* <Filter /> */}
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
