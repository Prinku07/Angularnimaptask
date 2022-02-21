import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  title = 'demo';

 constructor(public dialogService: DialogService, public route : Router) { }

 register() {

   this.dialogService.open(RegisterComponent, {
    header: 'Register',

});
}


}

