/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ConductorService } from 'app/entities/conductor/conductor.service';
import { IConductor, Conductor } from 'app/shared/model/conductor.model';

describe('Service Tests', () => {
  describe('Conductor Service', () => {
    let injector: TestBed;
    let service: ConductorService;
    let httpMock: HttpTestingController;
    let elemDefault: IConductor;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(ConductorService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Conductor(0, 'AAAAAAA', 'AAAAAAA', currentDate, 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            fechaNacimiento: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a Conductor', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaNacimiento: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaNacimiento: currentDate
          },
          returnedFromService
        );
        service
          .create(new Conductor(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Conductor', async () => {
        const returnedFromService = Object.assign(
          {
            dni: 'BBBBBB',
            nombre: 'BBBBBB',
            fechaNacimiento: currentDate.format(DATE_FORMAT),
            email: 'BBBBBB',
            celular: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaNacimiento: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of Conductor', async () => {
        const returnedFromService = Object.assign(
          {
            dni: 'BBBBBB',
            nombre: 'BBBBBB',
            fechaNacimiento: currentDate.format(DATE_FORMAT),
            email: 'BBBBBB',
            celular: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaNacimiento: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Conductor', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
