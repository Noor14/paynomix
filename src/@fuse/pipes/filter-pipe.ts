import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipeDirective implements PipeTransform {
 
  transform(value: any, type: string,  args?: any): any {
    if(!args || !type)
     return value;
    else{
        return value.filter(
            item => item.name.toLowerCase().indexOf(args.toLowerCase()) > -1
         );
    
    }

  }
}
