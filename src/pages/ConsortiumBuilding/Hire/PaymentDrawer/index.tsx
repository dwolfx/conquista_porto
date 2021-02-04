import React from 'react'
import { ThemeContext } from 'styled-components'

import Drawer from 'components/Drawer'
import IconExporter from 'components/IconExporter'
import Modal from 'components/Modal/ModalNew'
import Text from 'components/Text'

import useMedia from 'hooks/useMedia'

import { formatMoney } from 'helpers'
import { texts } from 'pages/ConsortiumBuilding/commons/Texts'
import { TSelected } from 'components/Inputs/Select/types'

import * as s from './styles'
import * as i from './types'

const ChangePaymentData: React.FC<i.IChangePaymentData> = ({
  isOpen,
  handleClose,
  ...rest
}) => {
  const { hire, buttons } = texts()
  const isMobile = useMedia('sm')
  const theme = React.useContext(ThemeContext)

  const [paymentMethodSelected, setPaymentMethodSelected] = React.useState<
    number
  >(1)
  const [selectedBank, setSelectedBank] = React.useState<TSelected>({
    id: 0,
    name: '',
  })
  const [
    selectedAdministrationFeeSelect,
    setSelectedAdministrationFeeSelect,
  ] = React.useState<TSelected>({
    id: 0,
    name: '',
  })
  const [bankAgency, setBankAgency] = React.useState<string>('')
  const [bankAccount, setBankAccount] = React.useState<string>('')
  const [bankAccountDigit, setBankAccountDigit] = React.useState<string>('')

  const handleClick = () => {
    handleClose()
    return null
  }

  const renderContent = () => (
    <s.Wrapper>
      <s.HeadlineText>
        {hire.steps.payment.containerSecond.subtitle}
      </s.HeadlineText>
      <s.OptionWrapper
        paymentMethodIsSelected={paymentMethodSelected === 1}
        border
      >
        <s.StyledRadio
          id="debito-automatico"
          name="debito-automatico"
          value=""
          checked={paymentMethodSelected === 1}
          handleChange={() => {
            setPaymentMethodSelected(1)
          }}
        />
        <IconExporter
          name="calendar"
          width={35}
          fill={
            paymentMethodSelected === 1
              ? theme.colors.blue4
              : theme.colors.gray4
          }
        />
        <s.TextWrapper marginLeft>
          <Text type="title" bold color="gray6">
            {hire.steps.payment.containerSecond.checkboxDebit.title}
          </Text>
          <Text type="caption" bold color="gray5">
            {hire.steps.payment.containerSecond.checkboxDebit.subtitle}
          </Text>
        </s.TextWrapper>
      </s.OptionWrapper>
      <s.OptionWrapper height={49} noPadding>
        <s.StyledRadio
          id="boleto"
          name="boleto"
          value=""
          checked={paymentMethodSelected === 2}
          handleChange={() => {
            setPaymentMethodSelected(2)
          }}
        />
        <s.TextWrapper>
          <Text type="title" bold color="gray6">
            {hire.steps.payment.containerSecond.checkboxBillet.title}
          </Text>
          <Text type="caption" bold color="gray5">
            {hire.steps.payment.containerSecond.checkboxBillet.subtitle}
          </Text>
        </s.TextWrapper>
      </s.OptionWrapper>
      <s.HeadlineText marginTop>
        {`${hire.steps.payment.containerThird.subtitle} ${formatMoney(
          1345.29
        )}*.`}
      </s.HeadlineText>
      <s.BodyText>{hire.steps.payment.containerThird.caption}</s.BodyText>
      <s.BankSelect selectedState={[selectedBank, setSelectedBank]} />
      <s.BankAgency inputState={[bankAgency, setBankAgency]} />
      <s.BankAccount inputState={[bankAccount, setBankAccount]} />
      <s.BankAccountDigit
        inputState={[bankAccountDigit, setBankAccountDigit]}
      />
      <s.PanelWrapper>
        <s.AlertText>
          {hire.steps.payment.containerThird.messageImportant.title}
        </s.AlertText>
        <Text bold>
          {hire.steps.payment.containerThird.messageImportant.article.textFirst}
        </Text>
        <Text bold>
          {
            hire.steps.payment.containerThird.messageImportant.article
              .textSecond
          }
        </Text>
      </s.PanelWrapper>
      <s.Divisor />
      <s.HeadlineText>
        {hire.steps.payment.containerThird.rate.title}
      </s.HeadlineText>
      <s.BodyText>{hire.steps.payment.containerThird.rate.subtitle}</s.BodyText>
      <s.AdministrationFeeSelect
        selectedState={[
          selectedAdministrationFeeSelect,
          setSelectedAdministrationFeeSelect,
        ]}
      />
      <s.InstallmentsWrapper>
        <s.InstallmentLabel>
          <Text type="caption" bold color="gray5">
            Parcelas 1ª a 12ª
          </Text>
          <Text bold color="gray6">
            {formatMoney(1401.35)}
          </Text>
        </s.InstallmentLabel>
        <s.InstallmentLabel>
          <Text type="caption" bold color="gray5">
            Parcelas 13ª a 24ª
          </Text>
          <Text bold color="gray6">
            {formatMoney(1401.35)}
          </Text>
        </s.InstallmentLabel>
      </s.InstallmentsWrapper>
    </s.Wrapper>
  )

  const footerContent = () => (
    <s.Button
      data-gtm-name={buttons.saveChanges}
      data-gtm-type="click"
      data-gtm-clicktype="button"
      onClick={() => handleClick()}
    >
      {buttons.saveChanges}
    </s.Button>
  )

  return isMobile ? (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      modalTitle={hire.steps.payment.drawerTitle}
      footer={footerContent()}
      {...rest}
    >
      {renderContent()}
    </Modal>
  ) : (
    <Drawer
      isOpen={isOpen}
      handleClose={handleClose}
      drawerTitle={hire.steps.payment.drawerTitle}
      footer={footerContent()}
      size="sm"
      {...rest}
    >
      {renderContent()}
    </Drawer>
  )
}

export default ChangePaymentData
