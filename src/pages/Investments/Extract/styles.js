import styled from 'styled-components'

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

  @media ${props => props.theme.mediaQueries.xs} {
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
  color: ${props => props.theme.colors.gray6};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1.5px;
  line-height: 21px;
  text-transform: uppercase;
`

export const Row = styled.div`
  display: flex;
  justify-content: ${props => (props.justify ? props.justify : 'flex-start')};

  @media ${props => props.theme.mediaQueries.xs} {
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
  color: ${props => props.theme.colors.gray6};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1.5px;
  line-height: 21px;
  text-transform: uppercase;
`

export const InfosData = styled.p`
  color: ${props => props.theme.colors.gray6};
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 24px;
  word-break: break-word;
`

export const TableTabs = styled.div`
  display: flex;
`

export const SelectWrapper = styled.div`
  background-color: ${props => props.theme.colors.white};
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
  color: ${props => props.theme.colors.blue4};
  cursor: pointer;
  font-size: 11px;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: 1.5px;
  outline: none;
  text-transform: uppercase;
`
