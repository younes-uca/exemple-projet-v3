package com.ird.faa.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.ird.faa.bean.PaiementDetail;


@Repository
public interface PaiementDetailDao extends JpaRepository<PaiementDetail,Long> {




    PaiementDetail findByReference(String reference);

    int deleteByReference(String reference);

    List<PaiementDetail> findByClientReference(String reference);
    int deleteByClientReference(String reference);

    List<PaiementDetail> findByClientId(Long id);

    int deleteByClientId(Long id);
    List<PaiementDetail> findByPaiementReference(String reference);
    int deleteByPaiementReference(String reference);

    List<PaiementDetail> findByPaiementId(Long id);

    int deleteByPaiementId(Long id);


}
