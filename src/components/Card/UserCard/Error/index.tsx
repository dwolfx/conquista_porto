import React from 'react'

import Text from 'components/Text'
import IconExporter from 'components/IconExporter'

import * as S from '../styles'

export default function UserCardError({ retry }: { retry: () => void }) {

  return (
    <S.Card>
       <S.Thumbnail data-testid="userCardThumbnail" hasError onClick={retry}>
         <IconExporter name="arrowround" color="blue4"/>
       </S.Thumbnail>
      <S.Info>
        <Text type="headline" color="magenta2">
          Não foi possível carregar
        </Text>
        <Text type="caption" color="gray5">Cliente</Text>
      </S.Info>
    </S.Card>
  )
}
