import {Component, OnInit} from '@angular/core';
import {PaiementDetailService} from '../../../../../controller/service/PaiementDetail.service';
import {PaiementDetailVo} from '../../../../../controller/model/PaiementDetail.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {PaiementVo} from '../../../../../controller/model/Paiement.model';
import {PaiementService} from '../../../../../controller/service/Paiement.service';
import {ClientVo} from '../../../../../controller/model/Client.model';
import {ClientService} from '../../../../../controller/service/Client.service';

@Component({
  selector: 'app-paiement-detail-view-admin',
  templateUrl: './paiement-detail-view-admin.component.html',
  styleUrls: ['./paiement-detail-view-admin.component.css']
})
export class PaiementDetailViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private paiementDetailService: PaiementDetailService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private paiementService :PaiementService
    ,private clientService :ClientService
) {
}

// methods
ngOnInit(): void {
    this.selectedClient = new ClientVo();
    this.clientService.findAll().subscribe((data) => this.clients = data);
    this.selectedPaiement = new PaiementVo();
    this.paiementService.findAll().subscribe((data) => this.paiements = data);
}

hideViewDialog(){
    this.viewPaiementDetailDialog  = false;
}

// getters and setters

get paiementDetails(): Array<PaiementDetailVo> {
    return this.paiementDetailService.paiementDetails;
       }
set paiementDetails(value: Array<PaiementDetailVo>) {
        this.paiementDetailService.paiementDetails = value;
       }

 get selectedPaiementDetail():PaiementDetailVo {
           return this.paiementDetailService.selectedPaiementDetail;
       }
    set selectedPaiementDetail(value: PaiementDetailVo) {
        this.paiementDetailService.selectedPaiementDetail = value;
       }

   get viewPaiementDetailDialog():boolean {
           return this.paiementDetailService.viewPaiementDetailDialog;

       }
    set viewPaiementDetailDialog(value: boolean) {
        this.paiementDetailService.viewPaiementDetailDialog= value;
       }

       get selectedClient():ClientVo {
           return this.clientService.selectedClient;
       }
      set selectedClient(value: ClientVo) {
        this.clientService.selectedClient = value;
       }
       get clients():Array<ClientVo> {
           return this.clientService.clients;
       }
       set clients(value: Array<ClientVo>) {
        this.clientService.clients = value;
       }
       get editClientDialog():boolean {
           return this.clientService.editClientDialog;
       }
      set editClientDialog(value: boolean) {
        this.clientService.editClientDialog= value;
       }
       get selectedPaiement():PaiementVo {
           return this.paiementService.selectedPaiement;
       }
      set selectedPaiement(value: PaiementVo) {
        this.paiementService.selectedPaiement = value;
       }
       get paiements():Array<PaiementVo> {
           return this.paiementService.paiements;
       }
       set paiements(value: Array<PaiementVo>) {
        this.paiementService.paiements = value;
       }
       get editPaiementDialog():boolean {
           return this.paiementService.editPaiementDialog;
       }
      set editPaiementDialog(value: boolean) {
        this.paiementService.editPaiementDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
