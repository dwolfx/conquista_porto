import React from 'react'
import PropTypes from 'prop-types'
import ButtonLink from 'components/Button/Link'
import { File, Title } from './styles'

const ArchiveDownload = ({ title, url }) => (
  <File>
    <Title bold>{title}</Title>
    <ButtonLink
      target="_blank"
      href={url}
      data-gtm-type="click"
      data-gtm-clicktype="link"
      data-gtm-subname={title}
      data-gtm-name="Baixar arquivo"
    >
      Baixar arquivo
    </ButtonLink>
  </File>
)

ArchiveDownload.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default ArchiveDownload
