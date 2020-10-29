const { conservador, moderado, arrojado } = require('./tokens');

module.exports = [
  {
    ...conservador,
    data: {
      Message: {
        TipoCritica: 'SUCESSO',
        Mensagem: 'SUCESSO',
      },
      ProdutosViagem: {
        Viagem: [
          {
            codigoFormaPagamento: '62',
            CoberturasBasicas: {
              CoberturaBasica: [
                {
                  CapitalSegurado: '30000.00',
                  Nome: 'DESPESAS MEDICO HOSPITALARES E ODONTOLÓGICAS',
                },
                {
                  CapitalSegurado: '100000.00',
                  Nome: 'MORTE ACIDENTAL',
                },
              ],
            },
            Beneficiarios: {
              Beneficiario: {
                Percentual: '100',
                Nome: 'Herdeiros legais',
              },
            },
            DtFinalVigencia: '2020-09-08-03:00',
            GruposCobertura: {
              GrupoCobertura: [
                {
                  CoberturasRisco: {
                    CoberturaRisco: [
                      {
                        CapitalSegurado: '200.00',
                        Nome:
                          'Hospedagem Acompanhante- Hospitalização Prolongada',
                      },
                      {
                        CapitalSegurado: '5000.00',
                        Nome: 'Acompanhamento de Menor',
                      },
                      {
                        CapitalSegurado: '5000.00',
                        Nome: 'Assistência Funeral Viagem',
                      },
                      {
                        CapitalSegurado: '5000.00',
                        Nome:
                          'Remarcação de Pas. para Reg. de Membros de Família',
                      },
                      {
                        CapitalSegurado: '200.00',
                        Nome: 'Hospedagem após Alta Hospitalar',
                      },
                      {
                        CapitalSegurado: '20000.00',
                        Nome: 'Traslado Médico',
                      },
                      {
                        CapitalSegurado: '5000.00',
                        Nome:
                          'Acompanhante em caso de Hospitalização Prolongada',
                      },
                      {
                        CapitalSegurado: '500.00',
                        Nome: 'Danos de Bagagem',
                      },
                      {
                        CapitalSegurado: '5000.00',
                        Nome: 'Remarcação de passagem para Regresso',
                      },
                      {
                        CapitalSegurado: '20000.00',
                        Nome: 'Traslado de Corpo',
                      },
                      {
                        CapitalSegurado: '20000.00',
                        Nome: 'Regresso Sanitário',
                      },
                      {
                        CapitalSegurado: '1500.00',
                        Nome: 'Extravio de Bagagem',
                      },
                    ],
                  },
                  Nome: 'Outros',
                },
                {
                  CoberturasRisco: {
                    CoberturaRisco: [
                      {
                        CapitalSegurado: '100000.00',
                        Nome:
                          'Invalidez Permanente Total ou Parcial por Acidente',
                      },
                      {
                        CapitalSegurado: '100000.00',
                        Nome: 'Morte Acidental',
                      },
                    ],
                  },
                  Nome: 'Imprevistos',
                },
              ],
            },
            Sucursal: '1',
            parcelas: {
              parcela: {
                numero: '1',
                valor: '7.59',
              },
            },
            Ramo: '1369',
            DtInicioVigencia: '2020-09-08-03:00',
            Nome: 'Plano Porto Brasil Ouro',
            NomeSegurado: 'RAFAEL RODRIGUES',
            Apolice: {
              LinkDownload:
                'http://vidanova/servicosvida/obterApolice?param=MSwxMzY5LDYwMzI1LDcsNDgxNjQwOA==',
            },
            descricaoFormaPagamento: 'CARTAO DE CREDITO(TODAS PARC. EM CARTAO)',
          },
          {
            codigoFormaPagamento: '62',
            CoberturasBasicas: {
              CoberturaBasica: [
                {
                  CapitalSegurado: '10000.00',
                  Nome: 'DESPESAS MEDICO HOSPITALARES E ODONTOLÓGICAS',
                },
                {
                  CapitalSegurado: '80000.00',
                  Nome: 'MORTE ACIDENTAL',
                },
              ],
            },
            Beneficiarios: {
              Beneficiario: {
                Percentual: '100',
                Nome: 'Herdeiros legais',
              },
            },
            DtFinalVigencia: '2020-09-11-03:00',
            GruposCobertura: {
              GrupoCobertura: [
                {
                  CoberturasRisco: {
                    CoberturaRisco: [
                      {
                        CapitalSegurado: '20000.00',
                        Nome: 'Regresso Sanitário',
                      },
                      {
                        CapitalSegurado: '5000.00',
                        Nome: 'Assistência Funeral Viagem',
                      },
                      {
                        CapitalSegurado: '3000.00',
                        Nome:
                          'Remarcação de Pas. para Reg. de Membros de Família',
                      },
                      {
                        CapitalSegurado: '20000.00',
                        Nome: 'Traslado de Corpo',
                      },
                      {
                        CapitalSegurado: '20000.00',
                        Nome: 'Traslado Médico',
                      },
                      {
                        CapitalSegurado: '3000.00',
                        Nome: 'Acompanhamento de Menor',
                      },
                      {
                        CapitalSegurado: '3000.00',
                        Nome: 'Remarcação de passagem para Regresso',
                      },
                      {
                        CapitalSegurado: '100.00',
                        Nome:
                          'Hospedagem Acompanhante- Hospitalização Prolongada',
                      },
                      {
                        CapitalSegurado: '100.00',
                        Nome: 'Hospedagem após Alta Hospitalar',
                      },
                      {
                        CapitalSegurado: '3000.00',
                        Nome:
                          'Acompanhante em caso de Hospitalização Prolongada',
                      },
                    ],
                  },
                  Nome: 'Outros',
                },
                {
                  CoberturasRisco: {
                    CoberturaRisco: [
                      {
                        CapitalSegurado: '80000.00',
                        Nome: 'Morte Acidental',
                      },
                      {
                        CapitalSegurado: '80000.00',
                        Nome:
                          'Invalidez Permanente Total ou Parcial por Acidente',
                      },
                    ],
                  },
                  Nome: 'Imprevistos',
                },
              ],
            },
            Sucursal: '1',
            parcelas: {
              parcela: {
                numero: '1',
                valor: '3.53',
              },
            },
            Ramo: '1369',
            DtInicioVigencia: '2020-09-11-03:00',
            Nome: 'Plano Porto Brasil Terra',
            NomeSegurado: 'RAFAEL RODRIGUES',
            Apolice: {
              LinkDownload:
                'http://vidanova/servicosvida/obterApolice?param=MSwxMzY5LDYwMzkyLDcsNDgzMDk1Nw==',
            },
            descricaoFormaPagamento: 'CARTAO DE CREDITO(TODAS PARC. EM CARTAO)',
          },
          {
            codigoFormaPagamento: '62',
            CoberturasBasicas: {
              CoberturaBasica: [
                {
                  CapitalSegurado: '15000.00',
                  Nome: 'DESPESAS MEDICO HOSPITALARES E ODONTOLÓGICAS',
                },
                {
                  CapitalSegurado: '100000.00',
                  Nome: 'MORTE ACIDENTAL',
                },
              ],
            },
            Beneficiarios: {
              Beneficiario: {
                Percentual: '100',
                Nome: 'Herdeiros legais',
              },
            },
            DtFinalVigencia: '2020-10-10-03:00',
            GruposCobertura: {
              GrupoCobertura: [
                {
                  CoberturasRisco: {
                    CoberturaRisco: [
                      {
                        CapitalSegurado: '15000.00',
                        Nome: 'Regresso Sanitário',
                      },
                      {
                        CapitalSegurado: '100.00',
                        Nome: 'Despesas Farmecêuticas',
                      },
                      {
                        CapitalSegurado: '2000.00',
                        Nome: 'Remarcação de passagem para Regresso',
                      },
                      {
                        CapitalSegurado: '2500.00',
                        Nome: 'Extravio de Bagagem',
                      },
                      {
                        CapitalSegurado: '2000.00',
                        Nome:
                          'Acompanhante em caso de Hospitalização Prolongada',
                      },
                      {
                        CapitalSegurado: '1000.00',
                        Nome: 'Interrupção de Viagem',
                      },
                      {
                        CapitalSegurado: '100.00',
                        Nome:
                          'Hospedagem Acompanhante- Hospitalização Prolongada',
                      },
                      {
                        CapitalSegurado: '1000.00',
                        Nome: 'Cancelamento de Viagem',
                      },
                      {
                        CapitalSegurado: '1000.00',
                        Nome: 'Despesas Jurídicas',
                      },
                      {
                        CapitalSegurado: '100.00',
                        Nome: 'Fisioterapia',
                      },
                      {
                        CapitalSegurado: '5000.00',
                        Nome: 'Assistência Funeral Viagem',
                      },
                      {
                        CapitalSegurado: '100.00',
                        Nome: 'Hospedagem após Alta Hospitalar',
                      },
                      {
                        CapitalSegurado: '2000.00',
                        Nome: 'Acompanhamento de Menor',
                      },
                      {
                        CapitalSegurado: '2000.00',
                        Nome: 'Pagamento de Fiança',
                      },
                      {
                        CapitalSegurado: '2000.00',
                        Nome:
                          'Remarcação de Pas. para Reg. de Membros de Família',
                      },
                      {
                        CapitalSegurado: '15000.00',
                        Nome: 'Traslado Médico',
                      },
                      {
                        CapitalSegurado: '100.00',
                        Nome: 'Danos de Bagagem',
                      },
                      {
                        CapitalSegurado: '15000.00',
                        Nome: 'Traslado de Corpo',
                      },
                    ],
                  },
                  Nome: 'Outros',
                },
                {
                  CoberturasRisco: {
                    CoberturaRisco: [
                      {
                        CapitalSegurado: '100000.00',
                        Nome: 'Morte Acidental',
                      },
                      {
                        CapitalSegurado: '100000.00',
                        Nome:
                          'Invalidez Permanente Total ou Parcial por Acidente',
                      },
                    ],
                  },
                  Nome: 'Imprevistos',
                },
              ],
            },
            Sucursal: '1',
            parcelas: {
              parcela: {
                numero: '1',
                valor: '26.14',
              },
            },
            Ramo: '1369',
            DtInicioVigencia: '2020-10-10-03:00',
            Nome: 'Plano Porto America Latina',
            NomeSegurado: 'RAFAEL RODRIGUES',
            Apolice: {
              LinkDownload:
                'http://vidanova/servicosvida/obterApolice?param=MSwxMzY5LDYwNTU0LDcsNTEzNTc4Nw==',
            },
            descricaoFormaPagamento: 'CARTAO DE CREDITO(TODAS PARC. EM CARTAO)',
          },
          {
            codigoFormaPagamento: '62',
            CoberturasBasicas: {
              CoberturaBasica: [
                {
                  CapitalSegurado: '10000.00',
                  Nome: 'DESPESAS MEDICO HOSPITALARES E ODONTOLÓGICAS',
                },
                {
                  CapitalSegurado: '80000.00',
                  Nome: 'MORTE ACIDENTAL',
                },
              ],
            },
            Beneficiarios: {
              Beneficiario: {
                Percentual: '100',
                Nome: 'Herdeiros legais',
              },
            },
            DtFinalVigencia: '2020-10-19-03:00',
            GruposCobertura: {
              GrupoCobertura: [
                {
                  CoberturasRisco: {
                    CoberturaRisco: [
                      {
                        CapitalSegurado: '20000.00',
                        Nome: 'Traslado Médico',
                      },
                      {
                        CapitalSegurado: '3000.00',
                        Nome:
                          'Acompanhante em caso de Hospitalização Prolongada',
                      },
                      {
                        CapitalSegurado: '20000.00',
                        Nome: 'Regresso Sanitário',
                      },
                      {
                        CapitalSegurado: '3000.00',
                        Nome: 'Acompanhamento de Menor',
                      },
                      {
                        CapitalSegurado: '3000.00',
                        Nome:
                          'Remarcação de Pas. para Reg. de Membros de Família',
                      },
                      {
                        CapitalSegurado: '5000.00',
                        Nome: 'Assistência Funeral Viagem',
                      },
                      {
                        CapitalSegurado: '100.00',
                        Nome:
                          'Hospedagem Acompanhante- Hospitalização Prolongada',
                      },
                      {
                        CapitalSegurado: '100.00',
                        Nome: 'Hospedagem após Alta Hospitalar',
                      },
                      {
                        CapitalSegurado: '3000.00',
                        Nome: 'Remarcação de passagem para Regresso',
                      },
                      {
                        CapitalSegurado: '20000.00',
                        Nome: 'Traslado de Corpo',
                      },
                    ],
                  },
                  Nome: 'Outros',
                },
                {
                  CoberturasRisco: {
                    CoberturaRisco: [
                      {
                        CapitalSegurado: '80000.00',
                        Nome:
                          'Invalidez Permanente Total ou Parcial por Acidente',
                      },
                      {
                        CapitalSegurado: '80000.00',
                        Nome: 'Morte Acidental',
                      },
                    ],
                  },
                  Nome: 'Imprevistos',
                },
              ],
            },
            Sucursal: '1',
            parcelas: {
              parcela: {
                numero: '1',
                valor: '3.53',
              },
            },
            Ramo: '1369',
            DtInicioVigencia: '2020-10-19-03:00',
            Nome: 'Plano Porto Brasil Terra',
            NomeSegurado: 'RAFAEL RODRIGUES',
            Apolice: {
              LinkDownload:
                'http://vidanova/servicosvida/obterApolice?param=MSwxMzY5LDYwNjE5LDcsNTE1Mjc5OA==',
            },
            descricaoFormaPagamento: 'CARTAO DE CREDITO(TODAS PARC. EM CARTAO)',
          },
          {
            codigoFormaPagamento: '62',
            CoberturasBasicas: {
              CoberturaBasica: [
                {
                  CapitalSegurado: '10000.00',
                  Nome: 'DESPESAS MEDICO HOSPITALARES E ODONTOLÓGICAS',
                },
                {
                  CapitalSegurado: '80000.00',
                  Nome: 'MORTE ACIDENTAL',
                },
              ],
            },
            Beneficiarios: {
              Beneficiario: {
                Percentual: '100',
                Nome: 'Herdeiros legais',
              },
            },
            DtFinalVigencia: '2020-04-26-03:00',
            GruposCobertura: {
              GrupoCobertura: [
                {
                  CoberturasRisco: {
                    CoberturaRisco: [
                      {
                        CapitalSegurado: '3000.00',
                        Nome: 'Acompanhamento de Menor',
                      },
                      {
                        CapitalSegurado: '3000.00',
                        Nome: 'Remarcação de passagem para Regresso',
                      },
                      {
                        CapitalSegurado: '3000.00',
                        Nome:
                          'Remarcação de Pas. para Reg. de Membros de Família',
                      },
                      {
                        CapitalSegurado: '100.00',
                        Nome: 'Hospedagem após Alta Hospitalar',
                      },
                      {
                        CapitalSegurado: '20000.00',
                        Nome: 'Traslado Médico',
                      },
                      {
                        CapitalSegurado: '5000.00',
                        Nome: 'Assistência Funeral Viagem',
                      },
                      {
                        CapitalSegurado: '20000.00',
                        Nome: 'Regresso Sanitário',
                      },
                      {
                        CapitalSegurado: '20000.00',
                        Nome: 'Traslado de Corpo',
                      },
                      {
                        CapitalSegurado: '100.00',
                        Nome:
                          'Hospedagem Acompanhante- Hospitalização Prolongada',
                      },
                      {
                        CapitalSegurado: '3000.00',
                        Nome:
                          'Acompanhante em caso de Hospitalização Prolongada',
                      },
                    ],
                  },
                  Nome: 'Outros',
                },
                {
                  CoberturasRisco: {
                    CoberturaRisco: [
                      {
                        CapitalSegurado: '80000.00',
                        Nome: 'Morte Acidental',
                      },
                      {
                        CapitalSegurado: '80000.00',
                        Nome:
                          'Invalidez Permanente Total ou Parcial por Acidente',
                      },
                    ],
                  },
                  Nome: 'Imprevistos',
                },
              ],
            },
            Sucursal: '1',
            parcelas: {
              parcela: {
                numero: '1',
                valor: '3.53',
              },
            },
            Ramo: '1369',
            DtInicioVigencia: '2020-04-26-03:00',
            Nome: 'Plano Porto Brasil Terra',
            NomeSegurado: 'RAFAEL RODRIGUES',
            Apolice: {
              LinkDownload:
                'http://vidanova/servicosvida/obterApolice?param=MSwxMzY5LDYwNzA4LDcsMTAwMDA2OTU=',
            },
            descricaoFormaPagamento: 'CARTAO DE CREDITO(TODAS PARC. EM CARTAO)',
          },
          {
            codigoFormaPagamento: '62',
            CoberturasBasicas: {
              CoberturaBasica: [
                {
                  CapitalSegurado: '10000.00',
                  Nome: 'DESPESAS MEDICO HOSPITALARES E ODONTOLÓGICAS',
                },
                {
                  CapitalSegurado: '80000.00',
                  Nome: 'MORTE ACIDENTAL',
                },
              ],
            },
            Beneficiarios: {
              Beneficiario: {
                Percentual: '100',
                Nome: 'Herdeiros legais',
              },
            },
            DtFinalVigencia: '2020-11-23-03:00',
            GruposCobertura: {
              GrupoCobertura: [
                {
                  CoberturasRisco: {
                    CoberturaRisco: [
                      {
                        CapitalSegurado: '20000.00',
                        Nome: 'Traslado de Corpo',
                      },
                      {
                        CapitalSegurado: '20000.00',
                        Nome: 'Traslado Médico',
                      },
                      {
                        CapitalSegurado: '100.00',
                        Nome: 'Hospedagem após Alta Hospitalar',
                      },
                      {
                        CapitalSegurado: '5000.00',
                        Nome: 'Assistência Funeral Viagem',
                      },
                      {
                        CapitalSegurado: '3000.00',
                        Nome: 'Acompanhamento de Menor',
                      },
                      {
                        CapitalSegurado: '20000.00',
                        Nome: 'Regresso Sanitário',
                      },
                      {
                        CapitalSegurado: '3000.00',
                        Nome:
                          'Remarcação de Pas. para Reg. de Membros de Família',
                      },
                      {
                        CapitalSegurado: '3000.00',
                        Nome: 'Remarcação de passagem para Regresso',
                      },
                      {
                        CapitalSegurado: '3000.00',
                        Nome:
                          'Acompanhante em caso de Hospitalização Prolongada',
                      },
                      {
                        CapitalSegurado: '100.00',
                        Nome:
                          'Hospedagem Acompanhante- Hospitalização Prolongada',
                      },
                    ],
                  },
                  Nome: 'Outros',
                },
                {
                  CoberturasRisco: {
                    CoberturaRisco: [
                      {
                        CapitalSegurado: '80000.00',
                        Nome:
                          'Invalidez Permanente Total ou Parcial por Acidente',
                      },
                      {
                        CapitalSegurado: '80000.00',
                        Nome: 'Morte Acidental',
                      },
                    ],
                  },
                  Nome: 'Imprevistos',
                },
              ],
            },
            Sucursal: '1',
            parcelas: {
              parcela: {
                numero: '1',
                valor: '3.53',
              },
            },
            Ramo: '1369',
            DtInicioVigencia: '2020-11-23-03:00',
            Nome: 'Plano Porto Brasil Terra',
            NomeSegurado: 'RAFAEL RODRIGUES',
            Apolice: {
              LinkDownload:
                'http://vidanova/servicosvida/obterApolice?param=MSwxMzY5LDYxMDExLDcsMTAzMzI0Nzc=',
            },
            descricaoFormaPagamento: 'CARTAO DE CREDITO(TODAS PARC. EM CARTAO)',
          },
          {
            codigoFormaPagamento: '97',
            CoberturasBasicas: {
              CoberturaBasica: [
                {
                  CapitalSegurado: '10000.00',
                  Nome: 'DESPESAS MEDICO HOSPITALARES E ODONTOLÓGICAS',
                },
                {
                  CapitalSegurado: '80000.00',
                  Nome: 'MORTE ACIDENTAL',
                },
              ],
            },
            Beneficiarios: {
              Beneficiario: {
                Percentual: '100',
                Nome: 'Herdeiros legais',
              },
            },
            DtFinalVigencia: '2020-10-31-03:00',
            GruposCobertura: {
              GrupoCobertura: [
                {
                  CoberturasRisco: {
                    CoberturaRisco: [
                      {
                        CapitalSegurado: '3000.00',
                        Nome: 'Acompanhamento de Menor',
                      },
                      {
                        CapitalSegurado: '3000.00',
                        Nome:
                          'Remarcação de Pas. para Reg. de Membros de Família',
                      },
                      {
                        CapitalSegurado: '3000.00',
                        Nome: 'Remarcação de passagem para Regresso',
                      },
                      {
                        CapitalSegurado: '100.00',
                        Nome:
                          'Hospedagem Acompanhante- Hospitalização Prolongada',
                      },
                      {
                        CapitalSegurado: '20000.00',
                        Nome: 'Traslado Médico',
                      },
                      {
                        CapitalSegurado: '100.00',
                        Nome: 'Hospedagem após Alta Hospitalar',
                      },
                      {
                        CapitalSegurado: '5000.00',
                        Nome: 'Assistência Funeral Viagem',
                      },
                      {
                        CapitalSegurado: '20000.00',
                        Nome: 'Traslado de Corpo',
                      },
                      {
                        CapitalSegurado: '3000.00',
                        Nome:
                          'Acompanhante em caso de Hospitalização Prolongada',
                      },
                      {
                        CapitalSegurado: '20000.00',
                        Nome: 'Regresso Sanitário',
                      },
                    ],
                  },
                  Nome: 'Outros',
                },
                {
                  CoberturasRisco: {
                    CoberturaRisco: [
                      {
                        CapitalSegurado: '80000.00',
                        Nome:
                          'Invalidez Permanente Total ou Parcial por Acidente',
                      },
                      {
                        CapitalSegurado: '80000.00',
                        Nome: 'Morte Acidental',
                      },
                    ],
                  },
                  Nome: 'Imprevistos',
                },
              ],
            },
            Sucursal: '95',
            parcelas: {
              parcela: {
                numero: '1',
                valor: '3.36',
              },
            },
            Ramo: '1369',
            DtInicioVigencia: '2020-10-31-03:00',
            Nome: 'Plano Porto Brasil Terra',
            NomeSegurado: 'RAFAEL RODRIGUES',
            Apolice: {
              LinkDownload:
                'http://vidanova/servicosvida/obterApolice?param=OTUsMTM2OSwxNDkyNTgsNywxMDMzMzIwMw==',
            },
            descricaoFormaPagamento: 'CARTAO PORTO SEGURO',
          },
        ],
      },
    },
  },
  {
    ...moderado,
    data: {},
  },
  {
    ...arrojado,
    data: {},
  },
];
