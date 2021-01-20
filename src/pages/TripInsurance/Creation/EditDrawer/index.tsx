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
import { hasOnlyLatinAmerica } from 'pages/TripInsurance/Creation/OriginTripStep/helpers'

import * as s from './styles'

interface IEditDrawer {
  isDrawerOpen: boolean
  handleClose: (isDrawerOpen: boolean) => void
}
const EditDrawer: React.FC<IEditDrawer> = ({ isDrawerOpen, handleClose }) => {
  const dispatch = useDispatch()
  const isMobile = useMedia('sm')
  const { form, updateForm } = useFormFluxManagement<IForm>()

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
  const [isAdventureSportsDisabled, setIsAdventureSportsDisabled] = useState(
    false
  )
  const [isMotocicleInputDisabled, setIsMotocicleInputDisabled] = useState(
    false
  )
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  const {
    destinationCountriesData,
    isLoadingDestinationCountries,
    hasErrorDestinationCountries,
  } = useSelector((state: any) => ({
    destinationCountriesData: state.destinationCountries.data,
    isLoadingDestinationCountries: state.destinationCountries.isLoading,
    hasErrorDestinationCountries: state.destinationCountries.hasError,
  }))

  // Atualiza o número de passageiros
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

  // Atualiza o estado de desabilitado botão 'confirmar'
  useEffect(() => {
    switch (true) {
      // Caso seja internacional e não possua países selecionados
      case selectedDestination.id === 2 &&
        selectedDestinationCountries.length <= 0:
        setIsButtonDisabled(true)
        break
      // Caso não possua nenhuma quantidade de passageiros
      case numberOfPassangersAboveSeventyYears.value +
        numberOfPassangersBelowSeventyYears.value ===
        0 || isLoading:
        setIsButtonDisabled(true)
        break
      default:
        setIsButtonDisabled(false)
        break
    }
  }, [
    selectedDestination.id,
    selectedDestinationCountries.length,
    initialDate,
    finalDate,
    numberOfPassangersAboveSeventyYears.value,
    numberOfPassangersBelowSeventyYears.value,
    isLoading,
  ])

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

  // Retira os países destinos do state caso a opção 'nacional' seja selecionada
  useEffect(() => {
    if (selectedDestination.id === 1) {
      setSelectedDestinationCountries([])
    }
  }, [selectedDestination.id])

  // Atualiza o input de motocicleta de acordo com o form
  useEffect(() => {
    if (selectedDestinationCountries.length > 0) {
      if (hasOnlyLatinAmerica(selectedDestinationCountries)) {
        setIsMotocicleInputDisabled(true)
        setSelectedMotocicleOption({
          id: 2,
          name: 'Não irei praticar',
        })
      } else {
        setIsMotocicleInputDisabled(false)
      }
    } else if (selectedDestination.id === 1) {
      setIsMotocicleInputDisabled(true)
      setSelectedMotocicleOption({
        id: 2,
        name: 'Não irei praticar',
      })
    } else {
      setIsMotocicleInputDisabled(false)
    }
  }, [selectedDestinationCountries, selectedDestination.id])

  // Atualiza o input de esportes radicais de acordo com o número de passageiros acima de 70 anos
  useEffect(() => {
    if (numberOfPassangersAboveSeventyYears.value > 0) {
      setIsAdventureSportsDisabled(true)
      setSelectedAdventureSportsOption({
        id: 2,
        name: 'Não irei praticar',
      })
    } else {
      setIsAdventureSportsDisabled(false)
    }
  }, [numberOfPassangersAboveSeventyYears.value])

  // O 'form' está sendo observado por um useEffect no componente 'ChoosePlan' (pai deste componente), portanto,
  // ao atualizar o 'form' o dispatch com a action 'PostInsuranceQuotationRequest' será realizado.
  const handleClick = () => {
    updateForm({
      ...form,
      nationalDestination: selectedDestination.id === 1,
      codigoPaisDestino:
        selectedDestination.id === 1
          ? destinationCountriesData?.ViagemPais?.destinos.filter(
              (c: IOption) => c.value === 'brasil'
            )[0].id
          : `${selectedDestinationCountries[0].id}`,
      paisesAdicionais: selectedDestinationCountries
        .slice(1)
        .map((selectedCountry: IOption) => ({
          codigo: `${selectedCountry.id}`,
          descricao: selectedCountry.text,
        })),
      dataIda: initialDate?.format('DD/MM/YYYY'),
      dataVolta: finalDate?.format('DD/MM/YYYY'),
      qtdPassagMenorSetentaAnos: numberOfPassangersBelowSeventyYears.value,
      qtdPassagMaiorSetentaAnos: numberOfPassangersAboveSeventyYears.value,
      isPraticaAventura: selectedAdventureSportsOption.id === 1,
      isMotocicleta: selectedMotocicleOption.id === 1,
    })
    handleClose(false)
  }

  const footerDrawer = () => (
    <s.ButtonSubmit
      data-gtm-subname="drawer editar seguro viagem"
      data-gtm-name="atualizar simulação"
      disabled={isButtonDisabled}
      loading={isLoading}
      onClick={() => handleClick()}
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
          keepOpenOnDateSelect={false}
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
            hasLockIcon={isAdventureSportsDisabled}
            disabled={isAdventureSportsDisabled}
          />
        </s.Popover>
        <s.Select
          options={motocicleOptions}
          selected={selectedMotocicleOption}
          label="Motocicleta"
          optionBoxDirection="top"
          hasLockIcon={isMotocicleInputDisabled}
          disabled={isMotocicleInputDisabled}
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
