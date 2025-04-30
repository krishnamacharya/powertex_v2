import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { WishListwhPendingPackingMoreinfoComponent } from './wish-listwh-pending-packing-moreinfo/wish-listwh-pending-packing-moreinfo.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AccStatusComponent } from './accountant/acc-status/acc-status.component';
import { ChequeDetailsformComponent } from './accountant/cheque-detailsform/cheque-detailsform.component';
import { GetProformaListComponent } from './accountant/get-proforma-list/get-proforma-list.component';
import { InvoicePreviewComponent } from './accountant/invoice-preview/invoice-preview.component';
import { InvoicePrintComponent } from './accountant/invoice-print/invoice-print.component';
import { MakeInvoiceComponent } from './accountant/make-invoice/make-invoice.component';
import { OutstandingPositiondetailComponent } from './accountant/outstanding-positiondetail/outstanding-positiondetail.component';
import { ReceivedPaymentsComponent } from './accountant/received-payments/received-payments.component';
import { AdminPendingInvoiceListComponent } from './admin-pending-invoice-list/admin-pending-invoice-list.component';
import { AdminPendingPackingListPrintComponent } from './admin-pending-packing-list-print/admin-pending-packing-list-print.component';
import { AdminReportComponent } from './admin-report/admin-report.component';
import { ActiveUsersComponent } from './admin-views/active-users/active-users.component';
import { AdminConsolidatePackingComponent } from './admin-views/admin-consolidate-packing/admin-consolidate-packing.component';
import { AdminFeedbackComponent } from './admin-views/admin-feedback/admin-feedback.component';
import { AdminPaymentsComponent } from './admin-views/admin-payments/admin-payments.component';
import { AdminPendingPackingListComponent } from './admin-views/admin-pending-packing-list/admin-pending-packing-list.component';
import { AdminPieditComponent } from './admin-views/admin-piedit/admin-piedit.component';
import { AdminProductListComponent } from './admin-views/admin-product-list/admin-product-list.component';
import { AdminProformaInvoiceComponent } from './admin-views/admin-proforma-invoice/admin-proforma-invoice.component';
import { AdminSupplierLedgerPrintComponent } from './admin-views/admin-supplier-ledger-print/admin-supplier-ledger-print.component';
import { AdminSupplierLedgerComponent } from './admin-views/admin-supplier-ledger/admin-supplier-ledger.component';
import { AdminTrackReportPrintComponent } from './admin-views/admin-track-report-print/admin-track-report-print.component';
import { AdminTrackReportComponent } from './admin-views/admin-track-report/admin-track-report.component';
import { AdminonportSummaryPrintComponent } from './admin-views/adminonport-summary-print/adminonport-summary-print.component';
import { AdminonportSummaryComponent } from './admin-views/adminonport-summary/adminonport-summary.component';
import { AnalyticsReportsComponent } from './admin-views/analytics-reports/analytics-reports.component';
import { ChaChargesReportPrintComponent } from './admin-views/cha-charges-report-print/cha-charges-report-print.component';
import { ChaChargesReportComponent } from './admin-views/cha-charges-report/cha-charges-report.component';
import { ChaPaymentsComponent } from './admin-views/cha-payments/cha-payments.component';
import { ConsolidatePiComponent } from './admin-views/consolidate-pi/consolidate-pi.component';
import { DealerPaymentsComponent } from './admin-views/dealer-payments/dealer-payments.component';
import { DoclistPrintComponent } from './admin-views/doclist-print/doclist-print.component';
import { DutyPaidReportPrintComponent } from './admin-views/duty-paid-report-print/duty-paid-report-print.component';
import { DutyPaidReportComponent } from './admin-views/duty-paid-report/duty-paid-report.component';
import { EndCustomerListComponent } from './admin-views/end-customer-list/end-customer-list.component';
import { FaqCreationComponent } from './admin-views/faq-creation/faq-creation.component';
import { GenerateInvoiceComponent } from './admin-views/generate-invoice/generate-invoice.component';
import { InternalUserEditComponent } from './admin-views/internal-user-edit/internal-user-edit.component';
import { InternalUsersListComponent } from './admin-views/internal-users-list/internal-users-list.component';
import { InternalUsersComponent } from './admin-views/internal-users/internal-users.component';
import { InvoicePaymentsComponent } from './admin-views/invoice-payments/invoice-payments.component';
import { MarketDealersalesReportsprintComponent } from './admin-views/market-dealersales-reportsprint/market-dealersales-reportsprint.component';
import { MasterDataUploadComponent } from './admin-views/master-data-upload/master-data-upload.component';
import { MasterProductListComponent } from './admin-views/master-product-list/master-product-list.component';
import { MasterDelaerShopeeComponent } from './admin-views/masters-company/master-delaer-shopee/master-delaer-shopee.component';
import { MastersCompanyComponent } from './admin-views/masters-company/masters-company.component';
import { MinmumOrderQtyPrintComponent } from './admin-views/minmum-order-qty-print/minmum-order-qty-print.component';
import { MinmumOrderQtyComponent } from './admin-views/minmum-order-qty/minmum-order-qty.component';
import { NewArrivalsComponent } from './admin-views/new-arrivals/new-arrivals.component';
import { NotificationsComponent } from './admin-views/notifications/notifications.component';
import { OffersDiscountsComponent } from './admin-views/offers-discounts/offers-discounts.component';
import { OpeningBalanceComponent } from './admin-views/opening-balance/opening-balance.component';
import { OrderPlanningComponent } from './admin-views/order-planning/order-planning.component';
import { OutstandingClearancePaymentComponent } from './admin-views/outstanding-clearance-payment/outstanding-clearance-payment.component';
import { PackingBeforeinvoiceComponent } from './admin-views/packing-beforeinvoice/packing-beforeinvoice.component';
import { PackingListSupplierComponent } from './admin-views/packing-list-supplier/packing-list-supplier.component';
import { PaymentDiscountsComponent } from './admin-views/payment-discounts/payment-discounts.component';
import { PaymentsPendingPrintComponent } from './admin-views/payments-pending-print/payments-pending-print.component';
import { PendingDutyListPrintComponent } from './admin-views/pending-duty-list-print/pending-duty-list-print.component';
import { PendingDutyListComponent } from './admin-views/pending-duty-list/pending-duty-list.component';
import { PendingGeneratedInvoiceComponent } from './admin-views/pending-generated-invoice/pending-generated-invoice.component';
import { PendingOrdersComponent } from './admin-views/pending-orders/pending-orders.component';
import { PiStatusComponent } from './admin-views/pi-status/pi-status.component';
import { PortwiseProductsPrintComponent } from './admin-views/portwise-products-print/portwise-products-print.component';
import { PortwiseProductsComponent } from './admin-views/portwise-products/portwise-products.component';
import { PriceChangePoListComponent } from './admin-views/price-change-po-list/price-change-po-list.component';
import { PrintReportComponent } from './admin-views/print-report/print-report.component';
import { PrivelagesComponent } from './admin-views/privelages/privelages.component';
import { ProductMappingComponent } from './admin-views/product-mapping/product-mapping.component';
import { ProductPricingComponent } from './admin-views/product-pricing/product-pricing.component';
import { PromocodesCreationComponent } from './admin-views/promocodes-creation/promocodes-creation.component';
import { RegisterProfileInfoComponent } from './admin-views/register-profile-info/register-profile-info.component';
import { RegisterProfileComponent } from './admin-views/register-profile/register-profile.component';
import { SalesVsPurchaseComponent } from './admin-views/sales-vs-purchase/sales-vs-purchase.component';
import { SchemesComponent } from './admin-views/schemes/schemes.component';
import { SupplierOrderSummaryComponent } from './admin-views/supplier-order-summary/supplier-order-summary.component';
import { SupplierPaidlistPrintComponent } from './admin-views/supplier-paidlist-print/supplier-paidlist-print.component';
import { SupplierPaymentListComponent } from './admin-views/supplier-payment-list/supplier-payment-list.component';
import { SupplierPendingPaymentsComponent } from './admin-views/supplier-pending-payments/supplier-pending-payments.component';
import { SupplierPurchaseOrderComponent } from './admin-views/supplier-purchase-order/supplier-purchase-order.component';
import { SupplierRegistrationComponent } from './admin-views/supplier-registration/supplier-registration.component';
import { SupplierReportsComponent } from './admin-views/supplier-reports/supplier-reports.component';
import { SupplierUsersComponent } from './admin-views/supplier-users/supplier-users.component';
import { TransportMasterComponent } from './admin-views/transport-master/transport-master.component';
import { UpcomingProductsComponent } from './admin-views/upcoming-products/upcoming-products.component';
import { UsersListComponent } from './admin-views/users-list/users-list.component';
import { UsersReviewsComponent } from './admin-views/users-reviews/users-reviews.component';
import { AdminchaledgerComponent } from './adminchaledger/adminchaledger.component';
import { AdminchaledgerprintComponent } from './adminchaledgerprint/adminchaledgerprint.component';
import { AllDealerpoFromOneUserComponent } from './all-dealerpo-from-one-user/all-dealerpo-from-one-user.component';
import { RegisterComponent } from './authentication-views/register-step1/register.component';
import { BeEntryComponent } from './be-entry/be-entry.component';
import { BlDetailsPrintComponent } from './bl-details-print/bl-details-print.component';
import { BlDetailsComponent } from './bl-details/bl-details.component';
import { BranchManagerStatusComponent } from './branch-manager/branch-manager-status/branch-manager-status.component';
import { DealerShopeeComponent } from './branch-manager/dealer-shopee/dealer-shopee.component';
import { BrandsComponent } from './brands/brands.component';
import { CarrersComponent } from './carrers/carrers.component';
import { CategoryAllComponent } from './category-all/category-all.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { ChaCorrectionComponent } from './cha-correction/cha-correction.component';
import { ChaInvoiceComponent } from './cha-invoice/cha-invoice.component';
import { ChaReportsComponent } from './cha-reports/cha-reports.component';
import { ChaledgerComponent } from './chaledger/chaledger.component';
import { ChaledgerprintComponent } from './chaledgerprint/chaledgerprint.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CorrectionComponent } from './correction/correction.component';
import { CustomerLedgerPrintComponent } from './customer-ledger-print/customer-ledger-print.component';
import { CustomerPoPrintComponent } from './customer-po-print/customer-po-print.component';
import { CustomergridviewComponent } from './customergridview/customergridview.component';
import { DealerNewArrivalsComponent } from './dealer-new-arrivals/dealer-new-arrivals.component';
import { DealerProductListComponent } from './dealer-product-list/dealer-product-list.component';
import { AvailablePromocodesComponent } from './dealer/available-promocodes/available-promocodes.component';
import { CatalogueComponent } from './dealer/catalogue/catalogue.component';
import { DealerOffersComponent } from './dealer/dealer-offers/dealer-offers.component';
import { DealerOrdersComponent } from './dealer/dealer-orders/dealer-orders.component';
import { DealerProductdataUploadComponent } from './dealer/dealer-productdata-upload/dealer-productdata-upload.component';
import { DealerStatusComponent } from './dealer/dealer-status/dealer-status.component';
import { GrnStatusPrintComponent } from './dealer/dealer-status/grn-status-print/grn-status-print.component';
import { DealersOutstandingComponent } from './dealer/dealers-outstanding/dealers-outstanding.component';
import { DiscountsComponent } from './dealer/discounts/discounts.component';
import { GoodsReceiptDetailComponent } from './dealer/goods-receipt-detail/goods-receipt-detail.component';
import { GoodsReceiptNotePrintComponent } from './dealer/goods-receipt-note-print/goods-receipt-note-print.component';
import { GoodsReceiptNoteComponent } from './dealer/goods-receipt-note/goods-receipt-note.component';
import { PaymentHistoryComponent } from './dealer/payment-history/payment-history.component';
import { PendingDealersComponent } from './dealer/pending-dealers/pending-dealers.component';
import { PoHistoryComponent } from './dealer/po-history/po-history.component';
import { ProductlistDisplayComponent } from './dealer/productlist-display/productlist-display.component';
import { SchemasComponent } from './dealer/schemas/schemas.component';
import { DealersOutstandingPrintComponent } from './dealers-outstanding-print/dealers-outstanding-print.component';
import { FestivalMultipleSmsComponent } from './festival-multiple-sms/festival-multiple-sms.component';
import { FestivalSmsComponent } from './festival-sms/festival-sms.component';
import { GenerateInvoicePrintComponent } from './generate-invoice-print/generate-invoice-print.component';
import { FaqComponent } from './home/faq/faq.component';
import { PrivacyComponent } from './home/privacy/privacy.component';
import { InvoiceDocumentsComponent } from './invoice-documents/invoice-documents.component';
import { InvoicePrint2Component } from './invoice-print2/invoice-print2.component';
import { InvoiceProformaInvoiceComponent } from './invoice-proforma-invoice/invoice-proforma-invoice.component';
import { InvoicedocumentchaprintComponent } from './invoicedocumentchaprint/invoicedocumentchaprint.component';
import { DealerRegistrationComponent } from './marketing-manager/dealer-registration/dealer-registration.component';
import { MonthlySMSComponent } from './monthly-sms/monthly-sms.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { NotificationStatusComponent } from './notification-status/notification-status.component';
import { OnlinePurchaseComponent } from './online-purchase/online-purchase.component';
import { OnportSummaryComponent } from './onport-summary/onport-summary.component';
import { OnportsummaryprintComponent } from './onportsummaryprint/onportsummaryprint.component';
import { OutstandingDiscountPrintComponent } from './outstanding-discount-print/outstanding-discount-print.component';
import { OutstandingDiscountComponent } from './outstanding-discount/outstanding-discount.component';
import { OutstandingListPrintComponent } from './outstanding-list-print/outstanding-list-print.component';
import { OutstandingListComponent } from './outstanding-list/outstanding-list.component';
import { PaymentfailureComponent } from './paymentfailure/paymentfailure.component';
import { PaymentsHistoryPrintComponent } from './payments-history-print/payments-history-print.component';
import { PaymentsHistoryComponent } from './payments-history/payments-history.component';
import { PaymentsuccessfullComponent } from './paymentsuccessfull/paymentsuccessfull.component';
import { PendingInvoicesPrintComponent } from './pending-invoices-print/pending-invoices-print.component';
import { PendingInvoicesComponent } from './pending-invoices/pending-invoices.component';
import { PendingSupplierPaymentsPrintComponent } from './pending-supplier-payments-print/pending-supplier-payments-print.component';
import { PendingpiregisterComponent } from './pendingpiregister/pendingpiregister.component';
import { PendingpiregisterprintComponent } from './pendingpiregisterprint/pendingpiregisterprint.component';
import { PosPrintComponent } from './pos/pos-print/pos-print.component';
import { PosUsersComponent } from './pos/pos-users/pos-users.component';
import { ProdCatgegoryComponent } from './prod-catgegory/prod-catgegory.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductIdentificationComponent } from './product-identification/product-identification.component';
import { GenerateImportGrnComponent } from './product-manager/generate-import-grn/generate-import-grn.component';
import { ImportGrnComponent } from './product-manager/import-grn/import-grn.component';
import { ImportInvoicePrintComponent } from './product-manager/import-invoice-print/import-invoice-print.component';
import { ImportInvoiceComponent } from './product-manager/import-invoice/import-invoice.component';
import { ImportMakeInvoiceComponent } from './product-manager/import-make-invoice/import-make-invoice.component';
import { ImportPoPrintComponent } from './product-manager/import-po-print/import-po-print.component';
import { ImportPoComponent } from './product-manager/import-po/import-po.component';
import { PmStatusComponent } from './product-manager/pm-status/pm-status.component';
import { ProductMenuComponent } from './product-menu/product-menu.component';
import { ProductMenu2Component } from './product-menu2/product-menu2.component';
import { ProductSalesReportComponent } from './product-sales-report/product-sales-report.component';
import { ProductWisePurchasePrintComponent } from './product-wise-purchase-print/product-wise-purchase-print.component';
import { QuotationPrintComponent } from './quotation-print/quotation-print.component';
import { QuotationComponent } from './quotation/quotation.component';
import { ReportsPackingPrintComponent } from './reports-packing-print/reports-packing-print.component';
import { ReturnProductsComponent } from './return-products/return-products.component';
import { SalesReturnReportComponent } from './sales-return-report/sales-return-report.component';
import { SampleComponent } from './sample/sample.component';
import { SearchListComponent } from './search-list/search-list.component';
import { SeeinvoiceListPrintComponent } from './seeinvoice-list-print/seeinvoice-list-print.component';
import { SeeinvoiceListComponent } from './seeinvoice-list/seeinvoice-list.component';
import { SeepackingListPrintComponent } from './seepacking-list-print/seepacking-list-print.component';
import { SeepackingListComponent } from './seepacking-list/seepacking-list.component';
import { SeependingpoListPrintComponent } from './seependingpo-list-print/seependingpo-list-print.component';
import { SeependingpoListComponent } from './seependingpo-list/seependingpo-list.component';
import { StepperComponent } from './stepper/stepper.component';
import { StoreLocationComponent } from './store-location/store-location.component';
import { SubbComponent } from './subb/subb.component';
import { OrdersApprovalComponent } from './super-admin/orders-approval/orders-approval.component';
import { SupplierConsolidatePackingComponent } from './supplier-consolidate-packing/supplier-consolidate-packing.component';
import { SupplierFeedbackComponent } from './supplier-feedback/supplier-feedback.component';
import { SupplierInvoicesSupplierPrintComponent } from './supplier-invoices-supplier-print/supplier-invoices-supplier-print.component';
import { SupplierLedgerPrintComponent } from './supplier-ledger-print/supplier-ledger-print.component';
import { SupplierPendingPaymentsPrintComponent } from './supplier-pending-payments-print/supplier-pending-payments-print.component';
import { SupplierRevisedPiListComponent } from './supplier-revised-pi-list/supplier-revised-pi-list.component';
import { ChaprintComponent } from './supplier/chaprint/chaprint.component';
import { GeneratedSupplierInvoicesComponent } from './supplier/generated-supplier-invoices/generated-supplier-invoices.component';
import { GroupInvoiceComponent } from './supplier/group-invoice/group-invoice.component';
import { InvoiceEditComponent } from './supplier/invoice-edit/invoice-edit.component';
import { InvoiceFileUploadsComponent } from './supplier/invoice-file-uploads/invoice-file-uploads.component';
import { InvoiceslistComponent } from './supplier/invoiceslist/invoiceslist.component';
import { OrderSummaryComponent } from './supplier/order-summary/order-summary.component';
import { PendingSupplierPaymentsComponent } from './supplier/pending-supplier-payments/pending-supplier-payments.component';
import { PieditComponent } from './supplier/piedit/piedit.component';
import { PrintInvoiceComponent } from './supplier/print-invoice/print-invoice.component';
import { SupSummaryPrintComponent } from './supplier/sup-summary-print/sup-summary-print.component';
import { SupplierGeneratedinvoicesComponent } from './supplier/supplier-generatedinvoices/supplier-generatedinvoices.component';
import { SupplierInvoiceListComponent } from './supplier/supplier-invoice-list/supplier-invoice-list.component';
import { SupplierInvoicePrintComponent } from './supplier/supplier-invoice-print/supplier-invoice-print.component';
import { SupplierInvoiceProfomaComponent } from './supplier/supplier-invoice-profoma/supplier-invoice-profoma.component';
import { SupplierInvoicesListComponent } from './supplier/supplier-invoices-list/supplier-invoices-list.component';
import { SupplierInvoicesComponent } from './supplier/supplier-invoices/supplier-invoices.component';
import { SupplierLedgerComponent } from './supplier/supplier-ledger/supplier-ledger.component';
import { SupplierOutstandingAmountComponent } from './supplier/supplier-outstanding-amount/supplier-outstanding-amount.component';
import { SupplierPackingListComponent } from './supplier/supplier-packing-list/supplier-packing-list.component';
import { SupplierPackinglistPrintComponent } from './supplier/supplier-packinglist-print/supplier-packinglist-print.component';
import { SupplierPendingDoclistComponent } from './supplier/supplier-pending-doclist/supplier-pending-doclist.component';
import { SupplierPoApprovalComponent } from './supplier/supplier-po-approval/supplier-po-approval.component';
import { SupplierPoHistoryComponent } from './supplier/supplier-po-history/supplier-po-history.component';
import { SupplierPoListComponent } from './supplier/supplier-po-list/supplier-po-list.component';
import { SupplierPoPrintComponent } from './supplier/supplier-po-print/supplier-po-print.component';
import { SupplierProductListComponent } from './supplier/supplier-product-list/supplier-product-list.component';
import { SupplierProfileEditComponent } from './supplier/supplier-profile-edit/supplier-profile-edit.component';
import { SupplierProformaInvoiceComponent } from './supplier/supplier-proforma-invoice/supplier-proforma-invoice.component';
import { SupplierReportsSupplierComponent } from './supplier/supplier-reports-supplier/supplier-reports-supplier.component';
import { TargetComponent } from './target/target.component';
import { TrackReportPrintComponent } from './track-report-print/track-report-print.component';
import { TrackReportComponent } from './track-report/track-report.component';
import { TransitregisterComponent } from './transitregister/transitregister.component';
import { TransitregisterprintComponent } from './transitregisterprint/transitregisterprint.component';
import { TransportChargesComponent } from './transport-charges/transport-charges.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { ChallanPrintComponent } from './wh-manager/challan-print/challan-print.component';
import { CustomerDcDetailsComponent } from './wh-manager/customer-dc-details/customer-dc-details.component';
import { GetChallanListComponent } from './wh-manager/get-challan-list/get-challan-list.component';
import { MakeChallanComponent } from './wh-manager/make-challan/make-challan.component';
import { MakePackingListComponent } from './wh-manager/make-packing-list/make-packing-list.component';
import { PackingListPrintComponent } from './wh-manager/packing-list-print/packing-list-print.component';
import { PackingListComponent } from './wh-manager/packing-list/packing-list.component';
import { PackinglistMergedComponent } from './wh-manager/packinglist-merged/packinglist-merged.component';
import { PodataComponent } from './wh-manager/podata/podata.component';
import { PurchaseOrderPrintComponent } from './wh-manager/purchase-order-print/purchase-order-print.component';
import { WhPendingPackingListComponent } from './wh-pending-packing-list/wh-pending-packing-list.component';
import { PodataPrintComponent } from './wh-manager/podata-print/podata-print.component';
import { StockAcceptanceComponent } from './wh-manager/stock-acceptance/stock-acceptance.component';
import { WhReportsComponent } from './wh-manager/wh-reports/wh-reports.component';
import { WhStatusComponent } from './wh-manager/wh-status/wh-status.component';
import { WhModalComponent } from './wh-manager/wh-stock/wh-modal/wh-modal.component';
import { WhStockComponent } from './wh-manager/wh-stock/wh-stock.component';
import { WhSubcatgComponent } from './wh-manager/wh-stock/wh-subcatg/wh-subcatg.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  { path: "wh-pending-packing-moreinfo", component: WishListwhPendingPackingMoreinfoComponent },

  
  { path: "about-us", component: AboutUsComponent },
  { path: "carrers", component: CarrersComponent },
  { path: "contact-us", component: ContactUsComponent },
  { path: "faq", component: FaqComponent },
  { path: "privacy", component: PrivacyComponent },
  { path: "product", component: ProductMenuComponent },
  { path: "sample", component: SampleComponent },
  { path: "store-location", component: StoreLocationComponent },
  { path: "category/:search", component: CategoryListComponent },
  { path: "category/:b/:c/:d/:e", component: CategoryListComponent },
  // { path: "category/:b/:c/:d/:e", component: CategoryListComponent },
  { path: "category/:b/:c/:d/:e/:br", component: CategoryListComponent },
  { path: "category/:prof", component: CategoryListComponent },
  { path: "product-detail/:productid", component: ProductDetailComponent },
  { path: 'customer-order-print', component: CustomerPoPrintComponent, canActivate: [AuthGuard] },
  { path: 'paymentfailure', component: PaymentfailureComponent },
  { path: 'paymentsuccessfull', component: PaymentsuccessfullComponent },
  { path: "Brands/:b/:c", component: BrandsComponent },
  { path: "Brands/:b", component: BrandsComponent },

  //Registered Customer-User
  // { path: "wishlist", component: WishListComponent, canActivate: [AuthGuard] },
  { path: "wishlist", component: ViewCartComponent, canActivate: [AuthGuard] },
  { path: "viewcart", component: ViewCartComponent, canActivate: [AuthGuard] },
  // { path: "viewcart", component: ViewCartComponent },
  { path: "myOrders", component: MyOrdersComponent },

  //online
  { path: "OnlinePurchase", component: OnlinePurchaseComponent, canActivate: [AuthGuard] },
  //branch Manager

  //warehouse manager
  { path: "Warehouse Manager-STOCK", component: WhStockComponent, canActivate: [AuthGuard] },
  { path: "Warehouse Manager-DC DETAILS", component: PackingListComponent, canActivate: [AuthGuard] },
  { path: "Warehouse Manager-PACKING HISTORY", component: WhStatusComponent, canActivate: [AuthGuard] },
  { path: "Warehouse Manager-TRANSPORT DETAILS", component: GetChallanListComponent, canActivate: [AuthGuard] },
  { path: "Warehouse Manager-REPORTS", component: WhReportsComponent, canActivate: [AuthGuard] },
  { path: "Warehouse Manager-MERGEPODATA", component: PodataComponent, canActivate: [AuthGuard] },
  { path: "Warehouse Manager-PENDING PACKING LIST", component: WhPendingPackingListComponent },
  { path: "DCdetailprint", component: PodataPrintComponent, canActivate: [AuthGuard] },
  { path: "Warehouse Manager-PACKINGLIST", component: PackinglistMergedComponent, canActivate: [AuthGuard] },
  { path: "wh-stock", component: WhStockComponent, canActivate: [AuthGuard] },
  { path: "Warehouse Manager-Customer DC Details", component: CustomerDcDetailsComponent, canActivate: [AuthGuard] },
  { path: "Warehouse Manager-STOCK-ACCEPTANCE", component: StockAcceptanceComponent, canActivate: [AuthGuard] },


  //Admin
  { path: "AdminReport", component: AdminReportComponent, canActivate: [AuthGuard] },
  { path: "Admin-INTERNAL USERS", component: InternalUsersComponent, canActivate: [AuthGuard] },
  { path: "Admin-ACTIVE DEALERS", component: ActiveUsersComponent, canActivate: [AuthGuard] },
  { path: "internal-user-edit", component: InternalUserEditComponent, canActivate: [AuthGuard] },
  { path: "Admin-COMPANY MASTER", component: MastersCompanyComponent, canActivate: [AuthGuard] },
  { path: "Admin-EXTERNAL USERS", component: UsersListComponent, canActivate: [AuthGuard] },
  { path: "Admin-PRODUCT MASTER", component: MasterDataUploadComponent, canActivate: [AuthGuard] },
  { path: "Admin-USER REVIEWS", component: UsersReviewsComponent, canActivate: [AuthGuard] },
  { path: "Admin-SHOPEE SETUP", component: MastersCompanyComponent, canActivate: [AuthGuard] },
  { path: "Admin-BRANCH SETUP", component: MastersCompanyComponent, canActivate: [AuthGuard] },
  { path: "Admin-MAIN BRANCH SETUP", component: MastersCompanyComponent, canActivate: [AuthGuard] },
  { path: "Admin-PRODUCTS LIST", component: MasterProductListComponent, canActivate: [AuthGuard] },
  { path: "Admin-STATUS", component: BranchManagerStatusComponent, canActivate: [AuthGuard] },
  { path: 'Explore-users', component: MasterDelaerShopeeComponent, canActivate: [AuthGuard] },
  { path: "Admin-REPORTS", component: AdminReportComponent, canActivate: [AuthGuard] },
  { path: "Admin-OFFERS", component: OffersDiscountsComponent, canActivate: [AuthGuard] },
  { path: "Admin-SCHEMES", component: SchemesComponent, canActivate: [AuthGuard] },
  { path: "privelages", component: PrivelagesComponent, canActivate: [AuthGuard] },
  { path: "Admin-PROMOCODES", component: PromocodesCreationComponent, canActivate: [AuthGuard] },
  { path: "Admin-ANALYTICS REPORTS", component: AnalyticsReportsComponent, canActivate: [AuthGuard] },
  { path: "Admin-FAQ", component: FaqCreationComponent, canActivate: [AuthGuard] },
  { path: "Admin-UPCOMING PRODUCTS", component: UpcomingProductsComponent, canActivate: [AuthGuard] },
  { path: "Admin-PRICE CHANGE PO LIST", component: PriceChangePoListComponent, canActivate: [AuthGuard] },
  { path: "Admin-TRANSPORT MASTER", component: TransportMasterComponent, canActivate: [AuthGuard] },
  { path: "Admin-CUSTOMER OPENING BALANCE", component: OpeningBalanceComponent, canActivate: [AuthGuard] },
  { path: "Admin-End Customer-List", component: EndCustomerListComponent, canActivate: [AuthGuard] },
  { path: "Admin-Supplier-ledger", component: AdminSupplierLedgerComponent, canActivate: [AuthGuard] },
  { path: "admin-supplier-ledger-print", component: AdminSupplierLedgerPrintComponent, canActivate: [AuthGuard] },
  { path: "Supplier-Pending-Payments", component: SupplierPendingPaymentsComponent, canActivate: [AuthGuard] },
  { path: "Supplier-Pending-Payments-Print", component: SupplierPendingPaymentsPrintComponent, canActivate: [AuthGuard] },
  { path: "Supplier-Payment-list", component: SupplierPaymentListComponent, canActivate: [AuthGuard] },
  { path: "Supplier-Reports", component: SupplierReportsComponent, canActivate: [AuthGuard] },
  { path: "Pending-Duty-List", component: PendingDutyListComponent, canActivate: [AuthGuard] },
  { path: "Admin-Pending-Generated-Invoices", component: PendingGeneratedInvoiceComponent, canActivate: [AuthGuard] },
  { path: "Admin-Supplier-Product-List", component: AdminProductListComponent, canActivate: [AuthGuard] },
  { path: "Admin-Supplier-Pending-Packing-List", component: AdminPendingPackingListComponent, canActivate: [AuthGuard] },
  { path: "admin-pending-packing-list-print", component: AdminPendingPackingListPrintComponent, canActivate: [AuthGuard] },
  { path: "Admin-Feedback", component: AdminFeedbackComponent, canActivate: [AuthGuard] },
  { path: "Admin-Cha-Charges-Report", component: ChaChargesReportComponent, canActivate: [AuthGuard] },
  { path: "Admin-Cha-Charges-Report-Print", component: ChaChargesReportPrintComponent, canActivate: [AuthGuard] },
  { path: "Admin-Duty-Paid-Report", component: DutyPaidReportComponent, canActivate: [AuthGuard] },
  { path: "Admin-Duty-Paid-Report-Print", component: DutyPaidReportPrintComponent, canActivate: [AuthGuard] },
  { path: "Admin-Cha-Payments", component: ChaPaymentsComponent, canActivate: [AuthGuard] },
  { path: "Admin-Payments-Print", component: PaymentsPendingPrintComponent, canActivate: [AuthGuard] },
  { path: "Admin-Cha-Reports", component: ChaReportsComponent, canActivate: [AuthGuard] },
  { path: "Admin-Pi-Status", component: PiStatusComponent, canActivate: [AuthGuard] },
  { path: "Admin-Documents-List-Print", component: DoclistPrintComponent, canActivate: [AuthGuard] },
  { path: "Admin-Paid-List-Print", component: SupplierPaidlistPrintComponent, canActivate: [AuthGuard] },
  { path: "Admin-Payment-Discounts", component: PaymentDiscountsComponent, canActivate: [AuthGuard] },
  { path: "Admin-Consolidate-Packing", component: AdminConsolidatePackingComponent, canActivate: [AuthGuard] },
  { path: "Admin-Packing-Before-invoice", component: PackingBeforeinvoiceComponent, canActivate: [AuthGuard] },
  { path: "Admin-Portwise-Products", component: PortwiseProductsComponent, canActivate: [AuthGuard] },
  { path: "Admin-Portwise-Products-Print", component: PortwiseProductsPrintComponent, canActivate: [AuthGuard] },
  { path: "Admin-Sales-Vs-Purchase", component: SalesVsPurchaseComponent, canActivate: [AuthGuard] },
  { path: "Admin-Product-Sales-Report", component: ProductSalesReportComponent, canActivate: [AuthGuard] },
  { path: "Dealer-Product-List", component: DealerProductListComponent, canActivate: [AuthGuard] },
  { path: "Payments-History-List", component: PaymentsHistoryComponent, canActivate: [AuthGuard] },
  { path: "Payments-History-List-Print", component: PaymentsHistoryPrintComponent, canActivate: [AuthGuard] },
  { path: "Dealer-Targets", component: TargetComponent, canActivate: [AuthGuard] },
  { path: "Product-Identification", component: ProductIdentificationComponent, canActivate: [AuthGuard] },
  { path: "Sales-Return-Report", component: SalesReturnReportComponent, canActivate: [AuthGuard] },

  { path: "Payment-Cancellation", component: DealerPaymentsComponent, canActivate: [AuthGuard] },
  { path: "transport-charges", component: TransportChargesComponent, canActivate: [AuthGuard] },
  { path: "return-products", component: ReturnProductsComponent, canActivate: [AuthGuard] },
  { path: "notification-status", component: NotificationStatusComponent, canActivate: [AuthGuard] },
  { path: "notifications", component: NotificationsComponent, canActivate: [AuthGuard] },
  { path: "Admin-DC DETAILS PRINT", component: PendingOrdersComponent, canActivate: [AuthGuard] },
  { path: "Admin-OCH", component: OutstandingClearancePaymentComponent, canActivate: [AuthGuard] },
  { path: "PRINT-REPORT", component: PrintReportComponent, canActivate: [AuthGuard] },
  { path: "Admin-DEALERSALES-REPORT", component: MarketDealersalesReportsprintComponent, canActivate: [AuthGuard] },
  { path: "Admin-CREATE SUPPLIER", component: SupplierUsersComponent, canActivate: [AuthGuard] },
  { path: "Admin-CREATE NEW ARRIVAL", component: NewArrivalsComponent, canActivate: [AuthGuard] },
  { path: "admin-pending-invoice-list", component: AdminPendingInvoiceListComponent, canActivate: [AuthGuard] },
  { path: "Admin-order-planning", component: OrderPlanningComponent, canActivate: [AuthGuard] },
  { path: "Admin-Order-Summary", component: OrderSummaryComponent, canActivate: [AuthGuard] },
  { path: "Admin-Generate-Packing", component: PackingListSupplierComponent, canActivate: [AuthGuard] },
  { path: "Admin-Generate-Invoice", component: GenerateInvoiceComponent, canActivate: [AuthGuard] },
  { path: "generate-invoice-print", component: GenerateInvoicePrintComponent, canActivate: [AuthGuard] },
  { path: "Admin-Consolidate-Pi", component: ConsolidatePiComponent, canActivate: [AuthGuard] },
  { path: "Admin-Proforma-Invoice", component: AdminProformaInvoiceComponent, canActivate: [AuthGuard] },
  { path: "Admin-Pi-Edit", component: AdminPieditComponent, canActivate: [AuthGuard] },
  { path: "adminonport-summary", component: AdminonportSummaryComponent, canActivate: [AuthGuard] },
  { path: "admin-track-report", component: AdminTrackReportComponent, canActivate: [AuthGuard] },
  { path: "adminonport-summary-print", component: AdminonportSummaryPrintComponent, canActivate: [AuthGuard] },
  { path: "transitregisterprint", component: TransitregisterprintComponent, canActivate: [AuthGuard] },
  { path: "pendingpiregisterprint", component: PendingpiregisterprintComponent, canActivate: [AuthGuard] },
  { path: "PendingDutyListPrint", component: PendingDutyListPrintComponent, canActivate: [AuthGuard] },
  { path: "admin-track-report-print", component: AdminTrackReportPrintComponent, canActivate: [AuthGuard] },
  { path: "product-wise-purchase-print", component: ProductWisePurchasePrintComponent, canActivate: [AuthGuard] },
  { path: "transitregister", component: TransitregisterComponent, canActivate: [AuthGuard] },
  { path: "pendingpiregister", component: PendingpiregisterComponent, canActivate: [AuthGuard] },
  { path: "outstanding-discount", component: OutstandingDiscountComponent, canActivate: [AuthGuard] },
  { path: "festival-sms", component: FestivalSmsComponent, canActivate: [AuthGuard] },
  { path: "festival-multiple-sms", component: FestivalMultipleSmsComponent, canActivate: [AuthGuard] },
  { path: "monthly-sms", component: MonthlySMSComponent, canActivate: [AuthGuard] },
  { path: "outstanding-discount-print", component: OutstandingDiscountPrintComponent, canActivate: [AuthGuard] },
  { path: "Pending-Invoices", component: PendingInvoicesComponent, canActivate: [AuthGuard] },
  { path: "invoice-proforma-invoice", component: InvoiceProformaInvoiceComponent, canActivate: [AuthGuard] },
  { path: "pending-invoices-print", component: PendingInvoicesPrintComponent, canActivate: [AuthGuard] },
  { path: "Admin-Minmum-Order-Quantity", component: MinmumOrderQtyComponent, canActivate: [AuthGuard] },
  { path: "Admin-Minmum-Order-Quantity-Print", component: MinmumOrderQtyPrintComponent, canActivate: [AuthGuard] },
  { path: "Admin-Invoice-Print", component: InvoicePrint2Component, canActivate: [AuthGuard] },

  //supplier
  { path: "supplier-feedback", component: SupplierFeedbackComponent, canActivate: [AuthGuard] },
  { path: "Admin-PAYMENTS", component: AdminPaymentsComponent, canActivate: [AuthGuard] },
  { path: "Admin-PRODUCT MAPPING", component: ProductMappingComponent, canActivate: [AuthGuard] },
  { path: "Admin-EDIT SUPPLIER", component: SupplierRegistrationComponent, canActivate: [AuthGuard] },
  { path: "Admin-PURCHASE ORDER", component: SupplierPurchaseOrderComponent, canActivate: [AuthGuard] },
  { path: "Admin-Invoice-Payments", component: InvoicePaymentsComponent, canActivate: [AuthGuard] },
  { path: 'Admin-Revised-PO', component: SupplierPoListComponent, canActivate: [AuthGuard] },
  { path: 'Admin-PO-Approval', component: SupplierPoApprovalComponent, canActivate: [AuthGuard] },
  { path: 'Supplier-Invoice', component: SupplierInvoiceListComponent, canActivate: [AuthGuard] },
  { path: 'Supplier-GeneratedInvoices', component: SupplierGeneratedinvoicesComponent, canActivate: [AuthGuard] },
  { path: 'Supplier-Proforma Invoice', component: SupplierProformaInvoiceComponent, canActivate: [AuthGuard] },
  { path: 'Supplier-Proforma Invoice Print', component: SupplierInvoicePrintComponent, canActivate: [AuthGuard] },
  { path: 'Supplier-PO Print', component: SupplierPoPrintComponent, canActivate: [AuthGuard] },
  { path: 'Supplier-Packing-list-Print', component: SupplierPackinglistPrintComponent, canActivate: [AuthGuard] },
  { path: 'supplier-revised-pi-list', component: SupplierRevisedPiListComponent, canActivate: [AuthGuard] },
  { path: 'Supplier-Invoice Profoma', component: SupplierInvoiceProfomaComponent, canActivate: [AuthGuard] },
  { path: 'Supplier-Invoicelist', component: SupplierInvoicesListComponent, canActivate: [AuthGuard] },
  { path: 'Supplier-Ledger', component: SupplierLedgerComponent, canActivate: [AuthGuard] },
  { path: 'Supplier-OutstandingAmount', component: SupplierOutstandingAmountComponent, canActivate: [AuthGuard] },
  { path: 'Supplier-Product-List', component: SupplierProductListComponent, canActivate: [AuthGuard] },
  { path: 'Supplier-Pending-Doc-List', component: SupplierPendingDoclistComponent, canActivate: [AuthGuard] },
  { path: 'Pending-SupplierPayments-List', component: PendingSupplierPaymentsComponent, canActivate: [AuthGuard] },
  { path: 'Generated-Supplier-Invoices', component: GeneratedSupplierInvoicesComponent, canActivate: [AuthGuard] },
  { path: 'Supplier-Reports-Supplier', component: SupplierReportsSupplierComponent, canActivate: [AuthGuard] },
  { path: 'Supplier-Cha-Print', component: ChaprintComponent, canActivate: [AuthGuard] },
  { path: 'Supplier-Inv-Print', component: PrintInvoiceComponent, canActivate: [AuthGuard] },
  { path: 'Supplier-Order-Summary', component: SupplierOrderSummaryComponent, canActivate: [AuthGuard] },
  { path: 'Supplier-Invoice-Edit', component: GroupInvoiceComponent, canActivate: [AuthGuard] },
  { path: 'Supplier-PI-Edit', component: PieditComponent, canActivate: [AuthGuard] },
  { path: 'Supplier-Edit-Invoice', component: InvoiceEditComponent, canActivate: [AuthGuard] },
  { path: 'Supplier-Profile-Edit', component: SupplierProfileEditComponent, canActivate: [AuthGuard] },
  { path: 'Supplier-Invoices-Supplier', component: SupplierInvoicesComponent, canActivate: [AuthGuard] },
  { path: 'supplier-invoices-supplier-print', component: SupplierInvoicesSupplierPrintComponent, canActivate: [AuthGuard] },
  { path: 'Supplier-Order-Summary-Print', component: SupSummaryPrintComponent, canActivate: [AuthGuard] },
  { path: 'supplier-ledger-print', component: SupplierLedgerPrintComponent, canActivate: [AuthGuard] },

  { path: 'Supplier-PO', component: SupplierPoListComponent, canActivate: [AuthGuard] },
  { path: 'Supplier-PO-Approval', component: SupplierPoApprovalComponent, canActivate: [AuthGuard] },
  { path: 'Supplier-Invoices', component: InvoiceslistComponent, canActivate: [AuthGuard] },
  { path: 'Supplier-Invoice-fileupload', component: InvoiceFileUploadsComponent, canActivate: [AuthGuard] },
  { path: 'Admin-Invoice-fileupload', component: InvoiceFileUploadsComponent, canActivate: [AuthGuard] },
  { path: 'Admin-GeneratedInvoices', component: SupplierGeneratedinvoicesComponent, canActivate: [AuthGuard] },
  { path: 'Supplier-Packing-List', component: SupplierPackingListComponent, canActivate: [AuthGuard] },
  { path: 'Supplier-PO-History', component: SupplierPoHistoryComponent, canActivate: [AuthGuard] },
  { path: 'adminchaledger', component: AdminchaledgerComponent, canActivate: [AuthGuard] },
  { path: 'adminchaledgerprint', component: AdminchaledgerprintComponent, canActivate: [AuthGuard] },
  { path: 'pending-supplier-payments-print', component: PendingSupplierPaymentsPrintComponent, canActivate: [AuthGuard] },

  { path: 'supplier-consolidate-packing', component: SupplierConsolidatePackingComponent, canActivate: [AuthGuard] },
 
  //Cha
  { path: 'Invoice-Documents/:type', component: InvoiceDocumentsComponent, canActivate: [AuthGuard] },
  { path: "Cha-Correction", component: ChaCorrectionComponent, canActivate: [AuthGuard] },
  { path: "Cha-BL-Details", component: BlDetailsComponent, canActivate: [AuthGuard] },
  { path: "bl-details-print", component: BlDetailsPrintComponent, canActivate: [AuthGuard] },
  { path: "Track-Report", component: TrackReportComponent, canActivate: [AuthGuard] },
  { path: "Track-Report-Print", component: TrackReportPrintComponent , canActivate: [AuthGuard] },
  { path: "onport-summary", component: OnportSummaryComponent, canActivate: [AuthGuard] },
  { path: "BE-Entry", component: BeEntryComponent, canActivate: [AuthGuard] },
  { path: "Onportsummaryprint", component: OnportsummaryprintComponent, canActivate: [AuthGuard] },
  { path: "chaledger", component: ChaledgerComponent, canActivate: [AuthGuard] },
  { path: "chaledgerprint", component: ChaledgerprintComponent, canActivate: [AuthGuard] },
  { path: "invoicedocumentchaprint", component: InvoicedocumentchaprintComponent, canActivate: [AuthGuard] },
  { path: "Cha-Invoice", component: ChaInvoiceComponent, canActivate: [AuthGuard] },

  //super admin
  { path: "Super-INV APPROVAL", component: OrdersApprovalComponent, canActivate: [AuthGuard] },
  { path: "Super-OCH", component: OutstandingClearancePaymentComponent, canActivate: [AuthGuard] },
  { path: "outstanding-list", component: OutstandingListComponent, canActivate: [AuthGuard] },
  { path: "outstanding-list-print", component: OutstandingListPrintComponent, canActivate: [AuthGuard] },
  { path: "seepacking-list", component: SeepackingListComponent, canActivate: [AuthGuard] },
  { path: "seependingpo-list", component: SeependingpoListComponent, canActivate: [AuthGuard] },
  { path: "seependingpo-list-print", component: SeependingpoListPrintComponent, canActivate: [AuthGuard] },
  { path: "seeinvoice-list", component: SeeinvoiceListComponent, canActivate: [AuthGuard] },
  { path: "seeinvoice-list-print", component: SeeinvoiceListPrintComponent, canActivate: [AuthGuard] },
  { path: "seepacking-list-print", component: SeepackingListPrintComponent, canActivate: [AuthGuard] },


  //Dealer
  { path: "Dealer-ORDERS", component: DealerOrdersComponent, canActivate: [AuthGuard] },
  { path: "Dealer-ORDERS/:category/:subcategory/:modelno/:cartoon/:qty/:tot_value", component: DealerOrdersComponent, canActivate: [AuthGuard] },
  { path: "Dealer-STATUS", component: MyOrdersComponent, canActivate: [AuthGuard] },
  { path: "Dealer-GRN", component: GoodsReceiptNoteComponent, canActivate: [AuthGuard] },
  { path: "Dealer-PAYMENT HISTORY", component: PaymentHistoryComponent, canActivate: [AuthGuard] },
  { path: "Dealer-REPORTS", component: AdminReportComponent, canActivate: [AuthGuard] },
  { path: "schemes-list", component: SchemasComponent, canActivate: [AuthGuard] },
  { path: "Dealer-SCHEMES", component: SchemasComponent, canActivate: [AuthGuard] },
  { path: "Dealer-OFFERS", component: DealerOffersComponent, canActivate: [AuthGuard] },
  { path: "Dealer-UPLOAD", component: DealerProductdataUploadComponent, canActivate: [AuthGuard] },
  { path: "Dealer-CATALOGUE", component: CatalogueComponent, canActivate: [AuthGuard] },
  { path: "Dealer-Pricelist/:id", component: CatalogueComponent, canActivate: [AuthGuard] },
  { path: "Dealer-PROMOCODES", component: AvailablePromocodesComponent, canActivate: [AuthGuard] },
  { path: "Dealer-PENDING PACKING LIST", component: WhPendingPackingListComponent, canActivate: [AuthGuard] },
  { path: "Dealer-New-Arrivals", component: DealerNewArrivalsComponent, canActivate: [AuthGuard] },

  //Shopee
  { path: "Shopee Manager-ORDERS", component: DealerOrdersComponent, canActivate: [AuthGuard] },
  { path: "Shopee Manager-STATUS", component: DealerStatusComponent, canActivate: [AuthGuard] },
  { path: "Shopee Manager-GRN", component: GoodsReceiptNoteComponent, canActivate: [AuthGuard] },
  { path: "Shopee Manager-POS", component: PosUsersComponent },
  { path: "Shopee Manager-PAYMENT HISTORY", component: PaymentHistoryComponent, canActivate: [AuthGuard] },
  { path: "Shopee Manager-REPORTS", component: AdminReportComponent, canActivate: [AuthGuard] },
  { path: "Pos Cleark-POS", component: PosUsersComponent },
  { path: "Pos-Print", component: PosPrintComponent },

  //Accountant
  { path: "Accounts Manager-ESTIMATION", component: GetProformaListComponent, canActivate: [AuthGuard] },
  { path: "Accounts Manager-INVOICE", component: GetProformaListComponent, canActivate: [AuthGuard] },
  { path: "Accounts Manager-STATUS", component: AccStatusComponent, canActivate: [AuthGuard] },
  { path: "Accounts Manager-OUTSTANDING POSITION", component: OutstandingPositiondetailComponent, canActivate: [AuthGuard] },
  { path: "Accounts Manager-invoicepreview", component: InvoicePreviewComponent, canActivate: [AuthGuard] },
  { path: "Accounts Manager-RECEIVED PAYMENTS", component: ReceivedPaymentsComponent, canActivate: [AuthGuard] },
  //product Manager
  { path: "Purchase Manager-IMPORT PO", component: ImportPoComponent, canActivate: [AuthGuard] },
  { path: "Purchase Manager-IMPORT GRN", component: ImportGrnComponent, canActivate: [AuthGuard] },
  { path: "Purchase Manager-STATUS", component: PmStatusComponent, canActivate: [AuthGuard] },
  { path: "Purchase Manager-IMPORT INVOICE", component: ImportInvoiceComponent, canActivate: [AuthGuard] },
  { path: "product-Invoice", component: ImportMakeInvoiceComponent, canActivate: [AuthGuard] },
  { path: "import-po-print", component: ImportPoPrintComponent, canActivate: [AuthGuard] },
  { path: "import-invoice-print", component: ImportInvoicePrintComponent, canActivate: [AuthGuard] },
  { path: "product-GRN", component: GenerateImportGrnComponent, canActivate: [AuthGuard] },

  //marketing Manager 
  { path: "Marketing Manager-CREATE DEALERS", component: DealerRegistrationComponent, canActivate: [AuthGuard] },
  { path: "Marketing Manager-ORDERS", component: DealerOrdersComponent, canActivate: [AuthGuard] },
  { path: "Marketing Manager-STATUS", component: DealerStatusComponent, canActivate: [AuthGuard] },
  { path: "Marketing Manager-GRN", component: GoodsReceiptNoteComponent, canActivate: [AuthGuard] },
  { path: "Marketing Manager-PAYMENT HISTORY", component: PaymentHistoryComponent, canActivate: [AuthGuard] },
  { path: "Marketing Manager-PAYMENT HISTORY/:id", component: PaymentHistoryComponent, canActivate: [AuthGuard] },
  { path: "Marketing Manager-DEALERS LIST", component: DiscountsComponent, canActivate: [AuthGuard] },
  { path: "Marketing Manager-OFFERS", component: DealerOffersComponent, canActivate: [AuthGuard] },
  { path: "Marketing Manager-PO DISPLAY", component: ProductlistDisplayComponent, canActivate: [AuthGuard] },
  { path: "Marketing Manager-DEALERS OUTSTANDING", component: DealersOutstandingComponent, canActivate: [AuthGuard] },
  { path: "Marketing Manager-CATALOGUE", component: CatalogueComponent, canActivate: [AuthGuard] },
  { path: "Marketing Manager-PROMOCODES", component: AvailablePromocodesComponent, canActivate: [AuthGuard] },
  { path: "TeleMarketing-POHISTORY", component: PoHistoryComponent, canActivate: [AuthGuard] },
  { path: "TeleMarketing-PENDINGDEALERS", component: PendingDealersComponent, canActivate: [AuthGuard] },
  { path: "Marketing Manager-ANALYTICS REPORTS", component: AnalyticsReportsComponent, canActivate: [AuthGuard] },
  { path: "Marketing Manager-PENDING PACKING LIST", component: WhPendingPackingListComponent },
  { path: "dealers-outstanding-print", component: DealersOutstandingPrintComponent, canActivate: [AuthGuard] },
  { path: "Quotation", component: QuotationComponent, canActivate: [AuthGuard] },
  { path: "Quotation-Print", component: QuotationPrintComponent, canActivate: [AuthGuard] },

  { path: "Branch Manager-INTERNAL USERS", component: InternalUsersComponent, canActivate: [AuthGuard] },
  { path: "Branch Manager-ACTIVE DEALERS", component: ActiveUsersComponent, canActivate: [AuthGuard] },
  { path: "internal-user-edit", component: InternalUserEditComponent, canActivate: [AuthGuard] },
  { path: "Branch Manager-COMPANY MASTER", component: MastersCompanyComponent, canActivate: [AuthGuard] },
  { path: "Branch Manager-EXTERNAL USERS", component: UsersListComponent, canActivate: [AuthGuard] },
  { path: "Branch Manager-PRODUCT MASTER", component: MasterDataUploadComponent, canActivate: [AuthGuard] },
  { path: "Branch Manager-USER REVIEWS", component: UsersReviewsComponent, canActivate: [AuthGuard] },
  { path: "Branch Manager-ORDERS", component: DealerOrdersComponent, canActivate: [AuthGuard] },
  { path: "Branch Manager-GRN", component: GoodsReceiptNoteComponent, canActivate: [AuthGuard] },
  { path: "Branch Manager-STATUS", component: BranchManagerStatusComponent, canActivate: [AuthGuard] },
  { path: "Branch Manager-DEALER'S / SHOPEE'S", component: DealerShopeeComponent, canActivate: [AuthGuard] },
  { path: "Branch Manager-PAYMENT HISTORY", component: PaymentHistoryComponent, canActivate: [AuthGuard] },
  { path: "Branch Manager-REPORTS", component: AdminReportComponent, canActivate: [AuthGuard] },
  { path: "Branch Manager-OFFERS", component: DealerOffersComponent, canActivate: [AuthGuard] },


  { path: "INTERNAL USERS", component: InternalUsersComponent, canActivate: [AuthGuard] },
  { path: "register-profile", component: RegisterProfileComponent },
  { path: "register-profile-info", component: RegisterProfileInfoComponent },
  { path: "product-pricing", component: ProductPricingComponent },
  { path: "registration", component: RegisterComponent },
  { path: "registration/:id", component: RegisterComponent },
  { path: "sub", component: SubbComponent },
  { path: "search/:search", component: SearchListComponent },
  { path: "packing-List", component: MakePackingListComponent, canActivate: [AuthGuard] },
  { path: "grn-print", component: GoodsReceiptNotePrintComponent, canActivate: [AuthGuard] },
  { path: "invoice", component: MakeInvoiceComponent, canActivate: [AuthGuard] },
  { path: "invoice-Print", component: InvoicePrintComponent, canActivate: [AuthGuard] },
  { path: "internaluserslistcomponent", component: InternalUsersListComponent, canActivate: [AuthGuard] },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'grn_detail/:invoice_no/:invoice_date/:company_code/:packing_date', component: GoodsReceiptDetailComponent, canActivate:
      [AuthGuard]
  },
  { path: 'po-print', component: PurchaseOrderPrintComponent, canActivate: [AuthGuard] },
  { path: "checkout/:id", component: StepperComponent, canActivate: [AuthGuard] },
  { path: "profile", component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: "transport-generation", component: MakeChallanComponent, canActivate: [AuthGuard] },
  //{ path: "accountant-dashboard", component: AccountantDashboardComponent, canActivate: [AuthGuard] },
  // { path: "warehouse-dashboard", component: WhDashboardComponent, canActivate: [AuthGuard] },
  // { path: "prod-category/:category", component: ProdCatgegoryComponent },
  { path: "prod-category/:category/:brand", component: ProdCatgegoryComponent },
  { path: "nmenu", component: ProductMenu2Component },
  { path: "all-Category", component: CategoryAllComponent },
  /* {path: "profession-wise",component:CategoryProfessionComponent}, */
  { path: "packing_list_print", component: PackingListPrintComponent, canActivate: [AuthGuard] },
  { path: "modal-wise-stock/:b/:c/:d/:e", component: WhModalComponent, canActivate: [AuthGuard] },
  { path: "stock_sub_catg/:category", component: WhSubcatgComponent, canActivate: [AuthGuard] },
  { path: "transport_print", component: ChallanPrintComponent, canActivate: [AuthGuard] },
  { path: "grnstatusprint", component: GrnStatusPrintComponent, canActivate: [AuthGuard] },
  { path: "", redirectTo: "/home", pathMatch: "full", data: { breadcrumbs: 'home' } },
  { path: "all-dealerpo-from-one-user", component: AllDealerpoFromOneUserComponent, canActivate: [AuthGuard] },
  { path: "cheque-details", component: ChequeDetailsformComponent, canActivate: [AuthGuard] },
  { path: "customerledger", component: CustomergridviewComponent, canActivate: [AuthGuard] },
  { path: "PRINT-LEDGER", component: CustomerLedgerPrintComponent, canActivate: [AuthGuard] },
  { path: "Reports-Packing-Print", component: ReportsPackingPrintComponent, canActivate: [AuthGuard] },
  { path: "Correction", component: CorrectionComponent, canActivate: [AuthGuard] },
  { path: "Coming-soon", component: ComingSoonComponent, canActivate: [AuthGuard] },


  // ✅ Wildcard route goes last
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
