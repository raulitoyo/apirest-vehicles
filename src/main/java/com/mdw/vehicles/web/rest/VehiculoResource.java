package com.mdw.vehicles.web.rest;

import com.mdw.vehicles.domain.Vehiculo;
import com.mdw.vehicles.service.VehiculoService;
import com.mdw.vehicles.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mdw.vehicles.domain.Vehiculo}.
 */
@RestController
@RequestMapping("/api")
public class VehiculoResource {

    private final Logger log = LoggerFactory.getLogger(VehiculoResource.class);

    private static final String ENTITY_NAME = "vehiculo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VehiculoService vehiculoService;

    public VehiculoResource(VehiculoService vehiculoService) {
        this.vehiculoService = vehiculoService;
    }

    /**
     * {@code POST  /vehiculos} : Create a new vehiculo.
     *
     * @param vehiculo the vehiculo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new vehiculo, or with status {@code 400 (Bad Request)} if the vehiculo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/vehiculos")
    public ResponseEntity<Vehiculo> createVehiculo(@Valid @RequestBody Vehiculo vehiculo) throws URISyntaxException {
        log.debug("REST request to save Vehiculo : {}", vehiculo);
        if (vehiculo.getId() != null) {
            throw new BadRequestAlertException("A new vehiculo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Vehiculo result = vehiculoService.save(vehiculo);
        return ResponseEntity.created(new URI("/api/vehiculos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /vehiculos} : Updates an existing vehiculo.
     *
     * @param vehiculo the vehiculo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated vehiculo,
     * or with status {@code 400 (Bad Request)} if the vehiculo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the vehiculo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/vehiculos/{id}")
    public ResponseEntity<Vehiculo> updateVehiculo(@PathVariable Long id, @Valid @RequestBody Vehiculo vehiculo) throws URISyntaxException {
        log.debug("REST request to update Vehiculo : {}", vehiculo);
        if (id == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        vehiculo.setId(id);
        Vehiculo result = vehiculoService.save(vehiculo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, vehiculo.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /vehiculos} : get all the vehiculos.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of vehiculos in body.
     */
    @GetMapping("/vehiculos")
    public ResponseEntity<List<Vehiculo>> getAllVehiculos(Pageable pageable) {
        log.debug("REST request to get a page of Vehiculos");
        Page<Vehiculo> page = vehiculoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /vehiculos/:id} : get the "id" vehiculo.
     *
     * @param id the id of the vehiculo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the vehiculo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/vehiculos/{id}")
    public ResponseEntity<Vehiculo> getVehiculo(@PathVariable Long id) {
        log.debug("REST request to get Vehiculo : {}", id);
        Optional<Vehiculo> vehiculo = vehiculoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(vehiculo);
    }

    /**
     * {@code DELETE  /vehiculos/:id} : delete the "id" vehiculo.
     *
     * @param id the id of the vehiculo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/vehiculos/{id}")
    public ResponseEntity<Void> deleteVehiculo(@PathVariable Long id) {
        log.debug("REST request to delete Vehiculo : {}", id);
        vehiculoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
