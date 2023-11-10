


import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModelService } from '../model.service';
import { ProductsService } from './../products.service';
import { Component, OnInit, Renderer2, ElementRef, ViewChild, } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { fakeAsync } from '@angular/core/testing';

import { SignupService } from '../signup.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
showMe:boolean=false;
hideMe:boolean=true;
passType:string='password';
showPass:boolean=false;
isModalOpen:boolean = true;

  @ViewChild('modalElement') modalElement!: ElementRef;
  @ViewChild('loginRegisterLink') loginRegisterLink!: ElementRef; // Add this line
  isModalVisible: boolean = false;
  
  products: any[] = []; 
   

  constructor(private _ProductsService: ProductsService,
    private _ModelService: ModelService,
    private _ElementRef: ElementRef,
    private _LoginService:LoginService,
    private _SignupService:SignupService,
    private _Router:Router) {}

  isLoading:boolean=false;
  apiError:String='';
  
  loginForm: FormGroup= new FormGroup({
  email: new FormControl(null,[Validators.required,Validators.email]),
  password: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{5,20}$/)]),
   })
   signupForm: FormGroup= new FormGroup({
    name: new FormControl(null,[Validators.required, Validators.minLength(3)]),
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{5,20}$/)]),
    rePassword: new FormControl(null,[Validators.required]),
  // phone:new FormControl(null)
  
   })
   handelSignUp(signupForm:FormGroup){
    this.isLoading=true;
  
    if(signupForm.valid){
  this._SignupService.signupApi(signupForm.value).subscribe
  ({
    next:(response)=>{
      if(response.message==='success'){
    console.log(response),

        this.isLoading=false;
        this._Router.navigate(['/login'])
      }
    },
 
    error:(err)=>{
     
       this.isLoading=false;
       this.apiError=err.error.errors.msg
      console.log(err)
    }
    
    
  
  })
  
      
    }
   }
  
   handelLogin(loginForm:FormGroup){
    this.isLoading=true;
  
    if(loginForm.valid){
  this._LoginService.loginApi(loginForm.value).subscribe
  ({
    next:(response)=>{
      if(response.message==='success'){
        localStorage.setItem('userToken', response.token);
        this._LoginService.decodeUserData();
        this.isLoading=false;
        this._Router.navigate(['/mainhome'])
      }
    },
    // console.log(response),
    error:(err)=>{
     
       this.isLoading=false;
       this.apiError=err.error.errors.msg
      console.log(err)
    }
    
    
  
  })
  
      
    }
   }
   

   




  ngOnInit(): void {


    this._ModelService.isModalVisible$.subscribe((isVisible) => {
      this.isModalVisible = isVisible; }),


      // this.extractedProducts = this.products.filter(product => this.desiredIds.includes(product.id));


    this._ProductsService.getProducts().subscribe({
      next: (response) => this.products = response.data.slice(0,4)

    })
   
    
    
  };
 
  
  // @HostListener('click', ['$event'])
  // onClick(event: MouseEvent): void {
  //   if ((event.target as HTMLElement).id === 'modal') {
  //     this._ModelService.hideModal();
      
  //     console.log(event.target)
    
  //   }
  // }


  
  toogleTag(){
    this.showMe=!this.showMe;
    //  this.hideMe=!this.hideMe;
  }
 
  
 togglePassword(){
  if(this.showPass){
    this.showPass=false;
    this.passType='password'
  }else{
    this.showPass=true;
    this.passType='text'

  }
 }

 hidden(event: Event) {
  if ( event.target instanceof Element && event.target.id == "modal") {
    this.isModalOpen =  !this.isModalOpen;
    this.isModalVisible=this.isModalVisible
  
   
  }
}


 
// hideAndShow(){
//  const showRegister= document.getElementById('showRegister');
//    register= document.getElementById('register');
 

//   register.addEventListener("click", function () {
//     // Remove "d-none" and add "d-flex" classes
//     showRegister.classList.remove("d-none");
//     showRegister.classList.add("d-flex");
//   });
// }




}