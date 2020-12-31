import React from 'react'
import { renderWithReduxAndTheme, screen } from 'testUtils'

import Tag from '.'

describe('Tag tests', () => {
  it('should exists', () => {
    expect(Tag).toBeDefined()
  })
  it('should display a tag: Blue', () => {
    renderWithReduxAndTheme(
      <Tag 
        color="blue"
        text="Tag with text blue"
      />
    )
    const container = screen.getByTestId('tag-id')
    const text = screen.getByText('Tag with text blue')
    expect(container).toHaveStyleRule('border', '1px solid #00ADEF')
    expect(text).toHaveStyle('color: #00ADEF')
  })
  it('should display a tag: Gray', () => {
    renderWithReduxAndTheme(
      <Tag 
        color="gray"
        text="Tag with text gray"
      />
    )
    const container = screen.getByTestId('tag-id')
    const text = screen.getByText('Tag with text gray')
    expect(container).toHaveStyleRule('border', '1px solid #DDDDDD')
    expect(text).toHaveStyle('color: #898989')
  })
  it('should display a tag: Green', () => {
    renderWithReduxAndTheme(
      <Tag 
        color="green"
        text="Tag with text green"
      />
    )
    const container = screen.getByTestId('tag-id')
    const text = screen.getByText('Tag with text green')
    expect(container).toHaveStyleRule('border', '1px solid #57B063')
    expect(text).toHaveStyle('color: #57B063')
  })
})