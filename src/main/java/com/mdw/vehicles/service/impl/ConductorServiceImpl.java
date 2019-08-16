package com.mdw.vehicles.service.impl;

import com.mdw.vehicles.service.ConductorService;
import com.mdw.vehicles.domain.Conductor;
import com.mdw.vehicles.repository.ConductorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Conductor}.
 */
@Service
@Transactional
public class ConductorServiceImpl implements ConductorService {

    private final Logger log = LoggerFactory.getLogger(ConductorServiceImpl.class);

    private final ConductorRepository conductorRepository;

    public ConductorServiceImpl(ConductorRepository conductorRepository) {
        this.conductorRepository = conductorRepository;
    }

    /**
     * Save a conductor.
     *
     * @param conductor the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Conductor save(Conductor conductor) {
        log.debug("Request to save Conductor : {}", conductor);
        return conductorRepository.save(conductor);
    }

    /**
     * Get all the conductors.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Conductor> findAll(Pageable pageable) {
        log.debug("Request to get all Conductors");
        return conductorRepository.findAll(pageable);
    }


    /**
     * Get one conductor by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Conductor> findOne(Long id) {
        log.debug("Request to get Conductor : {}", id);
        return conductorRepository.findById(id);
    }

    /**
     * Delete the conductor by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Conductor : {}", id);
        conductorRepository.deleteById(id);
    }

    /**
     * Save a partial conductor.
     *
     * @param conductor the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Conductor savePartial(Conductor conductorPartial) {
        log.debug("Request to save Conductor : {}", conductorPartial);

        Optional<Conductor> conductor = conductorRepository.findById(conductorPartial.getId());
        if (conductorPartial.getDni() == null) {
            conductorPartial.setDni(conductor.get().getDni());
        }
        if (conductorPartial.getNombre() == null) {
            conductorPartial.setNombre(conductor.get().getNombre());
        }
        if (conductorPartial.getFechaNacimiento() == null) {
            conductorPartial.setFechaNacimiento(conductor.get().getFechaNacimiento());
        }
        if (conductorPartial.getEmail() == null) {
            conductorPartial.setEmail(conductor.get().getEmail());
        }
        if (conductorPartial.getCelular() == null) {
            conductorPartial.setCelular(conductor.get().getCelular());
        }

        return conductorRepository.save(conductorPartial);
    }
}
