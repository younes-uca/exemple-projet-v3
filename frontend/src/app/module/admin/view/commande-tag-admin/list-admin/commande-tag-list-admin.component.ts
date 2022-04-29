import {Component, OnInit} from '@angular/core';
import {CommandeTagService} from '../../../../../controller/service/CommandeTag.service';
import {CommandeTagVo} from '../../../../../controller/model/CommandeTag.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { CommandeService } from '../../../../../controller/service/Commande.service';
import { TagService } from '../../../../../controller/service/Tag.service';

import {TagVo} from '../../../../../controller/model/Tag.model';
import {CommandeVo} from '../../../../../controller/model/Commande.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-commande-tag-list-admin',
  templateUrl: './commande-tag-list-admin.component.html',
  styleUrls: ['./commande-tag-list-admin.component.css']
})
export class CommandeTagListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'CommandeTag';
    commandes :Array<CommandeVo>;
    tags :Array<TagVo>;


    constructor(private datePipe: DatePipe, private commandeTagService: CommandeTagService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private commandeService: CommandeService
        , private tagService: TagService
) { }

    ngOnInit(): void {
      this.loadCommandeTags();
      this.initExport();
      this.initCol();
      this.loadCommande();
      this.loadTag();
    }
    
    // methods
      public async loadCommandeTags(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CommandeTag', 'list');
        isPermistted ? this.commandeTagService.findAll().subscribe(commandeTags => this.commandeTags = commandeTags,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.commandeTagService.findByCriteria(this.searchCommandeTag).subscribe(commandeTags=>{
            
            this.commandeTags = commandeTags;
           // this.searchCommandeTag = new CommandeTagVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'commande?.reference', header: 'Commande'},
                        {field: 'tag?.libelle', header: 'Tag'},
        ];
    }
    
    public async editCommandeTag(commandeTag:CommandeTagVo){
        const isPermistted = await this.roleService.isPermitted('CommandeTag', 'edit');
         if(isPermistted){
          this.commandeTagService.findByIdWithAssociatedList(commandeTag).subscribe(res => {
           this.selectedCommandeTag = res;
            this.editCommandeTagDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCommandeTag(commandeTag:CommandeTagVo){
        const isPermistted = await this.roleService.isPermitted('CommandeTag', 'view');
        if(isPermistted){
           this.commandeTagService.findByIdWithAssociatedList(commandeTag).subscribe(res => {
           this.selectedCommandeTag = res;
            this.viewCommandeTagDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCommandeTag(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCommandeTag = new CommandeTagVo();
            this.createCommandeTagDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteCommandeTag(commandeTag:CommandeTagVo){
       const isPermistted = await this.roleService.isPermitted('CommandeTag', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Commande tag) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.commandeTagService.delete(commandeTag).subscribe(status=>{
                          if(status > 0){
                          const position = this.commandeTags.indexOf(commandeTag);
                          position > -1 ? this.commandeTags.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Commande tag Supprimé',
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

public async loadCommande(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CommandeTag', 'list');
    isPermistted ? this.commandeService.findAll().subscribe(commandes => this.commandes = commandes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadTag(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CommandeTag', 'list');
    isPermistted ? this.tagService.findAll().subscribe(tags => this.tags = tags,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateCommandeTag(commandeTag: CommandeTagVo) {

     this.commandeTagService.findByIdWithAssociatedList(commandeTag).subscribe(
	 res => {
	       this.initDuplicateCommandeTag(res);
	       this.selectedCommandeTag = res;
	       this.selectedCommandeTag.id = null;
            this.createCommandeTagDialog = true;

});

	}

	initDuplicateCommandeTag(res: CommandeTagVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.commandeTags.map(e => {
    return {
            'Commande': e.commandeVo?.reference ,
            'Tag': e.tagVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Commande': this.searchCommandeTag.commandeVo?.reference ? this.searchCommandeTag.commandeVo?.reference : environment.emptyForExport ,
        'Tag': this.searchCommandeTag.tagVo?.libelle ? this.searchCommandeTag.tagVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get commandeTags(): Array<CommandeTagVo> {
           return this.commandeTagService.commandeTags;
       }
    set commandeTags(value: Array<CommandeTagVo>) {
        this.commandeTagService.commandeTags = value;
       }

    get commandeTagSelections(): Array<CommandeTagVo> {
           return this.commandeTagService.commandeTagSelections;
       }
    set commandeTagSelections(value: Array<CommandeTagVo>) {
        this.commandeTagService.commandeTagSelections = value;
       }
   
     


    get selectedCommandeTag():CommandeTagVo {
           return this.commandeTagService.selectedCommandeTag;
       }
    set selectedCommandeTag(value: CommandeTagVo) {
        this.commandeTagService.selectedCommandeTag = value;
       }
    
    get createCommandeTagDialog():boolean {
           return this.commandeTagService.createCommandeTagDialog;
       }
    set createCommandeTagDialog(value: boolean) {
        this.commandeTagService.createCommandeTagDialog= value;
       }
    
    get editCommandeTagDialog():boolean {
           return this.commandeTagService.editCommandeTagDialog;
       }
    set editCommandeTagDialog(value: boolean) {
        this.commandeTagService.editCommandeTagDialog= value;
       }
    get viewCommandeTagDialog():boolean {
           return this.commandeTagService.viewCommandeTagDialog;
       }
    set viewCommandeTagDialog(value: boolean) {
        this.commandeTagService.viewCommandeTagDialog = value;
       }
       
     get searchCommandeTag(): CommandeTagVo {
        return this.commandeTagService.searchCommandeTag;
       }
    set searchCommandeTag(value: CommandeTagVo) {
        this.commandeTagService.searchCommandeTag = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
