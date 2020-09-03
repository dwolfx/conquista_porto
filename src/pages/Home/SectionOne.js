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
import InsuranceCard from './InsuranceCard'
// import ProductItemGenerator from './ProductItemGenerator'
import Credits from './Credits'

import CardHeaderState from './commons/CardHeaderState'
import { GridCol, HomePrivateWelfareCard, GridColFlexContainer } from './styles'

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

  const cardHeaderState = (
    <CardHeaderState
      showHeader={Boolean(
        investments.data && Object.entries(investments.data).length
      )}
      isLoading={investments.isLoading}
      hasError={investments.hasError}
      onErrorClick={() => onFetchInvestments()}
    />
  )

  return (
    <>
      <GridCol md="6" mdOffset="0" sm="12" smOffset="0" lg="4" lgOffset="1">
        <InvestmentCard
          onFetchInvestments={onFetchInvestments}
          headerEndItem={cardHeaderState}
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
          headerEndItem={cardHeaderState}
        >
          <PrivateWelfareSection />
        </HomePrivateWelfareCard>
      </GridCol>
      <GridColFlexContainer lg="3" md="12" mdOffset="0" sm="12" xs="12">
        <InsuranceCard headerEndItem={cardHeaderState} />
        <Credits>{cardHeaderState}</Credits>
      </GridColFlexContainer>
    </>
  )
}

SectionOne.propTypes = {
  onFetchInvestments: PropTypes.func.isRequired,
}

export default SectionOne
