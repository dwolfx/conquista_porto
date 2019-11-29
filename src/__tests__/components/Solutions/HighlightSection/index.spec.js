import React from 'react'
import renderer from 'react-test-renderer'

import HighlightSection from '../../../../components/Solutions/HighlightSection'

it('HighlightSection renders correctly', () => {
  const tree = renderer
    .create(
      <HighlightSection
        title="Facilidade para investir"
        mainDescription="Com o Conquista, é prático e rápido investir."
        subDescription="Você confere as opções disponíveis na Lista de Fundo, consulta
        informações detalhadas de cada um e realiza seus investimentos com a
        segurança de uma plataforma da Porto Seguro."
        buttonText="lista de fundos"
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
