import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, OnInit, Input, Inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[resizable]' // Attribute selector
})

export class ResizableDirective implements OnInit {


  @Input() resizableGrabWidth = 8;
  @Input() resizableMinWidth = 10;

  dragging = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2, @Inject(DOCUMENT) private document
    ) {

    const self = this;

    const EventListenerMode = { capture: true };

    function preventGlobalMouseEvents() {
      document.body.style['pointer-events'] = 'none';
    }

    function restoreGlobalMouseEvents() {
      document.body.style['pointer-events'] = 'auto';
    }


    const newWidth = (wid) => {
      const newWidth = Math.max(this.resizableMinWidth, wid);
      el.nativeElement.style.width = (newWidth) + "px";
      if(newWidth > this.resizableMinWidth){
        el.nativeElement.style["box-shadow"] = "0 2px 8px 0 rgba(0, 0, 0, 0.35)"
      }
      else{
        el.nativeElement.style["box-shadow"] = "unset"
      }
    }


    const mouseMoveG = (evt) => {
      if (!this.dragging) {
        return;
      }
      newWidth(evt.clientX - el.nativeElement.offsetLeft)
      evt.stopPropagation();
    };

    const dragMoveG = (evt) => {
      if (!this.dragging) {
        return;
      }
      const newWidth = Math.max(this.resizableMinWidth, (evt.clientX - el.nativeElement.offsetLeft)) + "px";
      el.nativeElement.style.width = (evt.clientX - el.nativeElement.offsetLeft) + "px";
      evt.stopPropagation();
    };

    const mouseUpG = (evt) => {
      if (!this.dragging) {
        return;
      }
      restoreGlobalMouseEvents();
      this.dragging = false;
      evt.stopPropagation();
    };

    const mouseDown = (evt) => {
      if (this.inDragRegion(evt)) {
        this.dragging = true;
        preventGlobalMouseEvents();
        evt.stopPropagation();
      }
    };


    const mouseMove = (evt) => {
      if (this.inDragRegion(evt) || this.dragging) {
        el.nativeElement.style.cursor = "col-resize";
      } else {
        el.nativeElement.style.cursor = "default";
      }
    }


    document.addEventListener('mousemove', mouseMoveG, true);
    document.addEventListener('mouseup', mouseUpG, true);
    el.nativeElement.addEventListener('mousedown', mouseDown, true);
    el.nativeElement.addEventListener('mousemove', mouseMove, true);
  }

  ngOnInit(): void {
    const child = document.createElement('button');
    const icon = document.createElement('mat-icon');
    icon.textContent = "compare_arrows";
    icon.className = "mat-icon nav-link-icon material-icons mat-accent";
    child.style.backgroundColor = 'white';
    child.style.position = 'absolute';
    child.style.right = '-17px';
    child.style.top = '130px';
    child.style.height = '35px';
    child.style.width = '35px';
    child.style.cursor = 'pointer';
    child.style.borderRadius = '100%';
    child.style.border = '1px solid #e5e5e5';
    this.renderer.appendChild(child, icon);
    this.renderer.appendChild(this.el.nativeElement, child);
    this.el.nativeElement.style.position = 'relative';
    // this.el.nativeElement.style["border-right"] = this.resizableGrabWidth + "px solid darkgrey";
  }

  inDragRegion(evt) {
    return this.el.nativeElement.clientWidth - evt.clientX + this.el.nativeElement.offsetLeft < this.resizableGrabWidth;
  }

}
