import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IConductor } from 'app/shared/model/conductor.model';
import { ConductorService } from './conductor.service';

@Component({
  selector: 'jhi-conductor-delete-dialog',
  templateUrl: './conductor-delete-dialog.component.html'
})
export class ConductorDeleteDialogComponent {
  conductor: IConductor;

  constructor(protected conductorService: ConductorService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.conductorService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'conductorListModification',
        content: 'Deleted an conductor'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-conductor-delete-popup',
  template: ''
})
export class ConductorDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ conductor }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ConductorDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.conductor = conductor;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/conductor', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/conductor', { outlets: { popup: null } }]);
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
