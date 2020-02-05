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
// import AdvertisementBanner from './AdvertisementBanner'
import SectionTwo from './SectionTwo'
import SectionThree from './SectionThree'
import { GridContainer, GridRow, GridCol, Wrapper } from './styles'

const Home = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const history = useHistory()
  const pointsData = useSelector(state => state.points.data)

  const row1 = useRef(null)
  const row2 = useRef(null)
  const row3 = useRef(null)

  useEffect(() => {
    dispatch(GetBankDataRequest(auth.cpf))
    dispatch(GetCreditCardDataRequest(auth.cpf))
    dispatch(GetConsolidatedPositionDataRequest(auth.cpf))
    dispatch(GetVehicleFinancingDataRequest(auth.cpf))
    dispatch(GetConsortiumBuildingDataRequest(auth.cpf))
    dispatch(GetConsortiumVehicleDataRequest(auth.cpf))
    dispatch(GetLifeInsuranceDataRequest(auth.cpf))
    dispatch(GetTripInsuranceDataRequest(auth.cpf))
    dispatch(GetPointsDataRequest(auth.cpf))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth])

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

  // const dataLine = [
  //   {
  //     id: 'japan',
  //     color: 'hsl(300, 70%, 50%)',
  //     data: [
  //       {
  //         x: 'plane',
  //         y: 94,
  //       },
  //       {
  //         x: 'helicopter',
  //         y: 55,
  //       },
  //       {
  //         x: 'boat',
  //         y: 96,
  //       },
  //       {
  //         x: 'train',
  //         y: 36,
  //       },
  //       {
  //         x: 'subway',
  //         y: 107,
  //       },
  //       {
  //         x: 'bus',
  //         y: 36,
  //       },
  //       {
  //         x: 'car',
  //         y: 50,
  //       },
  //       {
  //         x: 'moto',
  //         y: 35,
  //       },
  //       {
  //         x: 'bicycle',
  //         y: 25,
  //       },
  //       {
  //         x: 'horse',
  //         y: 166,
  //       },
  //       {
  //         x: 'skateboard',
  //         y: 98,
  //       },
  //       {
  //         x: 'others',
  //         y: 280,
  //       },
  //     ],
  //   },
  //   {
  //     id: 'france',
  //     color: 'hsl(31, 70%, 50%)',
  //     data: [
  //       {
  //         x: 'plane',
  //         y: 136,
  //       },
  //       {
  //         x: 'helicopter',
  //         y: 223,
  //       },
  //       {
  //         x: 'boat',
  //         y: 184,
  //       },
  //       {
  //         x: 'train',
  //         y: 65,
  //       },
  //       {
  //         x: 'subway',
  //         y: 13,
  //       },
  //       {
  //         x: 'bus',
  //         y: 78,
  //       },
  //       {
  //         x: 'car',
  //         y: 266,
  //       },
  //       {
  //         x: 'moto',
  //         y: 154,
  //       },
  //       {
  //         x: 'bicycle',
  //         y: 41,
  //       },
  //       {
  //         x: 'horse',
  //         y: 139,
  //       },
  //       {
  //         x: 'skateboard',
  //         y: 111,
  //       },
  //       {
  //         x: 'others',
  //         y: 210,
  //       },
  //     ],
  //   },
  //   {
  //     id: 'us',
  //     color: 'hsl(2, 70%, 50%)',
  //     data: [
  //       {
  //         x: 'plane',
  //         y: 118,
  //       },
  //       {
  //         x: 'helicopter',
  //         y: 148,
  //       },
  //       {
  //         x: 'boat',
  //         y: 298,
  //       },
  //       {
  //         x: 'train',
  //         y: 256,
  //       },
  //       {
  //         x: 'subway',
  //         y: 180,
  //       },
  //       {
  //         x: 'bus',
  //         y: 14,
  //       },
  //       {
  //         x: 'car',
  //         y: 239,
  //       },
  //       {
  //         x: 'moto',
  //         y: 180,
  //       },
  //       {
  //         x: 'bicycle',
  //         y: 221,
  //       },
  //       {
  //         x: 'horse',
  //         y: 138,
  //       },
  //       {
  //         x: 'skateboard',
  //         y: 205,
  //       },
  //       {
  //         x: 'others',
  //         y: 233,
  //       },
  //     ],
  //   },
  //   {
  //     id: 'germany',
  //     color: 'hsl(89, 70%, 50%)',
  //     data: [
  //       {
  //         x: 'plane',
  //         y: 34,
  //       },
  //       {
  //         x: 'helicopter',
  //         y: 2,
  //       },
  //       {
  //         x: 'boat',
  //         y: 164,
  //       },
  //       {
  //         x: 'train',
  //         y: 30,
  //       },
  //       {
  //         x: 'subway',
  //         y: 90,
  //       },
  //       {
  //         x: 'bus',
  //         y: 13,
  //       },
  //       {
  //         x: 'car',
  //         y: 185,
  //       },
  //       {
  //         x: 'moto',
  //         y: 67,
  //       },
  //       {
  //         x: 'bicycle',
  //         y: 36,
  //       },
  //       {
  //         x: 'horse',
  //         y: 182,
  //       },
  //       {
  //         x: 'skateboard',
  //         y: 277,
  //       },
  //       {
  //         x: 'others',
  //         y: 225,
  //       },
  //     ],
  //   },
  //   {
  //     id: 'norway',
  //     color: 'hsl(85, 70%, 50%)',
  //     data: [
  //       {
  //         x: 'plane',
  //         y: 290,
  //       },
  //       {
  //         x: 'helicopter',
  //         y: 299,
  //       },
  //       {
  //         x: 'boat',
  //         y: 28,
  //       },
  //       {
  //         x: 'train',
  //         y: 27,
  //       },
  //       {
  //         x: 'subway',
  //         y: 36,
  //       },
  //       {
  //         x: 'bus',
  //         y: 283,
  //       },
  //       {
  //         x: 'car',
  //         y: 3,
  //       },
  //       {
  //         x: 'moto',
  //         y: 101,
  //       },
  //       {
  //         x: 'bicycle',
  //         y: 163,
  //       },
  //       {
  //         x: 'horse',
  //         y: 175,
  //       },
  //       {
  //         x: 'skateboard',
  //         y: 124,
  //       },
  //       {
  //         x: 'others',
  //         y: 263,
  //       },
  //     ],
  //   },
  // ]

  return (
    <GridContainer id="scroll">
      <div
        style={{ width: '1200px', height: '500px', backgroundColor: '#fff' }}
      ></div>
      <Wrapper>
        <GridRow>
          <GridCol md="1" id="menu">
            <Menu scrollFunc={scrollPage} ref1={row1} ref2={row2} ref3={row3} />
          </GridCol>
          <GridCol md="11">
            <GridRow>
              <GridCol md="12">
                <GridRow id="t1" ref={row1}>
                  <SectionOne />
                </GridRow>
                {/* <GridRow style={{ paddingRight: 7, paddingLeft: 7 }}>
                  <AdvertisementBanner onRedirect={onRedirect} hasCloseButton />
                </GridRow> */}
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
