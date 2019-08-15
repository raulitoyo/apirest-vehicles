/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VehiclesTestModule } from '../../../test.module';
import { MarcaDetailComponent } from 'app/entities/marca/marca-detail.component';
import { Marca } from 'app/shared/model/marca.model';

describe('Component Tests', () => {
  describe('Marca Management Detail Component', () => {
    let comp: MarcaDetailComponent;
    let fixture: ComponentFixture<MarcaDetailComponent>;
    const route = ({ data: of({ marca: new Marca(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VehiclesTestModule],
        declarations: [MarcaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MarcaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MarcaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.marca).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
