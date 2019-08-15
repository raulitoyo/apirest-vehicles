import { Moment } from 'moment';
import { IVehiculo } from 'app/shared/model/vehiculo.model';

export interface IConductor {
  id?: number;
  dni?: string;
  nombre?: string;
  fechaNacimiento?: Moment;
  email?: string;
  celular?: string;
  vehiculos?: IVehiculo[];
}

export class Conductor implements IConductor {
  constructor(
    public id?: number,
    public dni?: string,
    public nombre?: string,
    public fechaNacimiento?: Moment,
    public email?: string,
    public celular?: string,
    public vehiculos?: IVehiculo[]
  ) {}
}
