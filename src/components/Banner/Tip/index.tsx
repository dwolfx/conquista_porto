import React from 'react'

import {
  BannerTipCaption,
  BannerTipContent,
  BannerTipTitle,
  BannerTipWrapper,
} from './styles'

interface IProps {
  bgImage: string
  caption?: string
  title?: string | React.ReactNode
  height: string
}
const BannerTip: React.FC<IProps> = ({
  children,
  bgImage,
  title,
  caption,
  height = '280px',
  ...rest
}) => {
  return (
    <BannerTipWrapper image={bgImage} height={height} {...rest}>
      <BannerTipContent>
        <BannerTipCaption>{caption}</BannerTipCaption>
        {typeof title === 'string' ? (
          <BannerTipTitle>{title}</BannerTipTitle>
        ) : (
          title
        )}
        {children}
      </BannerTipContent>
    </BannerTipWrapper>
  )
}

export default BannerTip
