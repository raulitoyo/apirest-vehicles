import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IReserva } from 'app/shared/model/reserva.model';

type EntityResponseType = HttpResponse<IReserva>;
type EntityArrayResponseType = HttpResponse<IReserva[]>;

@Injectable({ providedIn: 'root' })
export class ReservaService {
  public resourceUrl = SERVER_API_URL + 'api/reservas';

  constructor(protected http: HttpClient) {}

  create(reserva: IReserva): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reserva);
    return this.http
      .post<IReserva>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(id: number, reserva: IReserva): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reserva);
    return this.http
      .put<IReserva>(`${this.resourceUrl}/${id}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IReserva>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IReserva[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(reserva: IReserva): IReserva {
    const copy: IReserva = Object.assign({}, reserva, {
      fechaHoraInicio: reserva.fechaHoraInicio != null && reserva.fechaHoraInicio.isValid() ? reserva.fechaHoraInicio.toJSON() : null,
      fechaHoraFin: reserva.fechaHoraFin != null && reserva.fechaHoraFin.isValid() ? reserva.fechaHoraFin.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaHoraInicio = res.body.fechaHoraInicio != null ? moment(res.body.fechaHoraInicio) : null;
      res.body.fechaHoraFin = res.body.fechaHoraFin != null ? moment(res.body.fechaHoraFin) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((reserva: IReserva) => {
        reserva.fechaHoraInicio = reserva.fechaHoraInicio != null ? moment(reserva.fechaHoraInicio) : null;
        reserva.fechaHoraFin = reserva.fechaHoraFin != null ? moment(reserva.fechaHoraFin) : null;
      });
    }
    return res;
  }
}
