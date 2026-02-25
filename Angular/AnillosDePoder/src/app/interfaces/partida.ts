export interface Partida {
  id: number;
  aciertosConsecutivos: number;
  finalizada: boolean;
}

export interface PreguntaPartida {
  id: number;
  enunciado: string;
  opciones: string[];
}

export interface ResultadoPartida {
  partidaId: number;
  fecha: string;
  victoria: boolean;
  aciertos: number;
  preguntasRespondidas: number;
}

export interface EstadisticasPartidas {
  totalPartidas: number;
  victorias: number;
  derrotas: number;
  totalAciertos: number;
  mejorRacha: number;
  historial: ResultadoPartida[];
}
