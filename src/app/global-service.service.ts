import { Injectable } from "@angular/core";
// import { Http, RequestOptions, Headers } from "@angular/http";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { BehaviorSubject, forkJoin, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class GlobalServiceService {
  getDataWithDynamicParam(arg0: string, subcategory: any) {
    throw new Error('Method not implemented.');
  }
  getSubcategoryList(category: string): void {

  }

  options: any;
  response: any;
  sessionState: any;
  token: any;
  key2: any;
  resources = new BehaviorSubject<any>([]);
  getresource = this.resources.asObservable();
  constructor(public http: HttpClient) {
    this.sessionState = localStorage.getItem("sessionState");
    // window.localStorage.clear();
  }



  apiUrl = "https://www.pptshopee.in/get/";
  posturl = "https://www.pptshopee.in/";
  imageurl = "https://www.pptshopee.in";

  apiUrl1 = 'http://192.168.0.223:8001/get/';
  geturl1 = ' http://192.168.0.223:8001/'
  imageurl1 = 'http://192.168.0.223:8001/'







  updateData(body, methodName) {
    return this.http.put(this.posturl + methodName, body, this.options);
  }
  putDatawithparam(methodName, param, body) {
    return this.http.put(
      this.posturl + methodName + "/" + "?param_other1=" + param,
      body,
      this.options
    );
  }
  putDataWithMethodId(body, methodName, id) {
    return this.http.put(
      this.posturl + methodName + "/" + id + "/",
      body,
      this.options
    );
  }

  //DELETE Method (DELETE)
  deleteData(methodName) {
    return this.http.delete(this.posturl + methodName, this.options);
  }
  getDatawithdelete(methodName, param1) {

    return this.http.delete(this.posturl + methodName + "?transID=" + param1, this.options);
  }
  getDatawithdeleteQuery(methodName, param1, param2) {
    return this.http.delete(
      this.posturl + methodName + "?seq_no=" + param1 + "&productid=" + param2,
      this.options
    );
  }

  // Patch Method
  patchDatawithparam(methodName, param, body) {
    return this.http.patch(
      this.posturl + methodName + "/" + "?param_other1=" + param,
      body,
      this.options
    );
  }
  patchDatawithparam2(methodName, param, body) {
    return this.http.patch(
      this.posturl + methodName + "/" + param + "/",
      body,
      this.options
    );
  }
  patchDatawithparam1(methodName, param) {
    return this.http.patch(this.posturl + methodName + param, this.options);
  }
  patchDatawithbodyparam1(methodName, param, body) {
    return this.http.patch(
      this.posturl + methodName + param + "/",
      body,
      this.options
    );
  }
  //Post Data With Only Method
  postdataonlywithmethod(methodName) {
    return this.http.post(this.posturl + methodName + "/", this.options);
  }
  // POST Method
  postData(body, methodName) {
    return this.http.post(this.posturl + methodName, body, this.options);
  }

  loginurl = "http://192.168.0.223:8001/";

  postdata(body, methodName) {
    return this.http.post(this.loginurl + methodName, body, this.options);
  }

  postData1(methodName, param1) {
    return this.http.post(this.posturl + methodName + "/" + "?param_other1=" + param1, this.options);
  }
  getMethodData(methodName) {
    return this.http.get(this.posturl + methodName, this.options);
  }
  // POST Method
  pdfpostData(body, methodName) {
    return this.http.post(this.posturl + methodName, body, { responseType: 'blob' });
  }
  postDataWithParams(
    methodName,
    process_in,
    json_hdr,
    json_dtl,
    operation_in,
    draft_final_in,
    document_no_out,
    message_out
  ) {
    return this.http.post(
      this.posturl +
      methodName +
      "&process_in=" +
      process_in +
      "&json_hdr=" +
      json_hdr +
      "&json_dtl=" +
      json_dtl +
      "&operation_in=" +
      operation_in +
      "&draft_final_in=" +
      draft_final_in +
      "&document_no_out=" +
      document_no_out +
      "&message_out=" +
      message_out,
      this.options
    );
  }

  getDatawithQuery(methodName, param) {
    return this.http.get(
      this.posturl + methodName + "?num=" + param,
      this.options
    );
  }

  getcheckdata(methodName, param) {
    return this.http.get(
      this.posturl + methodName + "?param_other1=" + param,
      this.options
    );
  }
  // GET Method Start
  getData(methodName) {
    return this.http.get(this.apiUrl + "/" + methodName + "/", this.options);
  }
  getData3(methodName) {
    return this.http.get(this.posturl + methodName + "/", this.options);
  }

  getDataOnlyWithMethod(methodName) {
    return this.http.get(this.posturl + methodName + "/", this.options);
  }
  getData1(body, methodName) {
    return this.http.get(
      this.posturl + methodName + "?user_id=" + body,
      this.options
    );
  }
  getData2(userid, methodName, offertype) {
    return this.http.get(
      this.posturl +
      methodName +
      "?user_id=" +
      userid +
      "&param_other1=" +
      offertype,
      this.options
    );
  }
  getHeaderDetails(input_id, user_id) {
    return this.http.get(
      this.apiUrl + "?input_id=" + input_id + "&user_id=" + user_id,
      this.options
    );
  }

  getDatawithInput_id(input_id) {
    return this.http.get(this.apiUrl + "?input_id=" + input_id, this.options);
  }
  proffesionurl = "192.168.0.223:8001/get_Profession/";
  getDatawithInput_id1(input_id) {
    return this.http.get(this.proffesionurl);
  }
  getDatawithMethodParams1(methodName, param1) {
    return this.http.get(
      this.posturl + methodName + "?param_other1=" + param1,
      this.options
    );
  }
  getDatawithMethodParam2(methodName, param2) {
    return this.http.get(
      this.posturl + methodName + "?param_other2=" + param2,
      this.options
    );
  }
  getDatawithMethod1(methodName) {
    return this.http.get(
      this.posturl + methodName,
      this.options
    );
  }
  getDatawithMethodParam1(methodName, param1) {
    return this.http.get(
      this.posturl + methodName + "?param_other2=" + param1,
      this.options
    );
  }

  ///--New Code Start-----------------------------------------------------------



  UrlData(endpoint: string): string {
    return `${this.geturl1}${endpoint}`;
  }


  getdata1(): Observable<any> {
    return this.http.get(this.UrlData('get_product_category/'));
  }


  getProductsByCategory(category: string): Observable<any> {
    const token = localStorage.getItem('access');

    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : undefined;

    return this.http.get(
      this.UrlData('get_list/') + '?category=' + encodeURIComponent(category),
      headers ? { headers } : {}
    );
  }



  getBannerData(): Observable<any> {
    return this.http.get<any>(this.UrlData('get_banner/'))
  }


  getProfessionData(): Observable<any> {
    return this.http.get<any>(this.UrlData('get_Profession/'))
  }

  //register

  registerUser(data: any): Observable<any> {
    return this.http.post(this.UrlData('api/register/'), data);
  }

  // POST Method
  LoginUser(body: any) {
    return this.http.post(this.UrlData('api/login/'), body);
  }


 

  // getDatawithQueryParamsBrands(paramType: string, value: string): Observable<any> {
  //   const queryParam = `${encodeURIComponent(paramType)}=${encodeURIComponent(value)}`;
  //   const url = `http://192.168.0.223:8001/get_list/?${queryParam}`;
  //   return this.http.get(url);
  // }


  getDatawithQueryParamsBrands(paramType: string, value: string): Observable<any> {
  const queryParam = `${encodeURIComponent(paramType)}=${encodeURIComponent(value)}`;
  const url = this.UrlData(`get_list/?${queryParam}`);
  return this.http.get(url);
}

  getSearchData(key: string, value: string): Observable<any> {
    const params = new HttpParams().set(key, value);
    return this.http.get(this.UrlData('/search/'), { params });
  }

  getNewarrivals(endpoint: string) {
    return this.http.get(`http://192.168.0.223:8001/${endpoint}`, {
      responseType: 'arraybuffer'  // important for TextDecoder to work
    });
  }


  getDataSortedByOrder(order: string): Observable<any> {
  const url = this.UrlData(`get_sorted_data/?order=${encodeURIComponent(order)}`);
  return this.http.get(url);
}

