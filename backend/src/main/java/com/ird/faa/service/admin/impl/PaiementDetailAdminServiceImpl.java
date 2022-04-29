package com.ird.faa.service.admin.impl;

import java.util.List;
import java.util.Date;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.PaiementDetail;
import com.ird.faa.bean.Client;
import com.ird.faa.bean.Paiement;
import com.ird.faa.dao.PaiementDetailDao;
import com.ird.faa.service.admin.facade.PaiementDetailAdminService;
import com.ird.faa.service.admin.facade.PaiementAdminService;
import com.ird.faa.service.admin.facade.ClientAdminService;

import com.ird.faa.ws.rest.provided.vo.PaiementDetailVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class PaiementDetailAdminServiceImpl extends AbstractServiceImpl<PaiementDetail> implements PaiementDetailAdminService {

@Autowired
private PaiementDetailDao paiementDetailDao;

        @Autowired
        private PaiementAdminService paiementService ;
        @Autowired
        private ClientAdminService clientService ;


@Autowired
private EntityManager entityManager;


@Override
public List<PaiementDetail> findAll(){
        return paiementDetailDao.findAll();
}

        @Override
        public List<PaiementDetail> findByClientReference(String reference){
        return paiementDetailDao.findByClientReference(reference);
        }

        @Override
        @Transactional
        public int deleteByClientReference(String reference){
        return paiementDetailDao.deleteByClientReference(reference);
        }

        @Override
        public List<PaiementDetail> findByClientId(Long id){
        return paiementDetailDao.findByClientId(id);
        }

        @Override
        @Transactional
        public int deleteByClientId(Long id){
        return paiementDetailDao.deleteByClientId(id);
        }


        @Override
        public List<PaiementDetail> findByPaiementReference(String reference){
        return paiementDetailDao.findByPaiementReference(reference);
        }

        @Override
        @Transactional
        public int deleteByPaiementReference(String reference){
        return paiementDetailDao.deleteByPaiementReference(reference);
        }

        @Override
        public List<PaiementDetail> findByPaiementId(Long id){
        return paiementDetailDao.findByPaiementId(id);
        }

        @Override
        @Transactional
        public int deleteByPaiementId(Long id){
        return paiementDetailDao.deleteByPaiementId(id);
        }

    @Override
    public PaiementDetail findByReference(String reference){
    if( reference==null) return null;
    return paiementDetailDao.findByReference(reference);
    }

    @Override
    @Transactional
    public int deleteByReference(String  reference) {
    return paiementDetailDao.deleteByReference(reference);
    }
    @Override
    public PaiementDetail findByIdOrReference(PaiementDetail paiementDetail){
        PaiementDetail resultat=null;
        if(paiementDetail != null){
            if(StringUtil.isNotEmpty(paiementDetail.getId())){
            resultat= paiementDetailDao.getOne(paiementDetail.getId());
            }else if(StringUtil.isNotEmpty(paiementDetail.getReference())) {
            resultat= paiementDetailDao.findByReference(paiementDetail.getReference());
            }
        }
    return resultat;
    }

@Override
public PaiementDetail findById(Long id){
if(id==null) return null;
return paiementDetailDao.getOne(id);
}

@Override
public PaiementDetail findByIdWithAssociatedList(Long id){
return findById(id);
}


@Transactional
public int deleteById(Long id){
int res=0;
if(paiementDetailDao.findById(id).isPresent())  {
paiementDetailDao.deleteById(id);
res = 1;
}
return res;
}


@Override
public PaiementDetail update(PaiementDetail paiementDetail){
PaiementDetail foundedPaiementDetail = findById(paiementDetail.getId());
if(foundedPaiementDetail==null) return null;
else{
return  paiementDetailDao.save(paiementDetail);
}
}

@Override
public PaiementDetail save (PaiementDetail paiementDetail){

PaiementDetail result =null;
    PaiementDetail foundedPaiementDetail = findByReference(paiementDetail.getReference());
   if(foundedPaiementDetail == null){


    findClient(paiementDetail);
    findPaiement(paiementDetail);

PaiementDetail savedPaiementDetail = paiementDetailDao.save(paiementDetail);

result = savedPaiementDetail;
   }

return result;
}

@Override
public List<PaiementDetail> save(List<PaiementDetail> paiementDetails){
List<PaiementDetail> list = new ArrayList<>();
for(PaiementDetail paiementDetail: paiementDetails){
list.add(save(paiementDetail));
}
return list;
}



@Override
@Transactional
public int delete(PaiementDetail paiementDetail){
    if(paiementDetail.getReference()==null) return -1;

    PaiementDetail foundedPaiementDetail = findByReference(paiementDetail.getReference());
    if(foundedPaiementDetail==null) return -1;
paiementDetailDao.delete(foundedPaiementDetail);
return 1;
}


public List<PaiementDetail> findByCriteria(PaiementDetailVo paiementDetailVo){

String query = "SELECT o FROM PaiementDetail o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",paiementDetailVo.getId());
            query += SearchUtil.addConstraint( "o", "reference","LIKE",paiementDetailVo.getReference());
            query += SearchUtil.addConstraint( "o", "pourcentage","=",paiementDetailVo.getPourcentage());
            query += SearchUtil.addConstraintMinMax("o","pourcentage",paiementDetailVo.getPourcentageMin(),paiementDetailVo.getPourcentageMax());
    if(paiementDetailVo.getClientVo()!=null){
        query += SearchUtil.addConstraint( "o", "client.id","=",paiementDetailVo.getClientVo().getId());
            query += SearchUtil.addConstraint( "o", "client.reference","LIKE",paiementDetailVo.getClientVo().getReference());
    }

    if(paiementDetailVo.getPaiementVo()!=null){
        query += SearchUtil.addConstraint( "o", "paiement.id","=",paiementDetailVo.getPaiementVo().getId());
            query += SearchUtil.addConstraint( "o", "paiement.reference","LIKE",paiementDetailVo.getPaiementVo().getReference());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findClient(PaiementDetail paiementDetail){
        Client loadedClient =clientService.findByIdOrReference(paiementDetail.getClient());

    if(loadedClient==null ) {
        return;
    }
    paiementDetail.setClient(loadedClient);
    }
    private void findPaiement(PaiementDetail paiementDetail){
        Paiement loadedPaiement =paiementService.findByIdOrReference(paiementDetail.getPaiement());

    if(loadedPaiement==null ) {
        return;
    }
    paiementDetail.setPaiement(loadedPaiement);
    }

@Override
@Transactional
public void delete(List<PaiementDetail> paiementDetails){
        if(ListUtil.isNotEmpty(paiementDetails)){
        paiementDetails.forEach(e->paiementDetailDao.delete(e));
        }
}
@Override
public void update(List<PaiementDetail> paiementDetails){
if(ListUtil.isNotEmpty(paiementDetails)){
paiementDetails.forEach(e->paiementDetailDao.save(e));
}
}



}
