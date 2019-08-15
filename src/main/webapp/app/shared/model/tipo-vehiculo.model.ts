export interface ITipoVehiculo {
  id?: number;
  codigo?: string;
  tipo?: string;
  estado?: boolean;
}

export class TipoVehiculo implements ITipoVehiculo {
  constructor(public id?: number, public codigo?: string, public tipo?: string, public estado?: boolean) {
    this.estado = this.estado || false;
  }
}
