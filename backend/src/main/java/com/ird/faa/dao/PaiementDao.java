package com.ird.faa.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.ird.faa.bean.Paiement;

import org.springframework.data.jpa.repository.Query;

@Repository
public interface PaiementDao extends JpaRepository<Paiement,Long> {



    @Query("SELECT item FROM Paiement item ORDER BY item.datePaiement ASC")
    List<Paiement> findAll();

    Paiement findByReference(String reference);

    int deleteByReference(String reference);

    List<Paiement> findByCommandeReference(String reference);
    int deleteByCommandeReference(String reference);

    List<Paiement> findByCommandeId(Long id);

    int deleteByCommandeId(Long id);


}
