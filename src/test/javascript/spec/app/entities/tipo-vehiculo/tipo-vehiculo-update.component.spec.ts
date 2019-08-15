/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { VehiclesTestModule } from '../../../test.module';
import { TipoVehiculoUpdateComponent } from 'app/entities/tipo-vehiculo/tipo-vehiculo-update.component';
import { TipoVehiculoService } from 'app/entities/tipo-vehiculo/tipo-vehiculo.service';
import { TipoVehiculo } from 'app/shared/model/tipo-vehiculo.model';

describe('Component Tests', () => {
  describe('TipoVehiculo Management Update Component', () => {
    let comp: TipoVehiculoUpdateComponent;
    let fixture: ComponentFixture<TipoVehiculoUpdateComponent>;
    let service: TipoVehiculoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VehiclesTestModule],
        declarations: [TipoVehiculoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TipoVehiculoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoVehiculoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoVehiculoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoVehiculo(123);
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
        const entity = new TipoVehiculo();
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
