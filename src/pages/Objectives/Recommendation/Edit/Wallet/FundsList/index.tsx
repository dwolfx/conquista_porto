import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Row, Col } from 'styled-bootstrap-grid'

import Button from 'components/Button'
import Header from 'components/Header/TransactionsHeader'
import Table from 'components/Table/TableWithCheckbox'
import { TColumns } from 'components/Table/types'
import Text from 'components/Text'

import { formatMoney } from 'helpers'
import useFetchInvestmentsList from 'hooks/Investments/useFetchInvestmentsList'
import useFilter from 'pages/Investments/FundsList/Filter/useFilter'

import Filter from 'pages/Investments/FundsList/Filter'
import { IFunds } from 'store/modules/Objective/types'

import { FundoOutterWrapper, FundoWrapper, FundoNameWrapper } from '../styles'
import { IFundsListProps, IFundsList } from './types'
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
  { Header: 'Regate (cot.)', accessor: 'resgate_cotizacao' },
  { Header: 'Taxa adm (a.a.)', accessor: 'taxa_administracao' },
  { Header: 'Rent. mês', accessor: 'rentabil_fundo_mes' },
  { Header: 'Rent. ano', accessor: 'rentabil_fundo_ano' },
  { Header: 'Rent. últ. 12m', accessor: 'rentabil_fundo_12_meses' },
]

export default function FundsList({
  walletFunds,
  setWalletFunds,
  onClose,
}: IFundsListProps) {
  // const { addToast } = useToast()
  // const isMobile = useMedia('xs')
  // const isTablet = useMedia('lg')

  // states
  const [fundsListAvailable, setFundsListAvailable] = useState<any[] | []>([])
  const [selectedFunds, setSelectedFunds] = useState<IFundsList[] | []>([])
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)
  const [isFiltersClean, setIsFiltersClean] = useState(false)
  const [filtersCount, setFiltersCount] = useState(0)
  const [filter, setFilter] = useState({
    byCategoriaArena: [],
    byPerfilRisco: [],
  })
  const [mobileFundSort, setMobileFundSort] = useState({
    sortBy: null,
    sortType: null,
  })

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

  // initialize funds, removing funds that already are listed on the wallet composition
  useEffect(() => {
    if (fundsListData.length) {
      const fundsIdsAlreadyOnWallet: number[] = [...walletFunds].reduce(
        (acc: number[], cur: IFunds) => [...acc, cur.fund_id],
        []
      )
      const fundsListNotAddOnWallet = [...fundsListData].filter(
        item => !fundsIdsAlreadyOnWallet.includes(item.id_carteira)
      )
      setFundsListAvailable(fundsListNotAddOnWallet)
    }
  }, [fundsListData, walletFunds])

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

  function handleChangeFilter(newFilter: any) {
    setFilter(newFilter)
  }

  function handleChangeMobileSort(newMobileSort: any) {
    setMobileFundSort(newMobileSort)
  }

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

  function handleCleanFilterAndSort() {
    handleCleanFilter()
    handleCleanSort()
  }

  const onAddFundsToWallet = () => {
    // const targetDate = '01/08/2020'
    const newFunds: IFunds[] = [...selectedFunds].map(fund => ({
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
    }))

    setWalletFunds([...walletFunds, ...newFunds])
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
            <s.Card>
              <Filter
                disabled={
                  !fundsListData.length ||
                  isFundsListLoading ||
                  hasFundsListError
                }
                filter={filter}
                onChangeFilter={handleChangeFilter}
                onChangeIsDrawerOpen={setIsFilterDrawerOpen}
                onClearFilter={handleCleanFilter}
                onClearSort={handleCleanSort}
                onChangeSort={handleChangeMobileSort}
                isFiltersClean={isFiltersClean}
                filtersCount={filtersCount}
              />

              <Table
                data={filteredFundsList}
                columns={columns}
                onSelect={onSelectCallback}
                isLoading={isFundsListLoading}
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
          </Col>
        </Row>
      </s.Container>
    </s.Layer>
  )
}
