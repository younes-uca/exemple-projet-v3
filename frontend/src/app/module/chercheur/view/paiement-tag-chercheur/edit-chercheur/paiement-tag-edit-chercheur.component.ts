import {Component, OnInit} from '@angular/core';
import {PaiementTagService} from '../../../../../controller/service/PaiementTag.service';
import {PaiementTagVo} from '../../../../../controller/model/PaiementTag.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {PaiementVo} from '../../../../../controller/model/Paiement.model';
import {PaiementService} from '../../../../../controller/service/Paiement.service';
import {TagVo} from '../../../../../controller/model/Tag.model';
import {TagService} from '../../../../../controller/service/Tag.service';

@Component({
  selector: 'app-paiement-tag-edit-chercheur',
  templateUrl: './paiement-tag-edit-chercheur.component.html',
  styleUrls: ['./paiement-tag-edit-chercheur.component.css']
})
export class PaiementTagEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private paiementTagService: PaiementTagService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private paiementService: PaiementService
 ,       private tagService: TagService
) {
}

// methods
ngOnInit(): void {
    this.selectedPaiement = new PaiementVo();
    this.paiementService.findAll().subscribe((data) => this.paiements = data);
    this.selectedTag = new TagVo();
    this.tagService.findAll().subscribe((data) => this.tags = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.paiementTagService.edit().subscribe(paiementTag=>{
    const myIndex = this.paiementTags.findIndex(e => e.id === this.selectedPaiementTag.id);
    this.paiementTags[myIndex] = this.selectedPaiementTag;
    this.editPaiementTagDialog = false;
    this.selectedPaiementTag = new PaiementTagVo();


    }, error => {
        console.log(error);
    });

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

hideEditDialog(){
    this.editPaiementTagDialog  = false;
}

// getters and setters

get paiementTags(): Array<PaiementTagVo> {
    return this.paiementTagService.paiementTags;
       }
set paiementTags(value: Array<PaiementTagVo>) {
        this.paiementTagService.paiementTags = value;
       }

 get selectedPaiementTag(): PaiementTagVo {
           return this.paiementTagService.selectedPaiementTag;
       }
    set selectedPaiementTag(value: PaiementTagVo) {
        this.paiementTagService.selectedPaiementTag = value;
       }

   get editPaiementTagDialog(): boolean {
           return this.paiementTagService.editPaiementTagDialog;

       }
    set editPaiementTagDialog(value: boolean) {
        this.paiementTagService.editPaiementTagDialog = value;
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
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
