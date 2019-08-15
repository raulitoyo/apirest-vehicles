import { Moment } from 'moment';
import { IVehiculo } from 'app/shared/model/vehiculo.model';

export const enum EstadoReserva {
  DISPONIBLE = 'DISPONIBLE',
  RESTRINGIDO = 'RESTRINGIDO',
  OCUPADO = 'OCUPADO'
}

export interface IReserva {
  id?: number;
  codigo?: string;
  fechaHoraInicio?: Moment;
  fechaHoraFin?: Moment;
  estadoReserva?: EstadoReserva;
  vehiculo?: IVehiculo;
}

export class Reserva implements IReserva {
  constructor(
    public id?: number,
    public codigo?: string,
    public fechaHoraInicio?: Moment,
    public fechaHoraFin?: Moment,
    public estadoReserva?: EstadoReserva,
    public vehiculo?: IVehiculo
  ) {}
}
