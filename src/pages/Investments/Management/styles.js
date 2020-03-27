import styled from 'styled-components'
import AccordionDefault from 'components/Accordion'
import { AccordionHeader, AccordionBody } from 'components/Accordion/styles'
import LeftNavDefault from 'components/Management/LeftNav'
import TopicsIconContent from 'components/TopicsIconContent'
import RightContentDefault from 'components/Management/RightContent'
import ConquistaText from 'components/Text'
import ConquistaIcon from 'components/IconExporter'
import ConquistaButton from 'components/Button'

export const LeftNav = styled(LeftNavDefault)`
  overflow: auto;
  @media ${props => props.theme.mediaQueries.md} {
    order: 2;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`

export const MiddleContent = styled.article`
  background-color: white;
  padding-top: 22px;
  width: 55%;

  @media ${props => props.theme.mediaQueries.md} {
    width: 100%;
    order: 3;
  }
`

export const GeneralInfo = styled.article`
  background-color: white;
  width: 25%;
  margin-left: 30px;
  height: fit-content;

  @media ${props => props.theme.mediaQueries.md} {
    width: 100%;
    margin: 0;
  }
`

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

export const PageTitle = styled.h4`
  font-weight: 300;
  color: ${props => props.theme.colors.black};
  letter-spacing: 0;
  word-wrap: break-word;
  font-size: 22px;
  line-height: 32px;
  text-align: center;
`

export const Topic = styled.div`
  align-items: flex-start;
  display: flex !important;
  justify-content: flex-start;

  svg {
    margin-right: 7px;
    min-width: 28px;
  }

  @media ${props => props.theme.mediaQueries.sm} {
    justify-content: center;
  }
`

export const TopicsContentRow = styled(TopicsIconContent)`
  margin: 28px 20px;
  width: 100%;
`

export const TopicTitle = styled.p`
  font-size: 11px;
  font-weight: 600;
  color: ${props => props.theme.colors.gray6};
  letter-spacing: 1.5px;
  text-transform: uppercase;
  line-height: 21px;
`

export const TopicValue = styled.span`
  font-weight: 300;
  color: ${props => props.theme.colors.gray6};
  letter-spacing: 0;
  line-height: 24px;
  word-break: break-word;
  font-size: 14px;
`

export const BalanceAccordion = styled(AccordionDefault)`
  margin: 20px 30px;

  @media ${props => props.theme.mediaQueries.md} {
    flex-direction: column;
    align-items: center;
  }

  ${AccordionHeader} {
    background-color: ${props => props.theme.colors.gray1};
    &:hover {
      background-color: ${props => props.theme.colors.gray4};
    }
  }

  ${AccordionBody} {
    padding: 0;
  }
`

export const AccordionGeneralInfo = styled(AccordionDefault)`
  @media ${props => props.theme.mediaQueries.md} {
    order: 1;
  }
`

export const Section = styled.article`
  padding: 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-top: 1px solid ${props => props.theme.colors.gray3};
`

export const HeaderNodeBalanceAccordion = styled.span`
  display: flex;
  justify-content: space-between;
  width: 95%;

  @media (max-width: 720px) {
    flex-direction: column;
    align-items: center;
  }
`

export const CurrentBalance = styled.div`
  padding: 12px 40px;
  background-color: ${props => props.theme.colors.gray1};
`

export const GrossIncome = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 30px;
  padding: 30px;
  border-radius: 3px;
  background-color: ${props => props.theme.colors.gray1};

  @media (max-width: 720px) {
    flex-direction: column;
  }
`

export const ChartContainer = styled.div`
  height: 400px;
  width: 570px;

  @media ${props => props.theme.mediaQueries.md} {
    width: 100vw;
  }
`

export const ChartTooltip = styled.div`
  background-color: black;
  opacity: 0.5;
  padding: 2px 6px;
  border: 1px solid ${props => props.theme.colors.gray3};
  border-radius: 3px;

  span {
    color: white;
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

export const SectionCustomPicture = styled.section`
  padding: 0;
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : 'white'};
`

export const CustomContent = styled.div`
  display: flex;
  margin: 0 auto;

  @media (min-width: 1200px) {
    width: 1200px;
  }

  @media ${props => props.theme.mediaQueries.md} {
    text-align: center;
    padding: 0 8px 22px 8px;
  }
`

export const Picture = styled.picture`
  overflow: hidden;

  img {
    margin-left: -350px;
    height: 100%;

    @media ${props => props.theme.mediaQueries.md} {
      display: none;
    }
  }
`

export const DescriptionContent = styled.div`
  padding-top: 22px;
  h1 {
    padding-bottom: 30px;
    font-size: 34px;
    -webkit-letter-spacing: 0.5px;
    -moz-letter-spacing: 0.5px;
    -ms-letter-spacing: 0.5px;
    letter-spacing: 0.5px;
    line-height: 44px;
    font-weight: 300;
    color: black;
  }

  p {
    font-weight: 300;
    font-size: 18px;
    line-height: 28px;
    margin-bottom: 28px;
    padding-right: 16px;
  }
`

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-top: 22px;

  thead {
    background-color: ${props => props.theme.colors.gray3};
    tr {
      th {
        padding: 22px 0;
        font-size: 11px;
        font-weight: 300;
        color: ${props => props.theme.colors.black};
        letter-spacing: 1px;
        text-transform: uppercase;
        line-height: 14px;
      }
    }
  }

  tbody {
    tr {
      td {
        color: ${props => props.theme.colors.gray6};
        font-size: 11px;
        letter-spacing: 1px;
        line-height: 14px;
        text-align: center;
        border: 1px solid ${props => props.theme.colors.gray3};
        padding: 22px 20px;
        text-transform: uppercase;
        opacity: 0.9;
      }
    }
  }
`

export const RowBankTransition = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${props => props.marginTop};
  width: ${props => props.width};
  border-top: ${props => props.borderTop || 'unset'};
`

export const BankTransitionDateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const CompleteExtract = styled.p`
  font-size: 11px;
  line-height: 21px;
  letter-spacing: 1.5px;
  -webkit-appearance: none;
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${props => props.theme.colors.blue4};
  margin-top: 22px;
  font-weight: 600;

  :hover {
    color: ${props => props.theme.colors.blue5};
  }
`

export const ComplementaryInfo = styled.article`
  background-color: ${props => props.theme.colors.gray1};
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 22px;
`

export const FundCategoryText = styled(ConquistaText).attrs(() => ({
  type: 'subheading',
  bold: true,
}))`
  text-transform: uppercase;
  margin: 0 0 14px 0;
  text-align: center;
`

export const RightContent = styled(RightContentDefault)`
  width: 100%;
`

export const SelectBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  & svg {
    margin-left: 7px;
  }
`

export const SelectItem = styled.div`
  width: 100%;
  padding: 0 21px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.gray2};
  }
`

export const SelectIcon = styled(ConquistaIcon).attrs(props => ({
  name: props.name,
  color: props.color,
}))`
  width: 21px;
  height: 21px;
  background-color: ${props => props.theme.colors.blue4};
  border-radius: 50%;
  stroke: ${props => props.name === 'arrowdown' && props.theme.colors.white};
`

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 28px 0 56px 0;
`

export const CustomConquistaButton = styled(ConquistaButton)`
  min-width: 231px;
  margin: 7px;
  padding: 0 28px;
  max-width: 100%;
`

export const LoadingContainer = styled.div`
  margin: 0 auto;
  width: 480px;
`

export const LockIcon = styled(ConquistaIcon).attrs(() => ({ name: 'lock' }))`
  fill: ${props => props.theme.colors.gray4};
  width: 28px;
`
