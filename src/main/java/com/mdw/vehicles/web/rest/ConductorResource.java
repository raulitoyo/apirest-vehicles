package com.mdw.vehicles.web.rest;

import com.mdw.vehicles.domain.Conductor;
import com.mdw.vehicles.service.ConductorService;
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
 * REST controller for managing {@link com.mdw.vehicles.domain.Conductor}.
 */
@RestController
@RequestMapping("/api")
public class ConductorResource {

    private final Logger log = LoggerFactory.getLogger(ConductorResource.class);

    private static final String ENTITY_NAME = "conductor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ConductorService conductorService;

    public ConductorResource(ConductorService conductorService) {
        this.conductorService = conductorService;
    }

    /**
     * {@code POST  /conductors} : Create a new conductor.
     *
     * @param conductor the conductor to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new conductor, or with status {@code 400 (Bad Request)} if the conductor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/conductors/{id}")
    public ResponseEntity<Conductor> createConductor(@PathVariable Long id, @Valid @RequestBody Conductor conductor) throws URISyntaxException {
        log.debug("REST request to save Conductor : {}", conductor);
        if (id != null) {
            throw new BadRequestAlertException("A new conductor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        conductor.setId(id);
        Conductor result = conductorService.save(conductor);
        return ResponseEntity.created(new URI("/api/conductors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /conductors} : Updates an existing conductor.
     *
     * @param conductor the conductor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated conductor,
     * or with status {@code 400 (Bad Request)} if the conductor is not valid,
     * or with status {@code 500 (Internal Server Error)} if the conductor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/conductors/{id}")
    public ResponseEntity<Conductor> updateConductor(@PathVariable Long id, @Valid @RequestBody Conductor conductor) throws URISyntaxException {
        log.debug("REST request to update Conductor : {}", conductor);
        if (id == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        conductor.setId(id);
        Conductor result = conductorService.save(conductor);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, conductor.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /conductors} : get all the conductors.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of conductors in body.
     */
    @GetMapping("/conductors")
    public ResponseEntity<List<Conductor>> getAllConductors(Pageable pageable) {
        log.debug("REST request to get a page of Conductors");
        Page<Conductor> page = conductorService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /conductors/:id} : get the "id" conductor.
     *
     * @param id the id of the conductor to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the conductor, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/conductors/{id}")
    public ResponseEntity<Conductor> getConductor(@PathVariable Long id) {
        log.debug("REST request to get Conductor : {}", id);
        Optional<Conductor> conductor = conductorService.findOne(id);
        return ResponseUtil.wrapOrNotFound(conductor);
    }

    /**
     * {@code DELETE  /conductors/:id} : delete the "id" conductor.
     *
     * @param id the id of the conductor to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/conductors/{id}")
    public ResponseEntity<Void> deleteConductor(@PathVariable Long id) {
        log.debug("REST request to delete Conductor : {}", id);
        conductorService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code PUT  /conductors} : Updates an existing conductor.
     *
     * @param conductor the conductor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated conductor,
     * or with status {@code 400 (Bad Request)} if the conductor is not valid,
     * or with status {@code 500 (Internal Server Error)} if the conductor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping("/conductors/{id}")
    public ResponseEntity<Conductor> updateConductorPartial(@PathVariable Long id, @Valid @RequestBody Conductor conductor) throws URISyntaxException {
        log.debug("REST request to update Conductor : {}", conductor);
        if (id == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        conductor.setId(id);
        Conductor result = conductorService.save(conductor);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, conductor.getId().toString()))
            .body(result);
    }
}
