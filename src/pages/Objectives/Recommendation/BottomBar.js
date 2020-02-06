/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react'
import { Container, Row, Col } from 'styled-bootstrap-grid'
import Drawer from 'components/Drawer'

import { ButtonBar, SectionBar } from './styles'

const BottomBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  return (
    <SectionBar>
      <Drawer
        drawerTitle="Resumo"
        isOpen={isDrawerOpen}
        handleClose={() => setIsDrawerOpen(false)}
      >
        Conteúdo
      </Drawer>
      <Container>
        <Row justifyContent="end">
          <Col lgAuto>
            <ButtonBar
              color="primary"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              Resumo
            </ButtonBar>
            <ButtonBar color="secondary">Continuar</ButtonBar>
          </Col>
        </Row>
      </Container>
    </SectionBar>
  )
}

export default BottomBar
