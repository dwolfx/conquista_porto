import styled from 'styled-components'

import Text from 'components/Text'

interface ICard {
  hasFooter: boolean
}

export const CardWrapper = styled.div<ICard>`
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray2};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 10px 14px ${props => (props.hasFooter ? '0' : '10px')};
`

export const CardHeader = styled.div`
  align-items: center;
  background-color: ${props => props.theme.colors.white};
  border-bottom: 1px solid ${props => props.theme.colors.gray2};
  display: flex;
  min-height: 63px;
  padding: 0 14px;
`

export const CardIcon = styled.div`
  align-items: center;
  background-image: linear-gradient(
    135deg,
    ${props => props.theme.colors.blue5},
    ${props => props.theme.colors.blue4}
  );
  border-radius: 50%;
  display: flex;
  height: 35px;
  justify-content: center;
  margin-right: ${props => `${props.theme.spacing(2)}px`};
  padding: 7px;
  width: 35px;

  @media ${props => props.theme.mediaQueries.sm} {
    margin-right: ${props => `${props.theme.spacing(1)}px`};
  }
`

export const CardIconInfo = styled.div`
  display: flex;
  justify-content: center;
  width: 21px;

  svg {
    width: 21px;
    height: 21px;
  }
`

export const CardTitle = styled(Text).attrs(() => ({
  type: 'headline',
  bold: true,
}))``

export const CardBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
`

export const CardFooter = styled.div`
  align-items: center;
  background-color: ${props => props.theme.colors.white};
  border-top: 1px solid ${props => props.theme.colors.gray2};
  display: flex;
  min-height: 63px;
`
