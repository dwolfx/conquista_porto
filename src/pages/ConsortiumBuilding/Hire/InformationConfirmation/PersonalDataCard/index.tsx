import React from 'react'
import InputMask from 'react-input-mask'
import { cpf } from 'cpf-cnpj-validator'
import { useSelector } from 'react-redux'

import Divisor from 'components/Divisor'
import { ILabelContainerFirstInformationConfirmationStepHireFlux } from 'pages/ConsortiumBuilding/commons/Texts/types'

import * as s from './styles'
import { formatCpf } from 'helpers'
import moment from 'moment'
import { TOptions, TSelected } from 'components/Inputs/Select/types'
import { IPersonalDataForm } from '..'
import {
  errorObject,
  validationInputError,
} from 'pages/CreditCard/Creation/CreditCardStep/validators'

interface IPersonalDataCard {
  personalData: [
    IPersonalDataForm,
    React.Dispatch<React.SetStateAction<IPersonalDataForm>>
  ]
  label: ILabelContainerFirstInformationConfirmationStepHireFlux
}

interface IFormPersonalData {
  spouseDocument: boolean
  spouseName: boolean
}

const PersonalDataCard: React.FC<IPersonalDataCard> = ({
  personalData: [personalData, setPersonalData],
  label,
}: IPersonalDataCard) => {
  const [validForm, setValidForm] = React.useState<IFormPersonalData>({
    spouseDocument: false,
    spouseName: false,
  })

  const [civilStatus, setCivilStatus] = React.useState<TSelected>({
    id: 0,
    name: '',
  })

  const [isRestForm, setIsRestForm] = React.useState<boolean>(false)

  const [civilStatusOption] = React.useState<TOptions[]>(
    [
      'Solteiro',
      'Casado(a)',
      'Divorciado(a)',
      'Viúvo(a)',
      'União Estável',
      'Separado Judicialmente',
      'Separado',
    ].map((value, index) => ({
      id: index + 1,
      text: value,
      onClick: () => {
        setCivilStatus({ id: index + 1, name: value })
        setPersonalData({
          ...personalData,
          civilStatus: value,
        })
      },
    }))
  )

  const { customerProfileData } = useSelector((state: any) => ({
    customerProfileData: state.customerProfile.data,
  }))

  React.useEffect(() => {
    const isResult = ['Casado(a)', 'União Estável'].includes(
      personalData.civilStatus
    )
    setIsRestForm(isResult)

    if (!isResult) {
      setValidForm({
        spouseName: false,
        spouseDocument: false,
      })

      if (personalData.spouseName && personalData.spouseDocument) {
        setPersonalData({
          ...personalData,
          spouseName: '',
          spouseDocument: '',
        })
      }
    }
  }, [personalData, setPersonalData])

  const checkForm = (key: string) => {
    setValidForm((check: IFormPersonalData) => ({
      ...check,
      [key]: true,
    }))
  }

  const validationDocumentSpouse = (): errorObject | boolean => {
    if (
      personalData.spouseDocument &&
      personalData.spouseDocument.length === 11
    ) {
      if (!cpf.isValid(personalData.spouseDocument)) {
        return {
          icon: 'information',
          message: 'CPF inválido. Por favor, verifique o número',
        }
      }
    }

    return validationInputError(
      personalData.spouseDocument,
      validForm.spouseDocument
    )
  }

  return (
    <>
      <s.DataDisplay
        label={label.name}
        value={customerProfileData?.customerName}
      />
      <Divisor />
      <s.DataDisplay
        label={label.document}
        value={
          customerProfileData?.cpfCnpj &&
          formatCpf(customerProfileData?.cpfCnpj)
        }
      />
      <Divisor />
      <s.DataDisplay
        label={label.dateOfBirth}
        value={moment(customerProfileData?.customerBirthdate).format(
          'DD/MM/YYYY'
        )}
      />
      <Divisor />
      <s.DataDisplay label={label.nationality} value="Brasileiro(a)" />
      <s.DelimiterWrapper>
        <s.Select
          data-testid="select-civil-status-id"
          label="Estado civil"
          options={civilStatusOption}
          selected={civilStatus}
        />
      </s.DelimiterWrapper>
      {isRestForm && (
        <>
          <s.DelimiterInputWrapper>
            <s.InputPersonalData
              label="Nome do(a) cônjuge"
              data-testid="input-spouse-name-id"
              placeholder="Digite aqui"
              value={personalData.spouseName}
              onBlur={() => checkForm('spouseName')}
              error={validationInputError(
                personalData.spouseName,
                validForm.spouseName
              )}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setPersonalData({
                  ...personalData,
                  spouseName: e.currentTarget.value.replace(/[0-9]/g, ''),
                })
              }
            />
            <InputMask
              maskPlaceholder={null}
              mask="999.999.999-99"
              value={personalData.spouseDocument}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setPersonalData({
                  ...personalData,
                  spouseDocument: e.currentTarget.value.replace(/\D/g, ''),
                })
              }
              onBlur={() => checkForm('spouseDocument')}
            >
              <s.InputPersonalData
                label="CPF do(a) cônjuge"
                placeholder="000.000.000-00"
                data-testid="input-spouse-document-id"
                error={validationDocumentSpouse()}
              />
            </InputMask>
          </s.DelimiterInputWrapper>
        </>
      )}
    </>
  )
}

export default PersonalDataCard
