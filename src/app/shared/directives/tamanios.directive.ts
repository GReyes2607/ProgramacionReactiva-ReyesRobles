import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appTamanios]'
})
export class TamaniosDirective implements OnChanges {

  @Input()
  appTamanios = '';

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.setFontSize();
  }

  setFontSize(): void {
     this.renderer2.setStyle(this.elementRef.nativeElement, 'font-size', this.appTamanios);
  }

}
