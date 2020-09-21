import React, { useState, useEffect, RefObject } from 'react'

import Icon from 'components/IconExporter'

import { Container, MenuContainer, Option, OptionName } from './styles'

interface IMenu {
  scrollFunc: (type: string) => void
  homeContentRef: RefObject<HTMLDivElement | null>
  ref1: RefObject<HTMLDivElement | null>
  ref2: RefObject<HTMLDivElement | null>
  ref3: RefObject<HTMLDivElement | null>
}

const Menu = ({
  scrollFunc, 
  homeContentRef, 
  ref1, 
  ref2, 
  ref3
}: IMenu) => {
  const [selectedOption, setSelectedOption] = useState('produtos')
  const [showMenu, setShowMenu] = useState(true)

  function checkScroll() {
    let row1Pos = null
    let row2Pos = null
    let row3Pos = null
    let homeMenuPos = null

    if (
      !!ref1.current &&
      !!ref2.current &&
      !!ref3.current &&
      !!homeContentRef.current
    ) {
      // "offsetTop - 30" compensa o margin adicional calculado na função passada pela prop
      homeMenuPos = homeContentRef.current.getBoundingClientRect().bottom
      row1Pos = ref1.current.offsetTop + 1
      row2Pos = ref2.current.offsetTop - 30  
      row3Pos = ref3.current.offsetTop - 30 
    }

    if (row1Pos && row2Pos && row3Pos) {
      if (window.scrollY >= row1Pos && window.scrollY < row2Pos) {
        setSelectedOption('produtos')
      } else if (window.scrollY >= row2Pos && window.scrollY < row3Pos) {
        setSelectedOption('objetivos')
      } else if (window.scrollY > row2Pos) {
        setSelectedOption('pontos')
      }
    }

    if (homeMenuPos && homeMenuPos > 500) {
      setShowMenu(true)
    } else {
      setShowMenu(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', checkScroll)
    return () => {
      window.removeEventListener('scroll', checkScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container showMenu={showMenu}>
      <MenuContainer>
        <Option
          data-gtm-type="click"
          data-gtm-clicktype="menu-lateral"
          data-gtm-name="produtos"
          data-testid="produtos-option"
          isSelected={selectedOption === 'produtos'}
          onClick={() => scrollFunc('t1')}
        >
          <Icon name="apps" />
          <OptionName>Produtos</OptionName>
        </Option>
        <Option
          data-gtm-type="click"
          data-gtm-clicktype="menu-lateral"
          data-gtm-name="objetivos"
          data-testid="objetivos-option"
          isSelected={selectedOption === 'objetivos'}
          onClick={() => scrollFunc('t2')}
        >
          <Icon name="target" />
          <OptionName>Objetivos</OptionName>
        </Option>
        <Option
          data-gtm-type="click"
          data-gtm-clicktype="menu-lateral"
          data-gtm-name="pontos"
          data-testid="pontos-option"
          isSelected={selectedOption === 'pontos'}
          onClick={() => scrollFunc('t3')}
        >
          <Icon name="diamond" />
          <OptionName>Pontos</OptionName>
        </Option>
      </MenuContainer>
    </Container>
  )
}

export default Menu
