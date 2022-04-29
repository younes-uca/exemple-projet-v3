package  com.ird.faa.ws.rest.provided.vo;


public class PaiementTagVo {

    private String id ;



        private PaiementVo paiementVo ;
        private TagVo tagVo ;


    public PaiementTagVo(){
    super();
    }

        public String getId(){
        return this.id;
        }

        public void setId(String id){
        this.id = id;
        }



        public PaiementVo getPaiementVo(){
        return this.paiementVo;
        }

        public void setPaiementVo(PaiementVo paiementVo){
        this.paiementVo = paiementVo;
        }
        public TagVo getTagVo(){
        return this.tagVo;
        }

        public void setTagVo(TagVo tagVo){
        this.tagVo = tagVo;
        }


            }
