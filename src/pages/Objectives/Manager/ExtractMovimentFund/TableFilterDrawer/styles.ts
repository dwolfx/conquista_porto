import styled from 'styled-components'

import Button from 'components/Button'
import Icon from 'components/IconExporter'

export const FilterDrawerHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  @media ${props => props.theme.mediaQueries.lg} {
    margin: 0;
  }

  @media ${props => props.theme.mediaQueries.xs} {
    margin: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const DatePickerContainer = styled.div`
  margin: ${({ theme }) => `${theme.spacing(2)}px 0 0`};
`

export const HeaderColTitle = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const PrevButton = styled(Icon)`
  cursor: pointer;
  transition: all ease 0.3s;

  &:hover {
    fill: ${props => props.theme.colors.blue4};
  }
`

export const CloseButton = styled(Icon)`
  cursor: pointer;
  transition: all ease 0.3s;

  &:hover {
    fill: ${props => props.theme.colors.blue4};
  }
`

export const ButtonSubmit = styled(Button)`
  width: 100%;
  margin: ${({ theme }) => `0 ${theme.spacing(2)}px`};

  & + button {
    margin-left: 0;
  }
`

export const PeriodButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: ${({ theme }) => `${theme.spacing(2)}px 0 ${theme.spacing(4)}px`};
`

export const ContentWrapper = styled.div`
  padding: ${({ theme }) => `${theme.spacing(4)}px ${theme.spacing(3)}px`};
`

export const FooterWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`

export const FooterButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: ${({ theme }) => `${theme.spacing(2)}px 0`};
`

export const FilterContentWrapper = styled.div`
  margin: ${({ theme }) => `${theme.spacing(4)}px 0`};
`

export const FilterButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: ${({ theme }) => `${theme.spacing(2)}px 0 ${theme.spacing(4)}px`};

  > button {
    margin-right: ${({ theme }) => theme.spacing(1)}px;
    margin-bottom: ${({ theme }) => theme.spacing(1)}px;
    &:last-child : {
      margin: 0;
    }
  }
`
