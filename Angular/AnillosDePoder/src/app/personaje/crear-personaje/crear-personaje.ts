import { ChangeDetectorRef, Component, inject, ɵɵngDeclarePipe } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Personaje } from '../../interfaces/personaje';
import { PersonajesService } from '../../services/personajes-services';

@Component({
  selector: 'app-crear-personaje',
  imports: [ReactiveFormsModule, SelectModule, InputTextModule, ButtonModule, RouterLink, DatePicker],
  templateUrl: './crear-personaje.html',
  styleUrl: './crear-personaje.css',
  standalone: true,
})
export class CrearPersonaje {

  constructor(private personajeService: PersonajesService, private cdr: ChangeDetectorRef) { }


  personaje!: Personaje ;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  razas = ['ELFO', 'ENANO', 'HUMANO', 'MAIAR', 'OSCURO'];

  formulario: FormGroup = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    raza: new FormControl('', [
      Validators.required,
    ]),
    fechaNacimiento: new FormControl<Date | null >(null, [
      Validators.required,
    ]),
    nivelCorrupcion: new FormControl(0, [
      Validators.required,
    ]),
  });

  personajeId: number | null = null
  

  ngOnInit(): void {
    this.personajeId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.personajeId) {
      this.personajeService.getCharacter(this.personajeId).subscribe((personaje) => {
        this.personaje = personaje as Personaje
        this.modificar(this.personaje.nombre,this.personaje.raza,this.stringAFecha(this.personaje.fechaNacimiento),this.personaje.nivelCorrupcion);
      });
    }
  }


  enviar() {
    if (this.personaje != null) {
      this.personajeService.modificarPersonaje(this.formulario.value,this.personaje.id).subscribe({
        next: () => {
          alert('Personaje modificado con exito');
          this.router.navigate(['/buscar-personaje']);
        }, error: (err: string) => {
          alert('Se ha producido un error al modificar el personaje' + err);
        }
      });
    }else {
      this.personajeService.crearPersonaje(this.formulario.value).subscribe({
        next: () => {
          alert('Personaje creado con exito');
          this.router.navigate(['/buscar-personaje']);
        }, error: (err: string) => {
          alert('Se ha producido un error al crear el personaje' + err);
        }
      });
    }
  }

  limpiar() {
    this.formulario.reset();
  }

  modificar(nombre: string, raza: string, fechaNacimiento: Date, nivelCorrupcion: number) {
    this.formulario.setValue({
      nombre: nombre,
      raza: raza,
      fechaNacimiento: fechaNacimiento,
      nivelCorrupcion: nivelCorrupcion,
    }); 
  }

  private stringAFecha(dia: string): Date {
      const [year, month, day] = dia.split('-').map(Number);
     return new Date(year, month - 1, day);
  }

}

