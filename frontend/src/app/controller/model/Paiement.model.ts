import {PaiementTagVo} from './PaiementTag.model';
import {PaiementDetailVo} from './PaiementDetail.model';
import {CommandeVo} from './Commande.model';



export class PaiementVo {

    public id: number;

    public reference: string;
    public datePaiement: Date;
     public montant: number;
                public datePaiementMax: string ;
                public datePaiementMin: string ;
                public montantMax: string ;
                public montantMin: string ;
      public commandeVo: CommandeVo ;
      public paiementDetailsVo: Array<PaiementDetailVo>;
      public paiementTagsVo: Array<PaiementTagVo>;

}
