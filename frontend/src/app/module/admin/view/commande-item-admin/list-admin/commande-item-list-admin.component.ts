import {Component, OnInit} from '@angular/core';
import {CommandeItemService} from '../../../../../controller/service/CommandeItem.service';
import {CommandeItemVo} from '../../../../../controller/model/CommandeItem.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { ProduitService } from '../../../../../controller/service/Produit.service';
import { CommandeService } from '../../../../../controller/service/Commande.service';

import {CommandeVo} from '../../../../../controller/model/Commande.model';
import {ProduitVo} from '../../../../../controller/model/Produit.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-commande-item-list-admin',
  templateUrl: './commande-item-list-admin.component.html',
  styleUrls: ['./commande-item-list-admin.component.css']
})
export class CommandeItemListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'CommandeItem';
     yesOrNoArchive :any[] =[];
    produits :Array<ProduitVo>;
    commandes :Array<CommandeVo>;


    constructor(private datePipe: DatePipe, private commandeItemService: CommandeItemService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private produitService: ProduitService
        , private commandeService: CommandeService
) { }

    ngOnInit(): void {
      this.loadCommandeItems();
      this.initExport();
      this.initCol();
      this.loadProduit();
      this.loadCommande();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadCommandeItems(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CommandeItem', 'list');
        isPermistted ? this.commandeItemService.findAll().subscribe(commandeItems => this.commandeItems = commandeItems,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.commandeItemService.findByCriteria(this.searchCommandeItem).subscribe(commandeItems=>{
            
            this.commandeItems = commandeItems;
           // this.searchCommandeItem = new CommandeItemVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'produit?.reference', header: 'Produit'},
                            {field: 'prix', header: 'Prix'},
                            {field: 'quantite', header: 'Quantite'},
                        {field: 'commande?.reference', header: 'Commande'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
        ];
    }
    
    public async editCommandeItem(commandeItem:CommandeItemVo){
        const isPermistted = await this.roleService.isPermitted('CommandeItem', 'edit');
         if(isPermistted){
          this.commandeItemService.findByIdWithAssociatedList(commandeItem).subscribe(res => {
           this.selectedCommandeItem = res;
            this.selectedCommandeItem.dateArchivage = new Date(commandeItem.dateArchivage);
            this.selectedCommandeItem.dateCreation = new Date(commandeItem.dateCreation);
            this.editCommandeItemDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCommandeItem(commandeItem:CommandeItemVo){
        const isPermistted = await this.roleService.isPermitted('CommandeItem', 'view');
        if(isPermistted){
           this.commandeItemService.findByIdWithAssociatedList(commandeItem).subscribe(res => {
           this.selectedCommandeItem = res;
            this.selectedCommandeItem.dateArchivage = new Date(commandeItem.dateArchivage);
            this.selectedCommandeItem.dateCreation = new Date(commandeItem.dateCreation);
            this.viewCommandeItemDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCommandeItem(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCommandeItem = new CommandeItemVo();
            this.createCommandeItemDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverCommandeItem(commandeItem:CommandeItemVo){
const isPermistted = await this.roleService.isPermitted('CommandeItem', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Commande item) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.commandeItemService.archiver(commandeItem).subscribe(status=>{
const myIndex = this.commandeItems.indexOf(commandeItem);
this.commandeItems[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Commande item archivé',
life: 3000
});
},error=>console.log(error))
 }
});
}else{
this.messageService.add({
severity: 'error', summary: 'erreur', detail: 'Problème de permission'
});
}
}

public async desarchiverCommandeItem(commandeItem:CommandeItemVo){
const isPermistted = await this.roleService.isPermitted('CommandeItem', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Commande item) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.commandeItemService.desarchiver(commandeItem).subscribe(status=>{
const myIndex = this.commandeItems.indexOf(commandeItem);
this.commandeItems[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Commande item désarchivé',
life: 3000
});
},error=>console.log(error))
 }
});
}else{
this.messageService.add({
severity: 'error', summary: 'erreur', detail: 'Problème de permission'
});
}
}


    public async deleteCommandeItem(commandeItem:CommandeItemVo){
       const isPermistted = await this.roleService.isPermitted('CommandeItem', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Commande item) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.commandeItemService.delete(commandeItem).subscribe(status=>{
                          if(status > 0){
                          const position = this.commandeItems.indexOf(commandeItem);
                          position > -1 ? this.commandeItems.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Commande item Supprimé',
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

public async loadProduit(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CommandeItem', 'list');
    isPermistted ? this.produitService.findAll().subscribe(produits => this.produits = produits,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadCommande(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CommandeItem', 'list');
    isPermistted ? this.commandeService.findAll().subscribe(commandes => this.commandes = commandes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateCommandeItem(commandeItem: CommandeItemVo) {

     this.commandeItemService.findByIdWithAssociatedList(commandeItem).subscribe(
	 res => {
	       this.initDuplicateCommandeItem(res);
	       this.selectedCommandeItem = res;
	       this.selectedCommandeItem.id = null;
            this.createCommandeItemDialog = true;

});

	}

	initDuplicateCommandeItem(res: CommandeItemVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.commandeItems.map(e => {
    return {
            'Produit': e.produitVo?.reference ,
                    'Prix': e.prix ,
                    'Quantite': e.quantite ,
            'Commande': e.commandeVo?.reference ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
     }
      });

      this.criteriaData = [{
        'Produit': this.searchCommandeItem.produitVo?.reference ? this.searchCommandeItem.produitVo?.reference : environment.emptyForExport ,
            'Prix Min': this.searchCommandeItem.prixMin ? this.searchCommandeItem.prixMin : environment.emptyForExport ,
            'Prix Max': this.searchCommandeItem.prixMax ? this.searchCommandeItem.prixMax : environment.emptyForExport ,
            'Quantite Min': this.searchCommandeItem.quantiteMin ? this.searchCommandeItem.quantiteMin : environment.emptyForExport ,
            'Quantite Max': this.searchCommandeItem.quantiteMax ? this.searchCommandeItem.quantiteMax : environment.emptyForExport ,
        'Commande': this.searchCommandeItem.commandeVo?.reference ? this.searchCommandeItem.commandeVo?.reference : environment.emptyForExport ,
            'Archive': this.searchCommandeItem.archive ? (this.searchCommandeItem.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchCommandeItem.dateArchivageMin ? this.datePipe.transform(this.searchCommandeItem.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchCommandeItem.dateArchivageMax ? this.datePipe.transform(this.searchCommandeItem.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchCommandeItem.dateCreationMin ? this.datePipe.transform(this.searchCommandeItem.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchCommandeItem.dateCreationMax ? this.datePipe.transform(this.searchCommandeItem.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get commandeItems(): Array<CommandeItemVo> {
           return this.commandeItemService.commandeItems;
       }
    set commandeItems(value: Array<CommandeItemVo>) {
        this.commandeItemService.commandeItems = value;
       }

    get commandeItemSelections(): Array<CommandeItemVo> {
           return this.commandeItemService.commandeItemSelections;
       }
    set commandeItemSelections(value: Array<CommandeItemVo>) {
        this.commandeItemService.commandeItemSelections = value;
       }
   
     


    get selectedCommandeItem():CommandeItemVo {
           return this.commandeItemService.selectedCommandeItem;
       }
    set selectedCommandeItem(value: CommandeItemVo) {
        this.commandeItemService.selectedCommandeItem = value;
       }
    
    get createCommandeItemDialog():boolean {
           return this.commandeItemService.createCommandeItemDialog;
       }
    set createCommandeItemDialog(value: boolean) {
        this.commandeItemService.createCommandeItemDialog= value;
       }
    
    get editCommandeItemDialog():boolean {
           return this.commandeItemService.editCommandeItemDialog;
       }
    set editCommandeItemDialog(value: boolean) {
        this.commandeItemService.editCommandeItemDialog= value;
       }
    get viewCommandeItemDialog():boolean {
           return this.commandeItemService.viewCommandeItemDialog;
       }
    set viewCommandeItemDialog(value: boolean) {
        this.commandeItemService.viewCommandeItemDialog = value;
       }
       
     get searchCommandeItem(): CommandeItemVo {
        return this.commandeItemService.searchCommandeItem;
       }
    set searchCommandeItem(value: CommandeItemVo) {
        this.commandeItemService.searchCommandeItem = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
