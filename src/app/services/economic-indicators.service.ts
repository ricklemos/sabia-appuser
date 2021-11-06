import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EconomicIndicatorsService {

  constructor(
    private httpClient: HttpClient
  ) { }
  checkIfDateStringIsCorrect(dateString): boolean {
    const regex = new RegExp('(0?[1-9]|[12][0-9]|3[01])[-\\\\/ ]?(0?[1-9]|1[0-2])[-/ ]?(?:19|20)[0-9]{2}');
    return regex.test(dateString);
  }
  getUrl(seriesCode: string, startDate: string, endDate: string): string{
    if (this.checkIfDateStringIsCorrect(startDate) && this.checkIfDateStringIsCorrect(endDate)){
      return `http://api.bcb.gov.br/dados/serie/bcdata.sgs.${seriesCode}/dados?formato=json
    &dataInicial=${startDate}
    &dataFinal=${endDate}`;
    } else {
      return `http://api.bcb.gov.br/dados/serie/bcdata.sgs.${seriesCode}/dados?formato=json
    &dataInicial=01/01/2021
    &dataFinal=01/12/2021`;
    }
  }
  // Retorna um JSON com o valor do IPCA do mês (em % a.m.)
  fetchIPCAMonthlyData(startDate: string, endDate: string): Observable<any>{
    const seriesCode = '4466';
    return this.httpClient.get(this.getUrl(seriesCode, startDate, endDate));
  }
  // Retorna um JSON com o IPCA anual do mês (em % a.a.)
  fetchIPCAAnualMonthlyData(startDate: string, endDate: string): Observable<any>{
    const seriesCode = '13522';
    return this.httpClient.get(this.getUrl(seriesCode, startDate, endDate));
  }
  // Retorna um JSON com o valor da Selic Meta no dia (em % a.a.)
  fetchSelicMetaDailyData(startDate: string, endDate: string): Observable<any>{
    const seriesCode = '432';
    return this.httpClient.get(this.getUrl(seriesCode, startDate, endDate));
  }
  // Retorna um JSON com o valor do CDI Anualizado no dia (em % a.a.)
  fetchCDIAnualizadoDailyData(startDate: string, endDate: string): Observable<any>{
    const seriesCode = '4389';
    return this.httpClient.get(this.getUrl(seriesCode, startDate, endDate));
  }
  // Retorna um JSON com o valor do Dolár no dia (em u.m.c. unidade monetária contável (reais))
  fetchDolarDailyData(startDate: string, endDate: string): Observable<any>{
    const seriesCode = '1';
    return this.httpClient.get(this.getUrl(seriesCode, startDate, endDate));
  }
}
