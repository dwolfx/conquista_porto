import styled from 'styled-components'
import Text from 'components/Text'
import Button from 'components/Button'
import { Col, Row } from 'styled-bootstrap-grid'

export const Container = styled.div`
  max-width: 1280px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
  margin-left: auto;
  margin-right: auto;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;

  @media ${props => props.theme.mediaQueries.lgUp} {
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.gray3};
  }

  @media ${props => props.theme.mediaQueries.lg} {
    height: calc(100% - 63px);
    margin: 0;
  }
`
export const GridRow = styled(Row)`
  margin: 0;
  height: 100%;
  width: 100%;
`
export const GridCol = styled(Col)`
  margin: 0;
  height: 100%;
  width: 100%;

  @media ${props => props.theme.mediaQueries.lg} {
    overflow: auto;
  }

  @media ${props => props.theme.mediaQueries.xs} {
    padding-right: 0;
    padding-left: 0;
  }
`
export const Main = styled.div`
  min-height: 455px;
  padding-left: ${({ theme }) => theme.spacing(6)}px;
  padding-right: ${({ theme }) => theme.spacing(6)}px;
  background-color: ${({ theme }) => theme.colors.white};

  @media ${props => props.theme.mediaQueries.lg} {
    margin-top: ${({ theme }) => theme.spacing(2)}px;
    padding-left: ${({ theme }) => theme.spacing(4)}px;
    padding-right: ${({ theme }) => theme.spacing(4)}px;
  }

  @media ${props => props.theme.mediaQueries.xs} {
    padding-right: ${({ theme }) => theme.spacing(2)}px;
    padding-left: ${({ theme }) => theme.spacing(2)}px;
  }
`
export const WrapperTitle = styled.div`
  padding: ${({ theme }) => theme.spacing(2)}px;
`
export const Title = styled(Text)`
  font-family: ${({ theme }) => theme.fontTypes.heading4};
  font-style: normal;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.gray6};
`
export const WrapperTermItems = styled.div`
  margin-top: ${({ theme }) => theme.spacing(1)}px;
`
export const TermItemText = styled(Text)`
  padding-top: ${({ theme }) => theme.spacing(2)}px;
  padding-bottom: ${({ theme }) => theme.spacing(2)}px;
`
export const CheckboxContainer = styled.div`
  margin: ${({ theme }) => theme.spacing(3)}px 0;
  display: flex;
`
export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: ${({ theme }) => theme.spacing(2)}px;
  padding-right: ${({ theme }) => theme.spacing(2)}px;
  padding-bottom: ${({ theme }) => theme.spacing(2)}px;

  @media ${props => props.theme.mediaQueries.lg} {
    background-color: ${({ theme }) => theme.colors.white};
    min-height: 63px;
  }

  @media ${props => props.theme.mediaQueries.xs} {
    padding-left: 0;
    padding-right: 0;
  }
`
export const Controls = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: ${({ theme }) => theme.spacing(3)}px;
  padding-top: ${({ theme }) => theme.spacing(2)}px;

  @media ${props => props.theme.mediaQueries.xs} {
    padding-top: ${({ theme }) => theme.spacing(2)}px;
    padding-right: ${({ theme }) => theme.spacing(2)}px;
    padding-left: ${({ theme }) => theme.spacing(2)}px;
    justify-content: space-between;
  }
`
export const ButtonsCtrls = styled(Button)`
  margin-left: ${({ theme }) => theme.spacing(1)}px;

  @media ${props => props.theme.mediaQueries.xs} {
    width: calc(50% - 7px);
    margin-left: 0;
  }
`
