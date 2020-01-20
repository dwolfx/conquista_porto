import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Icon from 'components/IconExporter'
import { Container, MenuContainer, Option, OptionName } from './styles'

export default function Menu({ scrollFunc, ref1, ref2, ref3 }) {
  const [selectedOption, setSelectedOption] = useState('produtos')

  function checkScroll() {
    let row1Pos = null
    let row2Pos = null
    let row3Pos = null

    if (!!ref1.current && !!ref2.current && !!ref3.current) {
      row1Pos = ref1.current.getBoundingClientRect().top
      row2Pos = ref2.current.getBoundingClientRect().top
      row3Pos = ref3.current.getBoundingClientRect().top
    }

    if (window.scrollY < row1Pos) {
      setSelectedOption('produtos')
    } else if (window.scrollY >= row2Pos && window.scrollY < row3Pos) {
      setSelectedOption('objetivos')
    } else if (window.scrollY >= row3Pos) {
      setSelectedOption('pontos')
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', checkScroll)

    return () => {
      window.removeEventListener('scroll', checkScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleClick(id, type) {
    setSelectedOption(type)
    scrollFunc(id)
  }

  return (
    <Container>
      <MenuContainer>
        <Option
          isSelected={selectedOption === 'produtos'}
          onClick={() => handleClick('t1', 'produtos')}
        >
          <Icon name="apps" />
          <OptionName>Produtos</OptionName>
        </Option>
        <Option
          isSelected={selectedOption === 'objetivos'}
          onClick={() => handleClick('t2', 'objetivos')}
        >
          <Icon name="target" />
          <OptionName>Objetivos</OptionName>
        </Option>
        <Option
          isSelected={selectedOption === 'pontos'}
          onClick={() => handleClick('t3', 'pontos')}
        >
          <Icon name="diamond" />
          <OptionName>Pontos</OptionName>
        </Option>
      </MenuContainer>
    </Container>
  )
}

Menu.propTypes = {
  scrollFunc: PropTypes.func.isRequired,
  ref1: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ref2: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ref3: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
}
