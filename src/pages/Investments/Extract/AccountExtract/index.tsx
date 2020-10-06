import React from 'react'
import 'styled-components/macro'
import { Container, Row, Col } from 'styled-bootstrap-grid'

import Anbima from 'components/Anbima'
import Card from 'components/Card'
import Layer from 'components/Layer'
import Text from 'components/Text'

import {
  HeaderWrapper,
  LogoConquistaBeta,
  CloseIcon,
  SubHeader,
  TitleWrapper,
} from './styles'

interface IProps {
  isOpen: boolean
  handleClose: () => void
}
const AccountExtract = ({ isOpen, handleClose }: IProps) => {
  return (
    <Layer
      data-testid="layer-account-extract"
      handleClose={handleClose}
      isOpen={isOpen}
      alignItems="center"
      headerContent={
        <HeaderWrapper>
          <LogoConquistaBeta />
          <CloseIcon
            data-gtm-subname="botao fechar extrato conta"
            data-gtm-name="botao fechar"
            data-gtm-type="click"
            data-gtm-clicktype="button"
            name="close"
            width={24}
            height={24}
            onClick={() => handleClose()}
          />
        </HeaderWrapper>
      }
    >
      <SubHeader data-testid="subheader">
        <TitleWrapper>
          <Text type="headline" color="gray4">Extrato da</Text>
          <Text type="headline" color="white">Conta de investimento</Text>
        </TitleWrapper>
      </SubHeader>
        <Container
          css={`
            margin-top: 28px;
          `}
        >
          <Row>
            <Col lg={3} md={12}>
              <Card
                data-testid="card-account-info"
                css={`
                  height: 410px;
                `}
              >Account Info</Card>
            </Col>
            <Col lg={9} md={12}>
              <Card
                data-testid="table-account-extract"
                css={`
                  height: 410px;
                `}
              >Table Extract</Card>
            </Col>
          </Row>
          <Row>
            <Col col={12}>
              <Anbima data-testid="ambima" />
            </Col>
          </Row>
        </Container>
    </Layer>
  )
}
export default AccountExtract
