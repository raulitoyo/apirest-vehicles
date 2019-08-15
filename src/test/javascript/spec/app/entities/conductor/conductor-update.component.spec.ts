/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { VehiclesTestModule } from '../../../test.module';
import { ConductorUpdateComponent } from 'app/entities/conductor/conductor-update.component';
import { ConductorService } from 'app/entities/conductor/conductor.service';
import { Conductor } from 'app/shared/model/conductor.model';

describe('Component Tests', () => {
  describe('Conductor Management Update Component', () => {
    let comp: ConductorUpdateComponent;
    let fixture: ComponentFixture<ConductorUpdateComponent>;
    let service: ConductorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VehiclesTestModule],
        declarations: [ConductorUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ConductorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ConductorUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ConductorService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Conductor(123);
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
        const entity = new Conductor();
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
