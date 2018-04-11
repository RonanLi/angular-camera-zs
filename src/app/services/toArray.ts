import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'toArray', pure: false})
export class ToArray implements PipeTransform {
  transform(value: any) { return value.split(",") }
}
