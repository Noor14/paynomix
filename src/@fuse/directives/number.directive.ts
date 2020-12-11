import { Directive, ElementRef, HostListener } from '@angular/core';
import { validator } from '../../constants/globalFunctions';

@Directive({
  selector: '[numberOnly]'
})
export class NumberDirective {

 // Allow key codes for special events. Reflect :
 // Backspace, tab, end, home
 private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'control'];

constructor(private el: ElementRef) {
 }
 @HostListener('keydown', [ '$event' ])
 onKeyDown(event: KeyboardEvent) {
    const regex = validator.number;
      // Allow Backspace, tab, end, and home keys
      if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
      }
      let current: string = this.el.nativeElement.value;
      let next: string = current.concat(event.key);
      if (next && !String(next).match(regex)) {
      event.preventDefault();
      }
 }

}