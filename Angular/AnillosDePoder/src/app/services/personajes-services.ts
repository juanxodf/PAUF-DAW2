import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Personaje } from '../interfaces/personaje';


@Injectable({
  providedIn: 'root',
})
export class PersonajesService {
  constructor(private http: HttpClient) {}

  private baseUrl = environment.apiESDLA;

  obtenerPersonajes() {
    return this.http.get(`${this.baseUrl}listaPersonajes`);
  }

  getCharacter(id:number){
    return this.http.get(`${this.baseUrl}obtenerPersonaje/${id}`)
  }

  crearPersonaje(personaje:Personaje){
    return this.http.post(`${this.baseUrl}insertarPersonaje`, personaje)
  }
  
  modificarPersonaje(personaje: Personaje,id:number) {
    return this.http.put(`${this.baseUrl}actualizarPersonaje/${id}`,personaje)
  }

    bajaFisica(id: number) {
    return this.http.delete(`${this.baseUrl}bajaFisica/${id}`);
  }

  bajaLogica(id: number) {
    return this.http.put(`${this.baseUrl}bajaLogica/${id}`, {});
  }

  reactivar(id: number) {
    return this.http.put(`${this.baseUrl}reactivar/${id}`, {});
  }
}
