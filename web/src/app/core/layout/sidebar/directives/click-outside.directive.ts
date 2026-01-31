import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
  @Output() appClickOutside = new EventEmitter<void>();

  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as Node | null;

    if (!target) return;

    if (!this.el.nativeElement.contains(target)) {
      this.appClickOutside.emit();
    }
  }
}
