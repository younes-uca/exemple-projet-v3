import {Component, OnInit} from '@angular/core';
import {PaiementService} from '../../../../../controller/service/Paiement.service';
import {PaiementVo} from '../../../../../controller/model/Paiement.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
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
  selector: 'app-paiement-view-chercheur',
  templateUrl: './paiement-view-chercheur.component.html',
  styleUrls: ['./paiement-view-chercheur.component.css']
})
export class PaiementViewChercheurComponent implements OnInit {

        selectedPaiementDetails: PaiementDetailVo = new PaiementDetailVo();
        paiementDetailsListe: Array<PaiementDetailVo> = [];

        myClients: Array<ClientVo> = [];

        selectedPaiementTags: PaiementTagVo = new PaiementTagVo();
        paiementTagsListe: Array<PaiementTagVo> = [];

        myTags: Array<TagVo> = [];


constructor(private datePipe: DatePipe, private paiementService: PaiementService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private paiementTagService :PaiementTagService
    ,private paiementDetailService :PaiementDetailService
    ,private clientService :ClientService
    ,private tagService :TagService
    ,private commandeService :CommandeService
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

hideViewDialog(){
    this.viewPaiementDialog  = false;
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

   get viewPaiementDialog():boolean {
           return this.paiementService.viewPaiementDialog;

       }
    set viewPaiementDialog(value: boolean) {
        this.paiementService.viewPaiementDialog= value;
       }

       get selectedClient():ClientVo {
           return this.clientService.selectedClient;
       }
      set selectedClient(value: ClientVo) {
        this.clientService.selectedClient = value;
       }
       get clients():Array<ClientVo> {
           return this.clientService.clients;
       }
       set clients(value: Array<ClientVo>) {
        this.clientService.clients = value;
       }
       get editClientDialog():boolean {
           return this.clientService.editClientDialog;
       }
      set editClientDialog(value: boolean) {
        this.clientService.editClientDialog= value;
       }
       get selectedTag():TagVo {
           return this.tagService.selectedTag;
       }
      set selectedTag(value: TagVo) {
        this.tagService.selectedTag = value;
       }
       get tags():Array<TagVo> {
           return this.tagService.tags;
       }
       set tags(value: Array<TagVo>) {
        this.tagService.tags = value;
       }
       get editTagDialog():boolean {
           return this.tagService.editTagDialog;
       }
      set editTagDialog(value: boolean) {
        this.tagService.editTagDialog= value;
       }
       get selectedCommande():CommandeVo {
           return this.commandeService.selectedCommande;
       }
      set selectedCommande(value: CommandeVo) {
        this.commandeService.selectedCommande = value;
       }
       get commandes():Array<CommandeVo> {
           return this.commandeService.commandes;
       }
       set commandes(value: Array<CommandeVo>) {
        this.commandeService.commandes = value;
       }
       get editCommandeDialog():boolean {
           return this.commandeService.editCommandeDialog;
       }
      set editCommandeDialog(value: boolean) {
        this.commandeService.editCommandeDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
