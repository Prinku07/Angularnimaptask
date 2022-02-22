import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import {ChipsModule} from 'primeng/chips';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import { KeyFilterModule} from 'primeng/keyfilter';
import { DialogService,DynamicDialogModule} from 'primeng/dynamicdialog';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    HeaderComponent,
    RegisterComponent,



  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSliderModule,
    CascadeSelectModule,
    KeyFilterModule,
    ChipsModule,
    ButtonModule,
    DynamicDialogModule,
    InputTextModule,
    FormsModule

  ],
  providers: [DialogService ],
  bootstrap: [AppComponent],
  entryComponents: [RegisterComponent]

})
export class AppModule { }
