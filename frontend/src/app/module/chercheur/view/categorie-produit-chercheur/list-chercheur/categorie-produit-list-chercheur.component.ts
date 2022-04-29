import {Component, OnInit} from '@angular/core';
import {CategorieProduitService} from '../../../../../controller/service/CategorieProduit.service';
import {CategorieProduitVo} from '../../../../../controller/model/CategorieProduit.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';


import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-categorie-produit-list-chercheur',
  templateUrl: './categorie-produit-list-chercheur.component.html',
  styleUrls: ['./categorie-produit-list-chercheur.component.css']
})
export class CategorieProduitListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'CategorieProduit';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private categorieProduitService: CategorieProduitService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadCategorieProduits();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadCategorieProduits(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CategorieProduit', 'list');
        isPermistted ? this.categorieProduitService.findAll().subscribe(categorieProduits => this.categorieProduits = categorieProduits,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.categorieProduitService.findByCriteria(this.searchCategorieProduit).subscribe(categorieProduits=>{
            
            this.categorieProduits = categorieProduits;
           // this.searchCategorieProduit = new CategorieProduitVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
        ];
    }
    
    public async editCategorieProduit(categorieProduit:CategorieProduitVo){
        const isPermistted = await this.roleService.isPermitted('CategorieProduit', 'edit');
         if(isPermistted){
          this.categorieProduitService.findByIdWithAssociatedList(categorieProduit).subscribe(res => {
           this.selectedCategorieProduit = res;
            this.selectedCategorieProduit.dateArchivage = new Date(categorieProduit.dateArchivage);
            this.selectedCategorieProduit.dateCreation = new Date(categorieProduit.dateCreation);
            this.editCategorieProduitDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCategorieProduit(categorieProduit:CategorieProduitVo){
        const isPermistted = await this.roleService.isPermitted('CategorieProduit', 'view');
        if(isPermistted){
           this.categorieProduitService.findByIdWithAssociatedList(categorieProduit).subscribe(res => {
           this.selectedCategorieProduit = res;
            this.selectedCategorieProduit.dateArchivage = new Date(categorieProduit.dateArchivage);
            this.selectedCategorieProduit.dateCreation = new Date(categorieProduit.dateCreation);
            this.viewCategorieProduitDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCategorieProduit(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCategorieProduit = new CategorieProduitVo();
            this.createCategorieProduitDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteCategorieProduit(categorieProduit:CategorieProduitVo){
       const isPermistted = await this.roleService.isPermitted('CategorieProduit', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Categorie produit) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.categorieProduitService.delete(categorieProduit).subscribe(status=>{
                          if(status > 0){
                          const position = this.categorieProduits.indexOf(categorieProduit);
                          position > -1 ? this.categorieProduits.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Categorie produit Supprimé',
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


public async duplicateCategorieProduit(categorieProduit: CategorieProduitVo) {

     this.categorieProduitService.findByIdWithAssociatedList(categorieProduit).subscribe(
	 res => {
	       this.initDuplicateCategorieProduit(res);
	       this.selectedCategorieProduit = res;
	       this.selectedCategorieProduit.id = null;
            this.createCategorieProduitDialog = true;

});

	}

	initDuplicateCategorieProduit(res: CategorieProduitVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.categorieProduits.map(e => {
    return {
                    'Reference': e.reference ,
                    'Libelle': e.libelle ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
     }
      });

      this.criteriaData = [{
            'Reference': this.searchCategorieProduit.reference ? this.searchCategorieProduit.reference : environment.emptyForExport ,
            'Libelle': this.searchCategorieProduit.libelle ? this.searchCategorieProduit.libelle : environment.emptyForExport ,
            'Archive': this.searchCategorieProduit.archive ? (this.searchCategorieProduit.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchCategorieProduit.dateArchivageMin ? this.datePipe.transform(this.searchCategorieProduit.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchCategorieProduit.dateArchivageMax ? this.datePipe.transform(this.searchCategorieProduit.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchCategorieProduit.dateCreationMin ? this.datePipe.transform(this.searchCategorieProduit.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchCategorieProduit.dateCreationMax ? this.datePipe.transform(this.searchCategorieProduit.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get categorieProduits(): Array<CategorieProduitVo> {
           return this.categorieProduitService.categorieProduits;
       }
    set categorieProduits(value: Array<CategorieProduitVo>) {
        this.categorieProduitService.categorieProduits = value;
       }

    get categorieProduitSelections(): Array<CategorieProduitVo> {
           return this.categorieProduitService.categorieProduitSelections;
       }
    set categorieProduitSelections(value: Array<CategorieProduitVo>) {
        this.categorieProduitService.categorieProduitSelections = value;
       }
   
     


    get selectedCategorieProduit():CategorieProduitVo {
           return this.categorieProduitService.selectedCategorieProduit;
       }
    set selectedCategorieProduit(value: CategorieProduitVo) {
        this.categorieProduitService.selectedCategorieProduit = value;
       }
    
    get createCategorieProduitDialog():boolean {
           return this.categorieProduitService.createCategorieProduitDialog;
       }
    set createCategorieProduitDialog(value: boolean) {
        this.categorieProduitService.createCategorieProduitDialog= value;
       }
    
    get editCategorieProduitDialog():boolean {
           return this.categorieProduitService.editCategorieProduitDialog;
       }
    set editCategorieProduitDialog(value: boolean) {
        this.categorieProduitService.editCategorieProduitDialog= value;
       }
    get viewCategorieProduitDialog():boolean {
           return this.categorieProduitService.viewCategorieProduitDialog;
       }
    set viewCategorieProduitDialog(value: boolean) {
        this.categorieProduitService.viewCategorieProduitDialog = value;
       }
       
     get searchCategorieProduit(): CategorieProduitVo {
        return this.categorieProduitService.searchCategorieProduit;
       }
    set searchCategorieProduit(value: CategorieProduitVo) {
        this.categorieProduitService.searchCategorieProduit = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
