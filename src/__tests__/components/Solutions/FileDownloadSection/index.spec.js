import React from 'react'
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
import FileDownloadSection from '../../../../components/Solutions/FileDownloadSection'

const downloadFileSectionData = [
  {
    title: 'quadro de rentabilidade',
    description:
      'Acompanhe o rendimento mais atualizado de todos os fundos de Investimentos da Porto Seguro.',
  },
  {
    title: 'carta do gestor',
    description:
      'Comentários sobre a estratégia dos fundos de Investimentos e, também, um pouco da visão do cenário econômico atual.',
  },
]

it('FileDownloadSection renders correctly', () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <FileDownloadSection data={downloadFileSectionData} />
        </ThemeProvider>
      </BrowserRouter>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
