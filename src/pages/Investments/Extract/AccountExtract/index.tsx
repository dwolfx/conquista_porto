import React from 'react'
import { Row, Col } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import Card from 'components/Card'

import BaseLayer from '../BaseLayer'
import InvestmentAccountDetail from '../InvestmentAccountDetail'

export const initialFilters = {
  interval: {
    startDate: '',
    endDate: ''
  },
  entry: false,
  withdraw: false
}

interface IProps {
  isOpen: boolean
  handleClose: () => void
}
const AccountExtract = ({ isOpen, handleClose }: IProps) => {
  return (
    <BaseLayer
      handleClose={handleClose}
      isOpen={isOpen}
      id="extrato-conta"
      title="Conta de investimento"
    >
      <Row>
        <Col lg={3} md={12}>
          <InvestmentAccountDetail />
        </Col>
        <Col lg={9} md={12}>
          <Card
            data-testid="table-account-extract"
            css={`
              height: 410px;
            `}
          >
            table content
          </Card>
        </Col>
      </Row>
    </BaseLayer>
  )
}
export default AccountExtract
