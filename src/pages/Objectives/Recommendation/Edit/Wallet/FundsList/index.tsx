import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'styled-bootstrap-grid'

import Anbima from 'components/Anbima'
import Button from 'components/Button'
import Header from 'components/Header/TransactionsHeader'
import Table from 'components/Table/TableWithCheckbox'
import { TColumns } from 'components/Table/types'
import Text from 'components/Text'

import { formatMoney, formatNumber } from 'helpers'
import { useToast } from 'hooks/toast'
import useMedia from 'hooks/useMedia'
import useFetchInvestmentsList from 'hooks/Investments/useFetchInvestmentsList'

import useFilter from 'pages/Investments/FundsList/Filter/useFilter'
import DrawerFilter from 'pages/Investments/FundsList/DrawerFilter'
import sortFundList from 'pages/Investments/FundsList/DrawerFilter/sortFundList'
import Filter from 'pages/Investments/FundsList/Filter'

import { IFundsList } from 'store/modules/Investment/types'
import { GetInvestmentDetailsRequest } from 'store/modules/Investment/Details/action'
import { IFunds } from 'store/modules/Objective/types'

import { FundoOutterWrapper, FundoWrapper, FundoNameWrapper } from '../styles'
import FundDetails from './FundDetails'
import FundsListMobile from './Mobile'
import { IFundsListProps, IFundSort, IFilterProps } from './types'
import * as s from './styles'

const columns: TColumns[] = [
  {
    Header: 'Título',
    accessor: 'apelido',
    align: 'start',
    format: (row: IFundsList) => (
      <FundoOutterWrapper key={`fund_name_${row.id_carteira}`}>
        <s.RiskColorTag borderRisk={row.perfil_risco_ordem} />
        <FundoWrapper>
          <FundoNameWrapper color="gray5">{row.apelido}</FundoNameWrapper>
          <Text type="caption" color="gray4" bold textAlign="left">
            {row.categoria_arena}
          </Text>
        </FundoWrapper>
      </FundoOutterWrapper>
    ),
  },
  {
    Header: 'Aplic. mín.',
    accessor: 'minimo_inicial',
    format: (row: IFundsList) => (
      <Text color="gray5" bold>
        {formatMoney(row.minimo_inicial)}
      </Text>
    ),
  },
  {
    Header: 'Regate (cot.)',
    accessor: 'resgate_cotizacao',
    format: (row: IFundsList) => (
      <Text color="gray5" bold>
        {row.resgate_cotizacao}
      </Text>
    ),
  },
  {
    Header: 'Taxa adm (a.a.)',
    accessor: 'taxa_administracao',
    format: (row: IFundsList) => (
      <Text color="gray5" bold>
        {formatNumber(row.resgate_cotizacao)}%
      </Text>
    ),
  },
  {
    Header: 'Rent. mês',
    accessor: 'rentabil_fundo_mes',
    format: (row: IFundsList) => (
      <Text color="gray6" bold>
        {formatNumber(row.rentabil_fundo_mes)}%
      </Text>
    ),
  },
  {
    Header: 'Rent. ano',
    accessor: 'rentabil_fundo_ano',
    format: (row: IFundsList) => (
      <Text color="gray6" bold>
        {formatNumber(row.rentabil_fundo_ano)}%
      </Text>
    ),
  },
  {
    Header: 'Rent. últ. 12m',
    accessor: 'rentabil_fundo_12_meses',
    format: (row: IFundsList) => (
      <Text color="gray6" bold>
        {formatNumber(row.rentabil_fundo_12_meses)}%
      </Text>
    ),
  },
]

const columnsSticky: TColumns[] = [
  {
    ...columns[0],
    styles: {
      minWidth: 179,
      header: {
        minWidth: 157,
      },
    },
    sticky: 'left',
    canSort: false,
  },
  {
    ...columns[1],
    styles: {
      minWidth: 144,
      header: {
        minWidth: 140,
      },
    },
    canSort: false,
  },
  {
    ...columns[2],
    styles: {
      minWidth: 164,
      header: {
        minWidth: 160,
      },
    },
    canSort: false,
  },
  {
    ...columns[3],
    styles: {
      minWidth: 204,
      header: {
        minWidth: 200,
      },
    },
    canSort: false,
  },
  {
    ...columns[4],
    styles: { minWidth: 192, header: { minWidth: 130 } },
    canSort: false,
  },
  {
    ...columns[5],
    styles: {
      minWidth: 144,
      header: {
        minWidth: 140,
      },
    },
    canSort: false,
  },
  {
    ...columns[6],
    styles: {
      minWidth: 164,
      header: {
        minWidth: 160,
      },
    },
    canSort: false,
  },
]

