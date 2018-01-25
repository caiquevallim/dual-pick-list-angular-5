import { Injectable, Pipe, PipeTransform } from '@angular/core';
import {isNullOrUndefined} from "util";

@Pipe({
  name: 'searchfilterDualPickList'
})

@Injectable()
export class DualPickListPipe implements PipeTransform {
  transform(items: any[], field: string, value: any): any[] {
    if (!items)
      return [];

    if(!field)
      return items;

    if(!value || value==='')
      return items;

    if(typeof value === 'boolean')
      return items.filter(it => it[field] == value || isNullOrUndefined(it[field]));
    else
      return items.filter(it =>{
        if(typeof it[field] === 'string')
          return it[field].indexOf(value) > -1;
        else
          return it[field] == value;
      });

  }
}
