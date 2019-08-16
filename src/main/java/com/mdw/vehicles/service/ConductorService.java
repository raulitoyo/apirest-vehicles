package com.mdw.vehicles.service;

import com.mdw.vehicles.domain.Conductor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Conductor}.
 */
public interface ConductorService {

    /**
     * Save a conductor.
     *
     * @param conductor the entity to save.
     * @return the persisted entity.
     */
    Conductor save(Conductor conductor);

    /**
     * Get all the conductors.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Conductor> findAll(Pageable pageable);


    /**
     * Get the "id" conductor.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Conductor> findOne(Long id);

    /**
     * Delete the "id" conductor.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Save a partial conductor.
     *
     * @param conductor the entity to save.
     * @return the persisted entity.
     */
    Conductor savePartial(Conductor conductor);

}
