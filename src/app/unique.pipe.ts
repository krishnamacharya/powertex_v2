import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash'; 

@Pipe({
  name: 'unique',
  pure: false

})
export class UniquePipe implements PipeTransform {
  transform(resources1: any): any{
    if(resources1!== undefined && resources1!== null){
        return _.uniqBy(resources1, 'subcategory');
    }
    return resources1;
}

//   transform(products: any[], field : string): any[] {

//     if (!products) return [];
//     var flags = [], output = [], l = products.length, i

//     for( i=0; i<l; i++) {
//         if( flags[products[i][field]]) continue;
//         flags[products[i][field]] = true;
//         output.push(products[i]);
//     }

//     return output
// }

}
