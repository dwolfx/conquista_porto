import React from 'react'
import { renderWithReduxAndTheme, screen } from 'testUtils'

import UserCard from '.'

describe('UserCard component', () => {
  it('should be exists', () => {
    renderWithReduxAndTheme(<UserCard name="Fulado DeTal" type="CEO" />)
    expect(screen.getByTestId('userCard')).toBeVisible()
  })

  it('should be text in content', () => {
    renderWithReduxAndTheme(<UserCard name="Fulano DeTal" type="CEO" />)
    expect(screen.getByText('Fulano DeTal')).toBeVisible()
    expect(screen.getByText('CEO')).toBeVisible()
  })

  describe('should be check if thumbnail', () => {
    it('exist', () => {
      renderWithReduxAndTheme(<UserCard name="Fulano DeTal" type="CEO" />)
      expect(screen.getByTestId('userCardThumbnail')).toBeVisible()
    })

    it('not exist', () => {
      expect(() => {
        renderWithReduxAndTheme(
          <UserCard name="Fulano DeTal" type="CEO" thumbnail={false} />
        )
        screen.getByTestId('userCardThumbnail')
      }).toThrowError()
    })
  })

  describe('should be return initial name letters', () => {
    it('when name has lastname', () => {
      renderWithReduxAndTheme(<UserCard name="Fulano DeTal" type="CEO" />)
      expect(screen.getByText('FD')).toBeVisible()
    })

    it('when name has only firstname', () => {
      renderWithReduxAndTheme(<UserCard name="Fulano" type="CEO" />)
      expect(screen.getByText('FU')).toBeVisible()
    })
    it('when name has only firtname letter', () => {
      renderWithReduxAndTheme(<UserCard name="F" type="CEO" />)
      expect(screen.getAllByText('F')).toHaveLength(2)
    })
  })
})
