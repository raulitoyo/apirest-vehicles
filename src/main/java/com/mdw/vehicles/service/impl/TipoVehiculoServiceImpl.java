package com.mdw.vehicles.service.impl;

import com.mdw.vehicles.service.TipoVehiculoService;
import com.mdw.vehicles.domain.TipoVehiculo;
import com.mdw.vehicles.repository.TipoVehiculoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link TipoVehiculo}.
 */
@Service
@Transactional
public class TipoVehiculoServiceImpl implements TipoVehiculoService {

    private final Logger log = LoggerFactory.getLogger(TipoVehiculoServiceImpl.class);

    private final TipoVehiculoRepository tipoVehiculoRepository;

    public TipoVehiculoServiceImpl(TipoVehiculoRepository tipoVehiculoRepository) {
        this.tipoVehiculoRepository = tipoVehiculoRepository;
    }

    /**
     * Save a tipoVehiculo.
     *
     * @param tipoVehiculo the entity to save.
     * @return the persisted entity.
     */
    @Override
    public TipoVehiculo save(TipoVehiculo tipoVehiculo) {
        log.debug("Request to save TipoVehiculo : {}", tipoVehiculo);
        return tipoVehiculoRepository.save(tipoVehiculo);
    }

    /**
     * Get all the tipoVehiculos.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<TipoVehiculo> findAll() {
        log.debug("Request to get all TipoVehiculos");
        return tipoVehiculoRepository.findAll();
    }


    /**
     * Get one tipoVehiculo by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TipoVehiculo> findOne(Long id) {
        log.debug("Request to get TipoVehiculo : {}", id);
        return tipoVehiculoRepository.findById(id);
    }

    /**
     * Delete the tipoVehiculo by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TipoVehiculo : {}", id);
        tipoVehiculoRepository.deleteById(id);
    }
}
