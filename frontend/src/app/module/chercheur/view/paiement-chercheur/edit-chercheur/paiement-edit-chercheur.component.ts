import {Component, OnInit} from '@angular/core';
import {PaiementService} from '../../../../../controller/service/Paiement.service';
import {PaiementVo} from '../../../../../controller/model/Paiement.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {PaiementTagVo} from '../../../../../controller/model/PaiementTag.model';
import {PaiementTagService} from '../../../../../controller/service/PaiementTag.service';
import {PaiementDetailVo} from '../../../../../controller/model/PaiementDetail.model';
import {PaiementDetailService} from '../../../../../controller/service/PaiementDetail.service';
import {ClientVo} from '../../../../../controller/model/Client.model';
import {ClientService} from '../../../../../controller/service/Client.service';
import {TagVo} from '../../../../../controller/model/Tag.model';
import {TagService} from '../../../../../controller/service/Tag.service';
import {CommandeVo} from '../../../../../controller/model/Commande.model';
import {CommandeService} from '../../../../../controller/service/Commande.service';

@Component({
  selector: 'app-paiement-edit-chercheur',
  templateUrl: './paiement-edit-chercheur.component.html',
  styleUrls: ['./paiement-edit-chercheur.component.css']
})
export class PaiementEditChercheurComponent implements OnInit {

        selectedPaiementDetails: PaiementDetailVo = new PaiementDetailVo();
        paiementDetailsListe: Array<PaiementDetailVo> = [];

        myClients: Array<ClientVo> = [];

        selectedPaiementTags: PaiementTagVo = new PaiementTagVo();
        paiementTagsListe: Array<PaiementTagVo> = [];

        myTags: Array<TagVo> = [];


constructor(private datePipe: DatePipe, private paiementService: PaiementService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private paiementTagService: PaiementTagService
 ,       private paiementDetailService: PaiementDetailService
 ,       private clientService: ClientService
 ,       private tagService: TagService
 ,       private commandeService: CommandeService
) {
}

// methods
ngOnInit(): void {
                this.selectedPaiementDetails.clientVo = new ClientVo();
                this.clientService.findAll().subscribe((data) => this.clients = data);
                this.selectedPaiementTags.tagVo = new TagVo();
                this.tagService.findAll().subscribe((data) => this.tags = data);
    this.selectedCommande = new CommandeVo();
    this.commandeService.findAll().subscribe((data) => this.commandes = data);
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
        addPaiementTags() {
        if( this.selectedPaiement.paiementTagsVo == null ){
            this.selectedPaiement.paiementTagsVo = new Array<PaiementTagVo>();
        }
        this.selectedPaiement.paiementTagsVo.push(this.selectedPaiementTags);
        this.selectedPaiementTags = new PaiementTagVo();
        }

       deletePaiementTags(p: PaiementTagVo) {
        this.selectedPaiement.paiementTagsVo.forEach((element, index) => {
            if (element === p) { this.selectedPaiement.paiementTagsVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedPaiement.datePaiement = DateUtils.toDate(this.selectedPaiement.datePaiement);
    this.paiementService.edit().subscribe(paiement=>{
    const myIndex = this.paiements.findIndex(e => e.id === this.selectedPaiement.id);
    this.paiements[myIndex] = this.selectedPaiement;
    this.editPaiementDialog = false;
    this.selectedPaiement = new PaiementVo();


    }, error => {
        console.log(error);
    });

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

hideEditDialog(){
    this.editPaiementDialog  = false;
}

// getters and setters

get paiements(): Array<PaiementVo> {
    return this.paiementService.paiements;
       }
set paiements(value: Array<PaiementVo>) {
        this.paiementService.paiements = value;
       }

 get selectedPaiement(): PaiementVo {
           return this.paiementService.selectedPaiement;
       }
    set selectedPaiement(value: PaiementVo) {
        this.paiementService.selectedPaiement = value;
       }

   get editPaiementDialog(): boolean {
           return this.paiementService.editPaiementDialog;

       }
    set editPaiementDialog(value: boolean) {
        this.paiementService.editPaiementDialog = value;
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
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
