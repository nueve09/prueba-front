import { Component } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Menu  {
  link: string,
  icon: IconProp
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  isCollapsed: boolean = false

  menus: Menu[] = [
    {link: '/home', icon: 'home'},
    {link: '/calculator', icon: 'hand-holding-dollar'},
    {link: '/creditCard', icon: ['far', 'credit-card']},
    {link: '/medicBill', icon: ['far', 'file-lines']},
    {link: '/cashBack', icon: 'arrow-rotate-right'},
    {link: '/statistics', icon: ['far', 'folder']},
  ]

  collapseToggle() {
    this.isCollapsed = !this.isCollapsed
  }
}
