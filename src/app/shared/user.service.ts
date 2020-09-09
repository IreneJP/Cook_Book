import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "http://localhost:3000/user";
  public userProfile: User;

  constructor(private http:HttpClient) { }

  getUsers()
  {
    return this.http.get(this.url)
  }
  getUser(id:number)
  {
    return this.http.get(this.url + "/" + id)
  }

  loginUser(user:User){
    
   return this.http.post(this.url + '/login', user)

    //localhost:3000/user/login?user_name=maria_cocina&password=Maria123

  }

  registerUser (newUser: User)
  {
    return this.http.post(this.url+ "/register", newUser)
  }

  editUserProfile (editUser: User)
  {
    return this.http.put(this.url + "/edit_profile" , editUser)
  }

  delete(id:number)
  {
    const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),body:{id:id}};
    
    return this.http.delete(this.url, httpOptions)
  }
}