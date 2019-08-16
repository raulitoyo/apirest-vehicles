import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IModelo, Modelo } from 'app/shared/model/modelo.model';
import { ModeloService } from './modelo.service';

@Component({
  selector: 'jhi-modelo-update',
  templateUrl: './modelo-update.component.html'
})
export class ModeloUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    codigo: [null, [Validators.required, Validators.maxLength(5)]],
    modelo: [null, [Validators.required, Validators.maxLength(200)]],
    estado: []
  });

  constructor(protected modeloService: ModeloService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ modelo }) => {
      this.updateForm(modelo);
    });
  }

  updateForm(modelo: IModelo) {
    this.editForm.patchValue({
      id: modelo.id,
      codigo: modelo.codigo,
      modelo: modelo.modelo,
      estado: modelo.estado
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const modelo = this.createFromForm();
    if (modelo.id !== undefined) {
      this.subscribeToSaveResponse(this.modeloService.update(modelo.id, modelo));
    } else {
      this.subscribeToSaveResponse(this.modeloService.create(modelo));
    }
  }

  private createFromForm(): IModelo {
    return {
      ...new Modelo(),
      id: this.editForm.get(['id']).value,
      codigo: this.editForm.get(['codigo']).value,
      modelo: this.editForm.get(['modelo']).value,
      estado: this.editForm.get(['estado']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IModelo>>) {
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
