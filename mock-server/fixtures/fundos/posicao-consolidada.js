const { conservador, moderado, arrojado } = require('../tokens');

const posicao = [
  {
    conta_porto_seguro: {
      id_conta: '193239',
      cheque_especial: {
        limite: '0',
        data_vencimento: '0001-01-03T00:00:00-03:00',
      },
      conta: '27',
      nome_banco: 'Banco Portopar',
      saldo_liquidar: '0',
      agencia: '0001',
      codigo_banco: '306',
      saldo_disponivel: '2976166.11',
      cpf: '33244452809',
      encargos_acumulados: '0',
      valores_bloqueados: {
        judicial: '0',
        em_24horas: '0',
        indeterminado: '0',
        em_48horas: '0',
      },
      digito_conta: '2',
      titular: 'Rafael Rodrigues',
    },
    posicoes: {
      posicao: [
        {
          rendimentos: {
            rendimento: [
              {
                datainicio: '2020-03-01T00:00:00-03:00',
                datafim: '2020-03-23T23:59:59.999-03:00',
                meses: '1',
                valorrendimento: '-9.35',
              },
              {
                datainicio: '2019-03-01T00:00:00-03:00',
                datafim: '2020-03-23T23:59:59.999-03:00',
                meses: '12',
                valorrendimento: '-28849.62',
              },
              {
                datainicio: '2018-03-01T00:00:00-03:00',
                datafim: '2020-03-23T23:59:59.999-03:00',
                meses: '24',
                valorrendimento: '-27556.91',
              },
              {
                datainicio: '2017-03-01T00:00:00-03:00',
                datafim: '2020-03-23T23:59:59.999-03:00',
                meses: '36',
                valorrendimento: '-27556.91',
              },
            ],
          },
          categoria_arena: '03-Multimercado',
          historico_saldos_fundo: {
            id_carteira: '5112',
            saldos: {
              saldo: [
                {
                  valorsaldo: '33886.11',
                  data: '2019-12-31T00:00:00-03:00',
                },
                {
                  valorsaldo: '31659.74',
                  data: '2020-01-31T00:00:00-03:00',
                },
                {
                  valorsaldo: '31914.40',
                  data: '2020-02-28T00:00:00-03:00',
                },
                {
                  valorsaldo: '31905.05',
                  data: '2020-03-23T00:00:00-03:00',
                },
              ],
            },
          },
          saldo_atual: '200000.05',
          ultimas_operacoes: {
            operacao: [
              {
                data_operacao: '2020-06-03T00:00:00-03:00',
                data_liquidacao: '2020-07-08T00:00:00-03:00',
                tipo_operacao: 'Resgate Bruto',
                valor_bruto: '5000.00',
                id_fundo: '5112',
                id_operacao: '10608363',
              },
              {
                data_operacao: '2020-06-01T00:00:00-03:00',
                data_liquidacao: '2020-06-01T00:00:00-03:00',
                tipo_operacao: 'Aplicação',
                valor_bruto: '2000.00',
                id_fundo: '5112',
                id_operacao: '10608352',
              },
              {
                data_operacao: '2020-06-01T00:00:00-03:00',
                data_liquidacao: '2020-06-01T00:00:00-03:00',
                tipo_operacao: 'Aplicação',
                valor_bruto: '1500.00',
                id_fundo: '5112',
                id_operacao: '10608351',
              },
              {
                data_operacao: '2020-06-01T00:00:00-03:00',
                data_liquidacao: '2020-06-01T00:00:00-03:00',
                tipo_operacao: 'Aplicação',
                valor_bruto: '1000.00',
                id_fundo: '5112',
                id_operacao: '10608350',
              },
              {
                data_operacao: '2020-05-13T00:00:00-03:00',
                data_liquidacao: '2020-06-17T00:00:00-03:00',
                tipo_operacao: 'Resgate Bruto',
                valor_bruto: '1000.00',
                id_fundo: '5112',
                id_operacao: '10608302',
              },
              {
                data_operacao: '2020-05-13T00:00:00-03:00',
                data_liquidacao: '2020-05-13T00:00:00-03:00',
                tipo_operacao: 'Aplicação',
                valor_bruto: '2000.00',
                id_fundo: '5112',
                id_operacao: '10608301',
              },
            ],
          },
          fundo: {
            data_inicio: '2013-03-28T00:00:00-03:00',
            valor_patrimonio_liq: '65572971.83',
            taxa_performance: '0.00',
            apelido: 'Porto Seguro Selecta FIC FIA',
            contagem_dias_resgate: 'Corridos',
            minimo_inicial: '1000.0',
            nome_gestor: 'PortoSeguro Investimentos',
            hora_resgate: '23:59',
            link_lamina:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/multimercado/InformativoDesempenho_PS_Alocacao.pdf',
            link_infor_desempenho:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/multimercado/InformativoDesempenho_PS_Alocacao.pdf',
            categoria_ambima: 'Multimercado Alocação Dinâmicos',
            is_fundo_ativo: true,
            aplicao_liberada: true,
            aviso_data_fundo: true,
            link_termo_adesao:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/multimercado/TCR_PS_Alocacao.pdf',
            resgate_minimo: '1000.0',
            url_logo_gestor:
              'https://www.portoseguro.com.br/conteudo/solucoes-financeiras/investimentos/arena/assets/images/fundoLogos/logo-porto-investimentos.png',
            aliquotas_ir: {
              aliquota: [
                {
                  valor: '22.5',
                  faixa: 'Até 180 dias',
                },
                {
                  valor: '20',
                  faixa: 'De 181 dias a 360 dias',
                },
                {
                  valor: '17.5',
                  faixa: 'De 361 dias a 720 dias',
                },
                {
                  valor: '15',
                  faixa: 'Acima de 720 dias',
                },
              ],
            },
            resgate_liberado: true,
            categoria_arena: 'Multimercado',
            id_carteira: '5094',
            regime_iof: 'Regime Regressivo',
            classificacao: 'Longo Prazo',
            aplicacao_financeiro: 'D+0',
            nome_carteira: 'Porto Seguro Alocação FIC FIM',
            link_regulamento:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/multimercado/Regulamento_PS_Alocacao.pdf',
            perfil_risco: 'medio-alto',
            resgate_cotizacao: 'D+32 (Corridos)',
            nome_empresa: 'PortoSeguro Investimentos',
            benchmark: {
              nome: 'CDI',
              id: '1',
            },
            comparativo_hist_rentabil: {
              hist_rentabil_benchmark: {
                rentabil_Ano: '1.02',
                rentabil_24_meses: '12.14',
                rentabil_12_meses: '5.45',
                rentabil_36_meses: '21.57',
                rentabil_dia: '0.01',
                rentabil_mes_anteiror: '0.29',
                benchmark: {
                  nome: 'CDI',
                  id: '1',
                },
                rentabil_mes: '0.34',
              },
              hist_rentabil_fundo: {
                rel_fundo_benchmark_mes_ant: '-',
                rentabil_ano: '-3.01',
                rentabil_12_meses: '6.53',
                rentabil_36_meses: '25.29',
                rel_fundo_benchmark_mes: '-',
                rel_fundo_benchmark_dia: '-',
                rentabil_mes_anteiror: '-0.71',
                rel_fundo_benchmark_24_meses: '105.04',
                rel_fundo_benchmark_ano: '-',
                rentabil_24_meses: '12.75',
                rel_fundo_benchmark_36_meses: '117.24',
                id_carteira: '5112',
                rentabil_dia: '-0.02',
                rentabil_mes: '-2.95',
                rel_fundo_benchmark_12_meses: '119.78',
              },
              data_referencia: '2020-03-23T00:00:00-03:00',
            },
            tipo_cota: 'Fechamento',
            hora_aplicacao: '23:59',
            resgate_financeiro: 'D+2 (Úteis)',
            perfil_risco_ordem: '4',
            saldo_minimo: '1000.0',
            taxa_administracao: '0.50',
            aplicacao_cotizacao: 'D+0',
            aplicao_minima: '1000.0',
          },
          tributacoes: {
            tributacao: [
              {
                tipo: 'IR',
                valor: '0.00',
              },
              {
                tipo: 'IOF',
                valor: '0.00',
              },
            ],
          },
        },
        {
          rendimentos: {
            rendimento: [
              {
                datainicio: '2020-03-01T00:00:00-03:00',
                datafim: '2020-03-23T23:59:59.999-03:00',
                meses: '1',
                valorrendimento: '-9.35',
              },
              {
                datainicio: '2019-03-01T00:00:00-03:00',
                datafim: '2020-03-23T23:59:59.999-03:00',
                meses: '12',
                valorrendimento: '-28849.62',
              },
              {
                datainicio: '2018-03-01T00:00:00-03:00',
                datafim: '2020-03-23T23:59:59.999-03:00',
                meses: '24',
                valorrendimento: '-27556.91',
              },
              {
                datainicio: '2017-03-01T00:00:00-03:00',
                datafim: '2020-03-23T23:59:59.999-03:00',
                meses: '36',
                valorrendimento: '-27556.91',
              },
            ],
          },
          categoria_arena: 'Cambial',
          historico_saldos_fundo: {
            id_carteira: '51380057',
            saldos: {
              saldo: [
                {
                  valorsaldo: '33886.11',
                  data: '2019-12-31T00:00:00-03:00',
                },
                {
                  valorsaldo: '31659.74',
                  data: '2020-01-31T00:00:00-03:00',
                },
                {
                  valorsaldo: '31914.40',
                  data: '2020-02-28T00:00:00-03:00',
                },
                {
                  valorsaldo: '31905.05',
                  data: '2020-03-23T00:00:00-03:00',
                },
              ],
            },
          },
          saldo_atual: '15905.05',
          ultimas_operacoes: {
            operacao: [
              {
                data_operacao: '2020-06-03T00:00:00-03:00',
                data_liquidacao: '2020-07-08T00:00:00-03:00',
                tipo_operacao: 'Resgate Bruto',
                valor_bruto: '5000.00',
                id_fundo: '5112',
                id_operacao: '10608363',
              },
              {
                data_operacao: '2020-06-01T00:00:00-03:00',
                data_liquidacao: '2020-06-01T00:00:00-03:00',
                tipo_operacao: 'Aplicação',
                valor_bruto: '2000.00',
                id_fundo: '5112',
                id_operacao: '10608352',
              },
              {
                data_operacao: '2020-06-01T00:00:00-03:00',
                data_liquidacao: '2020-06-01T00:00:00-03:00',
                tipo_operacao: 'Aplicação',
                valor_bruto: '1500.00',
                id_fundo: '5112',
                id_operacao: '10608351',
              },
              {
                data_operacao: '2020-06-01T00:00:00-03:00',
                data_liquidacao: '2020-06-01T00:00:00-03:00',
                tipo_operacao: 'Aplicação',
                valor_bruto: '1000.00',
                id_fundo: '5112',
                id_operacao: '10608350',
              },
              {
                data_operacao: '2020-05-13T00:00:00-03:00',
                data_liquidacao: '2020-06-17T00:00:00-03:00',
                tipo_operacao: 'Resgate Bruto',
                valor_bruto: '1000.00',
                id_fundo: '5112',
                id_operacao: '10608302',
              },
              {
                data_operacao: '2020-05-13T00:00:00-03:00',
                data_liquidacao: '2020-05-13T00:00:00-03:00',
                tipo_operacao: 'Aplicação',
                valor_bruto: '2000.00',
                id_fundo: '5112',
                id_operacao: '10608301',
              },
            ],
          },
          fundo: {
            data_inicio: '2013-03-28T00:00:00-03:00',
            valor_patrimonio_liq: '65572971.83',
            taxa_performance: '0.00',
            apelido: 'Porto Seguro Alocação FIC FIM',
            contagem_dias_resgate: 'Corridos',
            minimo_inicial: '1000.0',
            nome_gestor: 'PortoSeguro Investimentos',
            hora_resgate: '23:59',
            link_lamina:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/multimercado/InformativoDesempenho_PS_Alocacao.pdf',
            link_infor_desempenho:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/multimercado/InformativoDesempenho_PS_Alocacao.pdf',
            categoria_ambima: 'Multimercado Alocação Dinâmicos',
            is_fundo_ativo: true,
            aplicao_liberada: true,
            aviso_data_fundo: true,
            link_termo_adesao:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/multimercado/TCR_PS_Alocacao.pdf',
            resgate_minimo: '1000.0',
            url_logo_gestor:
              'https://www.portoseguro.com.br/conteudo/solucoes-financeiras/investimentos/arena/assets/images/fundoLogos/logo-porto-investimentos.png',
            aliquotas_ir: {
              aliquota: [
                {
                  valor: '22.5',
                  faixa: 'Até 180 dias',
                },
                {
                  valor: '20',
                  faixa: 'De 181 dias a 360 dias',
                },
                {
                  valor: '17.5',
                  faixa: 'De 361 dias a 720 dias',
                },
                {
                  valor: '15',
                  faixa: 'Acima de 720 dias',
                },
              ],
            },
            resgate_liberado: false,
            categoria_arena: 'Cambial',
            id_carteira: '5112',
            regime_iof: 'Regime Regressivo',
            classificacao: 'Longo Prazo',
            aplicacao_financeiro: 'D+0',
            nome_carteira: 'Porto Seguro Alocação FIC FIM',
            link_regulamento:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/multimercado/Regulamento_PS_Alocacao.pdf',
            perfil_risco: 'medio-alto',
            resgate_cotizacao: 'D+32 (Corridos)',
            nome_empresa: 'PortoSeguro Investimentos',
            benchmark: {
              nome: 'CDI',
              id: '1',
            },
            comparativo_hist_rentabil: {
              hist_rentabil_benchmark: {
                rentabil_Ano: '1.02',
                rentabil_24_meses: '12.14',
                rentabil_12_meses: '5.45',
                rentabil_36_meses: '21.57',
                rentabil_dia: '0.01',
                rentabil_mes_anteiror: '0.29',
                benchmark: {
                  nome: 'CDI',
                  id: '1',
                },
                rentabil_mes: '0.34',
              },
              hist_rentabil_fundo: {
                rel_fundo_benchmark_mes_ant: '-',
                rentabil_ano: '-3.01',
                rentabil_12_meses: '6.53',
                rentabil_36_meses: '25.29',
                rel_fundo_benchmark_mes: '-',
                rel_fundo_benchmark_dia: '-',
                rentabil_mes_anteiror: '-0.71',
                rel_fundo_benchmark_24_meses: '105.04',
                rel_fundo_benchmark_ano: '-',
                rentabil_24_meses: '12.75',
                rel_fundo_benchmark_36_meses: '117.24',
                id_carteira: '5112',
                rentabil_dia: '-0.02',
                rentabil_mes: '-2.95',
                rel_fundo_benchmark_12_meses: '119.78',
              },
              data_referencia: '2020-03-23T00:00:00-03:00',
            },
            tipo_cota: 'Fechamento',
            hora_aplicacao: '23:59',
            resgate_financeiro: 'D+2 (Úteis)',
            perfil_risco_ordem: '4',
            saldo_minimo: '1000.0',
            taxa_administracao: '0.50',
            aplicacao_cotizacao: 'D+0',
            aplicao_minima: '1000.0',
          },
          tributacoes: {
            tributacao: [
              {
                tipo: 'IR',
                valor: '0.00',
              },
              {
                tipo: 'IOF',
                valor: '0.00',
              },
            ],
          },
        },
        {
          rendimentos: {
            rendimento: [
              {
                datainicio: '2020-03-01T00:00:00-03:00',
                datafim: '2020-03-23T23:59:59.999-03:00',
                meses: '1',
                valorrendimento: '-9.35',
              },
              {
                datainicio: '2019-03-01T00:00:00-03:00',
                datafim: '2020-03-23T23:59:59.999-03:00',
                meses: '12',
                valorrendimento: '-28849.62',
              },
              {
                datainicio: '2018-03-01T00:00:00-03:00',
                datafim: '2020-03-23T23:59:59.999-03:00',
                meses: '24',
                valorrendimento: '-27556.91',
              },
              {
                datainicio: '2017-03-01T00:00:00-03:00',
                datafim: '2020-03-23T23:59:59.999-03:00',
                meses: '36',
                valorrendimento: '-27556.91',
              },
            ],
          },
          categoria_arena: 'Cambial',
          historico_saldos_fundo: {
            id_carteira: '5112',
            saldos: {
              saldo: [
                {
                  valorsaldo: '33886.11',
                  data: '2019-12-31T00:00:00-03:00',
                },
                {
                  valorsaldo: '31659.74',
                  data: '2020-01-31T00:00:00-03:00',
                },
                {
                  valorsaldo: '31914.40',
                  data: '2020-02-28T00:00:00-03:00',
                },
                {
                  valorsaldo: '31905.05',
                  data: '2020-03-23T00:00:00-03:00',
                },
              ],
            },
          },
          saldo_atual: '23499.05',
          ultimas_operacoes: {
            operacao: [
              {
                data_operacao: '2020-06-03T00:00:00-03:00',
                data_liquidacao: '2020-07-08T00:00:00-03:00',
                tipo_operacao: 'Resgate Bruto',
                valor_bruto: '5000.00',
                id_fundo: '5112',
                id_operacao: '10608363',
              },
              {
                data_operacao: '2020-06-01T00:00:00-03:00',
                data_liquidacao: '2020-06-01T00:00:00-03:00',
                tipo_operacao: 'Aplicação',
                valor_bruto: '2000.00',
                id_fundo: '5112',
                id_operacao: '10608352',
              },
              {
                data_operacao: '2020-06-01T00:00:00-03:00',
                data_liquidacao: '2020-06-01T00:00:00-03:00',
                tipo_operacao: 'Aplicação',
                valor_bruto: '1500.00',
                id_fundo: '5112',
                id_operacao: '10608351',
              },
              {
                data_operacao: '2020-06-01T00:00:00-03:00',
                data_liquidacao: '2020-06-01T00:00:00-03:00',
                tipo_operacao: 'Aplicação',
                valor_bruto: '1000.00',
                id_fundo: '5112',
                id_operacao: '10608350',
              },
              {
                data_operacao: '2020-05-13T00:00:00-03:00',
                data_liquidacao: '2020-06-17T00:00:00-03:00',
                tipo_operacao: 'Resgate Bruto',
                valor_bruto: '1000.00',
                id_fundo: '5112',
                id_operacao: '10608302',
              },
              {
                data_operacao: '2020-05-13T00:00:00-03:00',
                data_liquidacao: '2020-05-13T00:00:00-03:00',
                tipo_operacao: 'Aplicação',
                valor_bruto: '2000.00',
                id_fundo: '5112',
                id_operacao: '10608301',
              },
            ],
          },
          fundo: {
            data_inicio: '2013-03-28T00:00:00-03:00',
            valor_patrimonio_liq: '65572971.83',
            taxa_performance: '0.00',
            apelido: 'BR Plural Deb. Inc. Hedge 45 FICFIM CP',
            contagem_dias_resgate: 'Corridos',
            minimo_inicial: '1000.0',
            nome_gestor: 'PortoSeguro Investimentos',
            hora_resgate: '23:59',
            link_lamina:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/multimercado/InformativoDesempenho_PS_Alocacao.pdf',
            link_infor_desempenho:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/multimercado/InformativoDesempenho_PS_Alocacao.pdf',
            categoria_ambima: 'Multimercado Alocação Dinâmicos',
            is_fundo_ativo: true,
            aplicao_liberada: true,
            aviso_data_fundo: true,
            link_termo_adesao:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/multimercado/TCR_PS_Alocacao.pdf',
            resgate_minimo: '1000.0',
            url_logo_gestor:
              'https://www.portoseguro.com.br/conteudo/solucoes-financeiras/investimentos/arena/assets/images/fundoLogos/logo-porto-investimentos.png',
            aliquotas_ir: {
              aliquota: [
                {
                  valor: '22.5',
                  faixa: 'Até 180 dias',
                },
                {
                  valor: '20',
                  faixa: 'De 181 dias a 360 dias',
                },
                {
                  valor: '17.5',
                  faixa: 'De 361 dias a 720 dias',
                },
                {
                  valor: '15',
                  faixa: 'Acima de 720 dias',
                },
              ],
            },
            resgate_liberado: false,
            categoria_arena: 'Investimento no exterior',
            id_carteira: '51380057',
            regime_iof: 'Regime Regressivo',
            classificacao: 'Longo Prazo',
            aplicacao_financeiro: 'D+0',
            nome_carteira: 'Porto Seguro Alocação FIC FIM',
            link_regulamento:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/multimercado/Regulamento_PS_Alocacao.pdf',
            perfil_risco: 'medio-alto',
            resgate_cotizacao: 'D+32 (Corridos)',
            nome_empresa: 'PortoSeguro Investimentos',
            benchmark: {
              nome: 'CDI',
              id: '1',
            },
            comparativo_hist_rentabil: {
              hist_rentabil_benchmark: {
                rentabil_Ano: '1.02',
                rentabil_24_meses: '12.14',
                rentabil_12_meses: '5.45',
                rentabil_36_meses: '21.57',
                rentabil_dia: '0.01',
                rentabil_mes_anteiror: '0.29',
                benchmark: {
                  nome: 'CDI',
                  id: '1',
                },
                rentabil_mes: '0.34',
              },
              hist_rentabil_fundo: {
                rel_fundo_benchmark_mes_ant: '-',
                rentabil_ano: '-3.01',
                rentabil_12_meses: '6.53',
                rentabil_36_meses: '25.29',
                rel_fundo_benchmark_mes: '-',
                rel_fundo_benchmark_dia: '-',
                rentabil_mes_anteiror: '-0.71',
                rel_fundo_benchmark_24_meses: '105.04',
                rel_fundo_benchmark_ano: '-',
                rentabil_24_meses: '12.75',
                rel_fundo_benchmark_36_meses: '117.24',
                id_carteira: '5112',
                rentabil_dia: '-0.02',
                rentabil_mes: '-2.95',
                rel_fundo_benchmark_12_meses: '119.78',
              },
              data_referencia: '2020-03-23T00:00:00-03:00',
            },
            tipo_cota: 'Fechamento',
            hora_aplicacao: '23:59',
            resgate_financeiro: 'D+2 (Úteis)',
            perfil_risco_ordem: '4',
            saldo_minimo: '1000.0',
            taxa_administracao: '0.50',
            aplicacao_cotizacao: 'D+0',
            aplicao_minima: '1000.0',
          },
          tributacoes: {
            tributacao: [
              {
                tipo: 'IR',
                valor: '0.00',
              },
              {
                tipo: 'IOF',
                valor: '0.00',
              },
            ],
          },
        },
        {
          rendimentos: {
            rendimento: [
              {
                datainicio: '2020-01-01T00:00:00-03:00',
                datafim: '2020-01-17T23:59:59.999-03:00',
                meses: '1',
                valorrendimento: '98.92',
              },
              {
                datainicio: '2019-01-01T00:00:00-03:00',
                datafim: '2020-01-17T23:59:59.999-03:00',
                meses: '12',
                valorrendimento: '3337.22',
              },
              {
                datainicio: '2018-01-01T00:00:00-03:00',
                datafim: '2020-01-17T23:59:59.999-03:00',
                meses: '24',
                valorrendimento: '3337.22',
              },
              {
                datainicio: '2017-01-01T00:00:00-03:00',
                datafim: '2020-01-17T23:59:59.999-03:00',
                meses: '36',
                valorrendimento: '3337.22',
              },
            ],
          },
          categoria_arena: '02-Renda Variável',
          historico_saldos_fundo: {
            id_carteira: '5094',
            saldos: {
              saldo: [
                {
                  valorsaldo: '3238.30',
                  data: '2019-12-31T00:00:00-03:00',
                },
                {
                  valorsaldo: '3337.22',
                  data: '2020-01-17T00:00:00-03:00',
                },
              ],
            },
          },
          saldo_atual: '31905.05',
          ultimas_operacoes: {
            operacao: [
              {
                data_operacao: '2020-06-15T00:00:00-03:00',
                data_liquidacao: '2020-06-15T00:00:00-03:00',
                tipo_operacao: 'Aplicação',
                valor_bruto: '100.00',
                id_fundo: '5094',
                id_operacao: '10608377',
              },
              {
                data_operacao: '2019-09-13T00:00:00-03:00',
                data_liquidacao: '2019-09-13T00:00:00-03:00',
                tipo_operacao: 'Aplicação',
                valor_bruto: '2900.00',
                id_fundo: '5094',
                id_operacao: '10549168',
              },
            ],
          },
          fundo: {
            data_inicio: '2013-07-31T00:00:00-03:00',
            valor_patrimonio_liq: '79743742.67',
            taxa_performance: '20.00',
            apelido: 'BR Plural Deb. Inc. Hedge 45 FICFIM CP',
            contagem_dias_resgate: 'Corridos',
            minimo_inicial: '1000.0',
            nome_gestor: 'PortoSeguro Investimentos',
            hora_resgate: '23:59',
            link_lamina:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/acoes/InformativoDesempenho_PS_Selecta.pdf',
            link_infor_desempenho:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/acoes/InformativoDesempenho_PS_Selecta.pdf',
            categoria_ambima: 'Ações Ativos Livre',
            is_fundo_ativo: true,
            aplicao_liberada: false,
            aviso_data_fundo: true,
            link_termo_adesao:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/acoes/TCR_PS_%20Selecta.pdf',
            resgate_minimo: '100.0',
            url_logo_gestor:
              'https://www.portoseguro.com.br/conteudo/solucoes-financeiras/investimentos/arena/assets/images/fundoLogos/logo-porto-investimentos.png',
            aliquotas_ir: {
              aliquota: {
                valor: '15',
                faixa: 'Alíquota Única',
              },
            },
            resgate_liberado: true,
            categoria_arena: 'Renda Variável',
            id_carteira: '51380057',
            regime_iof: 'Regime Regressivo',
            classificacao: 'Ações',
            aplicacao_financeiro: 'D+0',
            nome_carteira: 'Porto Seguro Selecta FIC FIA',
            link_regulamento:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/acoes/Regulamento_PS_Selecta.pdf',
            perfil_risco: 'alto',
            resgate_cotizacao: 'D+15 (Corridos)',
            nome_empresa: 'PortoSeguro Investimentos',
            benchmark: {
              nome: 'IBOVESPA',
              id: '70',
            },
            comparativo_hist_rentabil: {
              hist_rentabil_benchmark: {
                rentabil_Ano: '-1.63',
                rentabil_24_meses: '33.97',
                rentabil_12_meses: '16.81',
                rentabil_36_meses: '75.91',
                rentabil_dia: '1.52',
                rentabil_mes_anteiror: '6.85',
                benchmark: {
                  nome: 'IBOVESPA',
                  id: '70',
                },
                rentabil_mes: '-1.63',
              },
              hist_rentabil_fundo: {
                rel_fundo_benchmark_mes_ant: '0.34',
                rentabil_ano: '3.05',
                rentabil_12_meses: '35.40',
                rentabil_36_meses: '82.14',
                rel_fundo_benchmark_mes: '4.68',
                rel_fundo_benchmark_dia: '-',
                rentabil_mes_anteiror: '7.19',
                rel_fundo_benchmark_24_meses: '12.27',
                rel_fundo_benchmark_ano: '4.68',
                rentabil_24_meses: '46.24',
                rel_fundo_benchmark_36_meses: '6.23',
                id_carteira: '5094',
                rentabil_dia: '1.42',
                rentabil_mes: '3.05',
                rel_fundo_benchmark_12_meses: '18.59',
              },
              data_referencia: '2020-01-17T00:00:00-03:00',
            },
            tipo_cota: 'Fechamento',
            hora_aplicacao: '23:59',
            resgate_financeiro: 'D+2 (Úteis)',
            perfil_risco_ordem: '5',
            saldo_minimo: '0.0',
            taxa_administracao: '2.00',
            aplicacao_cotizacao: 'D+0',
            aplicao_minima: '100.0',
          },
          tributacoes: {
            tributacao: [
              {
                tipo: 'IR',
                valor: '65.58',
              },
              {
                tipo: 'IOF',
                valor: '0.00',
              },
            ],
          },
        },
        {
          rendimentos: {
            rendimento: [
              {
                datainicio: '2020-01-01T00:00:00-03:00',
                datafim: '2020-01-15T23:59:59.999-03:00',
                meses: '1',
                valorrendimento: '0.00',
              },
              {
                datainicio: '2019-01-01T00:00:00-03:00',
                datafim: '2020-01-15T23:59:59.999-03:00',
                meses: '12',
                valorrendimento: '40493.14',
              },
              {
                datainicio: '2018-01-01T00:00:00-03:00',
                datafim: '2020-01-15T23:59:59.999-03:00',
                meses: '24',
                valorrendimento: '40493.14',
              },
              {
                datainicio: '2017-01-01T00:00:00-03:00',
                datafim: '2020-01-15T23:59:59.999-03:00',
                meses: '36',
                valorrendimento: '40493.14',
              },
            ],
          },
          categoria_arena: '01-Renda Fixa',
          historico_saldos_fundo: {
            id_carteira: '5071',
            saldos: {
              saldo: [
                {
                  valorsaldo: '0.00',
                  data: '2019-12-31T00:00:00-03:00',
                },
                {
                  valorsaldo: '0.00',
                  data: '2020-01-15T00:00:00-03:00',
                },
              ],
            },
          },
          saldo_atual: '31905.05',
          ultimas_operacoes: {
            operacao: [
              {
                data_operacao: '2019-12-26T00:00:00-03:00',
                data_liquidacao: '2019-12-27T00:00:00-03:00',
                tipo_operacao: 'Resgate Total',
                valor_bruto: '10061.35',
                id_fundo: '5071',
                id_operacao: '10546000',
              },
              {
                data_operacao: '2019-12-02T00:00:00-03:00',
                data_liquidacao: '2019-12-03T00:00:00-03:00',
                tipo_operacao: 'Resgate Bruto',
                valor_bruto: '10400.00',
                id_fundo: '5071',
                id_operacao: '10361479',
              },
              {
                data_operacao: '2019-11-29T00:00:00-03:00',
                data_liquidacao: '2019-12-04T00:00:00-03:00',
                tipo_operacao: 'Come Cotas',
                valor_bruto: '36.64',
                id_fundo: '5071',
                id_operacao: '10454630',
              },
              {
                data_operacao: '2019-11-29T00:00:00-03:00',
                data_liquidacao: '2019-12-04T00:00:00-03:00',
                tipo_operacao: 'Come Cotas',
                valor_bruto: '0.41',
                id_fundo: '5071',
                id_operacao: '10454629',
              },
              {
                data_operacao: '2019-11-04T00:00:00-03:00',
                data_liquidacao: '2019-11-05T00:00:00-03:00',
                tipo_operacao: 'Resgate Bruto',
                valor_bruto: '20000.00',
                id_fundo: '5071',
                id_operacao: '10310246',
              },
              {
                data_operacao: '2019-09-13T00:00:00-03:00',
                data_liquidacao: '2019-09-13T00:00:00-03:00',
                tipo_operacao: 'Aplicação',
                valor_bruto: '20000.00',
                id_fundo: '5071',
                id_operacao: '10493279',
              },
            ],
          },
          fundo: {
            data_inicio: '1998-07-06T00:00:00-03:00',
            valor_patrimonio_liq: '1539702109.76',
            taxa_performance: '20.00',
            apelido: 'Porto Seguro Clássico FIC RF LP',
            contagem_dias_resgate: 'Úteis',
            minimo_inicial: '3000.0',
            nome_gestor: 'PortoSeguro Investimentos',
            hora_resgate: '17:00',
            link_lamina:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/renda-fixa/InformativoDesempenho_PS_Classico.pdf',
            link_infor_desempenho:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/renda-fixa/InformativoDesempenho_PS_Classico.pdf',
            categoria_ambima: 'RF Duração Livre Grau de Invest.',
            is_fundo_ativo: true,
            aplicao_liberada: true,
            aviso_data_fundo: true,
            link_termo_adesao:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/renda-fixa/TCR_PS_Classico.pdf',
            resgate_minimo: '100.0',
            url_logo_gestor:
              'https://www.portoseguro.com.br/conteudo/solucoes-financeiras/investimentos/arena/assets/images/fundoLogos/logo-porto-investimentos.png',
            aliquotas_ir: {
              aliquota: [
                {
                  valor: '22.5',
                  faixa: 'Até 180 dias',
                },
                {
                  valor: '20',
                  faixa: 'De 181 dias a 360 dias',
                },
                {
                  valor: '17.5',
                  faixa: 'De 361 dias a 720 dias',
                },
                {
                  valor: '15',
                  faixa: 'Acima de 720 dias',
                },
              ],
            },
            resgate_liberado: true,
            categoria_arena: 'Renda Fixa',
            id_carteira: '5071',
            regime_iof: 'Regime Regressivo',
            classificacao: 'Longo Prazo',
            aplicacao_financeiro: 'D+0',
            nome_carteira: 'Porto Seguro Clássico RF FICFI LP',
            link_regulamento:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/renda-fixa/Regulamento_PS_Classico.pdf',
            perfil_risco: 'medio-baixo',
            resgate_cotizacao: 'D+0 (Úteis)',
            nome_empresa: 'PortoSeguro Investimentos',
            benchmark: {
              nome: 'CDI',
              id: '1',
            },
            comparativo_hist_rentabil: {
              hist_rentabil_benchmark: {
                rentabil_Ano: '0.38',
                rentabil_24_meses: '12.54',
                rentabil_12_meses: '5.79',
                rentabil_36_meses: '23.13',
                rentabil_dia: '0.02',
                rentabil_mes_anteiror: '0.38',
                benchmark: {
                  nome: 'CDI',
                  id: '1',
                },
                rentabil_mes: '0.38',
              },
              hist_rentabil_fundo: {
                rel_fundo_benchmark_mes_ant: '135.61',
                rentabil_ano: '0.25',
                rentabil_12_meses: '7.10',
                rentabil_36_meses: '25.78',
                rel_fundo_benchmark_mes: '67.26',
                rel_fundo_benchmark_dia: '169.50',
                rentabil_mes_anteiror: '0.51',
                rel_fundo_benchmark_24_meses: '113.59',
                rel_fundo_benchmark_ano: '67.26',
                rentabil_24_meses: '14.25',
                rel_fundo_benchmark_36_meses: '111.49',
                id_carteira: '5071',
                rentabil_dia: '0.03',
                rentabil_mes: '0.25',
                rel_fundo_benchmark_12_meses: '122.61',
              },
              data_referencia: '2020-01-15T00:00:00-03:00',
            },
            tipo_cota: 'Fechamento',
            hora_aplicacao: '17:00',
            resgate_financeiro: 'D+1 (Úteis)',
            perfil_risco_ordem: '2',
            saldo_minimo: '1000.0',
            taxa_administracao: '0.50',
            aplicacao_cotizacao: 'D+0',
            aplicao_minima: '100.0',
          },
          tributacoes: {
            tributacao: [
              {
                tipo: 'IR',
                valor: '0.00',
              },
              {
                tipo: 'IOF',
                valor: '0.00',
              },
            ],
          },
        },
        {
          saldo_bloqueado: '0.0000',
          rendimentos: {
            rendimento: [
              {
                datainicio: '2019-12-01T00:00:00-03:00',
                datafim: '2019-12-19T23:59:59.999-03:00',
                meses: '1',
                valorrendimento: '0.00',
              },
              {
                datainicio: '2018-12-01T00:00:00-03:00',
                datafim: '2019-12-19T23:59:59.999-03:00',
                meses: '12',
                valorrendimento: '3532.87',
              },
              {
                datainicio: '2017-12-01T00:00:00-03:00',
                datafim: '2019-12-19T23:59:59.999-03:00',
                meses: '24',
                valorrendimento: '105556.22',
              },
              {
                datainicio: '2016-12-01T00:00:00-03:00',
                datafim: '2019-12-19T23:59:59.999-03:00',
                meses: '36',
                valorrendimento: '105556.22',
              },
            ],
          },
          categoria_arena: 'Investimento no exterior',
          historico_saldos_fundo: {
            id_carteira: '5105',
            saldos: {
              saldo: {
                valorsaldo: '0.00',
                data: '2019-12-19T00:00:00-03:00',
              },
            },
          },
          saldo_atual: '31905.05',
          ultimas_operacoes: {
            operacao: [
              {
                data_operacao: '2019-12-02T00:00:00-03:00',
                data_liquidacao: '2019-12-02T00:00:00-03:00',
                tipo_operacao: 'Resgate Total',
                valor_bruto: '2016.46',
                id_fundo: '5105',
                id_operacao: '10361473',
              },
              {
                data_operacao: '2019-11-29T00:00:00-03:00',
                data_liquidacao: '2019-12-04T00:00:00-03:00',
                tipo_operacao: 'Come Cotas',
                valor_bruto: '2.84',
                id_fundo: '5105',
                id_operacao: '10361332',
              },
              {
                data_operacao: '2019-05-24T00:00:00-03:00',
                data_liquidacao: '2019-05-24T00:00:00-03:00',
                tipo_operacao: 'Resgate Total',
                valor_bruto: '5844.21',
                id_fundo: '5105',
                id_operacao: '10051486',
              },
              {
                data_operacao: '2019-05-03T00:00:00-03:00',
                data_liquidacao: '2019-05-03T00:00:00-03:00',
                tipo_operacao: 'Resgate Líquido',
                valor_bruto: '10062.59',
                id_fundo: '5105',
                id_operacao: '10040713',
              },
              {
                data_operacao: '2019-04-22T00:00:00-03:00',
                data_liquidacao: '2019-04-22T00:00:00-03:00',
                tipo_operacao: 'Resgate Líquido',
                valor_bruto: '15088.20',
                id_fundo: '5105',
                id_operacao: '9964117',
              },
              {
                data_operacao: '2019-04-04T00:00:00-03:00',
                data_liquidacao: '2019-04-04T00:00:00-03:00',
                tipo_operacao: 'Resgate Líquido',
                valor_bruto: '10053.36',
                id_fundo: '5105',
                id_operacao: '961099',
              },
            ],
          },
          fundo: {
            data_inicio: '2014-02-28T00:00:00-03:00',
            valor_patrimonio_liq: '1902065243.83',
            taxa_performance: '0.00',
            apelido: 'Porto Seguro FI RF Ref. DI CP',
            contagem_dias_resgate: 'Úteis',
            minimo_inicial: '1000.0',
            nome_gestor: 'PortoSeguro Investimentos',
            hora_resgate: '23:59',
            link_lamina:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/DI/InformativoDesempenho_PS_ReferenciadoDICreditoPrivado.pdf',
            link_infor_desempenho:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/DI/InformativoDesempenho_PS_ReferenciadoDICreditoPrivado.pdf',
            categoria_ambima: 'RF Duração Baixa Crédito Livre',
            is_fundo_ativo: true,
            aplicao_liberada: false,
            aviso_data_fundo: true,
            link_termo_adesao:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/DI/TCR%20-%20Porto%20Seguro%20DI%20Credito%20Privado.pdf',
            resgate_minimo: '100.0',
            url_logo_gestor:
              'https://www.portoseguro.com.br/conteudo/solucoes-financeiras/investimentos/arena/assets/images/fundoLogos/logo-porto-investimentos.png',
            aliquotas_ir: {
              aliquota: [
                {
                  valor: '22.5',
                  faixa: 'Até 180 dias',
                },
                {
                  valor: '20',
                  faixa: 'De 181 dias a 360 dias',
                },
                {
                  valor: '17.5',
                  faixa: 'De 361 dias a 720 dias',
                },
                {
                  valor: '15',
                  faixa: 'Acima de 720 dias',
                },
              ],
            },
            resgate_liberado: false,
            categoria_arena: 'Renda Fixa',
            id_carteira: '5105',
            regime_iof: 'Regime Regressivo',
            classificacao: 'Longo Prazo',
            aplicacao_financeiro: 'D+0',
            nome_carteira: 'Porto Seguro FI Referenciado DI Credito Privado',
            link_regulamento:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/DI/Regulamento_PS_Referenciado_DI_Credito_Privado.pdf',
            perfil_risco: 'medio-baixo',
            resgate_cotizacao: 'D+0 (Úteis)',
            nome_empresa: 'PortoSeguro Investimentos',
            benchmark: {
              nome: 'CDI',
              id: '1',
            },
            comparativo_hist_rentabil: {
              hist_rentabil_benchmark: {
                rentabil_Ano: '5.97',
                rentabil_24_meses: '12.77',
                rentabil_12_meses: '5.97',
                rentabil_36_meses: '24.00',
                rentabil_dia: '0.02',
                rentabil_mes_anteiror: '0.38',
                benchmark: {
                  nome: 'CDI',
                  id: '1',
                },
                rentabil_mes: '0.38',
              },
              hist_rentabil_fundo: {
                rel_fundo_benchmark_mes_ant: '54.82',
                rentabil_ano: '5.42',
                rentabil_12_meses: '5.62',
                rentabil_36_meses: '24.47',
                rel_fundo_benchmark_mes: '40.48',
                rel_fundo_benchmark_dia: '92.46',
                rentabil_mes_anteiror: '0.21',
                rel_fundo_benchmark_24_meses: '97.64',
                rel_fundo_benchmark_ano: '90.89',
                rentabil_24_meses: '12.47',
                rel_fundo_benchmark_36_meses: '101.97',
                id_carteira: '5105',
                rentabil_dia: '0.02',
                rentabil_mes: '0.15',
                rel_fundo_benchmark_12_meses: '94.13',
              },
              data_referencia: '2019-12-19T00:00:00-03:00',
            },
            tipo_cota: 'Abertura',
            hora_aplicacao: '23:59',
            resgate_financeiro: 'D+0 (Úteis)',
            perfil_risco_ordem: '2',
            saldo_minimo: '1000.0',
            taxa_administracao: '0.40',
            aplicacao_cotizacao: 'D+0',
            aplicao_minima: '100.0',
          },
          tributacoes: {
            tributacao: [
              {
                tipo: 'IR',
                valor: '0.00',
              },
              {
                tipo: 'IOF',
                valor: '0.00',
              },
            ],
          },
        },
        {
          saldo_bloqueado: '0.00',
          rendimentos: {
            rendimento: [
              {
                datainicio: '2020-05-01T00:00:00-03:00',
                datafim: '2020-05-11T23:59:59.999-03:00',
                meses: '1',
                valorrendimento: '-139.66',
              },
              {
                datainicio: '2019-05-01T00:00:00-03:00',
                datafim: '2020-05-11T23:59:59.999-03:00',
                meses: '12',
                valorrendimento: '-258.98',
              },
              {
                datainicio: '2018-05-01T00:00:00-03:00',
                datafim: '2020-05-11T23:59:59.999-03:00',
                meses: '24',
                valorrendimento: '-258.98',
              },
              {
                datainicio: '2017-05-01T00:00:00-03:00',
                datafim: '2020-05-11T23:59:59.999-03:00',
                meses: '36',
                valorrendimento: '-258.98',
              },
            ],
          },
          categoria_arena: 'Cambial',
          historico_saldos_fundo: {
            id_carteira: '51380013',
            saldos: {
              saldo: [
                {
                  valorsaldo: '5309.10',
                  data: '2019-12-31T00:00:00-03:00',
                },
                {
                  valorsaldo: '5333.26',
                  data: '2020-01-31T00:00:00-03:00',
                },
                {
                  valorsaldo: '5330.12',
                  data: '2020-02-28T00:00:00-03:00',
                },
                {
                  valorsaldo: '5199.19',
                  data: '2020-03-31T00:00:00-03:00',
                },
                {
                  valorsaldo: '5184.96',
                  data: '2020-04-30T00:00:00-03:00',
                },
                {
                  valorsaldo: '0.00',
                  data: '2020-05-11T00:00:00-03:00',
                },
              ],
            },
          },
          saldo_atual: '11111.030',
          ultimas_operacoes: {
            operacao: [
              {
                data_operacao: '2020-04-29T00:00:00-03:00',
                data_liquidacao: '2020-05-07T00:00:00-03:00',
                tipo_operacao: 'Resgate Total',
                valor_bruto: '5189.29',
                id_fundo: '51380013',
                id_operacao: '10608097',
              },
              {
                data_operacao: '2019-10-01T00:00:00-03:00',
                data_liquidacao: '2019-10-01T00:00:00-03:00',
                tipo_operacao: 'Aplicação',
                valor_bruto: '350.00',
                id_fundo: '51380013',
                id_operacao: '10275996',
              },
              {
                data_operacao: '2019-09-11T00:00:00-03:00',
                data_liquidacao: '2019-09-11T00:00:00-03:00',
                tipo_operacao: 'Aplicação',
                valor_bruto: '100.00',
                id_fundo: '51380013',
                id_operacao: '10257242',
              },
              {
                data_operacao: '2019-09-05T00:00:00-03:00',
                data_liquidacao: '2019-09-05T00:00:00-03:00',
                tipo_operacao: 'Aplicação',
                valor_bruto: '5000.00',
                id_fundo: '51380013',
                id_operacao: '10250161',
              },
            ],
          },
          fundo: {
            data_inicio: '2017-08-15T00:00:00-03:00',
            valor_patrimonio_liq: '71719.92',
            taxa_performance: '0.00',
            apelido: 'RB Capital Vitória Deb. Inc. FIC FIM CP',
            contagem_dias_resgate: 'Úteis',
            minimo_inicial: '100.0',
            nome_gestor: 'RB Capital Asset',
            hora_resgate: '23:59',
            link_lamina:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Informativos-de-Desempenho/INFORMATIVODESEMPENHO_RBVITORIADEBENTURESINCENTIVADASFICFIM.pdf',
            link_infor_desempenho:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Informativos-de-Desempenho/INFORMATIVODESEMPENHO_RBVITORIADEBENTURESINCENTIVADASFICFIM.pdf',
            categoria_ambima: 'Multimercados Estrategia Especifica',
            is_fundo_ativo: true,
            aplicao_liberada: true,
            aviso_data_fundo: true,
            link_termo_adesao:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Termos/TERMODECIENCIADERISCO_RBVITORIADEBENTURESINCENTIVADASFICFIM.pdf',
            resgate_minimo: '100.0',
            url_logo_gestor:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Logos/LOGO_RB.png',
            resgate_liberado: true,
            categoria_arena: 'Renda Fixa',
            id_carteira: '51380013',
            regime_iof: 'Regime Regressivo',
            aplicacao_financeiro: 'D+0',
            nome_carteira:
              'RB Capital Vitória Debêntures Incentivadas FIC Multimercado Crédito Privado',
            link_regulamento:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Regulamentos/REGULAMENTO_RBVITORIADEBENTURESINCENTIVADASFICFIM.pdf',
            perfil_risco: 'medio',
            resgate_cotizacao: 'D+4 (Úteis)',
            nome_empresa: 'RB Capital Asset',
            benchmark: {
              nome: 'CDI',
              id: '1',
            },
            comparativo_hist_rentabil: {
              hist_rentabil_benchmark: {
                rentabil_Ano: '1.49',
                rentabil_24_meses: '11.51',
                rentabil_12_meses: '4.83',
                rentabil_36_meses: '-',
                rentabil_dia: '0.01',
                rentabil_mes_anteiror: '0.30',
                benchmark: {
                  nome: 'CDI',
                  id: '1',
                },
                rentabil_mes: '0.17',
              },
              hist_rentabil_fundo: {
                rel_fundo_benchmark_mes_ant: '-',
                rentabil_ano: '-2.20',
                rentabil_12_meses: '-2.99',
                rentabil_36_meses: '-',
                rel_fundo_benchmark_mes: '81.17',
                rel_fundo_benchmark_dia: '-',
                rentabil_mes_anteiror: '-0.27',
                rel_fundo_benchmark_24_meses: '48.52',
                rel_fundo_benchmark_ano: '-',
                rentabil_24_meses: '5.58',
                rel_fundo_benchmark_36_meses: '-',
                id_carteira: '51380013',
                rentabil_dia: '0.00',
                rentabil_mes: '0.14',
                rel_fundo_benchmark_12_meses: '-',
              },
              data_referencia: '2020-05-11T00:00:00-03:00',
            },
            tipo_cota: 'Fechamento',
            hora_aplicacao: '23:59',
            resgate_financeiro: 'D+5 (Úteis)',
            perfil_risco_ordem: '3',
            saldo_minimo: '100.0',
            taxa_administracao: '0.30',
            aplicacao_cotizacao: 'D+0',
            aplicao_minima: '100.0',
          },
          tributacoes: {
            tributacao: [
              {
                tipo: 'IR',
                valor: '0.00',
              },
              {
                tipo: 'IOF',
                valor: '0.00',
              },
            ],
          },
        },
        {
          rendimentos: {
            rendimento: [
              {
                datainicio: '2020-03-01T00:00:00-03:00',
                datafim: '2020-03-25T23:59:59.999-03:00',
                meses: '1',
                valorrendimento: '0.00',
              },
              {
                datainicio: '2019-03-01T00:00:00-03:00',
                datafim: '2020-03-25T23:59:59.999-03:00',
                meses: '12',
                valorrendimento: '-0.92',
              },
              {
                datainicio: '2018-03-01T00:00:00-03:00',
                datafim: '2020-03-25T23:59:59.999-03:00',
                meses: '24',
                valorrendimento: '-0.92',
              },
              {
                datainicio: '2017-03-01T00:00:00-03:00',
                datafim: '2020-03-25T23:59:59.999-03:00',
                meses: '36',
                valorrendimento: '-0.92',
              },
            ],
          },
          categoria_arena: '01-Renda Fixa',
          historico_saldos_fundo: {
            id_carteira: '51380057',
            saldos: {
              saldo: [
                {
                  valorsaldo: '98.90',
                  data: '2019-12-31T00:00:00-03:00',
                },
                {
                  valorsaldo: '0.00',
                  data: '2020-01-31T00:00:00-03:00',
                },
                {
                  valorsaldo: '0.00',
                  data: '2020-02-28T00:00:00-03:00',
                },
                {
                  valorsaldo: '0.00',
                  data: '2020-03-25T00:00:00-03:00',
                },
              ],
            },
          },
          saldo_atual: '11111.30',
          ultimas_operacoes: {
            operacao: [
              {
                data_operacao: '2019-12-02T00:00:00-03:00',
                data_liquidacao: '2020-01-17T00:00:00-03:00',
                tipo_operacao: 'Resgate Total',
                valor_bruto: '99.09',
                id_fundo: '51380057',
                id_operacao: '10361476',
              },
              {
                data_operacao: '2019-10-01T00:00:00-03:00',
                data_liquidacao: '2019-10-01T00:00:00-03:00',
                tipo_operacao: 'Aplicação',
                valor_bruto: '100.00',
                id_fundo: '51380057',
                id_operacao: '10275995',
              },
            ],
          },
          fundo: {
            data_inicio: '2019-04-01T00:00:00-03:00',
            valor_patrimonio_liq: '31729091.19',
            taxa_performance: '20.00',
            apelido: 'BR Plural Deb. Inc. Hedge 45 FICFIM CP',
            contagem_dias_resgate: 'Corridos',
            minimo_inicial: '100.0',
            nome_gestor: 'Brasil Capital',
            hora_resgate: '23:59',
            link_lamina:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Informativos-de-Desempenho/INFORMATIVODESEMPENHO_BRASILPLURALDEBENTURESINCENTIVADASHEDGE45FICFIM.pdf',
            link_infor_desempenho:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Informativos-de-Desempenho/INFORMATIVODESEMPENHO_BRASILPLURALDEBENTURESINCENTIVADASHEDGE45FICFIM.pdf',
            categoria_ambima: 'Multimercados Livre',
            is_fundo_ativo: true,
            aplicao_liberada: true,
            aviso_data_fundo: true,
            link_termo_adesao:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Termos/TERMODECIENCIADERISCO_BRASILPLURALDEBENTURESINCENTIVADASHEDGE45FICFIM.pdf',
            resgate_minimo: '100.0',
            url_logo_gestor:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Logos/LOGO_BRASILPLURAL.png',
            resgate_liberado: true,
            categoria_arena: 'Renda Fixa',
            id_carteira: '51380057',
            regime_iof: 'Regime Regressivo',
            aplicacao_financeiro: 'D+0',
            nome_carteira:
              'Brasil Plural Debêntures Incentivadas Hedge 45 FIC Multimercado Crédito Privado',
            link_regulamento:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Regulamentos/REGULAMENTO_BRASILPLURALDEBENTURESINCENTIVADASHEDGE45FICFIM.pdf',
            perfil_risco: 'medio',
            resgate_cotizacao: 'D+45 (Corridos)',
            nome_empresa: 'Brasil Capital',
            benchmark: {
              nome: 'CDI',
              id: '1',
            },
            comparativo_hist_rentabil: {
              hist_rentabil_benchmark: {
                rentabil_Ano: '1.02',
                rentabil_24_meses: '-',
                rentabil_12_meses: '5.45',
                rentabil_36_meses: '-',
                rentabil_dia: '0.01',
                rentabil_mes_anteiror: '0.29',
                benchmark: {
                  nome: 'CDI',
                  id: '1',
                },
                rentabil_mes: '0.34',
              },
              hist_rentabil_fundo: {
                rel_fundo_benchmark_mes_ant: '-',
                rentabil_ano: '-0.18',
                rentabil_12_meses: '1.01',
                rentabil_36_meses: '-',
                rel_fundo_benchmark_mes: '-',
                rel_fundo_benchmark_dia: '-',
                rentabil_mes_anteiror: '-0.14',
                rel_fundo_benchmark_24_meses: '-',
                rel_fundo_benchmark_ano: '-',
                rentabil_24_meses: '-',
                rel_fundo_benchmark_36_meses: '-',
                id_carteira: '51380057',
                rentabil_dia: '-0.30',
                rentabil_mes: '-0.60',
                rel_fundo_benchmark_12_meses: '18.56',
              },
              data_referencia: '2020-03-25T00:00:00-03:00',
            },
            tipo_cota: 'Fechamento',
            hora_aplicacao: '23:59',
            resgate_financeiro: 'D+1 (Úteis)',
            perfil_risco_ordem: '3',
            saldo_minimo: '100.0',
            taxa_administracao: '1.00',
            aplicacao_cotizacao: 'D+0',
            aplicao_minima: '100.0',
          },
          tributacoes: {
            tributacao: [
              {
                tipo: 'IR',
                valor: '0.00',
              },
              {
                tipo: 'IOF',
                valor: '0.00',
              },
            ],
          },
        },
      ],
    },
    id_cotista: '2000143425',
    visao_geral: {
      total: '35242.27',
      fundos: {
        fundo: [
          {
            apelido: 'Porto Seguro Clássico FIC RF LP',
            nome_fundo: 'Porto Seguro Clássico RF FICFI LP',
            percentual: '0.00',
          },
          {
            apelido: 'Porto Seguro Selecta FIC FIA',
            nome_fundo: 'Porto Seguro Selecta FIC FIA',
            percentual: '9.47',
          },
          {
            apelido: 'Porto Seguro FI RF Ref. DI CP',
            nome_fundo: 'Porto Seguro FI Referenciado DI Credito Privado',
            percentual: '0.00',
          },
          {
            apelido: 'Porto Seguro Alocação FIC FIM',
            nome_fundo: 'Porto Seguro Alocação FIC FIM',
            percentual: '90.53',
          },
          {
            apelido: 'RB Capital Vitória Deb. Inc. FIC FIM CP',
            nome_fundo:
              'RB Capital Vitória Debêntures Incentivadas FIC Multimercado Crédito Privado',
            percentual: '0.00',
          },
          {
            apelido: 'BR Plural Deb. Inc. Hedge 45 FICFIM CP',
            nome_fundo:
              'Brasil Plural Debêntures Incentivadas Hedge 45 FIC Multimercado Crédito Privado',
            percentual: '0.00',
          },
        ],
      },
    },
  },
];

module.exports = [
  {
    ...conservador,
    data: posicao,
  },
  {
    ...moderado,
    data: null,
  },
  {
    ...arrojado,
    data: null,
  },
];
