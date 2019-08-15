package com.mdw.vehicles.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Vehiculo.
 */
@Entity
@Table(name = "vehiculo")
public class Vehiculo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 7)
    @Column(name = "placa", length = 7, nullable = false)
    private String placa;

    @Column(name = "color")
    private Integer color;

    @Column(name = "estado")
    private Boolean estado;

    @OneToOne
    @JoinColumn(unique = true)
    private Marca marca;

    @OneToOne
    @JoinColumn(unique = true)
    private Modelo modelo;

    @ManyToOne
    @JsonIgnoreProperties("vehiculos")
    private TipoVehiculo tipo;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("vehiculos")
    private Conductor duenho;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlaca() {
        return placa;
    }

    public Vehiculo placa(String placa) {
        this.placa = placa;
        return this;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public Integer getColor() {
        return color;
    }

    public Vehiculo color(Integer color) {
        this.color = color;
        return this;
    }

    public void setColor(Integer color) {
        this.color = color;
    }

    public Boolean isEstado() {
        return estado;
    }

    public Vehiculo estado(Boolean estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(Boolean estado) {
        this.estado = estado;
    }

    public Marca getMarca() {
        return marca;
    }

    public Vehiculo marca(Marca marca) {
        this.marca = marca;
        return this;
    }

    public void setMarca(Marca marca) {
        this.marca = marca;
    }

    public Modelo getModelo() {
        return modelo;
    }

    public Vehiculo modelo(Modelo modelo) {
        this.modelo = modelo;
        return this;
    }

    public void setModelo(Modelo modelo) {
        this.modelo = modelo;
    }

    public TipoVehiculo getTipo() {
        return tipo;
    }

    public Vehiculo tipo(TipoVehiculo tipoVehiculo) {
        this.tipo = tipoVehiculo;
        return this;
    }

    public void setTipo(TipoVehiculo tipoVehiculo) {
        this.tipo = tipoVehiculo;
    }

    public Conductor getDuenho() {
        return duenho;
    }

    public Vehiculo duenho(Conductor conductor) {
        this.duenho = conductor;
        return this;
    }

    public void setDuenho(Conductor conductor) {
        this.duenho = conductor;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Vehiculo)) {
            return false;
        }
        return id != null && id.equals(((Vehiculo) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Vehiculo{" +
            "id=" + getId() +
            ", placa='" + getPlaca() + "'" +
            ", color=" + getColor() +
            ", estado='" + isEstado() + "'" +
            "}";
    }
}
