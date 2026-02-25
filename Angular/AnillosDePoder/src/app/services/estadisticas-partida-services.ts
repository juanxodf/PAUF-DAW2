import { Injectable } from '@angular/core';
import { EstadisticasPartidas, ResultadoPartida } from '../interfaces/partida';

@Injectable({
  providedIn: 'root',
})
export class EstadisticasPartidaService {
  private readonly storageKey = 'estadisticas_partidas_anillos';

  getEstadisticas(): EstadisticasPartidas {
    const guardadas = localStorage.getItem(this.storageKey);

    if (!guardadas) {
      return this.estadisticasIniciales();
    }

    try {
      const parsed = JSON.parse(guardadas) as Partial<EstadisticasPartidas>;
      return {
        totalPartidas: parsed.totalPartidas ?? 0,
        victorias: parsed.victorias ?? 0,
        derrotas: parsed.derrotas ?? 0,
        totalAciertos: parsed.totalAciertos ?? 0,
        mejorRacha: parsed.mejorRacha ?? 0,
        historial: Array.isArray(parsed.historial) ? parsed.historial : [],
      };
    } catch {
      return this.estadisticasIniciales();
    }
  }

  registrarResultado(resultado: ResultadoPartida): void {
    const actuales = this.getEstadisticas();

    const actualizadas: EstadisticasPartidas = {
      totalPartidas: actuales.totalPartidas + 1,
      victorias: actuales.victorias + (resultado.victoria ? 1 : 0),
      derrotas: actuales.derrotas + (resultado.victoria ? 0 : 1),
      totalAciertos: actuales.totalAciertos + resultado.aciertos,
      mejorRacha: Math.max(actuales.mejorRacha, resultado.aciertos),
      historial: [resultado, ...actuales.historial].slice(0, 30),
    };

    localStorage.setItem(this.storageKey, JSON.stringify(actualizadas));
  }

  private estadisticasIniciales(): EstadisticasPartidas {
    return {
      totalPartidas: 0,
      victorias: 0,
      derrotas: 0,
      totalAciertos: 0,
      mejorRacha: 0,
      historial: [],
    };
  }
}
