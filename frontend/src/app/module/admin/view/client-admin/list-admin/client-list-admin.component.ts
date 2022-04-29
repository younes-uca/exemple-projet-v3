import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../../../../controller/service/Client.service';
import {ClientVo} from '../../../../../controller/model/Client.model';
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
  selector: 'app-client-list-admin',
  templateUrl: './client-list-admin.component.html',
  styleUrls: ['./client-list-admin.component.css']
})
export class ClientListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Client';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private clientService: ClientService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadClients();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadClients(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Client', 'list');
        isPermistted ? this.clientService.findAll().subscribe(clients => this.clients = clients,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.clientService.findByCriteria(this.searchClient).subscribe(clients=>{
            
            this.clients = clients;
           // this.searchClient = new ClientVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'cin', header: 'Cin'},
                            {field: 'nom', header: 'Nom'},
                            {field: 'prenom', header: 'Prenom'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
        ];
    }
    
    public async editClient(client:ClientVo){
        const isPermistted = await this.roleService.isPermitted('Client', 'edit');
         if(isPermistted){
          this.clientService.findByIdWithAssociatedList(client).subscribe(res => {
           this.selectedClient = res;
            this.selectedClient.dateArchivage = new Date(client.dateArchivage);
            this.selectedClient.dateCreation = new Date(client.dateCreation);
            this.editClientDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewClient(client:ClientVo){
        const isPermistted = await this.roleService.isPermitted('Client', 'view');
        if(isPermistted){
           this.clientService.findByIdWithAssociatedList(client).subscribe(res => {
           this.selectedClient = res;
            this.selectedClient.dateArchivage = new Date(client.dateArchivage);
            this.selectedClient.dateCreation = new Date(client.dateCreation);
            this.viewClientDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateClient(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedClient = new ClientVo();
            this.createClientDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverClient(client:ClientVo){
const isPermistted = await this.roleService.isPermitted('Client', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Client) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.clientService.archiver(client).subscribe(status=>{
const myIndex = this.clients.indexOf(client);
this.clients[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Client archivé',
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

public async desarchiverClient(client:ClientVo){
const isPermistted = await this.roleService.isPermitted('Client', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Client) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.clientService.desarchiver(client).subscribe(status=>{
const myIndex = this.clients.indexOf(client);
this.clients[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Client désarchivé',
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


    public async deleteClient(client:ClientVo){
       const isPermistted = await this.roleService.isPermitted('Client', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Client) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.clientService.delete(client).subscribe(status=>{
                          if(status > 0){
                          const position = this.clients.indexOf(client);
                          position > -1 ? this.clients.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Client Supprimé',
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


public async duplicateClient(client: ClientVo) {

     this.clientService.findByIdWithAssociatedList(client).subscribe(
	 res => {
	       this.initDuplicateClient(res);
	       this.selectedClient = res;
	       this.selectedClient.id = null;
            this.createClientDialog = true;

});

	}

	initDuplicateClient(res: ClientVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.clients.map(e => {
    return {
                    'Reference': e.reference ,
                    'Cin': e.cin ,
                    'Nom': e.nom ,
                    'Prenom': e.prenom ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
     }
      });

      this.criteriaData = [{
            'Reference': this.searchClient.reference ? this.searchClient.reference : environment.emptyForExport ,
            'Cin': this.searchClient.cin ? this.searchClient.cin : environment.emptyForExport ,
            'Nom': this.searchClient.nom ? this.searchClient.nom : environment.emptyForExport ,
            'Prenom': this.searchClient.prenom ? this.searchClient.prenom : environment.emptyForExport ,
            'Archive': this.searchClient.archive ? (this.searchClient.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchClient.dateArchivageMin ? this.datePipe.transform(this.searchClient.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchClient.dateArchivageMax ? this.datePipe.transform(this.searchClient.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchClient.dateCreationMin ? this.datePipe.transform(this.searchClient.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchClient.dateCreationMax ? this.datePipe.transform(this.searchClient.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get clients(): Array<ClientVo> {
           return this.clientService.clients;
       }
    set clients(value: Array<ClientVo>) {
        this.clientService.clients = value;
       }

    get clientSelections(): Array<ClientVo> {
           return this.clientService.clientSelections;
       }
    set clientSelections(value: Array<ClientVo>) {
        this.clientService.clientSelections = value;
       }
   
     


    get selectedClient():ClientVo {
           return this.clientService.selectedClient;
       }
    set selectedClient(value: ClientVo) {
        this.clientService.selectedClient = value;
       }
    
    get createClientDialog():boolean {
           return this.clientService.createClientDialog;
       }
    set createClientDialog(value: boolean) {
        this.clientService.createClientDialog= value;
       }
    
    get editClientDialog():boolean {
           return this.clientService.editClientDialog;
       }
    set editClientDialog(value: boolean) {
        this.clientService.editClientDialog= value;
       }
    get viewClientDialog():boolean {
           return this.clientService.viewClientDialog;
       }
    set viewClientDialog(value: boolean) {
        this.clientService.viewClientDialog = value;
       }
       
     get searchClient(): ClientVo {
        return this.clientService.searchClient;
       }
    set searchClient(value: ClientVo) {
        this.clientService.searchClient = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
