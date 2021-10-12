import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tranform'
})
export class TranformPipe implements PipeTransform {

  transform(value:string, ...args: unknown[]): unknown {
    return value.toString().replace(/ /g,"_");
  }

}
