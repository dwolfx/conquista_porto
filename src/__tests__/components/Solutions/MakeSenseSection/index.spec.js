import React from 'react'
import renderer from 'react-test-renderer'

import MakeSenseSection from '../../../../components/Solutions/MakeSenseSection'

const makeSenseSectionData = [
  {
    icon: 'malefemale',
    description: `Quando você quiser uma gestão profissional para
      buscar as melhores opções do mercado para seu dinheiro.`,
  },
  {
    icon: 'barchart',
    description: `Quando você quiser buscar um rendimento melhor do que o da poupança,
      sem correr, necessariamente, um risco maior.`,
  },
  {
    icon: 'safebox',
    description: `Quando você quiser se organizar para buscar seus sonhos,
      economizando seu dinheiro e esperando rendimentos melhores.`,
  },
]

const makeSenseBenefitsSectionData = [
  {
    icon: 'talkman',
    title: 'Gerente de conta',
    description:
      'Possibilidade de apoio de um gerente para te ajudar em contratações e dúvidas.',
  },
  {
    icon: 'diamond',
    title: 'Programa de Relacionamento',
    description:
      'Pontos que podem ser trocados por descontos em produtos Porto Seguro e até por viagens.',
  },
  {
    icon: 'callcenter',
    title: 'Chat inteligente',
    description: 'Para te ajudar com informações e dicas em qualquer momento.',
  },
  {
    icon: 'apps',
    title: 'Facilidade',
    description:
      'A contratação é rápida e descomplicada, feita para facilitar sua vida.',
  },
]

it('MakeSenseSection renders correctly', () => {
  const tree = renderer
    .create(
      <MakeSenseSection
        title="Quando faz sentido investir?"
        data={makeSenseSectionData}
        benefitsData={makeSenseBenefitsSectionData}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
