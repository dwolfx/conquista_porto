import styled from 'styled-components'

export const BreadcrumbContainer = styled.div`
  @media (max-width: 1000px) {
    padding-left: 30px;
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

  @media (max-width: 1000px) {
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
  display: flex !important;
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

export const TopicValue = styled.span`
  font-weight: 300;
  color: ${props => props.theme.colors.gray6};
  letter-spacing: 0;
  line-height: 24px;
  word-break: break-word;
  font-size: 14px;
`

export const InvoiceContainer = styled.article`
  padding-top: 22px;
`

export const InvoiceHeader = styled.div`
  border-top: 1px solid ${props => props.theme.colors.gray3};
  border-bottom: 1px solid ${props => props.theme.colors.gray3};

  display: flex;
`

export const ComplementaryInfo = styled.article`
  background-color: ${props => props.theme.colors.gray1};
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 22px;
`

export const DateContent = styled.div`
  width: 50%;
  padding: 22px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:first-child {
    border-right: 1px solid ${props => props.theme.colors.gray3};
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

export const Invoice = styled.div`
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const InvoiceItem = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-around;
  background-color: ${props => props.theme.colors.gray1};
  padding: 14px 0;
  border-radius: 4px;
  margin-bottom: 14px;
`
