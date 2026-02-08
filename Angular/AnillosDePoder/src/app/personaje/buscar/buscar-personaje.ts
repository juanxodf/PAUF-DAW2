import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PersonajesService } from '../../services/personajes-services';
import { Personaje } from '../../interfaces/personaje';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-buscar-personaje',
  imports: [RouterLink, ConfirmDialogModule, ToastModule, ButtonModule],
  templateUrl: './buscar-personaje.html',
  styleUrl: './buscar-personaje.css',
  providers: [ConfirmationService, MessageService],
})

export class Buscar implements OnInit {
  personajes: Personaje[] = [];
  error = '';

  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  constructor( private personajeService: PersonajesService, private cdr: ChangeDetectorRef, private route: Router ) {}

  ngOnInit(): void {
    this.cargarPersonajes();
  }

  editar(id: number) {
    this.route.navigate(['/editar', id]);
  }

  cargarPersonajes() {
    this.personajeService.obtenerPersonajes().subscribe({
      next: (data) => {
        this.personajes = data as Personaje[];
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Se ha producido un error';
      },
    });
  }

  confirmBajaFisica(event: Event, personaje: Personaje) {
    this.confirmationService.confirm({
      message: 'Se va a borrar de forma definitiva el registro ¿Estás seguro que deseas borrarlo?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar',

      accept: () => {
        this.personajeService.bajaFisica(personaje.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Borrado',
              detail: 'Personaje borrado definitivamente.',
              life: 2000,
              sticky: false,
              closable: true,
            });
            this.cargarPersonajes();
            this.confirmationService.close();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'No se puede borrar',
              detail: 'No se puede borrar ese personaje porque es portador.',
              life: 2000,
              sticky: false,
              closable: true,
            });
            this.confirmationService.close();
          },
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelado',
          detail: 'Acción cancelada.',
          life: 2000,
          sticky: false,
          closable: true,
        });
        this.confirmationService.close();
      },
    });
  }

  confirmBajaLogica(event: Event, personaje: Personaje) {
    this.confirmationService.confirm({
      message: 'Se va a dar de baja el personaje ¿Estás seguro?',
      header: 'Confirmación',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar',

      accept: () => {
        this.personajeService.bajaLogica(personaje.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Baja lógica',
              detail: 'Se ha dado de baja correctamente.',
              life: 2000,
              sticky: false,
              closable: true,
            });
            this.cargarPersonajes();
            this.confirmationService.close();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se ha podido dar de baja.',
              life: 2000,
              sticky: false,
              closable: true,
            });
            this.confirmationService.close();
          },
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelado',
          detail: 'Acción cancelada.',
          life: 2000,
          sticky: false,
          closable: true,
        });
        this.confirmationService.close();
      },
    });
  }

  confirmReactivar(event: Event, personaje: Personaje) {
    this.confirmationService.confirm({
      message: '¿Deseas reactivar el personaje?',
      header: 'Confirmación',
      icon: 'pi pi-question-circle',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar',

      accept: () => {
        this.personajeService.reactivar(personaje.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Reactivado',
              detail: 'Personaje reactivado correctamente.',
              life: 2000,
              sticky: false,
              closable: true,
            });
            this.cargarPersonajes();
            this.confirmationService.close();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se ha podido reactivar.',
              life: 2000,
              sticky: false,
              closable: true,
            });
            this.confirmationService.close();
          },
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelado',
          detail: 'Acción cancelada.',
          life: 2000,
          sticky: false,
          closable: true,
        });
        this.confirmationService.close();
      },
    });
  }
}
