import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginModalComponent } from './authentication-views/login-modal/login-modal.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material/material.module';
import { CommonModule, DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BnNgIdleService } from 'bn-ng-idle';
import { Broadcaster } from './app.broadcaster';
import { ComponentCommunicationService } from './component-communication.service';
import { DataServiceService } from './data-service.service';
import { GlobalServiceService } from './global-service.service';
import { ToasterService } from './toastr-service.service';
import { TokenInterceptorService } from './token-http-interceptor.service';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { ShowHideDirective } from './authentication-views/login-modal/show-hide.directive';
import { ErrorModalComponent } from './authentication-views/error-modal/error-modal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { FaqComponent } from './home/faq/faq.component';
import { PrivacyComponent } from './home/privacy/privacy.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AccStatusComponent } from './accountant/acc-status/acc-status.component';
import { FilterPipe } from './filter.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ChequeDetailsformComponent } from './accountant/cheque-detailsform/cheque-detailsform.component';
import { GetProformaListComponent } from './accountant/get-proforma-list/get-proforma-list.component';
import { InvoicePreviewComponent } from './accountant/invoice-preview/invoice-preview.component';
import { InvoicePrintComponent } from './accountant/invoice-print/invoice-print.component';
import { MakeInvoiceComponent } from './accountant/make-invoice/make-invoice.component';
import { OutstandingPositiondetailComponent } from './accountant/outstanding-positiondetail/outstanding-positiondetail.component';
import { DragAndDropModule } from 'angular-draggable-droppable';
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
import { AdminReportAllComponent } from './admin-views/admin-report-all/admin-report-all.component';
import { AdminSupplierLedgerComponent } from './admin-views/admin-supplier-ledger/admin-supplier-ledger.component';
import { AdminSupplierLedgerPrintComponent } from './admin-views/admin-supplier-ledger-print/admin-supplier-ledger-print.component';
import { AdminTrackReportComponent } from './admin-views/admin-track-report/admin-track-report.component';
import { AdminTrackReportPrintComponent } from './admin-views/admin-track-report-print/admin-track-report-print.component';
import { AdminonportSummaryComponent } from './admin-views/adminonport-summary/adminonport-summary.component';
import { AdminonportSummaryPrintComponent } from './admin-views/adminonport-summary-print/adminonport-summary-print.component';
import { AnalyticsReportsComponent } from './admin-views/analytics-reports/analytics-reports.component';
import { ChaChargesReportComponent } from './admin-views/cha-charges-report/cha-charges-report.component';
import { ChaChargesReportPrintComponent } from './admin-views/cha-charges-report-print/cha-charges-report-print.component';
import { ChaPaymentsComponent } from './admin-views/cha-payments/cha-payments.component';
import { ConsolidatePiComponent } from './admin-views/consolidate-pi/consolidate-pi.component';
import { DealerPaymentsComponent } from './admin-views/dealer-payments/dealer-payments.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DoclistPrintComponent } from './admin-views/doclist-print/doclist-print.component';
import { DutyPaidReportComponent } from './admin-views/duty-paid-report/duty-paid-report.component';
import { DutyPaidReportPrintComponent } from './admin-views/duty-paid-report-print/duty-paid-report-print.component';
import { EndCustomerListComponent } from './admin-views/end-customer-list/end-customer-list.component';
import { FaqCreationComponent } from './admin-views/faq-creation/faq-creation.component';
import { GenerateInvoiceComponent } from './admin-views/generate-invoice/generate-invoice.component';
import { InternalUserEditComponent } from './admin-views/internal-user-edit/internal-user-edit.component';
import { InternalUsersComponent } from './admin-views/internal-users/internal-users.component';
import { InternalUsersListComponent } from './admin-views/internal-users-list/internal-users-list.component';
import { InvoicePaymentsComponent } from './admin-views/invoice-payments/invoice-payments.component';
import { MarketDealersalesReportsprintComponent } from './admin-views/market-dealersales-reportsprint/market-dealersales-reportsprint.component';
import { MasterDataUploadComponent } from './admin-views/master-data-upload/master-data-upload.component';
import { MasterProductListComponent } from './admin-views/master-product-list/master-product-list.component';
import { MastersCompanyComponent } from './admin-views/masters-company/masters-company.component';
import { MasterDelaerShopeeComponent } from './admin-views/masters-company/master-delaer-shopee/master-delaer-shopee.component';
import { MinmumOrderQtyComponent } from './admin-views/minmum-order-qty/minmum-order-qty.component';
import { MinmumOrderQtyPrintComponent } from './admin-views/minmum-order-qty-print/minmum-order-qty-print.component';
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
import { PendingDutyListComponent } from './admin-views/pending-duty-list/pending-duty-list.component';
import { PendingDutyListPrintComponent } from './admin-views/pending-duty-list-print/pending-duty-list-print.component';
import { PendingGeneratedInvoiceComponent } from './admin-views/pending-generated-invoice/pending-generated-invoice.component';
import { PendingOrdersComponent } from './admin-views/pending-orders/pending-orders.component';
import { PiStatusComponent } from './admin-views/pi-status/pi-status.component';
import { PortwiseProductsComponent } from './admin-views/portwise-products/portwise-products.component';
import { PortwiseProductsPrintComponent } from './admin-views/portwise-products-print/portwise-products-print.component';
import { PriceChangePoListComponent } from './admin-views/price-change-po-list/price-change-po-list.component';
import { PrintReportComponent } from './admin-views/print-report/print-report.component';
import { PrivelagesComponent } from './admin-views/privelages/privelages.component';
import { ProductExcelUploadComponent } from './admin-views/product-excel-upload/product-excel-upload.component';
import { ProductMappingComponent } from './admin-views/product-mapping/product-mapping.component';
import { ProductPricingComponent } from './admin-views/product-pricing/product-pricing.component';
import { PromocodesCreationComponent } from './admin-views/promocodes-creation/promocodes-creation.component';
import { RegisterProfileComponent } from './admin-views/register-profile/register-profile.component';
import { RegisterProfileInfoComponent } from './admin-views/register-profile-info/register-profile-info.component';
import { RejectUsersComponent } from './admin-views/reject-users/reject-users.component';
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
import { SupplierUsersListComponent } from './admin-views/supplier-users-list/supplier-users-list.component';
import { TransportMasterComponent } from './admin-views/transport-master/transport-master.component';
import { UpcomingProductsComponent } from './admin-views/upcoming-products/upcoming-products.component';
import { UploadStockComponent } from './admin-views/upload-stock/upload-stock.component';
import { UsersListComponent } from './admin-views/users-list/users-list.component';
import { UsersReviewsComponent } from './admin-views/users-reviews/users-reviews.component';
import { ViewMoreComponent } from './admin-views/view-more/view-more.component';
import { AdminchaledgerComponent } from './adminchaledger/adminchaledger.component';
import { AdminchaledgerprintComponent } from './adminchaledgerprint/adminchaledgerprint.component';
import { AllDealerpoFromOneUserComponent } from './all-dealerpo-from-one-user/all-dealerpo-from-one-user.component';
import { RegisterComponent } from './authentication-views/register-step1/register.component';
import { BeEntryComponent } from './be-entry/be-entry.component';
import { BlDetailsComponent } from './bl-details/bl-details.component';
import { BlDetailsPrintComponent } from './bl-details-print/bl-details-print.component';
import { BranchManagerStatusComponent } from './branch-manager/branch-manager-status/branch-manager-status.component';
import { BranchOffersComponent } from './branch-manager/branch-offers/branch-offers.component';
import { DealerShopeeComponent } from './branch-manager/dealer-shopee/dealer-shopee.component';
import { BrandsComponent } from './brands/brands.component';
import { CarrersComponent } from './carrers/carrers.component';
import { CategoryAllComponent } from './category-all/category-all.component';
import { UniquePipe } from "./unique.pipe";
import { CatgMenuComponent } from './catg-menu/catg-menu.component';
import { CatgMenu2Component } from './catg-menu2/catg-menu2.component';
import { ChaCorrectionComponent } from './cha-correction/cha-correction.component';
import { ChaInvoiceComponent } from './cha-invoice/cha-invoice.component';
import { ChaReportsComponent } from './cha-reports/cha-reports.component';
import { ChaledgerComponent } from './chaledger/chaledger.component';
import { ChaledgerprintComponent } from './chaledgerprint/chaledgerprint.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CorrectionComponent } from './correction/correction.component';
import { CustomerLedgerPrintComponent } from './customer-ledger-print/customer-ledger-print.component';
import { CustomerOrderPrintComponent } from './customer-order-print/customer-order-print.component';
import { CustomerPoPrintComponent } from './customer-po-print/customer-po-print.component';
import { CustomergridviewComponent } from './customergridview/customergridview.component';
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
import { GoodsReceiptNoteComponent } from './dealer/goods-receipt-note/goods-receipt-note.component';
import { GoodsReceiptNotePrintComponent } from './dealer/goods-receipt-note-print/goods-receipt-note-print.component';
import { PaymentHistoryComponent } from './dealer/payment-history/payment-history.component';
import { PendingDealersComponent } from './dealer/pending-dealers/pending-dealers.component';
import { PoHistoryComponent } from './dealer/po-history/po-history.component';
import { ProductlistDisplayComponent } from './dealer/productlist-display/productlist-display.component';
import { SchemasComponent } from './dealer/schemas/schemas.component';
import { DealerNewArrivalsComponent } from './dealer-new-arrivals/dealer-new-arrivals.component';
import { DealerProductListComponent } from './dealer-product-list/dealer-product-list.component';
import { DealersOutstandingPrintComponent } from './dealers-outstanding-print/dealers-outstanding-print.component';
import { FeedbackModalComponent } from './feedback-modal/feedback-modal.component';
import { FestivalMultipleSmsComponent } from './festival-multiple-sms/festival-multiple-sms.component';
import { FestivalSmsComponent } from './festival-sms/festival-sms.component';
import { GenerateInvoicePrintComponent } from './generate-invoice-print/generate-invoice-print.component';
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
import { OutstandingDiscountComponent } from './outstanding-discount/outstanding-discount.component';
import { OutstandingDiscountPrintComponent } from './outstanding-discount-print/outstanding-discount-print.component';
import { OutstandingListComponent } from './outstanding-list/outstanding-list.component';
import { OutstandingListPrintComponent } from './outstanding-list-print/outstanding-list-print.component';
import { PaymentfailureComponent } from './paymentfailure/paymentfailure.component';
import { PaymentsHistoryComponent } from './payments-history/payments-history.component';
import { PaymentsHistoryPrintComponent } from './payments-history-print/payments-history-print.component';
import { PaymentsuccessfullComponent } from './paymentsuccessfull/paymentsuccessfull.component';
import { PendingInvoicesComponent } from './pending-invoices/pending-invoices.component';
import { PendingInvoicesPrintComponent } from './pending-invoices-print/pending-invoices-print.component';
import { PendingSupplierPaymentsPrintComponent } from './pending-supplier-payments-print/pending-supplier-payments-print.component';
import { PendingpiregisterComponent } from './pendingpiregister/pendingpiregister.component';
import { PendingpiregisterprintComponent } from './pendingpiregisterprint/pendingpiregisterprint.component';
import { PosNewUserComponent } from './pos/pos-new-user/pos-new-user.component';
import { PosPrintComponent } from './pos/pos-print/pos-print.component';
import { PosUsersComponent } from './pos/pos-users/pos-users.component';
import { ProdCatgegoryComponent } from './prod-catgegory/prod-catgegory.component';
import { ProductIdentificationComponent } from './product-identification/product-identification.component';
import { GenerateImportGrnComponent } from './product-manager/generate-import-grn/generate-import-grn.component';
import { ImportGrnComponent } from './product-manager/import-grn/import-grn.component';
import { ImportInvoiceComponent } from './product-manager/import-invoice/import-invoice.component';
import { ImportInvoicePrintComponent } from './product-manager/import-invoice-print/import-invoice-print.component';
import { ImportMakeInvoiceComponent } from './product-manager/import-make-invoice/import-make-invoice.component';
import { ImportPoComponent } from './product-manager/import-po/import-po.component';
import { ImportPoPrintComponent } from './product-manager/import-po-print/import-po-print.component';
import { PmStatusComponent } from './product-manager/pm-status/pm-status.component';
import { ProductMenuComponent } from './product-menu/product-menu.component';
import { ProductMenu2Component } from './product-menu2/product-menu2.component';
import { ProductSalesReportComponent } from './product-sales-report/product-sales-report.component';
import { ProductWisePurchasePrintComponent } from './product-wise-purchase-print/product-wise-purchase-print.component';
import { QuotationComponent } from './quotation/quotation.component';
import { QuotationPrintComponent } from './quotation-print/quotation-print.component';
import { RatingComponent } from './rating/rating.component';
import { ReportsPackingPrintComponent } from './reports-packing-print/reports-packing-print.component';
import { ReturnProductsComponent } from './return-products/return-products.component';
import { SalesReturnReportComponent } from './sales-return-report/sales-return-report.component';
import { SampleComponent } from './sample/sample.component';
import { SampleHomeComponent } from './sample-home/sample-home.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { SearchListComponent } from './search-list/search-list.component';
import { SeeinvoiceListComponent } from './seeinvoice-list/seeinvoice-list.component';
import { SeeinvoiceListPrintComponent } from './seeinvoice-list-print/seeinvoice-list-print.component';
import { SeepackingListComponent } from './seepacking-list/seepacking-list.component';
import { SeepackingListPrintComponent } from './seepacking-list-print/seepacking-list-print.component';
import { SeependingpoListComponent } from './seependingpo-list/seependingpo-list.component';
import { SeependingpoListPrintComponent } from './seependingpo-list-print/seependingpo-list-print.component';
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
import { TargetComponent } from './target/target.component';
import { TrackReportComponent } from './track-report/track-report.component';
import { TrackReportPrintComponent } from './track-report-print/track-report-print.component';
import { TransitregisterComponent } from './transitregister/transitregister.component';
import { TransitregisterprintComponent } from './transitregisterprint/transitregisterprint.component';
import { TransportChargesComponent } from './transport-charges/transport-charges.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { WhPendingPackingListComponent } from './wh-pending-packing-list/wh-pending-packing-list.component';
import { WhatsappMessagesComponent } from './whatsapp-messages/whatsapp-messages.component';
import { WhatsappNotificationComponent } from './whatsapp-notification/whatsapp-notification.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { WishListwhPendingPackingMoreinfoComponent } from './wish-listwh-pending-packing-moreinfo/wish-listwh-pending-packing-moreinfo.component';
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
import { SupplierInvoicesComponent } from './supplier/supplier-invoices/supplier-invoices.component';
import { SupplierInvoicesListComponent } from './supplier/supplier-invoices-list/supplier-invoices-list.component';
import { SupplierLedgerComponent } from './supplier/supplier-ledger/supplier-ledger.component';
import { SupplierOutstandingAmountComponent } from './supplier/supplier-outstanding-amount/supplier-outstanding-amount.component';
import { SupplierPackingListComponent } from './supplier/supplier-packing-list/supplier-packing-list.component';
import { SupplierPackinglistPrintComponent } from './supplier/supplier-packinglist-print/supplier-packinglist-print.component';
import { SupplierPendingDoclistComponent } from './supplier/supplier-pending-doclist/supplier-pending-doclist.component';
import { SupplierPoApprovalComponent } from './supplier/supplier-po-approval/supplier-po-approval.component';
import { SupplierPoHistoryComponent } from './supplier/supplier-po-history/supplier-po-history.component';
import { SupplierPoHistoryTabsComponent } from './supplier/supplier-po-history-tabs/supplier-po-history-tabs.component';
import { SupplierPoListComponent } from './supplier/supplier-po-list/supplier-po-list.component';
import { SupplierPoPrintComponent } from './supplier/supplier-po-print/supplier-po-print.component';
import { SupplierProductListComponent } from './supplier/supplier-product-list/supplier-product-list.component';
import { SupplierProfileEditComponent } from './supplier/supplier-profile-edit/supplier-profile-edit.component';
import { SupplierProformaInvoiceComponent } from './supplier/supplier-proforma-invoice/supplier-proforma-invoice.component';
import { SupplierReportsSupplierComponent } from './supplier/supplier-reports-supplier/supplier-reports-supplier.component';
import { ChallanPrintComponent } from './wh-manager/challan-print/challan-print.component';
import { CustomerDcDetailsComponent } from './wh-manager/customer-dc-details/customer-dc-details.component';
import { GetChallanListComponent } from './wh-manager/get-challan-list/get-challan-list.component';
import { MakeChallanComponent } from './wh-manager/make-challan/make-challan.component';
import { MakePackingListComponent } from './wh-manager/make-packing-list/make-packing-list.component';
import { PackingListComponent } from './wh-manager/packing-list/packing-list.component';
import { PackingListPrintComponent } from './wh-manager/packing-list-print/packing-list-print.component';
import { PackinglistMergedComponent } from './wh-manager/packinglist-merged/packinglist-merged.component';
import { PodataComponent } from './wh-manager/podata/podata.component';
import { PurchaseOrderPrintComponent } from './wh-manager/purchase-order-print/purchase-order-print.component';
import { PodataPrintComponent } from './wh-manager/podata-print/podata-print.component';
import { StockAcceptanceComponent } from './wh-manager/stock-acceptance/stock-acceptance.component';
import { WhReportsComponent } from './wh-manager/wh-reports/wh-reports.component';
import { WhStatusComponent } from './wh-manager/wh-status/wh-status.component';
import { WhStockComponent } from './wh-manager/wh-stock/wh-stock.component';
import { WhSubcatgComponent } from './wh-manager/wh-stock/wh-subcatg/wh-subcatg.component';
import { WhModalComponent } from './wh-manager/wh-stock/wh-modal/wh-modal.component';
import { BrandProtectionComponent } from './brand-protection/brand-protection.component';
import { ShopByCategoryComponent } from './shop-by-category/shop-by-category.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ErrorModalComponent,
    DashboardComponent,
    LoginModalComponent,
    RegisterComponent,
    HomeComponent,
    FaqComponent,
    PrivacyComponent,
    ProductDetailComponent,
    CategoryListComponent,
    AboutUsComponent,
    AccStatusComponent,
    ChequeDetailsformComponent,
    GetProformaListComponent,
    InvoicePreviewComponent,
    InvoicePrintComponent,
    MakeInvoiceComponent,
    OutstandingPositiondetailComponent,
    ReceivedPaymentsComponent,
    AdminPendingInvoiceListComponent,
    AdminPendingPackingListPrintComponent,
    AdminReportComponent,
    ActiveUsersComponent,
    AdminConsolidatePackingComponent,
    AdminFeedbackComponent,
    AdminPaymentsComponent,
    AdminPendingPackingListComponent,
    AdminPieditComponent,
    AdminProductListComponent,
    AdminProformaInvoiceComponent,
    AdminReportAllComponent,
    AdminSupplierLedgerComponent,
    AdminSupplierLedgerPrintComponent,
    AdminTrackReportComponent,
    AdminTrackReportPrintComponent,
    AdminonportSummaryComponent,
    AdminonportSummaryPrintComponent,
    AnalyticsReportsComponent,
    ChaChargesReportComponent,
    ChaChargesReportPrintComponent,
    ChaPaymentsComponent,
    ConsolidatePiComponent,
    DealerPaymentsComponent,
    DoclistPrintComponent,
    DutyPaidReportComponent,
    DutyPaidReportPrintComponent,
    EndCustomerListComponent,
    FaqCreationComponent,
    GenerateInvoiceComponent,
    InternalUserEditComponent,
    InternalUsersComponent,
    InternalUsersListComponent,
    InvoicePaymentsComponent,
    MarketDealersalesReportsprintComponent,
    MasterDataUploadComponent,
    MasterProductListComponent,
    MastersCompanyComponent,
    MasterDelaerShopeeComponent,
    MinmumOrderQtyComponent,
    MinmumOrderQtyPrintComponent,
    NewArrivalsComponent,
    NotificationsComponent,
    OffersDiscountsComponent,
    OpeningBalanceComponent,
    OrderPlanningComponent,
    OutstandingClearancePaymentComponent,
    PackingBeforeinvoiceComponent,
    PackingListSupplierComponent,
    PaymentDiscountsComponent,
    PaymentsPendingPrintComponent,
    PendingDutyListComponent,
    PendingDutyListPrintComponent,
    PendingGeneratedInvoiceComponent,
    PendingOrdersComponent,
    PiStatusComponent,
    PortwiseProductsComponent,
    PortwiseProductsPrintComponent,
    PriceChangePoListComponent,
    PrintReportComponent,
    PrivelagesComponent,
    ProductExcelUploadComponent,
    ProductMappingComponent,
    ProductPricingComponent,
    PromocodesCreationComponent,
    RegisterProfileComponent,
    RegisterProfileInfoComponent,
    RejectUsersComponent,
    SalesVsPurchaseComponent,
    SchemesComponent,
    SupplierOrderSummaryComponent,
    SupplierPaidlistPrintComponent,
    SupplierPaymentListComponent,
    SupplierPendingPaymentsComponent,
    SupplierPurchaseOrderComponent,
    SupplierRegistrationComponent,
    SupplierReportsComponent,
    SupplierUsersComponent,
    SupplierUsersListComponent,
    TransportMasterComponent,
    UpcomingProductsComponent,
    UploadStockComponent,
    UsersListComponent,
    UsersReviewsComponent,
    ViewMoreComponent,
    AdminchaledgerComponent,
    AdminchaledgerprintComponent,
    AllDealerpoFromOneUserComponent,
    BeEntryComponent,
    BlDetailsComponent,
    BlDetailsPrintComponent,
    BranchManagerStatusComponent,
    BranchOffersComponent,
    DealerShopeeComponent,
    BrandsComponent,
    CarrersComponent,
    CategoryAllComponent,
    CategoryListComponent,
    CatgMenuComponent,
    CatgMenu2Component,
    ChaCorrectionComponent,
    ChaInvoiceComponent,
    ChaReportsComponent,
    ChaledgerComponent,
    ChaledgerprintComponent,
    ComingSoonComponent,
    ContactUsComponent,
    CorrectionComponent,
    CustomerLedgerPrintComponent,
    CustomerOrderPrintComponent,
    CustomerPoPrintComponent,
    CustomergridviewComponent,
    AvailablePromocodesComponent,
    CatalogueComponent,
    DealerOffersComponent,
    DealerOrdersComponent,
    DealerProductdataUploadComponent,
    DealerStatusComponent,
    GrnStatusPrintComponent,
    DealersOutstandingComponent,
    DiscountsComponent,
    GoodsReceiptDetailComponent,
    GoodsReceiptNoteComponent,
    GoodsReceiptNotePrintComponent,
    PaymentHistoryComponent,
    PendingDealersComponent,
    PoHistoryComponent,
    ProductlistDisplayComponent,
    SchemasComponent,
    DealerNewArrivalsComponent,
    DealerProductListComponent,
    DealersOutstandingPrintComponent,
    FeedbackModalComponent,
    FestivalMultipleSmsComponent,
    FestivalSmsComponent,
    GenerateInvoicePrintComponent,
    InvoiceDocumentsComponent,
    InvoicePrint2Component,
    InvoiceProformaInvoiceComponent,
    InvoicedocumentchaprintComponent,
    DealerRegistrationComponent,
    MonthlySMSComponent,
    MyOrdersComponent,
    NotificationStatusComponent,
    OnlinePurchaseComponent,
    OnportSummaryComponent,
    OnportsummaryprintComponent,
    OutstandingDiscountComponent,
    OutstandingDiscountPrintComponent,
    OutstandingListComponent,
    OutstandingListPrintComponent,
    PaymentfailureComponent,
    PaymentsHistoryComponent,
    PaymentsHistoryPrintComponent,
    PaymentsuccessfullComponent,
    PendingInvoicesComponent,
    PendingInvoicesPrintComponent,
    PendingSupplierPaymentsPrintComponent,
    PendingpiregisterComponent,
    PendingpiregisterprintComponent,
    PosNewUserComponent,
    PosPrintComponent,
    PosUsersComponent,
    ProdCatgegoryComponent,
    ProductIdentificationComponent,
    GenerateImportGrnComponent,
    ImportGrnComponent,
    ImportInvoiceComponent,
    ImportInvoicePrintComponent,
    ImportMakeInvoiceComponent,
    ImportPoComponent,
    ImportPoPrintComponent,
    PmStatusComponent,
    ProductMenuComponent,
    ProductMenu2Component,
    ProductSalesReportComponent,
    ProductWisePurchasePrintComponent,
    QuotationComponent,
    QuotationPrintComponent,
    RatingComponent,
    ReportsPackingPrintComponent,
    ReturnProductsComponent,
    SalesReturnReportComponent,
    SampleComponent,
    SampleHomeComponent,
    SearchListComponent,
    SeeinvoiceListComponent,
    SeeinvoiceListPrintComponent,
    SeepackingListComponent,
    SeepackingListPrintComponent,
    SeependingpoListComponent,
    SeependingpoListPrintComponent,
    StepperComponent,
    StoreLocationComponent,
    SubbComponent,
    OrdersApprovalComponent,
    SupplierConsolidatePackingComponent,
    SupplierFeedbackComponent,
    SupplierInvoicesSupplierPrintComponent,
    SupplierLedgerPrintComponent,
    SupplierPendingPaymentsPrintComponent,
    SupplierRevisedPiListComponent,
    TargetComponent,
    TrackReportComponent,
    TrackReportPrintComponent,
    TransitregisterComponent,
    TransitregisterprintComponent,
    TransportChargesComponent,
    UserProfileComponent,
    ViewCartComponent,
    WhPendingPackingListComponent,
    WhatsappMessagesComponent,
    WhatsappNotificationComponent,
    WishListComponent,
    WishListwhPendingPackingMoreinfoComponent,
    ChaprintComponent,
    GeneratedSupplierInvoicesComponent,
    GroupInvoiceComponent,
    InvoiceEditComponent,
    InvoiceFileUploadsComponent,
    InvoiceslistComponent,
    OrderSummaryComponent,
    PendingSupplierPaymentsComponent,
    PieditComponent,
    PrintInvoiceComponent,
    SupSummaryPrintComponent,
    SupplierGeneratedinvoicesComponent,
    SupplierInvoiceListComponent,
    SupplierInvoicePrintComponent,
    SupplierInvoiceProfomaComponent,
    SupplierInvoicesComponent,
    SupplierInvoicesListComponent,
    SupplierLedgerComponent,
    SupplierOutstandingAmountComponent,
    SupplierPackingListComponent,
    SupplierPackinglistPrintComponent,
    SupplierPendingDoclistComponent,
    SupplierPoApprovalComponent,
    SupplierPoHistoryComponent,
    SupplierPoHistoryTabsComponent,
    SupplierPoListComponent,
    SupplierPoPrintComponent,
    SupplierProductListComponent,
    SupplierProfileEditComponent,
    SupplierProformaInvoiceComponent,
    SupplierReportsSupplierComponent,
    ChallanPrintComponent,
    CustomerDcDetailsComponent,
    GetChallanListComponent,
    MakeChallanComponent,
    MakePackingListComponent,
    PackingListComponent,
    PackingListPrintComponent,
    PackinglistMergedComponent,
    PodataComponent,
    PurchaseOrderPrintComponent,
    PodataPrintComponent,
    StockAcceptanceComponent,
    WhReportsComponent,
    WhStatusComponent,
    WhStockComponent,
    WhSubcatgComponent,
    WhModalComponent,
    BrandProtectionComponent,
    ShopByCategoryComponent
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgbModule,
    MatDatepickerModule,
    MaterialModule,
    HttpClientModule,
    MatDialogModule,
    DragAndDropModule,
    FilterPipe,
    UniquePipe,
    NgxSliderModule
],
  providers: [DatePipe,FilterPipe, NgxSpinnerService, GlobalServiceService, DataServiceService, Broadcaster, ComponentCommunicationService, 
    BnNgIdleService,ShowHideDirective, ToasterService, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
