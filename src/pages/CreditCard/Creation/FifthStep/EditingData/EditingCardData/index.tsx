import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Drawer from 'components/Drawer'
import Loading from 'components/Loading'
import Modal from 'components/Modal/ModalNew'
import Select from 'components/Inputs/Select'
import SelectExpirationDays from '../../../ForthStep/Selects/ExpirationDays'
import { TOptions } from 'components/Inputs/Select/types'
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

  const [selectedFlagOption, setSelectedFlagOption] = useState<t.IOptions>({
    id: 1,
    name: 'Mastercard',
  })
  const [selectedDueDateOption, setSelectedDueDateOption] = useState<
    t.IOptions
  >({
    id: 1,
    name: '01',
  })

  const { isLoading } = useSelector((state: any) => ({
    isLoading: state.creditCardExpirationDays.isLoading,
  }))

  const handleFlagSelection = (
    prevState: t.IOptions,
    id: number,
    flagName: '' | 'Visa' | 'Mastercard'
  ) => {
    if (prevState !== { id: id, name: flagName }) {
      setSelectedDueDateOption({ id: 0, name: '' })
      return { id: id, name: flagName }
    } else {
      return prevState
    }
  }

  const flagOptions: TOptions[] = [
    {
      id: 1,
      text: 'Mastercard',
      onClick: () =>
        setSelectedFlagOption(prevState =>
          handleFlagSelection(prevState, 1, 'Mastercard')
        ),
    },
    {
      id: 2,
      text: 'Visa',
      onClick: () =>
        setSelectedFlagOption(prevState =>
          handleFlagSelection(prevState, 2, 'Visa')
        ),
    },
  ]

  //Initial value
  useEffect(() => {
    if (formData?.cardData?.flag) {
      setSelectedFlagOption(formData.cardData.flag)
    }
    if (formData?.cardData?.dueDate) {
      setSelectedDueDateOption(formData.cardData.dueDate)
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

  const getContent = () => {
    if (isLoading) {
      return (
        <s.LoadingWrapper>
          <Loading type="bar" />
        </s.LoadingWrapper>
      )
    }

    return (
      <>
        <s.Container>
          <s.SelectWrapper>
            <Select
              testId="data-bandeira"
              label="Bandeira"
              options={flagOptions}
              selected={selectedFlagOption}
            />
          </s.SelectWrapper>
          <s.SelectWrapper>
            <SelectExpirationDays
              type={
                selectedFlagOption.name === 'Mastercard' ? 'mastercard' : 'visa'
              }
              selectedOption={selectedDueDateOption}
              setSelectedOption={setSelectedDueDateOption}
            />
          </s.SelectWrapper>
        </s.Container>
      </>
    )
  }

  const saveChanges = () => {
    handleClose()
    setFormData({
      ...formData,
      cardData: {
        flag: selectedFlagOption,
        invoiceExpiration: selectedDueDateOption,
      },
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
