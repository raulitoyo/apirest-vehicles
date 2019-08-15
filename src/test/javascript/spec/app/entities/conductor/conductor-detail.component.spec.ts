/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VehiclesTestModule } from '../../../test.module';
import { ConductorDetailComponent } from 'app/entities/conductor/conductor-detail.component';
import { Conductor } from 'app/shared/model/conductor.model';

describe('Component Tests', () => {
  describe('Conductor Management Detail Component', () => {
    let comp: ConductorDetailComponent;
    let fixture: ComponentFixture<ConductorDetailComponent>;
    const route = ({ data: of({ conductor: new Conductor(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VehiclesTestModule],
        declarations: [ConductorDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ConductorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ConductorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.conductor).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
