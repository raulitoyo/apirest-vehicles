import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITipoVehiculo } from 'app/shared/model/tipo-vehiculo.model';
import { AccountService } from 'app/core';
import { TipoVehiculoService } from './tipo-vehiculo.service';

@Component({
  selector: 'jhi-tipo-vehiculo',
  templateUrl: './tipo-vehiculo.component.html'
})
export class TipoVehiculoComponent implements OnInit, OnDestroy {
  tipoVehiculos: ITipoVehiculo[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected tipoVehiculoService: TipoVehiculoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.tipoVehiculoService
      .query()
      .pipe(
        filter((res: HttpResponse<ITipoVehiculo[]>) => res.ok),
        map((res: HttpResponse<ITipoVehiculo[]>) => res.body)
      )
      .subscribe(
        (res: ITipoVehiculo[]) => {
          this.tipoVehiculos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTipoVehiculos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITipoVehiculo) {
    return item.id;
  }

  registerChangeInTipoVehiculos() {
    this.eventSubscriber = this.eventManager.subscribe('tipoVehiculoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
