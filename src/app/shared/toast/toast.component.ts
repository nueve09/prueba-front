import { animate, state, style, transition, trigger, AnimationEvent } from '@angular/animations';
import { Component, Output, EventEmitter, AfterViewInit, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type Types = "primary" | "success" | "warning" | "danger"

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
  animations: [
    trigger('toastAnimation', [
      state('initial', style({
        transform: 'translate(0)',
        opacity: 0.8
      })),
      state('hidden', style({
        transform: 'translate(200px, 0)',
        opacity: 0
      })),
      transition('void => initial', [
        style({
          opacity: 0,
          transform: 'translate(0)'
        }),
        animate('500ms'),]),
      transition('initial => hidden', [animate('300ms'),], {})
    ])
  ]
})
export class ToastComponent implements AfterViewInit {
  @Output() hidden: EventEmitter<void> = new EventEmitter()

  @Input() title: string = ""
  @Input() message: string = ""
  @Input()
  set type(type: Types) {
    switch (type) {
      case ("success"):
        this.icon = 'check'
        this.class = 'bg-success'
        break
      case ("warning"):
        this.icon = 'exclamation'
        this.class = 'bg-warning'
        break
      case ("danger"):
        this.icon = 'xmark'
        this.class = 'bg-danger'
        break
      default:
        this.icon = 'info'
        this.class = 'bg-primary'
        break
    }
  }

  constructor() {
    this.type = "primary"
  }

  @Input() autohide: boolean = true
  @Input() delay: number = 2000

  state: string = 'initial'
  icon!: IconProp
  class!: string

  private timerId: ReturnType<typeof setTimeout> | undefined
  private remaining: number = this.delay
  private start: number | undefined

  ngAfterViewInit(): void {
    if (this.autohide) {
      this.start = new Date().getTime()
      this.timerId = setTimeout(() => {
        this.hide()
      }, this.delay)
    }
  }

  hide() {
    if (this.timerId) window.clearTimeout(this.timerId);
    this.state = 'hidden'
  }

  pause () {
    window.clearTimeout(this.timerId);
    this.timerId = undefined;
    this.remaining -= Date.now() - (this.start??0);
  };

  resume() {
    if (this.timerId) return

    this.start = new Date().getTime()
    setTimeout(() => {
      this.hide()
    }, this.remaining)
  }
}
