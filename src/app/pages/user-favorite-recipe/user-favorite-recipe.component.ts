import { SearchRecipeService } from './../../shared/search-recipe.service';
import { FollowersService } from './../../shared/followers.service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { CookbookService } from 'src/app/shared/cookbook.service';
import { Router } from '@angular/router';
import { FavoriteService } from 'src/app/shared/favorite.service';
import { UserService } from 'src/app/shared/user.service';
import { CommentsService } from 'src/app/shared/comments.service';

@Component({
  selector: 'app-user-favorite-recipe',
  templateUrl: './user-favorite-recipe.component.html',
  styleUrls: ['./user-favorite-recipe.component.scss']
})
export class UserFavoriteRecipeComponent implements OnInit {
  public profile: User;
  public favoriteRecipes
  //public owner:User
  public eliminar
  public animation: boolean;
  public followingAmount: number;
  public followersAmount: number;
  public favs
  public following 
  public count: number;
  public numberComment



    constructor(public apiComments: CommentsService, private servicio: CookbookService, public followers: FollowersService, private router: Router,  private userService: UserService, private apiSearchRecipe: SearchRecipeService, private favService:  FavoriteService) {
      this.animation = false;
      this.favs  =  this.favService.favoriteRecipe
      this.numberComment = this.apiComments.numberComment
      this.following = this.followers.following;

    }
  
    showProfile(){
      
        this.profile = this.userService.userProfile;
        this.followers.followAmount(this.profile.user_id).subscribe((data: number) => console.log(this.followingAmount = data));
        this.followers.followersAmount(this.profile.user_id).subscribe((data: number) => console.log(this.followersAmount = data));
    }

    userFav(){
      this.favoriteRecipes = this.favService.favoriteRecipe
      this.favService.getFavoritefromUser(this.userService.userProfile.user_id).subscribe((data)=> {
      console.log("allfavs",data)
 
      return this.favoriteRecipes = data;
      });

      this.apiComments.numberComments(this.favoriteRecipes.recipe_id).subscribe((data: number) => {
        
        this.numberComment = data[0].count;
        this.apiComments.numberComment = this.numberComment;
  });
    }

    goToFollowers() {
      this.router.navigate(['/', 'followers']);
    }


    showRecipe(index: number) {
      this.router.navigate(['/recipe', index]);
    }

    goToRecipe(recipe_id: number) {
      [this.apiSearchRecipe.resultRecipe] = this.favoriteRecipes.filter(recipe => recipe.recipe_id === recipe_id);

      this.router.navigate(['/', 'recipe']);
    }

    popUp(user_fav_id) {
      this.eliminar = user_fav_id
        if ( document.getElementById('delete-window').style.visibility === 'visible') {
            document.getElementById('delete-window').style.visibility = 'hidden';
            this.animation = false;
        } else {
            document.getElementById('delete-window').style.visibility = 'visible';
            document.getElementById('edit-profile').style.opacity = '1';
            this.animation = true;
        }
    }


    deleteFav(){
       this.favService.removeFavorite(this.eliminar).subscribe(data => this.ngOnInit());
    }


  ngOnInit(): void {
      this.showProfile();
      this.userFav();
   
  }

}
