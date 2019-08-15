package com.mdw.vehicles.web.rest;

import com.mdw.vehicles.VehiclesApp;
import com.mdw.vehicles.domain.Conductor;
import com.mdw.vehicles.repository.ConductorRepository;
import com.mdw.vehicles.service.ConductorService;
import com.mdw.vehicles.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.mdw.vehicles.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ConductorResource} REST controller.
 */
@SpringBootTest(classes = VehiclesApp.class)
public class ConductorResourceIT {

    private static final String DEFAULT_DNI = "AAAAAAAA";
    private static final String UPDATED_DNI = "BBBBBBBB";

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FECHA_NACIMIENTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_NACIMIENTO = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_FECHA_NACIMIENTO = LocalDate.ofEpochDay(-1L);

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_CELULAR = "AAAAAAAAAA";
    private static final String UPDATED_CELULAR = "BBBBBBBBBB";

    @Autowired
    private ConductorRepository conductorRepository;

    @Autowired
    private ConductorService conductorService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restConductorMockMvc;

    private Conductor conductor;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ConductorResource conductorResource = new ConductorResource(conductorService);
        this.restConductorMockMvc = MockMvcBuilders.standaloneSetup(conductorResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Conductor createEntity(EntityManager em) {
        Conductor conductor = new Conductor()
            .dni(DEFAULT_DNI)
            .nombre(DEFAULT_NOMBRE)
            .fechaNacimiento(DEFAULT_FECHA_NACIMIENTO)
            .email(DEFAULT_EMAIL)
            .celular(DEFAULT_CELULAR);
        return conductor;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Conductor createUpdatedEntity(EntityManager em) {
        Conductor conductor = new Conductor()
            .dni(UPDATED_DNI)
            .nombre(UPDATED_NOMBRE)
            .fechaNacimiento(UPDATED_FECHA_NACIMIENTO)
            .email(UPDATED_EMAIL)
            .celular(UPDATED_CELULAR);
        return conductor;
    }

    @BeforeEach
    public void initTest() {
        conductor = createEntity(em);
    }

    @Test
    @Transactional
    public void createConductor() throws Exception {
        int databaseSizeBeforeCreate = conductorRepository.findAll().size();

        // Create the Conductor
        restConductorMockMvc.perform(post("/api/conductors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(conductor)))
            .andExpect(status().isCreated());

        // Validate the Conductor in the database
        List<Conductor> conductorList = conductorRepository.findAll();
        assertThat(conductorList).hasSize(databaseSizeBeforeCreate + 1);
        Conductor testConductor = conductorList.get(conductorList.size() - 1);
        assertThat(testConductor.getDni()).isEqualTo(DEFAULT_DNI);
        assertThat(testConductor.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testConductor.getFechaNacimiento()).isEqualTo(DEFAULT_FECHA_NACIMIENTO);
        assertThat(testConductor.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testConductor.getCelular()).isEqualTo(DEFAULT_CELULAR);
    }

    @Test
    @Transactional
    public void createConductorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = conductorRepository.findAll().size();

        // Create the Conductor with an existing ID
        conductor.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restConductorMockMvc.perform(post("/api/conductors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(conductor)))
            .andExpect(status().isBadRequest());

        // Validate the Conductor in the database
        List<Conductor> conductorList = conductorRepository.findAll();
        assertThat(conductorList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDniIsRequired() throws Exception {
        int databaseSizeBeforeTest = conductorRepository.findAll().size();
        // set the field null
        conductor.setDni(null);

        // Create the Conductor, which fails.

        restConductorMockMvc.perform(post("/api/conductors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(conductor)))
            .andExpect(status().isBadRequest());

        List<Conductor> conductorList = conductorRepository.findAll();
        assertThat(conductorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllConductors() throws Exception {
        // Initialize the database
        conductorRepository.saveAndFlush(conductor);

        // Get all the conductorList
        restConductorMockMvc.perform(get("/api/conductors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(conductor.getId().intValue())))
            .andExpect(jsonPath("$.[*].dni").value(hasItem(DEFAULT_DNI.toString())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].fechaNacimiento").value(hasItem(DEFAULT_FECHA_NACIMIENTO.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].celular").value(hasItem(DEFAULT_CELULAR.toString())));
    }
    
    @Test
    @Transactional
    public void getConductor() throws Exception {
        // Initialize the database
        conductorRepository.saveAndFlush(conductor);

        // Get the conductor
        restConductorMockMvc.perform(get("/api/conductors/{id}", conductor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(conductor.getId().intValue()))
            .andExpect(jsonPath("$.dni").value(DEFAULT_DNI.toString()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.fechaNacimiento").value(DEFAULT_FECHA_NACIMIENTO.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.celular").value(DEFAULT_CELULAR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingConductor() throws Exception {
        // Get the conductor
        restConductorMockMvc.perform(get("/api/conductors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConductor() throws Exception {
        // Initialize the database
        conductorService.save(conductor);

        int databaseSizeBeforeUpdate = conductorRepository.findAll().size();

        // Update the conductor
        Conductor updatedConductor = conductorRepository.findById(conductor.getId()).get();
        // Disconnect from session so that the updates on updatedConductor are not directly saved in db
        em.detach(updatedConductor);
        updatedConductor
            .dni(UPDATED_DNI)
            .nombre(UPDATED_NOMBRE)
            .fechaNacimiento(UPDATED_FECHA_NACIMIENTO)
            .email(UPDATED_EMAIL)
            .celular(UPDATED_CELULAR);

        restConductorMockMvc.perform(put("/api/conductors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedConductor)))
            .andExpect(status().isOk());

        // Validate the Conductor in the database
        List<Conductor> conductorList = conductorRepository.findAll();
        assertThat(conductorList).hasSize(databaseSizeBeforeUpdate);
        Conductor testConductor = conductorList.get(conductorList.size() - 1);
        assertThat(testConductor.getDni()).isEqualTo(UPDATED_DNI);
        assertThat(testConductor.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testConductor.getFechaNacimiento()).isEqualTo(UPDATED_FECHA_NACIMIENTO);
        assertThat(testConductor.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testConductor.getCelular()).isEqualTo(UPDATED_CELULAR);
    }

    @Test
    @Transactional
    public void updateNonExistingConductor() throws Exception {
        int databaseSizeBeforeUpdate = conductorRepository.findAll().size();

        // Create the Conductor

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConductorMockMvc.perform(put("/api/conductors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(conductor)))
            .andExpect(status().isBadRequest());

        // Validate the Conductor in the database
        List<Conductor> conductorList = conductorRepository.findAll();
        assertThat(conductorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteConductor() throws Exception {
        // Initialize the database
        conductorService.save(conductor);

        int databaseSizeBeforeDelete = conductorRepository.findAll().size();

        // Delete the conductor
        restConductorMockMvc.perform(delete("/api/conductors/{id}", conductor.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Conductor> conductorList = conductorRepository.findAll();
        assertThat(conductorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Conductor.class);
        Conductor conductor1 = new Conductor();
        conductor1.setId(1L);
        Conductor conductor2 = new Conductor();
        conductor2.setId(conductor1.getId());
        assertThat(conductor1).isEqualTo(conductor2);
        conductor2.setId(2L);
        assertThat(conductor1).isNotEqualTo(conductor2);
        conductor1.setId(null);
        assertThat(conductor1).isNotEqualTo(conductor2);
    }
}