getProductsByPriceRange(min: number, max: number): Observable<any> {
   const url = this.UrlData(`get_list/?min=${min}&max=${max}`);
  return this.http.get(url);
}


  //------------------------------------------------------------------------------------------------------- New Logic end
  getDatawithMethodParam12(methodName, param1, param2, param3) {
    return this.http.get(
      this.posturl + methodName + "?param_other2=" + param1 + "&fromdate=" +
      param2 + "&todate=" +
      param3,
      this.options
    );
  }
  getDatawithMethodParams2(methodName, param1, param2) {
    return this.http.get(
      this.posturl +
      methodName +
      "?param_other1=" +
      param1 +
      "&param_other2=" +
      param2,
      this.options
    );
  }

  getDatawithQueryParamsBrand(input_id, param1, param2, param3, param4, param5) {
    return this.http.get(
      this.apiUrl +
      "?input_id=" +
      input_id +
      "&param_other1=" +
      param1 +
      "&param_other2=" +
      param2 +
      "&param_other3=" +
      param3 +
      "&param_other4=" +
      param4 +
      "&brand=" +
      param5,
      this.options
    );
  }


  getDatawithMethodParams2dates(methodName, param1, param2) {
    return this.http.get(
      this.posturl +
      methodName +
      "?fromdate=" +
      param1 +
      "&todate=" +
      param2,
      this.options
    );
  }
  getDatawithMethodParams3(methodName, param1, param2, param3) {
    return this.http.get(
      this.posturl +
      methodName +
      "?param_other1=" +
      param1 +
      "&param_other2=" +
      param2 +
      "&param_other3=" +
      param3,
      this.options
    );
  }
  getDatawithMethodParams4userid(methodName, param1, param2, param3, param4) {
    return this.http.get(
      this.posturl +
      methodName +
      "?param_other1=" +
      param1 +
      "&param_other2=" +
      param2 +
      "&param_other3=" +
      param3 +
      "&yUserid=" +
      param4,
      this.options
    );
  }
  getDatawithMethodParams4(methodName, param1, param2, param3, param4) {
    return this.http.get(
      this.posturl +
      methodName +
      "?param_other1=" +
      param1 +
      "&param_other2=" +
      param2 +
      "&param_other3=" +
      param3 +
      "&param_other4=" +
      param4,
      this.options
    );
  }
  getDatawithMethodParams5(methodName, param1, param2, param3, param4, param5) {
    return this.http.get(
      this.posturl +
      methodName +
      "?param_other1=" +
      param1 +
      "&param_other2=" +
      param2 +
      "&param_other3=" +
      param3 +
      "&param_other4=" +
      param4 +
      "&param_other5=" +
      param5,
      this.options
    );
  }
  getDatawithQueryParams1(input_id, param1) {
    return this.http.get(
      this.apiUrl + "?input_id=" + input_id + "&param_other1=" + param1,
      this.options
    );
  }
  getDatawithQueryPar(methodName, input_id) {
    return this.http.get(
      this.posturl +
      methodName + "?invqhid=" + input_id,
      this.options
    );
  }
  postDatawithQueryPar(methodName, input_id) {
    return this.http.post(
      this.posturl +
      methodName + "?invqhid=" + input_id,
      this.options
    );
  }
  getDatawithQueryPars(methodName, input_id) {
    return this.http.get(
      this.posturl +
      methodName + "?pid=" + input_id,
      this.options
    );
  }

  getDatawithQueryParams2(input_id, param1, param2) {
    return this.http.get(
      this.apiUrl +
      "?input_id=" +
      input_id +
      "&param_other1=" +
      param1 +
      "&param_other2=" +
      param2,
      this.options
    );
  }
  getDatawithQueryParams2userid(input_id, param1, userid) {
    return this.http.get(
      this.apiUrl +
      "?input_id=" +
      input_id +
      "&param_other1=" +
      param1 +
      "&user_id=" +
      userid,
      this.options
    );
  }
  getDatawithQueryParams3(input_id, param1, param2, param3) {
    return this.http.get(
      this.apiUrl +
      "?input_id=" +
      input_id +
      "&param_other1=" +
      param1 +
      "&param_other2=" +
      param2 +
      "&param_other3=" +
      param3,
      this.options
    );
  }

  getDatawithQueryParams4(input_id, param1, param2, param3, param4) {
    return this.http.get(
      this.apiUrl +
      "?input_id=" +
      input_id +
      "&param_other1=" +
      param1 +
      "&param_other2=" +
      param2 +
      "&param_other3=" +
      param3 +
      "&param_other4=" +
      param4,
      this.options
    );
  }

  getDatawithQueryParams5(input_id, param1, param2, param3, param4, param5) {
    return this.http.get(
      this.apiUrl +
      "?input_id=" +
      input_id +
      "&param_other1=" +
      param1 +
      "&param_other2=" +
      param2 +
      "&param_other3=" +
      param3 +
      "&param_other4=" +
      param4 +
      "&param_other5=" +
      param5,
      this.options
    );
  }

  getDatawithQueryParams1nd4(input_id, param1, param4) {
    return this.http.get(
      this.apiUrl +
      "?input_id=" +
      input_id +
      "&param_other1=" +
      param1 +
      "&param_other4=" +
      param4,
      this.options
    );
  }
  getDatawithQueryParams1nd4new(param1, param2, param3) {
    return this.http.get(
      this.posturl + "get_active_dealers_list/" +
      "?param_other1=" +
      param1 + "&param_other2=" +
      param3 + "&param_other3=" +
      param2,
      this.options
    );
  }
  getDatawithQueryParam6(input_id, param1, param2, param3, param4, param6) {
    return this.http.get(
      this.apiUrl +
      "?input_id=" +
      input_id +
      "&param_other1=" +
      param1 +
      "&param_other2=" +
      param2 +
      "&param_other3=" +
      param3 +
      "&param_other4=" +
      param4 +
      "&param_other6=" +
      param6,
      this.options
    );
  }
  getDatawithQueryParams6(
    input_id,
    param1,
    param2,
    param3,
    param4,
    param5,
    param6
  ) {
    return this.http.get(
      this.apiUrl +
      "?input_id=" +
      input_id +
      "&param_other1=" +
      param1 +
      "&param_other2=" +
      param2 +
      "&param_other3=" +
      param3 +
      "&param_other4=" +
      param4 +
      "&param_other5=" +
      param5 +
      "&param_other6=" +
      param6,
      this.options
    );
  }
  getDatawithQueryParams7(
    input_id,
    param1,
    param2,
    param3,
    param4,
    param5,
    param6,
    param7
  ) {
    return this.http.get(
      this.apiUrl +
      "?input_id=" +
      input_id +
      "&param_other1=" +
      param1 +
      "&param_other2=" +
      param2 +
      "&param_other3=" +
      param3 +
      "&param_other4=" +
      param4 +
      "&param_other5=" +
      param5 +
      "&param_other6=" +
      param6 +
      "&param_other7=" +
      param7,
      this.options
    );
  }
  getDatawithQueryParams4User_id(
    input_id,
    param1,
    param2,
    param3,
    param4,
    userid
  ) {
    return this.http.get(
      this.apiUrl +
      "?input_id=" +
      input_id +
      "&param_other1=" +
      param1 +
      "&param_other2=" +
      param2 +
      "&param_other3=" +
      param3 +
      "&param_other4=" +
      param4 +
      "&user_id=" +
      userid,
      this.options
    );
  }

  getDatawithQueryParams7User_id(
    input_id,
    param1,
    param2,
    param3,
    param4,
    param5,
    param6,
    param7,
    userid
  ) {
    return this.http.get(
      this.apiUrl +
      "?input_id=" +
      input_id +
      "&param_other1=" +
      param1 +
      "&param_other2=" +
      param2 +
      "&param_other3=" +
      param3 +
      "&param_other4=" +
      param4 +
      "&param_other5=" +
      param5 +
      "&param_other6=" +
      param6 +
      "&param_other7=" +
      param7 +
      "&user_id=" +
      userid,
      this.options
    );
  }
  getDatawithQueryParams7User_idBrand(
    input_id,
    param1,
    param2,
    param3,
    param4,
    param5,
    param6,
    param7,
    brand,
    userid
  ) {
    return this.http.get(
      this.apiUrl +
      "?input_id=" +
      input_id +
      "&param_other1=" +
      param1 +
      "&param_other2=" +
      param2 +
      "&param_other3=" +
      param3 +
      "&param_other4=" +
      param4 +
      "&param_other5=" +
      param5 +
      "&param_other6=" +
      param6 +
      "&param_other7=" +
      param7 +
      "&brand=" +
      brand +
      "&user_id=" +
      userid,
      this.options
    );
  }




  getDatawithQueryParams7User_idBrand1(
    input_id,
    param1,
    param2,
    param3,
    param4,
    param5,
    param6,
    param7,
    brand,
    userid
  ) {
    return this.http.get(
      this.apiUrl +
      "?input_id=" +
      input_id +
      "&param_other1=" +
      param1 +
      "&param_other2=" +
      param2 +
      "&param_other3=" +
      param3 +
      "&param_other4=" +
      param4 +
      "&param_other5=" +
      param5 +
      "&param_other6=" +
      param6 +
      "&param_other7=" +
      param7 +
      "&brand=" +
      brand +
      "&user_id=" +
      userid,
      this.options
    );
  }

  getDataadminreport(
    input_id,
    param1,
    param2,
    param3,
    param4,
    param5,
    param6,
    param7,
    param8,
    param9
  ) {
    return this.http.get(
      this.apiUrl +
      "?input_id=" +
      input_id +
      "&param_other1=" +
      param1 +
      "&param_other2=" +
      param2 +
      "&param_other5=" +
      param3 +
      "&param_other6=" +
      param4 +
      "&param_other7=" +
      param5 +
      "&param_other8=" +
      param6 +
      "&param_other9=" +
      param7 +
      "&param_other10=" +
      param8 +
      "&param_other11=" +
      param9,
      this.options
    );
  }
  getDatamainadminreport(
    input_id,
    param1,
    param2,
    param3,
    param4,
    param5,
    param6,
    param7,
    param8,
    param9
  ) {
    return this.http.get(
      this.apiUrl +
      "?input_id=" +
      input_id +
      "&param_other1=" +
      param1 +
      "&param_other2=" +
      param2 +
      "&param_other4=" +
      param3 +
      "&param_other6=" +
      param4 +
      "&param_other7=" +
      param5 +
      "&param_other8=" +
      param6 +
      "&param_other9=" +
      param7 +
      "&param_other10=" +
      param8 +
      "&param_other11=" +
      param9,
      this.options
    );
  }

  getCompanycode() {
    return this.http.get(this.posturl + "api/company/", this.options);
  }
  printReport(methodname, type, seqno) {
    return this.http.get(
      this.posturl +
      methodname +
      "?param_other1=" +
      type +
      "&param_other2=" +
      seqno,
      this.options
    );
  }

  forkJoinMethodForInputID1(input_id1, input_id2) {
    return forkJoin(
      this.http.get(this.apiUrl + "?input_id=" + input_id1, this.options),
      this.http.get(this.apiUrl + "?input_id=" + input_id2, this.options)
    );
  }

  check_user() {
    return JSON.parse(localStorage.getItem("access"));
  }


  //new version code

  private usernameSource = new BehaviorSubject<string | null>(null);
  private accessSource = new BehaviorSubject<string | null>(null);
  username$ = this.usernameSource.asObservable();
  access$ = this.accessSource.asObservable();

  setUsername(name: string) {
    this.usernameSource.next(name);
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  setAccessToken(access: any) {
    this.accessSource.next(access)
  }

  getAccessToken(): any | null {
    return localStorage.getItem('access')
  }
}
