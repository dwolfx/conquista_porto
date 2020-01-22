import React, { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Menu from 'components/Menu'

import { GetBankDataRequest } from 'store/modules/BankData/action'
import { GetVehicleFinancingDataRequest } from 'store/modules/VehicleFinancing/action'
import { GetConsortiumVehicleDataRequest } from 'store/modules/ConsortiumVehicle/action'
import { GetConsortiumBuildingDataRequest } from 'store/modules/ConsortiumBuilding/action'
import { GetLifeInsuranceDataRequest } from 'store/modules/LifeInsurance/action'
import { GetTripInsuranceDataRequest } from 'store/modules/TripInsurance/action'
import { GetConsolidatedPositionDataRequest } from 'store/modules/ConsolidatedPosition/action'
import { GetCreditCardDataRequest } from 'store/modules/CreditCard/action'
import { GetPointsDataRequest } from 'store/modules/Points/action'

import SectionOne from './SectionOne'
import AdvertisementBanner from './AdvertisementBanner'
import SectionTwo from './SectionTwo'
import SectionThree from './SectionThree'
import { GridContainer, GridRow, GridCol, Wrapper } from './styles'

const Home = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const pointsData = useSelector(state => state.points.data)

  const row1 = useRef(null)
  const row2 = useRef(null)
  const row3 = useRef(null)

  useEffect(() => {
    dispatch(GetBankDataRequest())
    dispatch(GetCreditCardDataRequest())
    dispatch(GetConsolidatedPositionDataRequest())
    dispatch(GetVehicleFinancingDataRequest())
    dispatch(GetConsortiumBuildingDataRequest())
    dispatch(GetConsortiumVehicleDataRequest())
    dispatch(GetLifeInsuranceDataRequest())
    dispatch(GetTripInsuranceDataRequest())
    dispatch(GetPointsDataRequest())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onRedirect = link => {
    history.push(link)
  }

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
      <Wrapper>
        <GridRow>
          <GridCol lg="1" id="menu">
            <Menu scrollFunc={scrollPage} ref1={row1} ref2={row2} ref3={row3} />
          </GridCol>
          <GridCol lg="11">
            <GridRow>
              <GridCol lg="12">
                <GridRow id="t1" ref={row1}>
                  <SectionOne />
                </GridRow>
                <GridRow style={{ paddingRight: 7, paddingLeft: 7 }}>
                  <AdvertisementBanner onRedirect={onRedirect} hasCloseButton />
                </GridRow>
                <GridRow id="t2" ref={row2}>
                  <SectionTwo onRedirect={onRedirect} />
                </GridRow>
                <GridRow id="t3" ref={row3}>
                  <SectionThree points={pointsData} />
                </GridRow>
              </GridCol>
            </GridRow>
          </GridCol>
        </GridRow>
      </Wrapper>
    </GridContainer>
  )
}
export default Home
