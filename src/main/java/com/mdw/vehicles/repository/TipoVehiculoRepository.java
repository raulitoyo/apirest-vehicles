package com.mdw.vehicles.repository;

import com.mdw.vehicles.domain.TipoVehiculo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TipoVehiculo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoVehiculoRepository extends JpaRepository<TipoVehiculo, Long> {

}
