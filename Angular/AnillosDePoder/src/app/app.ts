import { Component, signal,OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { environment } from './environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ButtonModule,RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('anillosDePoder');

}