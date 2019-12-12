import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
import TopBanner from '../../../../components/Solutions/TopBanner'

import BannerInvestimentosImage from '../../../../assets/images/banner_investimentos.jpg'

it('TopBanner renders correctly', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <TopBanner
          title="Fundos de Investimentos"
          description="Com o Conquista, você pode investir em Fundos de Investimento da Porto Seguro e de gestoras parceiras. Consulte a Lista de Fundos e conheça opções para diversos perfis."
          buttonText="Lista de fundos"
          image={BannerInvestimentosImage}
          imageDescription="Homem pesquisando investimentos em um website em seu computador"
        />
      </ThemeProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
