import {Component, OnInit} from '@angular/core';
import {PaiementTagService} from '../../../../../controller/service/PaiementTag.service';
import {PaiementTagVo} from '../../../../../controller/model/PaiementTag.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { PaiementService } from '../../../../../controller/service/Paiement.service';
import { TagService } from '../../../../../controller/service/Tag.service';

import {PaiementVo} from '../../../../../controller/model/Paiement.model';
import {TagVo} from '../../../../../controller/model/Tag.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-paiement-tag-list-admin',
  templateUrl: './paiement-tag-list-admin.component.html',
  styleUrls: ['./paiement-tag-list-admin.component.css']
})
export class PaiementTagListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PaiementTag';
    paiements :Array<PaiementVo>;
    tags :Array<TagVo>;


    constructor(private datePipe: DatePipe, private paiementTagService: PaiementTagService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private paiementService: PaiementService
        , private tagService: TagService
) { }

    ngOnInit(): void {
      this.loadPaiementTags();
      this.initExport();
      this.initCol();
      this.loadPaiement();
      this.loadTag();
    }
    
    // methods
      public async loadPaiementTags(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PaiementTag', 'list');
        isPermistted ? this.paiementTagService.findAll().subscribe(paiementTags => this.paiementTags = paiementTags,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.paiementTagService.findByCriteria(this.searchPaiementTag).subscribe(paiementTags=>{
            
            this.paiementTags = paiementTags;
           // this.searchPaiementTag = new PaiementTagVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'paiement?.reference', header: 'Paiement'},
                        {field: 'tag?.libelle', header: 'Tag'},
        ];
    }
    
    public async editPaiementTag(paiementTag:PaiementTagVo){
        const isPermistted = await this.roleService.isPermitted('PaiementTag', 'edit');
         if(isPermistted){
          this.paiementTagService.findByIdWithAssociatedList(paiementTag).subscribe(res => {
           this.selectedPaiementTag = res;
            this.editPaiementTagDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPaiementTag(paiementTag:PaiementTagVo){
        const isPermistted = await this.roleService.isPermitted('PaiementTag', 'view');
        if(isPermistted){
           this.paiementTagService.findByIdWithAssociatedList(paiementTag).subscribe(res => {
           this.selectedPaiementTag = res;
            this.viewPaiementTagDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePaiementTag(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPaiementTag = new PaiementTagVo();
            this.createPaiementTagDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deletePaiementTag(paiementTag:PaiementTagVo){
       const isPermistted = await this.roleService.isPermitted('PaiementTag', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Paiement tag) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.paiementTagService.delete(paiementTag).subscribe(status=>{
                          if(status > 0){
                          const position = this.paiementTags.indexOf(paiementTag);
                          position > -1 ? this.paiementTags.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Paiement tag Supprimé',
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

public async loadPaiement(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('PaiementTag', 'list');
    isPermistted ? this.paiementService.findAll().subscribe(paiements => this.paiements = paiements,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadTag(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('PaiementTag', 'list');
    isPermistted ? this.tagService.findAll().subscribe(tags => this.tags = tags,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicatePaiementTag(paiementTag: PaiementTagVo) {

     this.paiementTagService.findByIdWithAssociatedList(paiementTag).subscribe(
	 res => {
	       this.initDuplicatePaiementTag(res);
	       this.selectedPaiementTag = res;
	       this.selectedPaiementTag.id = null;
            this.createPaiementTagDialog = true;

});

	}

	initDuplicatePaiementTag(res: PaiementTagVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.paiementTags.map(e => {
    return {
            'Paiement': e.paiementVo?.reference ,
            'Tag': e.tagVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Paiement': this.searchPaiementTag.paiementVo?.reference ? this.searchPaiementTag.paiementVo?.reference : environment.emptyForExport ,
        'Tag': this.searchPaiementTag.tagVo?.libelle ? this.searchPaiementTag.tagVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get paiementTags(): Array<PaiementTagVo> {
           return this.paiementTagService.paiementTags;
       }
    set paiementTags(value: Array<PaiementTagVo>) {
        this.paiementTagService.paiementTags = value;
       }

    get paiementTagSelections(): Array<PaiementTagVo> {
           return this.paiementTagService.paiementTagSelections;
       }
    set paiementTagSelections(value: Array<PaiementTagVo>) {
        this.paiementTagService.paiementTagSelections = value;
       }
   
     


    get selectedPaiementTag():PaiementTagVo {
           return this.paiementTagService.selectedPaiementTag;
       }
    set selectedPaiementTag(value: PaiementTagVo) {
        this.paiementTagService.selectedPaiementTag = value;
       }
    
    get createPaiementTagDialog():boolean {
           return this.paiementTagService.createPaiementTagDialog;
       }
    set createPaiementTagDialog(value: boolean) {
        this.paiementTagService.createPaiementTagDialog= value;
       }
    
    get editPaiementTagDialog():boolean {
           return this.paiementTagService.editPaiementTagDialog;
       }
    set editPaiementTagDialog(value: boolean) {
        this.paiementTagService.editPaiementTagDialog= value;
       }
    get viewPaiementTagDialog():boolean {
           return this.paiementTagService.viewPaiementTagDialog;
       }
    set viewPaiementTagDialog(value: boolean) {
        this.paiementTagService.viewPaiementTagDialog = value;
       }
       
     get searchPaiementTag(): PaiementTagVo {
        return this.paiementTagService.searchPaiementTag;
       }
    set searchPaiementTag(value: PaiementTagVo) {
        this.paiementTagService.searchPaiementTag = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
