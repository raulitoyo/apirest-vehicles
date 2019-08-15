import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITipoVehiculo, TipoVehiculo } from 'app/shared/model/tipo-vehiculo.model';
import { TipoVehiculoService } from './tipo-vehiculo.service';

@Component({
  selector: 'jhi-tipo-vehiculo-update',
  templateUrl: './tipo-vehiculo-update.component.html'
})
export class TipoVehiculoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    codigo: [null, [Validators.required, Validators.maxLength(5)]],
    tipo: [null, [Validators.required, Validators.maxLength(200)]],
    estado: []
  });

  constructor(protected tipoVehiculoService: TipoVehiculoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tipoVehiculo }) => {
      this.updateForm(tipoVehiculo);
    });
  }

  updateForm(tipoVehiculo: ITipoVehiculo) {
    this.editForm.patchValue({
      id: tipoVehiculo.id,
      codigo: tipoVehiculo.codigo,
      tipo: tipoVehiculo.tipo,
      estado: tipoVehiculo.estado
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tipoVehiculo = this.createFromForm();
    if (tipoVehiculo.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoVehiculoService.update(tipoVehiculo));
    } else {
      this.subscribeToSaveResponse(this.tipoVehiculoService.create(tipoVehiculo));
    }
  }

  private createFromForm(): ITipoVehiculo {
    return {
      ...new TipoVehiculo(),
      id: this.editForm.get(['id']).value,
      codigo: this.editForm.get(['codigo']).value,
      tipo: this.editForm.get(['tipo']).value,
      estado: this.editForm.get(['estado']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoVehiculo>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
