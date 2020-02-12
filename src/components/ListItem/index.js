import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

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
  gtmType,
  gtmClickType,
  gtmName,
}) {
  const history = useHistory()

  function handleClick(pathToRedirect) {
    history.push(pathToRedirect)
    if (callbackClickFn) callbackClickFn()
  }

  return (
    <Container
      data-gtm-type={gtmType}
      data-gtm-clicktype={gtmClickType}
      data-gtm-name={gtmName}
      margin={margin}
      height={height}
      onClick={() => !!path && handleClick(path)}
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
  gtmType: PropTypes.string,
  gtmClickType: PropTypes.string,
  gtmName: PropTypes.string,
}

ListItem.defaultProps = {
  StartIcon: null,
  EndIcon: null,
  margin: null,
  height: null,
  path: null,
  callbackClickFn: PropTypes.func,
  gtmType: '',
  gtmClickType: '',
  gtmName: '',
}
