import React, { ReactNode } from 'react'
import { Container, Row, Col } from 'styled-bootstrap-grid'
import { JustifyContent } from './types'
import * as S from './styles'

/**
 * Layer component bottom navigation
 *
 * @export
 * @param {Object} props
 * @param {ReactNode} props.children - React children
 * @param {ReactNode} props.justifyContent - Align content
 */

export default function BottomNavigationBar({
  children,
  justifyContent,
}: {
  children: ReactNode
  justifyContent: JustifyContent
}) {
  return (
    <S.Bar data-testid="bottomNavigationBar">
      <Container>
        <Row justifyContent={justifyContent}>
          <Col auto>{children}</Col>
        </Row>
      </Container>
    </S.Bar>
  )
}
