import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
`

export const GraphHolder = styled.div`
  width: 100%;
  height: 350px;
  margin-bottom: 40px;
  margin-top: -50px;
`

export const Text = styled.p`
  font-size: ${props => (props.fontSize ? `${props.fontSize}px` : '16px')};
  line-height: ${props =>
    props.lineHeight ? `${props.lineHeight}px` : 'normal'};
  font-weight: ${props => (props.weight ? 'bold' : 'regular')};
  letter-spacing: ${props => (props.spacing ? `${props.spacing}px` : 'normal')};
  margin: ${props => (props.margin ? props.margin : '0px')};
`

export const General = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 30px;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${props => (props.margin ? props.margin : '0px')};
`

export const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const LinkButton = styled.p`
  font-size: 11px;
  line-height: 21px;
  letter-spacing: 1.5px;
  -webkit-appearance: none;
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #30c5ff;
  margin: 28px 0px 14px 0px;
  font-weight: 600;

  :hover {
    color: #2591bb;
  }
`

export const LineDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.5);
  margin: 15px 0px;
`

export const InfoList = styled.ul``

export const InfoItem = styled.li`
  margin-bottom: 20px;
  list-style: none;
  color: rgba(0, 0, 0, 0.5);

  &::before {
    content: '•';
    color: rgba(0, 0, 0, 0.5);
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    margin-left: -1em;
  }
`
