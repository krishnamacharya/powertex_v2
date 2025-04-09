import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appShowHide]'
})
export class ShowHideDirective {
  @HostBinding() type: string;
  constructor(){
    this.type='password';
}

changeType(type:string): void {
    this.type = type;
}

}
