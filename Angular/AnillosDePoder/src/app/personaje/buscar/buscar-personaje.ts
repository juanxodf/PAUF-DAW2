import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PersonajesService } from '../../services/personajes-services';
import { Router, RouterLink } from '@angular/router';
import { Personaje } from '../../interfaces/personaje';


@Component({
  selector: 'app-buscar-personaje',
  imports: [RouterLink],
  templateUrl: './buscar-personaje.html',
  styleUrl: './buscar-personaje.css',
})
export class Buscar implements OnInit {

  personajes: Personaje[] = [];
  error = ''

  constructor(private personajeService: PersonajesService, private cdr: ChangeDetectorRef, private route: Router) { }

  editar(id: number) {
    this.route.navigate(["/editar", id])
  }

  ngOnInit(): void {
    this.cargarPersonajes();
  }

  cargarPersonajes() {
    this.personajeService.obtenerPersonajes().subscribe({
      next: data => {
        console.log(data)
        this.personajes = data as Personaje[]
        this.cdr.detectChanges()
        console.log(this.personajes)
      }, error: err => {
        this.error = 'Se ha producido un error'
      }
    })
  }
}

