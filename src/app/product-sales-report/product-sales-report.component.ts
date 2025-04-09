import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as Highcharts from 'highcharts';
declare var $: any;
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import Drilldown from 'highcharts/modules/drilldown';
import { HighchartsService } from '../highcharts.service';
import { GlobalServiceService } from '../global-service.service';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
Drilldown(Highcharts);
@Component({
  selector: 'app-product-sales-report',
  standalone: false,
  templateUrl: './product-sales-report.component.html',
  styleUrls: ['./product-sales-report.component.scss']
})
export class ProductSalesReportComponent implements OnInit {
  @ViewChild('chart') public chartEl: ElementRef
  p: any = 1;
  searchText: any;
  resources: any =[]; 
  fromdate: any;
  tilldate: any;
  maxdate: any;
  type: any = 1;
  orders: any =[];
  loginUserData: any;
  POhidden: boolean = true;
  DOhidden: boolean = false;
  MOhidden: boolean = false;
  salestitle: any = "Total Sales";
  highcharts = Highcharts;
  orders1: any =[];
  market_manager_list: any =[];
  constructor(private highchart: HighchartsService, private DatePipe: DatePipe, private service: GlobalServiceService, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  // chartOptions = {

  //   chart: {
  //     type: 'column',
     
  //     // zoomType: 'x',
  //     scrollablePlotArea: {
  //       minHeight: 700,
  //       minWidth: 2000,

  //     },
  //     renderTo: 'container',
  //     events: {     
  //       drilldown: function (e) {
  //         var chart = this;
  //           chart.setTitle({ text: e.point.XMONTH + " " + " " }, { text: '' });
  //       },
  //       drillup: function (e) {
  //         var chart = this;
  //         chart.setTitle({ text: '' });
  //         chart.redraw();
  //       },
      
  //   }

  //   },
  
  //   title: {
  //     text: ''
  //   },

  //   credits: {
  //     enabled: false
  //   },

  //   subtitle: {
  //     // text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
  //   },
  //   xAxis: {
  //     type: 'category',


  //   },
  //   yAxis: {
  //     title: {

  //       text: '<b></b>'
  //     }
  //   },
  //   legend: {
  //     enabled: false
  //   },
  //   //   scrollbar: {
  //   //     enabled: true,
  //   // },
  //   plotOptions: {

  //     series: {
  //       allowPointSelect: true,
  //       cursor: 'pointer',
  //       borderWidth: 0,
  //       dataLabels: {
  //         enabled: true,
  //         format: ' {point.SALE:.2f} '
  //       }
  //     },
    
  //   },

  //   tooltip: {

  //     headerFormat: '<span style="font-size:11px"> Qty</span><br>',
  //     pointFormat: '<span style="color:{point.color}">{point.XMONTH}</span>: <b>{point.SALE:.2f}</b> of total<br/>',

  //   },

  //   series: [
  //     {
  //       name: "",
  //       colorByPoint: true,
  //       data: this.orders
  //     }
  //   ],
  //   drilldown: {

  //     series: []
  //   },


  // };
/////////////////////////////////////////
  // defaultOptions = {
  //   chart: {
  //     plotBackgroundColor: null,
  //     plotBorderWidth: null,
  //     plotShadow: false,
  //     type: 'pie',
  //     renderTo: 'container',
  //     events: {
  //       drilldown: function (e) {
  //         var chart = this;
  //           chart.setTitle({ text: e.point.XMONTH + " " + "" }, { text: '' });
  //       },
  //       drillup: function (e) {
  //         var chart = this;
  //         chart.setTitle({ text: '' })
  //         chart.redraw();


  //       }

  //     }
  //   },

  //   title: {
  //     text: this.salestitle,
  //     align: 'low'
  //   },
  //   credits: {
  //     enabled: false
  //   },

  //   tooltip: {
  //     headerFormat: '<span style="font-size:11px"> QTY</span><br>',
  //     pointFormat: '<span style="color:{point.color}">{point.XMONTH}</span>: <b>{point.SALE:.2f}</b> of total<br/>',

  //   },
  //   plotOptions: {
  //     pie: {
  //       allowPointSelect: true,
  //       cursor: 'pointer',
  //       dataLabels: {
  //         enabled: true,
  //         format: '<b>{point.XMONTH}</b>: {point.SALE:.2f}',

  //         },
  //       showInLegend: true
  //     }
  //   },
  //   series: [{
  //     name: '',
  //     colorByPoint: true,
  //     data: this.orders
  //   }],
  //   drilldown: {
  //     series:
  //       []

  //   },
  // }
  /////////////////////////////////

  chartOptions = {   
    chart: {
       type: 'column',
       scrollablePlotArea: {
        minHeight: 700,
        minWidth: 3000,

      },
    },
    title: {
       text: 'Total Sales'
    },
    xAxis:{
      //  categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul',
      //  'Aug','Sep','Oct','Nov','Dec'],
      categories: this.orders,
       crosshair: true        
    },     
    yAxis : {
       min: 0,
       title: {
          text: 'Rainfall (mm)'         
       }      
    },
    tooltip : {
       headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
       pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
          '<td style = "padding:0"><b>{point.y:.1f} mm</b></td></tr>', footerFormat: '</table>', shared: true, useHTML: true
    },
    plotOptions : {
       column: {
          pointPadding: 0.2,
          borderWidth: 0
       }
    },
    series: this.orders.detail
    // series: [{
    //    name: 'Jan',
    //    data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 71.5, 106.4,
    //       148.5, 216.4, 194.1, 95.6, 54.4]
    // }]
 };

////////////////////

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.fromdate = new Date().getUTCFullYear() + "-" + "01" + "-" + "01";
    this.tilldate = new Date();
    this.maxdate = new Date();
    this.getprodimg();
    if(this.loginUserData.designation=='Marketing Manager'){
      this.marktngid = this.loginUserData.user_id;
    }
    else{
      this.getmarketing_manager();
    }
    this.getData();
  }
  
