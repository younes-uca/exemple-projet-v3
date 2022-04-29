package com.ird.faa.service.admin.facade;

import java.util.List;
import com.ird.faa.bean.PaiementDetail;
import com.ird.faa.ws.rest.provided.vo.PaiementDetailVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface PaiementDetailAdminService extends AbstractService<PaiementDetail,Long,PaiementDetailVo>{


    /**
    * find PaiementDetail from database by reference (reference)
    * @param reference - reference of PaiementDetail
    * @return the founded PaiementDetail , If no PaiementDetail were
    *         found in database return  null.
    */
    PaiementDetail findByReference(String reference);

    /**
    * find PaiementDetail from database by id (PK) or reference (reference)
    * @param id - id of PaiementDetail
    * @param reference - reference of PaiementDetail
    * @return the founded PaiementDetail , If no PaiementDetail were
    *         found in database return  null.
    */
    PaiementDetail findByIdOrReference(PaiementDetail paiementDetail);


/**
    * delete PaiementDetail from database
    * @param id - id of PaiementDetail to be deleted
    *
    */
    int deleteById(Long id);


    List<PaiementDetail> findByClientReference(String reference);

    int deleteByClientReference(String reference);

    List<PaiementDetail> findByClientId(Long id);

    int deleteByClientId(Long id);
    List<PaiementDetail> findByPaiementReference(String reference);

    int deleteByPaiementReference(String reference);

    List<PaiementDetail> findByPaiementId(Long id);

    int deleteByPaiementId(Long id);


    /**
    * delete PaiementDetail from database by reference (reference)
    *
    * @param reference - reference of PaiementDetail to be deleted
    * @return 1 if PaiementDetail deleted successfully
    */
    int deleteByReference(String reference);





}
