package com.mdw.vehicles.service;

import com.mdw.vehicles.domain.Marca;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Marca}.
 */
public interface MarcaService {

    /**
     * Save a marca.
     *
     * @param marca the entity to save.
     * @return the persisted entity.
     */
    Marca save(Marca marca);

    /**
     * Get all the marcas.
     *
     * @return the list of entities.
     */
    List<Marca> findAll();


    /**
     * Get the "id" marca.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Marca> findOne(Long id);

    /**
     * Delete the "id" marca.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Save a partial marca.
     *
     * @param marca the entity to save.
     * @return the persisted entity.
     */
    Marca savePartial(Marca marca);    
}
