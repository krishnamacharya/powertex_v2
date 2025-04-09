import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GlobalServiceService } from "../../global-service.service";
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from "@angular/forms";
import { DatePipe } from '@angular/common';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-supplier-po-approval',
  standalone: false,
  templateUrl: './supplier-po-approval.component.html',
  styleUrls: ['./supplier-po-approval.component.scss']
})
export class SupplierPoApprovalComponent implements OnInit {
  loginUserData: any
  productdata: any = []
  supplierdata: any
  pro: any = {}
  page=0;
  requote: boolean = false
  approve: boolean = true
  selectedlist: any = []
  headerdata: any = {}
  shipmentports: any = []
  dischargeports: any = []
  task: any;
  imgUrl: any;
  imagedata: { image: any; userid: any; processes: string; };
  image: any;
  productreviseddata: any = [];
  index: any;
  PUrl: any;
  deliverytermlist: any;
  currencies: any = []
  finalform: any;
  pendingdata: any = [];
today: any;
  constructor(private DatePipe: DatePipe, private globalServicce: GlobalServiceService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) {
    this.imgUrl = this.globalServicce.imageurl;
   }
  uploadImg(task, img, i) {
    this.task = task;
    this.index = i
    this.image = null;
    $("#uploadModal").modal('show');
    if (img != undefined || img != null) {
      $('#preview')
        .attr('src', img)
    } else {
      $('#preview')
        .attr('src', '')
    }

    $('#file')
      .val('');
  }
  getcurrency() {
    this.globalServicce.getDataOnlyWithMethod("sup/currencydrop").subscribe((data) => {
      this.currencies = data;
    });
  }
  uploadImg2() {
    if (this.image != null) {
      this.requote = true;
      this.approve = false;
      this.imagedata = { "image": this.image, "userid": this.loginUserData.user_id, "processes": "import" }
      this.globalServicce.postData(this.imagedata, "ImageUploadView/").subscribe((data: any) => {
        if (this.task == 'd') {
          console.log(this.index)
          this.headerdata.image1 = data.image;
          this.productdata[this.index].poqhid.image1 = '/media' + data.image;
          $('#td1')
            .html('Uploaded');
        } else if (this.task == 'p') {
          console.log(this.index)
          this.headerdata.images2 = data.image;
          this.productdata[this.index].poqhid.images2 = '/media' + data.image;
          $('#td2')
            .html('Uploaded');
        }

      })
    }
  }
  getFileDetails(event) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.image = e.target.result;
        $('#preview')
          .attr('src', e.target.result)
      };
      reader.readAsDataURL(file);
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  }
  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    console.log(this.loginUserData, "logindata")
   this.PUrl = window.location.href.substr(window.location.href.length - 5)
    this.supplierdata = JSON.parse(localStorage.getItem('purchaseorder'));
    console.log(this.supplierdata, "supplierdata")
    this.pro.poamount = this.supplierdata.poamount
    this.pro.description = this.supplierdata.description
    this.pro.description2 = this.supplierdata.description2
    this.pro.description3 = this.supplierdata.description3
    this.pro.payment_terms = this.supplierdata.payment_terms
    this.pro.pino = this.supplierdata.pi_no
    this.pro.pono_ref = this.supplierdata.pono_ref
    this.pro.deliveryterms = this.supplierdata.deliveryterms
    this.pro.deliverytime = this.supplierdata.deliverytime
    this.pro.shipmentport = this.supplierdata.shipmentport
    this.pro.dischargeport = this.supplierdata.dischargeport
    this.pro.pono = this.supplierdata.pono
    this.pro.podate = this.supplierdata.podate
    this.pro.firstname = this.supplierdata.supplierid.first_name
    this.pro.lastname = this.supplierdata.supplierid.userprofiledtl.business_name
    this.pro.address1 = this.supplierdata.supplierid.address1
    this.pro.address2 = this.supplierdata.supplierid.address2
    this.pro.city = this.supplierdata.supplierid.city
    this.pro.email = this.supplierdata.supplierid.email
    this.pro.state = this.supplierdata.supplierid.state
    this.pro.country = this.supplierdata.supplierid.country
    if (this.supplierdata.pidate) {
      this.pro.pidate = this.supplierdata.pidate
    } else {
      this.pro.pidate = this.DatePipe.transform(new Date(), "yyyy-MM-dd");
    }

    this.getcurrency();
    this.getproductsdata()
    this.getshipmentports()
    this.getdischargeports()
    this.getdeliveryterms()
    this.pro.shipmentport = this.supplierdata.shipmentport
    this.pro.dischargeport = this.supplierdata.dischargeport
    this.getpendingdata()
  }
  getproductsdata() {
    this.spinner.show();
    this.globalServicce.getDatawithMethodParams1("sup/poqhdrdata/", this.supplierdata.poqhid).subscribe((data) => {
      this.productdata = data
      // for (let p of this.productdata) {
      //   if (p.productid.long_name) {
      //     // p.product_name = p.productid.long_name + ' ' + p.productid.modelno
      //     p.product_name = p.productid.modelno
      //     p.sub_category = p.productid.name1
      //     // p.product_name = p.mappingid.product_name
      //   }
      //   else {
      //     // p.product_name = p.productid.modelno
      //     // p.product_name = p.mappingid.product_name
      //     p.product_name = p.productid.modelno
      //     p.sub_category = p.productid.name1
      //   }
      // }
      for (var i = 0; i < this.productdata.length; i++) {
        if (this.productdata[i]) {
          this.productdata[i].product_name = this.productdata[i].productid.modelno
          this.productdata[i].sub_category = this.productdata[i].productid.name1
        }
      }
      if (this.productdata.length > 0) {
        this.pro.currency = this.productdata[0].ctype
      }
      console.log(this.productdata, "productdata")
      this.spinner.hide();

    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  };
  keynumber(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  keyfloat(event: any) {
    const pattern = /[.0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  add_disable(attr) {

    let arr = ["product_name", "avl_balance", "twomonthssale", "qty", "purchase_price", "amount"];
    for (let i of arr) {
      if (attr[i] == null || attr[i] == undefined) {

        return true;
      }
    }

    return false;
  }
  supplieradd_disable(attr) {

    let arr = ["productid", "qty", "price", "amount"];
    for (let i of arr) {
      if (attr[i] == null || attr[i] == undefined) {

        return true;
      }
    }

    return false;
  }
  add_disable1(attr) {

    let arr = ["payment_terms", "deliveryterms", "poamount", "shipmentport", "dischargeport", "pino"];
    for (let i of arr) {
      if (attr[i] == null || attr[i] == undefined) {

        return true;
      }
    }

    return false;
  }
  qtychange(product) {

    this.requote = true;
    this.approve = false
    for (let p of this.productdata) {

      if (p.productid.productid == product.productid.productid) {
        p.amount = product.qty * product.price
        if (this.loginUserData.role != 'Admin') {
          p.modified = 1
        }
      }
    }
    console.log(this.productdata, "productdata")
    if (this.productdata.length == 1) {
      this.pro.poamount = this.productdata.filter((item) => item.amount)
        .map((item) => +item.amount).reduce((sum, current) => 0 + current);

    }
    if (this.productdata.length > 1) {
      this.pro.poamount = this.productdata.filter((item) => item.amount)
        .map((item) => +item.amount)
        .reduce((sum, current) => sum + current);
    }


  }

  productslist: any = []
  selecteditems(event, product) {


    if (event.target.checked == false) {
      for (let s in this.selectedlist) {
        if (this.selectedlist[s].productid == product.productid.productid) {
          this.selectedlist.splice(s, 1)
        }
        console.log(this.selectedlist)
      }

    }
    else {
      if (product.design == 0) {
        product.design = false
      }
      else {
        product.design = true
      }
      if (product.packing == 0) {
        product.packing = false
      }
      else {
        product.packing = true
      }

      this.selectedlist.push({
        productid: product.productid.productid,
        aviqty: product.aviqty,
        mothsqty: product.mothsqty,
        qty: JSON.parse(product.qty),
        price: JSON.parse(product.price),
        ctype: product.ctype,
        amount: JSON.parse(product.amount),
        // detailid,
        design: product.design,
        packing: product.packing,
        mappingid: product.mappingid.mappingid,
      })


      // this.selectedlist.push(this.productslist)
      console.log(this.selectedlist, "selectedlist")

    }
    if (this.selectedlist.length == 1) {
      this.pro.poamount = this.selectedlist.filter((item) => item.amount)
        .map((item) => +item.amount).reduce((sum, current) => 0 + current);

    }
    if (this.selectedlist.length > 1) {
      this.pro.poamount = this.selectedlist.filter((item) => item.amount)
        .map((item) => +item.amount)
        .reduce((sum, current) => sum + current);
    }
    if (this.selectedlist.length == 0) {
      this.pro.poamount = ""
    }
  }
  getshipmentports() {
    this.globalServicce.getDataOnlyWithMethod("sup/shipmentport").subscribe((data) => {
      this.shipmentports = data;
      // for(let p of this.shipmentports){
      //   if(this.supplierdata.shipmentport==p){
      //     this.pro.shipment_port=p
      //   }
      // }
      // this.getports()
    });

  }
  getdischargeports() {
    this.globalServicce.getDataOnlyWithMethod("sup/dischargeport").subscribe((data) => {
      this.dischargeports = data;
    });

  }
  getdeliveryterms() {
    this.globalServicce.getDatawithInput_id(15.2).subscribe((data) => {
      this.deliverytermlist = data;
    });
  }
  onSubmit(form: NgForm) {
    $("#confirmModal").modal('show');
    this.finalform = form
  }
  confirmmodal() {
    this.atributesData(this.finalform);
  }
  methodname: any
  body: any
  podata: any
  atributesData(form) {
    for (let product of this.productdata) {
      if (product.design == 0) {
        product.design = false
      }
      else {
        product.design = true
      }
      if (product.packing == 0) {
        product.packing = false
      }
      else {
        product.packing = true
      }
      if (this.loginUserData.role == 'Admin') {
        this.selectedlist.push({
          productid: product.productid.productid,
          aviqty: product.aviqty,
          mothsqty: product.mothsqty,
          qty: JSON.parse(product.qty),
          price: JSON.parse(product.price),
          ctype: product.ctype,
          amount: JSON.parse(product.amount),
          design: product.design,
          packing: product.packing,
          mappingid: product.mappingid.mappingid

        })
      }
      else {
        this.selectedlist.push({
          productid: product.productid.productid,
          aviqty: product.aviqty,
          mothsqty: product.mothsqty,
          qty: JSON.parse(product.qty),
          price: JSON.parse(product.price),
          ctype: product.ctype,
          amount: JSON.parse(product.amount),
          design: product.design,
          packing: product.packing,
          modified: product.modified,
          mappingid: product.mappingid.mappingid,
        })
      }

      console.log(this.selectedlist, "selectedlist")
    }

    // if(this.selectedlist.length==1){
    //   this.pro.poamount = this.selectedlist.filter((item) => item.amount)
    //       .map((item) => +item.amount).reduce((sum, current) => 0 + current);

    //   }
    // if(this.selectedlist.length>1){
    // this.pro.poamount = this.selectedlist.filter((item) => item.amount)
    //     .map((item) => +item.amount)
    //     .reduce((sum, current) => sum + current);
    // }

    this.headerdata.noofitems = this.supplierdata.noofitems
    this.headerdata.supplierid = this.supplierdata.supplierid.user_id
    this.headerdata.payment_terms = this.pro.payment_terms
    this.headerdata.pi_no = this.pro.pino
    if (this.supplierdata.pono_ref) {
      this.headerdata.pono_ref = this.supplierdata.pono_ref
    }
    if (this.pro.pidate) {
      this.headerdata.pidate = this.DatePipe.transform(this.pro.pidate, "yyyy-MM-dd");
    }
    this.headerdata.deliveryterms = this.pro.deliveryterms
    this.headerdata.deliverytime = this.pro.deliverytime
    this.headerdata.poamount = this.pro.poamount
    if (this.requote == true || this.loginUserData.user_type == 'supplier') {
      this.headerdata.pono = this.supplierdata.pono
    } else
      if (this.approve == true || this.loginUserData.user_type == 'Admin') {
        this.headerdata.pono = this.supplierdata.pono
        this.headerdata.poqhid = this.supplierdata.poqhid
      }
      else {
        this.headerdata.poqhid = this.supplierdata.poqhid
      }
    this.headerdata.description = this.pro.description
    this.headerdata.description2 = this.pro.description2
    this.headerdata.description3 = this.pro.description3
    this.headerdata.shipmentport = this.pro.shipmentport
    this.headerdata.dischargeport = this.pro.dischargeport
    this.body = { "json_hdr": this.headerdata, "json_dtl": this.selectedlist, "userdata": this.loginUserData };
    console.log("body", this.body)
    this.spinner.show();
    this.methodname = "sup/quote/"
    this.globalServicce.postData(this.body, this.methodname).subscribe((data) => {
      this.spinner.hide();
      this.podata = data
      console.log(data);
      if (data['msg'] == 'sucesses' || data['msg'] == 'approved sucesses') {
        $("#successModal").modal('show');
        localStorage.setItem("supplierpodata", JSON.stringify(this.podata))

      }
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      })

  }
  updatemodal() {
    if (this.loginUserData.role == 'Admin') {
      this.route.navigateByUrl('Supplier-PO Print');
    }
    else {
      this.route.navigateByUrl('Supplier-PO Print');
    }
  }
  getports() {
    $(function () {
      // load datalist into memory
      var dl = "";
      $("#orderTypes option").each(function () {
        dl += "<div class='dlOption'>" + $(this).val() + "</div>";
      });
      $("#helper").html(dl);
      $("#helper").width($("#dlInput").width());

      $(document).on("click", "#dlInput", function () {
        // display list if it has value
        var lv = $("#dlInput").val();
        if (lv.length) {
          var os = $("#dlInput").offset();
          $("#orderTypes").attr("id", "orderTypesHide");
          $("#helper").show();
        }
      });

      $(document).on("click", ".dlOption", function () {
        $("#dlInput").val($(this).html());
        $("#helper").hide();
      });

      $(document).on("change", "#dlInput", function () {
        if ($(this).val() === "") {
          $("#orderTypesHide").attr("id", "orderTypes");
          $("#helper").hide();
        }
      });


    });
  }
  viewMore(product: any) {
    this.spinner.show();
    this.globalServicce.getDatawithMethodParams2("sup/get_product_details", this.pro.pono_ref, product.productid.productid).subscribe((data) => {
      this.productreviseddata = data
      // console.log(data, "invs")
      this.spinner.hide();
      $('#viewproductModal').modal('show');
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
  }
  onSelect(currency) {
    this.productdata.map((e) => {
      e.ctype = currency
    })
    this.requote = true;
    this.approve = false;
  }
  getpendingdata() {
    this.globalServicce.getcheckdata("sup/getsupoutstanding/",this.loginUserData.user_id).subscribe((data) => {
      this.pendingdata = data;
    });
  }
  PICopyUpload(evt: any): void {
    // alert("hii");
    this.uploadAttrfile = evt.target.files[0].name;
    this.onFileChange(evt.target, 'picopy');
  };
  // imagedata: any
  response: any
  jsondata: any
  file: File
  uploadAttrfile: any;
  onFileChange(evt: any, data) {
    this.file = evt.files[0]
    var reader = new FileReader();
    reader.onload = (e: any) => {
      if (data == "picopy") {
        this.jsondata = e.target.result
        console.log("json", this.jsondata);
        this.uploadpi()
      }
    };

    reader.readAsDataURL(this.file);
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  uploadpi() {
    this.methodname = "FileUploadView/";
    this.imagedata = { "image": this.jsondata, "userid": this.loginUserData.user_id, "processes": "import" }
    this.globalServicce.postData(this.imagedata, this.methodname).subscribe((data) => {
      this.response = data;
      this.headerdata.picopy = this.response.image
    })
  }
}
