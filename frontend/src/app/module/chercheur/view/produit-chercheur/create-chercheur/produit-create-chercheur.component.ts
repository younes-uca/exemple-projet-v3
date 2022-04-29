import {Component, OnInit, Input} from '@angular/core';
import {ProduitService} from '../../../../../controller/service/Produit.service';
import {ProduitVo} from '../../../../../controller/model/Produit.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


import {CategorieProduitVo} from '../../../../../controller/model/CategorieProduit.model';
import {CategorieProduitService} from '../../../../../controller/service/CategorieProduit.service';
@Component({
  selector: 'app-produit-create-chercheur',
  templateUrl: './produit-create-chercheur.component.html',
  styleUrls: ['./produit-create-chercheur.component.css']
})
export class ProduitCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validProduitReference = true;

    _validCategorieProduitReference = true;
    _validCategorieProduitLibelle = true;



constructor(private datePipe: DatePipe, private produitService: ProduitService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private categorieProduitService :CategorieProduitService
) {

}


// methods
ngOnInit(): void {

    this.selectedCategorieProduit = new CategorieProduitVo();
    this.categorieProduitService.findAll().subscribe((data) => this.categorieProduits = data);
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
     this.produitService.save().subscribe(produit=>{
       this.produits.push({...produit});
       this.createProduitDialog = false;
       this.submitted = false;
       this.selectedProduit = new ProduitVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateProduitReference();

    }

private validateProduitReference(){
        if (this.selectedProduit.reference == null) {
            this.errorMessages.push('Reference non valide');
            this.validProduitReference = false;
        } else {
            this.validProduitReference = true;
        }
    }










//openPopup
              public async openCreatecategorieProduit(categorieProduit: string) {
                      const isPermistted = await this.roleService.isPermitted('CategorieProduit', 'add');
                       if(isPermistted){
         this.selectedCategorieProduit = new CategorieProduitVo();
        this.createCategorieProduitDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createProduitDialog  = false;
}

// getters and setters

get produits(): Array<ProduitVo> {
    return this.produitService.produits;
       }
set produits(value: Array<ProduitVo>) {
        this.produitService.produits = value;
       }

 get selectedProduit():ProduitVo {
           return this.produitService.selectedProduit;
       }
    set selectedProduit(value: ProduitVo) {
        this.produitService.selectedProduit = value;
       }

   get createProduitDialog(): boolean {
           return this.produitService.createProduitDialog;

       }
    set createProduitDialog(value: boolean) {
        this.produitService.createProduitDialog= value;
       }

       get selectedCategorieProduit(): CategorieProduitVo {
           return this.categorieProduitService.selectedCategorieProduit;
       }
      set selectedCategorieProduit(value: CategorieProduitVo) {
        this.categorieProduitService.selectedCategorieProduit = value;
       }
       get categorieProduits(): Array<CategorieProduitVo> {
           return this.categorieProduitService.categorieProduits;
       }
       set categorieProduits(value: Array<CategorieProduitVo>) {
        this.categorieProduitService.categorieProduits = value;
       }
       get createCategorieProduitDialog(): boolean {
           return this.categorieProduitService.createCategorieProduitDialog;
       }
      set createCategorieProduitDialog(value: boolean) {
        this.categorieProduitService.createCategorieProduitDialog= value;
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

    get validProduitReference(): boolean {
    return this._validProduitReference;
    }

    set validProduitReference(value: boolean) {
    this._validProduitReference = value;
    }

    get validCategorieProduitReference(): boolean {
    return this._validCategorieProduitReference;
    }

    set validCategorieProduitReference(value: boolean) {
    this._validCategorieProduitReference = value;
    }
    get validCategorieProduitLibelle(): boolean {
    return this._validCategorieProduitLibelle;
    }

    set validCategorieProduitLibelle(value: boolean) {
    this._validCategorieProduitLibelle = value;
    }

}
