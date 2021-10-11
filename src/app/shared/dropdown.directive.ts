import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: '[appDropDown]'
})
export class DropdownDirective {
  constructor(
    private elRef: ElementRef
  ){

  }

  @HostBinding('class.show') isOpen = false;

  /*@HostListener('click') toggleOpen(){
    this.isOpen = !this.isOpen;
  }*/

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    //console.log(event);
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }

}

