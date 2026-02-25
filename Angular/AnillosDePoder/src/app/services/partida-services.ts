import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Partida, PreguntaPartida } from '../interfaces/partida';

@Injectable({
  providedIn: 'root',
})
export class PartidaService {
  private readonly baseUrl = environment.apiESDLA;
  private idLocal = 1000;

  private readonly preguntasLocal = [
    {
      id: 1,
      enunciado: '¿Quién forjó el Anillo Único?',
      opciones: ['Sauron', 'Celebrimbor', 'Elrond', 'Durin III'],
      correcta: 1,
    },
    {
      id: 2,
      enunciado: '¿Cuántos anillos recibieron los hombres?',
      opciones: ['3', '7', '9', '1'],
      correcta: 3,
    },
    {
      id: 3,
      enunciado: '¿Qué pueblo recibió siete anillos?',
      opciones: ['Elfos', 'Hombres', 'Enanos', 'Hobbits'],
      correcta: 3,
    },
    {
      id: 4,
      enunciado: '¿Dónde se destruye el Anillo Único?',
      opciones: ['Minas Tirith', 'Moria', 'Monte del Destino', 'Númenor'],
      correcta: 3,
    },
    {
      id: 5,
      enunciado: '¿Quién porta Narya?',
      opciones: ['Galadriel', 'Gandalf', 'Sauron', 'Aragorn'],
      correcta: 2,
    },
  ];

  constructor(private http: HttpClient) {}

  empezarPartida(): Observable<Partida> {
    return this.http
      .post(`${this.baseUrl}empezarPartida/`, null, { responseType: 'text' })
      .pipe(map((response) => this.normalizarPartida(response)));
  }

  obtenerPregunta(idPartida: number): Observable<PreguntaPartida> {
    return this.http
      .get<unknown>(`${this.baseUrl}obtenerPregunta/${idPartida}`)
      .pipe(map((response) => this.normalizarPregunta(response)));
  }

  comprobarRespuesta(idPregunta: number, respuestaUsuario: number): Observable<boolean> {
    return this.http
      .get(`${this.baseUrl}respuesta/${idPregunta}/?respuestaUsuario=${respuestaUsuario}`, {
        responseType: 'text',
      })
      .pipe(map((response) => this.normalizarBoolean(response)));
  }

  correcta(idPartida: number): Observable<unknown> {
    return this.http.put(`${this.baseUrl}correcta/${idPartida}/`, {}, { responseType: 'text' });
  }

  finalizar(idPartida: number): Observable<unknown> {
    return this.http.put(`${this.baseUrl}finalizar/${idPartida}/`, {}, { responseType: 'text' });
  }

  empezarPartidaLocal(): Partida {
    this.idLocal += 1;
    return {
      id: this.idLocal,
      aciertosConsecutivos: 0,
      finalizada: false,
    };
  }

  obtenerPreguntaLocal(preguntasContestadas: Set<number>): PreguntaPartida | null {
    const pendientes = this.preguntasLocal.filter((p) => !preguntasContestadas.has(p.id));
    if (pendientes.length === 0) {
      return null;
    }
    const random = Math.floor(Math.random() * pendientes.length);
    const elegida = pendientes[random];
    return {
      id: elegida.id,
      enunciado: elegida.enunciado,
      opciones: elegida.opciones,
    };
  }

  comprobarRespuestaLocal(idPregunta: number, respuestaUsuario: number): boolean {
    const pregunta = this.preguntasLocal.find((item) => item.id === idPregunta);
    if (!pregunta) {
      return false;
    }
    return pregunta.correcta === respuestaUsuario;
  }

