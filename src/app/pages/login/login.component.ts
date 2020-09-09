import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';



import{ User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public animation: boolean;
  public user;

  constructor(private userService: UserService, private router: Router) {

    this.animation = false;
    
  }

    show() {

      if (document.getElementById('edit-profile').style.visibility === 'visible') {
        this.animation = false;

        document.getElementById('edit-profile').style.visibility = 'hidden';
      } else {
        document.getElementById('edit-profile').style.visibility = 'visible';
        document.getElementById('edit-profile').style.opacity = '1';
        this.animation = true;
      }

    }

    login(user_name:string, password:string){
      
      let user1 = new User(user_name,password)
      this.userService.loginUser(user1).subscribe((data:User)=>{
        this.userService.userProfile = data[0];
        

        this.router.navigate(['/', 'searchRecipe']);

      

      })
    }

  ngOnInit(): void {
    
  }

}

