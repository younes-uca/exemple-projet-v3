package  com.ird.faa.ws.rest.provided.vo;

    import java.util.List;
    import java.util.Date;
    import javax.persistence.Temporal;
    import javax.persistence.TemporalType;
    import com.fasterxml.jackson.annotation.JsonFormat;
    import java.math.BigDecimal;

public class PaiementVo {

    private String id ;
    private String reference ;
    private String datePaiement ;
    private String montant ;


            private String datePaiementMax ;
            private String datePaiementMin ;
            private String montantMax ;
            private String montantMin ;

        private CommandeVo commandeVo ;

    private List<PaiementDetailVo> paiementDetailsVo ;
    private List<PaiementTagVo> paiementTagsVo ;

    public PaiementVo(){
    super();
    }

        public String getId(){
        return this.id;
        }

        public void setId(String id){
        this.id = id;
        }
        public String getReference(){
        return this.reference;
        }

        public void setReference(String reference){
        this.reference = reference;
        }
        public String getDatePaiement(){
        return this.datePaiement;
        }

        public void setDatePaiement(String datePaiement){
        this.datePaiement = datePaiement;
        }
        public String getMontant(){
        return this.montant;
        }

        public void setMontant(String montant){
        this.montant = montant;
        }


            public String getDatePaiementMax(){
            return this.datePaiementMax;
            }

            public String getDatePaiementMin(){
            return this.datePaiementMin;
            }

            public void setDatePaiementMax(String datePaiementMax){
            this.datePaiementMax = datePaiementMax;
            }

            public void setDatePaiementMin(String datePaiementMin){
            this.datePaiementMin = datePaiementMin;
            }

            public String getMontantMax(){
            return this.montantMax;
            }

            public String getMontantMin(){
            return this.montantMin;
            }

            public void setMontantMax(String montantMax){
            this.montantMax = montantMax;
            }

            public void setMontantMin(String montantMin){
            this.montantMin = montantMin;
            }


        public CommandeVo getCommandeVo(){
        return this.commandeVo;
        }

        public void setCommandeVo(CommandeVo commandeVo){
        this.commandeVo = commandeVo;
        }


        public List<PaiementDetailVo> getPaiementDetailsVo(){
        return this.paiementDetailsVo;
        }

        public void setPaiementDetailsVo(List<PaiementDetailVo> paiementDetailsVo){
            this.paiementDetailsVo = paiementDetailsVo;
            }

        public List<PaiementTagVo> getPaiementTagsVo(){
        return this.paiementTagsVo;
        }

        public void setPaiementTagsVo(List<PaiementTagVo> paiementTagsVo){
            this.paiementTagsVo = paiementTagsVo;
            }

            }
