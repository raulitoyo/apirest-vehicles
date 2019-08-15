import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoVehiculo } from 'app/shared/model/tipo-vehiculo.model';
import { TipoVehiculoService } from './tipo-vehiculo.service';

@Component({
  selector: 'jhi-tipo-vehiculo-delete-dialog',
  templateUrl: './tipo-vehiculo-delete-dialog.component.html'
})
export class TipoVehiculoDeleteDialogComponent {
  tipoVehiculo: ITipoVehiculo;

  constructor(
    protected tipoVehiculoService: TipoVehiculoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tipoVehiculoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tipoVehiculoListModification',
        content: 'Deleted an tipoVehiculo'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tipo-vehiculo-delete-popup',
  template: ''
})
export class TipoVehiculoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoVehiculo }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TipoVehiculoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tipoVehiculo = tipoVehiculo;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tipo-vehiculo', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tipo-vehiculo', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
