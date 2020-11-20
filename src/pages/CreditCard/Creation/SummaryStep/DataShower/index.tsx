import React from 'react'

import Text from 'components/Text'
import useMedia from 'hooks/useMedia'

import * as S from './styles'

interface IProps {
  label: string
  value: string | undefined
}

const DataShower = ({ label, value }: IProps) => {
  const isMobile = useMedia('sm')

  const labelTextType = isMobile ? 'captionUppercase' : 'caption'
  const labelColor = isMobile ? 'gray4' : 'gray5'
  const valueTextType = isMobile ? 'headline' : 'title'

  return (
    <S.FlexWrapper>
      <S.KeyWrapper>
        <Text bold type={labelTextType} color={labelColor}>
          {label}
        </Text>
      </S.KeyWrapper>
      <S.ValueWrapper>
        {value ? (
          <Text bold type={valueTextType} color="gray6">
            {value}
          </Text>
        ) : (
          <Text type="caption" color="magenta2">
            Não preenchido
          </Text>
        )}
      </S.ValueWrapper>
    </S.FlexWrapper>
  )
}

export default DataShower
