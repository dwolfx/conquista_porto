import Divisor from 'components/Divisor'
import { ILabelContainerSecondInformationConfirmationStepHireFlux } from 'pages/ConsortiumBuilding/commons/Texts/types'
import React from 'react'
import { useSelector } from 'react-redux'

import * as s from './styles'

interface IContactCard {
  label: ILabelContainerSecondInformationConfirmationStepHireFlux
}

const ContactCard: React.FC<IContactCard> = ({ label }: IContactCard) => {
  const { customerProfileData } = useSelector((state: any) => ({
    customerProfileData: state.customerProfile.data,
  }))

  const phoneString = (): string => {
    if (
      customerProfileData &&
      customerProfileData?.customerAreaCode &&
      customerProfileData?.customerPhoneNumber
    ) {
      return `+55 (${
        customerProfileData?.customerAreaCode
      }) ${customerProfileData?.customerPhoneNumber.slice(
        0,
        4
      )}-${customerProfileData?.customerPhoneNumber.slice(-4)}`
    }

    return ''
  }

  return (
    <s.WrapperContact>
      <s.DataDisplay
        label={label.email}
        value={customerProfileData?.customerEmail}
      />
      <Divisor />
      <s.DataDisplay label={label.phone} value={phoneString()} />
    </s.WrapperContact>
  )
}

export default ContactCard
