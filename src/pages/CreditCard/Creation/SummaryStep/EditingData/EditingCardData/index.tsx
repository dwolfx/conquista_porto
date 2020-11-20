import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Drawer from 'components/Drawer'
import Loading from 'components/Loading'
import Modal from 'components/Modal/ModalNew'
import SelectCardFlag from 'pages/CreditCard/Creation/common/SelectCardFlag'
import { FLAGS } from 'pages/CreditCard/Creation/types'
import SelectExpirationDays from '../../../CreditCardStep/Selects/ExpirationDays'
import useMedia from 'hooks/useMedia'

import * as s from './styles'
import * as t from './types'

const EditingCardData: React.FC<t.ICardData> = ({
  isOpen,
  handleClose,
  formData,
  setFormData,
  ...rest
}) => {
  const isMobile = useMedia('sm')

  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const [selectedFlagOption, setSelectedFlagOption] = useState<FLAGS | ''>('')
  const [selectedDueDateOption, setSelectedDueDateOption] = useState<
    t.IOptions
  >({
    id: 0,
    name: '',
  })

  const { isLoading } = useSelector((state: any) => ({
    isLoading: state.creditCardExpirationDays.isLoading,
  }))

  //Initial value
  useEffect(() => {
    if (formData?.codigoBandeira) {
      setSelectedFlagOption(formData.codigoBandeira as FLAGS)
    }
    if (formData?.diaVencimento) {
      setSelectedDueDateOption({
        id: formData.diaVencimento,
        name: formData.diaVencimento,
      })
    }
  }, [formData])

  //set button disabled
  useEffect(() => {
    if (isLoading || selectedDueDateOption.id === 0) {
      setIsButtonDisabled(true)
    } else {
      setIsButtonDisabled(false)
    }
  }, [isLoading, selectedDueDateOption])

  const handleFlagChanging = (option: FLAGS | '') => {
    setSelectedFlagOption(prevState => {
      if (prevState !== option) {
        setSelectedDueDateOption({ id: 0, name: '' })
      }
      return option
    })
  }

  const getContent = () => {
    if (isLoading) {
      return (
        <s.LoadingWrapper>
          <Loading type="bar" />
        </s.LoadingWrapper>
      )
    }

    return (
      <s.Container>
        <s.SelectWrapper>
          <SelectCardFlag
            selectedOption={selectedFlagOption}
            setSelectedOption={handleFlagChanging}
          />
        </s.SelectWrapper>
        <s.SelectWrapper>
          <SelectExpirationDays
            type={selectedFlagOption as FLAGS}
            selectedOption={selectedDueDateOption}
            setSelectedOption={setSelectedDueDateOption}
          />
        </s.SelectWrapper>
      </s.Container>
    )
  }

  const saveChanges = () => {
    handleClose()
    setFormData({
      ...formData,
      codigoBandeira: selectedFlagOption,
      diaVencimento: selectedDueDateOption.name,
    })
  }

  const footerButton = () => (
    <s.Button
      disabled={isButtonDisabled}
      data-gtm-type="click"
      data-gtm-clicktype="button"
      data-gtm-subname={'edição de dados do cartão - cartão de crédito'}
      data-gtm-name="salvar alterações"
      onClick={() => saveChanges()}
    >
      SALVAR ALTERAÇÕES
    </s.Button>
  )

  if (isMobile) {
    return (
      <Modal
        isOpen={isOpen}
        handleClose={handleClose}
        modalTitle="Alterar dados do cartão"
        footer={footerButton()}
        {...rest}
      >
        {getContent()}
      </Modal>
    )
  } else {
    return (
      <Drawer
        size="sm"
        isOpen={isOpen}
        handleClose={handleClose}
        drawerTitle="Alterar dados do cartão"
        footer={footerButton()}
        {...rest}
      >
        {getContent()}
      </Drawer>
    )
  }
}

export default EditingCardData
