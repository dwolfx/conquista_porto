import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  MutableRefObject,
} from 'react'

import {
  StSelectWrapper,
  StSelectContainer,
  StOptionsContainer,
  StOptionsUl,
  StOptionLi,
  StOptionIcon,
  StSelectedListContainer,
  StSelectedListUl,
  StSelectedListLi,
  StSelectedListButton,
  StText,
  StSelectedListIcon,
} from './styles'

import { dict } from 'components/IconExporter'

import InputText from 'components/NewInput'
import Icon from 'components/IconExporter'
import Text from 'components/Text'
import Loading from 'components/Loading'

import { IProps, IOption } from './types'

/** This component is a multi selector
 *
 * @component
 * @param {Object} props
 * @param {Array} options
 * @param {Boolean} disabled
 * @param {String} inputLabel
 * @param {Boolean} loading
 * @param {Function} onChange
 * @return {*}
 *
 * @example
 * const options = [
 *  { text: 'Brasil', id: 1, value: 'brasil' },
 *  { text: 'Alemanha', id: 2, value: 'alemanha' },
 *  { text: 'Itália', id: 3, value: 'italia' },
 *  { text: 'Estados Unidos', id: 4, value: 'estadosunidos' },
 *  { text: 'Espanha', id: 5, value: 'espanha' },
 *  { text: 'Inglaterra', id: 6, value: 'inglaterra' },
 *  { text: 'Paises Baixos', id: 7, value: 'paisesbaixos' },
 * ]
 *
 * <MultiSelector
 *  options={options}
 *  onChange={(val) => val}
 *  inputLabel='Você irá para qual(is) país(es)'
 * />
 */

const MultiSelector: React.FC<IProps> = ({
  options,
  disabled = false,
  inputLabel = 'Selecione',
  loading = false,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState('')
  const [filteredOptions, setFilteredOptions] = useState<IOption[]>([])
  const [selectOptionsDropdown, setSelectOptionsDropdown] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<IOption[]>([])
  const [selectIcon, setSelectIcon] = useState<keyof typeof dict>('arrowdown')

  const selectContainerElement = useRef<HTMLDivElement>() as MutableRefObject<
    HTMLDivElement
  >
  const handleClickOutsideSelectContainerElement = useCallback(
    (event: MouseEvent) => {
      if (
        selectOptionsDropdown &&
        !selectContainerElement.current.contains(event.target as Node)
      ) {
        setSelectOptionsDropdown(false)
      }
    },
    [selectOptionsDropdown, selectContainerElement]
  )

  const handleChange = useCallback(
    selectedOptions => onChange(selectedOptions),
    [onChange]
  )

  //filter select options on input change
  useEffect(() => {
    if (inputValue) {
      const filteredArray = options.filter(option =>
        option.text.toLowerCase().includes(inputValue.toLowerCase())
      )
      if (!filteredArray.length) {
        setFilteredOptions(options)
      } else {
        setFilteredOptions(filteredArray)
      }
    } else {
      setFilteredOptions(options)
    }
  }, [inputValue, options])

  //toggle select options
  useEffect(() => {
    document.body.addEventListener(
      'mousedown',
      handleClickOutsideSelectContainerElement
    )
    if (!selectOptionsDropdown) {
      return document.body.removeEventListener(
        'mousedown',
        handleClickOutsideSelectContainerElement
      )
    }
  }, [selectOptionsDropdown, handleClickOutsideSelectContainerElement])

  //check icon
  useEffect(() => {
    if (!selectOptionsDropdown && !disabled) {
      setSelectIcon('arrowdown')
    }
    if (selectOptionsDropdown && !disabled) {
      setSelectIcon('arrowup')
    }
    if (disabled) {
      setSelectIcon('lock')
    }
  }, [disabled, selectOptionsDropdown])

  //get selectedOptions array
  useEffect(() => {
    handleChange(selectedOptions)
  }, [selectedOptions, handleChange])

  function addOptionToSelectList(option: IOption) {
    function checkIfOptionAlreadyExistsOnSelectedOptions(
      actualArray: Array<IOption>,
      newItem: IOption
    ) {
      return actualArray.some(item => item.value === newItem.value)
    }

    if (checkIfOptionAlreadyExistsOnSelectedOptions(selectedOptions, option)) {
      removeOptionToSelectList(option)
    } else {
      setSelectedOptions(arr => arr.concat(option))
    }
  }

  function removeOptionToSelectList(option: IOption) {
    setSelectedOptions(arr => arr.filter(item => item.id !== option.id))
  }

  function handleOptionClick(option: IOption) {
    if (selectedOptions.some(item => item.id === option.id)) {
      removeOptionToSelectList(option)
    } else {
      addOptionToSelectList(option)
    }
  }

  return (
    <StSelectContainer ref={selectContainerElement} data-testid={'select'}>
      <StSelectWrapper>
        <InputText
          onFocus={() => setSelectOptionsDropdown(true)}
          label={inputLabel}
          placeholder="Selecione"
          onChange={e => setInputValue(e.target.value)}
          disabled={disabled}
          suffix={
            loading ? (
              <Loading type="spinner" color="blue4" />
            ) : (
              <Icon
                name={selectIcon}
                color={disabled ? 'gray4' : 'gray6'}
                width={21}
                height={21}
              />
            )
          }
        />
        <StOptionsContainer $hasOptions={selectOptionsDropdown}>
          <StOptionsUl>
            {filteredOptions.map(option => (
              <StOptionLi
                key={option.id}
                onClick={() => handleOptionClick(option)}
              >
                <Text type="headline">{option.text}</Text>
                {selectedOptions.some(item => item.id === option.id) ? (
                  <StOptionIcon
                    color="blue4"
                    name="remove"
                    width={21}
                    height={21}
                  />
                ) : (
                  <StOptionIcon
                    color="blue4"
                    name="add"
                    width={21}
                    height={21}
                  />
                )}
              </StOptionLi>
            ))}
          </StOptionsUl>
        </StOptionsContainer>
      </StSelectWrapper>
      <StSelectedListContainer $selectedOptionsLength={selectedOptions.length}>
        <StSelectedListUl>
          {selectedOptions.map(option => (
            <StSelectedListLi key={option.id}>
              <StSelectedListButton>
                <StText type="subheading" textTransform="uppercase">
                  {option.text}
                </StText>
                <StSelectedListIcon
                  onClick={() => removeOptionToSelectList(option)}
                  color="blue4"
                  name="removeMultiselector"
                  width={21}
                  height={21}
                />
              </StSelectedListButton>
            </StSelectedListLi>
          ))}
        </StSelectedListUl>
      </StSelectedListContainer>
    </StSelectContainer>
  )
}

export default MultiSelector
