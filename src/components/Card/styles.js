import styled from 'styled-components'

import Text from 'components/Text'

export const CardWrapper = styled.div`
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
  height: 63px;
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
  margin-right: ${props => `${props.theme.gutter}px`};
  padding: 7px;
  width: 35px;
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
  /* padding: 0 14px; */
`

export const CardFooter = styled.div`
  align-items: center;
  background-color: ${props => props.theme.colors.white};
  border-top: 1px solid ${props => props.theme.colors.gray2};
  display: flex;
  height: 63px;
`
