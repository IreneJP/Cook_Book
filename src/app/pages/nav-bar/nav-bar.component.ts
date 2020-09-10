import { SearchRecipeService } from './../../shared/search-recipe.service';
import { Recipe } from 'src/app/models/recipe';
import { CookbookService } from 'src/app/shared/cookbook.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../shared/user.service'
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public animation: boolean;
  public user;
  public profileUser: User;
  public recipesUser: Recipe[];

  constructor( private userService: UserService, public apiSearchRecipe: SearchRecipeService) {

    this.animation = false;
    this.profileUser = this.userService.userProfile;
  }

    show() {

      if (document.getElementById('edit-profile').style.visibility === 'visible') {
        this.animation = false;

        document.getElementById('edit-profile').style.visibility = 'hidden';
      } else {
        document.getElementById('edit-profile').style.visibility = 'visible';
        document.getElementById('edit-profile').style.opacity = '1';
        this.showProfile()
        this.animation = true;
      }

    }


    editProfile( password: string, email: string, picture: string){
      
      let user1 = new User(this.profileUser.user_name, password, email, picture,  this.profileUser.user_id);

      this.userService.editUserProfile(user1).subscribe( data => this.user = data);
    }


    showProfile(){

      this.profileUser = this.userService.userProfile;
    
    }

  ngOnInit(): void {
    this.showProfile();
  }

}
