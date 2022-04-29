import {Component, OnInit} from '@angular/core';
import {TagService} from '../../../../../controller/service/Tag.service';
import {TagVo} from '../../../../../controller/model/Tag.model';
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
  selector: 'app-tag-list-admin',
  templateUrl: './tag-list-admin.component.html',
  styleUrls: ['./tag-list-admin.component.css']
})
export class TagListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Tag';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private tagService: TagService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadTags();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadTags(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Tag', 'list');
        isPermistted ? this.tagService.findAll().subscribe(tags => this.tags = tags,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.tagService.findByCriteria(this.searchTag).subscribe(tags=>{
            
            this.tags = tags;
           // this.searchTag = new TagVo();
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
    
    public async editTag(tag:TagVo){
        const isPermistted = await this.roleService.isPermitted('Tag', 'edit');
         if(isPermistted){
          this.tagService.findByIdWithAssociatedList(tag).subscribe(res => {
           this.selectedTag = res;
            this.selectedTag.dateArchivage = new Date(tag.dateArchivage);
            this.selectedTag.dateCreation = new Date(tag.dateCreation);
            this.editTagDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTag(tag:TagVo){
        const isPermistted = await this.roleService.isPermitted('Tag', 'view');
        if(isPermistted){
           this.tagService.findByIdWithAssociatedList(tag).subscribe(res => {
           this.selectedTag = res;
            this.selectedTag.dateArchivage = new Date(tag.dateArchivage);
            this.selectedTag.dateCreation = new Date(tag.dateCreation);
            this.viewTagDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTag(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTag = new TagVo();
            this.createTagDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverTag(tag:TagVo){
const isPermistted = await this.roleService.isPermitted('Tag', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Tag) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.tagService.archiver(tag).subscribe(status=>{
const myIndex = this.tags.indexOf(tag);
this.tags[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Tag archivé',
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

public async desarchiverTag(tag:TagVo){
const isPermistted = await this.roleService.isPermitted('Tag', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Tag) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.tagService.desarchiver(tag).subscribe(status=>{
const myIndex = this.tags.indexOf(tag);
this.tags[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Tag désarchivé',
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


    public async deleteTag(tag:TagVo){
       const isPermistted = await this.roleService.isPermitted('Tag', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Tag) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.tagService.delete(tag).subscribe(status=>{
                          if(status > 0){
                          const position = this.tags.indexOf(tag);
                          position > -1 ? this.tags.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Tag Supprimé',
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


public async duplicateTag(tag: TagVo) {

     this.tagService.findByIdWithAssociatedList(tag).subscribe(
	 res => {
	       this.initDuplicateTag(res);
	       this.selectedTag = res;
	       this.selectedTag.id = null;
            this.createTagDialog = true;

});

	}

	initDuplicateTag(res: TagVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.tags.map(e => {
    return {
                    'Reference': e.reference ,
                    'Libelle': e.libelle ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
     }
      });

      this.criteriaData = [{
            'Reference': this.searchTag.reference ? this.searchTag.reference : environment.emptyForExport ,
            'Libelle': this.searchTag.libelle ? this.searchTag.libelle : environment.emptyForExport ,
            'Archive': this.searchTag.archive ? (this.searchTag.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchTag.dateArchivageMin ? this.datePipe.transform(this.searchTag.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchTag.dateArchivageMax ? this.datePipe.transform(this.searchTag.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchTag.dateCreationMin ? this.datePipe.transform(this.searchTag.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchTag.dateCreationMax ? this.datePipe.transform(this.searchTag.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get tags(): Array<TagVo> {
           return this.tagService.tags;
       }
    set tags(value: Array<TagVo>) {
        this.tagService.tags = value;
       }

    get tagSelections(): Array<TagVo> {
           return this.tagService.tagSelections;
       }
    set tagSelections(value: Array<TagVo>) {
        this.tagService.tagSelections = value;
       }
   
     


    get selectedTag():TagVo {
           return this.tagService.selectedTag;
       }
    set selectedTag(value: TagVo) {
        this.tagService.selectedTag = value;
       }
    
    get createTagDialog():boolean {
           return this.tagService.createTagDialog;
       }
    set createTagDialog(value: boolean) {
        this.tagService.createTagDialog= value;
       }
    
    get editTagDialog():boolean {
           return this.tagService.editTagDialog;
       }
    set editTagDialog(value: boolean) {
        this.tagService.editTagDialog= value;
       }
    get viewTagDialog():boolean {
           return this.tagService.viewTagDialog;
       }
    set viewTagDialog(value: boolean) {
        this.tagService.viewTagDialog = value;
       }
       
     get searchTag(): TagVo {
        return this.tagService.searchTag;
       }
    set searchTag(value: TagVo) {
        this.tagService.searchTag = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
