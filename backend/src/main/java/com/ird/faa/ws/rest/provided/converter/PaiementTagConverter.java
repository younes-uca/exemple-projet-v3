package  com.ird.faa.ws.rest.provided.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.ird.faa.service.util.*;


import com.ird.faa.bean.PaiementTag;
import com.ird.faa.ws.rest.provided.vo.PaiementTagVo;

@Component
public class PaiementTagConverter extends AbstractConverter<PaiementTag,PaiementTagVo>{

        @Autowired
        private PaiementConverter paiementConverter ;
        @Autowired
        private TagConverter tagConverter ;
    private Boolean paiement;
    private Boolean tag;

public  PaiementTagConverter(){
init(true);
}

@Override
public PaiementTag toItem(PaiementTagVo vo) {
if (vo == null) {
return null;
} else {
PaiementTag item = new PaiementTag();
        if(StringUtil.isNotEmpty(vo.getId()))
        item.setId(NumberUtil.toLong(vo.getId()));
    if(vo.getPaiementVo()!=null && this.paiement)
        item.setPaiement(paiementConverter.toItem(vo.getPaiementVo())) ;
    if(vo.getTagVo()!=null && this.tag)
        item.setTag(tagConverter.toItem(vo.getTagVo())) ;


return item;
}
}

@Override
public PaiementTagVo toVo(PaiementTag item) {
if (item == null) {
return null;
} else {
PaiementTagVo vo = new PaiementTagVo();
        if(item.getId()!=null)
        vo.setId(NumberUtil.toString(item.getId()));

    if(item.getPaiement()!=null && this.paiement) {
        vo.setPaiementVo(paiementConverter.toVo(item.getPaiement())) ;
    }
    if(item.getTag()!=null && this.tag) {
        vo.setTagVo(tagConverter.toVo(item.getTag())) ;
    }

return vo;
}
}

public void init(Boolean value) {
    paiement = value;
    tag = value;
}


        public PaiementConverter getPaiementConverter(){
        return this.paiementConverter;
        }
        public void setPaiementConverter(PaiementConverter paiementConverter ){
        this.paiementConverter = paiementConverter;
        }
        public TagConverter getTagConverter(){
        return this.tagConverter;
        }
        public void setTagConverter(TagConverter tagConverter ){
        this.tagConverter = tagConverter;
        }

    public boolean  isPaiement(){
    return this.paiement;
    }
    public void  setPaiement(boolean paiement){
    this.paiement = paiement;
    }
    public boolean  isTag(){
    return this.tag;
    }
    public void  setTag(boolean tag){
    this.tag = tag;
    }






}
