import { Component, ViewEncapsulation, NgZone, Input, OnChanges, OnDestroy, AfterViewInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

interface deviceGraphData {
    Date: string;
    Value: number;
    MaxValue: number;
    MinValue: number;
}

am4core.useTheme(am4themes_animated);

@Component({
    selector: 'xychart',
    templateUrl: 'xychart.component.html',
    encapsulation: ViewEncapsulation.None
})
export class XYChartComponent {

    @Input('data') graphData: Array<deviceGraphData>;
    @Input('chartId') chartId: string;
    constructor(private zone: NgZone) {}
 
    ngAfterViewInit() {
        this.zone.runOutsideAngular(() => {
            if(am4core.create(this.chartId, am4charts.XYChart)){
                am4core.create(this.chartId, am4charts.XYChart).dispose();
            }
            let chart = am4core.create(this.chartId, am4charts.XYChart);
            this.createLineChart(this.chartId, this.graphData.filter(function( obj ) { return obj.Date !== ''; }), chart);
        });
    }

    ngOnDestroy() {
        this.zone.runOutsideAngular(() => {
            if(am4core.create(this.chartId, am4charts.XYChart)){
                am4core.create(this.chartId, am4charts.XYChart).dispose();
            }
        });
      }

    createLineChart(div: string, data: any, chart: am4charts.XYChart) {
        chart.hiddenState.properties.opacity = 0;
        chart.data = data;

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "Date";
        series.dataFields.openValueY = "MinValue";
        series.dataFields.valueY = "MaxValue";
        series.tooltipText = "Min: {openValueY.value} Max: {valueY.value}";
        series.sequencedInterpolation = true;
        series.fillOpacity = 0.3;
        series.defaultState.transitionDuration = 1000;
        series.tensionX = 0.8;

        let series2 = chart.series.push(new am4charts.LineSeries());
        series2.dataFields.dateX = "Date";
        series2.dataFields.valueY = "MinValue";
        series2.sequencedInterpolation = true;
        series2.defaultState.transitionDuration = 1500;
        series2.stroke = chart.colors.getIndex(6);
        series2.tensionX = 0.8;

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.xAxis = dateAxis;
        chart.scrollbarX = new am4core.Scrollbar();
    }
}