import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators,FormBuilder } from '@angular/forms';
import { DropdownService } from '../dropdown.service';
import { Options } from '@angular-slider/ngx-slider';
import { HttpClient } from '@angular/common/http';
import {  ActivatedRoute, Router } from '@angular/router';
import { DynamicDialogRef , DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ProfileComponent } from '../profile/profile.component';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild(ProfileComponent) sub? :ProfileComponent;
  constructor(public select : DropdownService,
    public fb : FormBuilder,
    public http : HttpClient,
    public route : Router,

    public ref: DynamicDialogRef,
    public  config : DynamicDialogConfig,
    public routers: ActivatedRoute,

    ) { }
  registration : any;

  public  ngOnInit(): void {

     this.Contries = this.select.country();


     this.registration = this.fb.group({
       Image:['',Validators.required],
       FirstName:['',[Validators.required,Validators.pattern('[a-zA-Z]{2,15}$'), Validators.maxLength(20)]],
       LastName:['',[Validators.required, Validators.pattern('[a-zA-Z]{2,15}$')]],
       Email:['',[Validators.required, Validators.email]],
       Phone:['',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
       Age:['',[Validators.required,Validators.min(20)]],
       Country:['',Validators.required],
       State:['',Validators.required],
       address:['',Validators.required],
       tags:[['cricket', 'Football'],Validators.required ],
       Subscribe:[['true'],Validators.required]
     })
    if(this.config && this.config.data) {
      this.state = this.select.state()
      .filter(e =>
        e.id == this.config.data.Country);
        this.registration.reset(this.config.data);
    }

   }

   imgSrc : any="/assets/Placeholder.png";
   selectedImage : any;
   ImageBaseString:any;
   msg : any

   options: Options = {
     floor: 18,
     ceil: 60
   };

   Contries: any= [];
   state: any = [];


   Address : any = [
     {  name: 'Home',  Add: [ {cname: 'Address1'},{cname: 'Address2'}  ] },
     { name: 'Company', Add: [{cname: 'Company Address1'}, {cname: 'Company Address2'}]  }
   ];




   onSelect(Contries : any){

   this.state = this.select.state()
     .filter(e=>
       e.id == Contries.target.value);
     }


  showPreview(event : any) {

     if(event.target.files && event.target.files[0])
     {

       const mimeType = event.target.files[0].type;
       if(mimeType.match(/image\/*/) == null) {
       this.msg = "Only images are supported";
       return;
      }

      if(event.target.files[0].size < 350 * 325 && event.target.files[0].size < 2000000){
        this.msg= "350*325px image requride";
        return;
      }

       const reader = new FileReader();
       // File Preview
       reader.onload = (e : any) =>
       this.imgSrc = e.target.result;
       this.msg = "file uploaded succesfully";
       reader.readAsDataURL(event.target.files[0]);
       this.selectedImage = event.target.files[0];

       reader.onloadend = ()=>{
         this.ImageBaseString = reader.result;
         return;
       }

    }
     else {
       this.imgSrc = '/assets/Placeholder.png';
       this.selectedImage = null;
     }
   }

//   showPreview(event : any){
//     if(event.target.files &&  event.target.files[0])
//      {
//       const mimeType = event.target.files[0].type;
//       if(mimeType.match(/image\/*/) == null) {
//         this.msg = "Only images are supported";
//         return;
//       }

//       if(event.target.files[0].size < 350 * 325 ) {
//         this.msg = "350*325px image requride";
//         return;
//       }

//       const reader = new FileReader();
//       reader.readAsDataURL(event.target.files[0]);

//       reader.onload = (_event) => {
//         this.msg = "file uploaded succesfully";
//         this.imgSrc = reader.result;
//         this.selectedImage = event.target.files[0];
//       }
//       reader.onloadend = ()=>{
//         this.ImageBaseString = reader.result;

//   }
// }

//   else {
//         this.imgSrc = '/assets/Placeholder.png';
//          this.selectedImage = null;
//        }
//   }

// showPreview(event: any) {
//   if (event.target.files && event.target.files[0]) {
//     {
//   if (event.target.files[0].size < 200 * 200)
//    {/* Checking height * width*/ }
//     if (event.target.files[0].size < 2000000) {/* checking size here - 2MB */ }
// }
// }}

get f() { return this.registration.controls; }

submitted = false;
    Save(){
      this.submitted= true;
      if (this.registration.invalid) {
       // alert("form is invalid");
        return;
    }
    else{
          this.registration.value.Image= this.ImageBaseString
          const payload = this.registration.value;
           //  console.log(payload);
           if(this.config && this.config.data) {

             this.http.put("http://localhost:3000/posts/"+ this.config.data.id, payload).subscribe(res=>{
               console.log(res)
               let data : any = res;
               this.route.navigate(['/profile'], {queryParams : {id :data.id }})
               this.ref.close();
             })
            }
            else{
             this.http.post("http://localhost:3000/posts",payload).subscribe(res=>{
               console.log(res)
               let data : any = res;
               this.route.navigate(['/profile'],{queryParams:{id: data.id}})
               this.ref.close(payload);
        })

      }
      }
    }



    // Save() {
    //   this.registration.value.Image = this.ImageBaseString
    //   console.log(this.ImageBaseString.value)
    //   const payload = this.registration.value;
    //   console.log(this.registration.value)

    //   let page:any = localStorage.getItem("isProfilePage")
    //   if(page == "true")
    //   {
    //     let profile:any = localStorage.getItem("profile");
    //    let parseData = JSON.parse(profile);

    //     this.http.put("http://localhost:3000/posts/"+parseData.id,payload).subscribe(res=>{
    //       console.log(res);
    //       localStorage.setItem('profile', JSON.stringify(res));
    //     })
    //     console.log("comme from profile")
    //     this.router.navigate(['profile']);

    //     this.ref.close();

    //   }
    //   else
    //   {
    //     this.http.post("http://localhost:3000/posts",payload).subscribe(res=>{
    //       console.log(res)
    //       localStorage.setItem('profile', JSON.stringify(res));

    //     this.router.navigate(['profile']);
    //     this.ref.close();
    //     })
    //   }}

      // Save() {
      //   const payload = this.registration.value;
      //   localStorage.setItem('profile', JSON.stringify( payload));
      //   this.router.navigate(['profile']);
      //   this.ref.close();
      // }


    }

