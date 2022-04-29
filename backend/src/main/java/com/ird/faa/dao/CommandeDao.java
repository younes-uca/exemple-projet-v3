package com.ird.faa.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.ird.faa.bean.Commande;

import org.springframework.data.jpa.repository.Query;

@Repository
public interface CommandeDao extends JpaRepository<Commande,Long> {



    @Query("SELECT item FROM Commande item ORDER BY item.dateCommande ASC")
    List<Commande> findAll();

    Commande findByReference(String reference);

    int deleteByReference(String reference);

    List<Commande> findByClientReference(String reference);
    int deleteByClientReference(String reference);

    List<Commande> findByClientId(Long id);

    int deleteByClientId(Long id);


}
