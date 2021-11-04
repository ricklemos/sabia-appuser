import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as https from 'https';
import { StockDay } from './models';

// Função HTTPS que cria as ações mais importantes no banco de dados
export const createStocks = functions // .region('southamerica-east1')
  .https
  .onRequest((req, res) => {
    const stocks = [
      {
        ticker: 'PETR4',
        category: 'SHARES',
        tradingStartDate: '17/08/2021',
        tradingEndDate: '31/12/9999',
        name: 'PETROLEO BRASILEIRO S.A. PETROBRAS'
      },
      {
        ticker: 'ABEV3',
        category: 'SHARES',
        tradingStartDate: '14/01/2021',
        tradingEndDate: '31/12/9999',
        name: 'AMBEV S.A.'
      },
      {
        ticker: 'MGLU3',
        category: 'SHARES',
        tradingStartDate: '06/07/2021',
        tradingEndDate: '31/12/9999',
        name: 'MAGAZINE LUIZA S.A.'
      },
      {
        ticker: 'COGN3',
        category: 'SHARES',
        tradingStartDate: '26/04/2021',
        tradingEndDate: '31/12/9999',
        name: 'COGNA EDUCA��O S.A.'
      },
      {
        ticker: 'VIIA3',
        category: 'SHARES',
        tradingStartDate: '16/08/2021',
        tradingEndDate: '31/12/9999',
        name: 'VIA S.A'
      },
      {
        ticker: 'ITUB4',
        category: 'SHARES',
        tradingStartDate: '04/10/2021',
        tradingEndDate: '31/12/9999',
        name: 'ITAU UNIBANCO HOLDING S.A.'
      },
      {
        ticker: 'CASH3',
        category: 'SHARES',
        tradingStartDate: '10/09/2021',
        tradingEndDate: '31/12/9999',
        name: 'M�LIUZ S.A.'
      },
      {
        ticker: 'USIM5',
        category: 'SHARES',
        tradingStartDate: '01/09/2021',
        tradingEndDate: '31/12/9999',
        name: 'USINAS SID DE MINAS GERAIS S.A.-USIMINAS'
      },
      {
        ticker: 'BRML3',
        category: 'SHARES',
        tradingStartDate: '18/10/2021',
        tradingEndDate: '31/12/9999',
        name: 'BR MALLS PARTICIPACOES S.A.'
      },
      {
        ticker: 'PETR3',
        category: 'SHARES',
        tradingStartDate: '17/08/2021',
        tradingEndDate: '31/12/9999',
        name: 'PETROLEO BRASILEIRO S.A. PETROBRAS'
      },
      {
        ticker: 'ITSA4',
        category: 'SHARES',
        tradingStartDate: '01/09/2021',
        tradingEndDate: '31/12/9999',
        name: 'ITAUSA S.A.'
      },
      {
        ticker: 'VALE3',
        category: 'SHARES',
        tradingStartDate: '23/09/2021',
        tradingEndDate: '31/12/9999',
        name: 'VALE S.A.'
      },
      {
        ticker: 'CIEL3',
        category: 'SHARES',
        tradingStartDate: '06/08/2021',
        tradingEndDate: '31/12/9999',
        name: 'CIELO S.A.'
      },
      {
        ticker: 'BBDC4',
        category: 'SHARES',
        tradingStartDate: '04/10/2021',
        tradingEndDate: '31/12/9999',
        name: 'BCO BRADESCO S.A.'
      },
      {
        ticker: 'B3SA3',
        category: 'SHARES',
        tradingStartDate: '29/09/2021',
        tradingEndDate: '31/12/9999',
        name: 'B3 S.A. - BRASIL, BOLSA, BALC�O'
      },
      {
        ticker: 'CCRO3',
        category: 'SHARES',
        tradingStartDate: '09/04/2021',
        tradingEndDate: '31/12/9999',
        name: 'CCR S.A.'
      },
      {
        ticker: 'PRIO3',
        category: 'SHARES',
        tradingStartDate: '06/05/2021',
        tradingEndDate: '31/12/9999',
        name: 'PETRO RIO S.A.'
      },
      {
        ticker: 'STBP3',
        category: 'SHARES',
        tradingStartDate: '05/05/2020',
        tradingEndDate: '31/12/9999',
        name: 'SANTOS BRASIL PARTICIPACOES S.A.'
      },
      {
        ticker: 'LAME4',
        category: 'SHARES',
        tradingStartDate: '19/07/2021',
        tradingEndDate: '31/12/9999',
        name: 'LOJAS AMERICANAS S.A.'
      },
      {
        ticker: 'HAPV3',
        category: 'SHARES',
        tradingStartDate: '28/09/2021',
        tradingEndDate: '31/12/9999',
        name: 'HAPVIDA PARTICIPACOES E INVESTIMENTOS SA'
      },
      {
        ticker: 'CPLE6',
        category: 'SHARES',
        tradingStartDate: '01/10/2021',
        tradingEndDate: '31/12/9999',
        name: 'CIA PARANAENSE DE ENERGIA - COPEL'
      },
      {
        ticker: 'SUZB3',
        category: 'SHARES',
        tradingStartDate: '06/01/2021',
        tradingEndDate: '31/12/9999',
        name: 'SUZANO S.A.'
      },
      {
        ticker: 'IRBR3',
        category: 'SHARES',
        tradingStartDate: '17/08/2020',
        tradingEndDate: '31/12/9999',
        name: 'IRB - BRASIL RESSEGUROS S.A.'
      },
      {
        ticker: 'BEEF3',
        category: 'SHARES',
        tradingStartDate: '13/04/2021',
        tradingEndDate: '31/12/9999',
        name: 'MINERVA S.A.'
      },
      {
        ticker: 'RAIL3',
        category: 'SHARES',
        tradingStartDate: '23/12/2019',
        tradingEndDate: '31/12/9999',
        name: 'RUMO S.A.'
      },
      {
        ticker: 'EQTL3',
        category: 'SHARES',
        tradingStartDate: '03/05/2021',
        tradingEndDate: '31/12/9999',
        name: 'EQUATORIAL ENERGIA S.A.'
      },
      {
        ticker: 'CSNA3',
        category: 'SHARES',
        tradingStartDate: '02/08/2021',
        tradingEndDate: '31/12/9999',
        name: 'CIA SIDERURGICA NACIONAL'
      },
      {
        ticker: 'BRFS3',
        category: 'SHARES',
        tradingStartDate: '07/06/2021',
        tradingEndDate: '31/12/9999',
        name: 'BRF S.A.'
      },
      {
        ticker: 'BPAC11',
        category: 'SHARES',
        tradingStartDate: '11/06/2014',
        tradingEndDate: '31/12/9999',
        name: 'BOMBRIL S.A.'
      },
      {
        ticker: 'ASAI3',
        category: 'SHARES',
        tradingStartDate: '06/10/2021',
        tradingEndDate: '31/12/9999',
        name: 'SENDAS DISTRIBUIDORA S.A.'
      },
      {
        ticker: 'JBSS3',
        category: 'SHARES',
        tradingStartDate: '17/08/2021',
        tradingEndDate: '31/12/9999',
        name: 'JBS S.A.'
      },
      {
        ticker: 'MULT3',
        category: 'SHARES',
        tradingStartDate: '29/12/2020',
        tradingEndDate: '31/12/9999',
        name: 'MULTIPLAN - EMPREEND IMOBILIARIOS S.A.'
      },
      {
        ticker: 'GFSA3',
        category: 'SHARES',
        tradingStartDate: '23/07/2021',
        tradingEndDate: '31/12/9999',
        name: 'GAFISA S.A.'
      },
      {
        ticker: 'BIDI11',
        category: 'SHARES',
        tradingStartDate: '19/08/2021',
        tradingEndDate: '31/12/9999',
        name: 'BCO ESTADO DE SERGIPE S.A. - BANESE'
      },
      {
        ticker: 'VBBR3',
        category: 'SHARES',
        tradingStartDate: '22/10/2021',
        tradingEndDate: '31/12/9999',
        name: 'VIBRA ENERGIA S.A.'
      },
      {
        ticker: 'ECOR3',
        category: 'SHARES',
        tradingStartDate: '06/11/2018',
        tradingEndDate: '31/12/9999',
        name: 'ECORODOVIAS INFRAESTRUTURA E LOG�STICA S.A.'
      },
      {
        ticker: 'BBAS3',
        category: 'SHARES',
        tradingStartDate: '14/09/2021',
        tradingEndDate: '31/12/9999',
        name: 'BCO BRASIL S.A.'
      },
      {
        ticker: 'VIVR3',
        category: 'SHARES',
        tradingStartDate: '17/09/2021',
        tradingEndDate: '31/12/9999',
        name: 'VIVER INCORPORADORA E CONSTRUTORA S.A.'
      },
      {
        ticker: 'ELET3',
        category: 'SHARES',
        tradingStartDate: '28/04/2021',
        tradingEndDate: '31/12/9999',
        name: 'CENTRAIS ELET BRAS S.A. - ELETROBRAS'
      },
      {
        ticker: 'MRFG3',
        category: 'SHARES',
        tradingStartDate: '13/09/2021',
        tradingEndDate: '31/12/9999',
        name: 'MARFRIG GLOBAL FOODS S.A.'
      },
      {
        ticker: 'BOVA11',
        category: 'SHARES',
        tradingStartDate: '11/06/2014',
        tradingEndDate: '31/12/9999',
        name: 'BOMBRIL S.A.'
      },
      {
        ticker: 'GOAU4',
        category: 'SHARES',
        tradingStartDate: '28/09/2021',
        tradingEndDate: '31/12/9999',
        name: 'METALURGICA GERDAU S.A.'
      },
      {
        ticker: 'CMIG4',
        category: 'SHARES',
        tradingStartDate: '03/05/2021',
        tradingEndDate: '31/12/9999',
        name: 'CIA ENERGETICA DE MINAS GERAIS - CEMIG'
      },
      {
        ticker: 'GGBR4',
        category: 'SHARES',
        tradingStartDate: '28/09/2021',
        tradingEndDate: '31/12/9999',
        name: 'GERDAU S.A.'
      },
      {
        ticker: 'LREN3',
        category: 'SHARES',
        tradingStartDate: '22/09/2021',
        tradingEndDate: '31/12/9999',
        name: 'LOJAS RENNER S.A.'
      },
      {
        ticker: 'CMIN3',
        category: 'SHARES',
        tradingStartDate: '02/08/2021',
        tradingEndDate: '31/12/9999',
        name: 'CSN MINERA��O S.A.'
      },
      {
        ticker: 'BIDI4',
        category: 'SHARES',
        tradingStartDate: '23/07/2021',
        tradingEndDate: '31/12/9999',
        name: 'BANCO INTER S.A.'
      },
      {
        ticker: 'RADL3',
        category: 'SHARES',
        tradingStartDate: '24/06/2021',
        tradingEndDate: '31/12/9999',
        name: 'RAIA DROGASIL S.A.'
      },
      {
        ticker: 'SOMA3',
        category: 'SHARES',
        tradingStartDate: '31/07/2020',
        tradingEndDate: '31/12/9999',
        name: 'GRUPO DE MODA SOMA S.A.'
      },
      {
        ticker: 'RENT3',
        category: 'SHARES',
        tradingStartDate: '30/09/2021',
        tradingEndDate: '31/12/9999',
        name: 'LOCALIZA RENT A CAR S.A.'
      },
      {
        ticker: 'ENEV3',
        category: 'SHARES',
        tradingStartDate: '12/03/2021',
        tradingEndDate: '31/12/9999',
        name: 'ENEVA S.A'
      },
      {
        ticker: 'SAPR4',
        category: 'SHARES',
        tradingStartDate: '01/07/2021',
        tradingEndDate: '31/12/9999',
        name: 'CIA SANEAMENTO DO PARANA - SANEPAR'
      },
      {
        ticker: 'AZUL4',
        category: 'SHARES',
        tradingStartDate: '18/10/2021',
        tradingEndDate: '31/12/9999',
        name: 'AZUL S.A.'
      },
      {
        ticker: 'VAMO3',
        category: 'SHARES',
        tradingStartDate: '16/08/2021',
        tradingEndDate: '31/12/9999',
        name: 'VAMOS LOCA��O DE CAMINH�ES, M�QUINAS E EQUIP. S.A.'
      },
      {
        ticker: 'NTCO3',
        category: 'SHARES',
        tradingStartDate: '13/05/2020',
        tradingEndDate: '31/12/9999',
        name: 'NATURA &CO HOLDING S.A.'
      },
      {
        ticker: 'TCN3',
        category: 'SHARES',
        tradingStartDate: '26/10/2021',
        tradingEndDate: '31/12/9999',
        name: 'TAXA DE FINANCIAMENTO'
      },
      {
        ticker: 'EMBR3',
        category: 'SHARES',
        tradingStartDate: '18/03/2021',
        tradingEndDate: '31/12/9999',
        name: 'EMBRAER S.A.'
      },
      {
        ticker: 'ALPA4',
        category: 'SHARES',
        tradingStartDate: '17/02/2020',
        tradingEndDate: '31/12/9999',
        name: 'ALPARGATAS S.A.'
      },
      {
        ticker: 'KLBN11',
        category: 'SHARES',
        tradingStartDate: '24/05/2021',
        tradingEndDate: '31/12/9999',
        name: 'KALLAS INCORPORACOES E CONSTRUCOES S.A.'
      },
      {
        ticker: 'CYRE3',
        category: 'SHARES',
        tradingStartDate: '26/04/2021',
        tradingEndDate: '31/12/9999',
        name: 'CYRELA BRAZIL REALTY S.A.EMPREEND E PART'
      },
      {
        ticker: 'CVCB3',
        category: 'SHARES',
        tradingStartDate: '25/06/2021',
        tradingEndDate: '31/12/9999',
        name: 'CVC BRASIL OPERADORA E AG�NCIA DE VIAGENS S.A.'
      },
      {
        ticker: 'SIMH3',
        category: 'SHARES',
        tradingStartDate: '11/08/2021',
        tradingEndDate: '31/12/9999',
        name: 'SIMPAR S.A.'
      },
      {
        ticker: 'CSAN3',
        category: 'SHARES',
        tradingStartDate: '06/05/2021',
        tradingEndDate: '31/12/9999',
        name: 'COSAN S.A.'
      },
      {
        ticker: 'JHSF3',
        category: 'SHARES',
        tradingStartDate: '15/10/2021',
        tradingEndDate: '31/12/9999',
        name: 'JHSF PARTICIPACOES S.A.'
      },
      {
        ticker: 'FLRY3',
        category: 'SHARES',
        tradingStartDate: '04/08/2021',
        tradingEndDate: '31/12/9999',
        name: 'FLEURY S.A.'
      },
      {
        ticker: 'AMAR3',
        category: 'SHARES',
        tradingStartDate: '26/08/2015',
        tradingEndDate: '31/12/9999',
        name: 'MARISA LOJAS S.A.'
      },
      {
        ticker: 'BBSE3',
        category: 'SHARES',
        tradingStartDate: '12/08/2021',
        tradingEndDate: '31/12/9999',
        name: 'BB SEGURIDADE PARTICIPA��ES S.A.'
      },
      {
        ticker: 'WEGE3',
        category: 'SHARES',
        tradingStartDate: '27/09/2021',
        tradingEndDate: '31/12/9999',
        name: 'WEG S.A.'
      },
      {
        ticker: 'TIMS3',
        category: 'SHARES',
        tradingStartDate: '30/09/2021',
        tradingEndDate: '31/12/9999',
        name: 'TIM S.A.'
      },
      {
        ticker: 'LWSA3',
        category: 'SHARES',
        tradingStartDate: '01/02/2021',
        tradingEndDate: '31/12/9999',
        name: 'LOCAWEB SERVI�OS DE INTERNET S.A.'
      },
      {
        ticker: 'PETZ3',
        category: 'SHARES',
        tradingStartDate: '01/07/2021',
        tradingEndDate: '31/12/9999',
        name: 'PET CENTER COMERCIO  E PARTICIPACOES S.A.'
      },
      {
        ticker: 'BPAN4',
        category: 'SHARES',
        tradingStartDate: '05/05/2021',
        tradingEndDate: '31/12/9999',
        name: 'BCO PAN S.A.'
      },
      {
        ticker: 'SULA11',
        category: 'SHARES',
        tradingStartDate: '26/04/2021',
        tradingEndDate: '31/12/9999',
        name: 'STARA S.A. - IND�STRIA DE IMPLEMENTOS AGR�COLAS'
      },
      {
        ticker: 'POMO4',
        category: 'SHARES',
        tradingStartDate: '06/07/2021',
        tradingEndDate: '31/12/9999',
        name: 'MARCOPOLO S.A.'
      },
      {
        ticker: 'AMER3',
        category: 'SHARES',
        tradingStartDate: '19/07/2021',
        tradingEndDate: '31/12/9999',
        name: 'AMERICANAS S.A'
      },
      {
        ticker: 'UGPA3',
        category: 'SHARES',
        tradingStartDate: '01/10/2021',
        tradingEndDate: '31/12/9999',
        name: 'ULTRAPAR PARTICIPACOES S.A.'
      },
      {
        ticker: 'TRAD3',
        category: 'SHARES',
        tradingStartDate: '28/07/2021',
        tradingEndDate: '31/12/9999',
        name: 'TC TRADERS CLUB S.A.'
      },
      {
        ticker: 'LUPA3',
        category: 'SHARES',
        tradingStartDate: '09/03/2021',
        tradingEndDate: '31/12/9999',
        name: 'LUPATECH S.A.'
      },
      {
        ticker: 'ELET6',
        category: 'SHARES',
        tradingStartDate: '28/04/2021',
        tradingEndDate: '31/12/9999',
        name: 'CENTRAIS ELET BRAS S.A. - ELETROBRAS'
      },
      {
        ticker: 'BBDC3',
        category: 'SHARES',
        tradingStartDate: '04/10/2021',
        tradingEndDate: '31/12/9999',
        name: 'BCO BRADESCO S.A.'
      },
      {
        ticker: 'CPFE3',
        category: 'SHARES',
        tradingStartDate: '01/09/2021',
        tradingEndDate: '31/12/9999',
        name: 'CPFL ENERGIA S.A.'
      },
      {
        ticker: 'MRVE3',
        category: 'SHARES',
        tradingStartDate: '30/04/2021',
        tradingEndDate: '31/12/9999',
        name: 'MRV ENGENHARIA E PARTICIPACOES S.A.'
      },
      {
        ticker: 'DXCO3',
        category: 'SHARES',
        tradingStartDate: '19/08/2021',
        tradingEndDate: '31/12/9999',
        name: 'DEXCO S.A.'
      },
      {
        ticker: 'BOVV11',
        category: 'SHARES',
        tradingStartDate: '11/06/2014',
        tradingEndDate: '31/12/9999',
        name: 'BOMBRIL S.A.'
      },
      {
        ticker: 'GOLL4',
        category: 'SHARES',
        tradingStartDate: '05/05/2021',
        tradingEndDate: '31/12/9999',
        name: 'GOL LINHAS AEREAS INTELIGENTES S.A.'
      },
      {
        ticker: 'ANIM3',
        category: 'SHARES',
        tradingStartDate: '19/02/2021',
        tradingEndDate: '31/12/9999',
        name: 'ANIMA HOLDING S.A.'
      },
      {
        ticker: 'CRFB3',
        category: 'SHARES',
        tradingStartDate: '21/06/2021',
        tradingEndDate: '31/12/9999',
        name: 'ATACAD�O S.A.'
      },
      {
        ticker: 'RANI3',
        category: 'SHARES',
        tradingStartDate: '11/08/2021',
        tradingEndDate: '31/12/9999',
        name: 'IRANI PAPEL E EMBALAGEM S.A.'
      },
      {
        ticker: 'LAME3',
        category: 'SHARES',
        tradingStartDate: '19/07/2021',
        tradingEndDate: '31/12/9999',
        name: 'LOJAS AMERICANAS S.A.'
      },
      {
        ticker: 'GMAT3',
        category: 'SHARES',
        tradingStartDate: '13/10/2020',
        tradingEndDate: '31/12/9999',
        name: 'GRUPO MATEUS S.A.'
      },
      {
        ticker: 'GNDI3',
        category: 'SHARES',
        tradingStartDate: '14/05/2021',
        tradingEndDate: '31/12/9999',
        name: 'NOTRE DAME INTERMEDICA PARTICIPACOES SA'
      },
      {
        ticker: 'HBSA3',
        category: 'SHARES',
        tradingStartDate: '25/09/2020',
        tradingEndDate: '31/12/9999',
        name: 'HIDROVIAS DO BRASIL S.A.'
      },
      {
        ticker: 'ENBR3',
        category: 'SHARES',
        tradingStartDate: '12/04/2021',
        tradingEndDate: '31/12/9999',
        name: 'EDP - ENERGIAS DO BRASIL S.A.'
      },
      {
        ticker: 'POSI3',
        category: 'SHARES',
        tradingStartDate: '03/05/2021',
        tradingEndDate: '31/12/9999',
        name: 'POSITIVO TECNOLOGIA S.A.'
      },
      {
        ticker: 'RAIZ4',
        category: 'SHARES',
        tradingStartDate: '06/10/2021',
        tradingEndDate: '31/12/9999',
        name: 'RAIZEN S.A.'
      },
      {
        ticker: 'CXSE3',
        category: 'SHARES',
        tradingStartDate: '29/04/2021',
        tradingEndDate: '31/12/9999',
        name: 'CAIXA SEGURIDADE PARTICIPA��ES S.A.'
      },
      {
        ticker: 'LIGT3',
        category: 'SHARES',
        tradingStartDate: '28/06/2021',
        tradingEndDate: '31/12/9999',
        name: 'LIGHT S.A.'
      },
      {
        ticker: 'HYPE3',
        category: 'SHARES',
        tradingStartDate: '28/09/2021',
        tradingEndDate: '31/12/9999',
        name: 'HYPERA S.A.'
      },
      {
        ticker: 'BOAS3',
        category: 'SHARES',
        tradingStartDate: '27/04/2021',
        tradingEndDate: '31/12/9999',
        name: 'BOA VISTA SERVI�OS S.A.'
      },
      {
        ticker: 'BRAP4',
        category: 'SHARES',
        tradingStartDate: '21/09/2021',
        tradingEndDate: '31/12/9999',
        name: 'BRADESPAR S.A.'
      },
      {
        ticker: 'TOTS3',
        category: 'SHARES',
        tradingStartDate: '05/08/2021',
        tradingEndDate: '31/12/9999',
        name: 'TOTVS S.A.'
      },
      {
        ticker: 'MEAL3',
        category: 'SHARES',
        tradingStartDate: '30/04/2019',
        tradingEndDate: '31/12/9999',
        name: 'INTERNATIONAL MEAL COMPANY ALIMENTACAO S.A.'
      },
      {
        ticker: 'GRND3',
        category: 'SHARES',
        tradingStartDate: '06/08/2021',
        tradingEndDate: '31/12/9999',
        name: 'GRENDENE S.A.'
      },
      {
        ticker: 'LJQQ3',
        category: 'SHARES',
        tradingStartDate: '29/04/2021',
        tradingEndDate: '31/12/9999',
        name: 'LOJAS QUERO-QUERO S/A'
      },
      {
        ticker: 'MOVI3',
        category: 'SHARES',
        tradingStartDate: '30/09/2021',
        tradingEndDate: '31/12/9999',
        name: 'MOVIDA PARTICIPACOES SA'
      },
      {
        ticker: 'TPIS3',
        category: 'SHARES',
        tradingStartDate: '03/05/2021',
        tradingEndDate: '31/12/9999',
        name: 'TPI - TRIUNFO PARTICIP. E INVEST. S.A.'
      },
      {
        ticker: 'RRRP3',
        category: 'SHARES',
        tradingStartDate: '12/11/2020',
        tradingEndDate: '31/12/9999',
        name: '3R PETROLEUM �LEO E G�S S.A'
      },
      {
        ticker: 'RAPT4',
        category: 'SHARES',
        tradingStartDate: '26/07/2021',
        tradingEndDate: '31/12/9999',
        name: 'RANDON S.A. IMPLEMENTOS E PARTICIPACOES'
      },
      {
        ticker: 'BRSR6',
        category: 'SHARES',
        tradingStartDate: '06/09/2021',
        tradingEndDate: '31/12/9999',
        name: 'BCO ESTADO DO RIO GRANDE DO SUL S.A.'
      },
      {
        ticker: 'RDOR3',
        category: 'SHARES',
        tradingStartDate: '10/09/2021',
        tradingEndDate: '31/12/9999',
        name: 'Rede DOr S�o Luiz S.A.'
      },
      {
        ticker: 'GETT11',
        category: 'SHARES',
        tradingStartDate: '03/05/2021',
        tradingEndDate: '31/12/9999',
        name: 'RIO PARANAPANEMA ENERGIA S.A.'
      },
      {
        ticker: 'TRPL4',
        category: 'SHARES',
        tradingStartDate: '07/07/2021',
        tradingEndDate: '31/12/9999',
        name: 'CTEEP - CIA TRANSMISS�O ENERGIA EL�TRICA PAULISTA'
      },
      {
        ticker: 'ENGI11',
        category: 'SHARES',
        tradingStartDate: '12/03/2021',
        tradingEndDate: '31/12/9999',
        name: 'ENEVA S.A'
      },
      {
        ticker: 'CESP6',
        category: 'SHARES',
        tradingStartDate: '05/04/2021',
        tradingEndDate: '31/12/9999',
        name: 'CESP - CIA ENERGETICA DE SAO PAULO'
      },
      {
        ticker: 'EZTC3',
        category: 'SHARES',
        tradingStartDate: '30/04/2021',
        tradingEndDate: '31/12/9999',
        name: 'EZ TEC EMPREEND. E PARTICIPACOES S.A.'
      },
      {
        ticker: 'INTB3',
        category: 'SHARES',
        tradingStartDate: '04/08/2021',
        tradingEndDate: '31/12/9999',
        name: 'INTELBRAS S.A. IND DE TELEC ELETRONICA BRASILEIRA'
      },
      {
        ticker: 'PCAR3',
        category: 'SHARES',
        tradingStartDate: '06/05/2021',
        tradingEndDate: '31/12/9999',
        name: 'CIA BRASILEIRA DE DISTRIBUICAO'
      },
      {
        ticker: 'CEAB3',
        category: 'SHARES',
        tradingStartDate: '02/01/2020',
        tradingEndDate: '31/12/9999',
        name: 'CEA MODAS S.A.'
      },
      {
        ticker: 'TEND3',
        category: 'SHARES',
        tradingStartDate: '03/05/2021',
        tradingEndDate: '31/12/9999',
        name: 'CONSTRUTORA TENDA S.A.'
      },
      {
        ticker: 'CBAV3',
        category: 'SHARES',
        tradingStartDate: '15/07/2021',
        tradingEndDate: '31/12/9999',
        name: 'Companhia Brasileira de Alum�nio'
      },
      {
        ticker: 'PDGR3',
        category: 'SHARES',
        tradingStartDate: '25/03/2021',
        tradingEndDate: '31/12/9999',
        name: 'PDG REALTY S.A. EMPREEND E PARTICIPACOES'
      },
      {
        ticker: 'WIZS3',
        category: 'SHARES',
        tradingStartDate: '16/04/2021',
        tradingEndDate: '31/12/9999',
        name: 'WIZ SOLU��ES E CORRETAGEM DE SEGUROS S.A.'
      },
      {
        ticker: 'VIVT3',
        category: 'SHARES',
        tradingStartDate: '01/10/2021',
        tradingEndDate: '31/12/9999',
        name: 'TELEF�NICA BRASIL S.A'
      },
      {
        ticker: 'BBRK3',
        category: 'SHARES',
        tradingStartDate: '14/01/2021',
        tradingEndDate: '31/12/9999',
        name: 'BRASIL BROKERS PARTICIPACOES S.A.'
      },
      {
        ticker: 'CAML3',
        category: 'SHARES',
        tradingStartDate: '02/09/2021',
        tradingEndDate: '31/12/9999',
        name: 'CAMIL ALIMENTOS S.A.'
      },
      {
        ticker: 'DIRR3',
        category: 'SHARES',
        tradingStartDate: '20/05/2021',
        tradingEndDate: '31/12/9999',
        name: 'DIRECIONAL ENGENHARIA S.A.'
      },
      {
        ticker: 'HBOR3',
        category: 'SHARES',
        tradingStartDate: '03/05/2021',
        tradingEndDate: '31/12/9999',
        name: 'HELBOR EMPREENDIMENTOS S.A.'
      },
      {
        ticker: 'CSMG3',
        category: 'SHARES',
        tradingStartDate: '27/09/2021',
        tradingEndDate: '31/12/9999',
        name: 'CIA SANEAMENTO DE MINAS GERAIS-COPASA MG'
      },
      {
        ticker: 'SAPR11',
        category: 'SHARES',
        tradingStartDate: '31/12/9999',
        tradingEndDate: '31/12/9999',
        name: 'SANYO DA AMAZONIA S.A.'
      },
      {
        ticker: 'ENJU3',
        category: 'SHARES',
        tradingStartDate: '09/11/2020',
        tradingEndDate: '31/12/9999',
        name: 'ENJOEI S.A.'
      },
      {
        ticker: 'RECV3',
        category: 'SHARES',
        tradingStartDate: '05/05/2021',
        tradingEndDate: '31/12/9999',
        name: 'PETROREC�NCAVO S.A.'
      },
      {
        ticker: 'EVEN3',
        category: 'SHARES',
        tradingStartDate: '21/06/2021',
        tradingEndDate: '31/12/9999',
        name: 'EVEN CONSTRUTORA E INCORPORADORA S.A.'
      },
      {
        ticker: 'ABCB4',
        category: 'SHARES',
        tradingStartDate: '07/10/2021',
        tradingEndDate: '31/12/9999',
        name: 'BCO ABC BRASIL S.A.'
      },
      {
        ticker: 'ODPV3',
        category: 'SHARES',
        tradingStartDate: '23/09/2021',
        tradingEndDate: '31/12/9999',
        name: 'ODONTOPREV S.A.'
      },
      {
        ticker: 'CPLE3',
        category: 'SHARES',
        tradingStartDate: '01/10/2021',
        tradingEndDate: '31/12/9999',
        name: 'CIA PARANAENSE DE ENERGIA - COPEL'
      },
      {
        ticker: 'NGRD3',
        category: 'SHARES',
        tradingStartDate: '03/05/2021',
        tradingEndDate: '31/12/9999',
        name: 'NEOGRID PARTICIPACOES S.A.'
      },
      {
        ticker: 'LCAM3',
        category: 'SHARES',
        tradingStartDate: '30/09/2021',
        tradingEndDate: '31/12/9999',
        name: 'CIA LOCA��O DAS AM�RICAS'
      },
      {
        ticker: 'SMTO3',
        category: 'SHARES',
        tradingStartDate: '02/08/2021',
        tradingEndDate: '31/12/9999',
        name: 'SAO MARTINHO S.A.'
      },
      {
        ticker: 'AMBP3',
        category: 'SHARES',
        tradingStartDate: '03/05/2021',
        tradingEndDate: '31/12/9999',
        name: 'AMBIPAR PARTICIPACOES E EMPREENDIMENTOS S/A'
      },
      {
        ticker: 'YDUQ3',
        category: 'SHARES',
        tradingStartDate: '29/04/2021',
        tradingEndDate: '31/12/9999',
        name: 'YDUQS PARTICIPACOES S.A.'
      },
      {
        ticker: 'PSSA3',
        category: 'SHARES',
        tradingStartDate: '21/10/2021',
        tradingEndDate: '31/12/9999',
        name: 'PORTO SEGURO S.A.'
      },
      {
        ticker: 'BIDI3',
        category: 'SHARES',
        tradingStartDate: '23/07/2021',
        tradingEndDate: '31/12/9999',
        name: 'BANCO INTER S.A.'
      },
      {
        ticker: 'WEST3',
        category: 'SHARES',
        tradingStartDate: '11/02/2021',
        tradingEndDate: '31/12/9999',
        name: 'WESTWING COMERCIO VAREJISTA S.A.'
      },
      {
        ticker: 'PGMN3',
        category: 'SHARES',
        tradingStartDate: '02/09/2020',
        tradingEndDate: '31/12/9999',
        name: 'EMPREENDIMENTOS PAGUE MENOS S.A.'
      },
      {
        ticker: 'SEQL3',
        category: 'SHARES',
        tradingStartDate: '07/10/2020',
        tradingEndDate: '31/12/9999',
        name: 'SEQUOIA LOGISTICA E TRANSPORTES S.A'
      },
      {
        ticker: 'BRPR3',
        category: 'SHARES',
        tradingStartDate: '27/04/2021',
        tradingEndDate: '31/12/9999',
        name: 'BR PROPERTIES S.A.'
      },
      {
        ticker: 'OMGE3',
        category: 'SHARES',
        tradingStartDate: '30/04/2018',
        tradingEndDate: '31/12/9999',
        name: 'OMEGA GERA��O S.A.'
      },
      {
        ticker: 'IGTA3',
        category: 'SHARES',
        tradingStartDate: '23/04/2021',
        tradingEndDate: '31/12/9999',
        name: 'IGUATEMI EMPRESA DE SHOPPING CENTERS S.A'
      },
      {
        ticker: 'SBSP3',
        category: 'SHARES',
        tradingStartDate: '30/04/2021',
        tradingEndDate: '31/12/9999',
        name: 'CIA SANEAMENTO BASICO EST SAO PAULO'
      },
      {
        ticker: 'QUAL3',
        category: 'SHARES',
        tradingStartDate: '14/07/2021',
        tradingEndDate: '31/12/9999',
        name: 'QUALICORP CONSULTORIA E CORRETORA DE SEGUROS S.A.'
      },
      {
        ticker: 'BMGB4',
        category: 'SHARES',
        tradingStartDate: '30/12/2020',
        tradingEndDate: '31/12/9999',
        name: 'BANCO BMG S.A.'
      },
      {
        ticker: 'MTRE3',
        category: 'SHARES',
        tradingStartDate: '06/05/2021',
        tradingEndDate: '31/12/9999',
        name: 'MITRE REALTY EMPREENDIMENTOS E PARTICIPA��ES S.A.'
      },
      {
        ticker: 'TRIS3',
        category: 'SHARES',
        tradingStartDate: '26/04/2021',
        tradingEndDate: '31/12/9999',
        name: 'TRISUL S.A.'
      },
      {
        ticker: 'ALSO3',
        category: 'SHARES',
        tradingStartDate: '29/04/2021',
        tradingEndDate: '31/12/9999',
        name: 'ALIANSCE SONAE SHOPPING CENTERS S.A.'
      },
      {
        ticker: 'SANB11',
        category: 'SHARES',
        tradingStartDate: '01/09/2021',
        tradingEndDate: '31/12/9999',
        name: 'METALURGICA RIOSULENSE S.A.'
      },
      {
        ticker: 'ENAT3',
        category: 'SHARES',
        tradingStartDate: '03/05/2021',
        tradingEndDate: '31/12/9999',
        name: 'ENAUTA PARTICIPA��ES S.A.'
      },
      {
        ticker: 'ESPA3',
        category: 'SHARES',
        tradingStartDate: '08/09/2021',
        tradingEndDate: '31/12/9999',
        name: 'MPM CORP�REOS S.A.'
      },
      {
        ticker: 'BMOB3',
        category: 'SHARES',
        tradingStartDate: '10/02/2021',
        tradingEndDate: '31/12/9999',
        name: 'BEMOBI MOBILE TECH S.A.'
      },
      {
        ticker: 'SEER3',
        category: 'SHARES',
        tradingStartDate: '03/05/2021',
        tradingEndDate: '31/12/9999',
        name: 'SER EDUCACIONAL S.A.'
      },
      {
        ticker: 'AESB3',
        category: 'SHARES',
        tradingStartDate: '10/08/2021',
        tradingEndDate: '31/12/9999',
        name: 'AES BRASIL ENERGIA S.A.'
      },
      {
        ticker: 'NEOE3',
        category: 'SHARES',
        tradingStartDate: '02/07/2021',
        tradingEndDate: '31/12/9999',
        name: 'NEOENERGIA S.A.'
      },
      {
        ticker: 'BRKM5',
        category: 'SHARES',
        tradingStartDate: '07/06/2021',
        tradingEndDate: '31/12/9999',
        name: 'BRASKEM S.A.'
      },
      {
        ticker: 'LAVV3',
        category: 'SHARES',
        tradingStartDate: '19/10/2021',
        tradingEndDate: '31/12/9999',
        name: 'LAVVI EMPREENDIMENTOS IMOBILI�RIOS S.A.'
      },
      {
        ticker: 'AERI3',
        category: 'SHARES',
        tradingStartDate: '11/11/2020',
        tradingEndDate: '31/12/9999',
        name: 'AERIS IND. E COM. DE EQUIP. GERACAO DE ENERGIA S/A'
      },
      {
        ticker: 'RCSL3',
        category: 'SHARES',
        tradingStartDate: '23/11/2018',
        tradingEndDate: '31/12/9999',
        name: 'RECRUSUL S.A.'
      },
      {
        ticker: 'MYPK3',
        category: 'SHARES',
        tradingStartDate: '11/03/2020',
        tradingEndDate: '31/12/9999',
        name: 'IOCHPE MAXION S.A.'
      },
      {
        ticker: 'MLAS3',
        category: 'SHARES',
        tradingStartDate: '22/07/2021',
        tradingEndDate: '31/12/9999',
        name: 'MULTILASER INDUSTRIAL S.A.'
      },
      {
        ticker: 'LPSB3',
        category: 'SHARES',
        tradingStartDate: '25/10/2016',
        tradingEndDate: '31/12/9999',
        name: 'LPS BRASIL - CONSULTORIA DE IMOVEIS S.A.'
      },
      {
        ticker: 'FHER3',
        category: 'SHARES',
        tradingStartDate: '11/12/2014',
        tradingEndDate: '31/12/9999',
        name: 'FERTILIZANTES HERINGER S.A.'
      },
      {
        ticker: 'TUPY3',
        category: 'SHARES',
        tradingStartDate: '20/08/2021',
        tradingEndDate: '31/12/9999',
        name: 'TUPY S.A.'
      },
      {
        ticker: 'BKBR3',
        category: 'SHARES',
        tradingStartDate: '03/03/2020',
        tradingEndDate: '31/12/9999',
        name: 'BK BRASIL OPERA��O E ASSESSORIA A RESTAURANTES SA'
      },
      {
        ticker: 'MDIA3',
        category: 'SHARES',
        tradingStartDate: '17/09/2021',
        tradingEndDate: '31/12/9999',
        name: 'M.DIAS BRANCO S.A. IND COM DE ALIMENTOS'
      },
      {
        ticker: 'EGIE3',
        category: 'SHARES',
        tradingStartDate: '17/08/2021',
        tradingEndDate: '31/12/9999',
        name: 'ENGIE BRASIL ENERGIA S.A.'
      },
      {
        ticker: 'SLCE3',
        category: 'SHARES',
        tradingStartDate: '30/04/2021',
        tradingEndDate: '31/12/9999',
        name: 'SLC AGRICOLA S.A.'
      },
      {
        ticker: 'SBFG3',
        category: 'SHARES',
        tradingStartDate: '31/03/2021',
        tradingEndDate: '31/12/9999',
        name: 'GRUPO SBF SA'
      },
      {
        ticker: 'CURY3',
        category: 'SHARES',
        tradingStartDate: '26/04/2021',
        tradingEndDate: '31/12/9999',
        name: 'CURY CONSTRUTORA E INCORPORADORA S.A.'
      },
      {
        ticker: 'MOSI3',
        category: 'SHARES',
        tradingStartDate: '03/05/2021',
        tradingEndDate: '31/12/9999',
        name: 'Mosaico Tecnologia ao Consumidor S.A.'
      },
      {
        ticker: 'SQIA3',
        category: 'SHARES',
        tradingStartDate: '30/04/2021',
        tradingEndDate: '31/12/9999',
        name: 'SINQIA S.A.'
      },
      {
        ticker: 'TASA4',
        category: 'SHARES',
        tradingStartDate: '12/11/2019',
        tradingEndDate: '31/12/9999',
        name: 'TAURUS ARMAS S.A.'
      },
      {
        ticker: 'INEP4',
        category: 'SHARES',
        tradingStartDate: '22/07/2021',
        tradingEndDate: '31/12/9999',
        name: 'INEPAR S.A. INDUSTRIA E CONSTRUCOES'
      },
      {
        ticker: 'VIVA3',
        category: 'SHARES',
        tradingStartDate: '03/05/2021',
        tradingEndDate: '31/12/9999',
        name: 'VIVARA PARTICIPA�OES S.A'
      },
      {
        ticker: 'RCSL4',
        category: 'SHARES',
        tradingStartDate: '23/11/2018',
        tradingEndDate: '31/12/9999',
        name: 'RECRUSUL S.A.'
      },
      {
        ticker: 'MILS3',
        category: 'SHARES',
        tradingStartDate: '18/08/2021',
        tradingEndDate: '31/12/9999',
        name: 'MILLS ESTRUTURAS E SERVI�OS DE ENGENHARIA S.A.'
      },
      {
        ticker: 'ALUP11',
        category: 'SHARES',
        tradingStartDate: '31/12/9999',
        tradingEndDate: '31/12/9999',
        name: 'ALTHAIA S.A. INDUSTRIA FARMACEUTICA'
      },
      {
        ticker: 'CLSA2',
        category: 'SHARES',
        tradingStartDate: '06/08/2021',
        tradingEndDate: '31/12/9999',
        name: 'CIELO S.A.'
      },
      {
        ticker: 'PNVL3',
        category: 'SHARES',
        tradingStartDate: '23/08/2021',
        tradingEndDate: '31/12/9999',
        name: 'DIMED S.A. DISTRIBUIDORA DE MEDICAMENTOS'
      },
      {
        ticker: 'AGRO3',
        category: 'SHARES',
        tradingStartDate: '19/10/2020',
        tradingEndDate: '31/12/9999',
        name: 'BRASILAGRO - CIA BRAS DE PROP AGRICOLAS'
      },
      {
        ticker: 'PTBL3',
        category: 'SHARES',
        tradingStartDate: '06/09/2021',
        tradingEndDate: '31/12/9999',
        name: 'PBG S/A'
      },
      {
        ticker: 'GUAR3',
        category: 'SHARES',
        tradingStartDate: '30/09/2021',
        tradingEndDate: '31/12/9999',
        name: 'GUARARAPES CONFECCOES S.A.'
      },
      {
        ticker: 'VULC3',
        category: 'SHARES',
        tradingStartDate: '17/03/2016',
        tradingEndDate: '31/12/9999',
        name: 'VULCABRAS S.A.'
      },
      {
        ticker: 'TCSA3',
        category: 'SHARES',
        tradingStartDate: '05/06/2020',
        tradingEndDate: '31/12/9999',
        name: 'TECNISA S.A.'
      },
      {
        ticker: 'PARD3',
        category: 'SHARES',
        tradingStartDate: '21/09/2021',
        tradingEndDate: '31/12/9999',
        name: 'INSTITUTO HERMES PARDINI S.A.'
      },
      {
        ticker: 'GETT3',
        category: 'SHARES',
        tradingStartDate: '18/10/2021',
        tradingEndDate: '31/12/9999',
        name: 'GETNET ADQUIRENCIA E SERV PARA MEIOS DE PGTO S.A.'
      },
      {
        ticker: 'LEVE3',
        category: 'SHARES',
        tradingStartDate: '30/04/2021',
        tradingEndDate: '31/12/9999',
        name: 'MAHLE-METAL LEVE S.A.'
      },
      {
        ticker: 'SMFT3',
        category: 'SHARES',
        tradingStartDate: '04/01/2021',
        tradingEndDate: '31/12/9999',
        name: 'SMARTFIT ESCOLA DE GIN�STICA E DAN�A S.A.'
      },
      {
        ticker: 'ETER3',
        category: 'SHARES',
        tradingStartDate: '26/03/2021',
        tradingEndDate: '31/12/9999',
        name: 'ETERNIT S.A.'
      },
      {
        ticker: 'INEP3',
        category: 'SHARES',
        tradingStartDate: '22/07/2021',
        tradingEndDate: '31/12/9999',
        name: 'INEPAR S.A. INDUSTRIA E CONSTRUCOES'
      },
      {
        ticker: 'MELK3',
        category: 'SHARES',
        tradingStartDate: '27/04/2021',
        tradingEndDate: '31/12/9999',
        name: 'MELNICK DESENVOLVIMENTO IMOBILI�RIO S.A.'
      },
      {
        ticker: 'ARZZ3',
        category: 'SHARES',
        tradingStartDate: '02/07/2021',
        tradingEndDate: '31/12/9999',
        name: 'AREZZO IND�STRIA E COM�RCIO S.A.'
      }
    ];
    const promises: Promise<any>[] = [];
    stocks.forEach((stock: any) => {
      stock.lastUpdated = new Date(2021, 9, 28);
      promises.push(admin.firestore().doc(`simulatorStocks/${stock.ticker}`).set(stock));
    });

    Promise.resolve(promises)
      .then(() => res.sendStatus(200));

  });

