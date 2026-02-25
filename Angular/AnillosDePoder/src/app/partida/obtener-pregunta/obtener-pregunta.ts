import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { Partida, PreguntaPartida } from '../../interfaces/partida';
import { PartidaService } from '../../services/partida-services';
import { EstadisticasPartidaService } from '../../services/estadisticas-partida-services';

@Component({
  selector: 'app-obtener-pregunta',
  imports: [RouterLink, ButtonModule, CardModule, ProgressBarModule, ToastModule],
  templateUrl: './obtener-pregunta.html',
  styleUrl: './obtener-pregunta.css',
  providers: [MessageService],
})
export class ObtenerPregunta {
  partida: Partida | null = null;
  preguntaActual: PreguntaPartida | null = null;
  cargando = false;
  mensaje = '';
  error = '';
  modoLocal = false;

  private readonly preguntasContestadas = new Set<number>();

  constructor(
    private partidaService: PartidaService,
    private estadisticasService: EstadisticasPartidaService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {}

  iniciarPartida(): void {
    this.cargando = true;
    this.error = '';
    this.mensaje = '';
    this.preguntaActual = null;
    this.partida = null;
    this.modoLocal = false;
    this.preguntasContestadas.clear();

    this.partidaService.empezarPartida().subscribe({
      next: (partida) => {
        this.partida = partida;
        this.mensaje = 'Partida iniciada. ¡A por las 5 seguidas!';
        this.cargarPregunta();
      },
      error: (err: unknown) => {
        this.iniciarPartidaLocal(err);
      },
    });
  }

  responder(indexRespuesta: number): void {
    if (!this.partida || !this.preguntaActual || this.partida.finalizada || this.cargando) {
      return;
    }

    this.cargando = true;
    const idPregunta = this.preguntaActual.id;

    if (this.modoLocal) {
      this.preguntasContestadas.add(idPregunta);
      const correcta = this.partidaService.comprobarRespuestaLocal(idPregunta, indexRespuesta + 1);
      if (correcta) {
        this.registrarAcierto();
      } else {
        this.finalizarPartida(false, 'Has fallado una pregunta. Partida finalizada.');
      }
      return;
    }

    this.partidaService.comprobarRespuesta(idPregunta, indexRespuesta + 1).subscribe({
      next: (correcta) => {
        this.preguntasContestadas.add(idPregunta);

        if (correcta) {
          this.registrarAcierto();
          return;
        }

        this.finalizarPartida(false, 'Has fallado una pregunta. Partida finalizada.');
      },
      error: (err: unknown) => {
        this.cargando = false;
        this.error = `Error al validar la respuesta: ${this.errorToText(err)}`;
        this.cdr.detectChanges();
      },
    });
  }

  get progreso(): number {
    if (!this.partida) {
      return 0;
    }
    return Math.min((this.partida.aciertosConsecutivos / 5) * 100, 100);
  }

  private registrarAcierto(): void {
    if (!this.partida) {
      return;
    }

    this.partida.aciertosConsecutivos += 1;

    if (this.modoLocal) {
      this.messageService.add({
        severity: 'success',
        summary: 'Correcta',
        detail: 'Respuesta correcta.',
        life: 1800,
      });

      if (this.partida.aciertosConsecutivos >= 5) {
        this.finalizarPartida(true, '¡Enhorabuena! Has ganado la partida.');
        return;
      }

      this.cargarPregunta();
      return;
    }

    this.partidaService.correcta(this.partida.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcta',
          detail: 'Respuesta correcta.',
          life: 1800,
        });

        if (this.partida && this.partida.aciertosConsecutivos >= 5) {
          this.finalizarPartida(true, '¡Enhorabuena! Has ganado la partida.');
          return;
        }

        this.cargarPregunta();
      },
      error: () => {
        // Si el backend de correcta falla, mantenemos flujo del juego sin bloquear.
        if (this.partida && this.partida.aciertosConsecutivos >= 5) {
          this.finalizarPartida(true, '¡Enhorabuena! Has ganado la partida.');
          return;
        }

        this.cargarPregunta();
      },
    });
  }

  private cargarPregunta(intentos = 0): void {
    if (!this.partida || this.partida.finalizada) {
      return;
    }

    this.cargando = true;
    this.error = '';

    if (this.modoLocal) {
      const preguntaLocal = this.partidaService.obtenerPreguntaLocal(this.preguntasContestadas);
      if (!preguntaLocal) {
        this.finalizarPartida(true, 'No quedan preguntas nuevas para esta partida.');
        return;
      }

      this.preguntaActual = preguntaLocal;
      this.cargando = false;
      this.cdr.detectChanges();
      return;
    }

    this.partidaService.obtenerPregunta(this.partida.id).subscribe({
      next: (pregunta) => {
        if (this.preguntasContestadas.has(pregunta.id)) {
          if (intentos < 10) {
            this.cargarPregunta(intentos + 1);
            return;
          }

          this.finalizarPartida(
            true,
            'No quedan preguntas nuevas para esta partida. Se da por finalizada.'
          );
          return;
        }

        this.preguntaActual = pregunta;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err: unknown) => {
        this.cargando = false;
        this.error = `No se pudo cargar una pregunta: ${this.errorToText(err)}`;
        this.cdr.detectChanges();
      },
    });
  }

  private finalizarPartida(victoria: boolean, mensajeFinal: string): void {
    if (!this.partida) {
      return;
    }

    const idPartida = this.partida.id;
    const aciertos = this.partida.aciertosConsecutivos;
    this.partida.finalizada = true;
    this.preguntaActual = null;
    this.cargando = false;
    this.mensaje = mensajeFinal;

    this.estadisticasService.registrarResultado({
      partidaId: idPartida,
      fecha: new Date().toISOString(),
      victoria,
      aciertos,
      preguntasRespondidas: this.preguntasContestadas.size,
    });

    if (this.modoLocal) {
      this.messageService.add({
        severity: victoria ? 'success' : 'warn',
        summary: victoria ? 'Victoria' : 'Derrota',
        detail: mensajeFinal,
        life: 2500,
      });
      this.cdr.detectChanges();
      return;
    }

    this.partidaService.finalizar(idPartida).subscribe({
      next: () => {},
      error: () => {},
    });

    this.messageService.add({
      severity: victoria ? 'success' : 'warn',
      summary: victoria ? 'Victoria' : 'Derrota',
      detail: mensajeFinal,
      life: 2500,
    });

    this.cdr.detectChanges();
  }

  private errorToText(err: unknown): string {
    if (err instanceof HttpErrorResponse) {
      if (typeof err.error === 'string' && err.error.trim().length > 0) {
        return `${err.status} ${err.statusText}: ${err.error}`;
      }
      return `${err.status} ${err.statusText}`;
    }
    return String(err);
  }

  private iniciarPartidaLocal(err: unknown): void {
    this.partida = this.partidaService.empezarPartidaLocal();
    this.modoLocal = true;
    this.error = '';
    this.mensaje = 'Backend no disponible. Partida iniciada en modo local.';

    this.messageService.add({
      severity: 'warn',
      summary: 'Modo local',
      detail: this.errorToText(err),
      life: 2800,
    });

    this.cargarPregunta();
  }
}
