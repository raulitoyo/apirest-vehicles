import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Conductor } from 'app/shared/model/conductor.model';
import { ConductorService } from './conductor.service';
import { ConductorComponent } from './conductor.component';
import { ConductorDetailComponent } from './conductor-detail.component';
import { ConductorUpdateComponent } from './conductor-update.component';
import { ConductorDeletePopupComponent } from './conductor-delete-dialog.component';
import { IConductor } from 'app/shared/model/conductor.model';

@Injectable({ providedIn: 'root' })
export class ConductorResolve implements Resolve<IConductor> {
  constructor(private service: ConductorService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IConductor> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Conductor>) => response.ok),
        map((conductor: HttpResponse<Conductor>) => conductor.body)
      );
    }
    return of(new Conductor());
  }
}

export const conductorRoute: Routes = [
  {
    path: '',
    component: ConductorComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'vehiclesApp.conductor.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ConductorDetailComponent,
    resolve: {
      conductor: ConductorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vehiclesApp.conductor.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ConductorUpdateComponent,
    resolve: {
      conductor: ConductorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vehiclesApp.conductor.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ConductorUpdateComponent,
    resolve: {
      conductor: ConductorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vehiclesApp.conductor.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const conductorPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ConductorDeletePopupComponent,
    resolve: {
      conductor: ConductorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vehiclesApp.conductor.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
