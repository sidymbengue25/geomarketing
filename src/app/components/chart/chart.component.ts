import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import * as Plotly from "plotly.js/dist/plotly-basic.min";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.scss"]
})
export class ChartComponent implements AfterViewInit {
  @Input() chartData;
  @Input() layout;
  @ViewChild("chart") el: ElementRef;
  constructor() {}
  ngAfterViewInit(): void {
    this.initChart();
  }
  initChart() {
    const element = this.el.nativeElement;
    const style = {
      margin: { t: 0 }
    };

    Plotly.newPlot(element, this.chartData, this.layout);
  }
}
