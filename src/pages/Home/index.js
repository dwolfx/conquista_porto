import React from 'react'
import { Container, Row, Col } from 'styled-bootstrap-grid'

// import Col from 'components/Column'

const Home = () => (
  <Container>
    <Row>
      <Col xl={6} lg={5} style={{ backgroundColor: 'purple', color: '#fff' }}>
        Teste
      </Col>
      <Col xl={3} lg={4} style={{ backgroundColor: 'red' }}>
        Teste 2
      </Col>
      <Col xl={3} lg={3} style={{ backgroundColor: 'green' }}>
        Teste 2
      </Col>
    </Row>
  </Container>
)

export default Home
