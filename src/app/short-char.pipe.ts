import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortChar'
})
export class ShortCharPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.substring(0, 10);
  }

}
