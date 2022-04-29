import {Component, OnInit, Input} from '@angular/core';
import {PaiementDetailService} from '../../../../../controller/service/PaiementDetail.service';
import {PaiementDetailVo} from '../../../../../controller/model/PaiementDetail.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


import {ClientVo} from '../../../../../controller/model/Client.model';
import {ClientService} from '../../../../../controller/service/Client.service';
import {PaiementVo} from '../../../../../controller/model/Paiement.model';
import {PaiementService} from '../../../../../controller/service/Paiement.service';
@Component({
  selector: 'app-paiement-detail-create-admin',
  templateUrl: './paiement-detail-create-admin.component.html',
  styleUrls: ['./paiement-detail-create-admin.component.css']
})
export class PaiementDetailCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validPaiementDetailReference = true;

    _validClientReference = true;
    _validClientCin = true;
    _validPaiementReference = true;
    _validPaiementDatePaiement = true;
    _validPaiementMontant = true;
    _validPaiementPaiementTags = true;



constructor(private datePipe: DatePipe, private paiementDetailService: PaiementDetailService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private clientService :ClientService
,       private paiementService :PaiementService
) {

}


// methods
ngOnInit(): void {

    this.selectedClient = new ClientVo();
    this.clientService.findAll().subscribe((data) => this.clients = data);
    this.selectedPaiement = new PaiementVo();
    this.paiementService.findAll().subscribe((data) => this.paiements = data);
}



public save(){
  this.submitted = true;
  this.validateForm();
  if (this.errorMessages.length === 0) {
        this.saveWithShowOption(false);
  } else {
        this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
  }
}

public saveWithShowOption(showList: boolean){
     this.paiementDetailService.save().subscribe(paiementDetail=>{
       this.paiementDetails.push({...paiementDetail});
       this.createPaiementDetailDialog = false;
       this.submitted = false;
       this.selectedPaiementDetail = new PaiementDetailVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validatePaiementDetailReference();

    }

private validatePaiementDetailReference(){
        if (this.selectedPaiementDetail.reference == null) {
            this.errorMessages.push('Reference non valide');
            this.validPaiementDetailReference = false;
        } else {
            this.validPaiementDetailReference = true;
        }
    }








//openPopup
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

hideCreateDialog(){
    this.createPaiementDetailDialog  = false;
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

   get createPaiementDetailDialog(): boolean {
           return this.paiementDetailService.createPaiementDetailDialog;

       }
    set createPaiementDetailDialog(value: boolean) {
        this.paiementDetailService.createPaiementDetailDialog= value;
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
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }

     get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }




    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }

    get validPaiementDetailReference(): boolean {
    return this._validPaiementDetailReference;
    }

    set validPaiementDetailReference(value: boolean) {
    this._validPaiementDetailReference = value;
    }

    get validClientReference(): boolean {
    return this._validClientReference;
    }

    set validClientReference(value: boolean) {
    this._validClientReference = value;
    }
    get validClientCin(): boolean {
    return this._validClientCin;
    }

    set validClientCin(value: boolean) {
    this._validClientCin = value;
    }
    get validPaiementReference(): boolean {
    return this._validPaiementReference;
    }

    set validPaiementReference(value: boolean) {
    this._validPaiementReference = value;
    }
    get validPaiementDatePaiement(): boolean {
    return this._validPaiementDatePaiement;
    }

    set validPaiementDatePaiement(value: boolean) {
    this._validPaiementDatePaiement = value;
    }
    get validPaiementMontant(): boolean {
    return this._validPaiementMontant;
    }

    set validPaiementMontant(value: boolean) {
    this._validPaiementMontant = value;
    }
    get validPaiementPaiementTags(): boolean {
    return this._validPaiementPaiementTags;
    }

    set validPaiementPaiementTags(value: boolean) {
    this._validPaiementPaiementTags = value;
    }

}
