import styled from 'styled-components'

import ConquistaIcon from 'components/IconExporter'
import TextComponent from 'components/Text'

export const TaxationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin: ${({ theme }) => theme.spacing(2)}px 0 0 0;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin: ${({ theme }) => theme.spacing(2)}px
      ${({ theme }) => theme.spacing(2)}px 0;
    width: auto;
  }
`

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  height: ${({ theme }) => theme.spacing(4)}px;
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
`

export const ScaleIcon = styled(ConquistaIcon).attrs(() => ({
  name: 'scale',
}))`
  height: ${({ theme }) => theme.spacing(3)}px;
`

export const Title = styled(TextComponent).attrs(() => ({
  type: 'subheading',
}))`
  margin-left: ${({ theme }) => theme.spacing(2)}px;
  text-transform: uppercase;
`

export const Ul = styled.ul`
  display: grid;
  margin: ${({ theme }) => theme.spacing(2)}px 0;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;
  list-style: none;
  grid-gap: 0;

  & li:nth-last-child(-n + 3) {
    margin-bottom: 0;
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    grid-template-columns: repeat(2, 1fr);
    margin-top: ${({ theme }) => theme.spacing(1)}px;
  }
`

export const Li = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  position: relative;
`

export const LiTitle = styled(TextComponent).attrs(() => ({
  type: 'captionUppercase',
  color: 'gray4',
}))`
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`

export const LiValue = styled(TextComponent).attrs(() => ({
  type: 'headline',
  color: 'gray6',
}))``

export const TaxationInfo = styled.div`
  background-color: ${({ theme }) => theme.colors.gray2};
  border-radius: 8px;
  height: ${({ theme }) => theme.spacing(10)}px;
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
  padding: ${({ theme }) => theme.spacing(3)}px
    ${({ theme }) => theme.spacing(3)}px 0;
  text-align: center;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    height: auto;
    padding: ${({ theme }) => theme.spacing(3)}px;
    margin-bottom: ${({ theme }) => theme.spacing(4)}px;
  }
`
