import React from 'react'
import renderer from 'react-test-renderer'

import MakeSenseSection from '../../../../components/Solutions/MakeSenseSection'

import { ReactComponent as MaleFemaleIcon } from '../../../../assets/icons/male-female.svg'
import { ReactComponent as SafeBoxIcon } from '../../../../assets/icons/safe-box.svg'
import { ReactComponent as BarChartIcon } from '../../../../assets/icons/bar-chart.svg'

const makeSenseSectionData = [
  {
    icon: <MaleFemaleIcon fill="white" height={30} />,
    description: `Quando você quiser uma gestão profissional para
      buscar as melhores opções do mercado para seu dinheiro.`,
  },
  {
    icon: <BarChartIcon fill="white" height={30} />,
    description: `Quando você quiser buscar um rendimento melhor do que o da poupança,
      sem correr, necessariamente, um risco maior.`,
  },
  {
    icon: <SafeBoxIcon fill="white" height={30} />,
    description: `Quando você quiser se organizar para buscar seus sonhos,
      economizando seu dinheiro e esperando rendimentos melhores.`,
  },
]

it('MakeSenseSection renders correctly', () => {
  const tree = renderer
    .create(
      <MakeSenseSection
        title="Quando faz sentido investir?"
        data={makeSenseSectionData}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
