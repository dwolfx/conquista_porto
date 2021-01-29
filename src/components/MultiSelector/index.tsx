import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  MutableRefObject,
} from 'react'

import { dict } from 'components/IconExporter'
import InputText from 'components/NewInput'
import Icon from 'components/IconExporter'
import Text from 'components/Text'
import Loading from 'components/Loading'

import { IProps, IOption } from './types'

import * as s from './styles'

/** This component is a multi selector
 *
 * @component
 * @param {Object} props
 * @param {Array<IOption>} options
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
  error = false,
  options,
  disabled = false,
  inputLabel = 'Selecione',
  loading = false,
  onChange,
  onFocusFunction = () => {},
  selectedOptions,
  setSelectedOptions,
  optionsContainerHeight = 350,
  showLockIconIfDisable = true,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState('')
  const [filteredOptions, setFilteredOptions] = useState<IOption[]>([])
  const [selectOptionsDropdown, setSelectOptionsDropdown] = useState(false)
  const [selectIcon, setSelectIcon] = useState<keyof typeof dict>('arrowdown')

  const selectContainerElement = useRef<HTMLDivElement>() as MutableRefObject<
    HTMLDivElement
  >
  const handleClickOutsideSelectContainerElement = useCallback(
    (event: MouseEvent) => {
      if (
        selectOptionsDropdown &&
        !selectContainerElement.current?.contains(event.target as Node)
      ) {
        setSelectOptionsDropdown(false)
      }
    },
    [selectOptionsDropdown, selectContainerElement]
  )

  const handleChange = useCallback(selected => onChange(selected), [onChange])

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
    if (showLockIconIfDisable && disabled) {
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
      setSelectedOptions((arr: IOption[]) => arr.concat(option))
    }
  }

  function removeOptionToSelectList(option: IOption) {
    setSelectedOptions((selectedOptions: IOption[]) =>
      selectedOptions.filter(
        (selectedOption: { id: number }) => selectedOption.id !== option.id
      )
    )
  }

  function handleOptionClick(option: IOption) {
    if (selectedOptions.some((item: { id: number }) => item.id === option.id)) {
      removeOptionToSelectList(option)
    } else {
      addOptionToSelectList(option)
    }
  }

  return (
    <s.SelectContainer
      ref={selectContainerElement}
      data-testid={'select'}
      {...rest}
    >
      <s.SelectWrapper>
        <InputText
          error={
            error
              ? {
                  icon: 'alertrounded',
                  message:
                    'Erro ao carregar informações. Por favor, tente novamente',
                }
              : false
          }
          onFocus={() => {
            onFocusFunction()
            setSelectOptionsDropdown(true)
          }}
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
        <s.OptionsContainer
          optionsContainerHeight={optionsContainerHeight}
          $hasOptions={selectOptionsDropdown}
          optionBoxDirection="top"
        >
          <s.OptionsUl>
            {filteredOptions.map(option => (
              <s.OptionLi
                key={option.id}
                onClick={() => handleOptionClick(option)}
              >
                <Text type="headline">{option.text}</Text>
                {selectedOptions.some(
                  (item: { id: number }) => item.id === option.id
                ) ? (
                  <s.OptionIcon
                    color="blue4"
                    name="remove"
                    width={21}
                    height={21}
                  />
                ) : (
                  <s.OptionIcon
                    color="blue4"
                    name="add"
                    width={21}
                    height={21}
                  />
                )}
              </s.OptionLi>
            ))}
          </s.OptionsUl>
        </s.OptionsContainer>
      </s.SelectWrapper>
      <s.SelectedListContainer $selectedOptionsLength={selectedOptions.length}>
        <s.SelectedListUl>
          {selectedOptions.map((option: IOption) => (
            <s.SelectedListLi key={option.id}>
              <s.SelectedListButton>
                <s.Text type="subheading" textTransform="uppercase">
                  {option.text}
                </s.Text>
                <s.SelectedListIcon
                  onClick={() => removeOptionToSelectList(option)}
                  color="blue4"
                  name="removeMultiselector"
                  width={21}
                  height={21}
                />
              </s.SelectedListButton>
            </s.SelectedListLi>
          ))}
        </s.SelectedListUl>
      </s.SelectedListContainer>
    </s.SelectContainer>
  )
}

export default MultiSelector
