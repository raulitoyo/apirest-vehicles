import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IMarca, Marca } from 'app/shared/model/marca.model';
import { MarcaService } from './marca.service';

@Component({
  selector: 'jhi-marca-update',
  templateUrl: './marca-update.component.html'
})
export class MarcaUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    codigo: [null, [Validators.required, Validators.maxLength(5)]],
    marca: [null, [Validators.required, Validators.maxLength(200)]],
    estado: []
  });

  constructor(protected marcaService: MarcaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ marca }) => {
      this.updateForm(marca);
    });
  }

  updateForm(marca: IMarca) {
    this.editForm.patchValue({
      id: marca.id,
      codigo: marca.codigo,
      marca: marca.marca,
      estado: marca.estado
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const marca = this.createFromForm();
    if (marca.id !== undefined) {
      this.subscribeToSaveResponse(this.marcaService.update(marca));
    } else {
      this.subscribeToSaveResponse(this.marcaService.create(marca));
    }
  }

  private createFromForm(): IMarca {
    return {
      ...new Marca(),
      id: this.editForm.get(['id']).value,
      codigo: this.editForm.get(['codigo']).value,
      marca: this.editForm.get(['marca']).value,
      estado: this.editForm.get(['estado']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMarca>>) {
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
