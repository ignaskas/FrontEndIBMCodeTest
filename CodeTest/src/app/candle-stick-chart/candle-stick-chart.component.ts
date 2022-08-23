import {Component, VERSION, ViewChild, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';

import {ChartComponent, ApexAxisChartSeries, ApexChart, ApexYAxis, ApexXAxis, ApexTitleSubtitle} from "ng-apexcharts";
import * as moment from "moment";
import {candleStick} from "../../assets/model/candleStick";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'candle-stick',
  templateUrl: './candle-stick-chart.component.html',
  styleUrls: ['./candle-stick-chart.component.css']
})
export class CandleStickChartComponent implements OnInit, OnChanges {

  @Input() chartData: any;

  public chartOptions: Partial<ChartOptions> | any;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateChart(changes);
  }

  ngOnInit() {

  }

  printChart(dataaa: any){
    this.chartOptions = {
      series: [
        {
          name: "candle",
          data: dataaa
        }
      ],
      chart: {
        height: 350,
        type: "candlestick"
      },
      title: {
        text: "Chart",
        align: "left"
      },
      tooltip: {
        enabled: true
      },
      xaxis: {
        type: "category",
        labels: {
          formatter: function (val: any) {
            return moment(val).format("MMM DD HH:mm");
          }
        }
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    };
  }
//create list from data received from the finnhub API
  public updateChart(data: any) {
    let temp :Array<any> = [];
    let query = data.chartData.currentValue;
    // console.log(new Date(query.t[0] * 1000).toTimeString());
    for (let i = 0; i <= data.chartData.currentValue.c.length - 1; i++){
      temp.push({x: new Date(query.t[i] * 1000), y: [query.o[i], query.h[i], query.l[i], query.c[i]]});
    }
    this.printChart(temp);
  }


}
