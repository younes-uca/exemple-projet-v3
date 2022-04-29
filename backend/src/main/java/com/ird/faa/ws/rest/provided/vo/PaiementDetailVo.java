package  com.ird.faa.ws.rest.provided.vo;


public class PaiementDetailVo {

    private String id ;
    private String reference ;
    private String pourcentage ;


            private String pourcentageMax ;
            private String pourcentageMin ;

        private ClientVo clientVo ;
        private PaiementVo paiementVo ;


    public PaiementDetailVo(){
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
        public String getPourcentage(){
        return this.pourcentage;
        }

        public void setPourcentage(String pourcentage){
        this.pourcentage = pourcentage;
        }


            public String getPourcentageMax(){
            return this.pourcentageMax;
            }

            public String getPourcentageMin(){
            return this.pourcentageMin;
            }

            public void setPourcentageMax(String pourcentageMax){
            this.pourcentageMax = pourcentageMax;
            }

            public void setPourcentageMin(String pourcentageMin){
            this.pourcentageMin = pourcentageMin;
            }


        public ClientVo getClientVo(){
        return this.clientVo;
        }

        public void setClientVo(ClientVo clientVo){
        this.clientVo = clientVo;
        }
        public PaiementVo getPaiementVo(){
        return this.paiementVo;
        }

        public void setPaiementVo(PaiementVo paiementVo){
        this.paiementVo = paiementVo;
        }


            }
