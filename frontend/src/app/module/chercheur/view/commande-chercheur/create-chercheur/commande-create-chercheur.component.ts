import {Component, OnInit, Input} from '@angular/core';
import {CommandeService} from '../../../../../controller/service/Commande.service';
import {CommandeVo} from '../../../../../controller/model/Commande.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


import {ProduitVo} from '../../../../../controller/model/Produit.model';
import {ProduitService} from '../../../../../controller/service/Produit.service';
import {TagVo} from '../../../../../controller/model/Tag.model';
import {TagService} from '../../../../../controller/service/Tag.service';
import {CommandeTagVo} from '../../../../../controller/model/CommandeTag.model';
import {CommandeTagService} from '../../../../../controller/service/CommandeTag.service';
import {ClientVo} from '../../../../../controller/model/Client.model';
import {ClientService} from '../../../../../controller/service/Client.service';
import {PaiementTagVo} from '../../../../../controller/model/PaiementTag.model';
import {PaiementTagService} from '../../../../../controller/service/PaiementTag.service';
import {CommandeItemVo} from '../../../../../controller/model/CommandeItem.model';
import {CommandeItemService} from '../../../../../controller/service/CommandeItem.service';
import {PaiementDetailVo} from '../../../../../controller/model/PaiementDetail.model';
import {PaiementDetailService} from '../../../../../controller/service/PaiementDetail.service';
import {PaiementVo} from '../../../../../controller/model/Paiement.model';
import {PaiementService} from '../../../../../controller/service/Paiement.service';
@Component({
  selector: 'app-commande-create-chercheur',
  templateUrl: './commande-create-chercheur.component.html',
  styleUrls: ['./commande-create-chercheur.component.css']
})
export class CommandeCreateChercheurComponent implements OnInit {

        selectedPaiements: PaiementVo = new PaiementVo();
        selectedCommandeItems: CommandeItemVo = new CommandeItemVo();
        selectedCommandeTags: CommandeTagVo = new CommandeTagVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validCommandeReference = true;
   _validCommandeDateCommande = true;
   _validCommandeClient = true;
   _validCommandeCommandeItems = true;
   _validCommandeCommandeTags = true;

    _validClientReference = true;
    _validClientCin = true;
    _validPaiementReference = true;
    _validPaiementDatePaiement = true;
    _validPaiementMontant = true;
    _validPaiementPaiementTags = true;
    _validCommandeItemPrix = true;
    _validCommandeItemQuantite = true;

       private _paiementTagsVo: Array<PaiementTagVo> = [];

private _commandeTagsVo: Array<CommandeTagVo> = [];

constructor(private datePipe: DatePipe, private commandeService: CommandeService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private clientService :ClientService
,       private produitService :ProduitService
,       private tagService :TagService
,       private commandeItemService :CommandeItemService
,       private commandeTagService :CommandeTagService
,       private paiementService :PaiementService
) {

}


// methods
ngOnInit(): void {



                this.tagService.findAll().subscribe(data => this.preparePaiementTags(data));


                this.selectedCommandeItems.produitVo = new ProduitVo();
                this.produitService.findAll().subscribe((data) => this.produits = data);


            this.tagService.findAll().subscribe(data => this.prepareCommandeTags(data));

                this.selectedCommandeTags.tagVo = new TagVo();
                this.tagService.findAll().subscribe((data) => this.tags = data);


    this.selectedClient = new ClientVo();
    this.clientService.findAll().subscribe((data) => this.clients = data);
}

   preparePaiementTags(tags: Array<TagVo>): void{
        if( tags != null){
        tags.forEach(e => {
        const paiementTag = new PaiementTagVo();
        paiementTag.tagVo = e;
        this.paiementTagsVo.push(paiementTag);
        });
        }
   }
         prepareCommandeTags(tags: Array<TagVo>): void{
        if( tags != null){
        tags.forEach(e => {
        const commandeTag = new CommandeTagVo();
        commandeTag.tagVo = e;
        this.commandeTagsVo.push(commandeTag);
        });
        }
    }

        addPaiements() {
        if( this.selectedCommande.paiementsVo == null ){
            this.selectedCommande.paiementsVo = new Array<PaiementVo>();
        }
        this.selectedCommande.paiementsVo.push(this.selectedPaiements);
        this.selectedPaiements = new PaiementVo();
        }

        deletePaiements(p: PaiementVo) {
        this.selectedCommande.paiementsVo.forEach((element, index) => {
            if (element === p) { this.selectedCommande.paiementsVo.splice(index, 1); }
        });
    }
        addCommandeItems() {
        if( this.selectedCommande.commandeItemsVo == null ){
            this.selectedCommande.commandeItemsVo = new Array<CommandeItemVo>();
        }
        this.selectedCommande.commandeItemsVo.push(this.selectedCommandeItems);
        this.selectedCommandeItems = new CommandeItemVo();
        }

