import { Component, signal,OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { environment } from './environments/environment';
import { PopupConfirmar } from "./modal/popup-confirmar/popup-confirmar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, RouterLink, PopupConfirmar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
confirmDelete: any;
abrirModal() {
throw new Error('Method not implemented.');
}
  protected readonly title = signal('anillosDePoder');

}