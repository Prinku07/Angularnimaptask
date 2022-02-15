import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { RegisterComponent } from '../register/register.component';
import { DialogService } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [DialogService],
  entryComponents : [RegisterComponent]
})
export class ProfileComponent implements OnInit {

constructor(private route:ActivatedRoute,
  private http:HttpClient,
  private dom:DomSanitizer,
  private dialogService : DialogService,
  ) { }

 userid : any;
 userData : any;
 ImageBaseString:any;


  ngOnInit() {

    this.route.queryParamMap.subscribe(res=>{
     // console.log(res);
    let data: any = res;
      this.userid = data.params.id;
    });
    this.getUserData();
  }

getUserData(){
  this.http.get("http://localhost:3000/posts/"+ this.userid ).subscribe(res=> {
    this.userData = res;

    this.dom.bypassSecurityTrustResourceUrl(this.userData.Image)
 console.log(this.userData.Image);
    this.ImageBaseString = this.userData.Image;

   // console.log(this.ImageBaseString)
  })
}

onEdit() {
const ref = this.dialogService.open(RegisterComponent, {
  header: 'Update',
  width: '60%',
  data : this.userData,
  contentStyle : {}
});
ref.onClose.subscribe(()=> {
  this.getUserData();
})
console.log(this.userData);

}

imgSrc:any;

showpreview(event : any) {
  if(event.target.files && event.target.files[0])
  {
// File Preview
 const reader = new FileReader();
  reader.onload = (e : any) =>
    this.userData.Image = e.target.result;
      reader.readAsDataURL(event.target.files[0]);

      reader.onloadend = ()=>{
        this.ImageBaseString = reader.result;
      }

}
else {
 this.imgSrc = this.userData.Image;

}
}

// localStorage.setItem("isProfilePage","true");





}
