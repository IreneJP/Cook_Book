import { User } from './../models/user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  set(key: string, user: User) {
    try {
      localStorage.setItem(key, JSON.stringify(user));

    } catch (e){
      console.log(e);
    }
  }

  get(key: string) {
    try {
     return JSON.parse(localStorage.getItem(key));

    } catch (e){
      console.log(e);
    }
  }

  remove(key: string) {
    try {
     localStorage.removeItem(key);

    } catch (e){
      console.log(e);
    }
  }

  clear() {
    try{
      localStorage.clear()
    } catch (e) {
      console.log(e);
    }
  }


}
