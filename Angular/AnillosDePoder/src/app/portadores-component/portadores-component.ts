import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-portadores-component',
  imports: [FormsModule],
  templateUrl: './portadores-component.html',
  styleUrl: './portadores-component.css',
})
export class PortadoresComponent implements OnInit {
  nombreAnillo = '';
  nombrePortador = '';
  nivelCorrupcion = 0;
  raza = '';

  ngOnInit(): void {
    this.nombreAnillo = localStorage.getItem('nombreAnillo') ?? '';
    this.nombrePortador = localStorage.getItem('nombrePortador') ?? '';
    this.nivelCorrupcion = Number(localStorage.getItem('nivelCorrupcion')) || 0;
    this.raza = localStorage.getItem('raza') ?? '';
  }


  guardarPortador() {
    localStorage.setItem('nombreAnillo', this.nombreAnillo);
    localStorage.setItem('nombrePortador', this.nombrePortador);
    localStorage.setItem('nivelCorrupcion', JSON.stringify(this.nivelCorrupcion));
    localStorage.setItem('raza', this.raza);
    alert('Portador guardado correctamente');
  }

  limpiarFormulario() {
    this.nombreAnillo = '';
    this.nombrePortador = '';
    this.nivelCorrupcion = 0;
    this.raza = '';
  }
}
