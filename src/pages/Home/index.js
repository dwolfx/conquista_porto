import React from 'react'
import { Container, Row, Col } from 'styled-bootstrap-grid'

import Text from 'components/Text'

// import Col from 'components/Column'

const Home = () => (
  <Container>
    <Row>
      <Col xl={6} lg={5} style={{ backgroundColor: 'purple', color: '#fff' }}>
        <Text type="title1">Isso é um texto</Text>
      </Col>
      <Col xl={6} lg={7} style={{ backgroundColor: 'red' }}>
        <Text type="title1" bold>
          Isso é um título bold
        </Text>
      </Col>
    </Row>
  </Container>
)

export default Home
