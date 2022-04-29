package com.ird.faa.bean;

import java.util.Objects;



import javax.persistence.*;



@Entity
@Table(name = "paiement_tag")
public class PaiementTag   {

@Id
    @SequenceGenerator(name="paiement_tag_seq",sequenceName="paiement_tag_seq",
    allocationSize=1, initialValue = 10000)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator="paiement_tag_seq")
private Long id;


    @ManyToOne
    private Paiement paiement ;
    @ManyToOne
    private Tag tag ;


public PaiementTag(){
super();
}


            public Long getId(){
            return this.id;
            }
            public void setId(Long id){
            this.id = id;
            }
            public Paiement getPaiement(){
            return this.paiement;
            }
            public void setPaiement(Paiement paiement){
            this.paiement = paiement;
            }
            public Tag getTag(){
            return this.tag;
            }
            public void setTag(Tag tag){
            this.tag = tag;
            }

        @Override
        public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PaiementTag paiementTag = (PaiementTag) o;
        return id != null && id.equals(paiementTag.id);
        }

        @Override
        public int hashCode() {
        return Objects.hash(id);
        }

}

