import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
})
export class InitialsPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const names = value.trim().split(/\s+/);

    if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase();
    }

    const first = names[0].charAt(0);
    const last = names[names.length - 1].charAt(0);

    return (first + last).toUpperCase();
  }
}
