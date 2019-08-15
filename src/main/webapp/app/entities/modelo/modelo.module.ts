import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { VehiclesSharedModule } from 'app/shared';
import {
  ModeloComponent,
  ModeloDetailComponent,
  ModeloUpdateComponent,
  ModeloDeletePopupComponent,
  ModeloDeleteDialogComponent,
  modeloRoute,
  modeloPopupRoute
} from './';

const ENTITY_STATES = [...modeloRoute, ...modeloPopupRoute];

@NgModule({
  imports: [VehiclesSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [ModeloComponent, ModeloDetailComponent, ModeloUpdateComponent, ModeloDeleteDialogComponent, ModeloDeletePopupComponent],
  entryComponents: [ModeloComponent, ModeloUpdateComponent, ModeloDeleteDialogComponent, ModeloDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehiclesModeloModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
