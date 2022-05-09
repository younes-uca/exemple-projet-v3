import {Component, OnInit} from '@angular/core';
import {TagService} from '../../../../../controller/service/Tag.service';
import {TagVo} from '../../../../../controller/model/Tag.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';


@Component({
    selector: 'app-tag-view-admin',
    templateUrl: './tag-view-admin.component.html',
    styleUrls: ['./tag-view-admin.component.css']
})
export class TagViewAdminComponent implements OnInit {

    constructor(private datePipe: DatePipe, private tagService: TagService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
        , private chercheurService: ChercheurService
    ) {
    }

// methods
    ngOnInit(): void {
    }


    get hideTagChercheur(): boolean {
        return this.selectedTag.username != null;
    }

    get selectedChercheur(): ChercheurVo {
        return this.chercheurService.selectedChercheur;
    }


    get tags(): Array<TagVo> {
        return this.tagService.tags;
    }

    set tags(value: Array<TagVo>) {
        this.tagService.tags = value;
    }

    get selectedTag(): TagVo {
        return this.tagService.selectedTag;
    }

    set selectedTag(value: TagVo) {
        this.tagService.selectedTag = value;
    }

    get viewTagDialog(): boolean {
        return this.tagService.viewTagDialog;

    }

    set viewTagDialog(value: boolean) {
        this.tagService.viewTagDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
