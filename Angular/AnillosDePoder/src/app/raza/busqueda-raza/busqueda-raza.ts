import { Component } from '@angular/core';
import { Razas } from '../../clases/razas';
import { Raza } from '../../interfaces/raza';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";



@Component({
  selector: 'app-busqueda-raza',
  imports: [InputTextModule, FormsModule, ButtonModule, CommonModule, RouterLink],
  templateUrl: './busqueda-raza.html',
  styleUrl: './busqueda-raza.css',
})
export class BusquedaRaza {

  razas = Razas;

  razasFiltradas: Raza[] = this.razas;
  campoBusqueda: string = '';
  buscar() {

     const t = this.campoBusqueda.toLowerCase();

    this.razasFiltradas = this.razas.filter(a =>
      a.nombre.toLowerCase().includes(t) ||
      a.regionPrincipal.toLowerCase().includes(t) ||
      a.longevidad.toLowerCase().includes(t) ||
      a.descripcion.toLowerCase().includes(t)
    );

  }
}
