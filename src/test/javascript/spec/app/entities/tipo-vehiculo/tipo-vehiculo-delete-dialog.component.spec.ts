/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { VehiclesTestModule } from '../../../test.module';
import { TipoVehiculoDeleteDialogComponent } from 'app/entities/tipo-vehiculo/tipo-vehiculo-delete-dialog.component';
import { TipoVehiculoService } from 'app/entities/tipo-vehiculo/tipo-vehiculo.service';

describe('Component Tests', () => {
  describe('TipoVehiculo Management Delete Component', () => {
    let comp: TipoVehiculoDeleteDialogComponent;
    let fixture: ComponentFixture<TipoVehiculoDeleteDialogComponent>;
    let service: TipoVehiculoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VehiclesTestModule],
        declarations: [TipoVehiculoDeleteDialogComponent]
      })
        .overrideTemplate(TipoVehiculoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoVehiculoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoVehiculoService);
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