  getmarketing_manager(): any {
    return this.service.getDatawithMethodParams1("market/manager_drop/",this.loginUserData.company_code).subscribe(data=>{
      this.market_manager_list = data;
      console.log("marketing",this.market_manager_list);
      
    })
   }
  getprodimg() {
    
    return this.service.getDatawithMethod1('get_products_category/').subscribe((resp) => {
      this.resources = resp;
    },
      error => {
        // this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });

      });
  }
  marktngid: any;
  getData() {
    this.POhidden = true;
    this.DOhidden = false;
    this.MOhidden = false;
    this.spinner.show();

    if (this.type == '1') {

    this.service.getDatawithMethodParams2("salescatwisesummary/",this.type,this.marktngid?this.marktngid:'').subscribe((data) => {
      this.orders = data
      if (this.orders) {
        for (var i = 0; i < this.orders.length; i++) {
        // if (this.orders && this.type == '1') {
          this.orders[i].rowTot = this.orders[i].JAN + 
                                  this.orders[i].FEB + 
                                  this.orders[i].MAR + 
                                  this.orders[i].APRIL + 
                                  this.orders[i].MAY + 
                                  this.orders[i].JUN + 
                                  this.orders[i].JULY + 
                                  this.orders[i].AUG + 
                                  this.orders[i].SEP + 
                                  this.orders[i].OCT + 
                                  this.orders[i].NOV + 
                                  this.orders[i].DECE
        }
      }
      // if (this.orders && this.type == '2') {
      //   for (var i = 0; i < this.orders.length; i++) {
      //     if (this.orders[i]) {
      //       this.orders[i].drilldown = this.orders[i].XMONTH
      //       this.orders1.push(this.orders[i].category);
            
      //     }
      //   }
      //   // this.getcolumnoptions()
      // }
      console.log(this.orders,"type",this.type)
      console.log(this.orders1,"orders1")
      this.spinner.hide();

      if (this.orders.length < 1) {
        $("#WarningModal").modal('show');
      }
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
    }
    if (this.type == '2') {
      this.service.getDatawithMethod1("chart1/").subscribe((data:any) => {
        this.orders = data.data
        // if (this.orders && this.type == '2') {
        //   for (var i = 0; i < this.orders.length; i++) {
        //     if (this.orders[i]) {
        //       this.orders[i].drilldown = this.orders[i].XMONTH
        //       this.orders1.push(this.orders[i].category);
        //     }
        //   }
        //   // this.getcolumnoptions()
        // }
        console.log(this.orders,"type",this.type)
        this.spinner.hide();
  
        if (this.orders.length < 1) {
          $("#WarningModal").modal('show');
        }
      },
        error => {
          this.spinner.hide();
          this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
          // console.log(error);
        });
    }


  }
  CatClick(data){
    localStorage.setItem('ProType', JSON.stringify({category:data.category}));
    this.POhidden = false;
    this.DOhidden = true;
    this.MOhidden = false;
    this.spinner.show();
    this.service.getDatawithMethodParams2("salesummerysubcatwise/", data.category,this.marktngid?this.marktngid:'').subscribe((data) => {
      this.orders = data
      for (var i = 0; i < this.orders.length; i++) {
        if (this.orders[i]) {
          this.orders[i].rowTot = this.orders[i].JAN + 
                                  this.orders[i].FEB + 
                                  this.orders[i].MAR + 
                                  this.orders[i].APRIL + 
                                  this.orders[i].MAY + 
                                  this.orders[i].JUN + 
                                  this.orders[i].JULY + 
                                  this.orders[i].AUG + 
                                  this.orders[i].SEP + 
                                  this.orders[i].OCT + 
                                  this.orders[i].NOV + 
                                  this.orders[i].DECE
        }
      }
      console.log(this.orders)
      this.spinner.hide();

      if (this.orders.length < 1) {
        $("#WarningModal").modal('show');
      }
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });

  }

  SubCatClick(data){
    this.POhidden = false;
    this.DOhidden = false;
    this.MOhidden = true;
    this.spinner.show();
    this.service.getDatawithMethodParams2("salesproductwisesummary/", data.subcategory,this.marktngid?this.marktngid:'').subscribe((data) => {
      this.orders = data
      for (var i = 0; i < this.orders.length; i++) {
        if (this.orders[i]) {
          this.orders[i].rowTot = this.orders[i].JAN + 
                                  this.orders[i].FEB + 
                                  this.orders[i].MAR + 
                                  this.orders[i].APRIL + 
                                  this.orders[i].MAY + 
                                  this.orders[i].JUN + 
                                  this.orders[i].JULY + 
                                  this.orders[i].AUG + 
                                  this.orders[i].SEP + 
                                  this.orders[i].OCT + 
                                  this.orders[i].NOV + 
                                  this.orders[i].DECE
        }
      }
      console.log(this.orders)
      this.spinner.hide();

      if (this.orders.length < 1) {
        $("#WarningModal").modal('show');
      }
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });

  }

  getcolumnoptions() {

    this.chartOptions.series[0].data = this.orders
      this.chartOptions.yAxis.title.text = "<b>" + this.salestitle + "  Amount</b>"

    this.chartOptions.title.text = this.salestitle
    console.log(this.chartOptions, " this.chartOptions")
    this.highchart.createchart(this.chartEl.nativeElement, this.chartOptions)

  }
   //print
   printreport() {
    let popupWinindow
    let innerContents = document.getElementById('printsuppndng').innerHTML;
    popupWinindow = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWinindow.document.open();
    popupWinindow.document.write(`<html><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><link rel="stylesheet"  href="styles.scss" />
      <style>
      #printsuppndng{
        width: 100% !important;
        margin:0 !important;
      }
      
      body{
        width: 100% !important;
      }
      table{
        width: 100% !important;
      }
      table thead th,table tbody td{
        font-size: 9px !important;
      }
      table, th, td, tr{
        border: 1px solid #DDDDDD !important;
        border-collapse: collapse !important;
      }
      .busname {
        display: contents;
      }
      .dishide{
        display: none !important;
      }
      .Phide{
        display:none !important;
      }
      .printwrap{ 
        // margin-left:0px !important;
        // margin-right:1% !important;
        position:relative;
        left:0% !important;
        width:100% !important;
      }
      @page { size: landscape; }
      p{margin:0px;font-size: 12px;}
      table thead th {background: gray;color:white;}
      @media print {
        .col-md-3 {
          width:30%;
          float: left;
        }
        #printPageButton,.page {
          display: none;
        }
        .total_invoice_page {
          background: #fff;
          padding: 20px;
          box-shadow: 0px 3px 12px 0px #cccccc;
      }
      .invoce_address {
          padding: 0 30px;
          border: 1px dashed #37475a;
      }
      .company_address{
          font-weight: 700;
          font-size: 12px;
          padding-right: 5px;
          color: #232f3e;
      }
      
      .hr_line{
          border-bottom: 1px dashed #37475a;
          border-top: 1px dashed #37475a;
      }
      .marg_t_b_15{
          margin-top: 15px;
          margin-bottom: 15px;
      }
      .hr_line_botm{
          border-bottom: 1px dashed #37475a;
      }
      
      .f_left{
          float:left;
      }
      .f_right{
          float:right;
      }
      
      .fnt_size_12{
          font-size: 12px;
      }
      
      .pad_r_15{
          padding-right: 15px;
      }
      .pad_l_15{
          padding-left: 15px;
      }
      
      .theme_bgclr {
          font-size: 11px !important;
          padding: 3px 12px !important;
        }
      
        .mar_b_30{
          margin-bottom: 30px;
      }
      
      .marg_t_15 {
          margin-top: 15px;
      }
      .date{
        width:7% !important;
      }
      .cwidth{
        width:7% !important;
      }
      .printTable tbody tr td{
        font-size: 11px;
    }
      }
      </style>
      </head>
      <body class="container"  onload="window.print()">` + innerContents + '</html>');
    popupWinindow.document.close();
  }

}
