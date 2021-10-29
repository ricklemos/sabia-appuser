import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as https from 'https';

// .region('southamerica-east1')
// export const myFirstCloudFunction = functions.pubsub.schedule('*/1 * * * *')
//   .timeZone('America/New_York') // Users can choose timezone - default is America/Los_Angeles
//   .onRun((context) => {
//     const ticker = 'ITUB4';
//     const data = {
//       ticker: 'ITUB4',
//       name: 'Itau'
//     };
//     console.log('This will be run every minute!');
//     admin.firestore().doc(`simulatorStocks/${ticker}`).set(data);
//     return null;
// });

export const createStocks = functions.https
  .onRequest((req, res) => {
    const stocks = [
      {
        ticker: 'ITUB4',
        name: 'Itaú',
        timeSeriesDaily: {
          '2021-10-27': {
            open: 15,
            close: 16,
            high: 17,
            low: 14
          },
          '2021-10-26': {
            open: 15,
            close: 16,
            high: 17,
            low: 14
          }
        }
      },
      {
        ticker: 'ABEV3',
        name: 'AmBev SA',
        timeSeriesDaily: {
          '2021-10-27': {
            open: 15,
            close: 16,
            high: 17,
            low: 14
          },
          '2021-10-26': {
            open: 15,
            close: 16,
            high: 17,
            low: 14
          }
        }
      },
      {
        ticker: 'BCFF11',
        name: 'Fundo BTG'
      }
    ];
    const promises: Promise<any>[] = [];
    stocks.forEach((stock) => {
      promises.push(admin.firestore().doc(`simulatorStocks/${stock.ticker}`).set(stock));
    });

    Promise.resolve(promises).then(() => res.send(200));

  });

export const updateStocksData = functions.https
  .onRequest(async (req, res) => {
// export const updateStocksData = functions.pubsub.schedule('* * * * *')
//   .onRun(async (context) => {
    const mode = req.query.mode;
    const outputSize = req.query.size ? req.query.size : 'compact'; // full
    const API_KEY = '4YSTYIK08AMHDKZE';
    const promises: Promise<any>[] = [];
    const fetchStocks = await admin.firestore().collection('simulatorStocks').get();
    const stocks = fetchStocks.docs;
    stocks.forEach((stock) => {
      const stockData = stock.data();
      let dados = '';
      https.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&outputsize=${outputSize}&symbol=${stockData.ticker}.SAO&apikey=${API_KEY}`, (resolve) => {
        resolve.on('data', (d) => {
          dados += d;
        });
        resolve.on('end', () => {
          const obj = JSON.parse(dados);
          if (mode === 'all') {
            const timeSeries = obj['Time Series (Daily)'];
            const transformedTimeSeries: any = {};
            for (const [key, value] of Object.entries(timeSeries)) {
              if (key === '2015-07-01' || key === '2015-07-02' || key === '2015-07-03' ){
                break; // Quebra o for para o objeto não passar de 1MB
              } else {
                transformedTimeSeries[key] = transformData(value);
              }
            }
            const lastDay = getYesterday();
            const lastDayData = transformedTimeSeries[lastDay];
            const path = `timeSeriesDaily`;
            promises.push(admin.firestore().doc(`simulatorStocks/${stockData.ticker}`)
              .update({
                [path]: transformedTimeSeries,
                currentPrice: lastDayData.close
              }));
          } else {
            const lastDay = getYesterday();
            const lastDayData = obj['Time Series (Daily)'][lastDay];
            const transformedData = transformData(lastDayData);
            const path = `timeSeriesDaily.${lastDay}`;
            promises.push(admin.firestore().doc(`simulatorStocks/${stockData.ticker}`)
              .update({
                [path]: transformedData,
                currentPrice: transformedData.close
              }));
          }
        });
      });
    });
    Promise.all(promises).then(() => res.send(200));
    // return Promise.all(promises);
  });

function transformData(obj: any): any {
  return {
    open: obj['1. open'],
    high: obj['2. high'],
    low: obj['3. low'],
    close: obj['4. close']
  };
}

function getYesterday(): string {
  const date = new Date();
  const day = date.getDate() - 1;
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return (year + '-' + month + '-' + day);
}
