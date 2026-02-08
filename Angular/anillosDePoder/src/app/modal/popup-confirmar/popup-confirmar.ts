import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Input } from '@angular/core';
import { ConfirmModal } from '../../interfaces/confirm-modal';

@Component({
  selector: 'app-popup-confirmar',
  imports: [ButtonModule, ConfirmDialogModule, ToastModule],
  templateUrl: './popup-confirmar.html',
  styleUrl: './popup-confirmar.css',
  providers: [ConfirmationService, MessageService]
})
export class PopupConfirmar {


    @Input() config: ConfirmModal | null = null;
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);

    confirm2(event: Event) {
        if (!this.config) {
            return;
        }
        this.confirmationService.confirm({
            message: this.config.message,
            header: 'Danger Zone',
            icon: 'pi pi-info-circle',
            rejectLabel: 'Cancel',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true
            },
            acceptButtonProps: {
                label: 'Delete',
                severity: 'danger'
            },
        
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000, closable: true });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000, closable: true });
            }
        });
    }
}
