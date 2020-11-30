import styled from 'styled-components'
import IconExporter from 'components/IconExporter'

export const RatingStarsContainer = styled.div`
  display: flex;
  flex-direction: row;
`

export const RatingStar = styled(IconExporter)`
  &:nth-child(even) {
    margin: 0 ${({ theme }) => theme.spacing(1)}px;
  }
`
