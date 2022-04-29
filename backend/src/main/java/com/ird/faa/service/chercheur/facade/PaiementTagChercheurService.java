package com.ird.faa.service.chercheur.facade;

import java.util.List;
import com.ird.faa.bean.PaiementTag;
import com.ird.faa.ws.rest.provided.vo.PaiementTagVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface PaiementTagChercheurService extends AbstractService<PaiementTag,Long,PaiementTagVo>{




/**
    * delete PaiementTag from database
    * @param id - id of PaiementTag to be deleted
    *
    */
    int deleteById(Long id);


    List<PaiementTag> findByPaiementReference(String reference);

    int deleteByPaiementReference(String reference);

    List<PaiementTag> findByPaiementId(Long id);

    int deleteByPaiementId(Long id);
    List<PaiementTag> findByTagReference(String reference);

    int deleteByTagReference(String reference);

    List<PaiementTag> findByTagId(Long id);

    int deleteByTagId(Long id);







}
