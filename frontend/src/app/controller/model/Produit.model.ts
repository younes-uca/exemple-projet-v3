import {CategorieProduitVo} from './CategorieProduit.model';



export class ProduitVo {

    public id: number;

    public reference: string;
    public libelle: string;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
      public categorieProduitVo: CategorieProduitVo ;

}
