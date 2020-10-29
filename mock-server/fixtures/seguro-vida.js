const { conservador, moderado, arrojado } = require('./tokens');

module.exports = [
  {
    ...conservador,
    data: {
      Message: {
        TipoCritica: 'SUCESSO',
        Mensagem: 'SUCESSO',
      },
      ProdutosVida: {
        SeguroVida: {
          codigoFormaPagamento: '97',
          CoberturasBasicas: {
            CoberturaBasica: {
              CapitalSegurado: '1319626.71',
              Nome: 'MORTE ACIDENTAL',
            },
          },
          Beneficiarios: {
            Beneficiario: [
              {
                Percentual: '50',
                Nome: 'LAURA PASQUARELLI GARRASTAZU',
              },
              {
                Percentual: '50',
                Nome: 'LORENZO PASQUARELLI GARRASTAZU',
              },
            ],
          },
          DtFinalVigencia: '2020-11-25-03:00',
          GruposCobertura: {
            GrupoCobertura: [
              {
                CoberturasRisco: {
                  CoberturaRisco: [
                    {
                      CapitalSegurado: '1319626.71',
                      Nome: 'Morte',
                    },
                    {
                      CapitalSegurado: '3235.32',
                      Nome: 'Assistência Funeral - Familiar',
                    },
                  ],
                },
                Nome: 'Equilíbrio Financeiro Familiar',
              },
              {
                CoberturasRisco: {
                  CoberturaRisco: {
                    CapitalSegurado: '12000.00',
                    Nome: 'Capitalização',
                  },
                },
                Nome: 'Outros',
              },
              {
                CoberturasRisco: {
                  CoberturaRisco: [
                    {
                      CapitalSegurado: '1319626.71',
                      Nome: 'Antecipação Especial por Doença',
                    },
                    {
                      CapitalSegurado: '1319626.71',
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
            parcela: [
              {
                numero: '1',
                valor: '612.73',
              },
              {
                numero: '2',
                valor: '612.73',
              },
              {
                numero: '3',
                valor: '612.73',
              },
              {
                numero: '4',
                valor: '612.73',
              },
              {
                numero: '5',
                valor: '612.73',
              },
              {
                numero: '6',
                valor: '612.73',
              },
              {
                numero: '7',
                valor: '612.73',
              },
              {
                numero: '8',
                valor: '612.73',
              },
              {
                numero: '9',
                valor: '612.73',
              },
              {
                numero: '10',
                valor: '612.73',
              },
              {
                numero: '11',
                valor: '612.73',
              },
            ],
          },
          Ramo: '1391',
          DtInicioVigencia: '2019-11-26-03:00',
          Nome: 'Trianual - Vida e Acidentes Pessoais Individual',
          NomeSegurado: 'FERNANDA HAYDEE PASQUARELLI',
          Apolice: {
            LinkDownload:
              'http://vidanova/servicosvida/obterApolice?param=MSwxMzkxLDEzNTgwMSw1OCwzMzQ4MDA3',
          },
          descricaoFormaPagamento: 'CARTAO PORTO SEGURO',
        },
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
