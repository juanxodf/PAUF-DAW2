import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-crear-anillo',
  imports: [ReactiveFormsModule, SelectModule, InputTextModule, TextareaModule, ButtonModule, RouterLink],
  templateUrl: './crear-anillo.html',
  styleUrl: './crear-anillo.css',
})
export class CrearAnillo {
  razas = ['Elfo', 'Enano', 'Humano', 'Maiar', 'Oscuro'];

  formulario: FormGroup = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    portador: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    raza: new FormControl('', [
      Validators.required,
    ]),
    poder: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    corrupcion: new FormControl(0, [
      Validators.required,
    ]),
  });

  enviar() {
    alert;
  }

  limpiar() {
    this.formulario.reset();
  }
}
