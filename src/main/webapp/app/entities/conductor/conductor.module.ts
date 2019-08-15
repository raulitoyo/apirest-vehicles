import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { VehiclesSharedModule } from 'app/shared';
import {
  ConductorComponent,
  ConductorDetailComponent,
  ConductorUpdateComponent,
  ConductorDeletePopupComponent,
  ConductorDeleteDialogComponent,
  conductorRoute,
  conductorPopupRoute
} from './';

const ENTITY_STATES = [...conductorRoute, ...conductorPopupRoute];

@NgModule({
  imports: [VehiclesSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ConductorComponent,
    ConductorDetailComponent,
    ConductorUpdateComponent,
    ConductorDeleteDialogComponent,
    ConductorDeletePopupComponent
  ],
  entryComponents: [ConductorComponent, ConductorUpdateComponent, ConductorDeleteDialogComponent, ConductorDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehiclesConductorModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
