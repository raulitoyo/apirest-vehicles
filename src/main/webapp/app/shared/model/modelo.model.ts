export interface IModelo {
  id?: number;
  codigo?: string;
  modelo?: string;
  estado?: boolean;
}

export class Modelo implements IModelo {
  constructor(public id?: number, public codigo?: string, public modelo?: string, public estado?: boolean) {
    this.estado = this.estado || false;
  }
}
