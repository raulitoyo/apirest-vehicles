package com.mdw.vehicles.service;

import com.mdw.vehicles.domain.TipoVehiculo;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link TipoVehiculo}.
 */
public interface TipoVehiculoService {

    /**
     * Save a tipoVehiculo.
     *
     * @param tipoVehiculo the entity to save.
     * @return the persisted entity.
     */
    TipoVehiculo save(TipoVehiculo tipoVehiculo);

    /**
     * Get all the tipoVehiculos.
     *
     * @return the list of entities.
     */
    List<TipoVehiculo> findAll();


    /**
     * Get the "id" tipoVehiculo.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TipoVehiculo> findOne(Long id);

    /**
     * Delete the "id" tipoVehiculo.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Save a partial tipoVehiculo.
     *
     * @param tipoVehiculo the entity to save.
     * @return the persisted entity.
     */
    TipoVehiculo savePartial(TipoVehiculo tipoVehiculo);
}
