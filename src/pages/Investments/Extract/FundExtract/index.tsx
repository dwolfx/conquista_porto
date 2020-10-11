import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import 'styled-components/macro'
import { Container, Row, Col } from 'styled-bootstrap-grid'

import Anbima from 'components/Anbima'
import Card from 'components/Card'
import FundDetailCard from 'components/FundDetail/Card'
import FundDetailDrawer from 'components/FundDetail/Drawer'
import FundDetailModal from 'components/FundDetail/Modal'
import Layer from 'components/Layer'
import Text from 'components/Text'

import Filter from './filter'
import ExtractTable from './extractTable'

import useMedia from 'hooks/useMedia'

import {
  HeaderWrapper,
  LogoConquistaBeta,
  CloseIcon,
  SubHeader,
  TitleWrapper,
  FundDetailContainer,
} from './styles'

interface IProps {
  isOpen: boolean
  handleClose: () => void
}
const FundExtract = ({ isOpen, handleClose }: IProps) => {
  const [isFundDetailOpen, setFundDetailOpen] = useState(false)
  const { idFund } = useSelector((state: any) => ({
    idFund: state.investmentPosition.idFund,
  }))
  const isMobile = useMedia('sm')

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
          <Text type="headline" color="gray4">
            Extrato de
          </Text>
          <Text
            type="headline"
            color="white"
            data-testid="text-investment-account"
          >
            Movimentações do fundo
          </Text>
        </TitleWrapper>
      </SubHeader>
      <Container
        css={`
          margin-top: 28px;
        `}
      >
        <Row>
          <Col lg={3} md={12}>
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
                height: 410px;
                padding: 21px 21px 0 21px;
              `}
            >
              <Filter />
              <ExtractTable dataTable={[]} />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col col={12}>
            <Anbima data-testid="ambima" />
          </Col>
        </Row>
      </Container>
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
    </Layer>
  )
}
export default FundExtract
