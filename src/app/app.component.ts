import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'calculadora';
  
  constructor(
    @Inject(DOCUMENT) private document: Document,
    public toatService: ToastService
  ){
    const style = this.document.createElement('link')
    style.href = 'assets/themes/main.css'
    style.rel = 'stylesheet'
    this.document.head.appendChild(style)
  }
}
