package com.ird.faa.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.ird.faa.bean.PaiementTag;


@Repository
public interface PaiementTagDao extends JpaRepository<PaiementTag,Long> {





    List<PaiementTag> findByPaiementReference(String reference);
    int deleteByPaiementReference(String reference);

    List<PaiementTag> findByPaiementId(Long id);

    int deleteByPaiementId(Long id);
    List<PaiementTag> findByTagReference(String reference);
    int deleteByTagReference(String reference);

    List<PaiementTag> findByTagId(Long id);

    int deleteByTagId(Long id);


}
