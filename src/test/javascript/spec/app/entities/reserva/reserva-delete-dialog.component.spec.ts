/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { VehiclesTestModule } from '../../../test.module';
import { ReservaDeleteDialogComponent } from 'app/entities/reserva/reserva-delete-dialog.component';
import { ReservaService } from 'app/entities/reserva/reserva.service';

describe('Component Tests', () => {
  describe('Reserva Management Delete Component', () => {
    let comp: ReservaDeleteDialogComponent;
    let fixture: ComponentFixture<ReservaDeleteDialogComponent>;
    let service: ReservaService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VehiclesTestModule],
        declarations: [ReservaDeleteDialogComponent]
      })
        .overrideTemplate(ReservaDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ReservaDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReservaService);
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
