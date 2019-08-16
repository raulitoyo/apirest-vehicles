import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IConductor } from 'app/shared/model/conductor.model';

type EntityResponseType = HttpResponse<IConductor>;
type EntityArrayResponseType = HttpResponse<IConductor[]>;

@Injectable({ providedIn: 'root' })
export class ConductorService {
  public resourceUrl = SERVER_API_URL + 'api/conductors';

  constructor(protected http: HttpClient) {}

  create(conductor: IConductor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(conductor);
    return this.http
      .post<IConductor>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(id: number, conductor: IConductor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(conductor);
    return this.http
      .put<IConductor>(`${this.resourceUrl}/${id}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IConductor>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IConductor[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(conductor: IConductor): IConductor {
    const copy: IConductor = Object.assign({}, conductor, {
      fechaNacimiento:
        conductor.fechaNacimiento != null && conductor.fechaNacimiento.isValid() ? conductor.fechaNacimiento.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaNacimiento = res.body.fechaNacimiento != null ? moment(res.body.fechaNacimiento) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((conductor: IConductor) => {
        conductor.fechaNacimiento = conductor.fechaNacimiento != null ? moment(conductor.fechaNacimiento) : null;
      });
    }
    return res;
  }
}
