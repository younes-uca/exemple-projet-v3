import {Component, OnInit, Input} from '@angular/core';
import {PaiementTagService} from '../../../../../controller/service/PaiementTag.service';
import {PaiementTagVo} from '../../../../../controller/model/PaiementTag.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


import {TagVo} from '../../../../../controller/model/Tag.model';
import {TagService} from '../../../../../controller/service/Tag.service';
import {PaiementVo} from '../../../../../controller/model/Paiement.model';
import {PaiementService} from '../../../../../controller/service/Paiement.service';
@Component({
  selector: 'app-paiement-tag-create-admin',
  templateUrl: './paiement-tag-create-admin.component.html',
  styleUrls: ['./paiement-tag-create-admin.component.css']
})
export class PaiementTagCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validPaiementReference = true;
    _validPaiementDatePaiement = true;
    _validPaiementMontant = true;
    _validPaiementPaiementTags = true;
    _validTagReference = true;
    _validTagLibelle = true;



constructor(private datePipe: DatePipe, private paiementTagService: PaiementTagService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private tagService :TagService
,       private paiementService :PaiementService
) {

}


// methods
ngOnInit(): void {

    this.selectedPaiement = new PaiementVo();
    this.paiementService.findAll().subscribe((data) => this.paiements = data);
    this.selectedTag = new TagVo();
    this.tagService.findAll().subscribe((data) => this.tags = data);
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
     this.paiementTagService.save().subscribe(paiementTag=>{
       this.paiementTags.push({...paiementTag});
       this.createPaiementTagDialog = false;
       this.submitted = false;
       this.selectedPaiementTag = new PaiementTagVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
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
              public async openCreatetag(tag: string) {
                      const isPermistted = await this.roleService.isPermitted('Tag', 'add');
                       if(isPermistted){
         this.selectedTag = new TagVo();
        this.createTagDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createPaiementTagDialog  = false;
}

// getters and setters

get paiementTags(): Array<PaiementTagVo> {
    return this.paiementTagService.paiementTags;
       }
set paiementTags(value: Array<PaiementTagVo>) {
        this.paiementTagService.paiementTags = value;
       }

 get selectedPaiementTag():PaiementTagVo {
           return this.paiementTagService.selectedPaiementTag;
       }
    set selectedPaiementTag(value: PaiementTagVo) {
        this.paiementTagService.selectedPaiementTag = value;
       }

   get createPaiementTagDialog(): boolean {
           return this.paiementTagService.createPaiementTagDialog;

       }
    set createPaiementTagDialog(value: boolean) {
        this.paiementTagService.createPaiementTagDialog= value;
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
       get selectedTag(): TagVo {
           return this.tagService.selectedTag;
       }
      set selectedTag(value: TagVo) {
        this.tagService.selectedTag = value;
       }
       get tags(): Array<TagVo> {
           return this.tagService.tags;
       }
       set tags(value: Array<TagVo>) {
        this.tagService.tags = value;
       }
       get createTagDialog(): boolean {
           return this.tagService.createTagDialog;
       }
      set createTagDialog(value: boolean) {
        this.tagService.createTagDialog= value;
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
    get validTagReference(): boolean {
    return this._validTagReference;
    }

    set validTagReference(value: boolean) {
    this._validTagReference = value;
    }
    get validTagLibelle(): boolean {
    return this._validTagLibelle;
    }

    set validTagLibelle(value: boolean) {
    this._validTagLibelle = value;
    }

}