/*
  Função agendada que irá rodar todos os dias as 8h (4h da california).
  Essa função altera o documento '1_RUN_CF' da coleção 'Simulator Stocks'
  o que dispara a cloud function responsável por se comunicar com a API (updateStocksData)
*/
export const scheduledUpdate = functions // .region('southamerica-east1')
  .pubsub.schedule('0 1 * * *').onRun(() => {
  return admin.firestore().doc('simulatorStocks/1_RUN_CF')
    .update({
      lastCall: new Date(),
      mode: '',
      outputSize: 'compact'
    })
    .then(() => true)
    .catch(() => false);
});

// Função que atuliza os dados de uma ação. (Ela é recursiva pois é dispara uma alteração de dados na coleção).
// Ela é interrompida quando não há mais ações para alterar
export const updateStocksData = functions // .region('southamerica-east1')
  .firestore.document('simulatorStocks/{stock}')
  .onUpdate(async () => {
    // Busca os parâmetros no documento '1_RUN_CF'
    const fetchParams = await admin.firestore().doc('simulatorStocks/1_RUN_CF').get();
    const fetchParamsData = fetchParams.data();
    let mode = '';
    let outputSize = 'compact';
    if (fetchParamsData) {
      mode = fetchParamsData.mode; // all | ""
      outputSize = fetchParamsData.outputSize; // full | compact
    }
    const API_KEY = '4YSTYIK08AMHDKZE';
    const promises: Promise<any>[] = [];
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth() , now.getDate());
    // Busca uma ação para atualizar desde que ela não tenha sido atualizada no último dia.
    const fetchStocks = await admin.firestore().collection('simulatorStocks')
      .where('lastUpdated', '<=', today)
      .limit(1)
      .get();
    if (fetchStocks.docs[0]){
      const stock = fetchStocks.docs[0];
      const stockData = stock.data();
      let dados = '';
      // Timeout necessário de 15 segundos para que a API não seja sobrecarregada
      setTimeout(() => {
        // Requisição HTTP para buscar na API os dados da ação.
        https.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&outputsize=${outputSize}&symbol=${stockData.ticker}.SAO&apikey=${API_KEY}`, (resolve) => {
          // Log para o firebase dizer qual ação está buscando via API.
          console.log('Getting:', stockData.ticker);
          resolve.on('data', (d) => {
            dados += d;
          });
          resolve.on('end', () => {
            const obj = JSON.parse(dados);
            if (obj['Time Series (Daily)']) {
              const timeSeries = obj['Time Series (Daily)'];
              const pathStocksAll = `stockPrices.${stockData.ticker}`;
              // Caso o modo seja 'all', irá atualizar toda a série histórica da ação até a data de 03/07/2015
              if (mode === 'all') {
                const transformedTimeSeries: any = {};
                for (const [key, value] of Object.entries(timeSeries)) {
                  if (key === '2015-07-01' || key === '2015-07-02' || key === '2015-07-03') {
                    break; // Quebra o for para o objeto não passar de 1MB
                  } else {
                    transformedTimeSeries[key] = transformData(value);
                  }
                }
                const lastDayData = transformedTimeSeries[Object.keys(transformedTimeSeries)[0]];
                const path = `timeSeriesDaily`;
                promises.push(admin.firestore().doc(`simulatorStocks/${stockData.ticker}`)
                  .update({
                    [path]: transformedTimeSeries,
                    currentPrice: lastDayData.close,
                    lastUpdated: new Date()
                  }));
                // Atualiza o vetor único de ações
                promises.push(admin.firestore().doc(`simulatorStocks/allStocks`)
                  .update({
                    [pathStocksAll]: lastDayData.close,
                    lastUpdated: new Date()
                  }));
                // Caso o modo não seja 'all', irá atualizar somente o dia mais recente.
              } else {
                const lastDayData = timeSeries[Object.keys(timeSeries)[0]];
                const lastDay = Object.keys(timeSeries)[0];
                const transformedData = transformData(lastDayData);
                const path = `timeSeriesDaily.${lastDay}`;
                promises.push(admin.firestore().doc(`simulatorStocks/${stockData.ticker}`)
                  .update({
                    [path]: transformedData,
                    currentPrice: transformedData.close,
                    lastUpdated: new Date()
                  }));
                // Atualiza o vetor único de ações
                promises.push(admin.firestore().doc(`simulatorStocks/1_ALL_STOCKS`)
                  .update({
                    [pathStocksAll]: transformedData.close,
                    lastUpdated: new Date()
                  }));
              }
            } else {
              // Log para o firebase caso a API não possua os dados históricos.
              console.log('Cannot get from API:', stockData.ticker);
            }
          });
        });
      }, 15000);
      return Promise.all(promises).then(() => true);
    } else {
      return false;
    }
  });

// Função auxiliar que recebe os dados da API e os transforma para o nosso formato no BD.
function transformData(obj: any): StockDay {
  return {
    open: parseFloat(obj['1. open']),
    high: parseFloat(obj['2. high']),
    low: parseFloat(obj['3. low']),
    close: parseFloat(obj['4. close'])
  };
}
