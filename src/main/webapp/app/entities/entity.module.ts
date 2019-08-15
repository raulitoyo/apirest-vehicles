import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'reserva',
        loadChildren: () => import('./reserva/reserva.module').then(m => m.VehiclesReservaModule)
      },
      {
        path: 'marca',
        loadChildren: () => import('./marca/marca.module').then(m => m.VehiclesMarcaModule)
      },
      {
        path: 'modelo',
        loadChildren: () => import('./modelo/modelo.module').then(m => m.VehiclesModeloModule)
      },
      {
        path: 'vehiculo',
        loadChildren: () => import('./vehiculo/vehiculo.module').then(m => m.VehiclesVehiculoModule)
      },
      {
        path: 'tipo-vehiculo',
        loadChildren: () => import('./tipo-vehiculo/tipo-vehiculo.module').then(m => m.VehiclesTipoVehiculoModule)
      },
      {
        path: 'conductor',
        loadChildren: () => import('./conductor/conductor.module').then(m => m.VehiclesConductorModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehiclesEntityModule {}
