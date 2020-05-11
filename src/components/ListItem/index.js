import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { handleGiwRedirect } from 'helpers'

import Text from 'components/Text'
import { Container, StartBox, EndBox, TextWrapper } from './styles'

export default function ListItem({
  StartIcon,
  EndIcon,
  text,
  margin,
  height,
  path,
  callbackClickFn,
  ...rest
}) {
  const history = useHistory()

  function handleClick(pathToRedirect) {
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

ListItem.propTypes = {
  StartIcon: PropTypes.node,
  EndIcon: PropTypes.node,
  text: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      color: PropTypes.string,
      content: PropTypes.string,
    })
  ).isRequired,
  margin: PropTypes.string,
  height: PropTypes.string,
  path: PropTypes.string,
  callbackClickFn: PropTypes.func,
}

ListItem.defaultProps = {
  StartIcon: null,
  EndIcon: null,
  margin: null,
  height: null,
  path: null,
  callbackClickFn: PropTypes.func,
}
