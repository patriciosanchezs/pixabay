import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private error$ = new Subject<string>();
  private terminoBusqueda$ = new Subject<string>();

  constructor(private http: HttpClient) { }

  setError(mensaje: string) {
    this.error$.next(mensaje);
  }

  getError(): Observable<string> {
    return this.error$.asObservable();
  }

  enviarTerminoBusqueda(termino: string) {
    this.terminoBusqueda$.next(termino);
  }

  getTerminoBusqueda(): Observable<string> {
    return this.terminoBusqueda$.asObservable();
  }

  getImagenes(query: string, imagenesPorPagina: number, paginaActual: number): Observable<any> {
    const KEY = '21611197-f79c6ab3fdb611b4b1d891bb3';
    const URL = 'https://pixabay.com/api/?key=' + KEY + '&q=' + query + '&per_page=' + imagenesPorPagina + '&page=' + paginaActual;
    return this.http.get(URL);
  }
}
