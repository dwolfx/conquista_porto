import styled from 'styled-components'

import Button from 'components/Button'
import Card from 'components/Card'
import Icon from 'components/IconExporter'
import Text from 'components/Text'

interface IDivisor {
  isMobile: boolean
}

export const DivisorContainer = styled.div<IDivisor>`
  display: flex;
  align-items: center;
  flex-direction: ${props => (props.isMobile ? 'row' : 'column')};
  height: auto;
  margin: ${props => props.isMobile && '35px 0'};

  p {
    margin: ${props => props.isMobile && '0 7px'};
  }
`

export const SimulateButton = styled(Button)`
  width: 100%;
  margin-top: 21px;
`

export const CardWithCloseButton = styled(Card)`
  position: relative;
  margin-bottom: 42px;
  padding-bottom: 21px;

  @media ${props => props.theme.mediaQueries.sm} {
    padding-left: ${props => props.theme.spacing(4)}px;
    padding-right: ${props => props.theme.spacing(4)}px;
  }
`

export const CloseButton = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.gray2};
  width: 35px;
  height: 35px;
  border-radius: 50%;
  right: ${props => props.theme.spacing(4)}px;
  top: -18px;
  cursor: pointer;

  @media ${props => props.theme.mediaQueries.sm} {
    right: ${props => props.theme.spacing(3)}px;
  }
`

export const CloseIcon = styled(Icon)`
  width: 16px;
  height: 16px;
`

export const UnmetGoalCards = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 28px;

  @media ${props => props.theme.mediaQueries.md} {
    flex-direction: column;

    & > :first-child {
      order: 1;
    }
  }
`

export const UnmetGoalCard = styled.div`
  width: 100%;
  padding: 0 ${props => props.theme.spacing(5)}px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media ${props => props.theme.mediaQueries.lg} {
    padding: 0 ${props => props.theme.spacing(4)}px;
  }
  @media ${props => props.theme.mediaQueries.md} {
    padding: 0 ${props => props.theme.spacing(2)}px;
  }
  @media ${props => props.theme.mediaQueries.sm} {
    padding: 0;
  }
`

export const SectionTitle = styled(Text)`
  padding: 0 ${props => props.theme.spacing(13)}px;

  @media ${props => props.theme.mediaQueries.sm} {
    padding: 0;
  }
`
