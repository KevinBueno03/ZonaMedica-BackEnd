import { NgModule } from "@angular/core";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports:[MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatDialogModule, MatCheckboxModule, FormsModule, ReactiveFormsModule, ReactiveFormsModule],
  exports: [MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatDialogModule, MatCheckboxModule,FormsModule, ReactiveFormsModule, ReactiveFormsModule]
})

export class MaterialModule{

}
