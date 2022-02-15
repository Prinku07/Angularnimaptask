import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './header/header.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import {ChipsModule} from 'primeng/chips';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import { KeyFilterModule} from 'primeng/keyfilter';
import { RegisterComponent } from './register/register.component';
import { DialogService,DynamicDialogModule} from 'primeng/dynamicdialog';
import {ButtonModule} from 'primeng/button';



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



  ],
  providers: [DialogService ],
  bootstrap: [AppComponent],
  entryComponents: [RegisterComponent]

})
export class AppModule { }
