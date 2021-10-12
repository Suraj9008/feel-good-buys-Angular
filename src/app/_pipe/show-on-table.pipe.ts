import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showOnTable'
})
export class ShowOnTablePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.toString().replace(/_/g, " ");
  }
}

