import { ITexts } from './types'

export const TextsConsortiumBuilding = (
  stepValue: string = '50 e 500 mil reais'
): ITexts => ({
  page: 'Consórcio de Imóvel',
  modalFlowExit: {
    title: 'Deseja sair da página?',
    content:
      'As informações serão perdidas e a sua solicitação não será enviada. ',
    button: {
      exit: 'SAIR',
      continue: 'Continuar solicitação',
    },
  },
  formDefault: {
    placeholderInput: 'Digite aqui',
    placeholderSelect: 'Selecione',
    placeholderInputMoney: '0,00',
  },
  buttons: {
    start: 'Inicio',
    next: 'Próximo',
    simulate: 'Simular',
    hire: 'CONTRATAR',
    tryAgain: 'Tentar novamente',
    updateSimulation: 'Atualizar simulação',
    changeData: 'Alterar dados',
    saveChanges: 'Salvar alterações',
  },
  creation: {
    title: 'Simulação',
    stepMax: 2,
    steps: {
      state: {
        actualStep: 1,
        title: 'Em qual estado você reside?',
        select: {
          label: 'Selecione',
        },
      },
      value: {
        title: 'Qual valor você planeja receber ao ser contemplado?',
        description: `Valores disponíveis entre ${stepValue}`,
        inputLabel: '0,00',
      },
      simulationResults: {
        messageLoad:
          'Aguarde, estamos buscando as melhores opções para você....',
        errorMessageLoad:
          'Desculpe, não foi possível carregar as informações. Aguarde alguns instantes e tente novamente.',
        emptyResult:
          'Desculpe, no momento não temos um plano adequado para suas necessidades.',
        drawerTitleChangeDataSimulation: 'Alterar dados da simulação',
        title: 'Escolha um dos planos mensais',
        cards: {
          title: 'CRÉDITO TOTAL',
          buttonOptionGroup: {
            inFormation: 'Grupo em Formação',
            inProgress: 'Grupo em Andamento',
          },
          label: {
            monthlyInstallment: 'PARCELA MENSAL',
            group: 'Grupo',
            numberInstallment: 'Nº DE PARCELAS',
            quota: 'COTA',
          },
          ratesSummary: {
            title: 'Resumo das taxas',
            reserveFund: 'Fundo de reserva',
            administrativeFee: 'Taxa administrativa',
            earlyAdministrationFree: 'Taxa administrativa Antecipada',
            lifeInsurance: 'Seguro de vida',
          },
        },
      },
    },
  },
  hire: {
    title: 'Contratação',
    stepMax: 4,
    steps: {
      informationConfirmation: {
        actualStep: 1,
        title: 'Confirme seus dados',
        subtitle:
          'Precisamos confirmar algumas de suas informações para continuar.',
        containerFirst: {
          title: 'dados pessoais',
          link: 'Alterar no perfil',
          label: {
            name: 'Nome',
            document: 'CPF',
            dateOfBirth: 'Data de Nascimento',
            nationality: 'Nacionalidade',
            civilStatus: 'Estado civil',
            spouseName: 'Nome do(a) cônjuge',
            spouseDocument: 'CPF do(a) cônjuge',
          },
        },
        containerSecond: {
          title: 'Dados para contato',
          link: 'Alterar no perfil',
          label: {
            email: 'E-mail',
            phone: 'Celular',
          },
        },
        containerFourth: {
          title: 'Endereço',
          link: 'Alterar no perfil',
          label: {
            zipCode: 'CEP',
            address: 'Endereço',
          },
          form: {
            descriptionFirst:
              'Por favor, inclua somente CEPs de endereços no Brasil.',
            descriptionSecond: ' Endereços no exterior não são válidos.',
            labels: {
              zipcode: 'CEP',
              address: 'ENDEREÇO',
              number: 'NÚMEROS',
              complement: 'COMPLEMENTO (OPCIONAL)',
              neighborhood: 'BAIRRO',
              state: 'ESTADO',
              city: 'CIDADE',
            },
            placeholder: {
              zipcode: 'Busca por CEP',
            },
          },
        },
        containerThird: {
          title: 'Documentos',
          label: {
            documentType: 'Tipo de documento',
            address: 'Endereço',
            documentNumber: 'Nº do documento',
            dateDispatch: 'Data de expedição',
            expeditedBody: 'órgão expeditor',
            foreignResidence: 'Possui residência fiscal estrangeira?',
            countryResidence: 'País da residência',
            documentNumberNIF: 'Número do documento NIF',
            fatca: 'FATCA',
            passportNumber: 'Número do Passaporte',
            passportType: 'Tipo de passaporte',
            passportIssuingCountry: 'País de emissão do passaporte',
          },
          placeholder: {
            documentNumber: 'Digite aqui',
            dateDispatch: 'Ex: 12/12/2002',
            expeditedBodyRG: 'Ex: XXX/SP',
            expeditedBodyRNE: 'Ex: SSP/SP',
          },
          messageRNE:
            'Registro Nacional de Estrangeiro, documento exigido a clientes estrangeiros que residem no Brasil.',
        },
        containerFifth: {
          title: 'pessoa politicamente exposta',
          text: {
            title:
              'Você é ou possui parentesco com uma pessoa politicamente exposta?',
            content:
              'Pessoa Exposta Politicamente é aquela que desempenha ou desempenhou nos últimos cinco anos anteriores, cargos, empregos ou funções públicas relevantes como chefes de estado e de governo, políticos de alto nível, altos servidores dos poderes públicos, magistrados ou militares de alto nível, dirigentes de empresas públicas ou dirigentes de partidos políticos.',
            label: 'quem é a pessoa politicamente exposta?',
          },
        },
        containerSixth: {
          title: 'Dados financeiros',
          label: {
            profession: 'Profissão',
            grossMonthlyIncome: 'Renda mensal bruta',
          },
        },
      },
      payment: {
        actualStep: 2,
        title: 'Pagamentos',
        drawerTitle: 'Alterar Pagamento',
        subtitleFirst:
          'Por favor, preencha seus dados para débito automático em conta corrente.',
        subtitleSecond:
          'O titular da conta deve ter o mesmo CPF do titular do consórcio.',
        containerFirst: {
          title: 'Dados das Parcelas',
          label: {
            monthlyInstallment: 'Parcela mensal',
            numberInstallment: 'Quantidade de parcelas',
            dateForeseenFirstInstallment: 'Data prevista para a 1ª parcela',
            dateOtherPlots: 'Data das demais parcelas',
          },
        },
        containerSecond: {
          title: 'Pagamento da 1ª parcela',
          subtitle:
            'Informe como deseja pagar a primeira parcela do seu consórcio.',
          checkboxDebit: {
            title: 'Débito automático',
            subtitle: 'Mais praticidade pra você',
          },
          checkboxBillet: {
            title: 'Boleto',
            subtitle: 'via email junto ao contrato',
          },
        },
        containerThird: {
          title: 'Dados de pagamento',
          subtitle: 'Informe a conta da qual será debitado o valor mensal de',
          caption:
            '*Valor da parcela apenas, sem considerar a taxa de administração.',
          messageImportant: {
            title: 'IMPORTANTE:',
            article: {
              textFirst:
                'Enviaremos ao seu banco uma solicitação de débito automático.',
              textSecond:
                'Você precisa liberar o débito junto ao seu banco ou internet banking para que, o valor seja debitado de forma automática.',
            },
          },
          rate: {
            title:
              'Informe como deseja pagar a taxa de administração antecipada:',
            subtitle:
              'Corresponde a 2% do valor total, podendo ser dividida segundo as opções abaixo:',
            label: 'Taxa de administração antecipada',
          },
          label: {
            bank: 'Banco',
            agency: 'Agência',
            currentAccount: 'Conta corrente',
            digit: 'Dígito',
          },
        },
      },
      lifeInsurance: {
        title: 'Seguro de vida',
        actualStep: 3,
        content:
          'Este seguro é contratado para quitação do saldo devedor do plano de consórcio, na hipótese de morte natural, acidental, ou por invalidez permanente total por acidente do consorciado.',
        containerFirst: {
          title: 'Seguro de vida',
          content: {
            textFirst: {
              item: 'A.',
              text: [
                'Tenho conhecimento da possibilidade de contratação de um seguro de vida destinado à quitação do saldo devedor do plano de consórcio na hipótese de morte natural ou acidental e invalidez permanente total por acidente do consorciado, mediante pagamento do prêmio (preço do seguro) cujos valores mensais, corresponderão ao percentual indicado no ',
                'Regulamento Geral para Constituição e Funcionamento de Grupos de Consórcio, ',
                'no capítulo ',
                '"Dos Pagamentos".',
              ],
            },
            textSecond: {
              item: 'B.',
              text:
                'Tomei ciência das condições contratuais do seguro referido e tenho interesse em contratá-lo;',
            },
            textThird: {
              item: 'C',
              text:
                'Para formalizar o meu interesse, assino esta Proposta de Adesão e Termo de Consentimento para Contratação do Seguro de Vida, devidamente preenchida, para ser entregue à Seguradora, ciente de que o seguro será considerado contratado desde que a Seguradora, respeitados os prazos legais, aceite os riscos e emita a respectiva apólice.',
            },
          },
        },
        containerSecond: {
          title: 'Declaro, para todos os fins e efeitos legais que:',
          itens: [
            'Estou em perfeitas condições de saúde e em plena atividade profissional;',
            'Não fui submetido a tratamento médico em regime hospitalar ou intervenções cirúrgicas;',
            'Não sou portador de nenhuma doença crônica ou congênita e não faço uso contínuo de nenhum medicamento;',
            'Nunca recebi indenização de seguro por doença ou acidente e nunca tive proposta de Seguro de Vida, Acidentes Pessoais ou Plano/Seguro Saúde recusado;',
            'Não sou tripulante, profissional ou amador, de qualquer tipo de aeronave;',
            'Não sou praticante de esportes aéreos ou subaquáticos;',
            'Não sou piloto, automobilismo ou motociclismo, de competições ou provas e não pratico nenhum tipo de lutas marciais, boxe ou outras atividades esportivas afim, quer em caráter profissional ou amador;',
            'Tenho ciência e concordo integralmente com os Termos das Condições Gerais ora apresentadas, bem como com as Condições Particulares e Especiais que fazem parte integrante do seguro que estou contratando.',
          ],
          titleTextArea:
            'Entretanto, ressalvo abaixo os eventos preexistentes:',
        },
        containerThird: {
          texts: [
            'Declaro ainda que as informações por mim prestadas, e que fazem parte integrante desta proposta, correspondem com a verdade, estando plenamente ciente e de acordo que perderei direito à indenização decorrente do contrato de seguro e ainda pagarei pelos prêmios vencidos, caso tenha ocorrido omissão de informações, o que põe em risco a aceitação e validade da proposta, valor do capital ou a taxa do prêmio, conforme previsto no artigo 766 do Código Civil Brasileiro.',
            'Autorizo meu(s) médico(s) assistente(s) a prestar(em) em meu nome e de meus beneficiários, todas as informações necessárias a liquidação de eventuais sinistros cobertos por este seguro.',
            'Este seguro é por prazo determinado respeitando o prazo do plano do consórcio.',
          ],
          checkbox:
            'Declaro que li e aceito as Regras e Termos Gerais do Conquista.',
        },
      },
      insuranceLender: {
        title: 'Seguro Prestamista',
        actualStep: 3,
        subtitle:
          'Este seguro é contratado para quitação do saldo devedor do plano de consórcio, na hipótese de morte natural, acidental, ou por invalidez permanente total por acidente do consorciado.',
        containerMain: {
          title: 'Declaração pessoal de saúde',
          texts: [
            {
              text: [
                'Declaro estar em perfeitas condições de saúde e em plena atividade de trabalho.',
                'Não ter sido submetido a tratamento médico em regime hospitalar ou intervenções cirúrgicas, incluido biópsia ou punção, nos últimos 5 anos e não ser portador de nenhuma doença crônica ou congênita.',
                'Não ter apresentado resultados alterados em exames tais como ressonância magnética, radiografia, tomografia, ultrassonografia, endoscopia, exames de sangue ou qualquer outro.',
                'Nunca ter sido submetido a tratamentos de radioterapia ou quimioterapia.',
                'Não praticar esportes aéreos ou subaquáticos como piloto em competições automobilísticas ou motociclística.',
              ],
              placeholder: 'Por favor, especifique sua situação atual',
            },
            {
              text:
                'Encontra-se atualmente em boas condições de saúde e em plena atividade de trabalho? ',
              placeholder: 'Mencione o motivo',
            },
            {
              text:
                'Sofre ou sofreu de alguma doença que tenha te obrigado a consultar médicos para realizar tratamento(s), hospitalizar-se, submeter-se a intervenções clínicas ou cirúrgicas ou, ainda, afastar-se de sua atividade profissional? Se sim, mencione a(s) doença(s) e o ano de sua(s) ocorrência(s) no espaço disponível.',
              placeholder: ['Qual doença?', 'Em que ano isso aconteceu?'],
            },
            {
              text:
                'Tem ou teve alguma das doenças: cardiovasculares (hipertensão arterial, infarto do miocárdio, angina, doença das válvulas cardíacas, insuficiência cardíaca, acidente vascular cerebral / derrame, isquemia cerebral, aneurisma, trombose etc.)? ',
              placeholder: 'Qual medicamento você usa?',
            },
            {
              text:
                'Tem ou teve alguma das doenças: Doenças endócrinas e metabólicas (diabetes / níveis elevados de açúcar no sangue, doenças da tireóide / bócio, dislipidemia / níveis elevados de colesterol ou triglicérides no sangue, gota, distúrbios glandulares etc.)? ',
              placeholder: [
                'Por favor, especifique quais os tipos de doença',
                'Faz uso de medicamento(s) e/ou tratamento?',
              ],
            },
            {
              text:
                'Possui ou possuiu algum tipo de câncer, neoplasia, nódulo ou tumor (maligno ou benigno)? Se sim, mencionar abaixo o órgão acometido e o tipo de tratamento realizado.',
              placeholder: [
                'Por favor, especifique o tipo de câncer',
                'Qual o tipo de tratamento?',
              ],
            },
            {
              text:
                'Já realizou exames que tenham apresentado resultados alterados, tais como ressonância magnética, rx, tomografia, ultrassonografia, endoscopia, exames de sangue ou qualquer outro? Em caso afirmativo, anexar os resultados dos exames.',
              placeholder: 'Por favor, especifique',
            },
            {
              text:
                'Já esteve internado, realizou tratamento ou tomou medicação pelo uso excessivo de álcool? Se sim, mencionar abaixo quando aconteceu, como foi e qual o medicamento aplicado',
              placeholder: 'Por favor, especifique o tratamento',
            },
            {
              text: [
                'Pratica esporte de forma profissional ou semi-profissional (mais de 3 vezes por semana), ou ainda, esportes aéreos, subaquáticos e/ou participa de competições automobilísticas?',
                'Se sim, especificar abaixo o tipo de prática esportiva.',
              ],
              placeholder: [
                'Qua(is) esporte(s)? Amador ou profissional?',
                'Qual a frequencia?',
              ],
            },
            {
              text:
                'É tripulante ou piloto (amador ou profissional) de algum tipo de aeronave? Se sim, especificar abaixo a atividade e o tipo de aeronave.',
              placeholder: 'Por favor, especifique a atividade e a aeronave',
            },
            {
              text:
                'Possui seguro de vida em outra Seguradora? Se sim, especificar abaixo coberturas e capitais segurados.',
              placeholder: [
                'Qual(is) a(s) Seguradora(s)?',
                'Por favor, especifique as coberturas e capitais segurados',
              ],
            },
          ],
        },
      },
      summary: {
        title: 'Resumo do contrato',
        subtitle: 'Revise as informações e os termos do seu contrato.',
        actualStep: 4,
        modalBackSimulation: {
          title: 'Deseja voltar para a simulação?',
          content:
            'As informações do contrato que você já preencheu serão perdidas.',
          button: {
            goback: 'Refazer simulação',
            continue: 'Continuar onde estou',
          },
        },
        containerFirst: {
          title: 'Dados do consórcio',
          label: {
            link: 'Refazer simulação',
            creditValue: 'Valor do crédito',
            reserveFund: 'Fundo de reserva',
            lifeInsurance: 'Seguro de vida',
            administrativeFee: 'Taxa administrativa',
            earlyAdministrationFree: 'Taxa administrativa antecipada',
          },
        },
        containerSecond: {
          title: 'Dados das Parcelas',
          label: {
            monthlyInstallment: 'Parcela mensal',
            numberInstallment: 'Quantidade de parcelas',
            dateForeseenFirstInstallment: 'Data prevista para a 1ª parcela',
            dateOtherPlots: 'Data das demais parcelas',
          },
        },
        containerThird: {
          title: 'Dados de pagamento',
          label: {
            firstInstallmentPaymentMethod: 'Forma de pagamento da 1ª parcela',
            paymentRemainingInstallments:
              'Forma de pagamento das demais parcelas',
            bank: 'Banco',
            agency: 'Agência',
            currentAccount: 'Conta corrente',
            earlyAdministrationFree: 'Taxa de administração antecipada',
          },
        },
      },
      resultHire: {
        content: {
          success: {
            title: 'Solicitação enviada com sucesso!',
            subtitle:
              'Seu contrato já está sendo avaliado. Em breve, enviaremos um e-mail com mais detalhes.',
          },
          fail: {
            title: 'Não foi possível confirmar sua solicitação',
            subtitle: 'Tente novamente mais tarde, por favor.',
          },
        },
        summary: {
          title: 'Resumo',
          label: {
            creditValue: 'Valor do crédito',
            reserveFund: 'Fundo de reserva',
            lifeInsurance: 'Seguro de vida',
            administrativeFee: 'Taxa administrativa',
            earlyAdministrationFree: 'Taxa administrativa antecipada',
            monthlyInstallment: 'Parcela mensal',
            numberInstallment: 'Quantidade de parcelas',
            dateForeseenFirstInstallment: 'Data prevista para a 1ª parcela',
            dateOtherPlots: 'Data das demais parcelas',
            firstInstallmentPaymentMethod: 'Forma de pagamento da 1ª parcela',
            paymentRemainingInstallments:
              'Forma de pagamento das demais parcelas',
            bank: 'Banco',
            agency: 'Agência',
            currentAccount: 'Conta corrente',
          },
        },
      },
    },
  },
})
