import { TriggersService } from './../../shared/triggers.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public animation: boolean;
  public user: User;


  constructor(private userService: UserService, private router: Router, public apiNavigation: TriggersService) {

    this.animation = false;
    this.user = <User>{};
    this.apiNavigation.login = false;

  }

    show() {

      if (document.getElementById('edit-profile').style.visibility === 'visible') {
        this.animation = false;

        document.getElementById('edit-profile').style.visibility = 'hidden';
      } else {
        this.animation = true;
        document.getElementById('edit-profile').style.visibility = 'visible';
        document.getElementById('edit-profile').style.opacity = '1';

      }

    }

    login(user_name: string, password: string){

      let user1 = new User(user_name, password);
      this.apiNavigation.login = true;
      this.userService.loginUser(user1).subscribe((data: User) => {
        this.userService.userProfile = data[0];

        this.router.navigate(['/', 'searchRecipe']);

      });


    }
    submitted = false;

    onSubmit() { this.submitted = true; }


  ngOnInit(): void {
 
  }

}

