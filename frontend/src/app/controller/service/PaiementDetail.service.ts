import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PaiementDetailVo} from '../model/PaiementDetail.model';
import {PaiementVo} from '../model/Paiement.model';
import {ClientVo} from '../model/Client.model';


@Injectable({
  providedIn: 'root'
})
export class PaiementDetailService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/paiementDetail/';
        })
    }
     private _paiementDetails: Array<PaiementDetailVo> ;
     private _selectedPaiementDetail: PaiementDetailVo;
     private _paiementDetailSelections: Array<PaiementDetailVo>;
     private _createPaiementDetailDialog: boolean;
     private _editPaiementDetailDialog: boolean;
     private _viewPaiementDetailDialog: boolean;
     public editPaiementDetail$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchPaiementDetail:PaiementDetailVo ;

    // methods

    public findAll(){
     return this.http.get<Array<PaiementDetailVo>>(this.API);
    }

    public save(): Observable<PaiementDetailVo> {
         return this.http.post<PaiementDetailVo>(this.API, this.selectedPaiementDetail);
    }

    delete(paiementDetail: PaiementDetailVo) {
         return this.http.delete<number>(this.API + 'id/' + paiementDetail.id);
    }


    public edit(): Observable<PaiementDetailVo> {
        return this.http.put<PaiementDetailVo>(this.API, this.selectedPaiementDetail);
    }


     public findByCriteria(paiementDetail:PaiementDetailVo):Observable<Array<PaiementDetailVo>>{
           return this.http.post<Array<PaiementDetailVo>>(this.API +'search', paiementDetail);
    }

   public findByIdWithAssociatedList(paiementDetail:PaiementDetailVo):Observable<PaiementDetailVo>{
         return this.http.get<PaiementDetailVo>(this.API + 'detail/id/' +paiementDetail.id);
    }

    // getters and setters


    get paiementDetails(): Array<PaiementDetailVo> {
    if(this._paiementDetails==null){
    this._paiementDetails=new Array<PaiementDetailVo>();
    }
return this._paiementDetails;
       }

    set paiementDetails(value: Array<PaiementDetailVo>) {
        this._paiementDetails = value;
       }

    get selectedPaiementDetail(): PaiementDetailVo {
    if(this._selectedPaiementDetail==null){
    this._selectedPaiementDetail=new PaiementDetailVo();
    }
           return this._selectedPaiementDetail;
       }

    set selectedPaiementDetail(value: PaiementDetailVo) {
        this._selectedPaiementDetail = value;
       }

    get paiementDetailSelections(): Array<PaiementDetailVo> {
    if(this._paiementDetailSelections==null){
    this._paiementDetailSelections=new Array<PaiementDetailVo>();
    }
        return this._paiementDetailSelections;
       }


    set paiementDetailSelections(value: Array<PaiementDetailVo>) {
        this._paiementDetailSelections = value;
       }

    get createPaiementDetailDialog(): boolean {
        return this._createPaiementDetailDialog;
       }

    set createPaiementDetailDialog(value: boolean) {
        this._createPaiementDetailDialog = value;
       }

    get editPaiementDetailDialog(): boolean {
        return this._editPaiementDetailDialog;
       }

    set editPaiementDetailDialog(value: boolean) {
        this._editPaiementDetailDialog = value;
       }

    get viewPaiementDetailDialog(): boolean {
        return this._viewPaiementDetailDialog;
       }

    set viewPaiementDetailDialog(value: boolean) {
        this._viewPaiementDetailDialog = value;
       }

     get searchPaiementDetail(): PaiementDetailVo {
     if(this._searchPaiementDetail==null){
    this._searchPaiementDetail=new PaiementDetailVo();
    }
        return this._searchPaiementDetail;
    }

    set searchPaiementDetail(value: PaiementDetailVo) {
        this._searchPaiementDetail = value;
       }

}
