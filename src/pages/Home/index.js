import React from 'react'
import Menu from 'components/Menu'
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
          <GridCol xl={1} lg={1} id="menu">
            <Menu scrollFunc={scrollPage} />
          </GridCol>
          <GridCol xl={11} lg={11}>
            <GridRow>
              <GridCol xl={12} lg={12}>
                <GridRow id="t1">
                  <GridCol xl={12} lg={12}>
                    TESTE 1
                  </GridCol>
                </GridRow>
                <GridRow id="t2">
                  <GridCol xl={12} lg={12}>
                    TESTE 2
                  </GridCol>
                </GridRow>
                <GridRow id="t3">
                  <GridCol xl={12} lg={12}>
                    TESTE 3
                  </GridCol>
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
