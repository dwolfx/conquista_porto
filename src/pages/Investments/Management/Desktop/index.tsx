import React, { useState } from 'react'

import ChartPosition from './ChartPosition'
import InvestorAccount from './InvestorAccount'
import { RowContent, LeftContent, MainContent } from './styles'
import Modal from 'components/Modal/Confirmation'

export interface IModalProps {
  isOpen: boolean
  title: string
  description: string
  button: IButton
}
interface IButton {
  dataGtmName: string
  dataGtmType: string
  dataGtmClicktype: string
  handleClick: any
  buttonName: string
}

export const modalSuitabilityInfoInitialState: IModalProps = {
  isOpen: false,
  title: '',
  description: '',
  button: {
    buttonName: '',
    dataGtmName: '',
    dataGtmType: '',
    dataGtmClicktype: '',
    handleClick: null,
  },
}

const Desktop: React.FC = () => {
  const [modalSuitabilityInfo, setModalSuitabilityInfo] = useState<IModalProps>(
    modalSuitabilityInfoInitialState
  )
  return (
    <>
      <RowContent>
        <LeftContent xl={3}>
          <ChartPosition />
          <InvestorAccount
            onChangeModalSuitabilityInfo={setModalSuitabilityInfo}
          />
        </LeftContent>
        <MainContent xl={9}>
          {/* Informações do fundo e saldos, Tabela de rentabilidade... */}
        </MainContent>
      </RowContent>
      <Modal
        title={modalSuitabilityInfo.title}
        description={modalSuitabilityInfo.description}
        isOpen={modalSuitabilityInfo.isOpen}
        buttonTextCancel="Cancelar"
        buttonTextConfirm={modalSuitabilityInfo.button.buttonName}
        onClose={() =>
          setModalSuitabilityInfo({
            ...modalSuitabilityInfo,
            isOpen: false,
          })
        }
        onConfirmation={() => modalSuitabilityInfo.button.handleClick()}
      ></Modal>
    </>
  )
}

export default Desktop
