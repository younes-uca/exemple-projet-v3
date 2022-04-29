import {Component, OnInit} from '@angular/core';
import {PaiementDetailService} from '../../../../../controller/service/PaiementDetail.service';
import {PaiementDetailVo} from '../../../../../controller/model/PaiementDetail.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {PaiementVo} from '../../../../../controller/model/Paiement.model';
import {PaiementService} from '../../../../../controller/service/Paiement.service';
import {ClientVo} from '../../../../../controller/model/Client.model';
import {ClientService} from '../../../../../controller/service/Client.service';

@Component({
  selector: 'app-paiement-detail-edit-admin',
  templateUrl: './paiement-detail-edit-admin.component.html',
  styleUrls: ['./paiement-detail-edit-admin.component.css']
})
export class PaiementDetailEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private paiementDetailService: PaiementDetailService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private paiementService: PaiementService
 ,       private clientService: ClientService
) {
}

// methods
ngOnInit(): void {
    this.selectedClient = new ClientVo();
    this.clientService.findAll().subscribe((data) => this.clients = data);
    this.selectedPaiement = new PaiementVo();
    this.paiementService.findAll().subscribe((data) => this.paiements = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.paiementDetailService.edit().subscribe(paiementDetail=>{
    const myIndex = this.paiementDetails.findIndex(e => e.id === this.selectedPaiementDetail.id);
    this.paiementDetails[myIndex] = this.selectedPaiementDetail;
    this.editPaiementDetailDialog = false;
    this.selectedPaiementDetail = new PaiementDetailVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateclient(client: string) {
                      const isPermistted = await this.roleService.isPermitted('Client', 'add');
                       if(isPermistted){
         this.selectedClient = new ClientVo();
        this.createClientDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatepaiement(paiement: string) {
                      const isPermistted = await this.roleService.isPermitted('Paiement', 'add');
                       if(isPermistted){
         this.selectedPaiement = new PaiementVo();
        this.createPaiementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editPaiementDetailDialog  = false;
}

// getters and setters

get paiementDetails(): Array<PaiementDetailVo> {
    return this.paiementDetailService.paiementDetails;
       }
set paiementDetails(value: Array<PaiementDetailVo>) {
        this.paiementDetailService.paiementDetails = value;
       }

 get selectedPaiementDetail(): PaiementDetailVo {
           return this.paiementDetailService.selectedPaiementDetail;
       }
    set selectedPaiementDetail(value: PaiementDetailVo) {
        this.paiementDetailService.selectedPaiementDetail = value;
       }

   get editPaiementDetailDialog(): boolean {
           return this.paiementDetailService.editPaiementDetailDialog;

       }
    set editPaiementDetailDialog(value: boolean) {
        this.paiementDetailService.editPaiementDetailDialog = value;
       }

       get selectedClient(): ClientVo {
           return this.clientService.selectedClient;
       }
      set selectedClient(value: ClientVo) {
        this.clientService.selectedClient = value;
       }
       get clients(): Array<ClientVo> {
           return this.clientService.clients;
       }
       set clients(value: Array<ClientVo>) {
        this.clientService.clients = value;
       }
       get createClientDialog(): boolean {
           return this.clientService.createClientDialog;
       }
      set createClientDialog(value: boolean) {
        this.clientService.createClientDialog= value;
       }
       get selectedPaiement(): PaiementVo {
           return this.paiementService.selectedPaiement;
       }
      set selectedPaiement(value: PaiementVo) {
        this.paiementService.selectedPaiement = value;
       }
       get paiements(): Array<PaiementVo> {
           return this.paiementService.paiements;
       }
       set paiements(value: Array<PaiementVo>) {
        this.paiementService.paiements = value;
       }
       get createPaiementDialog(): boolean {
           return this.paiementService.createPaiementDialog;
       }
      set createPaiementDialog(value: boolean) {
        this.paiementService.createPaiementDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
