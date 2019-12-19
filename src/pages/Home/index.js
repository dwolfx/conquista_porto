import React from 'react'
import { Container, Row, Col } from 'styled-bootstrap-grid'

import Menu from '../../components/Menu'

const Home = () => {
  function scrollPage(id) {
    const el = document.querySelector(`#${id}`).getBoundingClientRect()

    const windowScroll = window.pageYOffset
    const amountToScroll = Math.round(el.top + windowScroll - 135 - 30)

    window.scroll({
      top: amountToScroll,
      left: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Container id="scroll">
      <div style={{ margin: '30px auto' }}>
        <Row>
          <Col
            xl={1}
            lg={1}
            id="menu"
            style={{ transition: 'all 0.35s ease-in-out' }}
          >
            <Menu scrollFunc={scrollPage} />
          </Col>
          <Col xl={11} lg={11} style={{}}>
            <Row style={{ border: '1px solid red' }}>
              <Col xl={12} lg={12}>
                <Row
                  style={{
                    border: '1px solid black',
                    height: '430px',
                    margin: 0,
                    marginBottom: '30px',
                  }}
                  id="t1"
                >
                  <Col xl={12} lg={12}>
                    TESTE 1
                  </Col>
                </Row>
                <Row
                  style={{
                    border: '1px solid black',
                    height: '430px',
                    margin: '30px 0',
                  }}
                  id="t2"
                >
                  <Col xl={12} lg={12}>
                    TESTE 2
                  </Col>
                </Row>
                <Row
                  style={{
                    border: '1px solid black',
                    height: '430px',
                    margin: '30px 0',
                  }}
                  id="t3"
                >
                  <Col xl={12} lg={12}>
                    TESTE 3
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Container>
  )
}
export default Home
