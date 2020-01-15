import styled, { css } from 'styled-components'
import ConquistaIcon from 'components/IconExporter'
import Text from 'components/Text'

const defaultTextStyle = css`
  text-transform: uppercase;
  letter-spacing: 2px;
  letter-spacing: 1.5px;
`

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

export const Icon = styled(ConquistaIcon)`
  width: 21px;
  height: 21px;
`

export const StyledText = styled(Text).attrs({
  type: 'button',
})``

export const CrumbText = styled.small`
  ${defaultTextStyle}
  font-size: 10px;
  font-weight: 400;
`

export const CrumbCurrentPage = styled.strong`
  ${defaultTextStyle}
  display: block;
  font-size: 14px;
  font-weight: 600;
`
