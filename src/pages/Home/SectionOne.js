import React from 'react'
import PropTypes from 'prop-types'
import 'styled-components/macro'
import { useSelector } from 'react-redux'
// import { useHistory } from 'react-router-dom'
// import { uuid } from 'uuidv4'

// import Divisor from 'components/Divisor'

// import { GetVehicleFinancingDataRequest } from 'store/modules/VehicleFinancing/action'
// import { GetConsortiumVehicleDataRequest } from 'store/modules/ConsortiumVehicle/action'
// import { GetConsortiumBuildingDataRequest } from 'store/modules/ConsortiumBuilding/action'
// import { GetCreditCardDataRequest } from 'store/modules/CreditCard/action'
// import { GetLifeInsuranceDataRequest } from 'store/modules/LifeInsurance/action'
// import { GetTripInsuranceDataRequest } from 'store/modules/TripInsurance/action'

import InvestmentCard from './InvestmentCard'
import PrivateWelfareSection from './PrivateWelfare'
// import ProductItemGenerator from './ProductItemGenerator'

import CardHeaderState from './commons/CardHeaderState'
import {
  GridCol,
  HomePrivateWelfareCard,
  GridColFlexContainer,
  GridColFlexCard,
} from './styles'

const SectionOne = ({ onFetchInvestments }) => {
  const {
    investments,
    // auth,
    // vehiclesFinancings,
    // creditCards,
    // vehiclesConsortium,
    // buildingConsortium,
    // lifeInsurance,
    // tripInsurance,
  } = useSelector(state => ({
    investments: state.consolidatedPosition,
    // auth: state.auth,
    // vehiclesFinancings: state.vehicleFinancing,
    // creditCards: state.creditCard,
    // vehiclesConsortium: state.consortiumVehicle,
    // buildingConsortium: state.consortiumBuilding,
    // isLoadingInvestments: state.consolidatedPosition,
    // hasErrorInvestments: state.consolidatedPosition,
    // lifeInsurance: state.lifeInsurance,
    // tripInsurance: state.tripInsurance,
  }))

  // const history = useHistory()
  // const dispatch = useDispatch()

  // const renderCreditProducts = () => {
  //   let result = []

  //   result = [
  //     ...ProductItemGenerator(creditCards, 'cartaoCredito', history, () =>
  //       dispatch(GetCreditCardDataRequest(auth.cpf))
  //     ),
  //     ...ProductItemGenerator(
  //       vehiclesFinancings,
  //       'financiamentoVeiculo',
  //       history,
  //       () => dispatch(GetVehicleFinancingDataRequest(auth.cpf))
  //     ),
  //     ...ProductItemGenerator(
  //       vehiclesConsortium,
  //       'consorcioVeiculo',
  //       history,
  //       () => dispatch(GetConsortiumVehicleDataRequest(auth.cpf))
  //     ),
  //     ...ProductItemGenerator(
  //       buildingConsortium,
  //       'consorcioImovel',
  //       history,
  //       () => dispatch(GetConsortiumBuildingDataRequest(auth.cpf))
  //     ),
  //   ]

  //   return formatResult(insertDivisor, sortArray)(result)
  // }

  return (
    <>
      <GridCol md="6" mdOffset="0" sm="12" smOffset="0" lg="4" lgOffset="1">
        <InvestmentCard
          onFetchInvestments={onFetchInvestments}
          headerEndItem={
            <CardHeaderState
              showHeader={Boolean(
                investments.data && Object.entries(investments.data).length
              )}
              isLoading={investments.isLoading}
              hasError={investments.hasError}
              onErrorClick={() => onFetchInvestments()}
            />
          }
        />
      </GridCol>
      <GridCol lg="4" md="6" sm="12">
        {/* <HomePrivateWelfareCard
          headerIcon="time"
          headerTitle="Previdência"
          headerEndItem={
            <CardHeaderState
              showHeader={Boolean(
                investments.data && Object.entries(investments.data).length
              )}
              isLoading={investments.isLoading}
              hasError={investments.hasError}
              onErrorClick={() => onFetchInvestments()}
            />
          }
        >
          <InvestmentSection onFetchInvestments={onFetchInvestments} />
        </HomeInvestmentCard> */}
      </GridCol>
      <GridCol lg="4" md="6" sm="12">
        <HomePrivateWelfareCard
          headerIcon="time"
          headerTitle="Previdência"
          headerEndItem={
            <CardHeaderState
              showHeader={Boolean(
                investments.data && Object.entries(investments.data).length
              )}
              isLoading={investments.isLoading}
              hasError={investments.hasError}
              onErrorClick={() => onFetchInvestments()}
            />
          }
        >
          <PrivateWelfareSection />
        </HomePrivateWelfareCard>
      </GridCol>
      <GridColFlexContainer lg="3" md="12" mdOffset="0" sm="12" xs="12">
        <GridColFlexCard
          headerIcon="financial"
          headerTitle="Seguros"
          headerEndItem={
            <CardHeaderState
              showHeader={Boolean(
                investments.data && Object.entries(investments.data).length
              )}
              isLoading={investments.isLoading}
              hasError={investments.hasError}
              onErrorClick={() => onFetchInvestments()}
            />
          }
        >
          <div>Seguro/Cartão content</div>
        </GridColFlexCard>

        <GridColFlexCard
          headerIcon="financial"
          headerTitle="Crédito"
          headerEndItem={
            <CardHeaderState
              showHeader={Boolean(
                investments.data && Object.entries(investments.data).length
              )}
              isLoading={investments.isLoading}
              hasError={investments.hasError}
              onErrorClick={() => onFetchInvestments()}
            />
          }
        >
          <div>Seguro/Cartão content</div>
        </GridColFlexCard>
      </GridColFlexContainer>
    </>
  )
}
// Feature Seguro
// const InsuranceCard = ({ auth, lifeInsurance, tripInsurance }) => {
//   const history = useHistory()
//   const dispatch = useDispatch()

//   let result = []

//   result = [
//     ...ProductItemGenerator(lifeInsurance, 'seguroVida', history, () =>
//       dispatch(GetLifeInsuranceDataRequest(auth.cpf))
//     ),
//     ...ProductItemGenerator(tripInsurance, 'seguroViagem', history, () =>
//       dispatch(GetTripInsuranceDataRequest(auth.cpf))
//     ),
//   ]

//   return formatResult(insertDivisor, sortArray)(result)
// }

// const formatResult = (func1, func2) => array => func1(func2(array))

// const insertDivisor = array =>
//   array
//     .map((x, i) => (i < array.length - 1 ? [x, <Divisor key={uuid()} />] : x))
//     .flatMap(x => x)

// const sortArray = array =>
//   array.sort((a, b) => {
//     if (b.key.includes('empty')) {
//       return -1
//     }

//     return 0
//   })

SectionOne.propTypes = {
  onFetchInvestments: PropTypes.func.isRequired,
}

export default SectionOne
