import React, { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import Menu from 'components/Menu'

import { GetVehicleFinancingDataRequest } from 'store/modules/VehicleFinancing/action'
import { GetConsortiumVehicleDataRequest } from 'store/modules/ConsortiumVehicle/action'
import { GetConsortiumBuildingDataRequest } from 'store/modules/ConsortiumBuilding/action'
import { GetLifeInsuranceDataRequest } from 'store/modules/LifeInsurance/action'
import { GetTripInsuranceDataRequest } from 'store/modules/TripInsurance/action'
import { GetConsolidatedPositionDataRequest } from 'store/modules/ConsolidatedPosition/action'
import { GetCreditCardDataRequest } from 'store/modules/CreditCard/action'
import { GetPointsExtractRequest } from 'store/modules/Points/action'
import { GetSuitabilityInfoRequest } from 'store/modules/SuitabilityInfo/action'
import { GetCustomerProfileRequest } from 'store/modules/CustomerProfile/action'

import SectionOne from './SectionOne'
import AdvertisementBanner from './AdvertisementBanner'
import SectionTwo from './SectionTwo'
import PointsSection from './PointsSection'
import { GridContainer, GridRow, GridCol, Wrapper } from './styles'

const Home = ({ location }) => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const history = useHistory()
  const pointsData = useSelector(state => state.points.data)

  const row1 = useRef(null)
  const row2 = useRef(null)
  const row3 = useRef(null)

  function handleFetchInvestments() {
    dispatch(GetConsolidatedPositionDataRequest(auth.cpf))
  }

  useEffect(() => {
    dispatch(GetCustomerProfileRequest(auth.cpf))
    dispatch(GetSuitabilityInfoRequest(auth.cpf))
    dispatch(GetCreditCardDataRequest(auth.cpf))
    handleFetchInvestments()
    dispatch(GetVehicleFinancingDataRequest(auth.cpf))
    dispatch(GetConsortiumBuildingDataRequest(auth.cpf))
    dispatch(GetConsortiumVehicleDataRequest(auth.cpf))
    dispatch(GetLifeInsuranceDataRequest(auth.cpf))
    dispatch(GetTripInsuranceDataRequest(auth.cpf))
    dispatch(GetPointsExtractRequest(auth.cpf))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth])

  const onRedirect = link => {
    history.push(link)
  }

  const { scrollGoal } = location.state || false

  useEffect(() => {
    if (scrollGoal) {
      scrollPage('t2')
    }
  }, [scrollGoal])

  function scrollPage(id) {
    const el = document.querySelector(`#${id}`).getBoundingClientRect()

    const windowScroll = window.pageYOffset
    /*
      72 = distance between sticky elements and top of the page.
      30 = to keep the margin top on the container while it scrolls.
    */
    const amountToScroll = Math.round(el.top + windowScroll - 72 - 30)

    window.scroll({
      top: amountToScroll,
      left: 0,
      behavior: 'smooth',
    })
  }

  return (
    <GridContainer id="scroll">
      {/* <ManagerObjective /> */}
      <Wrapper>
        <GridRow>
          <GridCol md="1" id="menu">
            <Menu scrollFunc={scrollPage} ref1={row1} ref2={row2} ref3={row3} />
          </GridCol>
          <GridCol md="11">
            <GridRow>
              <GridCol md="12">
                <GridRow id="t1" ref={row1}>
                  <SectionOne onFetchInvestments={handleFetchInvestments} />
                </GridRow>

                <AdvertisementBanner />

                <GridRow id="t2" ref={row2}>
                  <SectionTwo onRedirect={onRedirect} />
                </GridRow>
                <GridRow id="t3" ref={row3}>
                  <PointsSection points={pointsData} />
                </GridRow>
              </GridCol>
            </GridRow>
          </GridCol>
        </GridRow>
      </Wrapper>
    </GridContainer>
  )
}

Home.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      scrollGoal: PropTypes.bool,
    }),
  }).isRequired,
}

export default Home
