import styled from 'styled-components'

export const Container = styled.div`
  width: ${props => props.width || '100%'};
  margin: ${props => props.margin || '0'};
  background-color: ${props => props.theme.colors.gray1};

  div:first-child {
    position: relative;
    background-color: ${props =>
      props.now === props.max
        ? props.theme.colors.green3
        : props.theme.colors.blue4};
    height: 28px;
    width: ${props => props.progress || '100%'};

    span {
      position: absolute;
      margin-left: -32px;
      left: 100%;
      display: inline-block;
      word-break: keep-all;
      text-align: center;
      font-size: 12px;
      width: 60px;
      height: 28px;
      line-height: 28px;
      bottom: calc(100% + 15px);
      background-color: ${props =>
        props.now === props.max
          ? props.theme.colors.green1
          : props.theme.colors.blue1};
      border: 1px solid;
      border-color: ${props =>
        props.now === props.max
          ? props.theme.colors.green3
          : props.theme.colors.blue4};
      padding: 0 3px;
      border-radius: 3px;

      :before {
        content: '';
        border-left: 7px solid transparent;
        border-top: 7px solid;
        border-top-color: ${props =>
          props.now === props.max
            ? props.theme.colors.green3
            : props.theme.colors.blue4};
        border-right: 7px solid transparent;
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
      }

      :after {
        content: '';
        border-left: 7px solid transparent;
        border-top: 7px solid;
        border-top-color: ${props =>
          props.now === props.max
            ? props.theme.colors.green3
            : props.theme.colors.blue4};
        border-right: 7px solid transparent;
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-right-width: 6px;
        border-left-width: 6px;
        border-top: 5px solid;
        border-top-color: ${props =>
          props.now === props.max
            ? props.theme.colors.green1
            : props.theme.colors.blue1};
      }
    }
  }
  div:nth-child(2) {
    position: relative;
    background-color: white;
    display: flex;
    justify-content: space-between;
    line-height: 18px;
    font-weight: 300;
    font-size: 12px;
    padding-top: 6px;
  }
`

export const Subtitle = styled.span`
  position: absolute;
  left: 100%;
  margin-left: 2px;
  text-transform: uppercase;
`
