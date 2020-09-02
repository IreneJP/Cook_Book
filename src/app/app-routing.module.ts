import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { UserRecipesComponent } from './pages/user-recipes/user-recipes.component';
import { ClassesResultComponent } from './pages/classes-result/classes-result.component';

import { FollowPageComponent } from './pages/follow-page/follow-page.component';
import { SearchRecipesComponent } from './pages/search-recipes/search-recipes.component';
import { FormPublishRecipesComponent } from './pages/form-publish-recipes/form-publish-recipes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormPublishClassComponent } from './pages/form-publish-class/form-publish-class.component';
import { UserFavoriteRecipeComponent } from './pages/user-favorite-recipe/user-favorite-recipe.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { RecipesComponent } from './pages/recipes/recipes.component';

const routes: Routes = [
  {path: 'publishRecipe', component: FormPublishRecipesComponent},
  {path: 'publishClass', component: FormPublishClassComponent},
  {path: 'searchRecipe', component: SearchRecipesComponent},
  {path: 'followers', component: FollowPageComponent},
  {path: 'lessons', component: ClassesResultComponent},
  {path: 'userRecipes', component: UserRecipesComponent},
  {path: 'userFavorites', component: UserFavoriteRecipeComponent},
  {path: 'recipes', component : RecipesComponent},
  {path: 'recipe/:id', component : RecipeComponent},
  {path: 'login', component : LoginComponent},
  {path: 'register', component : RegisterComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
