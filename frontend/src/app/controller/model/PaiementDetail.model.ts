import {PaiementVo} from './Paiement.model';
import {ClientVo} from './Client.model';



export class PaiementDetailVo {

    public id: number;

    public reference: string;
     public pourcentage: number;
                public pourcentageMax: string ;
                public pourcentageMin: string ;
      public clientVo: ClientVo ;
      public paiementVo: PaiementVo ;

}
