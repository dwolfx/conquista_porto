import React from 'react'
import { renderWithReduxAndTheme } from 'testUtils'
import theme from 'styles/theme'

import Banner from '.'
import targetImg from 'assets/images/pages/Objectives/Manager/target.png'

describe('Banner', () => {
  it('Should render close button', () => {
    const { queryByText } = renderWithReduxAndTheme(
      <Banner
        bgImage={theme.colors.gray4}
        label="Close Button"
        hasCloseButton={true}
        onClose={() => {}}
        justify="start"
        size="sm"
      />
    )
    expect(queryByText('botao fechar')).toBeDefined()
  })
  it('Should render banner', () => {
    const { getByText } = renderWithReduxAndTheme(
      <Banner
        bgImage={targetImg}
        label="Teste Banner"
        hasCloseButton={false}
        onClose={() => {}}
        justify="start"
        size="sm"
      />
    )
    expect(getByText('Teste Banner')).toBeDefined()
  })
  test('Should render banner style rules with sm media', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <Banner
        bgImage={targetImg}
        label="Teste Banner"
        hasCloseButton={false}
        onClose={() => {}}
        justify="start"
        size="sm"
        data-testid="banner-wrapper"
      />
    )
    expect(getByTestId('banner-wrapper')).toHaveStyleRule('height', '208px')
    expect(getByTestId('banner-wrapper')).toHaveStyleRule('max-width', '665px')
    expect(getByTestId('banner-wrapper')).toHaveStyleRule('padding', '28px')
  })
})
