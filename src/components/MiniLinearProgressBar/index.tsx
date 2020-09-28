import React from 'react'
import PropTypes from 'prop-types'
import { BackgroundBar, ProgressBar, ObjectivePercentageContainer, LinearProgressBarContent } from './style'
import Text from 'components/Text'

interface IProps {
  current: number,
  max: number,
  color?: string
  percentage?: number
}
const MiniLinearProgressBar = ({ current, max, color, percentage, ...rest }: IProps) => {
  const maxNum = max
  const currentNum = current
  const progress = Math.floor((currentNum * 100) / maxNum)

  return (
  <ObjectivePercentageContainer {...rest}>  
    <LinearProgressBarContent>
      <BackgroundBar>
        <ProgressBar progress={progress} color={color} />
      </BackgroundBar>
    </LinearProgressBarContent>
    <Text
        type="captionUppercase"
        color="gray5"
        textAlign="left"
        bold
        css={`
          min-width: 44px;
        `}
      >
        {`${percentage}%`}
      </Text>
  </ObjectivePercentageContainer>
  )
}


export default MiniLinearProgressBar
