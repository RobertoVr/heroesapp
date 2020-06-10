import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor( private heroService: HeroesService, private route:ActivatedRoute ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if( id !== 'nuevo'){
      this.heroService.getHeroe( id ).subscribe((resp: HeroeModel) => { 
        this.heroe = resp;
        this.heroe.id = id;
      }); 
    }
  }

  guardar( form: NgForm){
    if( form.invalid ){
      console.log('formulario no valido');
      return;
    }
  
    Swal.fire({
      title: 'Espere..',
      text: 'Guradando Información',
      icon: 'info',
      allowOutsideClick: false
    })
    Swal.showLoading();

    let peticion$ : Observable<any>;

    if( this.heroe.id ){
      peticion$ = this.heroService.actualizarHeroe(this.heroe);
    }else{
      peticion$ = this.heroService.crearHeroe(this.heroe);
    }
    
    peticion$.subscribe(resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizó correctamente',
        icon: 'success'
      })
    });


  }

}
