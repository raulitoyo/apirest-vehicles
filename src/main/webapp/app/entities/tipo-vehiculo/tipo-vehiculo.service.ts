import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITipoVehiculo } from 'app/shared/model/tipo-vehiculo.model';

type EntityResponseType = HttpResponse<ITipoVehiculo>;
type EntityArrayResponseType = HttpResponse<ITipoVehiculo[]>;

@Injectable({ providedIn: 'root' })
export class TipoVehiculoService {
  public resourceUrl = SERVER_API_URL + 'api/tipo-vehiculos';

  constructor(protected http: HttpClient) {}

  create(tipoVehiculo: ITipoVehiculo): Observable<EntityResponseType> {
    return this.http.post<ITipoVehiculo>(this.resourceUrl, tipoVehiculo, { observe: 'response' });
  }

  update(id: number, tipoVehiculo: ITipoVehiculo): Observable<EntityResponseType> {
    return this.http.put<ITipoVehiculo>(`${this.resourceUrl}/${id}`, tipoVehiculo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoVehiculo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoVehiculo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
