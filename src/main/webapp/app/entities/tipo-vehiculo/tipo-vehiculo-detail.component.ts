import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoVehiculo } from 'app/shared/model/tipo-vehiculo.model';

@Component({
  selector: 'jhi-tipo-vehiculo-detail',
  templateUrl: './tipo-vehiculo-detail.component.html'
})
export class TipoVehiculoDetailComponent implements OnInit {
  tipoVehiculo: ITipoVehiculo;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoVehiculo }) => {
      this.tipoVehiculo = tipoVehiculo;
    });
  }

  previousState() {
    window.history.back();
  }
}
