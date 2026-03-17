import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import swal, {
  SweetAlertIcon,
  SweetAlertInput,
  SweetAlertPosition,
  SweetAlertResult,
} from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalAlertService {
  constructor(private router: Router) {}

  basicAlert(
    title: string,
    text: string,
    icon: SweetAlertIcon
  ): Promise<SweetAlertResult<any>> {
    return swal.fire({
      title,
      html: text,
      icon,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        swal.getConfirmButton()?.setAttribute('data-cy', 'swal-confirm-button');
      },
    });
  }

  redirectAfterAlert(
    title: string,
    text: string,
    icon: SweetAlertIcon,
    url: string
  ): void {
    swal
      .fire({
        title,
        html: text,
        icon,
        allowOutsideClick: false,
        allowEscapeKey: false,
      })
      .then(() => this.router.navigateByUrl(url));
  }

  confirmAlert(
    title: string,
    text: string,
    icon: SweetAlertIcon,
    confirmButtonText: string = 'OK',
    cancelButtonText: string = 'Cancelar',
    confirmButtonColor: string = '#da1c24'
  ) {
    return swal
      .fire({
        title,
        html: text,
        icon,
        showCancelButton: true,
        confirmButtonColor: confirmButtonColor,
        customClass: {
          cancelButton:
            'mat-focus-indicator mat-raised-button mat-button-base me-3',
          confirmButton:
            'mat-focus-indicator mat-raised-button mat-button-base mat-warn',
        },
        cancelButtonText,
        reverseButtons: true,
        confirmButtonText,
      })
      .then((result: any) => {
        return result.value;
      });
  }

  loadingAlert(title: string, text: string, func: Promise<void>) {
    swal.fire({
      title,
      html: text,
      allowOutsideClick: false,
      allowEscapeKey: false,
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: () => {
        swal.showLoading(swal.getDenyButton());
        func;
      },
    });
  }

  closeAlert(): void {
    swal.close();
  }

  toastAlert(
    title: string,
    icon: SweetAlertIcon,
    timer: number = 3000,
    position: SweetAlertPosition = 'bottom-right',
    showConfirmButton: boolean = false
  ): void {
    const Toast = swal.mixin({
      toast: true,
      position,
      showConfirmButton,
      timer,
      timerProgressBar: true,
      didOpen: (toast: any) => {
        toast.addEventListener('mouseenter', swal.stopTimer);
        toast.addEventListener('mouseleave', swal.resumeTimer);
      },
    });
    Toast.fire({
      icon,
      title,
    });
  }

  permissionAlert(text: string): void {
    this.redirectAfterAlert(
      'Aviso',
      `Você não possui permissão para ${text}!`,
      'warning',
      '/home'
    );
  }

  textAreaAlert(
    title: string,
    icon: SweetAlertIcon,
    input: SweetAlertInput,
    inputLabel: string,
    inputPlaceholder: string,
    inputValue: string = '',
    cancelButtonText: string = 'Cancelar',
    confirmButtonText: string = 'Confirmar'
  ) {
    return swal
      .fire({
        title,
        icon,
        input,
        inputLabel,
        inputPlaceholder,
        inputValue,
        cancelButtonText,
        confirmButtonText,
        confirmButtonColor: '#da1c24',
        customClass: {
          cancelButton:
            'mat-focus-indicator mat-raised-button mat-button-base me-3',
          confirmButton:
            'mat-focus-indicator mat-raised-button mat-button-base mat-warn',
        },
        reverseButtons: true,
        showCancelButton: true,
        inputValidator: (value: any) => {
          if (!value) {
            return 'Você precisa inserir um valor!';
          }
          return null;
        },
      })
      .then((result: any) => {
        if (result.isConfirmed) {
          return result.value;
        }
        return null;
      });
  }
}
