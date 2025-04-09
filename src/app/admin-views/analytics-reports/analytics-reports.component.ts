import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as Highcharts from 'highcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import Drilldown from 'highcharts/modules/drilldown';
import { GlobalServiceService } from '../../global-service.service';
import { ToasterService } from '../../toastr-service.service';
import { MatDialog } from '@angular/material/dialog';
import { HighchartsService } from '../../highcharts.service';
import { DataServiceService } from '../../data-service.service';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';

Drilldown(Highcharts);
@Component({
  selector: 'app-analytics-reports',
  standalone: false,
  templateUrl: './analytics-reports.component.html',
  styleUrls: ['./analytics-reports.component.scss']
})
export class AnalyticsReportsComponent implements OnInit {

  @ViewChild('chart') public chartEl: ElementRef
  salesdetails: any = []
  salesdatas: any = []
  salesdatas1: any = []
  sales: any = {}
  loginUserData: any
  highcharts = Highcharts;
  // salesdrilldata: any
  // salestitle: any
  salesdrilldata: any = []
  salestitle: any = []

  constructor(private service: GlobalServiceService,private spinner: NgxSpinnerService, private toasterService: ToasterService, private dialog: MatDialog, private highchart: HighchartsService, private dataService: DataServiceService) {
  }

  chartOptions = {

    chart: {
      type: 'column',
     
      // zoomType: 'x',
      scrollablePlotArea: {
        minHeight: 700,
        minWidth: 2000,

      },
      renderTo: 'container',
      events: {     
        drilldown: function (e) {
          var chart = this;
          if (chart.title.text == 'Total Sales') {
            chart.setTitle({ text: e.point.name + " " + " " }, { text: '' });
          }
          else {
            chart.setTitle({ text: e.point.name + " " + " " }, { text: '' });
          }
        },
        drillup: function (e) {
          var chart = this;
          chart.setTitle({ text: '' });
          chart.redraw();
        },
      
    }

    },
  
    title: {
      text: ''
    },

    credits: {
      enabled: false
    },

    subtitle: {
      // text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
    },
    xAxis: {
      type: 'category',


    },
    yAxis: {
      title: {

        text: '<b></b>'
      }
    },
    legend: {
      enabled: false
    },
    //   scrollbar: {
    //     enabled: true,
    // },
    plotOptions: {

      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: ' {point.y:.2f} '
        }
      },
    
    },

    tooltip: {

      headerFormat: '<span style="font-size:11px"> Amount in Rupees</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>',

    },

    series: [
      {
        name: "",
        colorByPoint: true,
        data: this.salesdatas
      }
    ],
    drilldown: {

      series: this.salesdrilldata
    },


  };



  defaultOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      renderTo: 'container',
      events: {
        drilldown: function (e) {
          var chart = this;
          if (chart.title.text == 'Total Sales') {
            chart.setTitle({ text: e.point.name + " " + "" }, { text: '' });
          }
          else {
            chart.setTitle({ text: e.point.name + " " + "" }, { text: '' });
          }
        },
        drillup: function (e) {
          var chart = this;
          chart.setTitle({ text: '' })
          chart.redraw();


        }

      }
    },

    title: {
      text: this.salestitle,
      align: 'low'
    },
    credits: {
      enabled: false
    },

    tooltip: {
      headerFormat: '<span style="font-size:11px"> Amount in Rupees</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>',

    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.y:.2f}',

          },
        showInLegend: true
      }
    },
    series: [{
      name: '',
      colorByPoint: true,
      data: this.salesdatas
    }],
    drilldown: {
      series:
        this.salesdrilldata

    },
  }
 
  getcolumnoptions() {

    this.chartOptions.series[0].data = this.salesdatas
    this.chartOptions.drilldown.series = this.salesdrilldata
    if (this.salestitle == "Total Sales") {
      this.chartOptions.yAxis.title.text = "<b>" + this.salestitle + "  Amount</b>"
    }
    else {
      this.chartOptions.yAxis.title.text = "<b>" + this.salestitle + "</b>"
      this.chartOptions.tooltip.headerFormat = "<span style='font-size:11px'>" + "Stock in Quantity" + "</span><br>"
     
    }

    this.chartOptions.title.text = this.salestitle
    console.log(this.chartOptions, " this.chartOptions")
    this.highchart.createchart(this.chartEl.nativeElement, this.chartOptions)

  }
  getpieoptions() {

    this.defaultOptions.series[0].data = this.salesdatas
    this.defaultOptions.drilldown.series = this.salesdrilldata
    this.defaultOptions.title.text = this.salestitle
    if (this.salestitle == "Total Stock") {
      this.defaultOptions.tooltip.headerFormat = "<span style='font-size:11px'>" + "Stock in Quantity" + "</span><br>"
    }
    this.highchart.createchart(this.chartEl.nativeElement, this.defaultOptions)
  }

  branchesList: any
  brands: any
  ngOnInit() {

    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.sales.reporttype = 'Sales'
    this.sales.charttype = 'Column'
    this.getreporttypes()
    this.getcategory()
    this.getsalesreports()
    this.getDates()
    this.getmarketing_manager()
    this.branchesList = this.dataService.getOnLoadServices(1.8);
    this.brands = this.dataService.getOnLoadServices("brand")
  
  }
  
  onchangecharttype(charttype) {
    if (charttype == 'Column') {
      this.getcolumnoptions()
    }
    else {

      this.getpieoptions()
    }
  }
  onbranchselect(branch) {
    this.sales.marketingmanager = undefined
    this.getmarketing_manager()

  }
  // onchangemonth(month) {

  //   this.sales.branch = undefined
  // }
  date: any
  branch: any
  getreport(sales) {

    if (!sales.branch) {
      this.branch = this.loginUserData.company_code

    }
    else {
      this.branch = sales.branch
    }
    if (sales.year || sales.branch || sales.month || sales.category || sales.marketingmanager || sales.brand || sales.reporttype) {
      if (sales.reporttype == 'Sales') {
        this.service.getDatawithMethodParams5("reports/sales/", sales.year, this.branch, sales.month, sales.brand, sales.marketingmanager).subscribe((resp2) => {
          this.salesdetails = resp2;
          this.sales.charttype = undefined
          this.salesdatas = []

          this.salesdatas = this.salesdetails.data
          this.salesdrilldata = this.salesdetails.deep_data.series
          //  if(sales.branch){
          //   this.salestitle=sales.branch+' '+"Wise Sales"
          //  }
          if (sales.brand) {
            this.salestitle = sales.brand + ' ' + "Brand Sales"
          }

          this.chartOptions.series[0].data = []
          this.defaultOptions.series[0].data = []
          this.chartOptions.drilldown.series = []
          this.defaultOptions.drilldown.series = []
          if (this.salesdatas1) {
            this.getcolumnoptions()
          }

        })

      }
      if (sales.reporttype == 'Branch') {
        this.service.getDatawithMethodParams5("reports/branch", sales.year, this.branch, sales.month, sales.brand, sales.marketingmanager).subscribe((resp2) => {
          this.salesdetails = resp2;
          this.sales.charttype = undefined
          this.salesdatas = []

          this.salesdatas = this.salesdetails.data
          this.salesdrilldata = this.salesdetails.deep_data.series
          //  if(sales.branch){
          //   this.salestitle=sales.branch+' '+"Wise Sales"
          //  }
          if (sales.brand) {
            this.salestitle = sales.brand + ' ' + "Brand Sales"
          }

          this.chartOptions.series[0].data = []
          this.defaultOptions.series[0].data = []
          this.chartOptions.drilldown.series = []
          this.defaultOptions.drilldown.series = []
          if (this.salesdatas1) {
            this.getcolumnoptions()
          }

        })

      }
      if (sales.reporttype == 'Stock') {
        this.service.getDatawithMethodParams5("reports/stock", sales.year, this.branch, sales.month, sales.brand, sales.marketingmanager).subscribe((resp2) => {
          this.salesdetails = resp2;
          this.sales.charttype = undefined
          this.salesdatas = []

          this.salesdatas = this.salesdetails.data
          this.salesdrilldata = this.salesdetails.deep_data.series
          //  if(sales.branch){
          //   this.salestitle=sales.branch+' '+"Wise Sales"
          //  }
          if (sales.brand) {
            this.salestitle = sales.brand + ' ' + "Brand Stock"
          }

          this.chartOptions.series[0].data = []
          this.defaultOptions.series[0].data = []
          this.chartOptions.drilldown.series = []
          this.defaultOptions.drilldown.series = []
          if (this.salesdatas1) {
            this.getcolumnoptions()
          }

        })

      }
  

    }
    else {
      this.toasterService.error("Select any one option")
    }

  }

  getsalesreports() {
    this.salesdatas = []
    if(this.loginUserData.role=='Marketing Manager'){
      this.sales.marketingmanager=this.loginUserData.user
    }
    this.service.getDatawithMethodParams5("reports/sales/", this.sales.year, this.loginUserData.company_code, this.sales.month, this.sales.brand, this.sales.marketingmanager).subscribe((resp1) => {
      this.salesdetails = resp1;
      console.log(this.salesdetails, "salesdetails")

      this.salesdatas = this.salesdetails.data
      this.salesdrilldata = this.salesdetails.deep_data.series
      this.salestitle = "Total Sales"

      if (this.salesdetails) {
        this.getcolumnoptions()

      }

    });
  }
  getbranchreports() {
    this.salesdatas = []
    if(this.loginUserData.role=='Marketing Manager'){
      this.sales.marketingmanager=this.loginUserData.user
    }
    this.service.getDatawithMethodParams5("reports/branch", this.sales.year, this.loginUserData.company_code, this.sales.month, this.sales.brand, this.sales.marketingmanager).subscribe((resp1) => {
      this.salesdetails = resp1;
      console.log(this.salesdetails, "salesdetails")

      this.salesdatas = this.salesdetails.data
      this.salesdrilldata = this.salesdetails.deep_data.series
      this.salestitle = "Total Sales"

      if (this.salesdetails) {
        this.getcolumnoptions()

      }

    });
  }
  param1: any
  getstockreports() {
    this.spinner.show();
    this.salesdatas = []


    this.service.getDatawithMethodParams5("reports/stock/", this.sales.year, this.loginUserData.company_code, this.sales.month, this.sales.brand, this.sales.marketingmanager).subscribe((resp1) => {
      this.salesdetails = resp1;
        this.spinner.hide();
      console.log(this.salesdetails, "salesdetails")
      this.salesdatas = this.salesdetails.data
      this.salesdrilldata = this.salesdetails.deep_data.series
      this.salestitle = "Total Stock"


      console.log(this.salesdatas, "salesdatas")
      if (this.salesdetails) {
        this.getcolumnoptions()
      }
    });
  }

  onchangereporttype(report) {

    this.sales.branch = undefined
    this.sales.charttype = undefined
    this.sales.year = undefined
    this.sales.brand = undefined
    this.sales.marketingmanager = undefined
    this.sales.month = undefined
    this.sales.category = undefined
    this.sales.subcategory = undefined

    if (report == 'Branch') {
      this.getbranchreports()

    }
    if (report == 'Sales') {
      this.getsalesreports()
    }
    if (report == 'Stock') {
      this.getstockreports()
    }
  }
  years: any = []
  getDates() {

    var date = new Date();
    var currentYear = date.getFullYear();
    currentYear = currentYear
    for (var i = 0; i <= 50; i++) {
      this.years.push(currentYear - i);
    }
  }
  months: any = [
    { val: '01', name: 'Jan' },
    { val: '02', name: 'Feb' },
    { val: '03', name: 'Mar' },
    { val: '04', name: 'Apr' },
    { val: '05', name: 'May' },
    { val: '06', name: 'Jun' },
    { val: '07', name: 'Jul' },
    { val: '08', name: 'Aug' },
    { val: '09', name: 'Sep' },
    { val: '10', name: 'Oct' },
    { val: '11', name: 'Nov' },
    { val: '12', name: 'Dec' }
  ];
  quarters = [
    { name: 'Quarter 1' },
    { name: 'Quarter 2' },
    { name: 'Quarter 3' },
    { name: 'Quarter 4' }

  ];
  charttypes = [
    { name: 'Column' },
    { name: 'Pie' },
  ]
  reporttypes: any
  categories: any;
  getcategory() {

    return this.service.getDatawithMethod1('get_products_category/').subscribe((resp) => {
      this.categories = resp;
      // console.log("JSON.stringify" + JSON.stringify(this.categories))
    },
      error => {

        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });

      });
  }
  subcategories: any;
  getsubcategoryData(category) {
    let categorie = category;

    return this.service.getDatawithQueryParams1('4.8', categorie).subscribe((resp) => {
      this.subcategories = resp;
      this.sales.subcategory = undefined
      // console.log((this.subcategories))
    })
  }
  reporttypes1: any
  getreporttypes() {

    return this.service.getDataOnlyWithMethod("reports/retype").subscribe((resp) => {
      this.reporttypes = resp;
      this.reporttypes1 = resp
      console.log("JSON.stringify" + JSON.stringify(this.reporttypes1))
    },
      error => {

        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });

      });
  }
  market_manager_list: any
  getmarketing_manager(): any {

    if (this.sales.branch) {
      return this.service.getDatawithMethodParams1("market/manager_drop/", this.sales.branch).subscribe(data => {
        this.market_manager_list = data;
        console.log("marketing", this.market_manager_list);


      })
    }
    else {
      return this.service.getDatawithMethodParams1("market/manager_drop/", this.loginUserData.company_code).subscribe(data => {
        this.market_manager_list = data;
        console.log("marketing", this.market_manager_list);

      })
    }
  }
}

