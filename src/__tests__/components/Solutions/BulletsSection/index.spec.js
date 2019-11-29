import React from 'react'
import renderer from 'react-test-renderer'

import BulletsSection from '../../../../components/Solutions/BulletsSection'

import SeloInvestimentoImage from '../../../../assets/images/selo_investimento.svg'

it('BulletsSection renders correctly', () => {
  const tree = renderer
    .create(
      <BulletsSection
        title="Por que investir em Fundos?"
        imageURL={SeloInvestimentoImage}
        data={['Apenas esse tá top!']}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
