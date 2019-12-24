import React from 'react'

import Menu from 'components/Menu'

import SectionOne from './SectionOne'
import SectionTwo from './SectionTwo'
import SectionThree from './SectionThree'
import { GridContainer, GridRow, GridCol, Wrapper } from './styles'

const Home = () => {
  function scrollPage(id) {
    const el = document.querySelector(`#${id}`).getBoundingClientRect()

    const windowScroll = window.pageYOffset
    /*
      135 = distance between sticky elements and top of the page.
      30 = to keep the margin top on the container while it scrolls.
    */
    const amountToScroll = Math.round(el.top + windowScroll - 135 - 30)

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
            <Menu scrollFunc={scrollPage} />
          </GridCol>
          <GridCol lg="11">
            <GridRow>
              <GridCol lg="12">
                <GridRow id="t1">
                  <SectionOne />
                </GridRow>

                <GridRow id="t2">
                  <SectionTwo />
                </GridRow>

                <GridRow id="t3">
                  <SectionThree />
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
