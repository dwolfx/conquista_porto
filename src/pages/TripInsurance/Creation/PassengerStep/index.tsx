import React, { useState, useContext, useEffect } from 'react'
import { Col } from 'styled-bootstrap-grid'
import { ThemeContext } from 'styled-components'

import Text from 'components/Text'
import Icon from 'components/IconExporter'
import Popover from 'components/Popover'
import DivisorDescription from 'pages/TripInsurance/commons/DivisorDescription'
import StepBar from 'pages/TripInsurance/commons/StepBar'
import useMedia from 'hooks/useMedia'
import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'
import { StepComponent, StepComponentProps } from 'hooks/FluxManagement/types'
import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'

import PassengersOverSeventyModal from './PassengersOverSeventyModal'
import { Steps, IForm } from '../types'

import * as S from './styles'

const PassengerStep: StepComponent = () => {
  const maximumPermittedPassengers = 20
  const theme = useContext(ThemeContext)
  const [counts, setCounts] = useState({ young: 0, old: 0, total: 0 })
  const isTabletVertical = useMedia('md')
  const { instantiate } = useStackFluxManagement<StepComponentProps>()
  const { updateForm, form } = useFormFluxManagement<IForm>()
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setCounts(prevCounts => ({
      ...prevCounts,
      total: prevCounts.young + prevCounts.old,
    }))
  }, [counts.young, counts.old])

  const handleButtonClick = () => {
    updateForm({
      qtdPassagMenorSetentaAnos: counts.young,
      qtdPassagMaiorSetentaAnos: counts.old,
    })

    return counts.old > 0
      ? setIsModalOpen(true)
      : instantiate(Steps.adventureSports)
  }

  const handleModalAcceptButton = () => {
    if (!!form.hasOnlyLatinAmericaDestination && counts.old > 0) {
      updateForm({
        isPraticaAventura: false,
        isMotocicleta: false,
      })
      instantiate(Steps.choosePlan)
    } else {
      updateForm({
        isPraticaAventura: false,
      })
      instantiate(Steps.motocicleQuestion)
    }
  }

  return (
    <>
      <PassengersOverSeventyModal
        isOpen={isModalOpen}
        isLastStep={!!form.hasOnlyLatinAmericaDestination && counts.old > 0}
        handleClose={() => setIsModalOpen(false)}
        handleAccept={() => handleModalAcceptButton()}
      />
      <StepBar
        actualStep={3}
        totalNumberOfSteps={
          form.hasOnlyLatinAmericaDestination ||
          form.qtdPassagMaiorSetentaAnos !== 0
            ? 4
            : 5
        }
      />
      <S.Wrapper data-testid="passenger-step">
        <S.StyledContainer>
          <S.Row
            alignItems="center"
            justifyContent={isTabletVertical ? 'center' : 'start'}
          >
            <Col hiddenMdDown md={3} auto>
              <DivisorDescription
                title="Passageiros"
                text="O seguro cobre até 20 passageiros"
              />
            </Col>
            <Col offset={isTabletVertical ? 0 : 1} xs={12} sm={7} md={4}>
              <S.FlexContainer>
                <Text type="headline" color="gray6" textAlign="center">
                  Quantos passageiros haverá na viagem?
                  <Popover
                    content={() => (
                      <Text bold type="body" color="gray5">
                        O seguro cobre até 20 passageiros.
                      </Text>
                    )}
                  >
                    <Icon
                      data-testid="passenger-info"
                      name="information"
                      role="button"
                      aria-label="info-passengers"
                      fill={theme.colors.blue4}
                      width={21}
                      height={21}
                    />
                  </Popover>
                </Text>
              </S.FlexContainer>

              <S.StyledCounter
                label="PASSAGEIROS ATÉ 70 ANOS"
                initialValue={counts.young}
                maxValue={maximumPermittedPassengers - counts.old}
                disabledCase={counts.total >= maximumPermittedPassengers}
                afterOnChange={value => setCounts({ ...counts, young: value })}
              />

              <S.StyledCounter
                label="PASSAGEIROS DE 71 ATÉ 90 ANOS "
                initialValue={counts.old}
                maxValue={maximumPermittedPassengers - counts.young}
                disabledCase={counts.total === maximumPermittedPassengers}
                afterOnChange={value => setCounts({ ...counts, old: value })}
              />
              <S.StyledButton
                data-gtm-name="proximo"
                data-gtm-type="click"
                data-gtm-clicktype="button"
                onClick={handleButtonClick}
                disabled={counts.total === 0}
              >
                Próximo
              </S.StyledButton>
            </Col>
          </S.Row>
        </S.StyledContainer>
      </S.Wrapper>
    </>
  )
}

export default PassengerStep
