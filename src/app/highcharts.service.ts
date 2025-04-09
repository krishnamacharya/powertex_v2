import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts'
@Injectable({
  providedIn: 'root'
})
export class HighchartsService {

  constructor() { }
  createchart(el,options){
    Highcharts.chart(el,options)
  }
}
