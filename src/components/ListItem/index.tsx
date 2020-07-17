import React from 'react'
import { useHistory } from 'react-router-dom'
import { handleGiwRedirect } from 'helpers'
import { themeColors, fontTypes } from 'styles/theme'

import Text from 'components/Text'
import { Container, StartBox, EndBox, TextWrapper } from './styles'

type TextProperty = {
  type?: keyof typeof fontTypes
  color?: keyof typeof themeColors
  content: string
}

interface IProps {
  StartIcon?: any
  EndIcon?: any
  text: TextProperty[]
  margin?: string
  height?: string
  path?: string
  callbackClickFn?: () => void
}

export default function ListItem({
  StartIcon,
  EndIcon,
  text,
  margin,
  height,
  path,
  callbackClickFn,
  ...rest
}: IProps) {
  const history = useHistory()

  function handleClick(pathToRedirect: string) {
    history.push(pathToRedirect)
    if (callbackClickFn) callbackClickFn()
  }

  return (
    <Container
      {...rest}
      margin={margin}
      height={height}
      onClick={() =>
        path === 'perfil'
          ? handleGiwRedirect('portaldecliente/conquista/perfil?r=true')
          : !!path && handleClick(path)
      }
    >
      {StartIcon && (
        <StartBox>{StartIcon.type ? StartIcon : <StartIcon />}</StartBox>
      )}
      <TextWrapper hasStartIcon={!!StartIcon} hasEndIcon={!!EndIcon}>
        {text.map(t => (
          <Text type={t.type} color={t.color}>
            {t.content}
          </Text>
        ))}
      </TextWrapper>
      {EndIcon && <EndBox>{EndIcon.type ? EndIcon : <EndIcon />}</EndBox>}
    </Container>
  )
}
