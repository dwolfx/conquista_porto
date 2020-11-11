import React from 'react'
import Text from 'components/Text'
import * as S from './styles'

/**
 * Component to show short informations about user
 *
 * @export
 * @param {Object} props
 * @param {String} name - User name or main information
 * @param {String} role - Role or secundary information
 * @param {String} [thumbnail=true] - Whether there should be a thumbnail
 * @return {*}
 *
 * @example Sample
 * <UserCard name="Fulano DeTal" role="CEO" />
 */
export default function UserCard({
  name,
  role,
  thumbnail = true,
  ...rest
}: {
  name: String
  role: String
  thumbnail?: Boolean
}) {
  function initials(name: String): String {
    const [firstName, lastName] = name.split(' ').map(i => i.toUpperCase())

    if (lastName) {
      return firstName.charAt(0) + lastName.charAt(0)
    } else if (firstName.length >= 2) {
      return firstName.charAt(0) + firstName.charAt(1)
    } else {
      return firstName.charAt(0)
    }
  }

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
        <Text type="caption">{role}</Text>
      </S.Info>
    </S.Card>
  )
}
