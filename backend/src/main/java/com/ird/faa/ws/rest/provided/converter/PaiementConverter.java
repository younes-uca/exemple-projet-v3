package  com.ird.faa.ws.rest.provided.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.ird.faa.service.util.*;


import com.ird.faa.bean.Paiement;
import com.ird.faa.ws.rest.provided.vo.PaiementVo;

@Component
public class PaiementConverter extends AbstractConverter<Paiement,PaiementVo>{

        @Autowired
        private PaiementTagConverter paiementTagConverter ;
        @Autowired
        private PaiementDetailConverter paiementDetailConverter ;
        @Autowired
        private CommandeConverter commandeConverter ;
    private Boolean commande;
        private Boolean paiementDetails;
        private Boolean paiementTags;

public  PaiementConverter(){
init(true);
}

@Override
public Paiement toItem(PaiementVo vo) {
if (vo == null) {
return null;
} else {
Paiement item = new Paiement();
        if(StringUtil.isNotEmpty(vo.getId()))
        item.setId(NumberUtil.toLong(vo.getId()));
        if(StringUtil.isNotEmpty(vo.getReference()))
        item.setReference(vo.getReference());
        if(StringUtil.isNotEmpty(vo.getDatePaiement()))
        item.setDatePaiement(DateUtil.parse(vo.getDatePaiement()));
        if(StringUtil.isNotEmpty(vo.getMontant()))
        item.setMontant(NumberUtil.toBigDecimal(vo.getMontant()));
    if(vo.getCommandeVo()!=null && this.commande)
        item.setCommande(commandeConverter.toItem(vo.getCommandeVo())) ;

    if(ListUtil.isNotEmpty(vo.getPaiementDetailsVo()) && this.paiementDetails)
        item.setPaiementDetails(paiementDetailConverter.toItem(vo.getPaiementDetailsVo()));
    if(ListUtil.isNotEmpty(vo.getPaiementTagsVo()) && this.paiementTags)
        item.setPaiementTags(paiementTagConverter.toItem(vo.getPaiementTagsVo()));

return item;
}
}

@Override
public PaiementVo toVo(Paiement item) {
if (item == null) {
return null;
} else {
PaiementVo vo = new PaiementVo();
        if(item.getId()!=null)
        vo.setId(NumberUtil.toString(item.getId()));

        if(StringUtil.isNotEmpty(item.getReference()))
        vo.setReference(item.getReference());

        if(item.getDatePaiement()!=null)
        vo.setDatePaiement(DateUtil.formateDate(item.getDatePaiement()));
        if(item.getMontant()!=null)
        vo.setMontant(NumberUtil.toString(item.getMontant()));

    if(item.getCommande()!=null && this.commande) {
        vo.setCommandeVo(commandeConverter.toVo(item.getCommande())) ;
    }
        if(ListUtil.isNotEmpty(item.getPaiementDetails()) && this.paiementDetails){
        paiementDetailConverter.init(true);
        paiementDetailConverter.setPaiement(false);
        vo.setPaiementDetailsVo(paiementDetailConverter.toVo(item.getPaiementDetails()));
        paiementDetailConverter.setPaiement(true);
        }
        if(ListUtil.isNotEmpty(item.getPaiementTags()) && this.paiementTags){
        paiementTagConverter.init(true);
        paiementTagConverter.setPaiement(false);
        vo.setPaiementTagsVo(paiementTagConverter.toVo(item.getPaiementTags()));
        paiementTagConverter.setPaiement(true);
        }

return vo;
}
}

public void init(Boolean value) {
    commande = value;
        paiementDetails = value;
        paiementTags = value;
}


        public PaiementTagConverter getPaiementTagConverter(){
        return this.paiementTagConverter;
        }
        public void setPaiementTagConverter(PaiementTagConverter paiementTagConverter ){
        this.paiementTagConverter = paiementTagConverter;
        }
        public PaiementDetailConverter getPaiementDetailConverter(){
        return this.paiementDetailConverter;
        }
        public void setPaiementDetailConverter(PaiementDetailConverter paiementDetailConverter ){
        this.paiementDetailConverter = paiementDetailConverter;
        }
        public CommandeConverter getCommandeConverter(){
        return this.commandeConverter;
        }
        public void setCommandeConverter(CommandeConverter commandeConverter ){
        this.commandeConverter = commandeConverter;
        }

    public boolean  isCommande(){
    return this.commande;
    }
    public void  setCommande(boolean commande){
    this.commande = commande;
    }











        public Boolean  isPaiementDetails(){
        return this.paiementDetails ;
        }
        public void  setPaiementDetails(Boolean paiementDetails ){
        this.paiementDetails  = paiementDetails ;
        }



        public Boolean  isPaiementTags(){
        return this.paiementTags ;
        }
        public void  setPaiementTags(Boolean paiementTags ){
        this.paiementTags  = paiementTags ;
        }


}
