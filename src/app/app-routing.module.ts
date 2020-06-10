import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HeroesComponent } from './pages/heroes/heroes.component';

const APP_ROUTES: Routes = [
  { path: 'heroe/:id', component: HeroeComponent},
  { path: 'heroes', component: HeroesComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'heroes'}
] 


@NgModule({
  exports: [ 
    RouterModule
  ],
  imports: [
    RouterModule.forRoot( APP_ROUTES )
  ]
})
export class AppRoutingModule { }
