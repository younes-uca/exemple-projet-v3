package  com.ird.faa.ws.rest.provided.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.ird.faa.service.util.*;


import com.ird.faa.bean.PaiementDetail;
import com.ird.faa.ws.rest.provided.vo.PaiementDetailVo;

@Component
public class PaiementDetailConverter extends AbstractConverter<PaiementDetail,PaiementDetailVo>{

        @Autowired
        private PaiementConverter paiementConverter ;
        @Autowired
        private ClientConverter clientConverter ;
    private Boolean client;
    private Boolean paiement;

public  PaiementDetailConverter(){
init(true);
}

@Override
public PaiementDetail toItem(PaiementDetailVo vo) {
if (vo == null) {
return null;
} else {
PaiementDetail item = new PaiementDetail();
        if(StringUtil.isNotEmpty(vo.getId()))
        item.setId(NumberUtil.toLong(vo.getId()));
        if(StringUtil.isNotEmpty(vo.getReference()))
        item.setReference(vo.getReference());
        if(StringUtil.isNotEmpty(vo.getPourcentage()))
        item.setPourcentage(NumberUtil.toLong(vo.getPourcentage()));
    if(vo.getClientVo()!=null && this.client)
        item.setClient(clientConverter.toItem(vo.getClientVo())) ;
    if(vo.getPaiementVo()!=null && this.paiement)
        item.setPaiement(paiementConverter.toItem(vo.getPaiementVo())) ;


return item;
}
}

@Override
public PaiementDetailVo toVo(PaiementDetail item) {
if (item == null) {
return null;
} else {
PaiementDetailVo vo = new PaiementDetailVo();
        if(item.getId()!=null)
        vo.setId(NumberUtil.toString(item.getId()));

        if(StringUtil.isNotEmpty(item.getReference()))
        vo.setReference(item.getReference());

        if(item.getPourcentage()!=null)
        vo.setPourcentage(NumberUtil.toString(item.getPourcentage()));

    if(item.getClient()!=null && this.client) {
        vo.setClientVo(clientConverter.toVo(item.getClient())) ;
    }
    if(item.getPaiement()!=null && this.paiement) {
        vo.setPaiementVo(paiementConverter.toVo(item.getPaiement())) ;
    }

return vo;
}
}

public void init(Boolean value) {
    client = value;
    paiement = value;
}


        public PaiementConverter getPaiementConverter(){
        return this.paiementConverter;
        }
        public void setPaiementConverter(PaiementConverter paiementConverter ){
        this.paiementConverter = paiementConverter;
        }
        public ClientConverter getClientConverter(){
        return this.clientConverter;
        }
        public void setClientConverter(ClientConverter clientConverter ){
        this.clientConverter = clientConverter;
        }

    public boolean  isClient(){
    return this.client;
    }
    public void  setClient(boolean client){
    this.client = client;
    }
    public boolean  isPaiement(){
    return this.paiement;
    }
    public void  setPaiement(boolean paiement){
    this.paiement = paiement;
    }










}
