import { Injectable } from '@angular/core';


declare var toastr: any

@Injectable()
export class ToasterService {

  constructor() { }
 success(title:string,message?:string){
  toastr.options.timeOut = 5000;
  toastr.options.closeButton = true;
  toastr.success(title,message);
  
} 
warning(title:string,message?:string)
{
  toastr.options.timeOut = 5000;
  toastr.options.closeButton = true;
  toastr.warning(message,title)
  toastr.clear()
  
}

error(message:string,title?:string){
  toastr.options.timeOut = 4000;
  toastr.options.closeButton = true;
  toastr.error(message,title)
  }
info(message:string){
  toastr.options.timeOut = 3000;
  toastr.options.closeButton = true;
  toastr.info(message)
}

}