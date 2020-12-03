import React, { useState, useEffect } from 'react'

import useMedia from 'hooks/useMedia'

import Drawer from 'components/Drawer'
import MultiSelector from 'components/MultiSelector'
import Loading from 'components/Loading'
import Modal from 'components/Modal/ModalNew'

import { INTERVAL_DATE_TYPE } from 'components/Dates/types'
import { TOptions, TSelected } from 'components/Inputs/Select/types'

import * as s from './styles'

export default function EditDrawer() {
  const isMobile = useMedia('sm')
  const [isDrawerOpen, setIsDrawerOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [originOptions, setOriginOptions] = useState<TOptions[]>([
    { text: 'Brasil', id: 1 },
  ])
  const [countryOptions, setCountryOptions] = useState([
    { text: 'Alemanha', id: 2, value: 'Alemanha' },
    { text: 'Itália', id: 3, value: 'Itália' },
    { text: 'Estados Unidos', id: 4, value: 'estadosunidos' },
    { text: 'Espanha', id: 5, value: 'Espanha' },
    { text: 'Inglaterra', id: 6, value: 'Inglaterra' },
    { text: 'Paises Baixos', id: 7, value: 'paisesbaixos' },
  ])
  const [selectedCountry, setSelectedCountry] = useState<TSelected>({
    id: 1,
    name: 'Brasil',
  })
  const [destinations, setDestionations] = useState([
    {
      id: 1,
      text: 'Nacional',
      onClick: () => setSelectedDestination({ id: 1, name: 'Nacional' }),
    },
    {
      id: 2,
      text: 'Internacional',
      onClick: () => setSelectedDestination({ id: 2, name: 'Internacional' }),
    },
  ])
  const [selectedDestination, setSelectedDestination] = useState({
    id: 1,
    name: 'Nacional',
  })
  const [initialDate, setInitialDate] = useState<moment.Moment | null>(null)
  const [finalDate, setFinalDate] = useState<moment.Moment | null>(null)
  const [focusedInput, setFocusedInput] = useState(null)
  const onHandleRangeFocused = (focus: any) => {
    setFocusedInput(focus)
  }
  const [
    numberOfPassangersBelowSeventyYearsOptions,
    setNumberOfPassangersBelowSeventyYearsOptions,
  ] = useState(
    [...Array(23)].map((_, i) => ({
      id: `${i}`,
      text: `${i}`,
      onClick: () =>
        setNumberOfPassangersBelowSeventyYears({
          id: `${i}`,
          name: `${i}`,
          value: i,
        }),
    }))
  )
  const [
    numberOfPassangersAboveSeventyYearsOptions,
    setNumberOfPassangersAboveSeventyYearsOptions,
  ] = useState(
    [...Array(21)].map((_, i) => ({
      id: `${i}`,
      text: `${i}`,
      onClick: () =>
        setNumberOfPassangersAboveSeventyYears({
          id: `${i}`,
          name: `${i}`,
          value: i,
        }),
    }))
  )
  const [
    numberOfPassangersBelowSeventyYears,
    setNumberOfPassangersBelowSeventyYears,
  ] = useState({ id: '0', name: '0', value: 0 })

  const [
    numberOfPassangersAboveSeventyYears,
    setNumberOfPassangersAboveSeventyYears,
  ] = useState({ id: '0', name: '0', value: 0 })

  const [adventureSportsOptions, setAdventureSportsOptions] = useState([
    {
      id: 1,
      text: 'Irei praticar',
      onClick: () =>
        setSelectedAdventureSportsOption({ id: 1, name: 'Irei praticar' }),
    },
    {
      id: 2,
      text: 'Não irei praticar',
      onClick: () =>
        setSelectedAdventureSportsOption({ id: 2, name: 'Não irei praticar' }),
    },
  ])
  const [
    selectedAdventureSportsOption,
    setSelectedAdventureSportsOption,
  ] = useState({
    id: 2,
    name: 'Não irei praticar',
  })
  const [motocicleOptions, setMotocicleOptions] = useState([
    {
      id: 1,
      text: 'Irei praticar',
      onClick: () =>
        setSelectedMotocicleOption({ id: 1, name: 'Irei praticar' }),
    },
    {
      id: 2,
      text: 'Não irei praticar',
      onClick: () =>
        setSelectedMotocicleOption({ id: 2, name: 'Não irei praticar' }),
    },
  ])
  const [selectedMotocicleOption, setSelectedMotocicleOption] = useState({
    id: 2,
    name: 'Não irei praticar',
  })

  useEffect(() => {
    setNumberOfPassangersAboveSeventyYearsOptions(
      [...Array(21 - numberOfPassangersBelowSeventyYears.value)].map(
        (_, i) => ({
          id: `${i}`,
          text: `${i}`,
          onClick: () =>
            setNumberOfPassangersAboveSeventyYears({
              id: `${i}`,
              name: `${i}`,
              value: i,
            }),
        })
      )
    )
    setNumberOfPassangersBelowSeventyYearsOptions(
      [...Array(21 - numberOfPassangersAboveSeventyYears.value)].map(
        (_, i) => ({
          id: `${i}`,
          text: `${i}`,
          onClick: () =>
            setNumberOfPassangersBelowSeventyYears({
              id: `${i}`,
              name: `${i}`,
              value: i,
            }),
        })
      )
    )
  }, [numberOfPassangersAboveSeventyYears, numberOfPassangersBelowSeventyYears])

  const footerDrawer = () => (
    <s.ButtonSubmit
      data-gtm-subname={`drawer editar seguro viagem`}
      data-gtm-name="atualizar simulação"
      disabled={
        numberOfPassangersAboveSeventyYears.value +
          numberOfPassangersBelowSeventyYears.value ===
          0 || isLoading
      }
      loading={isLoading}
    >
      Confirmar
    </s.ButtonSubmit>
  )

  const loadingContent = () => (
    <Loading
      type="bar"
      legend="Aguarde, estamos buscando suas informações..."
    />
  )

  const renderContent = () => {
    return (
      <>
        <s.Container>
          <s.CountryOriginSelect
            options={originOptions}
            selected={selectedCountry}
            label="Origem"
          />
          <MultiSelector
            options={countryOptions}
            onChange={() => {}}
            inputLabel="Você irá para qual(is) país(es)"
          />
          <s.Select
            options={destinations}
            selected={selectedDestination}
            label="Destino"
          />
          <s.Divisor />
          <s.Label>Periodo da Viagem</s.Label>
          <s.DatePickerRange
            idDatePickerRange="id-coverage-date-range-drawer"
            numberOfMonths={1}
            rangeDates={{
              dateBegin: initialDate,
              dateEnd: finalDate,
              intervalDateType: INTERVAL_DATE_TYPE.MONTH,
            }}
            onHandleFocusedInput={focused => onHandleRangeFocused(focused)}
            focusedInput={focusedInput}
            onHandleSetRangeDates={(initialDateInput, finalDateInput) => {
              setInitialDate(initialDateInput)
              setFinalDate(finalDateInput)
            }}
            startDateText="Data de partida"
            endDateText="Data de chegada"
            blockPastDays={true}
          />
          <s.Select
            options={numberOfPassangersBelowSeventyYearsOptions}
            selected={numberOfPassangersBelowSeventyYears}
            label="Passageiros até 70 anos"
            optionBoxSize={300}
          />
          <s.Select
            options={numberOfPassangersAboveSeventyYearsOptions}
            selected={numberOfPassangersAboveSeventyYears}
            label="Passageiros de 71 até 90 anos"
            optionBoxSize={200}
          />
          <s.Popover
            content={() => (
              <s.TooltipText bold type="body" color="gray5">
                A cobertura de esportes de aventura não é acionado quando há
                passageiros maiores de 71 anos.
              </s.TooltipText>
            )}
            placement="top"
            turnOff={numberOfPassangersAboveSeventyYears.value === 0}
            zIndex={14}
          >
            <s.Select
              options={adventureSportsOptions}
              selected={selectedAdventureSportsOption}
              label="Esportes de aventura"
              hasLockIcon={numberOfPassangersAboveSeventyYears.value > 0}
              disabled={numberOfPassangersAboveSeventyYears.value > 0}
            />
          </s.Popover>
          <s.Select
            options={motocicleOptions}
            selected={selectedMotocicleOption}
            label="Motocicleta"
            optionBoxDirection="top"
          />
        </s.Container>
      </>
    )
  }

  const handleDrawer = () => {
    setIsDrawerOpen(false)
  }

  if (isMobile) {
    return (
      <Modal
        modalTitle="Alterar dados"
        isOpen={isDrawerOpen}
        handleClose={handleDrawer}
        footer={footerDrawer()}
      >
        {isLoading ? loadingContent() : renderContent()}
      </Modal>
    )
  }

  return (
    <Drawer
      isOpen={isDrawerOpen}
      drawerTitle="Alterar dados"
      handleClose={handleDrawer}
      size="sm"
      footer={footerDrawer()}
    >
      {isLoading ? loadingContent() : renderContent()}
    </Drawer>
  )
}