export default function FundsList({
  walletFunds,
  setWalletFunds,
  onClose,
}: IFundsListProps) {
  const { addToast } = useToast()
  const dispatch = useDispatch()
  const isMobile = useMedia('xs')
  const isTabletVertical = useMedia('md')
  const isTabletHorizontal = useMedia('lg')

  // states
  const [fundsListAvailable, setFundsListAvailable] = useState<
    IFundsList[] | []
  >([])
  const [selectedFunds, setSelectedFunds] = useState<IFundsList[] | []>([])
  // fund details states
  const [isFundDetailsOpen, setFundDetailsOpen] = useState(false)
  const [fundDetailsTitle, setFundDetailsTitle] = useState('')
  const [fundDetailsCategory, setFundDetailsCategory] = useState('')
  // filters states
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)
  const [isFiltersClean, setIsFiltersClean] = useState(false)
  const [filtersCount, setFiltersCount] = useState(0)
  const [filter, setFilter] = useState<IFilterProps>({
    byCategoriaArena: [],
    byPerfilRisco: [],
  })
  const [mobileFundSort, setMobileFundSort] = useState<IFundSort>({
    sortBy: null,
    sortType: null,
  })

  // array of id's (id_carteira) that are already add to wallet
  const fundsIdsAlreadyOnWallet: number[] = useMemo(
    () =>
      [...walletFunds].reduce(
        (acc: number[], cur: IFunds) => [...acc, cur.fund_id],
        []
      ),
    [walletFunds]
  )

  // hook that applies the filter to the
  const filteredFundsList = useFilter(filter, fundsListAvailable)

  // get state from store
  const { fundsListData, isFundsListLoading, hasFundsListError } = useSelector<
    any,
    any
  >(state => ({
    fundsListData: state.investmentsList.data,
    isFundsListLoading: state.investmentsList.isLoading,
    hasFundsListError: state.investmentsList.hasError,
  }))

  // trigger request to funds API, if data on store is empty
  useFetchInvestmentsList()

  // initialize funds, marking funds that already are listed on the wallet composition with checked = true
  useEffect(() => {
    if (fundsListData.length) {
      const fundsListWithChecked = [...fundsListData].map(fund => {
        if (fundsIdsAlreadyOnWallet.includes(fund.id_carteira)) {
          return {
            ...fund,
            checked: true,
          }
        }

        return fund
      })

      setFundsListAvailable(fundsListWithChecked)
    }
  }, [fundsListData, fundsIdsAlreadyOnWallet])

  // callback function to pass to table component. Actions that will be trigger everytime a row is selected
  const onSelectCallback = useCallback(rows => setSelectedFunds(rows), [
    setSelectedFunds,
  ])

  useEffect(() => {
    if (
      !filter.byCategoriaArena.length &&
      !filter.byPerfilRisco.length &&
      !mobileFundSort.sortBy &&
      !mobileFundSort.sortType
    ) {
      setIsFiltersClean(true)
    } else {
      setIsFiltersClean(false)
    }

    const totalFiltersCount =
      filter.byCategoriaArena.length +
      filter.byPerfilRisco.length +
      (mobileFundSort.sortBy ? 1 : 0)

    setFiltersCount(totalFiltersCount)
  }, [filter, mobileFundSort])

  function handleCleanFilter() {
    setFilter({
      byCategoriaArena: [],
      byPerfilRisco: [],
    })
  }

  function handleCleanSort() {
    setMobileFundSort({
      sortBy: null,
      sortType: null,
    })
  }

  // function handleCleanFilterAndSort() {
  //   handleCleanFilter()
  //   handleCleanSort()
  // }

  const fundsListSorted = useMemo(() => {
    if (mobileFundSort.sortType !== null) {
      return sortFundList(filteredFundsList, mobileFundSort)
    }

    return filteredFundsList
  }, [mobileFundSort, filteredFundsList])

  const createFundObject = useCallback(
    fund => ({
      fund_id: fund.id_carteira,
      name: fund.nome_carteira,
      nickname: fund.apelido,
      company_name: fund.nome_empresa,
      profile_risk: fund.perfil_risco,
      share_holder_profile_risk: fund.perfil_risco_ordem,
      initial_date: '',
      manager: '',
      min_initial_value: fund.minimo_inicial,
      min_value_to_apply: fund.aplicao_minima,
      release_to_apply: true,
      min_rescue_value: 0,
      release_to_rescue: true,
      min_balance_value: 0,
      time_limit_to_apply: '',
      time_limit_to_rescue: '',
      quotation_apply_days: '',
      financial_apply_days: '',
      quotation_rescue_days: '',
      financial_rescue_days: '',
      count_rescue_days: '',
      arena_category: fund.categoria_arena,
      anbima_category: '',
      adm_tax: fund.taxa_administracao,
      performance_rate: 0,
      classification: '',
      iof: '',
      benchmark: '',
      url_performance_info_pdf: '',
      url_lamina_pdf: '',
      url_fund_rules_pdf: '',
      url_fund_adhesion_pdf: '',
      url_manager_logo: '',
      quota_type: '',
      cnpj: '',
      pl: 0,
      pl_last_year: 0,
      initial_value: 0,
      monthly_value: 0,
      annual_rate: 0,
      fundActive: fund.fundo_ativo,
      profitability: [
        {
          name: '',
          value: {
            0: undefined,
          },
        },
      ],
      tribute_ir: { 0: 0 },
    }),
    []
  )

  const onAddFundsToWallet = () => {
    const newFunds: IFunds[] = [...selectedFunds].map(fund =>
      createFundObject(fund)
    )

    setWalletFunds([...walletFunds, ...newFunds])
    addToast({
      title: `${
        selectedFunds.length > 1
          ? 'Fundos adicionados com sucesso!'
          : 'Fundo adicionado com sucesso!'
      }`,
      type: 'success',
    })
    onClose()
  }

  return (
    <s.Layer
      isOpen
      handleClose={onClose}
      headerContent={
        <Header showStepsBar={false} onClose={onClose} showBackButton={false} />
      }
    >
      <s.Container>
        <Row>
          <Col>
            {isMobile ? (
              <>
                <FundsListMobile
                  funds={fundsListSorted}
                  onMoreInformationClick={fund => {
                    setFundDetailsOpen(true)
                    setFundDetailsTitle(fund.nome_carteira)
                    setFundDetailsCategory(fund.categoria_arena)
                    dispatch(GetInvestmentDetailsRequest(fund.id_carteira))
                  }}
                  onAddToWalletClick={fund => {
                    const newFund = createFundObject(fund)
                    setWalletFunds([...walletFunds, newFund])
                    addToast({
                      title: 'Fundo adicionado com sucesso!',
                      type: 'success',
                    })
                  }}
                  fundsIdsAlreadyOnWallet={fundsIdsAlreadyOnWallet}
                />
                <s.FabButton
                  color="primary"
                  onClick={() => setIsFilterDrawerOpen(true)}
                  size="large"
                  icon="filter"
                />
              </>
            ) : (
              <s.Card>
                <Filter
                  disabled={
                    !fundsListData.length ||
                    isFundsListLoading ||
                    hasFundsListError
                  }
                  filter={filter}
                  onChangeFilter={setFilter}
                  onChangeIsDrawerOpen={setIsFilterDrawerOpen}
                  onClearFilter={handleCleanFilter}
                  onClearSort={handleCleanSort}
                  onChangeSort={setMobileFundSort}
                  isFiltersClean={isFiltersClean}
                  filtersCount={filtersCount}
                />

                <Table
                  data={fundsListSorted}
                  columns={
                    isTabletVertical || isTabletHorizontal
                      ? columnsSticky
                      : columns
                  }
                  disableSort={isTabletHorizontal || isTabletVertical}
                  onSelect={onSelectCallback}
                  isLoading={isFundsListLoading}
                  showSelectAll={false}
                  isSticky={isTabletHorizontal || isTabletVertical}
                />

                <s.InfoRow>
                  <Text color={selectedFunds.length ? 'gray6' : 'gray4'} bold>
                    {selectedFunds.length} Fundos selecionados
                  </Text>
                  <Button
                    color="secondary"
                    disabled={!selectedFunds.length}
                    onClick={onAddFundsToWallet}
                  >
                    Adicionar na carteira
                  </Button>
                </s.InfoRow>
              </s.Card>
            )}
            <Anbima />

            <FundDetails
              isOpen={isFundDetailsOpen}
              setIsOpen={setFundDetailsOpen}
              title={fundDetailsTitle}
              category={fundDetailsCategory}
            />

            {isMobile || isTabletVertical || isTabletHorizontal ? (
              <DrawerFilter
                filter={filter}
                onChangeFilter={setFilter}
                isDrawerOpen={isFilterDrawerOpen}
                onChangeIsDrawerOpen={setIsFilterDrawerOpen}
                sort={mobileFundSort}
                onChangeSort={setMobileFundSort}
              />
            ) : null}
          </Col>
        </Row>
      </s.Container>
    </s.Layer>
  )
}
