import * as functions from 'firebase-functions';
import { QuestionnaireTemplate, QuestionTemplate } from './models';
import * as admin from 'firebase-admin';

export const createMockupData = functions.https
  .onRequest((req, res) => {
    // const users = [
    //   {
    //     userId: '01',
    //     email: 'gmduarte96@gmail.com',
    //     firstName: 'Gabriel',
    //     lastName: 'Duarte'
    //   },
    //   {
    //     userId: '02',
    //     email: 'rick1@teste.com',
    //     firstName: 'Rick',
    //     lastName: 'Lemos'
    //   },
    //   {
    //     userId: '03',
    //     email: 'rick2@teste.com',
    //     firstName: 'Rick',
    //     lastName: 'Lemos'
    //   },
    //   {
    //     userId: '04',
    //     email: 'rick3@teste.com',
    //     firstName: 'Rick',
    //     lastName: 'Lemos'
    //   },
    //   {
    //     userId: '05',
    //     email: 'rick4@teste.com',
    //     firstName: 'Rick',
    //     lastName: 'Lemos'
    //   }
    // ];
    const questions = [
      {
        questionId: '01',
        questionText: 'Quais as principais funções do dinheiro?',
        alternatives: [
          {
            alternativeText: 'Meio de troca',
            isRight: false,
          },
          {
            alternativeText: 'Unidade de valor',
            isRight: false,
          },
          {
            alternativeText: 'Reserva de valor',
            isRight: false,
          },
          {
            alternativeText: 'Todas as anteriores',
            isRight: true,
          }
        ]
      },
      {
        questionId: '02',
        questionText: 'Com base na Inflação, qual taxa de juros básica da economia definida pelo COPOM?',
        alternatives: [
          {
            alternativeText: 'SELIC',
            isRight: true,
          },
          {
            alternativeText: 'CDI',
            isRight: false,
          },
          {
            alternativeText: 'SELIC META',
            isRight: false,
          },
          {
            alternativeText: 'CDB',
            isRight: false,
          }
        ]
      },
      {
        questionId: '03',
        questionText: 'Como é chamado o risco de default ou risco calote do emissor?',
        alternatives: [
          {
            alternativeText: 'Risco subprime',
            isRight: false,
          },
          {
            alternativeText: 'Risco de liquidez',
            isRight: false,
          },
          {
            alternativeText: 'Risco de mercado',
            isRight: false,
          },
          {
            alternativeText: 'Risco de crédito',
            isRight: true,
          }
        ]
      },
      {
        questionId: '04',
        questionText: 'Uma título Tesouro IPCA+ que vence em um ano está precificada de tal forma a render IPCA + 7,5% a.a. ao passo que um título Tesouro Pré com vencimento em um ano está precificada de forma a render 14% a.a. Qual a taxa de inflação, medida pelo IPCA, esperada para o próximo ano?',
        alternatives: [
          {
            alternativeText: '7,50%',
            isRight: false,
          },
          {
            alternativeText: '6,50%',
            isRight: true,
          },
          {
            alternativeText: '6,05%',
            isRight: false,
          },
          {
            alternativeText: 'Impossível determinar',
            isRight: false,
          }
        ]
      },
      {
        questionId: '05',
        questionText: 'Um título tesouro-pré é negociada a R$750 e tem exatamente dois anos até o seu vencimento. Qual o rendimento ao ano deste título?',
        alternatives: [
          {
            alternativeText: '33,3%',
            isRight: false,
          },
          {
            alternativeText: '16,7%',
            isRight: false,
          },
          {
            alternativeText: '15,5%',
            isRight: false,
          },
          {
            alternativeText: 'Não é possível determinar',
            isRight: true,
          }
        ]
      },
      {
        questionId: '06',
        questionText: 'No início do ano, uma ação é negociada a R$8,00. Ao final do ano, a ação é negociada a R$9,00. Logo antes do final do ano, foram pagos dois dividendos, de R$0,50 cada. Qual o rendimento da ação, aproximadamente?',
        alternatives: [
          {
            alternativeText: '12,5%',
            isRight: false,
          },
          {
            alternativeText: '18,8%',
            isRight: false,
          },
          {
            alternativeText: '25%',
            isRight: true,
          },
          {
            alternativeText: 'Não é possível determinar',
            isRight: false,
          }
        ]
      },
      {
        questionId: '07',
        questionText: 'Assinale a alternativa incorreta quanto as características do PGBL:',
        alternatives: [
          {
            alternativeText: 'Permite dedução no imposto de renda na declaração completa',
            isRight: false,
          },
          {
            alternativeText: 'Permite dedução no imposto de renda na declaração simplificada',
            isRight: true,
          },
          {
            alternativeText: 'Não existe a cobrança do come-cotas',
            isRight: false,
          },
          {
            alternativeText: 'Há a possibilidade de portabilidade entre fundos sem a cobrança de imposto de renda',
            isRight: false,
          }
        ]
      },
      {
        questionId: '08',
        questionText: 'Quando uma empresa muda seu planejamento e transforma sua meta estratégica de "Ser a quinta maior empresa do setor" para "Ser a maior empresa do setor" ela está redefinindo:',
        alternatives: [
          {
            alternativeText: 'Sua missão',
            isRight: false,
          },
          {
            alternativeText: 'Seus valores',
            isRight: false,
          },
          {
            alternativeText: 'Sua visão',
            isRight: true,
          },
          {
            alternativeText: 'Nenhuma das anteriores',
            isRight: false,
          }
        ]
      },
      {
        questionId: '09',
        questionText: 'Pela curva de experiência, qual a principal vantagem de ser líder de mercado (maior market share)?',
        alternatives: [
          {
            alternativeText: 'Por que todos os demais competidores terão que te seguir',
            isRight: false,
          },
          {
            alternativeText: 'Pois o cliente será mais fiel ao seu produto',
            isRight: false,
          },
          {
            alternativeText: 'Pois seus custos são menores que os dos concorrentes',
            isRight: false,
          },
          {
            alternativeText: 'Por que o líder consegue influenciar o mercado',
            isRight: true,
          }
        ]
      },
      {
        questionId: '10',
        questionText: 'Qual a resultante mais prejudicial que pode ocorrer quando sua empresa decide ser líder de mercado? ',
        alternatives: [
          {
            alternativeText: 'Os concorrentes aumentarem os preços',
            isRight: false,
          },
          {
            alternativeText: 'Os concorrentes entrarem em guerra de preço\n',
            isRight: false,
          },
          {
            alternativeText: 'O mercado parar de crescer',
            isRight: false,
          },
          {
            alternativeText: 'Os consumidores não entenderem sua estratégia',
            isRight: true,
          }
        ]
      },
      {
        questionId: '11',
        questionText: 'Qual ou quais as afirmações corretas em relação a Matriz BCG',
        alternatives: [
          {
            alternativeText: 'Cash cows: geram caixa para financiarem os outros quadrantes',
            isRight: false,
          },
          {
            alternativeText: 'Stars: com mercado crescendo continuamente, se perderem market share viram Dogs',
            isRight: false,
          },
          {
            alternativeText: 'Question marks: são geradores de caixa',
            isRight: false,
          },
          {
            alternativeText: 'Dogs: se tornam question mark com investimento adicional',
            isRight: true,
          }
        ]
      },
      {
        questionId: '12',
        questionText: 'Segundo as 5 Forças de Porter, quando as grandes produtoras de música incentivam a criação de alternativas aos consumidores finais (ex.:Spotify) consumirem músicas digitais por outros canais que não sejam somente via Apple (iTunes), elas estão:',
        alternatives: [
          {
            alternativeText: 'Diminuindo as barreiras de entrada para novas gravadoras',
            isRight: false,
          },
          {
            alternativeText: 'Diminuindo as barreiras de saída das gravadoras atuais',
            isRight: false,
          },
          {
            alternativeText: 'Diminuindo o poder de barganha da Apple',
            isRight: true,
          }
        ]
      },
      {
        questionId: '13',
        questionText: 'Quando a Luxottica, fabricantes de óculos, inicia a criação e aquisição de marcas de varejo que vendem óculos para o consumidor final (ex. Sunglass Hut e LensCrafters), ela está:',
        alternatives: [
          {
            alternativeText: 'Verticalizando o setor para trás',
            isRight: false,
          },
          {
            alternativeText: 'Expandindo seu portfólio de produtos',
            isRight: false,
          },
          {
            alternativeText: 'Verticalizando o setor para frente',
            isRight: false,
          },
          {
            alternativeText: 'Diminuindo sua dependência dos fornecedores atuais, dado o aumento da escala',
            isRight: false,
          },
          {
            alternativeText: 'Diminuindo o poder de barganho do consumidor final',
            isRight: true,
          }
        ]
      },
      {
        questionId: '14',
        questionText: 'Nos anos 90, a Essilor estabeleceu uma parceria estratégica com a PPG (especialista em fornecer diversos materiais para indústria, como vidro) para criar a Transitions Optical, empresa que consolidaria a experiência de uma empresa em fabricação de lentes de contato e a outra com expertise em matéria prima para criar lentes fotocromáticas. A Transitions Optical pode ser considerada:',
        alternatives: [
          {
            alternativeText: 'Uma fusão entre parceiros estratégicos',
            isRight: false,
          },
          {
            alternativeText: 'Uma parceria entre fornecedor e cliente, verticalizando o setor',
            isRight: false,
          },
          {
            alternativeText: 'Uma Joint-Venture',
            isRight: false,
          },
          {
            alternativeText: 'Uma aquisição da PPG pela Essilor',
            isRight: false,
          }
        ]
      },
      {
        questionId: '15',
        questionText: 'Em 2016 a Essilor comprou a MyOptique, que é um dos maiores e-commerce de venda de óculos da Europa. Segundo a teoria de Long Tail, quais os benefícios que essa operação poderá trazer: ',
        alternatives: [
          {
            alternativeText: 'Captura das margens deixadas com os distribuidores',
            isRight: true,
          },
          {
            alternativeText: 'Aumentar a possibilidade de expansão do portfólio da Essilor',
            isRight: false,
          },
          {
            alternativeText: 'Aumento significativo do ROIC da operação',
            isRight: false,
          },
          {
            alternativeText: 'Flexibilidade na estratégia de pricing da Essilor',
            isRight: false,
          }
        ]
      },
      {
        questionId: '16',
        questionText: 'Quais os benefícios esperados de uma fusão entre Luxxotica e Essilor',
        alternatives: [
          {
            alternativeText: 'Economia de escala',
            isRight: true,
          },
          {
            alternativeText: 'Valorização das marcas',
            isRight: false,
          },
          {
            alternativeText: 'Economia de escopo',
            isRight: true,
          },
          {
            alternativeText: 'Nenhuma das anteriores',
            isRight: false,
          }
        ]
      },
      {
        questionId: '17',
        questionText: 'Uma empresa de grande crescimento no setor é a americana Warby Parker, fundada em 2010. Qual seria uma estratégia que a WP poderia executar para fazer frente no futuro contra a Luxottica-Essilor?',
        alternatives: [
          {
            alternativeText: 'Curva de experiência',
            isRight: false,
          },
          {
            alternativeText: 'Inovação disruptiva',
            isRight: false,
          },
          {
            alternativeText: 'Liderança em diferenciação',
            isRight: false,
          },
          {
            alternativeText: 'Estratégia adaptativa',
            isRight: true,
          }
        ]
      }
    ];
    const questionnaireTemplates: QuestionnaireTemplate[] = [
      {
        questionnaireId: '01',
        questionnaireName: 'Análise de Investimentos',
        questions: ['01', '02', '03', '04', '05', '06', '07']
      },
      {
        questionnaireId: '02',
        questionnaireName: 'Estratégia Empresarial - 1',
        questions: ['08', '09', '10', '11', '12']
      },
      {
        questionnaireId: '03',
        questionnaireName: 'Estratégia Empresarial - 2',
        questions: ['13', '14', '15', '16', '17']
      }
    ];
    const courseId = '01';
    // Criar usuários de teste
    // users.forEach(user => {
    //   admin.firestore().doc(`/userData/${ user.userId }`)
    //     .create(user)
    //     .then(() => res.status(200).send('createUser Succesfully'))
    //     .catch(err => res.status(500).send(err));
    // });

    // Criar template do questionário
    questionnaireTemplates.forEach((questionnaire: QuestionnaireTemplate) => {
      admin.firestore().doc(`/questionnaireTemplate/${ questionnaire.questionnaireId }`)
        .create(questionnaire)
        .then(() => res.status(200).send('createQuestionnaire Succesfully'))
        .catch(err => res.status(500).send(err));
    });
    // Criar template de questões
    questions.forEach((question: QuestionTemplate) => {
      admin.firestore().doc(`/questionTemplate/${ question.questionId }`)
        .create(question)
        .then(() => res.status(200).send('createQuestionSuccesfully'))
        .catch(err => res.status(500).send(err));
    });

    // Criar template do Business Program
    admin.firestore().doc(`/courseTemplate/${ courseId }`)
      .create({
        courseId: '01',
        courseName: 'General Business Program',
        modules: ['01', '02'],
        courseLink: 'https://www.btcompany.com.br/gbp',
        courseDescription: 'Trabalhando temas como Soft Skills, Finanças Corporativas & Valuation, Estratégia Empresarial, Marketing, Business Modeling e Problem Solving, os alunos do GBP ficam mais preparados para alavancar seus resultados nas carreiras mais buscadas, entendendo o negócio de forma generalista e analítica e fortalecendo o processo de tomada de decisão.'
      })
      .then(() => res.send('createClassroom Succesfully'))
      .catch(err => console.log(err));

    // Criar templates dos módulos
    admin.firestore().doc(`/moduleTemplate/01`)
      .create({
        moduleId: '01',
        moduleName: 'Análise de Investimentos',
        lessons: [
          {
            lessonType: 'TEXT',
            complete: false,
            lessonId: '01',
            lessonName: 'Introdução'
          },
          {
            lessonType: 'QUESTIONNAIRE',
            complete: false,
            questionnaireId: '01',
            lessonName: 'Quiz'
          }
        ]
      })
      .then(() => res.send('createdModule Succesfully'))
      .catch(err => console.log(err));
    admin.firestore().doc(`/moduleTemplate/02`)
      .create({
        moduleId: '02',
        moduleName: 'Estratégia Empresarial',
        lessons: [
          {
            lessonType: 'LESSON',
            complete: false,
            lessonId: '03',
            lessonName: 'Introdução'
          },
          {
            lessonType: 'QUESTIONNAIRE',
            complete: false,
            questionnaireId: '02',
            lessonName: 'Estratégia Empresarial - 1'
          },
          {
            lessonType: 'QUESTIONNAIRE',
            complete: false,
            questionnaireId: '03',
            lessonName: 'Estratégia Empresarial - 2'
          }
        ]
      })
      .then(() => res.send('createdModule Succesfully'))
      .catch(err => console.log(err));
  });

export const createClassroom = functions.https
  .onRequest((req, res) => {
    const classroomId = '02';
    admin.firestore().doc(`/classrooms/${ classroomId }`)
      .create({
        courseId: '01',
        classroomId,
        courseName: 'General Business Program',
        courseDescription: 'Trabalhando temas como Soft Skills, Finanças Corporativas & Valuation, Estratégia Empresarial, Marketing, Business Modeling e Problem Solving, os alunos do GBP ficam mais preparados para alavancar seus resultados nas carreiras mais buscadas, entendendo o negócio de forma generalista e analítica e fortalecendo o processo de tomada de decisão.',
        courseLink: 'https://www.btcompany.com.br/gbp',
        classroomName: 'Turma 1',
        institutionName: 'BTC',
        modules: ['01', '02'],
        students: ['teste4@teste.com', 'rick1@teste.com', 'rick2@teste.com', 'rick3@teste.com', 'rick4@teste.com', 'teste5@teste.com'],
      })
      .then(() => res.send('createClassroom Succesfully'))
      .catch(err => console.log(err));
  });
