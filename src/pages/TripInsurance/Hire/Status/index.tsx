import React from 'react'
import { Row, Col } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import SuccessState from './Success'
import ErrorState from './Error'
import InsuranceSumary from './InsuranceSumary'
import StepBar from '../../commons/StepBar'

import * as S from './styles'
interface IProps {
  type: 'success' | 'error'
}
const Status = ({ type }: IProps) => {

  const renderStatus = () => {
    if (type === 'success') {
      return <SuccessState />
    }
    return <ErrorState type="errorRequest"/>
  }

  return (
    <>
      <StepBar showSteps={false} />
      <S.Container>
        <Row>
          <Col lg={3} md={4} sm={12}>
            <InsuranceSumary />
          </Col>
          <Col lg={9} md={8} sm={12}>
            <S.StatusCard 
              footer={
                <S.Button>inicio</S.Button>
              }
            >
              {renderStatus()}
            </S.StatusCard>
          </Col>
        </Row>
      </S.Container>
    </>
  )
}

export default Status