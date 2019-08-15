import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { VehiclesSharedModule } from 'app/shared';
import {
  ReservaComponent,
  ReservaDetailComponent,
  ReservaUpdateComponent,
  ReservaDeletePopupComponent,
  ReservaDeleteDialogComponent,
  reservaRoute,
  reservaPopupRoute
} from './';

const ENTITY_STATES = [...reservaRoute, ...reservaPopupRoute];

@NgModule({
  imports: [VehiclesSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ReservaComponent,
    ReservaDetailComponent,
    ReservaUpdateComponent,
    ReservaDeleteDialogComponent,
    ReservaDeletePopupComponent
  ],
  entryComponents: [ReservaComponent, ReservaUpdateComponent, ReservaDeleteDialogComponent, ReservaDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehiclesReservaModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
