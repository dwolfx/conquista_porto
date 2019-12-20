import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Icon from 'components/IconExporter'
import { Container, MenuContainer, Option, OptionName } from './styles'

export default function Menu({ scrollFunc }) {
  const [selectedOption, setSelectedOption] = useState('produtos')

  function checkScroll() {
    if (window.scrollY < 240) {
      setSelectedOption('produtos')
    } else if (window.scrollY >= 240 && window.scrollY < 688) {
      setSelectedOption('objetivos')
    } else if (window.scrollY >= 688) {
      setSelectedOption('pontos')
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', checkScroll)

    return () => {
      window.removeEventListener('scroll', checkScroll)
    }
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
          <Icon name="apps" />
          <OptionName>Objetivos</OptionName>
        </Option>
        <Option
          isSelected={selectedOption === 'pontos'}
          onClick={() => handleClick('t3', 'pontos')}
        >
          <Icon name="apps" />
          <OptionName>Pontos</OptionName>
        </Option>
      </MenuContainer>
    </Container>
  )
}

Menu.propTypes = {
  scrollFunc: PropTypes.func.isRequired,
}
