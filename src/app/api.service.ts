import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl : string = 'http://localhost:3000/enquiry'
  constructor(private http : HttpClient) { }

  postRegistration(registerObj : User){
    return this.http.post<User>(`${this.baseUrl}`, registerObj)
  }
  getRegistratedUser(){
    return this.http.get<User>(`${this.baseUrl}`)
  }
  updateRegistratedUser(registerObj : User,id : number){
    return this.http.put<User>(`${this.baseUrl}/${id} `, registerObj)
  }
  deleteRegistratedUser(id : number){
    return this.http.delete<User>(`${this.baseUrl}/${id} `)
  }
  getRegistratedUseById(id : number){
    return this.http.get<User>(`${this.baseUrl}/${id} `)
  }

}
