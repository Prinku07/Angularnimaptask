import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators,FormBuilder } from '@angular/forms';
import { DropdownService } from '../dropdown.service';
import { Options } from '@angular-slider/ngx-slider';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DynamicDialogRef , DynamicDialogConfig } from 'primeng/dynamicdialog'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public select : DropdownService,
    public fb : FormBuilder,
    public http : HttpClient,
    public route : Router,
    public ref: DynamicDialogRef,
    public  config : DynamicDialogConfig, ) { }

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
       tags:[['cricket', 'Football'],Validators.required],
       Subscribe:[['true'],Validators.required]
     })
    if(this.config && this.config.data) {
      console.log(this.registration.value)
      this.imgSrc = this.config.data?.Image;
      this.state = this.select.state()
      .filter(e =>
        e.id == this.config.data.Country);
        this.registration.reset(this.config.data);
    }
   }

   imgSrc : any="/assets/Placeholder.png";
   ImageBaseString:any;

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


      showPreview(event: any){
        if(event.target.files && event.target.files[0])
        {
          const mimeType = event.target.files[0].type;
          if (mimeType.match(/image\/*/) == null) {
            alert( "Only images are supported");
            return;
          }
          const reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);

          reader.onload = (_event) => {
            this.imgSrc = reader.result;
          }
          reader.onloadend = ()=>{
            this.ImageBaseString = reader.result;
      }
      }
      const Img = new Image();

      const filesToUpload = (event.target.files);
      Img.src = URL.createObjectURL(filesToUpload[0]);

      Img.onload = (e:any)=>{
        const height = e.path[0].height;
        const width = e.path[0].width;

        console.log(height, width);

        if(width !== 310 || height !== 325 ){
          alert("Image should be 310*325px");
          this.imgSrc = "/assets/Placeholder.png";
          this.ImageBaseString = ""
        }
      }
      }

get f() { return this.registration.controls; }

submitted = false;
    Save(){
      this.submitted= true;
      if (this.registration.invalid) {
        return;
    }
    else{
          this.registration.value.Image= this.ImageBaseString
          const payload = this.registration.value;
           // console.log(payload);
           if(this.config && this.config.data) {
             payload.Image = this.config.data?.Image
             this.http.put("http://localhost:3000/posts/"+ this.config.data.id , payload).subscribe(res=>{
               let data : any = res;
               this.ImageBaseString = res;
              console.log(data)
              console.log(this.ImageBaseString);
               this.route.navigate(['/profile'], {queryParams : {id :data.id }})
               this.ref.close();
             })
            }
            else{
             this.http.post("http://localhost:3000/posts",payload).subscribe(res=>{
               let data : any = res;
              console.log(data)
               this.route.navigate(['/profile'],{queryParams:{id: data.id}})
              this.ref.close();
              })
              }

      }
      }
    }


