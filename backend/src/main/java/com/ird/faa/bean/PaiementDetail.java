package com.ird.faa.bean;

import java.util.Objects;



import javax.persistence.*;



@Entity
@Table(name = "paiement_detail")
public class PaiementDetail   {

@Id
    @SequenceGenerator(name="paiement_detail_seq",sequenceName="paiement_detail_seq",
    allocationSize=1, initialValue = 10000)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator="paiement_detail_seq")
private Long id;

            @Column(length = 500)
            private String reference;
            private Long pourcentage ;

    @ManyToOne
    private Client client ;
    @ManyToOne
    private Paiement paiement ;


public PaiementDetail(){
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
            public Client getClient(){
            return this.client;
            }
            public void setClient(Client client){
            this.client = client;
            }
            public Long getPourcentage(){
            return this.pourcentage;
            }
            public void setPourcentage(Long pourcentage){
            this.pourcentage = pourcentage;
            }
            public Paiement getPaiement(){
            return this.paiement;
            }
            public void setPaiement(Paiement paiement){
            this.paiement = paiement;
            }

        @Override
        public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PaiementDetail paiementDetail = (PaiementDetail) o;
        return id != null && id.equals(paiementDetail.id);
        }

        @Override
        public int hashCode() {
        return Objects.hash(id);
        }

}

