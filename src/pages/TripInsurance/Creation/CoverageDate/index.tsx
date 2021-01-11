import React, { useState } from 'react'
import moment from 'moment'
import { Container, Col, Row } from 'styled-bootstrap-grid'

import Popover from 'components/Popover'
import DivisorDescription from 'pages/TripInsurance/commons/DivisorDescription'
import StepBar from 'pages/TripInsurance/commons/StepBar'

import useMedia from 'hooks/useMedia'

import { INTERVAL_DATE_TYPE } from 'components/Dates/types'

import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'
import { StepComponent, StepComponentProps } from 'hooks/FluxManagement/types'

import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'
import { Steps, IForm } from '../types'
import * as s from './styles'

const CoverageDate: StepComponent = () => {
  const { updateForm, form } = useFormFluxManagement<IForm>()
  const [initialDate, setInitialDate] = useState<moment.Moment | null>(null)
  const [finalDate, setFinalDate] = useState<moment.Moment | null>(null)
  const [focusedInput, setFocusedInput] = useState(null)
  const isTabletVertical = useMedia('md')
  const isMobile = useMedia('sm')

  const { instantiate } = useStackFluxManagement<StepComponentProps>()

  const onHandleRangeFocused = (focus: any) => {
    setFocusedInput(focus)
  }

  const onSubmitButton = () => {
    updateForm({
      ...form,
      dataIda: initialDate?.format('DD/MM/YYYY'),
      dataVolta: finalDate?.format('DD/MM/YYYY'),
    })
    instantiate(Steps.passengerStep)
  }

  return (
    <>
      <StepBar
        actualStep={2}
        totalNumberOfSteps={form.hasLatinAmericaDestination ? 4 : 5}
      />
      <s.ContentWrapper>
        <Container>
          <Row
            alignItems="center"
            justifyContent={isTabletVertical ? 'center' : 'start'}
          >
            <Col hiddenMdDown md={3} auto>
              <DivisorDescription
                title="Cobertura"
                text="O seguro não terá validade se contratado durante a viagem ou fora do território nacional."
              />
            </Col>
            <Col offset={isTabletVertical ? 0 : 1} xs={12} sm={8} md={4}>
              <s.ContentWrapper>
                <s.QuestionText textAlign="center" type="headline">
                  Quais as datas de partida e de chegada da sua viagem?
                  {isMobile ? (
                    <Popover
                      content={() => (
                        <s.TooltipText type="body" color="gray5">
                          O seguro não terá validade se contratado durante a
                          viagem ou fora do território nacional.
                        </s.TooltipText>
                      )}
                      placement="top"
                    >
                      <s.InfoIcon name="information" color="blue4" />
                    </Popover>
                  ) : null}
                </s.QuestionText>
                <s.DatePickerRange
                  idDatePickerRange="id-coverage-date-range"
                  numberOfMonths={1}
                  rangeDates={{
                    dateBegin: initialDate,
                    dateEnd: finalDate,
                    intervalDateType: INTERVAL_DATE_TYPE.MONTH,
                  }}
                  onHandleFocusedInput={focused =>
                    onHandleRangeFocused(focused)
                  }
                  focusedInput={focusedInput}
                  onHandleSetRangeDates={(initialDateInput, finalDateInput) => {
                    setInitialDate(initialDateInput)
                    setFinalDate(finalDateInput)
                  }}
                  startDateText="Data de partida"
                  endDateText="Data de chegada"
                  blockPastDays
                />
                <s.NextButton
                  id="next-button"
                  data-gtm-name="proximo"
                  data-gtm-type="click"
                  data-gtm-clicktype="button"
                  disabled={!(initialDate && finalDate)}
                  onClick={onSubmitButton}
                >
                  PRÓXIMO
                </s.NextButton>
              </s.ContentWrapper>
            </Col>
          </Row>
        </Container>
      </s.ContentWrapper>
    </>
  )
}

export default CoverageDate
