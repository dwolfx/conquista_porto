import React from 'react'

import Text from 'components/Text'

import * as S from './styles'
import UserCardLoading from './Loading'
import UserCardError from './Error'

/**
 * Component to show short informations about user
 *
 * @export
 * @param {Object} props
 * @param {String} name - User name or main information
 * @param {String} type - Role or secundary information
 * @param {String} [thumbnail=true] - Whether there should be a thumbnail
 * @param {Boolean} [loading=false] - Shows the loading component
 * @param {Boolean} [error=false] - Shows the error component
 * @param {Function} [retry=()=>{}] - Retry function in case of error
 * @return {*}
 *
 * @example Sample
 * <UserCard name="Fulano DeTal" role="CEO" />
 */
export default function UserCard({
  name,
  type,
  thumbnail = true,
  loading = false,
  error = false,
  retry = () => {},
  ...rest
}: {
  name: string
  type: string
  thumbnail?: boolean
  loading?: boolean
  error?: boolean
  retry?: () => void
}) {
  function initials(fullName: string): string {
    const [firstName, lastName] = fullName.split(' ').map(i => i.toUpperCase())

    if (lastName) {
      return firstName.charAt(0) + lastName.charAt(0)
    } else if (firstName.length >= 2) {
      return firstName.charAt(0) + firstName.charAt(1)
    } else {
      return firstName.charAt(0)
    }
  }

  if (loading) return <UserCardLoading />

  if (error) return <UserCardError retry={retry} />

  return (
    <S.Card {...rest} data-testid="userCard">
      {thumbnail && (
        <S.Thumbnail data-testid="userCardThumbnail">
          <Text type="body" bold>
            {initials(name)}
          </Text>
        </S.Thumbnail>
      )}
      <S.Info>
        <Text type="headline" bold>
          {name}
        </Text>
        <Text type="caption">{type}</Text>
      </S.Info>
    </S.Card>
  )
}
