import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private _user: Usuario = {
    id: 1,
    nombre: 'Elizabeth',
    rol: 'Operador'
  }
  get user (): Usuario {
    return this._user
  }
  constructor() { }
}
