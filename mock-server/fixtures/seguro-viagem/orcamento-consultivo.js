module.exports = {
  consultivo: {
    identificadorRepresentante: 'P5005J',
    codigoOfertaConsultiva: 'VIAGEM',
    canalDistribuicao: 'COR',
    meioComercializacao: 'Portal',
    conjuntos: [
      {
        id: 1,
        nome: 'Tela Inicial Viagem',
        titulo: 'Cotação Seguro Viagem',
        subtitulo:
          'Este seguro não terá cobertura caso contratado em período de viagem ou fora do território nacional. Informe os dados do seu cliente:',
        informacoes: [
          {
            id: 'ORIGEM',
            nome: 'Origem',
            descricao: null,
            tipo: 'Opções fixas',
            obrigatorio: true,
            servico: null,
            opcoes: [
              {
                codigo: 'Brasil',
                rotulo: 'Brasil',
                ordem: 1,
              },
            ],
            ordem: 3,
          },
          {
            id: 'TIPO_VIAGEM',
            nome: 'Tipo de Viagem',
            descricao: null,
            tipo: 'Opções fixas',
            obrigatorio: true,
            servico: null,
            opcoes: [
              {
                codigo: 'INTERNACIONAL',
                rotulo: 'Internacional',
                ordem: 2,
              },
              {
                codigo: 'NACIONAL',
                rotulo: 'Nacional',
                ordem: 1,
              },
            ],
            ordem: 2,
          },
          {
            id: 'DICIO_NOME',
            nome: 'Nome do Passageiro Principal',
            descricao: null,
            tipo: 'Texto',
            obrigatorio: true,
            servico: null,
            opcoes: [],
            ordem: 1,
          },
          {
            id: 'DICIO_DATA_SAIDA',
            nome: 'Data de Saída',
            descricao: null,
            tipo: 'DataCalendario',
            obrigatorio: true,
            servico: null,
            opcoes: [],
            ordem: 5,
          },
          {
            id: 'DICIO_DATA_RETORNO',
            nome: 'Data de Retorno',
            descricao: null,
            tipo: 'DataCalendario',
            obrigatorio: true,
            servico: null,
            opcoes: [],
            ordem: 6,
          },
          {
            id: 'DICIO_MOTOCICLETA',
            nome:
              'Utilizará motocicleta durante a viagem?  Não haverá cobertura na América do Sul.',
            descricao: null,
            tipo: 'Radiobutton',
            obrigatorio: true,
            servico: null,
            opcoes: [
              {
                codigo: 'true',
                rotulo: 'Sim',
                ordem: 1,
              },
              {
                codigo: 'false',
                rotulo: 'Não',
                ordem: 2,
              },
            ],
            ordem: 8,
          },
          {
            id: 'DICIO_AVENTURA',
            nome: 'Praticará esportes de aventura durante a viagem?',
            descricao: null,
            tipo: 'Radiobutton',
            obrigatorio: true,
            servico: null,
            opcoes: [
              {
                codigo: 'true',
                rotulo: 'Sim',
                ordem: 1,
              },
              {
                codigo: 'false',
                rotulo: 'Não',
                ordem: 2,
              },
            ],
            ordem: 7,
          },
          {
            id: 'DICIO_QTD_JOVENS',
            nome: 'Quantidade de passageiros de 0 a 70 anos',
            descricao: null,
            tipo: 'Opções fixas',
            obrigatorio: true,
            servico: null,
            opcoes: [
              {
                codigo: '0',
                rotulo: '0',
                ordem: 1,
              },
              {
                codigo: '1',
                rotulo: '1',
                ordem: 2,
              },
              {
                codigo: '2',
                rotulo: '2',
                ordem: 3,
              },
              {
                codigo: '3',
                rotulo: '3',
                ordem: 4,
              },
              {
                codigo: '4',
                rotulo: '4',
                ordem: 5,
              },
              {
                codigo: '5',
                rotulo: '5',
                ordem: 6,
              },
              {
                codigo: '6',
                rotulo: '6',
                ordem: 7,
              },
              {
                codigo: '7',
                rotulo: '7',
                ordem: 8,
              },
              {
                codigo: '8',
                rotulo: '8',
                ordem: 9,
              },
              {
                codigo: '9',
                rotulo: '9',
                ordem: 10,
              },
              {
                codigo: '10',
                rotulo: '10',
                ordem: 11,
              },
              {
                codigo: '11',
                rotulo: '11',
                ordem: 12,
              },
              {
                codigo: '12',
                rotulo: '12',
                ordem: 13,
              },
              {
                codigo: '13',
                rotulo: '13',
                ordem: 14,
              },
              {
                codigo: '14',
                rotulo: '14',
                ordem: 15,
              },
              {
                codigo: '15',
                rotulo: '15',
                ordem: 16,
              },
              {
                codigo: '16',
                rotulo: '16',
                ordem: 17,
              },
              {
                codigo: '17',
                rotulo: '17',
                ordem: 18,
              },
              {
                codigo: '18',
                rotulo: '18',
                ordem: 19,
              },
              {
                codigo: '19',
                rotulo: '19',
                ordem: 20,
              },
              {
                codigo: '20',
                rotulo: '20',
                ordem: 21,
              },
            ],
            ordem: 9,
          },
          {
            id: 'DICIO_QTD_IDOSOS',
            nome: 'Quantidade de passageiros de 71 a 90 anos',
            descricao: null,
            tipo: 'Opções fixas',
            obrigatorio: true,
            servico: null,
            opcoes: [
              {
                codigo: '0',
                rotulo: '0',
                ordem: 1,
              },
              {
                codigo: '1',
                rotulo: '1',
                ordem: 2,
              },
              {
                codigo: '2',
                rotulo: '2',
                ordem: 3,
              },
              {
                codigo: '3',
                rotulo: '3',
                ordem: 4,
              },
              {
                codigo: '4',
                rotulo: '4',
                ordem: 5,
              },
              {
                codigo: '5',
                rotulo: '5',
                ordem: 6,
              },
              {
                codigo: '6',
                rotulo: '6',
                ordem: 7,
              },
              {
                codigo: '7',
                rotulo: '7',
                ordem: 8,
              },
              {
                codigo: '8',
                rotulo: '8',
                ordem: 9,
              },
              {
                codigo: '9',
                rotulo: '9',
                ordem: 10,
              },
              {
                codigo: '10',
                rotulo: '10',
                ordem: 11,
              },
              {
                codigo: '11',
                rotulo: '11',
                ordem: 12,
              },
              {
                codigo: '12',
                rotulo: '12',
                ordem: 13,
              },
              {
                codigo: '13',
                rotulo: '13',
                ordem: 14,
              },
              {
                codigo: '14',
                rotulo: '14',
                ordem: 15,
              },
              {
                codigo: '15',
                rotulo: '15',
                ordem: 16,
              },
              {
                codigo: '16',
                rotulo: '16',
                ordem: 17,
              },
              {
                codigo: '17',
                rotulo: '17',
                ordem: 18,
              },
              {
                codigo: '18',
                rotulo: '18',
                ordem: 19,
              },
              {
                codigo: '19',
                rotulo: '19',
                ordem: 20,
              },
              {
                codigo: '20',
                rotulo: '20',
                ordem: 21,
              },
            ],
            ordem: 10,
          },
          {
            id: 'DESTINO',
            nome: 'Informe o seu destino',
            descricao: null,
            tipo: 'Opções fixas',
            obrigatorio: true,
            servico: null,
            opcoes: [
              {
                codigo: 'Brasil',
                rotulo: 'Brasil',
                ordem: 1,
              },
              {
                codigo: 'África',
                rotulo: 'África',
                ordem: 2,
              },
              {
                codigo: 'América Central',
                rotulo: 'América Central',
                ordem: 3,
              },
              {
                codigo: 'América do Norte',
                rotulo: 'América do Norte',
                ordem: 4,
              },
              {
                codigo: 'América do Sul',
                rotulo: 'América do Sul',
                ordem: 5,
              },
              {
                codigo: 'Ásia',
                rotulo: 'Ásia',
                ordem: 6,
              },
              {
                codigo: 'Europa',
                rotulo: 'Europa',
                ordem: 7,
              },
              {
                codigo: 'Oceania',
                rotulo: 'Oceania',
                ordem: 8,
              },
              {
                codigo: 'Multidestino com Europa',
                rotulo: 'Multidestino com Europa',
                ordem: 9,
              },
              {
                codigo: 'Multidestino sem Europa',
                rotulo: 'Multidestino sem Europa',
                ordem: 10,
              },
            ],
            ordem: 4,
          },
          {
            id: 'DICIO_CORRETAGEM',
            nome: 'Selecione o valor do comissionamento',
            descricao: null,
            tipo: 'Opções fixas',
            obrigatorio: true,
            servico: null,
            opcoes: [
              {
                codigo: '15',
                rotulo: '15',
                ordem: 2,
              },
              {
                codigo: '25',
                rotulo: '25',
                ordem: 4,
              },
              {
                codigo: '40',
                rotulo: '40',
                ordem: 7,
              },
              {
                codigo: '20',
                rotulo: '20',
                ordem: 3,
              },
              {
                codigo: '30',
                rotulo: '30',
                ordem: 5,
              },
              {
                codigo: '35',
                rotulo: '35',
                ordem: 6,
              },
              {
                codigo: '10',
                rotulo: '10',
                ordem: 1,
              },
            ],
            ordem: 11,
          },
        ],
        regrasSequencia: [],
      },
    ],
  },
};
