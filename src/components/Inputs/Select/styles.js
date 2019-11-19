import styled from 'styled-components'
import commonStyles from '../../../styles/theme'
import ArrowDown from '../../../assets/icons/arrow-down.svg'

export const SelectField = styled.select`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #d2d2d2;
  cursor: pointer;
  height: 42px;
  padding-left: 0;
  position: relative;
  width: 100%;
`

export const SelectLabel = styled.label`
  position: absolute;
  transition: all ease 0.3s;
  z-index: 0;
  top: -13px;
  font-size: 12px;
`

export const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  width: ${props => (props.width ? `${props.width}%` : '100%')};
  padding-right: ${props =>
    props.paddingRight ? `${props.paddingRight}px` : 0};
  padding-left: ${props => (props.paddingLeft ? `${props.paddingLeft}px` : 0)};

  &:before {
    content: '';
    width: 20px;
    height: 20px;
    background-color: ${commonStyles.colors.lightSecondary};
    border-radius: 50%;
    display: block;
    position: absolute;
    top: calc(50% - 10px);
    right: ${props => (props.paddingRight ? `${props.paddingRight}px` : '0')};
    z-index: 1;
  }
  &:after {
    content: '';
    width: 12px;
    height: 12px;
    mask-image: url(${ArrowDown});
    background-color: yellow;
    position: absolute;
    display: block;
    top: calc(50% - 5px);
    right: ${props =>
      props.paddingRight ? `${props.paddingRight + 4}px` : '4px'};
    z-index: 1;
    background-repeat: no-repeat;
  }
`
