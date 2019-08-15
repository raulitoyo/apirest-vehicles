/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VehiclesTestModule } from '../../../test.module';
import { TipoVehiculoDetailComponent } from 'app/entities/tipo-vehiculo/tipo-vehiculo-detail.component';
import { TipoVehiculo } from 'app/shared/model/tipo-vehiculo.model';

describe('Component Tests', () => {
  describe('TipoVehiculo Management Detail Component', () => {
    let comp: TipoVehiculoDetailComponent;
    let fixture: ComponentFixture<TipoVehiculoDetailComponent>;
    const route = ({ data: of({ tipoVehiculo: new TipoVehiculo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VehiclesTestModule],
        declarations: [TipoVehiculoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TipoVehiculoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoVehiculoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoVehiculo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
