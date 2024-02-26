import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, catchError, of, tap, Subject, debounceTime, switchMap, delay } from 'rxjs';
import { PaginationRequest, PaginationResponse } from '../../models/pagination';

interface State extends PaginationRequest {
  params?: {}
}

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrl: './table-pagination.component.css'
})
export class TablePaginationComponent<T extends object = any> implements OnInit, OnDestroy {

  @Input() dataObservable: ((params: any) => Observable<PaginationResponse<T>>) | undefined
  show: boolean = false

  loading: boolean = true
  subscription: Subscription | undefined
  search: Subject<void> = new Subject<void>()

  rows: T[] = []
  collectionSize: number = 0
  pages: number[] = []

  @Input()
  get page(): number { return this.state.page ?? 1 }
  set page(page: number) {
    this._set({ page })
  }
  @Input()
  get pageSize(): number { return this.state.pageSize ?? 0 }
  set pageSize(pageSize: number) {
    this._set({ pageSize })
  }
  @Input()
  get params(): Object { return this.state.params ?? {} }
  set params(params: Object) { 
    this.state.page = 1
    this._set({ params }) 
  }

  @Input()
  set sortColumn(sortColumn: string) {
    this._set({ sortColumn })
  }
  @Input()
  set sortDirection(sortDirection: "asc" | "desc") { this._set({ sortDirection }) }

  state: State = {
    page: 1,
    pageSize: 10,
    params: {}
  }

  ngOnInit(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
    this.subscription = this.search.pipe(
      tap(() => {
        this.loading = true
        this.show = true
      }),
      debounceTime(200),
      switchMap(() => {
        const params = (({ params, ...theRest }) => ({ ...theRest, ...params }))(this.state)
        if (!this.dataObservable) return of({ rows: [], count: 0 })
        return this.dataObservable(params)
      }),
      catchError((error) => {
        console.error("error", error)
        return of({ rows: [], count: 0 })
      }),
      delay(200),
      tap(() => {
        this.loading = false
      })
    ).subscribe(result => {
      this.rows = result.rows
      this.collectionSize = result.count
      this.pages = Array(Math.ceil(this.collectionSize / (this.pageSize ? this.pageSize : 1)))
    })
    this.search.next()
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  private _set(patch: Partial<State>) {
    Object.assign(this.state, patch);
    this.search.next();
  }

  pageChange(page: number) {
    if (page !== this.page && page > 0 && page <= this.pages.length) {
      this._set({page: page})
    } 
  }
}
