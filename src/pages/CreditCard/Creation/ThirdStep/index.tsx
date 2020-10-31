import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { GetCreditCardOccupationRequest } from 'store/modules/CreditCard/Occupation/action'

import { dict } from 'components/IconExporter'
import Divisor from 'components/Divisor'

import CivilState from './Selects/CivilState'
import Sex from './Selects/Sex'
import Ocupation from './Selects/Ocupation'

import { IStepComponent, IOption } from '../types'

import { GridContainer } from '../styles'
import * as S from './styles'

const ThirdStep = ({ formData, onNextStep }: IStepComponent) => {
  const cityError = {
    icon: 'information' as keyof typeof dict,
    message: 'A cidade informada não é válida.',
  }
  const motherNameError = {
    icon: 'information' as keyof typeof dict,
    message: 'O nome informado não é válido.',
  }
  const dispatch = useDispatch()
  const { creditCardOccupation } = useSelector((state: any) => ({
    creditCardOccupation: state.creditCardOccupation,
  }))
  const [city, setCity] = useState('')
  const [motherName, setMotherName] = useState('')
  const [errors, setErrors] = useState({ mother: false, city: false })
  const [selectedCivilState, setSelectedCivilState] = useState<IOption>({
    id: 0,
    name: '',
  })
  const [selectedSex, setSelectedSex] = useState<IOption>({ id: 0, name: '' })
  const [selectedOcupation, setSelectedOcupation] = useState<IOption>({
    id: 0,
    name: '',
  })
  const hasAnyError =
    !motherName.length ||
    !city.length ||
    selectedCivilState.id === 0 ||
    selectedSex.id === 0 ||
    selectedOcupation.id === 0

  const handleOnClick = () => {
    onNextStep({
      cidade: city,
      nomeMae: motherName,
      codigoEstadoCivil: String(selectedCivilState.id),
      codigoProfissao: String(selectedOcupation.id),
      sexo: selectedSex.name,
    })
  }

  useEffect(() => {
    if (creditCardOccupation.data === null) {
      dispatch(GetCreditCardOccupationRequest())
    }
  }, [dispatch, creditCardOccupation.data])

  useEffect(() => {
    if (formData.nomeMae) {
      setMotherName(formData.nomeMae)
    }
    if (formData.cidade) {
      setCity(formData.cidade)
    }
  }, [formData])

  return (
    <S.Wrapper>
      <GridContainer>
        <S.StyledMain xs={12} sm={6} lg={4}>
          <S.StyledText>
            Agora confirme alguns dados do seu cadastro:
          </S.StyledText>
          <S.StyledForm>
            <S.FlexWrapper>
              <>
                <CivilState
                  preSelectedCivilState={
                    formData.codigoEstadoCivil ? +formData.codigoEstadoCivil : 0
                  }
                  selectedOption={selectedCivilState}
                  setSelectedOption={setSelectedCivilState}
                />
              </>
              <>
                <Sex
                  preSelectedSex={formData.sexo}
                  selectedOption={selectedSex}
                  setSelectedOption={setSelectedSex}
                />
              </>
            </S.FlexWrapper>

            <>
              <Ocupation
                selectedOption={selectedOcupation}
                setSelectedOption={setSelectedOcupation}
                creditCardOccupation={creditCardOccupation}
                preSelectedOccupation={
                  formData.codigoProfissao ? +formData.codigoProfissao : 0
                }
              />
            </>

            <S.StyledInput
              label="cidade"
              error={errors.city && cityError}
              value={city}
              onChange={e => {
                const { value } = e.target
                setCity(value)
                setErrors({ ...errors, city: !value.length })
              }}
            />

            <S.StyledInput
              label="nome da mãe"
              error={errors.mother && motherNameError}
              value={motherName}
              onChange={e => {
                const { value } = e.target
                setMotherName(value)
                setErrors({ ...errors, mother: !value.length })
              }}
            />

            <S.StyledButton
              disabled={hasAnyError}
              onClick={() => handleOnClick()}
            >
              próximo
            </S.StyledButton>

            <S.Footer>
              <Divisor />
              <S.AnotherStyledText>
                Não se preocupe, a solicitação só será enviada após informarmos
                o cartão disponível para você.
              </S.AnotherStyledText>
            </S.Footer>
          </S.StyledForm>
        </S.StyledMain>
      </GridContainer>
    </S.Wrapper>
  )
}

export default ThirdStep
