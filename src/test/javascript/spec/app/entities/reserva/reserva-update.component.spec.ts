/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { VehiclesTestModule } from '../../../test.module';
import { ReservaUpdateComponent } from 'app/entities/reserva/reserva-update.component';
import { ReservaService } from 'app/entities/reserva/reserva.service';
import { Reserva } from 'app/shared/model/reserva.model';

describe('Component Tests', () => {
  describe('Reserva Management Update Component', () => {
    let comp: ReservaUpdateComponent;
    let fixture: ComponentFixture<ReservaUpdateComponent>;
    let service: ReservaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VehiclesTestModule],
        declarations: [ReservaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ReservaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ReservaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReservaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Reserva(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Reserva();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
