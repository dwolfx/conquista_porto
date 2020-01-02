import styled from 'styled-components'

export const Container = styled.section`
  height: 340px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background-color: ${props => props.theme.colors.gray5};
`

export const Content = styled.div`
  text-align: center;
  z-index: 1;

  p {
    max-width: 989px;
    margin: 0 auto;
    font-size: 18px;
    line-height: 28px;
    color: white;
  }

  .button-with-right-icon {
    span.icon {
      position: absolute;
      top: 7px;
      right: 12px;
      font-size: 13px;
    }
  }
`

export const ImageBackground = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  height: 100%;
  z-index: 0;
  opacity: 0.3;
  transform: translate(-50%, -50%);
`

export const Title = styled.h1`
  padding-bottom: 30px;
  text-align: center;
  font-size: 34px;
  letter-spacing: 0.5px;
  line-height: 44px;
  font-weight: 300;
  color: ${props => (props.textColor ? props.textColor : 'white')};
`
