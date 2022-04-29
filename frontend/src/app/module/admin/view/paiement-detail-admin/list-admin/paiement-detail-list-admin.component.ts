import {Component, OnInit} from '@angular/core';
import {PaiementDetailService} from '../../../../../controller/service/PaiementDetail.service';
import {PaiementDetailVo} from '../../../../../controller/model/PaiementDetail.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { ClientService } from '../../../../../controller/service/Client.service';
import { PaiementService } from '../../../../../controller/service/Paiement.service';

import {PaiementVo} from '../../../../../controller/model/Paiement.model';
import {ClientVo} from '../../../../../controller/model/Client.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-paiement-detail-list-admin',
  templateUrl: './paiement-detail-list-admin.component.html',
  styleUrls: ['./paiement-detail-list-admin.component.css']
})
export class PaiementDetailListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PaiementDetail';
    clients :Array<ClientVo>;
    paiements :Array<PaiementVo>;


    constructor(private datePipe: DatePipe, private paiementDetailService: PaiementDetailService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private clientService: ClientService
        , private paiementService: PaiementService
) { }

    ngOnInit(): void {
      this.loadPaiementDetails();
      this.initExport();
      this.initCol();
      this.loadClient();
      this.loadPaiement();
    }
    
    // methods
      public async loadPaiementDetails(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PaiementDetail', 'list');
        isPermistted ? this.paiementDetailService.findAll().subscribe(paiementDetails => this.paiementDetails = paiementDetails,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.paiementDetailService.findByCriteria(this.searchPaiementDetail).subscribe(paiementDetails=>{
            
            this.paiementDetails = paiementDetails;
           // this.searchPaiementDetail = new PaiementDetailVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                        {field: 'client?.cin', header: 'Client'},
                            {field: 'pourcentage', header: 'Pourcentage'},
                        {field: 'paiement?.reference', header: 'Paiement'},
        ];
    }
    
    public async editPaiementDetail(paiementDetail:PaiementDetailVo){
        const isPermistted = await this.roleService.isPermitted('PaiementDetail', 'edit');
         if(isPermistted){
          this.paiementDetailService.findByIdWithAssociatedList(paiementDetail).subscribe(res => {
           this.selectedPaiementDetail = res;
            this.editPaiementDetailDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPaiementDetail(paiementDetail:PaiementDetailVo){
        const isPermistted = await this.roleService.isPermitted('PaiementDetail', 'view');
        if(isPermistted){
           this.paiementDetailService.findByIdWithAssociatedList(paiementDetail).subscribe(res => {
           this.selectedPaiementDetail = res;
            this.viewPaiementDetailDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePaiementDetail(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPaiementDetail = new PaiementDetailVo();
            this.createPaiementDetailDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deletePaiementDetail(paiementDetail:PaiementDetailVo){
       const isPermistted = await this.roleService.isPermitted('PaiementDetail', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Paiement detail) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.paiementDetailService.delete(paiementDetail).subscribe(status=>{
                          if(status > 0){
                          const position = this.paiementDetails.indexOf(paiementDetail);
                          position > -1 ? this.paiementDetails.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Paiement detail Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('PaiementDetail', 'list');
    isPermistted ? this.clientService.findAll().subscribe(clients => this.clients = clients,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadPaiement(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('PaiementDetail', 'list');
    isPermistted ? this.paiementService.findAll().subscribe(paiements => this.paiements = paiements,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicatePaiementDetail(paiementDetail: PaiementDetailVo) {

     this.paiementDetailService.findByIdWithAssociatedList(paiementDetail).subscribe(
	 res => {
	       this.initDuplicatePaiementDetail(res);
	       this.selectedPaiementDetail = res;
	       this.selectedPaiementDetail.id = null;
            this.createPaiementDetailDialog = true;

});

	}

	initDuplicatePaiementDetail(res: PaiementDetailVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.paiementDetails.map(e => {
    return {
                    'Reference': e.reference ,
            'Client': e.clientVo?.cin ,
                    'Pourcentage': e.pourcentage ,
            'Paiement': e.paiementVo?.reference ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchPaiementDetail.reference ? this.searchPaiementDetail.reference : environment.emptyForExport ,
        'Client': this.searchPaiementDetail.clientVo?.cin ? this.searchPaiementDetail.clientVo?.cin : environment.emptyForExport ,
            'Pourcentage Min': this.searchPaiementDetail.pourcentageMin ? this.searchPaiementDetail.pourcentageMin : environment.emptyForExport ,
            'Pourcentage Max': this.searchPaiementDetail.pourcentageMax ? this.searchPaiementDetail.pourcentageMax : environment.emptyForExport ,
        'Paiement': this.searchPaiementDetail.paiementVo?.reference ? this.searchPaiementDetail.paiementVo?.reference : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get paiementDetails(): Array<PaiementDetailVo> {
           return this.paiementDetailService.paiementDetails;
       }
    set paiementDetails(value: Array<PaiementDetailVo>) {
        this.paiementDetailService.paiementDetails = value;
       }

    get paiementDetailSelections(): Array<PaiementDetailVo> {
           return this.paiementDetailService.paiementDetailSelections;
       }
    set paiementDetailSelections(value: Array<PaiementDetailVo>) {
        this.paiementDetailService.paiementDetailSelections = value;
       }
   
     


    get selectedPaiementDetail():PaiementDetailVo {
           return this.paiementDetailService.selectedPaiementDetail;
       }
    set selectedPaiementDetail(value: PaiementDetailVo) {
        this.paiementDetailService.selectedPaiementDetail = value;
       }
    
    get createPaiementDetailDialog():boolean {
           return this.paiementDetailService.createPaiementDetailDialog;
       }
    set createPaiementDetailDialog(value: boolean) {
        this.paiementDetailService.createPaiementDetailDialog= value;
       }
    
    get editPaiementDetailDialog():boolean {
           return this.paiementDetailService.editPaiementDetailDialog;
       }
    set editPaiementDetailDialog(value: boolean) {
        this.paiementDetailService.editPaiementDetailDialog= value;
       }
    get viewPaiementDetailDialog():boolean {
           return this.paiementDetailService.viewPaiementDetailDialog;
       }
    set viewPaiementDetailDialog(value: boolean) {
        this.paiementDetailService.viewPaiementDetailDialog = value;
       }
       
     get searchPaiementDetail(): PaiementDetailVo {
        return this.paiementDetailService.searchPaiementDetail;
       }
    set searchPaiementDetail(value: PaiementDetailVo) {
        this.paiementDetailService.searchPaiementDetail = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