  private normalizarPartida(data: unknown): Partida {
    const valor = this.parseValor(data);

    if (typeof valor === 'number') {
      return {
        id: valor,
        aciertosConsecutivos: 0,
        finalizada: false,
      };
    }

    if (typeof valor === 'string') {
      const parsed = Number(valor.trim());
      if (!Number.isNaN(parsed)) {
        return {
          id: parsed,
          aciertosConsecutivos: 0,
          finalizada: false,
        };
      }
    }

    const record = this.asRecord(valor);
    const id = this.leerNumero(record, ['id', 'partidaId']);

    if (id === null) {
      throw new Error('No se pudo obtener el id de la partida');
    }

    const aciertos = this.leerNumero(record, ['aciertosConsecutivos', 'puntuacion']) ?? 0;
    const finalizada = this.leerBoolean(record, ['finalizada']) ?? false;

    return {
      id,
      aciertosConsecutivos: aciertos,
      finalizada,
    };
  }

  private normalizarPregunta(data: unknown): PreguntaPartida {
    const record = this.asRecord(this.parseValor(data));
    const enunciado =
      this.leerTexto(record, ['pregunta', 'texto', 'enunciado', 'question']) ??
      'Pregunta no informada';

    const opciones = this.leerOpciones(record);

    if (opciones.length < 2) {
      throw new Error('La pregunta recibida no contiene suficientes opciones');
    }

    const id =
      this.leerNumero(record, ['id', 'idPregunta', 'preguntaId']) ?? this.hashTexto(enunciado);

    return {
      id,
      enunciado,
      opciones,
    };
  }

  private normalizarBoolean(data: unknown): boolean {
    const valor = this.parseValor(data);

    if (typeof valor === 'boolean') {
      return valor;
    }

    if (typeof valor === 'string') {
      return valor.toLowerCase().trim() === 'true';
    }

    const record = this.asRecord(valor);
    const value = record['resultado'] ?? record['correcta'] ?? record['value'];

    if (typeof value === 'boolean') {
      return value;
    }

    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }

    return false;
  }

  private leerOpciones(record: Record<string, unknown>): string[] {
    const candidatas = record['opciones'] ?? record['respuestas'] ?? record['answers'];

    if (Array.isArray(candidatas)) {
      return candidatas.filter((item): item is string => typeof item === 'string');
    }

    const keys = [
      'opcion1',
      'opcion2',
      'opcion3',
      'opcion4',
      'respuesta1',
      'respuesta2',
      'respuesta3',
      'respuesta4',
    ];

    const opciones: string[] = [];

    for (const key of keys) {
      const value = record[key];
      if (typeof value === 'string' && value.trim().length > 0) {
        opciones.push(value);
      }
    }

    return opciones;
  }

  private leerNumero(record: Record<string, unknown>, keys: string[]): number | null {
    for (const key of keys) {
      const value = record[key];
      if (typeof value === 'number' && Number.isFinite(value)) {
        return value;
      }
      if (typeof value === 'string' && value.trim().length > 0) {
        const parsed = Number(value);
        if (!Number.isNaN(parsed)) {
          return parsed;
        }
      }
    }
    return null;
  }

  private leerBoolean(record: Record<string, unknown>, keys: string[]): boolean | null {
    for (const key of keys) {
      const value = record[key];
      if (typeof value === 'boolean') {
        return value;
      }
      if (typeof value === 'string') {
        return value.toLowerCase() === 'true';
      }
    }
    return null;
  }

  private leerTexto(record: Record<string, unknown>, keys: string[]): string | null {
    for (const key of keys) {
      const value = record[key];
      if (typeof value === 'string' && value.trim().length > 0) {
        return value;
      }
    }
    return null;
  }

  private asRecord(data: unknown): Record<string, unknown> {
    return typeof data === 'object' && data !== null ? (data as Record<string, unknown>) : {};
  }

  private parseValor(data: unknown): unknown {
    if (typeof data !== 'string') {
      return data;
    }

    const trimmed = data.trim();

    if (trimmed.length === 0) {
      return data;
    }

    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        return JSON.parse(trimmed);
      } catch {
        return data;
      }
    }

    return data;
  }

  private hashTexto(texto: string): number {
    let hash = 0;
    for (let i = 0; i < texto.length; i += 1) {
      hash = (hash << 5) - hash + texto.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }
}
