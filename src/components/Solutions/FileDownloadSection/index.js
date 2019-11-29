import React from 'react'
import PropTypes from 'prop-types'

import {
  Container,
  Item,
  IconStyled,
  Title,
  Description,
  DownloadLink,
} from './styles'

export default function FileDownloadSection({ data, ...rest }) {
  return (
    <Container {...rest}>
      {data.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Item key={`${index}+${item.title}`}>
          <div>
            <IconStyled name={item.icon || 'pdf'} fill="#777" height="24px" />
          </div>
          <div>
            <Title>{item.title}</Title>
            <Description align="left">{item.description}</Description>
            <DownloadLink>{item.buttonText} &gt; </DownloadLink>
          </div>
        </Item>
      ))}
    </Container>
  )
}

FileDownloadSection.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      iconName: PropTypes.string,
      description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      buttonText: PropTypes.string,
    })
  ).isRequired,
}
