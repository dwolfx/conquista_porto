import React from 'react'

import { RowContent, LeftContent, MainContent } from './styles'

const Tablet: React.FC = () => {
  return (
    <>
      <RowContent>
        <LeftContent data-testid="left-content" md={4} sm={5}>
          CONTENT
        </LeftContent>
        <MainContent data-testid="main-content" md={8} sm={7}>
          CONTENT
        </MainContent>
      </RowContent>
    </>
  )
}

export default Tablet
