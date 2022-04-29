import {Component, OnInit} from '@angular/core';
import {ProduitService} from '../../../../../controller/service/Produit.service';
import {ProduitVo} from '../../../../../controller/model/Produit.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { CategorieProduitService } from '../../../../../controller/service/CategorieProduit.service';

import {CategorieProduitVo} from '../../../../../controller/model/CategorieProduit.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-produit-list-admin',
  templateUrl: './produit-list-admin.component.html',
  styleUrls: ['./produit-list-admin.component.css']
})
export class ProduitListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Produit';
     yesOrNoArchive :any[] =[];
    categorieProduits :Array<CategorieProduitVo>;


    constructor(private datePipe: DatePipe, private produitService: ProduitService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private categorieProduitService: CategorieProduitService
) { }

    ngOnInit(): void {
      this.loadProduits();
      this.initExport();
      this.initCol();
      this.loadCategorieProduit();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadProduits(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Produit', 'list');
        isPermistted ? this.produitService.findAll().subscribe(produits => this.produits = produits,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.produitService.findByCriteria(this.searchProduit).subscribe(produits=>{
            
            this.produits = produits;
           // this.searchProduit = new ProduitVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'libelle', header: 'Libelle'},
                        {field: 'categorieProduit?.libelle', header: 'Categorie produit'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
        ];
    }
    
    public async editProduit(produit:ProduitVo){
        const isPermistted = await this.roleService.isPermitted('Produit', 'edit');
         if(isPermistted){
          this.produitService.findByIdWithAssociatedList(produit).subscribe(res => {
           this.selectedProduit = res;
            this.selectedProduit.dateArchivage = new Date(produit.dateArchivage);
            this.selectedProduit.dateCreation = new Date(produit.dateCreation);
            this.editProduitDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewProduit(produit:ProduitVo){
        const isPermistted = await this.roleService.isPermitted('Produit', 'view');
        if(isPermistted){
           this.produitService.findByIdWithAssociatedList(produit).subscribe(res => {
           this.selectedProduit = res;
            this.selectedProduit.dateArchivage = new Date(produit.dateArchivage);
            this.selectedProduit.dateCreation = new Date(produit.dateCreation);
            this.viewProduitDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateProduit(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedProduit = new ProduitVo();
            this.createProduitDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverProduit(produit:ProduitVo){
const isPermistted = await this.roleService.isPermitted('Produit', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Produit) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.produitService.archiver(produit).subscribe(status=>{
const myIndex = this.produits.indexOf(produit);
this.produits[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Produit archivé',
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

public async desarchiverProduit(produit:ProduitVo){
const isPermistted = await this.roleService.isPermitted('Produit', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Produit) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.produitService.desarchiver(produit).subscribe(status=>{
const myIndex = this.produits.indexOf(produit);
this.produits[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Produit désarchivé',
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


    public async deleteProduit(produit:ProduitVo){
       const isPermistted = await this.roleService.isPermitted('Produit', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Produit) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.produitService.delete(produit).subscribe(status=>{
                          if(status > 0){
                          const position = this.produits.indexOf(produit);
                          position > -1 ? this.produits.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Produit Supprimé',
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

public async loadCategorieProduit(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Produit', 'list');
    isPermistted ? this.categorieProduitService.findAll().subscribe(categorieProduits => this.categorieProduits = categorieProduits,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateProduit(produit: ProduitVo) {

     this.produitService.findByIdWithAssociatedList(produit).subscribe(
	 res => {
	       this.initDuplicateProduit(res);
	       this.selectedProduit = res;
	       this.selectedProduit.id = null;
            this.createProduitDialog = true;

});

	}

	initDuplicateProduit(res: ProduitVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.produits.map(e => {
    return {
                    'Reference': e.reference ,
                    'Libelle': e.libelle ,
            'Categorie produit': e.categorieProduitVo?.libelle ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
     }
      });

      this.criteriaData = [{
            'Reference': this.searchProduit.reference ? this.searchProduit.reference : environment.emptyForExport ,
            'Libelle': this.searchProduit.libelle ? this.searchProduit.libelle : environment.emptyForExport ,
        'Categorie produit': this.searchProduit.categorieProduitVo?.libelle ? this.searchProduit.categorieProduitVo?.libelle : environment.emptyForExport ,
            'Archive': this.searchProduit.archive ? (this.searchProduit.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchProduit.dateArchivageMin ? this.datePipe.transform(this.searchProduit.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchProduit.dateArchivageMax ? this.datePipe.transform(this.searchProduit.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchProduit.dateCreationMin ? this.datePipe.transform(this.searchProduit.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchProduit.dateCreationMax ? this.datePipe.transform(this.searchProduit.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get produits(): Array<ProduitVo> {
           return this.produitService.produits;
       }
    set produits(value: Array<ProduitVo>) {
        this.produitService.produits = value;
       }

    get produitSelections(): Array<ProduitVo> {
           return this.produitService.produitSelections;
       }
    set produitSelections(value: Array<ProduitVo>) {
        this.produitService.produitSelections = value;
       }
   
     


    get selectedProduit():ProduitVo {
           return this.produitService.selectedProduit;
       }
    set selectedProduit(value: ProduitVo) {
        this.produitService.selectedProduit = value;
       }
    
    get createProduitDialog():boolean {
           return this.produitService.createProduitDialog;
       }
    set createProduitDialog(value: boolean) {
        this.produitService.createProduitDialog= value;
       }
    
    get editProduitDialog():boolean {
           return this.produitService.editProduitDialog;
       }
    set editProduitDialog(value: boolean) {
        this.produitService.editProduitDialog= value;
       }
    get viewProduitDialog():boolean {
           return this.produitService.viewProduitDialog;
       }
    set viewProduitDialog(value: boolean) {
        this.produitService.viewProduitDialog = value;
       }
       
     get searchProduit(): ProduitVo {
        return this.produitService.searchProduit;
       }
    set searchProduit(value: ProduitVo) {
        this.produitService.searchProduit = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
