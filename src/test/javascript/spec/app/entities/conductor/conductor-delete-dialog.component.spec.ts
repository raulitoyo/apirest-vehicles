/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { VehiclesTestModule } from '../../../test.module';
import { ConductorDeleteDialogComponent } from 'app/entities/conductor/conductor-delete-dialog.component';
import { ConductorService } from 'app/entities/conductor/conductor.service';

describe('Component Tests', () => {
  describe('Conductor Management Delete Component', () => {
    let comp: ConductorDeleteDialogComponent;
    let fixture: ComponentFixture<ConductorDeleteDialogComponent>;
    let service: ConductorService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VehiclesTestModule],
        declarations: [ConductorDeleteDialogComponent]
      })
        .overrideTemplate(ConductorDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ConductorDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ConductorService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
