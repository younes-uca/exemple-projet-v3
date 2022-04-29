import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PaiementTagVo} from '../model/PaiementTag.model';
import {PaiementVo} from '../model/Paiement.model';
import {TagVo} from '../model/Tag.model';


@Injectable({
  providedIn: 'root'
})
export class PaiementTagService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/paiementTag/';
        })
    }
     private _paiementTags: Array<PaiementTagVo> ;
     private _selectedPaiementTag: PaiementTagVo;
     private _paiementTagSelections: Array<PaiementTagVo>;
     private _createPaiementTagDialog: boolean;
     private _editPaiementTagDialog: boolean;
     private _viewPaiementTagDialog: boolean;
     public editPaiementTag$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchPaiementTag:PaiementTagVo ;

    // methods

    public findAll(){
     return this.http.get<Array<PaiementTagVo>>(this.API);
    }

    public save(): Observable<PaiementTagVo> {
         return this.http.post<PaiementTagVo>(this.API, this.selectedPaiementTag);
    }

    delete(paiementTag: PaiementTagVo) {
         return this.http.delete<number>(this.API + 'id/' + paiementTag.id);
    }


    public edit(): Observable<PaiementTagVo> {
        return this.http.put<PaiementTagVo>(this.API, this.selectedPaiementTag);
    }


     public findByCriteria(paiementTag:PaiementTagVo):Observable<Array<PaiementTagVo>>{
           return this.http.post<Array<PaiementTagVo>>(this.API +'search', paiementTag);
    }

   public findByIdWithAssociatedList(paiementTag:PaiementTagVo):Observable<PaiementTagVo>{
         return this.http.get<PaiementTagVo>(this.API + 'detail/id/' +paiementTag.id);
    }

    // getters and setters


    get paiementTags(): Array<PaiementTagVo> {
    if(this._paiementTags==null){
    this._paiementTags=new Array<PaiementTagVo>();
    }
return this._paiementTags;
       }

    set paiementTags(value: Array<PaiementTagVo>) {
        this._paiementTags = value;
       }

    get selectedPaiementTag(): PaiementTagVo {
    if(this._selectedPaiementTag==null){
    this._selectedPaiementTag=new PaiementTagVo();
    }
           return this._selectedPaiementTag;
       }

    set selectedPaiementTag(value: PaiementTagVo) {
        this._selectedPaiementTag = value;
       }

    get paiementTagSelections(): Array<PaiementTagVo> {
    if(this._paiementTagSelections==null){
    this._paiementTagSelections=new Array<PaiementTagVo>();
    }
        return this._paiementTagSelections;
       }


    set paiementTagSelections(value: Array<PaiementTagVo>) {
        this._paiementTagSelections = value;
       }

    get createPaiementTagDialog(): boolean {
        return this._createPaiementTagDialog;
       }

    set createPaiementTagDialog(value: boolean) {
        this._createPaiementTagDialog = value;
       }

    get editPaiementTagDialog(): boolean {
        return this._editPaiementTagDialog;
       }

    set editPaiementTagDialog(value: boolean) {
        this._editPaiementTagDialog = value;
       }

    get viewPaiementTagDialog(): boolean {
        return this._viewPaiementTagDialog;
       }

    set viewPaiementTagDialog(value: boolean) {
        this._viewPaiementTagDialog = value;
       }

     get searchPaiementTag(): PaiementTagVo {
     if(this._searchPaiementTag==null){
    this._searchPaiementTag=new PaiementTagVo();
    }
        return this._searchPaiementTag;
    }

    set searchPaiementTag(value: PaiementTagVo) {
        this._searchPaiementTag = value;
       }

}
