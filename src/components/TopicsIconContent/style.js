import styled, { css } from 'styled-components'
import Carousel from 'components/Carousel'

const truncate = css`
  display: flex;
  justify-content: space-between;
  margin: 28px 30px;
`

export const Topics = styled.div`
  ${truncate}
`

export const TopicsMobile = styled(Carousel)`
  ${truncate}
`
