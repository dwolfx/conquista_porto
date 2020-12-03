import React, { useState } from 'react'
import { Col } from 'styled-bootstrap-grid'
import useMedia from 'hooks/useMedia'
import { StepComponent, StepComponentProps } from 'hooks/FluxManagement/types'

import * as S from './styles'
import * as T from './types'
import DivisorDescription from 'pages/TripInsurance/commons/DivisorDescription'

import Text from 'components/Text'
import MultiSelector from 'components/MultiSelector'
import StepBar from 'pages/TripInsurance/commons/StepBar'

import { IOption } from 'components/MultiSelector/types'
import { Steps } from '../types'
import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'
import DestinationTypeSelect from 'pages/TripInsurance/commons/DestinationTypeSelect'

const OriginTripStep: StepComponent = () => {
  const isTabletVertical = useMedia('md')
  const [selectedOriginCountry, setOriginCountry] = useState<T.ISelected>({
    id: 1,
    name: 'Brasil',
  })
  const [selectedDestinationType, setSelectedDestinationType] = useState<
    T.ISelected
  >({
    id: 0,
    name: 'Selecione',
  })

  const { instantiate } = useStackFluxManagement<StepComponentProps>()

  const [selectedDestinationCountry] = useState<T.ISelected>({
    id: 8,
    name: 'Selecione',
  })

  // mock, remove after
  const originOptions = [
    {
      text: 'Brasil',
      id: 1,
      onClick: () => setOriginCountry({ name: 'Brasil', id: 1 }),
    },
  ]

  // mock, remove after
  const destinationTypeOptions = [
    {
      text: 'Nacional',
      id: 1,
      onClick: () => setSelectedDestinationType({ name: 'Nacional', id: 1 }),
    },
    {
      text: 'Internacional',
      id: 2,
      onClick: () =>
        setSelectedDestinationType({ name: 'Internacional', id: 2 }),
    },
  ]
  // mock, remove after
  const countries: IOption[] = [
    {
      text: 'Brasil',
      id: 1,
      value: 'brasil',
      //onClick: () => setDestinationCountry({ name: 'Brasil', id: 1 }),
    },
    {
      text: 'Alemanha',
      id: 2,
      value: 'alemanha',
      //onClick: () => setDestinationCountry({ name: 'Alemanha', id: 2 }),
    },
    {
      text: 'Itália',
      id: 3,
      value: 'italia',
      //onClick: () => setDestinationCountry({ name: 'Itália', id: 3 }),
    },
    {
      text: 'Estados Unidos',
      id: 4,
      value: 'estadosunidos',
      //onClick: () => setDestinationCountry({ name: 'Estados Unidos', id: 4 }),
    },
    {
      text: 'Espanha',
      id: 5,
      value: 'espanha',
      //onClick: () => setDestinationCountry({ name: 'Espanha', id: 5 }),
    },
    {
      text: 'Inglaterra',
      id: 6,
      value: 'inglaterra',
      //onClick: () => setDestinationCountry({ name: 'Inglaterra', id: 6 }),
    },
    {
      text: 'Paises Baixos',
      id: 7,
      value: 'paisesbaixos',
      //onClick: () => setDestinationCountry({ name: 'Paises Baixos', id: 7 }),
    },
  ]

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
              <DestinationTypeSelect
                options={destinationTypeOptions}
                label="destino"
                selected={selectedDestinationType}
                disabled={false}
              />
              <MultiSelector
                options={countries}
                inputLabel="Você irá para qual(is) país(es)?"
                onChange={selectedDestinationCountry =>
                  selectedDestinationCountry
                }
              />
              <S.StyledButton
                disabled={selectedDestinationCountry.id === 0}
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
