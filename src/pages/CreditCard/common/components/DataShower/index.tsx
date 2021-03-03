import React from 'react'

import Text from 'components/Text'
import Popover from 'components/Popover'
import { truncateString } from 'helpers'
import useMedia from 'hooks/useMedia'

import * as S from './styles'
interface IProps {
  label: string
  value?: string | React.ReactNode | undefined
  truncate?: boolean
}

const DataShower: React.FC<IProps> = ({ label, value, truncate, children, ...rest }) => {
  const isMobile = useMedia('xs')

  const labelTextType = isMobile ? 'captionUppercase' : 'caption'
  const labelColor = isMobile ? 'gray4' : 'gray5'
  const valueTextType = isMobile ? 'headline' : 'title'

  const handleTruncateString = (text: string) => {
    if (typeof text === 'string') {
      if (isMobile) {
        return truncateString(text, 25)
      }
    }
    return value
  }
  
  const baseTextComponent = (text: string) => (
    <Text bold type={valueTextType} color="gray6">
      {truncate ? handleTruncateString(text) : text}
    </Text>
  )

  const renderValues = (children: string | React.ReactNode | undefined) => {
    if (!children) {
      return <Text type="caption" color="magenta2">Não preenchido</Text>
    }

    if (typeof children === 'string' && !truncate) {
      return baseTextComponent(children)
    }

    if (truncate && typeof children === 'string') {
      return (
        <Popover
          content={children}
          tooltip
          placement="top"
          trigger="click"
        >
          {baseTextComponent(children)}
        </Popover>
      )
    }
  }

  return (
    <S.FlexWrapper {...rest}>
      <S.KeyWrapper>
        <Text bold type={labelTextType} color={labelColor}>
          {label}
        </Text>
      </S.KeyWrapper>
      <S.ValueWrapper>
        {renderValues(children)}
      </S.ValueWrapper>
    </S.FlexWrapper>
  )
}

export default DataShower
