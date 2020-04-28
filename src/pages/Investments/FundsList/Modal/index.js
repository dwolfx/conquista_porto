import React from 'react'
import PropTypes from 'prop-types'

import Modal from 'components/Modal/ModalEmpty'
import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'

import LogoConquistaBeta from 'assets/images/logoConquistaBeta.png'
import {
  HeaderColTitle,
  PrevButton,
  StepBar,
  ModalContent,
  ModalContentCol1,
  ModalContentCol2,
} from './styles'

const ModalInvestment = ({ ...rest }) => (
  <Modal {...rest} headerContent={<ModalHeader />} fullScreen>
    <StepBar>
      <HorizontalList
        size="small"
        startItems={[
          <Text color="gray4" type="headline">
            Investir
          </Text>,
        ]}
        endItems={[
          <Text color="gray4" type="headline">
            Etapa 1 de 2
          </Text>,
        ]}
        css={`
          width: 100%;
          padding: 0;
        `}
      />
    </StepBar>
    <ModalContent>
      <ModalContentCol1 />
      <ModalContentCol2 />
    </ModalContent>
  </Modal>
)

const ModalHeader = () => (
  <>
    <PrevButton
      data-gtm-subname="modal Investimentir"
      data-gtm-name="botao voltar step"
      data-gtm-type="click"
      data-gtm-clicktype="button"
      onClick={() => console.log('voltar')}
    />
    <HeaderColTitle style={{ flex: 1 }}>
      <img src={LogoConquistaBeta} alt="Logo Conquista Beta" />
    </HeaderColTitle>
  </>
)

ModalInvestment.propTypes = {
  isOpen: PropTypes.bool.isRequired,
}

export default ModalInvestment
