import React from 'react'
import { renderWithReduxAndTheme } from 'testUtils'
import theme from 'styles/theme'

import targetImg from 'assets/images/pages/Objectives/Manager/target.png'
import Banner from '.'

describe('Banner', () => {
  it('Should render close button', () => {
    const { queryByText } = renderWithReduxAndTheme(
      <Banner
        bgImage={theme.colors.gray4}
        title="Close Button"
        hasCloseButton
        onClose={() => {}}
      />
    )
    expect(queryByText('botao fechar')).toBeDefined()
  })
  it('Should render banner', () => {
    const { getByText } = renderWithReduxAndTheme(
      <Banner
        bgImage={targetImg}
        title="Teste Banner"
        hasCloseButton={false}
        onClose={() => {}}
      />
    )
    expect(getByText('Teste Banner')).toBeDefined()
  })
})
