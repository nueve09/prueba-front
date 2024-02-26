import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { UnderConstructionComponent } from './pages/under-construction/under-construction.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/calculator', 
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: UnderConstructionComponent
  },
  {
    path: 'calculator',
    component: CalculatorComponent
  },
  {
    path: 'creditCard',
    component: UnderConstructionComponent
  },
  {
    path: 'medicBill',
    component: UnderConstructionComponent
  },
  {
    path: 'cashBack',
    component: UnderConstructionComponent
  },
  {
    path: 'statistics',
    component: UnderConstructionComponent
  },
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
