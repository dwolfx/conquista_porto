import styled from 'styled-components'
import ComponentText from 'components/Text'

export const ConfigurationBody = styled.div`
  display: flex;
  width: 100%;
  background-color: ${props => props.theme.colors.gray2};
  justify-content: center;
  padding: 30px 0;
  border-bottom: 1px solid ${props => props.theme.colors.gray4};

  @media ${props => props.theme.mediaQueries.mdUp} {
    background-color: ${props => props.theme.colors.white};
  }
`
export const ConfigurationSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 1200px;
  align-items: center;
  padding: 15px 0;
  margin: 0 auto;
`
export const Text = styled(ComponentText)`
  width: 100%;
  text-align: center;
  padding-bottom: 30px;
`
export const CheckboxWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-top: 15px;
  flex-direction: column;

  @media ${props => props.theme.mediaQueries.mdUp} {
    width: 900px;
  }

  @media (min-width: 548px) {
    flex-direction: row;
  }
`
export const CheckboxGroup = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
  border-right: none;
  &:last-child {
    border-right: none;
  }

  @media ${props => props.theme.mediaQueries.mdUp} {
    border-right: 1px solid ${props => props.theme.colors.gray4};
  }
`
