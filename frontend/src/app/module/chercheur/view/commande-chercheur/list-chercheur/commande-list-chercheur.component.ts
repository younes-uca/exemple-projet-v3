import {Component, OnInit} from '@angular/core';
import {CommandeService} from '../../../../../controller/service/Commande.service';
import {CommandeVo} from '../../../../../controller/model/Commande.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { ClientService } from '../../../../../controller/service/Client.service';

import {PaiementVo} from '../../../../../controller/model/Paiement.model';
import {CommandeTagVo} from '../../../../../controller/model/CommandeTag.model';
import {CommandeItemVo} from '../../../../../controller/model/CommandeItem.model';
import {ClientVo} from '../../../../../controller/model/Client.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-commande-list-chercheur',
  templateUrl: './commande-list-chercheur.component.html',
  styleUrls: ['./commande-list-chercheur.component.css']
})
export class CommandeListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Commande';
     yesOrNoArchive :any[] =[];
    clients :Array<ClientVo>;


    constructor(private datePipe: DatePipe, private commandeService: CommandeService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private clientService: ClientService
) { }

    ngOnInit(): void {
      this.loadCommandes();
      this.initExport();
      this.initCol();
      this.loadClient();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadCommandes(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Commande', 'list');
        isPermistted ? this.commandeService.findAll().subscribe(commandes => this.commandes = commandes,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.commandeService.findByCriteria(this.searchCommande).subscribe(commandes=>{
            
            this.commandes = commandes;
           // this.searchCommande = new CommandeVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'dateCommande', header: 'Date commande'},
                            {field: 'total', header: 'Total'},
                            {field: 'totalPaye', header: 'Total paye'},
                        {field: 'client?.cin', header: 'Client'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
        ];
    }
    
    public async editCommande(commande:CommandeVo){
        const isPermistted = await this.roleService.isPermitted('Commande', 'edit');
         if(isPermistted){
          this.commandeService.findByIdWithAssociatedList(commande).subscribe(res => {
           this.selectedCommande = res;
            this.selectedCommande.dateCommande = new Date(commande.dateCommande);
            this.selectedCommande.dateArchivage = new Date(commande.dateArchivage);
            this.selectedCommande.dateCreation = new Date(commande.dateCreation);
            this.editCommandeDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCommande(commande:CommandeVo){
        const isPermistted = await this.roleService.isPermitted('Commande', 'view');
        if(isPermistted){
           this.commandeService.findByIdWithAssociatedList(commande).subscribe(res => {
           this.selectedCommande = res;
            this.selectedCommande.dateCommande = new Date(commande.dateCommande);
            this.selectedCommande.dateArchivage = new Date(commande.dateArchivage);
            this.selectedCommande.dateCreation = new Date(commande.dateCreation);
            this.viewCommandeDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCommande(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCommande = new CommandeVo();
            this.createCommandeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteCommande(commande:CommandeVo){
       const isPermistted = await this.roleService.isPermitted('Commande', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Commande) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.commandeService.delete(commande).subscribe(status=>{
                          if(status > 0){
                          const position = this.commandes.indexOf(commande);
                          position > -1 ? this.commandes.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Commande Supprimé',
                        life: 3000
                    });
                                     }

                    },error=>console.log(error))
                             }
                     });
              }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Problème de permission'
              });
             }
    }

public async loadClient(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Commande', 'list');
    isPermistted ? this.clientService.findAll().subscribe(clients => this.clients = clients,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateCommande(commande: CommandeVo) {

     this.commandeService.findByIdWithAssociatedList(commande).subscribe(
	 res => {
	       this.initDuplicateCommande(res);
	       this.selectedCommande = res;
	       this.selectedCommande.id = null;
            this.createCommandeDialog = true;

});

	}

	initDuplicateCommande(res: CommandeVo) {
        if (res.paiementsVo != null) {
             res.paiementsVo.forEach(d => { d.commandeVo = null; d.id = null; });
                }
        if (res.commandeItemsVo != null) {
             res.commandeItemsVo.forEach(d => { d.commandeVo = null; d.id = null; });
                }
        if (res.commandeTagsVo != null) {
             res.commandeTagsVo.forEach(d => { d.commandeVo = null; d.id = null; });
                }


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.commandes.map(e => {
    return {
                    'Reference': e.reference ,
                    'Date commande': this.datePipe.transform(e.dateCommande , 'dd-MM-yyyy'),
                    'Total': e.total ,
                    'Total paye': e.totalPaye ,
            'Client': e.clientVo?.cin ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
     }
      });

      this.criteriaData = [{
            'Reference': this.searchCommande.reference ? this.searchCommande.reference : environment.emptyForExport ,
            'Date commande Min': this.searchCommande.dateCommandeMin ? this.datePipe.transform(this.searchCommande.dateCommandeMin , this.dateFormat) : environment.emptyForExport ,
            'Date commande Max': this.searchCommande.dateCommandeMax ? this.datePipe.transform(this.searchCommande.dateCommandeMax , this.dateFormat) : environment.emptyForExport ,
            'Total Min': this.searchCommande.totalMin ? this.searchCommande.totalMin : environment.emptyForExport ,
            'Total Max': this.searchCommande.totalMax ? this.searchCommande.totalMax : environment.emptyForExport ,
            'Total paye Min': this.searchCommande.totalPayeMin ? this.searchCommande.totalPayeMin : environment.emptyForExport ,
            'Total paye Max': this.searchCommande.totalPayeMax ? this.searchCommande.totalPayeMax : environment.emptyForExport ,
        'Client': this.searchCommande.clientVo?.cin ? this.searchCommande.clientVo?.cin : environment.emptyForExport ,
            'Archive': this.searchCommande.archive ? (this.searchCommande.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchCommande.dateArchivageMin ? this.datePipe.transform(this.searchCommande.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchCommande.dateArchivageMax ? this.datePipe.transform(this.searchCommande.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchCommande.dateCreationMin ? this.datePipe.transform(this.searchCommande.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchCommande.dateCreationMax ? this.datePipe.transform(this.searchCommande.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get commandes(): Array<CommandeVo> {
           return this.commandeService.commandes;
       }
    set commandes(value: Array<CommandeVo>) {
        this.commandeService.commandes = value;
       }

    get commandeSelections(): Array<CommandeVo> {
           return this.commandeService.commandeSelections;
       }
    set commandeSelections(value: Array<CommandeVo>) {
        this.commandeService.commandeSelections = value;
       }
   
     


    get selectedCommande():CommandeVo {
           return this.commandeService.selectedCommande;
       }
    set selectedCommande(value: CommandeVo) {
        this.commandeService.selectedCommande = value;
       }
    
    get createCommandeDialog():boolean {
           return this.commandeService.createCommandeDialog;
       }
    set createCommandeDialog(value: boolean) {
        this.commandeService.createCommandeDialog= value;
       }
    
    get editCommandeDialog():boolean {
           return this.commandeService.editCommandeDialog;
       }
    set editCommandeDialog(value: boolean) {
        this.commandeService.editCommandeDialog= value;
       }
    get viewCommandeDialog():boolean {
           return this.commandeService.viewCommandeDialog;
       }
    set viewCommandeDialog(value: boolean) {
        this.commandeService.viewCommandeDialog = value;
       }
       
     get searchCommande(): CommandeVo {
        return this.commandeService.searchCommande;
       }
    set searchCommande(value: CommandeVo) {
        this.commandeService.searchCommande = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
