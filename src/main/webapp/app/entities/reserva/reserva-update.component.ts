import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IReserva, Reserva } from 'app/shared/model/reserva.model';
import { ReservaService } from './reserva.service';
import { IVehiculo } from 'app/shared/model/vehiculo.model';
import { VehiculoService } from 'app/entities/vehiculo';

@Component({
  selector: 'jhi-reserva-update',
  templateUrl: './reserva-update.component.html'
})
export class ReservaUpdateComponent implements OnInit {
  isSaving: boolean;

  vehiculos: IVehiculo[];

  editForm = this.fb.group({
    id: [],
    codigo: [],
    fechaHoraInicio: [],
    fechaHoraFin: [],
    estadoReserva: [],
    vehiculo: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected reservaService: ReservaService,
    protected vehiculoService: VehiculoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ reserva }) => {
      this.updateForm(reserva);
    });
    this.vehiculoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IVehiculo[]>) => mayBeOk.ok),
        map((response: HttpResponse<IVehiculo[]>) => response.body)
      )
      .subscribe((res: IVehiculo[]) => (this.vehiculos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(reserva: IReserva) {
    this.editForm.patchValue({
      id: reserva.id,
      codigo: reserva.codigo,
      fechaHoraInicio: reserva.fechaHoraInicio != null ? reserva.fechaHoraInicio.format(DATE_TIME_FORMAT) : null,
      fechaHoraFin: reserva.fechaHoraFin != null ? reserva.fechaHoraFin.format(DATE_TIME_FORMAT) : null,
      estadoReserva: reserva.estadoReserva,
      vehiculo: reserva.vehiculo
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const reserva = this.createFromForm();
    if (reserva.id !== undefined) {
      this.subscribeToSaveResponse(this.reservaService.update(reserva));
    } else {
      this.subscribeToSaveResponse(this.reservaService.create(reserva));
    }
  }

  private createFromForm(): IReserva {
    return {
      ...new Reserva(),
      id: this.editForm.get(['id']).value,
      codigo: this.editForm.get(['codigo']).value,
      fechaHoraInicio:
        this.editForm.get(['fechaHoraInicio']).value != null
          ? moment(this.editForm.get(['fechaHoraInicio']).value, DATE_TIME_FORMAT)
          : undefined,
      fechaHoraFin:
        this.editForm.get(['fechaHoraFin']).value != null ? moment(this.editForm.get(['fechaHoraFin']).value, DATE_TIME_FORMAT) : undefined,
      estadoReserva: this.editForm.get(['estadoReserva']).value,
      vehiculo: this.editForm.get(['vehiculo']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReserva>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackVehiculoById(index: number, item: IVehiculo) {
    return item.id;
  }
}
