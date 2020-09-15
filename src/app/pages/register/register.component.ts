import { Component, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { LocalStorageService } from './../../shared/local-storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public user: User;
  public forma : FormGroup;
  public regis: boolean;

  constructor( private fb : FormBuilder, private userService: UserService, private router: Router, private localStorage: LocalStorageService) {
  
    this.createForm()
    this.regis = false;
  }  

  registerSocial(provider){
    this.userService.registerSocial(provider);
  }
  

  ngOnInit(): void {
  }

  get invalidName(){
    return this.forma.get('user_name').invalid && this.forma.get('user_name').touched;
  }

  get invalidEmail(){
    return this.forma.get('email').invalid && this.forma.get('email').touched;
  }
  get invalidPassword(){
    return this.forma.get('password').invalid && this.forma.get('password').touched;
  }

  createForm(){

    this.forma = this.fb.group({

      user_name : ['',[Validators.required]],
      email     : ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password  : ['', [Validators.required, Validators.minLength(8)]], 

    });

  }

  save(forma){
    console.log(this.forma);

      
      if(this.forma.valid){
       
        this.userService.getUsers().subscribe((data: User[])=>{
        const dataFiltered = data.filter(item => item.email === this.forma.value.email);
       
        if(dataFiltered.length === 0){
         
          this.userService.registerUser(new User(this.forma.value.user_name,this.forma.value.password,this.forma.value.email)).subscribe((data1: any) => {
          
           
            this.userService.getUser(data1.insertId).subscribe((data:User)=>{
              
              this.userService.userProfile = data[0];
              this.localStorage.set('log', this.userService.userProfile);
              this.router.navigate(['/', 'searchRecipe']);

            })
            })
          

            }else{

              this.regis = true;
              

            }
          })
          if(this.forma.invalid){
            Object.values( this.forma.controls ).forEach ( control =>{
    
              control.markAsTouched();
    
            })
          }
          console.log(this.forma.value);
        

  }

}}

