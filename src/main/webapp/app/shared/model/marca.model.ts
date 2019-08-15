export interface IMarca {
  id?: number;
  codigo?: string;
  marca?: string;
  estado?: boolean;
}

export class Marca implements IMarca {
  constructor(public id?: number, public codigo?: string, public marca?: string, public estado?: boolean) {
    this.estado = this.estado || false;
  }
}
