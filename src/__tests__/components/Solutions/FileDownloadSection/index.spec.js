import React from 'react'
import renderer from 'react-test-renderer'

import FileDownloadSection from '../../../../components/Solutions/FileDownloadSection'

const downloadFileSectionData = [
  {
    title: 'quadro de rentabilidade',
    description:
      'Acompanhe o rendimento mais atualizado de todos os fundos de Investimentos da Porto Seguro.'
  },
  {
    title: 'carta do gestor',
    description:
      'Comentários sobre a estratégia dos fundos de Investimentos e, também, um pouco da visão do cenário econômico atual.'
  }
]

it('FileDownloadSection renders correctly', () => {
  const tree = renderer
    .create(<FileDownloadSection data={downloadFileSectionData} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
