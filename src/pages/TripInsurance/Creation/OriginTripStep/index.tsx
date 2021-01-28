import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { Col } from 'styled-bootstrap-grid'

import Text from 'components/Text'

import DivisorDescription from 'pages/TripInsurance/commons/DivisorDescription'
import StepBar from 'pages/TripInsurance/commons/StepBar'

import useMedia from 'hooks/useMedia'
import { StepComponent, StepComponentProps } from 'hooks/FluxManagement/types'
import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'
import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'
import useFetchCustomerProfile from 'hooks/CustomerProfile/useFetchCustomerProfile'

import { GetDestinationCountriesRequest } from 'store/modules/TripInsurance/DestinationCountries/action'

import { IOption } from 'components/MultiSelector/types'
import { Steps, IForm } from '../types'
import { hasLatinAmerica, hasOnlyLatinAmerica } from './helpers'
import LatinAmericaModal from './LatinAmericaModal'

import * as S from './styles'
import * as T from './types'

const OriginTripStep: StepComponent = () => {
  const dispatch = useDispatch()
  const isTabletVertical = useMedia('md')
  const { updateForm } = useFormFluxManagement<IForm>()
  const { instantiate } = useStackFluxManagement<StepComponentProps>()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [selectedOriginCountry, setOriginCountry] = useState<T.ISelected>({
    id: 1,
    name: 'Brasil',
  })

  const [countries, setCountries] = useState<IOption[]>([])

  useFetchCustomerProfile()

  const {
    customerProfileData,
    destinationCountriesData,
    isLoadingDestinationCountries,
    hasErrorDestinationCountries,
  } = useSelector((state: any) => ({
    customerProfileData: state.customerProfile.data,
    destinationCountriesData: state.destinationCountries.data,
    isLoadingDestinationCountries: state.destinationCountries.isLoading,
    hasErrorDestinationCountries: state.destinationCountries.hasError,
  }))

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

  useEffect(() => {
    if (selectedDestinationType.id === 1) {
      if (!destinationCountriesData) {
        dispatch(GetDestinationCountriesRequest())
      }
    }
  }, [selectedDestinationType, destinationCountriesData, dispatch])

  useEffect(() => {
    if (selectedDestinationType.id === 2) {
      if (destinationCountriesData) {
        setCountries(
          destinationCountriesData?.ViagemPais?.destinos.filter(
            (destino: IOption) => destino.value !== 'brasil'
          )
        )
      }
    }
  }, [selectedDestinationType, destinationCountriesData])

  const handleClick = () => {
    updateForm({
      passageiroPrincipal: {
        nome: customerProfileData.customerName,
        email: customerProfileData.customerEmail,
        dataNascimento: moment(customerProfileData.customerBirthdate).format(
          'DD/MM/YYYY'
        ),
        sexo: customerProfileData.customerGender,
        celularDDD: customerProfileData.customerAreaCode,
        celularNumero: customerProfileData.customerPhoneNumber,
        numeroCpf: customerProfileData.cpfCnpj.slice(0, 9),
        digitoCpf: customerProfileData.cpfCnpj.slice(9),
      },
      codigoPaisDestino:
        selectedDestinationType.id === 1
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
      motivoViagem: 1,
      codigoCanal: 1,
      nationalDestination: selectedDestinationType.id === 1,
      codigoUfOrigem: customerProfileData.customerState,
      hasOnlyLatinAmericaDestination:
        selectedDestinationType.id === 1 ||
        hasOnlyLatinAmerica(selectedDestinationCountries),
    })
    if (
      hasLatinAmerica(selectedDestinationCountries) ||
      selectedDestinationType.id === 1
    ) {
      setIsModalOpen(true)
    } else {
      instantiate(Steps.coverageDate)
    }
  }

  return (
    <>
      <LatinAmericaModal
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        handleAccept={() => instantiate(Steps.coverageDate)}
      />
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
                  error={hasErrorDestinationCountries}
                  marginBottom={hasErrorDestinationCountries}
                  loading={isLoadingDestinationCountries}
                  disabled={isLoadingDestinationCountries}
                  options={countries}
                  inputLabel="Você irá para qual(is) país(es)?"
                  onChange={selectedDestinationCountry =>
                    selectedDestinationCountry
                  }
                  onFocusFunction={() => {
                    if (!destinationCountriesData) {
                      dispatch(GetDestinationCountriesRequest())
                    }
                  }}
                  selectedOptions={selectedDestinationCountries}
                  setSelectedOptions={setSelectedDestinationCountries}
                />
              )}
              <S.StyledButton
                data-gtm-name="proximo"
                data-gtm-type="click"
                data-gtm-clicktype="button"
                loading={
                  selectedDestinationType.id === 1 &&
                  isLoadingDestinationCountries
                }
                disabled={
                  selectedDestinationType.id === 0 ||
                  (selectedDestinationType.id === 2 &&
                    !selectedDestinationCountries.length)
                }
                onClick={() => handleClick()}
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
