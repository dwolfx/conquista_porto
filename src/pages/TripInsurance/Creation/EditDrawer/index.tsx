import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import Drawer from 'components/Drawer'
import Loading from 'components/Loading'
import Modal from 'components/Modal/ModalNew'

import useMedia from 'hooks/useMedia'
import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'

import { GetDestinationCountriesRequest } from 'store/modules/TripInsurance/DestinationCountries/action'

import { INTERVAL_DATE_TYPE } from 'components/Dates/types'
import { TOptions, TSelected } from 'components/Inputs/Select/types'
import { IOption } from 'components/MultiSelector/types'
import { IForm } from 'pages/TripInsurance/Creation/types'

import * as s from './styles'

interface IEditDrawer {
  isDrawerOpen: boolean
  handleClose: (isDrawerOpen: boolean) => void
}
const EditDrawer: React.FC<IEditDrawer> = ({ isDrawerOpen, handleClose }) => {
  const dispatch = useDispatch()
  const isMobile = useMedia('sm')
  const { form } = useFormFluxManagement<IForm>()
  // Olhar depois os SETTERS ==========================
  const [isLoading] = useState(false)
  const [originOptions] = useState<TOptions[]>([{ text: 'Brasil', id: 1 }])
  const [countryOptions, setCountryOptions] = useState<IOption[]>([])
  const [selectedCountry] = useState<TSelected>({
    id: 1,
    name: 'Brasil',
  })
  const [destinations] = useState([
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

  const [adventureSportsOptions] = useState([
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
    id: form.isPraticaAventura ? 1 : 2,
    name: form.isPraticaAventura ? 'Irei praticar' : 'Não irei praticar',
  })
  const [motocicleOptions] = useState([
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
  // Olhar depois os SETTERS ==========================

  const [selectedDestination, setSelectedDestination] = useState<{
    id: 1 | 2
    name: 'Nacional' | 'Internacional'
  }>({
    id: 1,
    name: 'Nacional',
  })
  const [
    selectedDestinationCountries,
    setSelectedDestinationCountries,
  ] = useState<IOption[]>([])
  const [initialDate, setInitialDate] = useState<moment.Moment | null>(
    moment(form.dataIda, 'DD/MM/YYYY')
  )
  const [finalDate, setFinalDate] = useState<moment.Moment | null>(
    moment(form.dataVolta, 'DD/MM/YYYY')
  )
  const [focusedInput, setFocusedInput] = useState(null)
  const onHandleRangeFocused = (focus: any) => {
    setFocusedInput(focus)
  }
  const [
    numberOfPassangersBelowSeventyYearsOptions,
    setNumberOfPassangersBelowSeventyYearsOptions,
  ] = useState(
    [...Array(21)].map((_, i) => ({
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
  ] = useState({
    id: form.qtdPassagMenorSetentaAnos?.toString(),
    name: form.qtdPassagMenorSetentaAnos?.toString(),
    value: form.qtdPassagMenorSetentaAnos || 0,
  })
  const [
    numberOfPassangersAboveSeventyYears,
    setNumberOfPassangersAboveSeventyYears,
  ] = useState({
    id: form.qtdPassagMaiorSetentaAnos?.toString(),
    name: form.qtdPassagMaiorSetentaAnos?.toString(),
    value: form.qtdPassagMaiorSetentaAnos || 0,
  })

  const [selectedMotocicleOption, setSelectedMotocicleOption] = useState({
    id: form.isMotocicleta ? 1 : 2,
    name: form.isMotocicleta ? 'Irei praticar' : 'Não irei praticar',
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
      data-gtm-subname="drawer editar seguro viagem"
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

  const {
    destinationCountriesData,
    isLoadingDestinationCountries,
    hasErrorDestinationCountries,
  } = useSelector((state: any) => ({
    destinationCountriesData: state.destinationCountries.data,
    isLoadingDestinationCountries: state.destinationCountries.isLoading,
    hasErrorDestinationCountries: state.destinationCountries.hasError,
  }))

  // Adiciona as opções do multiSelector e retira a opção Brasil
  useEffect(() => {
    if (selectedDestination.id === 2) {
      if (destinationCountriesData) {
        setCountryOptions(destinationCountriesData?.ViagemPais?.destinos)
      }
    }
  }, [selectedDestination, destinationCountriesData])

  // Atualiza a opção do destino de acordo com o form
  useEffect(() => {
    if (form.nationalDestination) {
      setSelectedDestination({ id: 1, name: 'Nacional' })
    } else {
      setSelectedDestination({ id: 2, name: 'Internacional' })
    }
  }, [form, destinationCountriesData])

  // Atualiza as tags do multiselector de acordo com o form
  useEffect(() => {
    if (!form.nationalDestination) {
      const selectedCountries: number[] = []
      if (form.codigoPaisDestino) {
        selectedCountries.push(+form.codigoPaisDestino)
      }
      form.paisesAdicionais?.forEach(country =>
        selectedCountries.push(+country.codigo)
      )

      setSelectedDestinationCountries(
        countryOptions.filter(country => selectedCountries.includes(country.id))
      )
    }
  }, [
    form.nationalDestination,
    form.codigoPaisDestino,
    form.paisesAdicionais,
    countryOptions,
  ])

  const loadingContent = () => (
    <Loading
      type="bar"
      legend="Aguarde, estamos buscando suas informações..."
    />
  )

  const renderContent = () => (
    <>
      <s.Container>
        <s.CountryOriginSelect
          options={originOptions}
          selected={selectedCountry}
          label="Origem"
        />
        <s.Select
          options={destinations}
          selected={selectedDestination}
          label="Destino"
        />
        {selectedDestination.id !== 2 ? null : (
          <s.MultiSelector
            error={hasErrorDestinationCountries}
            marginBottom={hasErrorDestinationCountries}
            loading={isLoadingDestinationCountries}
            disabled={isLoadingDestinationCountries}
            options={countryOptions.filter(
              (destino: IOption) => destino.value !== 'brasil'
            )}
            inputLabel="Você irá para qual(is) país(es)"
            onChange={selectedDestinationCountry => selectedDestinationCountry}
            onFocusFunction={() => {
              if (!destinationCountriesData) {
                dispatch(GetDestinationCountriesRequest())
              }
            }}
            selectedOptions={selectedDestinationCountries}
            setSelectedOptions={setSelectedDestinationCountries}
            optionsContainerHeight={220}
          />
        )}
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

  if (isMobile) {
    return (
      <Modal
        modalTitle="Alterar dados"
        isOpen={isDrawerOpen}
        handleClose={() => handleClose(false)}
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
      handleClose={() => handleClose(false)}
      size="sm"
      footer={footerDrawer()}
    >
      {isLoading ? loadingContent() : renderContent()}
    </Drawer>
  )
}

export default EditDrawer
