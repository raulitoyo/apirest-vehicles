import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IConductor, Conductor } from 'app/shared/model/conductor.model';
import { ConductorService } from './conductor.service';

@Component({
  selector: 'jhi-conductor-update',
  templateUrl: './conductor-update.component.html'
})
export class ConductorUpdateComponent implements OnInit {
  isSaving: boolean;
  fechaNacimientoDp: any;

  editForm = this.fb.group({
    id: [],
    dni: [null, [Validators.required, Validators.maxLength(8)]],
    nombre: [],
    fechaNacimiento: [],
    email: [],
    celular: []
  });

  constructor(protected conductorService: ConductorService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ conductor }) => {
      this.updateForm(conductor);
    });
  }

  updateForm(conductor: IConductor) {
    this.editForm.patchValue({
      id: conductor.id,
      dni: conductor.dni,
      nombre: conductor.nombre,
      fechaNacimiento: conductor.fechaNacimiento,
      email: conductor.email,
      celular: conductor.celular
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const conductor = this.createFromForm();
    if (conductor.id !== undefined) {
      this.subscribeToSaveResponse(this.conductorService.update(conductor.id, conductor));
    } else {
      this.subscribeToSaveResponse(this.conductorService.create(conductor));
    }
  }

  private createFromForm(): IConductor {
    return {
      ...new Conductor(),
      id: this.editForm.get(['id']).value,
      dni: this.editForm.get(['dni']).value,
      nombre: this.editForm.get(['nombre']).value,
      fechaNacimiento: this.editForm.get(['fechaNacimiento']).value,
      email: this.editForm.get(['email']).value,
      celular: this.editForm.get(['celular']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConductor>>) {
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
