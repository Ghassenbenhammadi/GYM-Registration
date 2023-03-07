import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { User } from '../user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit{
  public userID!: number;
  userDetail! : User;
  constructor(private route: ActivatedRoute,private api : ApiService){}
  ngOnInit(): void {
    this.route.params.subscribe(val=>{
      this.userID = val['id'];
      this.fetchUserDetails(this.userID);  
    })
  }
  fetchUserDetails(userID: number){
    this.api.getRegistratedUseById(userID).subscribe(res=>{
      this.userDetail = res;
      console.log(this.userDetail)
    })
  }

}
