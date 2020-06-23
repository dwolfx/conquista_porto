import React from 'react'

import Divisor from 'components/Divisor'
import TabDetails from 'pages/Objectives/Recommendation/WalletSection/Detail/TabDetails'
import TabMoreInfo from 'pages/Objectives/Recommendation/WalletSection/Detail/TabMoreInfo'
import TabProfitability from 'pages/Objectives/Recommendation/WalletSection/Detail/TabProfitability'
import { IFunds } from 'store/modules/Objective/types'

import { Accordion, HeaderTitle, Modal, ModalBodyWrapper } from './styles'

interface ITributeIR {
  1?: number
  180?: number
  360?: number
  720?: number
  721?: number
}

interface IProps {
  fundDetails: IFunds
  isOpen: boolean
  handleClose: () => void
}

const DetailModal = ({ fundDetails, isOpen, handleClose }: IProps) => {
  const renderModalBody = () => (
    <ModalBodyWrapper>
      <Accordion
        bodyPadding="0px"
        titleNode={<HeaderTitle>Detalhes</HeaderTitle>}
        openByDefault
        triggerCloseOnArrow
      >
        <Divisor />
        <TabDetails fund={fundDetails} />
      </Accordion>
      <Divisor />
      <Accordion
        bodyPadding="0px"
        titleNode={<HeaderTitle>Rentabilidade</HeaderTitle>}
        openByDefault={false}
        triggerCloseOnArrow
      >
        <Divisor />
        <TabProfitability fund={fundDetails} />
      </Accordion>
      <Divisor />
      <Accordion
        bodyPadding="0px"
        titleNode={<HeaderTitle>Informações</HeaderTitle>}
        openByDefault={false}
        triggerCloseOnArrow
      >
        <Divisor />
        <TabMoreInfo fund={fundDetails} />
      </Accordion>
    </ModalBodyWrapper>
  )

  return (
    <Modal
      modalTitle={fundDetails.name}
      modalSubtitle={fundDetails.arena_category}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      {renderModalBody()}
    </Modal>
  )
}

export default DetailModal
