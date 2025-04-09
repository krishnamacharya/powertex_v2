import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false, // Set to false if you want real-time filtering
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }
    
    searchText = searchText.toLowerCase();
  
    return items.filter(item => 
      Object.values(item).some(value => 
        value && value.toString().toLowerCase().includes(searchText)
      )
    );
  }
}
