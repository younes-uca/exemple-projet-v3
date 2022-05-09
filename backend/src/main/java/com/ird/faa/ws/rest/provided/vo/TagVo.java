package  com.ird.faa.ws.rest.provided.vo;

    import java.util.Date;
    import javax.persistence.Temporal;
    import javax.persistence.TemporalType;
    import com.fasterxml.jackson.annotation.JsonFormat;

public class TagVo {

    private String id ;
    private String reference ;
    private String libelle ;
    private Boolean archive ;
    private String dateArchivage ;
    private String dateCreation ;


    private String username ;


            private String dateArchivageMax ;
            private String dateArchivageMin ;
            private String dateCreationMax ;
            private String dateCreationMin ;



    public TagVo(){
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
        public String getLibelle(){
        return this.libelle;
        }

        public void setLibelle(String libelle){
        this.libelle = libelle;
        }
        public Boolean getArchive(){
        return this.archive;
        }

        public void setArchive(Boolean archive){
        this.archive = archive;
        }
        public String getDateArchivage(){
        return this.dateArchivage;
        }

        public void setDateArchivage(String dateArchivage){
        this.dateArchivage = dateArchivage;
        }
        public String getDateCreation(){
        return this.dateCreation;
        }

        public void setDateCreation(String dateCreation){
        this.dateCreation = dateCreation;
        }


            public String getDateArchivageMax(){
            return this.dateArchivageMax;
            }

            public String getDateArchivageMin(){
            return this.dateArchivageMin;
            }

            public void setDateArchivageMax(String dateArchivageMax){
            this.dateArchivageMax = dateArchivageMax;
            }

            public void setDateArchivageMin(String dateArchivageMin){
            this.dateArchivageMin = dateArchivageMin;
            }

            public String getDateCreationMax(){
            return this.dateCreationMax;
            }

            public String getDateCreationMin(){
            return this.dateCreationMin;
            }

            public void setDateCreationMax(String dateCreationMax){
            this.dateCreationMax = dateCreationMax;
            }

            public void setDateCreationMin(String dateCreationMin){
            this.dateCreationMin = dateCreationMin;
            }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
