import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IVehiculo, Vehiculo } from 'app/shared/model/vehiculo.model';
import { VehiculoService } from './vehiculo.service';
import { IMarca } from 'app/shared/model/marca.model';
import { MarcaService } from 'app/entities/marca';
import { IModelo } from 'app/shared/model/modelo.model';
import { ModeloService } from 'app/entities/modelo';
import { ITipoVehiculo } from 'app/shared/model/tipo-vehiculo.model';
import { TipoVehiculoService } from 'app/entities/tipo-vehiculo';
import { IConductor } from 'app/shared/model/conductor.model';
import { ConductorService } from 'app/entities/conductor';

@Component({
  selector: 'jhi-vehiculo-update',
  templateUrl: './vehiculo-update.component.html'
})
export class VehiculoUpdateComponent implements OnInit {
  isSaving: boolean;

  marcas: IMarca[];

  modelos: IModelo[];

  tipovehiculos: ITipoVehiculo[];

  conductors: IConductor[];

  editForm = this.fb.group({
    id: [],
    placa: [null, [Validators.required, Validators.maxLength(7)]],
    color: [],
    estado: [],
    marca: [],
    modelo: [],
    tipo: [],
    duenho: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected vehiculoService: VehiculoService,
    protected marcaService: MarcaService,
    protected modeloService: ModeloService,
    protected tipoVehiculoService: TipoVehiculoService,
    protected conductorService: ConductorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ vehiculo }) => {
      this.updateForm(vehiculo);
    });
    this.marcaService
      .query({ filter: 'vehiculo-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IMarca[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMarca[]>) => response.body)
      )
      .subscribe(
        (res: IMarca[]) => {
          if (!this.editForm.get('marca').value || !this.editForm.get('marca').value.id) {
            this.marcas = res;
          } else {
            this.marcaService
              .find(this.editForm.get('marca').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IMarca>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IMarca>) => subResponse.body)
              )
              .subscribe(
                (subRes: IMarca) => (this.marcas = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.modeloService
      .query({ filter: 'vehiculo-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IModelo[]>) => mayBeOk.ok),
        map((response: HttpResponse<IModelo[]>) => response.body)
      )
      .subscribe(
        (res: IModelo[]) => {
          if (!this.editForm.get('modelo').value || !this.editForm.get('modelo').value.id) {
            this.modelos = res;
          } else {
            this.modeloService
              .find(this.editForm.get('modelo').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IModelo>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IModelo>) => subResponse.body)
              )
              .subscribe(
                (subRes: IModelo) => (this.modelos = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.tipoVehiculoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITipoVehiculo[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITipoVehiculo[]>) => response.body)
      )
      .subscribe((res: ITipoVehiculo[]) => (this.tipovehiculos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.conductorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IConductor[]>) => mayBeOk.ok),
        map((response: HttpResponse<IConductor[]>) => response.body)
      )
      .subscribe((res: IConductor[]) => (this.conductors = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(vehiculo: IVehiculo) {
    this.editForm.patchValue({
      id: vehiculo.id,
      placa: vehiculo.placa,
      color: vehiculo.color,
      estado: vehiculo.estado,
      marca: vehiculo.marca,
      modelo: vehiculo.modelo,
      tipo: vehiculo.tipo,
      duenho: vehiculo.duenho
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const vehiculo = this.createFromForm();
    if (vehiculo.id !== undefined) {
      this.subscribeToSaveResponse(this.vehiculoService.update(vehiculo.id, vehiculo));
    } else {
      this.subscribeToSaveResponse(this.vehiculoService.create(vehiculo));
    }
  }

  private createFromForm(): IVehiculo {
    return {
      ...new Vehiculo(),
      id: this.editForm.get(['id']).value,
      placa: this.editForm.get(['placa']).value,
      color: this.editForm.get(['color']).value,
      estado: this.editForm.get(['estado']).value,
      marca: this.editForm.get(['marca']).value,
      modelo: this.editForm.get(['modelo']).value,
      tipo: this.editForm.get(['tipo']).value,
      duenho: this.editForm.get(['duenho']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVehiculo>>) {
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

  trackMarcaById(index: number, item: IMarca) {
    return item.id;
  }

  trackModeloById(index: number, item: IModelo) {
    return item.id;
  }

  trackTipoVehiculoById(index: number, item: ITipoVehiculo) {
    return item.id;
  }

  trackConductorById(index: number, item: IConductor) {
    return item.id;
  }
}
