package com.ird.faa.service.chercheur.impl;

import java.util.List;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.PaiementTag;
import com.ird.faa.bean.Paiement;
import com.ird.faa.bean.Tag;
import com.ird.faa.dao.PaiementTagDao;
import com.ird.faa.service.chercheur.facade.PaiementTagChercheurService;
import com.ird.faa.service.chercheur.facade.PaiementChercheurService;
import com.ird.faa.service.chercheur.facade.TagChercheurService;

import com.ird.faa.ws.rest.provided.vo.PaiementTagVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class PaiementTagChercheurServiceImpl extends AbstractServiceImpl<PaiementTag> implements PaiementTagChercheurService {

@Autowired
private PaiementTagDao paiementTagDao;

        @Autowired
        private PaiementChercheurService paiementService ;
        @Autowired
        private TagChercheurService tagService ;


@Autowired
private EntityManager entityManager;


@Override
public List<PaiementTag> findAll(){
        return paiementTagDao.findAll();
}

        @Override
        public List<PaiementTag> findByPaiementReference(String reference){
        return paiementTagDao.findByPaiementReference(reference);
        }

        @Override
        @Transactional
        public int deleteByPaiementReference(String reference){
        return paiementTagDao.deleteByPaiementReference(reference);
        }

        @Override
        public List<PaiementTag> findByPaiementId(Long id){
        return paiementTagDao.findByPaiementId(id);
        }

        @Override
        @Transactional
        public int deleteByPaiementId(Long id){
        return paiementTagDao.deleteByPaiementId(id);
        }


        @Override
        public List<PaiementTag> findByTagReference(String reference){
        return paiementTagDao.findByTagReference(reference);
        }

        @Override
        @Transactional
        public int deleteByTagReference(String reference){
        return paiementTagDao.deleteByTagReference(reference);
        }

        @Override
        public List<PaiementTag> findByTagId(Long id){
        return paiementTagDao.findByTagId(id);
        }

        @Override
        @Transactional
        public int deleteByTagId(Long id){
        return paiementTagDao.deleteByTagId(id);
        }


@Override
public PaiementTag findById(Long id){
if(id==null) return null;
return paiementTagDao.getOne(id);
}

@Override
public PaiementTag findByIdWithAssociatedList(Long id){
return findById(id);
}


@Transactional
public int deleteById(Long id){
int res=0;
if(paiementTagDao.findById(id).isPresent())  {
paiementTagDao.deleteById(id);
res = 1;
}
return res;
}


@Override
public PaiementTag update(PaiementTag paiementTag){
PaiementTag foundedPaiementTag = findById(paiementTag.getId());
if(foundedPaiementTag==null) return null;
else{
return  paiementTagDao.save(paiementTag);
}
}

@Override
public PaiementTag save (PaiementTag paiementTag){



    findPaiement(paiementTag);
    findTag(paiementTag);

return paiementTagDao.save(paiementTag);


}

@Override
public List<PaiementTag> save(List<PaiementTag> paiementTags){
List<PaiementTag> list = new ArrayList<>();
for(PaiementTag paiementTag: paiementTags){
list.add(save(paiementTag));
}
return list;
}



@Override
@Transactional
public int delete(PaiementTag paiementTag){
    if(paiementTag.getId()==null) return -1;
    PaiementTag foundedPaiementTag = findById(paiementTag.getId());
    if(foundedPaiementTag==null) return -1;
paiementTagDao.delete(foundedPaiementTag);
return 1;
}


public List<PaiementTag> findByCriteria(PaiementTagVo paiementTagVo){

String query = "SELECT o FROM PaiementTag o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",paiementTagVo.getId());
    if(paiementTagVo.getPaiementVo()!=null){
        query += SearchUtil.addConstraint( "o", "paiement.id","=",paiementTagVo.getPaiementVo().getId());
            query += SearchUtil.addConstraint( "o", "paiement.reference","LIKE",paiementTagVo.getPaiementVo().getReference());
    }

    if(paiementTagVo.getTagVo()!=null){
        query += SearchUtil.addConstraint( "o", "tag.id","=",paiementTagVo.getTagVo().getId());
            query += SearchUtil.addConstraint( "o", "tag.reference","LIKE",paiementTagVo.getTagVo().getReference());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findPaiement(PaiementTag paiementTag){
        Paiement loadedPaiement =paiementService.findByIdOrReference(paiementTag.getPaiement());

    if(loadedPaiement==null ) {
        return;
    }
    paiementTag.setPaiement(loadedPaiement);
    }
    private void findTag(PaiementTag paiementTag){
        Tag loadedTag =tagService.findByIdOrReference(paiementTag.getTag());

    if(loadedTag==null ) {
        return;
    }
    paiementTag.setTag(loadedTag);
    }

@Override
@Transactional
public void delete(List<PaiementTag> paiementTags){
        if(ListUtil.isNotEmpty(paiementTags)){
        paiementTags.forEach(e->paiementTagDao.delete(e));
        }
}
@Override
public void update(List<PaiementTag> paiementTags){
if(ListUtil.isNotEmpty(paiementTags)){
paiementTags.forEach(e->paiementTagDao.save(e));
}
}



}
