package com.mdw.vehicles.web.rest;

import com.mdw.vehicles.VehiclesApp;
import com.mdw.vehicles.domain.Modelo;
import com.mdw.vehicles.repository.ModeloRepository;
import com.mdw.vehicles.service.ModeloService;
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
 * Integration tests for the {@link ModeloResource} REST controller.
 */
@SpringBootTest(classes = VehiclesApp.class)
public class ModeloResourceIT {

    private static final String DEFAULT_CODIGO = "AAAAA";
    private static final String UPDATED_CODIGO = "BBBBB";

    private static final String DEFAULT_MODELO = "AAAAAAAAAA";
    private static final String UPDATED_MODELO = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ESTADO = false;
    private static final Boolean UPDATED_ESTADO = true;

    @Autowired
    private ModeloRepository modeloRepository;

    @Autowired
    private ModeloService modeloService;

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

    private MockMvc restModeloMockMvc;

    private Modelo modelo;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ModeloResource modeloResource = new ModeloResource(modeloService);
        this.restModeloMockMvc = MockMvcBuilders.standaloneSetup(modeloResource)
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
    public static Modelo createEntity(EntityManager em) {
        Modelo modelo = new Modelo()
            .codigo(DEFAULT_CODIGO)
            .modelo(DEFAULT_MODELO)
            .estado(DEFAULT_ESTADO);
        return modelo;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Modelo createUpdatedEntity(EntityManager em) {
        Modelo modelo = new Modelo()
            .codigo(UPDATED_CODIGO)
            .modelo(UPDATED_MODELO)
            .estado(UPDATED_ESTADO);
        return modelo;
    }

    @BeforeEach
    public void initTest() {
        modelo = createEntity(em);
    }

    @Test
    @Transactional
    public void createModelo() throws Exception {
        int databaseSizeBeforeCreate = modeloRepository.findAll().size();

        // Create the Modelo
        restModeloMockMvc.perform(post("/api/modelos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modelo)))
            .andExpect(status().isCreated());

        // Validate the Modelo in the database
        List<Modelo> modeloList = modeloRepository.findAll();
        assertThat(modeloList).hasSize(databaseSizeBeforeCreate + 1);
        Modelo testModelo = modeloList.get(modeloList.size() - 1);
        assertThat(testModelo.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testModelo.getModelo()).isEqualTo(DEFAULT_MODELO);
        assertThat(testModelo.isEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    public void createModeloWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = modeloRepository.findAll().size();

        // Create the Modelo with an existing ID
        modelo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restModeloMockMvc.perform(post("/api/modelos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modelo)))
            .andExpect(status().isBadRequest());

        // Validate the Modelo in the database
        List<Modelo> modeloList = modeloRepository.findAll();
        assertThat(modeloList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCodigoIsRequired() throws Exception {
        int databaseSizeBeforeTest = modeloRepository.findAll().size();
        // set the field null
        modelo.setCodigo(null);

        // Create the Modelo, which fails.

        restModeloMockMvc.perform(post("/api/modelos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modelo)))
            .andExpect(status().isBadRequest());

        List<Modelo> modeloList = modeloRepository.findAll();
        assertThat(modeloList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkModeloIsRequired() throws Exception {
        int databaseSizeBeforeTest = modeloRepository.findAll().size();
        // set the field null
        modelo.setModelo(null);

        // Create the Modelo, which fails.

        restModeloMockMvc.perform(post("/api/modelos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modelo)))
            .andExpect(status().isBadRequest());

        List<Modelo> modeloList = modeloRepository.findAll();
        assertThat(modeloList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllModelos() throws Exception {
        // Initialize the database
        modeloRepository.saveAndFlush(modelo);

        // Get all the modeloList
        restModeloMockMvc.perform(get("/api/modelos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(modelo.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.toString())))
            .andExpect(jsonPath("$.[*].modelo").value(hasItem(DEFAULT_MODELO.toString())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getModelo() throws Exception {
        // Initialize the database
        modeloRepository.saveAndFlush(modelo);

        // Get the modelo
        restModeloMockMvc.perform(get("/api/modelos/{id}", modelo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(modelo.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.toString()))
            .andExpect(jsonPath("$.modelo").value(DEFAULT_MODELO.toString()))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingModelo() throws Exception {
        // Get the modelo
        restModeloMockMvc.perform(get("/api/modelos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateModelo() throws Exception {
        // Initialize the database
        modeloService.save(modelo);

        int databaseSizeBeforeUpdate = modeloRepository.findAll().size();

        // Update the modelo
        Modelo updatedModelo = modeloRepository.findById(modelo.getId()).get();
        // Disconnect from session so that the updates on updatedModelo are not directly saved in db
        em.detach(updatedModelo);
        updatedModelo
            .codigo(UPDATED_CODIGO)
            .modelo(UPDATED_MODELO)
            .estado(UPDATED_ESTADO);

        restModeloMockMvc.perform(put("/api/modelos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedModelo)))
            .andExpect(status().isOk());

        // Validate the Modelo in the database
        List<Modelo> modeloList = modeloRepository.findAll();
        assertThat(modeloList).hasSize(databaseSizeBeforeUpdate);
        Modelo testModelo = modeloList.get(modeloList.size() - 1);
        assertThat(testModelo.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testModelo.getModelo()).isEqualTo(UPDATED_MODELO);
        assertThat(testModelo.isEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    public void updateNonExistingModelo() throws Exception {
        int databaseSizeBeforeUpdate = modeloRepository.findAll().size();

        // Create the Modelo

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restModeloMockMvc.perform(put("/api/modelos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modelo)))
            .andExpect(status().isBadRequest());

        // Validate the Modelo in the database
        List<Modelo> modeloList = modeloRepository.findAll();
        assertThat(modeloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteModelo() throws Exception {
        // Initialize the database
        modeloService.save(modelo);

        int databaseSizeBeforeDelete = modeloRepository.findAll().size();

        // Delete the modelo
        restModeloMockMvc.perform(delete("/api/modelos/{id}", modelo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Modelo> modeloList = modeloRepository.findAll();
        assertThat(modeloList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Modelo.class);
        Modelo modelo1 = new Modelo();
        modelo1.setId(1L);
        Modelo modelo2 = new Modelo();
        modelo2.setId(modelo1.getId());
        assertThat(modelo1).isEqualTo(modelo2);
        modelo2.setId(2L);
        assertThat(modelo1).isNotEqualTo(modelo2);
        modelo1.setId(null);
        assertThat(modelo1).isNotEqualTo(modelo2);
    }
}
