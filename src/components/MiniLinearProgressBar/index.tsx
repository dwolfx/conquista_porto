import React from 'react'
import {
  BackgroundBar,
  ProgressBar,
  ObjectivePercentageContainer,
  LinearProgressBarContent,
} from './style'

interface IProps {
  current: number
  max: number
  color?: string
}
const MiniLinearProgressBar = ({ current, max, color, ...rest }: IProps) => {
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
    </ObjectivePercentageContainer>
  )
}

export default MiniLinearProgressBar
