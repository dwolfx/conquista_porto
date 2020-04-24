import styled from 'styled-components'

export const AddBtnLink = styled.div`
  border: 2px solid ${props => props.theme.colors.gray3};
  background-color: ${props => props.theme.colors.gray1};
  padding: 8px;
  margin-bottom: 30px;
  padding: 14px;
  cursor: pointer;
  width: 100%;
  height: 120px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  :hover {
    box-shadow: 0px 2px 7px 1px rgba(0, 0, 0, 0.3);
    transition: all ease 0.2s;
  }

  @media ${props => props.theme.mediaQueries.md} {
    width: 150px;
  }
`

export const Text = styled.span`
  text-align: ${props => props.textAlign || 'left'};
  font-weight: ${props => props.fontWeight || '300'};
  color: ${props => props.fontColor || props.theme.colors.black};
  line-height: ${props => props.lineHeight || '24px'};
  margin: ${props => props.margin || '0'};
  font-size: ${props => props.fontSize || '18px'};
  word-break: break-word;
  letter-spacing: ${props => props.letterSpacing || '0'};
`

export const TextBody = styled(Text)`
  ${props => props.theme.fontTypes.body};
`

export const TextHeading4 = styled(Text)`
  margin: 0 0 7px 0;
  text-align: center;
  ${props => props.theme.fontTypes.heading4};
`

export const TextHeadline = styled(Text)`
  ${props => props.theme.fontTypes.headline};
`

export const TextTitle = styled(Text)`
  ${props => props.theme.fontTypes.title};
`

export const TextSubheading = styled(Text)`
  ${props => props.theme.fontTypes.subheading};
`

export const TextCaptionUppercase = styled(Text)`
  ${props => props.theme.fontTypes.captionUppercase};
`
export const TextButton = styled(Text)`
  ${props => props.theme.fontTypes.TextButton};
`

export const PageTitle = styled.div`
  color: ${props => props.theme.colors.black};
  width: 100%;
  text-align: center;
  word-wrap: break-word;
`
export const Topic = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;

  svg {
    margin-right: 16px;
  }
`
export const TopicTitle = styled.p`
  font-size: 11px;
  font-weight: 600;
  color: ${props => props.theme.colors.gray6};
  letter-spacing: 1.5px;
  text-transform: uppercase;
  line-height: 21px;
`

export const EmptyContent = styled.article`
  background-color: ${props => props.theme.colors.white};
  padding-top: 22px;
  width: 90%;
  max-height: 120px;
  text-align: center;

  @media ${props => props.theme.mediaQueries.md} {
    width: 100%;
    order: 3;
  }
`

export const TopicValue = styled.span`
  color: ${props => props.theme.colors.gray6};
  line-height: 24px;
  word-break: break-word;
  ${props => props.theme.fontTypes.body};
`

export const ComplementaryInfo = styled.article`
  background-color: ${props => props.theme.colors.gray1};
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 22px;
  padding-top: 15px;
`
export const RowContent = styled.div`
  display: flex;
  border-top: 1px solid ${props => props.theme.colors.gray3};
`
export const RowContentColumnDir = styled.div`
  display: flex;
  border-top: 1px solid ${props => props.theme.colors.gray3};
  flex-direction: column;
  padding: 28px 16px;
`
export const Column = styled.div`
  flex: 1;
  height: 184px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
export const ColumnWithLine = styled.div`
  flex: 1;
  height: 184px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-right: 1px solid ${props => props.theme.colors.gray3};
`
export const LinearProgressTitleContent = styled.div`
  flex: 1;
  text-align: center;
  padding-top: 15px;
`

export const LinearProgressContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`
export const LinearProgressButtonContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  margin: 40px 0px;
`
export const VantagesContent = styled.div`
  background-color: white;
  display: flex;
  flex-flow: row wrap;
`

export const VantagesTitle = styled.div`
  padding: 28px 0px;
  flex-grow: 1;
  flex-basis: 100%;
  border-bottom: 1px solid ${props => props.theme.colors.gray3};
  text-align: center;
`
export const VantagesItem = styled.div`
  flex: 1;
  padding: 30px;
  border-right: 1px solid ${props => props.theme.colors.gray3};
  display: grid;
  grid-template-columns: 1fr 5fr;
`
