import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'salaryFormat',
})
export class SalaryFormatPipe implements PipeTransform {
  transform(value: any): any {
    if (!value) return 0;
    value = Math.floor(value);
    return `Rp. ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')},00`;
  }
}
