import {CommandeVo} from './Commande.model';
import {ProduitVo} from './Produit.model';



export class CommandeItemVo {

    public id: number;

     public prix: number;
     public quantite: number;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
                public prixMax: string ;
                public prixMin: string ;
                public quantiteMax: string ;
                public quantiteMin: string ;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
      public produitVo: ProduitVo ;
      public commandeVo: CommandeVo ;

}
