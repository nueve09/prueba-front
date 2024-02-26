import { Injectable } from '@angular/core';
import { Observable, Subject, delay, of } from 'rxjs';
import { Remesa } from '../models/remesa';
import { PaginationRequest, PaginationResponse } from '../models/pagination';
import { Toast } from './toast.service';


export interface RemesaFilter {
  searchString?: string
  status?: 'NO_COBRADO' | 'COBRADO'
}

const remesas: Remesa[] = [
  {id:29939301, company:"MoneyGram", amount:4357, status:"COBRADO", created_at:new Date("2023-12-03"), charged_at: new Date("2023-12-03")},
  {id:29939302, company:"Western Union", amount:75373, status:"COBRADO", created_at:new Date("2023-12-03"), charged_at: new Date("2023-10-15")},
  {id:29939303, company:"Western Union", amount:9346, status:"COBRADO", created_at:new Date("2023-12-03"), charged_at: new Date("2023-12-03")},
  {id:29939304, company:"MoneyGram", amount:7312, status:"COBRADO", created_at:new Date("2023-12-24"), charged_at: new Date("2023-08-24")},
  {id:29939305, company:"Western Union", amount:2134, status:"COBRADO", created_at:new Date("2023-12-03"), charged_at: new Date("2023-12-03")},
  {id:29939306, company:"Western Union", amount:456, status:"COBRADO", created_at:new Date("2023-12-20"), charged_at: new Date("2023-04-20")},
  {id:29939307, company:"MoneyGram", amount:4535, status:"COBRADO", created_at:new Date("2023-12-20"), charged_at: new Date("2023-12-01")},
  {id:29939308, company:"MoneyGram", amount:1234, status:"COBRADO", created_at:new Date("2023-12-03"), charged_at: new Date("2023-07-05")},
  {id:29939309, company:"Western Union", amount:386, status:"COBRADO", created_at:new Date("2023-12-03"), charged_at: new Date("2023-12-18")},
  {id:29939310, company:"Western Union", amount:75333, status:"COBRADO", created_at:new Date("2023-12-03"), charged_at: new Date("2023-08-21")},
  {id:29939311, company:"Western Union", amount:1264, status:"COBRADO", created_at:new Date("2023-12-03"), charged_at: new Date("2023-12-12")},
  {id:29939312, company:"MoneyGram", amount:6358, status:"COBRADO", created_at:new Date("2023-12-03"), charged_at: new Date("2023-04-03")},
  {id:29939313, company:"Western Union", amount:8965, status:"COBRADO", created_at:new Date("2023-12-03"), charged_at: new Date("2023-12-28")},
  {id:29939314, company:"MoneyGram", amount:5434, status:"COBRADO", created_at:new Date("2023-12-03"), charged_at: new Date("2023-04-16")},
  {id:29939315, company:"MoneyGram", amount:7536, status:"NO_COBRADO", created_at:new Date("2023-12-03"), charged_at: undefined},
  {id:29939316, company:"Western Union", amount:6343, status:"NO_COBRADO", created_at:new Date("2023-12-03"), charged_at: undefined},
  {id:29939317, company:"MoneyGram", amount:4635, status:"NO_COBRADO", created_at:new Date("2023-12-03"), charged_at: undefined},
  {id:29939318, company:"Western Union", amount:9364, status:"NO_COBRADO", created_at:new Date("2023-12-03"), charged_at: undefined},
  {id:29939319, company:"MoneyGram", amount:4543, status:"NO_COBRADO", created_at:new Date("2023-12-03"), charged_at: undefined},
]

@Injectable({
  providedIn: 'root'
})
export class RemesasService {
  valuesChanged: Subject<void> = new Subject()

  constructor() { }

  getRemesas(params: RemesaFilter & PaginationRequest<Remesa>): Observable<PaginationResponse<Remesa>> {
    let response: Remesa[] = remesas

    const keys: (keyof Remesa)[] = [
      'id',
      'company',
      'amount'
    ] 
    
    if (params.searchString || params.status) {
      response = response.filter(e => {
        let result = true
        if (params.searchString) {
          result = false
          for (const key of keys) {
            result = result || !!(e[key]?.toString().toLowerCase().includes(params.searchString.toLowerCase())) 
          }
        }
        if (params.status) {
          result = result && e.status === params.status
        }
        return result
      })
    }
    if (params.sortColumn !== undefined) {
      const direction = params.sortDirection??'asc'
      const sortColumn = params.sortColumn
      response = response.sort((a, b) => {
          if ((a[sortColumn]??-Infinity) > (b[sortColumn]??-Infinity)) {
            return direction === 'asc' ? 1 : -1;
          }
          if ((a[sortColumn]??-Infinity) < (b[sortColumn]??-Infinity)) {
            return direction === 'asc' ? -1 : 1;
          }
          return 0;
      })
    }

    const count = response.length

    if (params.pageSize) {
      const page = params.page??1
      response = response.slice((page - 1) * params.pageSize, page * params.pageSize)
    }

    return of({rows: response, count}).pipe(delay(300))
  }

  setRemesaAsCharged(id: number): Observable<Toast> {
    const remesa = remesas.find(e => e.id === id)
    if (!remesa) {
      return of({title: 'Error', message: 'No existe el id', type: "danger"})
    } else {
      if (remesa.status === "COBRADO") {
        return of({title: '', type: "primary", message: 'Esta remesa ya ha sido cobrada'})
      } else {
        remesa.charged_at = new Date()
        remesa.status = 'COBRADO'
        this.valuesChanged.next()
        return of({title: '', type: "success", message: 'Remesa cobrada'})
      }
    }
  }
}
