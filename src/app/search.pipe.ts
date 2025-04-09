import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(array: any[], searchText: string): any[] {
    if (!array) return [];
    if (!searchText) return array;
    searchText = searchText.toLowerCase();
    return array.filter(it => {
      return it.first_name.toLowerCase().includes(searchText)|| it.email.toLowerCase().includes(searchText) || it.mobile.toLowerCase().includes(searchText);
    });

  }
}
