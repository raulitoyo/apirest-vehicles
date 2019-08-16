package com.mdw.vehicles.web.rest;

import com.mdw.vehicles.domain.TipoVehiculo;
import com.mdw.vehicles.service.TipoVehiculoService;
import com.mdw.vehicles.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mdw.vehicles.domain.TipoVehiculo}.
 */
@RestController
@RequestMapping("/api")
public class TipoVehiculoResource {

    private final Logger log = LoggerFactory.getLogger(TipoVehiculoResource.class);

    private static final String ENTITY_NAME = "tipoVehiculo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoVehiculoService tipoVehiculoService;

    public TipoVehiculoResource(TipoVehiculoService tipoVehiculoService) {
        this.tipoVehiculoService = tipoVehiculoService;
    }

    /**
     * {@code POST  /tipo-vehiculos} : Create a new tipoVehiculo.
     *
     * @param tipoVehiculo the tipoVehiculo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoVehiculo, or with status {@code 400 (Bad Request)} if the tipoVehiculo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-vehiculos")
    public ResponseEntity<TipoVehiculo> createTipoVehiculo(@Valid @RequestBody TipoVehiculo tipoVehiculo) throws URISyntaxException {
        log.debug("REST request to save TipoVehiculo : {}", tipoVehiculo);
        if (tipoVehiculo.getId() != null) {
            throw new BadRequestAlertException("A new tipoVehiculo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoVehiculo result = tipoVehiculoService.save(tipoVehiculo);
        return ResponseEntity.created(new URI("/api/tipo-vehiculos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-vehiculos} : Updates an existing tipoVehiculo.
     *
     * @param tipoVehiculo the tipoVehiculo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoVehiculo,
     * or with status {@code 400 (Bad Request)} if the tipoVehiculo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoVehiculo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-vehiculos/{id}")
    public ResponseEntity<TipoVehiculo> updateTipoVehiculo(@PathVariable Long id, @Valid @RequestBody TipoVehiculo tipoVehiculo) throws URISyntaxException {
        log.debug("REST request to update TipoVehiculo : {}", tipoVehiculo);
        if (id == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        tipoVehiculo.setId(id);
        TipoVehiculo result = tipoVehiculoService.save(tipoVehiculo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoVehiculo.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-vehiculos} : get all the tipoVehiculos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoVehiculos in body.
     */
    @GetMapping("/tipo-vehiculos")
    public List<TipoVehiculo> getAllTipoVehiculos() {
        log.debug("REST request to get all TipoVehiculos");
        return tipoVehiculoService.findAll();
    }

    /**
     * {@code GET  /tipo-vehiculos/:id} : get the "id" tipoVehiculo.
     *
     * @param id the id of the tipoVehiculo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoVehiculo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-vehiculos/{id}")
    public ResponseEntity<TipoVehiculo> getTipoVehiculo(@PathVariable Long id) {
        log.debug("REST request to get TipoVehiculo : {}", id);
        Optional<TipoVehiculo> tipoVehiculo = tipoVehiculoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tipoVehiculo);
    }

    /**
     * {@code DELETE  /tipo-vehiculos/:id} : delete the "id" tipoVehiculo.
     *
     * @param id the id of the tipoVehiculo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-vehiculos/{id}")
    public ResponseEntity<Void> deleteTipoVehiculo(@PathVariable Long id) {
        log.debug("REST request to delete TipoVehiculo : {}", id);
        tipoVehiculoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code PUT  /tipo-vehiculos} : Updates an existing tipoVehiculo.
     *
     * @param tipoVehiculo the tipoVehiculo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoVehiculo,
     * or with status {@code 400 (Bad Request)} if the tipoVehiculo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoVehiculo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping("/tipo-vehiculos/{id}")
    public ResponseEntity<TipoVehiculo> updateTipoVehiculoPartial(@PathVariable Long id, @Valid @RequestBody TipoVehiculo tipoVehiculo) throws URISyntaxException {
        log.debug("REST request to update TipoVehiculo : {}", tipoVehiculo);
        if (id == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        tipoVehiculo.setId(id);
        TipoVehiculo result = tipoVehiculoService.save(tipoVehiculo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoVehiculo.getId().toString()))
            .body(result);
    }
}
