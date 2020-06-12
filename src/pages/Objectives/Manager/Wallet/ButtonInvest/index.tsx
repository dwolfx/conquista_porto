import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useToast } from 'hooks/toast'

import { GetSuitabilityInfoAndValidate } from 'store/modules/SuitabilityInfo/action'

import Modal from 'components/Modal/ModalNew'
import Text from 'components/Text'
import { handleGiwRedirect } from 'helpers'

import { ButtonBlock, ButtonModal, ButtonWrapper, IconButoon } from './styles'

import 'styled-components/macro'

interface IButtonInvest {
  id: number
  name: string
  is_fund_active?: boolean
}

interface IButtonProps {
  fund: IButtonInvest
  idGoal: number
}

const modalSuitabilityInfoInitialState = {
  isOpen: false,
  title: '',
  description: '',
  button: {
    buttonName: '',
    dataGtmName: '',
    dataGtmType: '',
    dataGtmClicktype: '',
    handleClick: () => {},
  },
}

const ButtonInvest = ({ fund, idGoal }: IButtonProps) => {
  const dispatch = useDispatch()
  const { addToast } = useToast()

  const [modalSuitabilityInfo, setModalSuitabilityInfo] = useState(
    modalSuitabilityInfoInitialState
  )

  const handleClickInvestButton = () => {
    const onSuccess = (data: any) => {
      setModalSuitabilityInfo({ ...data })
      if (data.isValid) {
        handleGiwRedirect(
          `portaldecliente/conquista/aplicacao?idFundo=${fund.id}&r=true&idObjetivo=${idGoal}`
        )
      }
    }
    dispatch(GetSuitabilityInfoAndValidate(onSuccess, 'investir', addToast))
  }

  return (
    <>
      <Modal
        modalTitle={modalSuitabilityInfo.title}
        isOpen={modalSuitabilityInfo.isOpen}
        handleClose={() =>
          setModalSuitabilityInfo({
            ...modalSuitabilityInfo,
            isOpen: false,
          })
        }
      >
        <Text type="headline">{modalSuitabilityInfo.description}</Text>
        <>
          {modalSuitabilityInfo.button && (
            <ButtonWrapper>
              <ButtonModal
                data-gtm-name={modalSuitabilityInfo.button.dataGtmName}
                data-gtm-type={modalSuitabilityInfo.button.dataGtmType}
                data-gtm-clicktype={
                  modalSuitabilityInfo.button.dataGtmClicktype
                }
                onClick={
                  modalSuitabilityInfo.button.handleClick
                    ? modalSuitabilityInfo.button.handleClick
                    : () =>
                        setModalSuitabilityInfo({
                          ...modalSuitabilityInfo,
                          isOpen: false,
                        })
                }
              >
                {modalSuitabilityInfo.button.buttonName}
              </ButtonModal>
            </ButtonWrapper>
          )}
        </>
      </Modal>
      <ButtonBlock
        disabled={!fund.is_fund_active}
        data-gtm-type="click"
        data-gtm-clicktype="button"
        data-gtm-subname={fund.name}
        data-gtm-name="Investir"
        onClick={() => handleClickInvestButton()}
      >
        <>
          {!fund.is_fund_active && (
            <IconButoon name="lock2" color="gray4" width="22" />
          )}
          Investir
        </>
      </ButtonBlock>
    </>
  )
}

export default ButtonInvest
