package com.mdw.vehicles.web.rest;

import com.mdw.vehicles.VehiclesApp;
import com.mdw.vehicles.domain.TipoVehiculo;
import com.mdw.vehicles.repository.TipoVehiculoRepository;
import com.mdw.vehicles.service.TipoVehiculoService;
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
import java.util.List;

import static com.mdw.vehicles.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TipoVehiculoResource} REST controller.
 */
@SpringBootTest(classes = VehiclesApp.class)
public class TipoVehiculoResourceIT {

    private static final String DEFAULT_CODIGO = "AAAAA";
    private static final String UPDATED_CODIGO = "BBBBB";

    private static final String DEFAULT_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ESTADO = false;
    private static final Boolean UPDATED_ESTADO = true;

    @Autowired
    private TipoVehiculoRepository tipoVehiculoRepository;

    @Autowired
    private TipoVehiculoService tipoVehiculoService;

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

    private MockMvc restTipoVehiculoMockMvc;

    private TipoVehiculo tipoVehiculo;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TipoVehiculoResource tipoVehiculoResource = new TipoVehiculoResource(tipoVehiculoService);
        this.restTipoVehiculoMockMvc = MockMvcBuilders.standaloneSetup(tipoVehiculoResource)
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
    public static TipoVehiculo createEntity(EntityManager em) {
        TipoVehiculo tipoVehiculo = new TipoVehiculo()
            .codigo(DEFAULT_CODIGO)
            .tipo(DEFAULT_TIPO)
            .estado(DEFAULT_ESTADO);
        return tipoVehiculo;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoVehiculo createUpdatedEntity(EntityManager em) {
        TipoVehiculo tipoVehiculo = new TipoVehiculo()
            .codigo(UPDATED_CODIGO)
            .tipo(UPDATED_TIPO)
            .estado(UPDATED_ESTADO);
        return tipoVehiculo;
    }

    @BeforeEach
    public void initTest() {
        tipoVehiculo = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoVehiculo() throws Exception {
        int databaseSizeBeforeCreate = tipoVehiculoRepository.findAll().size();

        // Create the TipoVehiculo
        restTipoVehiculoMockMvc.perform(post("/api/tipo-vehiculos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoVehiculo)))
            .andExpect(status().isCreated());

        // Validate the TipoVehiculo in the database
        List<TipoVehiculo> tipoVehiculoList = tipoVehiculoRepository.findAll();
        assertThat(tipoVehiculoList).hasSize(databaseSizeBeforeCreate + 1);
        TipoVehiculo testTipoVehiculo = tipoVehiculoList.get(tipoVehiculoList.size() - 1);
        assertThat(testTipoVehiculo.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testTipoVehiculo.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testTipoVehiculo.isEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    public void createTipoVehiculoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoVehiculoRepository.findAll().size();

        // Create the TipoVehiculo with an existing ID
        tipoVehiculo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoVehiculoMockMvc.perform(post("/api/tipo-vehiculos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoVehiculo)))
            .andExpect(status().isBadRequest());

        // Validate the TipoVehiculo in the database
        List<TipoVehiculo> tipoVehiculoList = tipoVehiculoRepository.findAll();
        assertThat(tipoVehiculoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCodigoIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipoVehiculoRepository.findAll().size();
        // set the field null
        tipoVehiculo.setCodigo(null);

        // Create the TipoVehiculo, which fails.

        restTipoVehiculoMockMvc.perform(post("/api/tipo-vehiculos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoVehiculo)))
            .andExpect(status().isBadRequest());

        List<TipoVehiculo> tipoVehiculoList = tipoVehiculoRepository.findAll();
        assertThat(tipoVehiculoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTipoIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipoVehiculoRepository.findAll().size();
        // set the field null
        tipoVehiculo.setTipo(null);

        // Create the TipoVehiculo, which fails.

        restTipoVehiculoMockMvc.perform(post("/api/tipo-vehiculos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoVehiculo)))
            .andExpect(status().isBadRequest());

        List<TipoVehiculo> tipoVehiculoList = tipoVehiculoRepository.findAll();
        assertThat(tipoVehiculoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTipoVehiculos() throws Exception {
        // Initialize the database
        tipoVehiculoRepository.saveAndFlush(tipoVehiculo);

        // Get all the tipoVehiculoList
        restTipoVehiculoMockMvc.perform(get("/api/tipo-vehiculos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoVehiculo.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.toString())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getTipoVehiculo() throws Exception {
        // Initialize the database
        tipoVehiculoRepository.saveAndFlush(tipoVehiculo);

        // Get the tipoVehiculo
        restTipoVehiculoMockMvc.perform(get("/api/tipo-vehiculos/{id}", tipoVehiculo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tipoVehiculo.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.toString()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTipoVehiculo() throws Exception {
        // Get the tipoVehiculo
        restTipoVehiculoMockMvc.perform(get("/api/tipo-vehiculos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoVehiculo() throws Exception {
        // Initialize the database
        tipoVehiculoService.save(tipoVehiculo);

        int databaseSizeBeforeUpdate = tipoVehiculoRepository.findAll().size();

        // Update the tipoVehiculo
        TipoVehiculo updatedTipoVehiculo = tipoVehiculoRepository.findById(tipoVehiculo.getId()).get();
        // Disconnect from session so that the updates on updatedTipoVehiculo are not directly saved in db
        em.detach(updatedTipoVehiculo);
        updatedTipoVehiculo
            .codigo(UPDATED_CODIGO)
            .tipo(UPDATED_TIPO)
            .estado(UPDATED_ESTADO);

        restTipoVehiculoMockMvc.perform(put("/api/tipo-vehiculos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoVehiculo)))
            .andExpect(status().isOk());

        // Validate the TipoVehiculo in the database
        List<TipoVehiculo> tipoVehiculoList = tipoVehiculoRepository.findAll();
        assertThat(tipoVehiculoList).hasSize(databaseSizeBeforeUpdate);
        TipoVehiculo testTipoVehiculo = tipoVehiculoList.get(tipoVehiculoList.size() - 1);
        assertThat(testTipoVehiculo.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testTipoVehiculo.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testTipoVehiculo.isEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoVehiculo() throws Exception {
        int databaseSizeBeforeUpdate = tipoVehiculoRepository.findAll().size();

        // Create the TipoVehiculo

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoVehiculoMockMvc.perform(put("/api/tipo-vehiculos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoVehiculo)))
            .andExpect(status().isBadRequest());

        // Validate the TipoVehiculo in the database
        List<TipoVehiculo> tipoVehiculoList = tipoVehiculoRepository.findAll();
        assertThat(tipoVehiculoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoVehiculo() throws Exception {
        // Initialize the database
        tipoVehiculoService.save(tipoVehiculo);

        int databaseSizeBeforeDelete = tipoVehiculoRepository.findAll().size();

        // Delete the tipoVehiculo
        restTipoVehiculoMockMvc.perform(delete("/api/tipo-vehiculos/{id}", tipoVehiculo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoVehiculo> tipoVehiculoList = tipoVehiculoRepository.findAll();
        assertThat(tipoVehiculoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoVehiculo.class);
        TipoVehiculo tipoVehiculo1 = new TipoVehiculo();
        tipoVehiculo1.setId(1L);
        TipoVehiculo tipoVehiculo2 = new TipoVehiculo();
        tipoVehiculo2.setId(tipoVehiculo1.getId());
        assertThat(tipoVehiculo1).isEqualTo(tipoVehiculo2);
        tipoVehiculo2.setId(2L);
        assertThat(tipoVehiculo1).isNotEqualTo(tipoVehiculo2);
        tipoVehiculo1.setId(null);
        assertThat(tipoVehiculo1).isNotEqualTo(tipoVehiculo2);
    }
}
