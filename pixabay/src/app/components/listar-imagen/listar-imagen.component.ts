import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css']
})
export class ListarImagenComponent implements OnInit {

  termino: string;
  suscripcion: Subscription;
  listImagenes: any[] = [];

  constructor(private _imagenService: ImagenService) { 
    this.termino = '';
    this.suscripcion = _imagenService.getTerminoBusqueda().subscribe(termino => {
      this.termino = termino;
      this.obtenerImagenes();
    });
  }

  ngOnInit(): void {
  }

  obtenerImagenes(){
    this._imagenService.getImagenes(this.termino).subscribe(data => {
      console.log(data);

      if(data.hits.length === 0) {
        this._imagenService.setError('No se encontró ningún resultado');
        return;
      }
      this.listImagenes = data.hits;
    }, error => {
      this._imagenService.setError('Opps... ocurrió un error');
    });
  }

}
