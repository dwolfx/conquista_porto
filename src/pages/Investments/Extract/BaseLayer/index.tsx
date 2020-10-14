import React from 'react'
import { Container, Row, Col } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import Anbima from 'components/Anbima'
import Layer from 'components/Layer'
import Text from 'components/Text'

import {
  HeaderWrapper,
  LogoConquistaBeta,
  CloseIcon,
  SubHeader,
  TitleWrapper,
} from './styles'
import useMedia from 'hooks/useMedia'

interface IProps {
  id: string
  isOpen: boolean
  handleClose: () => void
  title: string
}

const BaseLayer: React.FC<IProps> = ({ id, isOpen, handleClose, title, children }) => {
  const isMobile = useMedia('sm')
  const marginTop = isMobile ? '0' : '28px'

  return (
    <Layer
      data-testid={`layer-${id}`}
      handleClose={handleClose}
      isOpen={isOpen}
      alignItems="center"
      headerContent={
        <HeaderWrapper>
          <LogoConquistaBeta />
          <CloseIcon
            data-gtm-subname={`botao fechar ${id}`}
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
          <Text type="headline" color="white" data-testid="text-investment-account">{title}</Text>
        </TitleWrapper>
      </SubHeader>
      <Container
        css={`
          margin-top: ${marginTop};
        `}
      >
        { children }
        <Row>
          <Col col={12}>
            <Anbima data-testid="ambima" />
          </Col>
        </Row>
      </Container>
    </Layer>
  )
}

export default BaseLayer
