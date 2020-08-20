import React, { useState, useEffect, RefObject } from 'react'

import Icon from 'components/IconExporter'
import useMedia from 'hooks/useMedia'

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
  const isMobile = useMedia('lg')

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
      if (isMobile) {
        homeMenuPos = homeContentRef.current.getBoundingClientRect().bottom
        row1Pos = ref1.current.getBoundingClientRect().bottom
        row2Pos = ref2.current.getBoundingClientRect().bottom
        row3Pos = ref3.current.getBoundingClientRect().bottom
      } else {
        row1Pos = ref1.current.getBoundingClientRect().top
        row2Pos = ref2.current.getBoundingClientRect().top
        row3Pos = ref3.current.getBoundingClientRect().top
      }
    }

    if (row1Pos && row2Pos && row3Pos) {
      if (window.scrollY < row1Pos) {
        setSelectedOption('produtos')
      } else if (window.scrollY >= row2Pos && window.scrollY < row3Pos) {
        setSelectedOption('objetivos')
      } else if (window.scrollY >= row3Pos) {
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