        deleteCommandeItems(p: CommandeItemVo) {
        this.selectedCommande.commandeItemsVo.forEach((element, index) => {
            if (element === p) { this.selectedCommande.commandeItemsVo.splice(index, 1); }
        });
    }

public save(){
  this.submitted = true;
  this.validateForm();
  if (this.errorMessages.length === 0) {
        this.saveWithShowOption(false);
  } else {
        this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
  }
}

public saveWithShowOption(showList: boolean){
     this.commandeService.save().subscribe(commande=>{
       this.commandes.push({...commande});
       this.createCommandeDialog = false;
       this.submitted = false;
       this.selectedCommande = new CommandeVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateCommandeReference();
this.validateCommandeDateCommande();
this.validateCommandeClient();
this.validateCommandeCommandeItems();
this.validateCommandeCommandeTags();

    this.validatePaiementReference();
    this.validatePaiementDatePaiement();
    this.validatePaiementMontant();
    this.validatePaiementPaiementTags();
    this.validateCommandeItemPrix();
    this.validateCommandeItemQuantite();
    }

private validateCommandeReference(){
        if (this.selectedCommande.reference == null) {
            this.errorMessages.push('Reference non valide');
            this.validCommandeReference = false;
        } else {
            this.validCommandeReference = true;
        }
    }
private validateCommandeDateCommande(){
        if (this.selectedCommande.dateCommande == null) {
            this.errorMessages.push('DateCommande non valide');
            this.validCommandeDateCommande = false;
        } else {
            this.validCommandeDateCommande = true;
        }
    }
private validateCommandeClient(){
        if (this.selectedCommande.clientVo == null) {
            this.errorMessages.push('Client non valide');
            this.validCommandeClient = false;
        } else {
            this.validCommandeClient = true;
        }
    }
private validateCommandeCommandeItems(){
        if (this.selectedCommande.commandeItemsVo == null || this.selectedCommande.commandeItemsVo.length === 0) {
            this.errorMessages.push('CommandeItems non valide');
            this.validCommandeCommandeItems = false;
        } else {
            this.validCommandeCommandeItems = true;
        }
    }
private validateCommandeCommandeTags(){
        if (this.selectedCommande.commandeTagsVo == null || this.selectedCommande.commandeTagsVo.length === 0) {
            this.errorMessages.push('CommandeTags non valide');
            this.validCommandeCommandeTags = false;
        } else {
            this.validCommandeCommandeTags = true;
        }
    }








            private validatePaiementReference(){
            if (this.selectedPaiements.reference == null) {
            this.errorMessages.push('Reference non valide');
                    this.validPaiementReference = false;
            } else {
            this.validPaiementReference = true;
            }
            }
            private validatePaiementDatePaiement(){
            if (this.selectedPaiements.datePaiement == null) {
            this.errorMessages.push('DatePaiement non valide');
                    this.validPaiementDatePaiement = false;
            } else {
            this.validPaiementDatePaiement = true;
            }
            }
            private validatePaiementMontant(){
            if (this.selectedPaiements.montant == null) {
            this.errorMessages.push('Montant non valide');
                    this.validPaiementMontant = false;
            } else {
            this.validPaiementMontant = true;
            }
            }
            private validatePaiementPaiementTags(){
            if (this.selectedPaiements.paiementTagsVo == null || this.selectedPaiements.paiementTagsVo.length === 0) {
            this.errorMessages.push('PaiementTags non valide');
                    this.validPaiementPaiementTags = false;
            } else {
            this.validPaiementPaiementTags = true;
            }
            }


            private validateCommandeItemPrix(){
            if (this.selectedCommandeItems.prix == null) {
            this.errorMessages.push('Prix non valide');
                    this.validCommandeItemPrix = false;
            } else {
            this.validCommandeItemPrix = true;
            }
            }
            private validateCommandeItemQuantite(){
            if (this.selectedCommandeItems.quantite == null) {
            this.errorMessages.push('Quantite non valide');
                    this.validCommandeItemQuantite = false;
            } else {
            this.validCommandeItemQuantite = true;
            }
            }








//openPopup
              public async openCreateproduit(produit: string) {
                      const isPermistted = await this.roleService.isPermitted('Produit', 'add');
                       if(isPermistted){
         this.selectedProduit = new ProduitVo();
        this.createProduitDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateclient(client: string) {
                      const isPermistted = await this.roleService.isPermitted('Client', 'add');
                       if(isPermistted){
         this.selectedClient = new ClientVo();
        this.createClientDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetag(tag: string) {
                      const isPermistted = await this.roleService.isPermitted('Tag', 'add');
                       if(isPermistted){
         this.selectedTag = new TagVo();
        this.createTagDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createCommandeDialog  = false;
}

// getters and setters

get commandes(): Array<CommandeVo> {
    return this.commandeService.commandes;
       }
set commandes(value: Array<CommandeVo>) {
        this.commandeService.commandes = value;
       }

 get selectedCommande():CommandeVo {
           return this.commandeService.selectedCommande;
       }
    set selectedCommande(value: CommandeVo) {
        this.commandeService.selectedCommande = value;
       }

   get createCommandeDialog(): boolean {
           return this.commandeService.createCommandeDialog;

       }
    set createCommandeDialog(value: boolean) {
        this.commandeService.createCommandeDialog= value;
       }

       get selectedProduit(): ProduitVo {
           return this.produitService.selectedProduit;
       }
      set selectedProduit(value: ProduitVo) {
        this.produitService.selectedProduit = value;
       }
       get produits(): Array<ProduitVo> {
           return this.produitService.produits;
       }
       set produits(value: Array<ProduitVo>) {
        this.produitService.produits = value;
       }
       get createProduitDialog(): boolean {
           return this.produitService.createProduitDialog;
       }
      set createProduitDialog(value: boolean) {
        this.produitService.createProduitDialog= value;
       }
       get selectedClient(): ClientVo {
           return this.clientService.selectedClient;
       }
      set selectedClient(value: ClientVo) {
        this.clientService.selectedClient = value;
       }
       get clients(): Array<ClientVo> {
           return this.clientService.clients;
       }
       set clients(value: Array<ClientVo>) {
        this.clientService.clients = value;
       }
       get createClientDialog(): boolean {
           return this.clientService.createClientDialog;
       }
      set createClientDialog(value: boolean) {
        this.clientService.createClientDialog= value;
       }
       get selectedTag(): TagVo {
           return this.tagService.selectedTag;
       }
      set selectedTag(value: TagVo) {
        this.tagService.selectedTag = value;
       }
       get tags(): Array<TagVo> {
           return this.tagService.tags;
       }
       set tags(value: Array<TagVo>) {
        this.tagService.tags = value;
       }
       get createTagDialog(): boolean {
           return this.tagService.createTagDialog;
       }
      set createTagDialog(value: boolean) {
        this.tagService.createTagDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }

     get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }


    get commandeTagsVo(): Array<CommandeTagVo> {
    if( this._commandeTagsVo == null )
    this._commandeTagsVo = new Array();
    return this._commandeTagsVo;
    }

    set commandeTagsVo(value: Array<CommandeTagVo>) {
    this._commandeTagsVo = value;
    }

    get paiementTagsVo(): Array<PaiementTagVo> {
    if( this._paiementTagsVo == null )
    this._paiementTagsVo = new Array();
        return this._paiementTagsVo;
    }

    set paiementTagsVo(value: Array<PaiementTagVo>) {
        this._paiementTagsVo = value;
    }

    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }

    get validCommandeReference(): boolean {
    return this._validCommandeReference;
    }

    set validCommandeReference(value: boolean) {
    this._validCommandeReference = value;
    }
    get validCommandeDateCommande(): boolean {
    return this._validCommandeDateCommande;
    }

    set validCommandeDateCommande(value: boolean) {
    this._validCommandeDateCommande = value;
    }
    get validCommandeClient(): boolean {
    return this._validCommandeClient;
    }

    set validCommandeClient(value: boolean) {
    this._validCommandeClient = value;
    }
    get validCommandeCommandeItems(): boolean {
    return this._validCommandeCommandeItems;
    }

    set validCommandeCommandeItems(value: boolean) {
    this._validCommandeCommandeItems = value;
    }
    get validCommandeCommandeTags(): boolean {
    return this._validCommandeCommandeTags;
    }

    set validCommandeCommandeTags(value: boolean) {
    this._validCommandeCommandeTags = value;
    }

    get validClientReference(): boolean {
    return this._validClientReference;
    }

    set validClientReference(value: boolean) {
    this._validClientReference = value;
    }
    get validClientCin(): boolean {
    return this._validClientCin;
    }

    set validClientCin(value: boolean) {
    this._validClientCin = value;
    }
    get validPaiementReference(): boolean {
    return this._validPaiementReference;
    }

    set validPaiementReference(value: boolean) {
    this._validPaiementReference = value;
    }
    get validPaiementDatePaiement(): boolean {
    return this._validPaiementDatePaiement;
    }

    set validPaiementDatePaiement(value: boolean) {
    this._validPaiementDatePaiement = value;
    }
    get validPaiementMontant(): boolean {
    return this._validPaiementMontant;
    }

    set validPaiementMontant(value: boolean) {
    this._validPaiementMontant = value;
    }
    get validPaiementPaiementTags(): boolean {
    return this._validPaiementPaiementTags;
    }

    set validPaiementPaiementTags(value: boolean) {
    this._validPaiementPaiementTags = value;
    }
    get validCommandeItemPrix(): boolean {
    return this._validCommandeItemPrix;
    }

    set validCommandeItemPrix(value: boolean) {
    this._validCommandeItemPrix = value;
    }
    get validCommandeItemQuantite(): boolean {
    return this._validCommandeItemQuantite;
    }

    set validCommandeItemQuantite(value: boolean) {
    this._validCommandeItemQuantite = value;
    }

}
