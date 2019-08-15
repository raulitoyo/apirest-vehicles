/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VehiclesTestModule } from '../../../test.module';
import { TipoVehiculoComponent } from 'app/entities/tipo-vehiculo/tipo-vehiculo.component';
import { TipoVehiculoService } from 'app/entities/tipo-vehiculo/tipo-vehiculo.service';
import { TipoVehiculo } from 'app/shared/model/tipo-vehiculo.model';

describe('Component Tests', () => {
  describe('TipoVehiculo Management Component', () => {
    let comp: TipoVehiculoComponent;
    let fixture: ComponentFixture<TipoVehiculoComponent>;
    let service: TipoVehiculoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VehiclesTestModule],
        declarations: [TipoVehiculoComponent],
        providers: []
      })
        .overrideTemplate(TipoVehiculoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoVehiculoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoVehiculoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipoVehiculo(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoVehiculos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
