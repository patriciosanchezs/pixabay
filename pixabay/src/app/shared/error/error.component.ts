import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnDestroy {

  descripcion: string;
  mostrar: boolean;
  suscripcion: Subscription;

  constructor(private _imagenService: ImagenService) { 
    this.descripcion = '';
    this.mostrar = false;
    this.suscripcion = this._imagenService.getError().subscribe(mensaje => {
      this.mostrarMensaje();
      this.descripcion = mensaje;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  mostrarMensaje(): void {
    this.mostrar = true;
    setTimeout(() => {
      this.mostrar = false;
    }, 3000);
  }

}
