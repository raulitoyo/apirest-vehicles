import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TipoVehiculo } from 'app/shared/model/tipo-vehiculo.model';
import { TipoVehiculoService } from './tipo-vehiculo.service';
import { TipoVehiculoComponent } from './tipo-vehiculo.component';
import { TipoVehiculoDetailComponent } from './tipo-vehiculo-detail.component';
import { TipoVehiculoUpdateComponent } from './tipo-vehiculo-update.component';
import { TipoVehiculoDeletePopupComponent } from './tipo-vehiculo-delete-dialog.component';
import { ITipoVehiculo } from 'app/shared/model/tipo-vehiculo.model';

@Injectable({ providedIn: 'root' })
export class TipoVehiculoResolve implements Resolve<ITipoVehiculo> {
  constructor(private service: TipoVehiculoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITipoVehiculo> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TipoVehiculo>) => response.ok),
        map((tipoVehiculo: HttpResponse<TipoVehiculo>) => tipoVehiculo.body)
      );
    }
    return of(new TipoVehiculo());
  }
}

export const tipoVehiculoRoute: Routes = [
  {
    path: '',
    component: TipoVehiculoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vehiclesApp.tipoVehiculo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TipoVehiculoDetailComponent,
    resolve: {
      tipoVehiculo: TipoVehiculoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vehiclesApp.tipoVehiculo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TipoVehiculoUpdateComponent,
    resolve: {
      tipoVehiculo: TipoVehiculoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vehiclesApp.tipoVehiculo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TipoVehiculoUpdateComponent,
    resolve: {
      tipoVehiculo: TipoVehiculoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vehiclesApp.tipoVehiculo.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tipoVehiculoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TipoVehiculoDeletePopupComponent,
    resolve: {
      tipoVehiculo: TipoVehiculoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vehiclesApp.tipoVehiculo.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
