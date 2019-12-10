import styled, { css } from 'styled-components'

const defaultTextStyle = css`
  text-transform: uppercase;
  letter-spacing: 2px;
  letter-spacing: 1.5px;
`

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
