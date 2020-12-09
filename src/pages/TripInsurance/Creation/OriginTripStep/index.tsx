import React, { useState } from 'react'
import { Col } from 'styled-bootstrap-grid'
import useMedia from 'hooks/useMedia'
import { StepComponent, StepComponentProps } from 'hooks/FluxManagement/types'

import * as S from './styles'
import * as T from './types'
import DivisorDescription from 'pages/TripInsurance/commons/DivisorDescription'

import Text from 'components/Text'
import StepBar from 'pages/TripInsurance/commons/StepBar'

import { IOption } from 'components/MultiSelector/types'
import { Steps } from '../types'
import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'

// mock, remove after
const countries: IOption[] = [
  {
    text: 'Brasil',
    id: 1,
    value: 'brasil',
  },
  {
    text: 'Alemanha',
    id: 2,
    value: 'alemanha',
  },
  {
    text: 'Itália',
    id: 3,
    value: 'italia',
  },
  {
    text: 'Estados Unidos',
    id: 4,
    value: 'estadosunidos',
  },
  {
    text: 'Espanha',
    id: 5,
    value: 'espanha',
  },
  {
    text: 'Inglaterra',
    id: 6,
    value: 'inglaterra',
  },
  {
    text: 'Paises Baixos',
    id: 7,
    value: 'paisesbaixos',
  },
]

const OriginTripStep: StepComponent = () => {
  const isTabletVertical = useMedia('md')
  const { instantiate } = useStackFluxManagement<StepComponentProps>()

  const [selectedOriginCountry, setOriginCountry] = useState<T.ISelected>({
    id: 1,
    name: 'Brasil',
  })

  const originOptions = [
    {
      text: 'Brasil',
      id: 1,
      onClick: () => setOriginCountry({ name: 'Brasil', id: 1 }),
    },
  ]

  const [destinationTypes] = useState([
    {
      id: 1,
      text: 'Nacional',
      onClick: () => setSelectedDestinationType({ id: 1, name: 'Nacional' }),
    },
    {
      id: 2,
      text: 'Internacional',
      onClick: () =>
        setSelectedDestinationType({ id: 2, name: 'Internacional' }),
    },
  ])

  const [selectedDestinationType, setSelectedDestinationType] = useState({
    id: 0,
    name: 'Selecione',
  })

  const [
    selectedDestinationCountries,
    setSelectedDestinationCountries,
  ] = useState<IOption[]>([])

  return (
    <>
      <StepBar actualStep={1} totalNumberOfSteps={5} />
      <S.Wrapper>
        <S.StyledContainer>
          <S.StyledRow
            alignItems="center"
            justifyContent={isTabletVertical ? 'center' : 'start'}
          >
            <Col hiddenMdDown md={3} auto>
              <DivisorDescription
                data-testid="sideText"
                title="Destino"
                text="Aqui você não precisa informar as escalas do seu trajeto, apenas o destino final. Se sua viagem tiver mais de um destino, adicione ao mesmo campo para incluí-los."
              />
            </Col>
            <Col offset={isTabletVertical ? 0 : 1} xs={12} sm={7} md={4}>
              <S.FlexContainer>
                <Text type="headline" color="gray6" textAlign="center">
                  Confirme a origem e o destino da sua viagem
                </Text>
              </S.FlexContainer>
              <S.StyledCountryOriginSelect
                data-testid="originCountrySelect"
                options={originOptions}
                selected={selectedOriginCountry}
                disabled
                label="origem"
              />
              <S.Select
                options={destinationTypes}
                selected={selectedDestinationType}
                label="Destino"
              />
              {selectedDestinationType.id !== 2 ? null : (
                <S.MultiSelector
                  options={countries}
                  inputLabel="Você irá para qual(is) país(es)?"
                  onChange={selectedDestinationCountry =>
                    selectedDestinationCountry
                  }
                  selectedOptions={selectedDestinationCountries}
                  setSelectedOptions={setSelectedDestinationCountries}
                />
              )}
              <S.StyledButton
                disabled={
                  selectedDestinationType.id === 0 ||
                  (selectedDestinationType.id === 2 &&
                    !selectedDestinationCountries.length)
                }
                onClick={() => instantiate(Steps.coverageDate)}
              >
                Próximo
              </S.StyledButton>
            </Col>
          </S.StyledRow>
        </S.StyledContainer>
      </S.Wrapper>
    </>
  )
}

export default OriginTripStep
