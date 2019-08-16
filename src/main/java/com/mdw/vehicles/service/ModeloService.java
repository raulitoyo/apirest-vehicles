package com.mdw.vehicles.service;

import com.mdw.vehicles.domain.Modelo;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Modelo}.
 */
public interface ModeloService {

    /**
     * Save a modelo.
     *
     * @param modelo the entity to save.
     * @return the persisted entity.
     */
    Modelo save(Modelo modelo);

    /**
     * Get all the modelos.
     *
     * @return the list of entities.
     */
    List<Modelo> findAll();


    /**
     * Get the "id" modelo.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Modelo> findOne(Long id);

    /**
     * Delete the "id" modelo.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Save a partial modelo.
     *
     * @param modelo the entity to save.
     * @return the persisted entity.
     */
    Modelo savePartial(Modelo modelo);    
}
