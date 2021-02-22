import React from 'react'
import InputMask from 'react-input-mask'
import { useSelector } from 'react-redux'

import { TSelected, TOptions } from 'components/Inputs/Select/types'
import { validationInputError } from 'pages/CreditCard/Creation/CreditCardStep/validators'
import Divisor from 'components/Divisor'
import { capitalize, maskRG } from 'helpers'
import { ErrorForm } from 'pages/ConsortiumBuilding/commons/ErrorForm'

import { TextsConsortiumBuilding } from 'pages/ConsortiumBuilding/commons/Texts'
import useMedia from 'hooks/useMedia'
import {
  ICountries,
  ICountriesConsortiumBuildingState,
} from 'store/modules/ConsortiumBuilding/Countries/types'
import {
  IFatca,
  IFatcaConsortiumBuildingState,
} from 'store/modules/ConsortiumBuilding/Fatca/types'
import { IDocumentCard, IFormDocumentData } from '../types'

import {
  placeholderExpediteBody,
  validationErrorDocument,
  validationErrorDateDispatch,
  validationErrorExpeditedBody,
} from './utils'

import * as s from './styles'

const DocumentCard: React.FC<IDocumentCard> = ({
  label,
  documentData: [documentData, setDocumentData],
  documentType: [documentTypeSelect, setDocumentTypeSelect],
  text,
  placeholder,
  isForeignResidency: [isForeignResidency, setIsForeignResidency],
}: IDocumentCard) => {
  const { formDefault } = TextsConsortiumBuilding()
  const { isNumber } = ErrorForm()

  const clearForm = () => {
    setValidForm({
      ...validForm,
      documentNumber: false,
      expeditedBody: false,
      dateDispatch: false,
    })
    setDocumentData({
      ...documentData,
      documentNumber: '',
      expeditedBody: '',
      dateDispatch: '',
    })
    setDocumentNumber('')
  }

  /**
   * HOOKS
   */

  const isSmUp = useMedia('smUp')

  /**
   * USESELECTOR
   */

  const { fatcaConsortiumBuilding } = useSelector(
    (state: { fatcaConsortiumBuilding: IFatcaConsortiumBuildingState }) => ({
      fatcaConsortiumBuilding: state.fatcaConsortiumBuilding.data,
    })
  )

  const { countriesConsortiumBuilding } = useSelector(
    (state: {
      countriesConsortiumBuilding: ICountriesConsortiumBuildingState
    }) => ({
      countriesConsortiumBuilding: state.countriesConsortiumBuilding.data,
    })
  )

  /**
   * USESTATE
   */

  const [validForm, setValidForm] = React.useState<IFormDocumentData>({
    documentType: false,
    address: false,
    documentNumber: false,
    dateDispatch: false,
    expeditedBody: false,
    foreignResidence: false,
    countryResidence: false,
    documentNumberNIF: false,
    fatca: false,
    passportNumber: false,
    passportType: false,
    passportIssuingCountry: false,
  })

  const [documentNumber, setDocumentNumber] = React.useState<string>('')

  const [passportType, setPassportType] = React.useState<TSelected>({
    id: 0,
    name: '',
  })

  const [passportTypeOption, setPassportTypeOption] = React.useState<
    TOptions[]
  >([])

  const [fatca, setFatca] = React.useState<TSelected>({
    id: 0,
    name: '',
  })

  const [fatcaOption, setFatcaOption] = React.useState<TOptions[]>([])

  const [countryResidence, setCountryResidence] = React.useState<TSelected>({
    id: 0,
    name: '',
  })

  const [countryResidenceOption, setCountryResidenceOption] = React.useState<
    TOptions[]
  >([])

  const [passportIssuingCountry, setCountryIssuancePassport] = React.useState<
    TSelected
  >({
    id: 0,
    name: '',
  })

  const [
    passportIssuingCountryOption,
    setCountryIssuancePassportOption,
  ] = React.useState<TOptions[]>([])

  const [documentTypeOption] = React.useState<TOptions[]>(
    ['RG', 'RNE'].map((value, index) => ({
      id: index + 1,
      text: value,
      onClick: () => {
        setDocumentTypeSelect({ id: index + 1, name: value })
        clearForm()
      },
    }))
  )

  const setListOptionFatca = React.useCallback(
    (
      data: IFatca[],
      setFatcaMethod: React.Dispatch<React.SetStateAction<TOptions[]>>,
      key: string,
      setSelect: React.Dispatch<React.SetStateAction<TSelected>>
    ) => {
      setFatcaMethod(
        data.map((value, index) => ({
          id: index + 1,
          text: value.descricao,
          onClick: () => {
            setSelect({ id: index + 1, name: value.descricao })
            setDocumentData({
              ...documentData,
              [key]: value.descricao,
            })
          },
        }))
      )
    },
    [documentData, setDocumentData]
  )

  const countryCallBack = React.useCallback(
    (
      setCountry: React.Dispatch<React.SetStateAction<TOptions[]>>,
      key: string,
      setCountrySelect: React.Dispatch<React.SetStateAction<TSelected>>,
      data: ICountries[]
    ) => {
      setCountry(
        data.map((value, index) => ({
          id: index + 1,
          text: value.descricao
            .split(' ')
            .map(character =>
              character.length > 2
                ? capitalize(character)
                : character.toLowerCase()
            )
            .join(' '),
          onClick: () => {
            setCountrySelect({
              id: index + 1,
              name: value.descricao
                .split(' ')
                .map(character =>
                  character.length > 2
                    ? capitalize(character)
                    : character.toLowerCase()
                )
                .join(' '),
            })
            setDocumentData({
              ...documentData,
              [key]: value.descricao
                .split(' ')
                .map(character =>
                  character.length > 2
                    ? capitalize(character)
                    : character.toLowerCase()
                )
                .join(' '),
            })
          },
        }))
      )
    },
    [documentData, setDocumentData]
  )

  /**
   * USEFFECT
   */

  React.useEffect(() => {
    if (fatcaConsortiumBuilding && fatcaConsortiumBuilding.lista_fatca) {
      setListOptionFatca(
        fatcaConsortiumBuilding.lista_fatca,
        setFatcaOption,
        'fatca',
        setFatca
      )
      setListOptionFatca(
        fatcaConsortiumBuilding.lista_fatca,
        setPassportTypeOption,
        'passportType',
        setPassportType
      )
    }
  }, [fatcaConsortiumBuilding, setListOptionFatca])

  React.useEffect(() => {
    if (countriesConsortiumBuilding && countriesConsortiumBuilding.paises) {
      countryCallBack(
        setCountryIssuancePassportOption,
        'passportIssuingCountry',
        setCountryIssuancePassport,
        countriesConsortiumBuilding.paises
      )
      countryCallBack(
        setCountryResidenceOption,
        'foreignResidence',
        setCountryResidence,
        countriesConsortiumBuilding.paises
      )
    }
  }, [countriesConsortiumBuilding, countryCallBack])

  const checkForm = (key: string) => {
    setValidForm((check: IFormDocumentData) => ({
      ...check,
      [key]: true,
    }))
  }

  return (
    <s.WrapperDocument>
      <s.RowDocument>
        <s.ColDocument smAuto>
          <s.DelimiterWrapper>
            <s.Select
              data-testid="select-document-type-id"
              label={label.documentType}
              options={documentTypeOption}
              selected={documentTypeSelect}
            />
          </s.DelimiterWrapper>
        </s.ColDocument>
        <s.ColDocument sm={6}>
          {documentTypeSelect.name ? (
            <s.FormDocumentWrapper>
              <s.InputDocument
                label={label.documentNumber}
                data-testid="input-spouse-name-id"
                placeholder={placeholder.documentNumber}
                value={documentNumber}
                maxLength={12}
                onBlur={() => checkForm('documentNumber')}
                error={validationErrorDocument(
                  documentNumber,
                  validForm.documentNumber,
                  isNumber
                )}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  setDocumentNumber(
                    documentTypeSelect.name === 'RG'
                      ? maskRG(e.currentTarget.value)
                      : e.currentTarget.value
                  )
                  setDocumentData({
                    ...documentData,
                    documentNumber: e.currentTarget.value.replace(/\D/g, ''),
                  })
                }}
              />
              <InputMask
                maskPlaceholder={null}
                mask="99/99/9999"
                value={documentData.dateDispatch}
                onBlur={() => checkForm('dateDispatch')}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setDocumentData({
                    ...documentData,
                    dateDispatch: e.currentTarget.value,
                  })
                }
              >
                <s.InputDocument
                  label={label.dateDispatch}
                  data-testid="input-spouse-name-id"
                  placeholder={placeholder.dateDispatch}
                  error={validationErrorDateDispatch(
                    documentData.dateDispatch,
                    validForm.dateDispatch
                  )}
                />
              </InputMask>
              <InputMask
                maskPlaceholder={null}
                mask="aaa/aa"
                value={documentData.expeditedBody}
                onBlur={() => checkForm('expeditedBody')}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setDocumentData({
                    ...documentData,
                    expeditedBody: e.currentTarget.value.toUpperCase(),
                  })
                }
              >
                <s.InputDocument
                  label={label.expeditedBody}
                  data-testid="input-spouse-name-id"
                  maxLength={6}
                  placeholder={placeholderExpediteBody(
                    documentTypeSelect,
                    placeholder
                  )}
                  error={validationErrorExpeditedBody(
                    documentData.expeditedBody,
                    validForm.expeditedBody
                  )}
                />
              </InputMask>
            </s.FormDocumentWrapper>
          ) : null}
        </s.ColDocument>
      </s.RowDocument>
      {documentTypeSelect.name === 'RNE' && isSmUp ? (
        <s.TextDocument>{text}</s.TextDocument>
      ) : null}
      <Divisor />
      <s.RadioDocumentContainer>
        <s.LabelRadioDocument>{label.foreignResidence}</s.LabelRadioDocument>
        <s.RadioOptionsDocumentWrapper data-testid="radio-brazilian-resident">
          <s.RadioDocument
            options={[
              {
                value: '1',
                name: 'Sim',
              },
              {
                value: '0',
                name: 'Não',
              },
            ]}
            checkedItem={isForeignResidency ? '1' : '0'}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setIsForeignResidency(!!+e.currentTarget.value)
            }
          />
        </s.RadioOptionsDocumentWrapper>
        {isForeignResidency ? (
          <s.WrapperForeignResidenceForm>
            <s.RowForeignResidenceDocument>
              <s.ColForeignResidenceDocument sm={12}>
                <s.Select
                  data-testid="select-country-id"
                  label={label.countryResidence}
                  options={countryResidenceOption}
                  selected={countryResidence}
                  optionBoxSize={300}
                />
              </s.ColForeignResidenceDocument>
              <s.ColForeignResidenceDocument sm={7}>
                <s.InputForeignResidenceDocument
                  label={label.documentNumberNIF}
                  data-testid="input-document-number-nif-id"
                  placeholder={formDefault.placeholderInput}
                  value={documentData.documentNumberNIF}
                  onBlur={() => checkForm('documentNumberNIF')}
                  error={validationInputError(
                    documentData.documentNumberNIF,
                    validForm.documentNumberNIF
                  )}
                  maxLength={9}
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    setDocumentData({
                      ...documentData,
                      documentNumberNIF: e.currentTarget.value.replace(
                        /\D/g,
                        ''
                      ),
                    })
                  }}
                />
              </s.ColForeignResidenceDocument>
              <s.ColForeignResidenceDocument sm={5}>
                <s.SelectForeignResidenceDocument
                  data-testid="select-fatca-id"
                  label={label.fatca}
                  options={fatcaOption}
                  selected={fatca}
                  optionBoxSize={300}
                />
              </s.ColForeignResidenceDocument>
              <s.ColForeignResidenceDocument sm={7}>
                <s.InputForeignResidenceDocument
                  label={label.passportNumber}
                  data-testid="input-passport-number-id"
                  placeholder={formDefault.placeholderInput}
                  value={documentData.passportNumber}
                  onBlur={() => checkForm('passportNumber')}
                  error={validationInputError(
                    documentData.passportNumber,
                    validForm.passportNumber
                  )}
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    setDocumentData({
                      ...documentData,
                      passportNumber: e.currentTarget.value.replace(/\D/g, ''),
                    })
                  }}
                />
              </s.ColForeignResidenceDocument>
              <s.ColForeignResidenceDocument sm={5}>
                <s.SelectForeignResidenceDocument
                  data-testid="select-passport-type-id"
                  label={label.passportType}
                  options={passportTypeOption}
                  selected={passportType}
                  optionBoxSize={300}
                />
              </s.ColForeignResidenceDocument>
              <s.ColForeignResidenceDocument sm={12}>
                <s.SelectCountryIssuancePassportDocument
                  data-testid="select-country-issuance-passport-id"
                  label={label.passportIssuingCountry}
                  options={passportIssuingCountryOption}
                  selected={passportIssuingCountry}
                  optionBoxSize={300}
                />
              </s.ColForeignResidenceDocument>
            </s.RowForeignResidenceDocument>
          </s.WrapperForeignResidenceForm>
        ) : null}
      </s.RadioDocumentContainer>
    </s.WrapperDocument>
  )
}

export default DocumentCard
