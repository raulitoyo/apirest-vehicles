import { IMarca } from 'app/shared/model/marca.model';
import { IModelo } from 'app/shared/model/modelo.model';
import { ITipoVehiculo } from 'app/shared/model/tipo-vehiculo.model';
import { IConductor } from 'app/shared/model/conductor.model';

export interface IVehiculo {
  id?: number;
  placa?: string;
  color?: number;
  estado?: boolean;
  marca?: IMarca;
  modelo?: IModelo;
  tipo?: ITipoVehiculo;
  duenho?: IConductor;
}

export class Vehiculo implements IVehiculo {
  constructor(
    public id?: number,
    public placa?: string,
    public color?: number,
    public estado?: boolean,
    public marca?: IMarca,
    public modelo?: IModelo,
    public tipo?: ITipoVehiculo,
    public duenho?: IConductor
  ) {
    this.estado = this.estado || false;
  }
}
