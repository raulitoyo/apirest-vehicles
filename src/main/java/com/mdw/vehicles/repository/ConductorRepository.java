package com.mdw.vehicles.repository;

import com.mdw.vehicles.domain.Conductor;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Conductor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConductorRepository extends JpaRepository<Conductor, Long> {

}
