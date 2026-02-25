import { Component, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { EstadisticasPartidas, ResultadoPartida } from '../../interfaces/partida';
import { EstadisticasPartidaService } from '../../services/estadisticas-partida-services';

@Component({
  selector: 'app-estadisticas-partida',
  imports: [
    RouterLink,
    DatePipe,
    DecimalPipe,
    ButtonModule,
    CardModule,
    ProgressBarModule,
    TableModule,
    TagModule,
  ],
  templateUrl: './estadisticas-partida.html',
  styleUrl: './estadisticas-partida.css',
})
export class EstadisticasPartida implements OnInit {
  estadisticas: EstadisticasPartidas = {
    totalPartidas: 0,
    victorias: 0,
    derrotas: 0,
    totalAciertos: 0,
    mejorRacha: 0,
    historial: [],
  };

  constructor(private estadisticasService: EstadisticasPartidaService) {}

  ngOnInit(): void {
    this.estadisticas = this.estadisticasService.getEstadisticas();
  }

  get porcentajeVictoria(): number {
    if (this.estadisticas.totalPartidas === 0) {
      return 0;
    }

    return (this.estadisticas.victorias / this.estadisticas.totalPartidas) * 100;
  }

  get historial(): ResultadoPartida[] {
    return this.estadisticas.historial;
  }
}
