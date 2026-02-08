import { Component } from '@angular/core';
import { ConfirmarPopup } from '../confirmar-popup/confirmar-popup';
import { Buscar } from '../../personaje/buscar/buscar-personaje';
import { ConfiguracionPopup } from '../../interfaces/configuracion.popup';
import { ButtonSeverity } from "primeng/button";

@Component({
  selector: 'app-padre',
  imports: [ConfirmarPopup],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {
  
  parametrosModal: ConfiguracionPopup = {
    message : "Buenas este es mi primer popup",
    header : "Personaje",
    nameButton: "Borrar",
    severity: "danger"
  }

}