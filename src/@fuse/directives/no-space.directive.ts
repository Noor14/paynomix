import { Directive, HostListener } from '@angular/core';

@Directive({ selector: '[nospace]' })
export class NoSpaceDirective {
    constructor() { }
    @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent) {
        if(event.keyCode == 32 || event.which == 32)
          event.preventDefault();
    }
}