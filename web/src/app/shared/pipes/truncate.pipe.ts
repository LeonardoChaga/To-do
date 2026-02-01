import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(
    value: string | null | undefined,
    limit: number = 100,
    suffix: string = '...',
  ): string {
    if (!value) {
      return '';
    }

    if (value.length <= limit) {
      return value;
    }

    let truncated = value.slice(0, limit);

    const lastSpace = truncated.lastIndexOf(' ');

    if (lastSpace > limit * 0.6) {
      truncated = truncated.slice(0, lastSpace);
    }

    return truncated + suffix;
  }
}
