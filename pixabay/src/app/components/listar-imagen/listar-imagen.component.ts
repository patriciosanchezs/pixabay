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
  loading: boolean;
  imagenesPorPagina: number;
  paginaActual: number;
  calcularTotalPaginas: number;

  constructor(private _imagenService: ImagenService) {
    this.termino = '';
    this.loading = false;
    this.imagenesPorPagina = 30;
    this.paginaActual = 1;
    this.calcularTotalPaginas = 0;
    this.suscripcion = _imagenService.getTerminoBusqueda().subscribe(termino => {
      this.termino = termino;
      this.loading = true;
      this.paginaActual = 1;
      this.obtenerImagenes();
    });
  }

  ngOnInit(): void {
  }

  obtenerImagenes() {
    this._imagenService.getImagenes(this.termino, this.imagenesPorPagina, this.paginaActual).subscribe(data => {
      this.calcularTotalPaginas = Math.ceil(data.totalHits / this.imagenesPorPagina);
      this.loading = false;
      if (data.hits.length === 0) {
        this._imagenService.setError('No se encontró ningún resultado');
        return;
      }
      this.listImagenes = data.hits;
    }, error => {
      this._imagenService.setError('Opps... ocurrió un error');
    });
  }

  paginaAnterior(): void {
    this.paginaActual--;
    this.loading = true;
    this.listImagenes = [];
    this.obtenerImagenes();
  }

  paginaPosterior(): void {
    this.paginaActual++;
    this.loading = true;
    this.listImagenes = [];
    this.obtenerImagenes();
  }

}
