import { Component, ElementRef, ViewChild } from '@angular/core';
import { Remesa } from '../../models/remesa';
import { Observable } from 'rxjs';
import { RemesasService, RemesaFilter } from '../../services/remesas.service';
import { TablePaginationComponent } from '../table-pagination/table-pagination.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  today: Date = new Date()

  activeSearchBox: boolean = false
  @ViewChild('searchInput') searchInputRef!: ElementRef<HTMLInputElement>

  data = this.remesasService.getRemesas.bind(this.remesasService)
  filterParams: RemesaFilter = {
    status: "COBRADO"
  }
  remesas: Remesa[] = []
  @ViewChild(TablePaginationComponent) tableRef!: TablePaginationComponent 

  searchForm: FormGroup

  user = this.userServ.user

  constructor(private remesasService: RemesasService,
    private fb: FormBuilder,
    private userServ: UsuariosService) {
    this.searchForm = this.fb.group({
      searchString: this.fb.control(''),
      status: this.fb.control('COBRADO')
    })

    this.searchForm.get('searchString')?.valueChanges.subscribe(() => {
      setTimeout(() => {
        this.refreshTable()
      })
    })

    this.remesasService.valuesChanged.subscribe(() => {
      this.refreshTable()
    })
  }

  refreshTable() {
    this.filterParams = this.searchForm.value
  }

  openSearchBox() {
    if (!this.activeSearchBox) {
      this.activeSearchBox = true
      setTimeout(() => {
        this.searchInputRef.nativeElement.focus()
      }, 0)
    }
  }

}
