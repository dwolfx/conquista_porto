import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

import BulletsSection from '../../../../components/Solutions/BulletsSection'

import SeloInvestimentoImage from '../../../../assets/images/selo_investimento.svg'

it('BulletsSection renders correctly', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <BulletsSection
          title="Por que investir em Fundos?"
          imageURL={SeloInvestimentoImage}
          data={['Apenas esse tá top!']}
        />
      </ThemeProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
