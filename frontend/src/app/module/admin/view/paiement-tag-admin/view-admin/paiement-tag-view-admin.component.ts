import {Component, OnInit} from '@angular/core';
import {PaiementTagService} from '../../../../../controller/service/PaiementTag.service';
import {PaiementTagVo} from '../../../../../controller/model/PaiementTag.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {PaiementVo} from '../../../../../controller/model/Paiement.model';
import {PaiementService} from '../../../../../controller/service/Paiement.service';
import {TagVo} from '../../../../../controller/model/Tag.model';
import {TagService} from '../../../../../controller/service/Tag.service';

@Component({
  selector: 'app-paiement-tag-view-admin',
  templateUrl: './paiement-tag-view-admin.component.html',
  styleUrls: ['./paiement-tag-view-admin.component.css']
})
export class PaiementTagViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private paiementTagService: PaiementTagService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private paiementService :PaiementService
    ,private tagService :TagService
) {
}

// methods
ngOnInit(): void {
    this.selectedPaiement = new PaiementVo();
    this.paiementService.findAll().subscribe((data) => this.paiements = data);
    this.selectedTag = new TagVo();
    this.tagService.findAll().subscribe((data) => this.tags = data);
}

hideViewDialog(){
    this.viewPaiementTagDialog  = false;
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

   get viewPaiementTagDialog():boolean {
           return this.paiementTagService.viewPaiementTagDialog;

       }
    set viewPaiementTagDialog(value: boolean) {
        this.paiementTagService.viewPaiementTagDialog= value;
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
       get selectedTag():TagVo {
           return this.tagService.selectedTag;
       }
      set selectedTag(value: TagVo) {
        this.tagService.selectedTag = value;
       }
       get tags():Array<TagVo> {
           return this.tagService.tags;
       }
       set tags(value: Array<TagVo>) {
        this.tagService.tags = value;
       }
       get editTagDialog():boolean {
           return this.tagService.editTagDialog;
       }
      set editTagDialog(value: boolean) {
        this.tagService.editTagDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
