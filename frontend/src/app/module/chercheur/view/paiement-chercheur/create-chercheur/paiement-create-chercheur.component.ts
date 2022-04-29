import {Component, OnInit, Input} from '@angular/core';
import {PaiementService} from '../../../../../controller/service/Paiement.service';
import {PaiementVo} from '../../../../../controller/model/Paiement.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


import {ClientVo} from '../../../../../controller/model/Client.model';
import {ClientService} from '../../../../../controller/service/Client.service';
import {CommandeVo} from '../../../../../controller/model/Commande.model';
import {CommandeService} from '../../../../../controller/service/Commande.service';
import {PaiementTagVo} from '../../../../../controller/model/PaiementTag.model';
import {PaiementTagService} from '../../../../../controller/service/PaiementTag.service';
import {TagVo} from '../../../../../controller/model/Tag.model';
import {TagService} from '../../../../../controller/service/Tag.service';
import {PaiementDetailVo} from '../../../../../controller/model/PaiementDetail.model';
import {PaiementDetailService} from '../../../../../controller/service/PaiementDetail.service';
@Component({
  selector: 'app-paiement-create-chercheur',
  templateUrl: './paiement-create-chercheur.component.html',
  styleUrls: ['./paiement-create-chercheur.component.css']
})
export class PaiementCreateChercheurComponent implements OnInit {

        selectedPaiementDetails: PaiementDetailVo = new PaiementDetailVo();
        selectedPaiementTags: PaiementTagVo = new PaiementTagVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validPaiementReference = true;
   _validPaiementDatePaiement = true;
   _validPaiementMontant = true;
   _validPaiementPaiementTags = true;

    _validCommandeReference = true;
    _validCommandeDateCommande = true;
    _validCommandeClient = true;
    _validCommandeCommandeItems = true;
    _validCommandeCommandeTags = true;
    _validPaiementDetailReference = true;


private _paiementTagsVo: Array<PaiementTagVo> = [];

constructor(private datePipe: DatePipe, private paiementService: PaiementService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private clientService :ClientService
,       private commandeService :CommandeService
,       private paiementTagService :PaiementTagService
,       private tagService :TagService
,       private paiementDetailService :PaiementDetailService
) {

}


// methods
ngOnInit(): void {


                this.selectedPaiementDetails.clientVo = new ClientVo();
                this.clientService.findAll().subscribe((data) => this.clients = data);


            this.tagService.findAll().subscribe(data => this.preparePaiementTags(data));

                this.selectedPaiementTags.tagVo = new TagVo();
                this.tagService.findAll().subscribe((data) => this.tags = data);


    this.selectedCommande = new CommandeVo();
    this.commandeService.findAll().subscribe((data) => this.commandes = data);
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

        addPaiementDetails() {
        if( this.selectedPaiement.paiementDetailsVo == null ){
            this.selectedPaiement.paiementDetailsVo = new Array<PaiementDetailVo>();
        }
        this.selectedPaiement.paiementDetailsVo.push(this.selectedPaiementDetails);
        this.selectedPaiementDetails = new PaiementDetailVo();
        }

        deletePaiementDetails(p: PaiementDetailVo) {
        this.selectedPaiement.paiementDetailsVo.forEach((element, index) => {
            if (element === p) { this.selectedPaiement.paiementDetailsVo.splice(index, 1); }
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
     this.paiementService.save().subscribe(paiement=>{
       this.paiements.push({...paiement});
       this.createPaiementDialog = false;
       this.submitted = false;
       this.selectedPaiement = new PaiementVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validatePaiementReference();
this.validatePaiementDatePaiement();
this.validatePaiementMontant();
this.validatePaiementPaiementTags();

    this.validatePaiementDetailReference();
    }

private validatePaiementReference(){
        if (this.selectedPaiement.reference == null) {
            this.errorMessages.push('Reference non valide');
            this.validPaiementReference = false;
        } else {
            this.validPaiementReference = true;
        }
    }
private validatePaiementDatePaiement(){
        if (this.selectedPaiement.datePaiement == null) {
            this.errorMessages.push('DatePaiement non valide');
            this.validPaiementDatePaiement = false;
        } else {
            this.validPaiementDatePaiement = true;
        }
    }
private validatePaiementMontant(){
        if (this.selectedPaiement.montant == null) {
            this.errorMessages.push('Montant non valide');
            this.validPaiementMontant = false;
        } else {
            this.validPaiementMontant = true;
        }
    }
private validatePaiementPaiementTags(){
        if (this.selectedPaiement.paiementTagsVo == null || this.selectedPaiement.paiementTagsVo.length === 0) {
            this.errorMessages.push('PaiementTags non valide');
            this.validPaiementPaiementTags = false;
        } else {
            this.validPaiementPaiementTags = true;
        }
    }







            private validatePaiementDetailReference(){
            if (this.selectedPaiementDetails.reference == null) {
            this.errorMessages.push('Reference non valide');
                    this.validPaiementDetailReference = false;
            } else {
            this.validPaiementDetailReference = true;
            }
            }





//openPopup
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
              public async openCreatecommande(commande: string) {
                      const isPermistted = await this.roleService.isPermitted('Commande', 'add');
                       if(isPermistted){
         this.selectedCommande = new CommandeVo();
        this.createCommandeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createPaiementDialog  = false;
}

// getters and setters

get paiements(): Array<PaiementVo> {
    return this.paiementService.paiements;
       }
set paiements(value: Array<PaiementVo>) {
        this.paiementService.paiements = value;
       }

 get selectedPaiement():PaiementVo {
           return this.paiementService.selectedPaiement;
       }
    set selectedPaiement(value: PaiementVo) {
        this.paiementService.selectedPaiement = value;
       }

   get createPaiementDialog(): boolean {
           return this.paiementService.createPaiementDialog;

       }
    set createPaiementDialog(value: boolean) {
        this.paiementService.createPaiementDialog= value;
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
       get selectedCommande(): CommandeVo {
           return this.commandeService.selectedCommande;
       }
      set selectedCommande(value: CommandeVo) {
        this.commandeService.selectedCommande = value;
       }
       get commandes(): Array<CommandeVo> {
           return this.commandeService.commandes;
       }
       set commandes(value: Array<CommandeVo>) {
        this.commandeService.commandes = value;
       }
       get createCommandeDialog(): boolean {
           return this.commandeService.createCommandeDialog;
       }
      set createCommandeDialog(value: boolean) {
        this.commandeService.createCommandeDialog= value;
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
    get validPaiementDetailReference(): boolean {
    return this._validPaiementDetailReference;
    }

    set validPaiementDetailReference(value: boolean) {
    this._validPaiementDetailReference = value;
    }

}
