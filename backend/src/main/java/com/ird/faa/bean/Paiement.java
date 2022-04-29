package com.ird.faa.bean;

import java.util.Objects;
import java.util.List;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;


    import java.math.BigDecimal;
import javax.persistence.*;



@Entity
@Table(name = "paiement")
public class Paiement   {

@Id
    @SequenceGenerator(name="paiement_seq",sequenceName="paiement_seq",
    allocationSize=1, initialValue = 10000)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator="paiement_seq")
private Long id;

            @Column(length = 500)
            private String reference;
            @JsonFormat(pattern="yyyy-MM-dd")
            @Temporal(TemporalType.DATE)
            private Date datePaiement ;
            private BigDecimal montant ;

    @ManyToOne
    private Commande commande ;

                @OneToMany(mappedBy = "paiement")
            private List<PaiementDetail> paiementDetails ;
                @OneToMany(mappedBy = "paiement")
            private List<PaiementTag> paiementTags ;

public Paiement(){
super();
}


            public Long getId(){
            return this.id;
            }
            public void setId(Long id){
            this.id = id;
            }
            public String getReference(){
            return this.reference;
            }
            public void setReference(String reference){
            this.reference = reference;
            }
            public Date getDatePaiement(){
            return this.datePaiement;
            }
            public void setDatePaiement(Date datePaiement){
            this.datePaiement = datePaiement;
            }
            public BigDecimal getMontant(){
            return this.montant;
            }
            public void setMontant(BigDecimal montant){
            this.montant = montant;
            }
            public Commande getCommande(){
            return this.commande;
            }
            public void setCommande(Commande commande){
            this.commande = commande;
            }
            public List<PaiementDetail> getPaiementDetails(){
            return this.paiementDetails;
            }
            public void setPaiementDetails(List<PaiementDetail> paiementDetails){
            this.paiementDetails = paiementDetails;
            }
            public List<PaiementTag> getPaiementTags(){
            return this.paiementTags;
            }
            public void setPaiementTags(List<PaiementTag> paiementTags){
            this.paiementTags = paiementTags;
            }

        @Override
        public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Paiement paiement = (Paiement) o;
        return id != null && id.equals(paiement.id);
        }

        @Override
        public int hashCode() {
        return Objects.hash(id);
        }

}

