/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VehiclesTestModule } from '../../../test.module';
import { MarcaComponent } from 'app/entities/marca/marca.component';
import { MarcaService } from 'app/entities/marca/marca.service';
import { Marca } from 'app/shared/model/marca.model';

describe('Component Tests', () => {
  describe('Marca Management Component', () => {
    let comp: MarcaComponent;
    let fixture: ComponentFixture<MarcaComponent>;
    let service: MarcaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VehiclesTestModule],
        declarations: [MarcaComponent],
        providers: []
      })
        .overrideTemplate(MarcaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MarcaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MarcaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Marca(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.marcas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
