import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { VehiclesSharedModule } from 'app/shared';
import {
  TipoVehiculoComponent,
  TipoVehiculoDetailComponent,
  TipoVehiculoUpdateComponent,
  TipoVehiculoDeletePopupComponent,
  TipoVehiculoDeleteDialogComponent,
  tipoVehiculoRoute,
  tipoVehiculoPopupRoute
} from './';

const ENTITY_STATES = [...tipoVehiculoRoute, ...tipoVehiculoPopupRoute];

@NgModule({
  imports: [VehiclesSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TipoVehiculoComponent,
    TipoVehiculoDetailComponent,
    TipoVehiculoUpdateComponent,
    TipoVehiculoDeleteDialogComponent,
    TipoVehiculoDeletePopupComponent
  ],
  entryComponents: [
    TipoVehiculoComponent,
    TipoVehiculoUpdateComponent,
    TipoVehiculoDeleteDialogComponent,
    TipoVehiculoDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehiclesTipoVehiculoModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
