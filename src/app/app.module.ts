import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { CalculatorComponent } from './pages/calculator/calculator.component';

import localeMx from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
registerLocaleData(localeMx, 'es-MX')

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBell, faFolder, faCreditCard, faFileLines } from '@fortawesome/free-regular-svg-icons';
import { faUser, faMagnifyingGlass, faSliders, faPrint, faKeyboard, faChevronDown,
  faHome, faHandHoldingDollar, faArrowRotateRight, faChevronRight, faChevronLeft,
  faDeleteLeft, faLevelDown, faXmark, faCheck, faExclamation, faInfo
 } from '@fortawesome/free-solid-svg-icons';
import { UnderConstructionComponent } from './pages/under-construction/under-construction.component';
import { DropDownComponent, DropdownItemComponent } from './shared/drop-down/drop-down.component';
import { TablePaginationComponent } from './shared/table-pagination/table-pagination.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './shared/toast/toast.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideBarComponent,
    CalculatorComponent,
    UnderConstructionComponent,
    DropdownItemComponent,
    DropDownComponent,
    TablePaginationComponent,
    ToastComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideClientHydration(),
    {provide: LOCALE_ID, useValue: 'es-MX'},
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'MXN' }, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(library: FaIconLibrary) {
    library.addIcons(faBell, faUser, faMagnifyingGlass, faSliders, faPrint, faKeyboard, faChevronDown,
      faHome, faHandHoldingDollar, faArrowRotateRight, faChevronRight, faChevronLeft,
      faFolder, faCreditCard, faFileLines,
      faDeleteLeft, faLevelDown, faXmark, faCheck, faExclamation, faInfo)
  }
}
