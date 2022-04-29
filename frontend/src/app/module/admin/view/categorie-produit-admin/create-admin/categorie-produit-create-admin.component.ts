import {Component, OnInit, Input} from '@angular/core';
import {CategorieProduitService} from '../../../../../controller/service/CategorieProduit.service';
import {CategorieProduitVo} from '../../../../../controller/model/CategorieProduit.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-categorie-produit-create-admin',
  templateUrl: './categorie-produit-create-admin.component.html',
  styleUrls: ['./categorie-produit-create-admin.component.css']
})
export class CategorieProduitCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validCategorieProduitReference = true;
   _validCategorieProduitLibelle = true;




constructor(private datePipe: DatePipe, private categorieProduitService: CategorieProduitService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}


// methods
ngOnInit(): void {

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
     this.categorieProduitService.save().subscribe(categorieProduit=>{
       this.categorieProduits.push({...categorieProduit});
       this.createCategorieProduitDialog = false;
       this.submitted = false;
       this.selectedCategorieProduit = new CategorieProduitVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateCategorieProduitReference();
this.validateCategorieProduitLibelle();

    }

private validateCategorieProduitReference(){
        if (this.selectedCategorieProduit.reference == null) {
            this.errorMessages.push('Reference non valide');
            this.validCategorieProduitReference = false;
        } else {
            this.validCategorieProduitReference = true;
        }
    }
private validateCategorieProduitLibelle(){
        if (this.selectedCategorieProduit.libelle == null) {
            this.errorMessages.push('Libelle non valide');
            this.validCategorieProduitLibelle = false;
        } else {
            this.validCategorieProduitLibelle = true;
        }
    }









//openPopup
// methods

hideCreateDialog(){
    this.createCategorieProduitDialog  = false;
}

// getters and setters

get categorieProduits(): Array<CategorieProduitVo> {
    return this.categorieProduitService.categorieProduits;
       }
set categorieProduits(value: Array<CategorieProduitVo>) {
        this.categorieProduitService.categorieProduits = value;
       }

 get selectedCategorieProduit():CategorieProduitVo {
           return this.categorieProduitService.selectedCategorieProduit;
       }
    set selectedCategorieProduit(value: CategorieProduitVo) {
        this.categorieProduitService.selectedCategorieProduit = value;
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
