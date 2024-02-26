import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-dropdown-item',
  templateUrl: './dropdown-item/dropdown-item.component.html',
  styleUrl: './dropdown-item/dropdown-item.component.css'
})

export class DropdownItemComponent {
  constructor(parent: DropDownComponent) {
  }
}

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.css'
})
export class DropDownComponent {

  constructor(private elRef: ElementRef) {

  }

  open: boolean = false

  toggle() {
    this.open = !this.open
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (this.open && !this.elRef.nativeElement.contains(event.target)) this.open = false
  }
}
