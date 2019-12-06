import styled from 'styled-components'
import breakpoints from 'styles/breakpoints'

export const Section = styled.section`
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : props.theme.colors.white};
  padding-top: 30px;
  padding-bottom: 30px;
  text-align: center;
`

export const Container = styled.div`
  margin: 0 auto;
  width: 1200px;

  @media ${breakpoints.mobile} {
    width: 100%;
  }
`

export const SectionTitle = styled.h3`
  font-size: 34px;
  font-weight: 300;
  letter-spacing: 0.5px;
  line-height: 44px;
`

export const SectionSubTitle = styled.h3`
  color: #1c1c1c;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1.5px;
  line-height: 21px;
  text-transform: uppercase;
`

export const Row = styled.div`
  display: flex;
  justify-content: ${props => (props.justify ? props.justify : 'flex-start')};

  @media ${breakpoints.mobile} {
    flex-wrap: wrap;
  }
`

export const AccountInfoWrapper = styled.div`
  display: flex;
  margin-top: 30px;
`

export const InfosWrapper = styled.div`
  margin-left: 12px;
  text-align: left;
`

export const InfosLabel = styled.p`
  color: #1c1c1c;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1.5px;
  line-height: 21px;
  text-transform: uppercase;
`

export const InfosData = styled.p`
  color: #1c1c1c;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 24px;
  word-break: break-word;
`

export const TableTabs = styled.div`
  display: flex;
`

export const TableTab = styled.div`
  background-image: linear-gradient(to bottom, #ffffff 0%, #f0f0f0 100%);
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-radius: 6px 6px 0 0;
  cursor: pointer;
  height: 3rem;
  font-size: 10px;
  font-weight: 700;
  flex: 1 1 0;
  letter-spacing: 2px;
  letter-spacing: 1.5px;
  margin-top: 0.75rem;
  padding-top: 1.75em;
  text-align: center;
  text-transform: uppercase;
  vertical-align: middle;

  &.active {
    background-image: linear-gradient(to bottom, #ffffff 0%, #f7f7f7 100%);
    height: 3.75rem;
    margin-top: 0;
    padding-top: 2em;
    border-bottom: 4px solid ${props => props.theme.colors.lightPrimary};
  }
`

export const SelectWrapper = styled.div`
  background-color: #fff;
  display: flex;
  padding: 30px 60px;

  label {
    font-size: 10px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }
`

export const FilterButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${props => props.theme.colors.lightPrimary};
  font-size: 11px;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: 1.5px;
  outline: none;
  text-transform: uppercase;
`
