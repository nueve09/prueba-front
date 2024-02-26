import { Injectable } from '@angular/core';
import { Types } from '../shared/toast/toast.component';

export interface Toast {
  title: string
  message: string
  type: Types
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: Toast[] = []
  constructor() { }

  add(toast: Toast) {
    this.toasts.push(toast)
  }

  remove(i: number) {
    this.toasts.splice(i, 1)
  }
}
