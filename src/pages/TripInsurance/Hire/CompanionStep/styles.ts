import styled from 'styled-components'
import { 
  Row as RowComponent,
  Col as ColComponent,
  Container as ContainerComponent 
} from 'styled-bootstrap-grid'

import CardCmp from 'components/Card'
import { CardBody } from 'components/Card/styles'
import TextCmp from 'components/Text'
import Button from 'components/Button'

export const Section = styled.div`
  padding-bottom: 62px; 
`

export const Row = styled(RowComponent)`
	padding-top: ${({ theme }) => theme.spacing(3)}px;
  padding-bottom: ${({ theme }) => theme.spacing(3)}px;
  align-content: start;
  justify-content: center;
  postion: relative;
  z-index: 1;
  @media ${props => props.theme.mediaQueries.lgUp} {
    justify-content: start;
  }

  @media ${props => props.theme.mediaQueries.sm} {
    justify-content: center;
  }
`

export const Col = styled(ColComponent)`
  &:first-child {
    @media ${props => props.theme.mediaQueries.lgUp} {
      margin-left: ${({ theme }) => theme.spacing(3)}px;
      h4 {
        margin-top: 14px;
      }
    }
    @media ${props => props.theme.mediaQueries.smUp} {
      h4,
      h5 {
        margin-left: 4px;
      }
    }
    @media ${props => props.theme.mediaQueries.sm} {
      h5 {
        font-size: 15px;
        line-heigth: 18px
        background: red;
      }
    }
  }
  &:last-child {
    @media ${props => props.theme.mediaQueries.lgUp} {
      margin-left: 7px;
    }
  }
`

export const ContentWrapper = styled(ContainerComponent)`
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin: 0 auto;

  @media ${props => props.theme.mediaQueries.sm} {
    height: 100%;
    padding: 0 21px;
  }
`

export const Card = styled(CardCmp)`
	display: flex;
	align-items: stretch;

	${CardBody} {
		@media ${props => props.theme.mediaQueries.mdUp}{
			margin: 0 ${({ theme }) => theme.spacing(7)}px 0 ${({ theme }) => theme.spacing(7)}px;
		}
	}

	@media ${props => props.theme.mediaQueries.lgUp} {
		align-items: center;
	}
`
export const TitleText = styled(TextCmp)`
	margin: ${({ theme }) => theme.spacing(3)}px 0 ${({ theme }) => theme.spacing(4)}px 0;

	@media ${props => props.theme.mediaQueries.lgUp} {
		margin: ${({ theme }) => theme.spacing(5)}px 0 ${({ theme }) => theme.spacing(2)}px 0;
	}
`

export const Table = styled.table`
  display: table;
	border-collapse: separate;
  border-spacing: 0;
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
  @media ${props => props.theme.mediaQueries.smUp}{
    margin-bottom: ${({ theme }) => theme.spacing(5)}px;
  }
	@media ${props => props.theme.mediaQueries.lgUp} {
		width: 751px;
	}
  tr td:first-child,
  th td:first-child {
    border-left: 1px solid ${props => props.theme.colors.gray3};
    border-right: 0px
  }
  tr td:last-child,
  th td:last-child {
    border-left: 0px 
  }
`

export const Thead = styled.thead`
  border-bottom: 1px solid ${props => props.theme.colors.gray3};
	max-height: 56px;
`
export const THeadTr = styled.tr`
	height: 56px;
	border-bottom: 1px solid ${props => props.theme.colors.gray3};
`
export const Tr = styled.tr`
  height: 79px;	
  border-bottom: 1px solid ${props => props.theme.colors.gray3};

  //Last Row
  &:last-child {
    border-bottom: none;

    td:first-child {
      border-bottom-left-radius: 8px
    }
    td:last-child {
      border-bottom-right-radius: 8px
    }
  }

  // Last Column
  & > td:last-child,
  th:last-child {
    // Horizontal Tablet
    @media ${props => props.theme.mediaQueries.mdUp} {
      p {
        margin-right: ${({ theme }) => `${theme.spacing(2)}px`};

        // Desktop
        @media ${props => props.theme.mediaQueries.lgUp} {
          margin-right: ${({ theme }) => `${theme.spacing(12)}px`};
        }
      }
    }
  }
`

export const Th = styled.th`
  text-align: start;
  background-color: ${({theme}) => theme.colors.gray1};
	width: auto;
	padding-right: 0;
	padding-left: 21px;
  border: 1px solid ${props => props.theme.colors.gray3};

  &:first-child{
    border-right: 0;
    border-top-left-radius: 8px;
  }
	
	&:last-child {
    border-left: 0; 
		padding-left: 0px;
    border-top-right-radius: 8px;
		@media ${props => props.theme.mediaQueries.sm}{
			text-align: center;
		}
	}
	
	@media ${props => props.theme.mediaQueries.lgUp} {
		width: 182px;
		padding-right: 127px;	
	}
`

export const Td = styled.td`
  border-right: 1px solid ${props => props.theme.colors.gray3};
  border-bottom: 1px solid ${props => props.theme.colors.gray3};
`

export const Tbody = styled.tbody``

export const Text = styled(TextCmp)`
`

export const DescriptionText = styled(TextCmp)`
	margin: 0 0 ${({ theme }) => theme.spacing(3)}px ${({ theme }) => theme.spacing(3)}px;
`

export const NameText = styled(TextCmp)`
	margin-left: ${({ theme }) => theme.spacing(3)}px;
	display: grid;
`

export const StatusText = styled(TextCmp)`
	margin-left: ${({ theme }) => theme.spacing(1)}px;
`

export const StatusWrapper = styled.div`
	display: flex;
	align-items: center;
	@media ${props => props.theme.mediaQueries.sm}{
		justify-content: center;
	}
`

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing(2)}px;
  justify-content: flex-end;
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 2;
`

export const NextButton = styled(Button)`
  width: 100%;
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    width: 133px;
  }
`
